import { ViewModel, useStore } from 'hooks/useStore';
import { TypeGlobals } from 'models';
import { classToObservableAuto } from 'compSystem/transformers';

type PropsBodyClass = {
  isActive: boolean;
  className: string;
};

class VM implements ViewModel {
  constructor(
    public context: TypeGlobals,
    public props: PropsBodyClass
  ) {
    classToObservableAuto(__filename, this);
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

export function BodyClass(props: PropsBodyClass) {
  useStore(VM, props);

  return null;
}
