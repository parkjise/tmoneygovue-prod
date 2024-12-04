import { ref, createApp, h, type ComponentPublicInstance, type Ref } from 'vue';
import uuModal from '@/composables/components/MessageModal.vue';
import router from '@/router';
import { useCommonStore } from '@/service/common/commonModule';

type modalType = 'alert' | 'confirm' | 'bottom' | 'full' | 'notification';
interface modalFooterType {
  name: 'close' | 'ok';
  label: String;
  click?: Function;
  disabled?: Boolean;
}
interface uuModalProps {
  type?: modalType; // Modal Type
  modelValue?: Boolean; // Modal Show or Hide
  hideHeader?: Boolean; // Hidden Header
  hideFooter?: Boolean; // Hidden Footer
  title?: string; // Modal Title
  hideOverlay?: Boolean; // Hidden Overlay
  dragBar?: Boolean; // Drag Bar
  fullContent?: Boolean; // Full Content
  addClass?: string; // Add Class
  hideCloseBtn?: Boolean; // Hidden Close Button
  hideTitle?: Boolean; // Hidden Title
  roundFooter?: Boolean; // Round Footer
  footer?: Array<modalFooterType>; // Footer
  defaultCloseModal?: Function; // Close Modal
  isFocusClose?: boolean; // Focus Close
}

function createModalOptions(options: uuModalProps, modalType: modalType, defaultCloseModal: Function) {
  const option: uuModalProps = {
    type: modalType || options.type || 'alert',
    modelValue: options.modelValue !== undefined ? options.modelValue : true,
    hideHeader: options.hideHeader !== undefined ? options.hideHeader : false,
    hideFooter: options.hideFooter !== undefined ? options.hideFooter : false,
    title: options.title || '',
    hideOverlay: options.hideOverlay !== undefined ? options.hideOverlay : false,
    dragBar: options.dragBar !== undefined ? options.dragBar : false,
    fullContent: options.fullContent !== undefined ? options.fullContent : false,
    addClass: options.addClass || '',
    hideCloseBtn: options.hideCloseBtn !== undefined ? options.hideCloseBtn : false,
    hideTitle: options.hideTitle !== undefined ? options.hideTitle : false,
    roundFooter: options.roundFooter !== undefined ? options.roundFooter : false,
    footer: options.footer || [],
    defaultCloseModal: options.defaultCloseModal || defaultCloseModal,
    isFocusClose: options.isFocusClose !== undefined ? options.isFocusClose : true
  };
  return option;
}

export function useAxiosModal() {
  const modalInstance: Ref<ComponentPublicInstance | null> = ref(null);
  let app: any;

  // error modal by option
  const createErrorModalAndOption = (options: uuModalProps, content: string) => {
    renderedShowModal(createModalOptions(options, 'alert', defaultCloseModal), content);
  };

  // error modal by title and content
  const createErrorModal = (title: string, content: string) => {
    const options: uuModalProps = {};
    options.title = title;
    options.footer = [
      {
        name: 'close',
        label: '확인',
        disabled: false
      }
    ];

    renderedShowModal(createModalOptions(options, 'alert', defaultCloseModal), content);
  };

  /**
   * 애러 modal by function
   * @param title
   * @param content
   * @param okFunction
   * @param okBtnLabel
   * @param closeFinction
   * @param closeBtnLabel
   */
  const createErrorModalByFunction = (
    title: string,
    content: string,
    okFunction: Function,
    okBtnLabel: string,
    closeFunction?: Function,
    closeBtnLabel?: string
  ) => {
    const options: uuModalProps = {};
    options.title = title;
    options.isFocusClose = false;
    options.footer = [
      {
        name: 'ok',
        label: okBtnLabel,
        disabled: false,
        click: okFunction
      }
    ];
    if (closeFunction) {
      options.footer.unshift({
        name: 'close',
        label: closeBtnLabel || 'close',
        disabled: false,
        click: closeFunction
      });
    }

    renderedShowModal(createModalOptions(options, 'confirm', defaultCloseModal), content);
  };

  const renderedShowModal = (props = {}, content: string) => {
    const commonStore = useCommonStore();
    const div = document.createElement('div');
    document.body.appendChild(div);
    const isShowedModal = commonStore.getCommonUseAxiosModalIsShowedModal;
    if (isShowedModal) {
      return;
    }
    commonStore.setDecCommonUseAxiosModalIsShowed(true);

    app = createApp({
      render: () =>
        h(
          uuModal,
          {
            ...props
          },
          {
            modal_body: () => h('div', { innerHTML: content })
          }
        )
    });

    modalInstance.value = app.use(router).mount(div);
  };

  const defaultCloseModal = () => {
    const commonStore = useCommonStore();
    if (modalInstance.value) {
      commonStore.setDecCommonUseAxiosModalIsShowed(false);
      app.unmount();
      modalInstance.value = null;
      app._container.remove();
    }
  };

  return {
    renderedShowModal,
    createErrorModal,
    createErrorModalAndOption,
    createErrorModalByFunction
  };
}
