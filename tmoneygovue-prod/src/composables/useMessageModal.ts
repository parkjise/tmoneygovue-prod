import { ref, createApp, h, type ComponentPublicInstance, type Ref } from 'vue';
// import { type modalFooterType, type modalType } from '@/components/uu-components/uuModal.vue';
import uuModal from '@/composables/components/MessageModal.vue';
import router from '@/router';
import { useCommonStore } from '@/service/common/commonModule';
import type { ButtonStyleType, ButtonColorType } from '@/components/uu-components/UuButton.vue';

type modalType = 'alert' | 'confirm' | 'bottom' | 'full' | 'notification';
export interface modalFooterType {
  name: 'close' | 'ok';
  label: String;
  click?: Function;
  disabled?: Boolean;
  btnStyle?: ButtonStyleType;
  btnColor?: ButtonColorType;
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

export function useMessageModal() {
  const modalInstance: Ref<ComponentPublicInstance | null> = ref(null);
  let app: any;

  // sucesss modal by option
  const createSuccessModalAndOption = (options: uuModalProps, content: string) => {
    renderedShowModal(createModalOptions(options, 'alert', defaultCloseModal), content);
  };

  // success modal by title and content
  const createSuccessModal = (title: string, content: string, okFunction?: Function) => {
    const options: uuModalProps = {};
    options.title = title;
    options.footer = [
      {
        name: 'close',
        label: '확인',
        disabled: false,
        ...(okFunction ? { click: okFunction } : {})
      }
    ];

    renderedShowModal(createModalOptions(options, 'alert', defaultCloseModal), content);
  };

  // error modal by option
  const createErrorModalAndOption = (options: uuModalProps, content: string) => {
    renderedShowModal(createModalOptions(options, 'alert', defaultCloseModal), content);
  };

  // error modal by title and content
  const createErrorModal = (title: string, content: string, okFunction?: Function) => {
    const options: uuModalProps = {};
    options.title = title;
    options.footer = [
      {
        name: 'close',
        label: '확인',
        disabled: false,
        ...(okFunction ? { click: okFunction } : {})
      }
    ];

    renderedShowModal(createModalOptions(options, 'alert', defaultCloseModal), content);
  };

  // notification modal by option
  const createNotificationModalAndOption = (options: uuModalProps, content: string) => {
    renderedShowModal(createModalOptions(options, 'notification', defaultCloseModal), content);
  };

  // notification modal by title and content
  const createNotificationModal = (title: string, content: string, okFunction?: Function) => {
    const options: uuModalProps = {};
    options.title = title;
    options.footer = [
      {
        name: 'close',
        label: '확인',
        disabled: false,
        ...(okFunction ? { click: okFunction } : {})
      }
    ];

    renderedShowModal(createModalOptions(options, 'notification', defaultCloseModal), content);
  };

  // confirm modal by function
  const createConfirmModalByFunction = (
    title: string,
    content: string,
    okFunction: Function,
    okBtnLabel: string,
    isFocusClose?: boolean,
    closeFunction?: Function,
    closeBtnLabel?: string,
    okBtnColor?: ButtonColorType,
    okBtnStyle?: ButtonStyleType,
    closeBtnColor?: ButtonColorType,
    closeBtnStyle?: ButtonStyleType
  ) => {
    const options: uuModalProps = {};
    options.title = title;
    options.isFocusClose = isFocusClose;
    options.footer = [
      {
        name: 'close',
        label: closeBtnLabel || 'close',
        disabled: false,
        click: closeFunction,
        btnStyle: closeBtnStyle,
        btnColor: closeBtnColor
      },
      {
        name: 'ok',
        label: okBtnLabel,
        disabled: false,
        click: okFunction,
        btnStyle: okBtnStyle,
        btnColor: okBtnColor
      }
    ];

    renderedShowModal(createModalOptions(options, 'confirm', defaultCloseModal), content);
  };

  const renderedShowModal = (props = {}, content: string) => {
    const commonStore = useCommonStore();
    const div = document.createElement('div');
    document.body.appendChild(div);
    const isShowedModal = commonStore.getCommonUseMessageModalIsShowedModal;
    commonStore.setIncCommonUseMessageModalShowedModalCount();

    const modalStyle = isShowedModal ? 'nodim' : '';
    app = createApp({
      render: () =>
        h(
          uuModal,
          {
            ...props,
            addClass: modalStyle
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
      commonStore.setDecCommonUseMessageModalShowedModalCount();
      app.unmount();
      modalInstance.value = null;
      app._container.remove();
      
      document.documentElement.classList.remove('modal_open');
    }
  };

  return {
    renderedShowModal,
    defaultCloseModal,
    createSuccessModal,
    createSuccessModalAndOption,
    createErrorModal,
    createErrorModalAndOption,
    createNotificationModalAndOption,
    createNotificationModal,
    createConfirmModalByFunction
  };
}
