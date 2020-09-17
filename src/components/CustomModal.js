import React, {forwardRef} from 'react';
import Modal from 'react-native-modal';

const CustomModal = forwardRef(
  (
    {
      isVisible,
      backdropOpacity = 0.6,
      isAllowDismiss = true,
      onDismiss,
      onModalShow,
      onModalHide,
      style,
      children,
      animationIn = 'fadeIn',
      animationOut = 'fadeOut',
    },
    ref,
  ) => (
    <Modal
      ref={ref}
      isVisible={isVisible}
      style={style}
      animationIn={animationIn}
      animationOut={animationOut}
      animationInTiming={250}
      animationOutTiming={250}
      backdropOpacity={backdropOpacity}
      backdropTransitionOutTiming={0}
      onBackdropPress={isAllowDismiss ? onDismiss : undefined}
      onBackButtonPress={isAllowDismiss ? onDismiss : undefined}
      onModalShow={onModalShow}
      avoidKeyboard={false}
      onModalHide={onModalHide}>
      {children}
    </Modal>
  ),
);

export default CustomModal;
