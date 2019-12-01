import React, { Component } from 'react';

/**
 * modal 高阶组件，封装通用方法
 * @param {*} Comp
 */
const ModalHOC = (Comp) => {
  return class ModalHOCWrapper extends Component {
    state = {
      visible: {},
      currentItem: {},
    };

    show = (key = 0, currentItem = {}) => {
      const { visible } = this.state;
      visible[key] = true;
      this.setState({ visible, currentItem });
    };

    close = (key = 0, currentItem) => {
      const { visible } = this.state;
      visible[key] = false;
      const stateObj = { visible };

      if (currentItem) {
        stateObj.currentItem = currentItem;
      }

      this.setState(stateObj);
    };

    render() {
      const props = {
        ...this.props,
        ...this.state,
        modalCurrentItem: this.state.currentItem,
        modalVisible: this.state.visible,
        onModalShow: this.show,
        onModalClose: this.close,
      };
      return <Comp {...props} />;
    }
  };
};

ModalHOC.displayName = 'ModalHOC';

export default ModalHOC;
