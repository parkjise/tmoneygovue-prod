import { ref, createApp, h, type ComponentPublicInstance, type Ref } from 'vue';
import axiosSpinner from '@/utils/http/axios/commponents/AxiosSpinner.vue';
import { useCommonStore } from '@/service/common/commonModule';

interface spinnerProps {
  destroySpinnerFuction: Function; // Close Modal
}

export function useAxiosSpinner() {
  const spinnerInstance: Ref<ComponentPublicInstance | null> = ref(null);
  let app: any;

  const createSpinner = () => {
    const options: spinnerProps = {
      destroySpinnerFuction: destroySpinner
    };
    renderedShowSpinner(options);
  };

  const renderedShowSpinner = (props: spinnerProps) => {
    const commonStore = useCommonStore();

    const isShowedSpinner = commonStore.getCommonUseAxiosSpinnerIsShowedSpinner;
    commonStore.setIncCommonUseAxiosSpinnerShowedSpinnerCount();
    if (isShowedSpinner) {
      return;
    }
    const div = document.createElement('div');
    document.body.appendChild(div);

    app = createApp({
      render: () =>
        h(axiosSpinner, {
          ...props
        })
    });

    spinnerInstance.value = app.mount(div);
  };

  const destroySpinner = () => {
    if (spinnerInstance.value) {
      app.unmount();
      spinnerInstance.value = null;
      app._container.remove();
    }
  };

  return {
    renderedShowSpinner,
    createSpinner
  };
}
