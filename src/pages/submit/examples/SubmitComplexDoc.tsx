/* eslint-disable */
// @ts-nocheck

export const SubmitComplex = observer(function SubmitComplex<
  TFormConfig extends TypeForm['TypeFormConfig'],
>(props: TypeSubmitProps<TFormConfig, TypeInputSubmitConfig>) {
  // ...

  useEffect(() => {
    const disposer = autorun(() => {
      const shouldBeDisabled = Object.values(props.formConfig.inputs).some(
        (inpConfig) => !inpConfig.value
      );

      runInAction(() => {
        inputConfig.disabled = shouldBeDisabled;
      });
    });

    return () => disposer();
  }, []);

  // ...
});
