import { AbsViewModel, useStore } from 'hooks/useStore';
import { TypeGlobals } from 'models';
import { transformers } from 'compSystem/transformers';

type PropsBodyClass = {
  isActive: boolean;
  className: string;
};

class VM implements AbsViewModel {
  constructor(public context: TypeGlobals, public props: PropsBodyClass) {
    transformers.classToObservable(this, { context: false, props: false }, { autoBind: true });
  }

  beforeMount() {
    this.handleUpdateBodyClass();
  }

  beforeUnmount() {
    if (!IS_CLIENT) return;

    const { className } = this.props;

    document.body.classList.remove(className);
  }

  // componentDidUpdate() {
  //   this.handleUpdateBodyClass();
  // }
  handleUpdateBodyClass = () => {
    if (!IS_CLIENT) return;

    const { isActive, className } = this.props;

    if (isActive) {
      document.body.classList.add(className);
    } else {
      document.body.classList.remove(className);
    }
  };
}

export const BodyClass = transformers.observer(function BodyClass(props: PropsBodyClass) {
  useStore(VM, props);

  return null;
});
