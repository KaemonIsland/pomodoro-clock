import React from 'react';
import { createPortal } from 'react-dom';

class NewWindowPortal extends React.Component {
  constructor(props) {
    super(props);
    this.container = document.createElement('div');
    this.externalWindow = null;
  }

  componentDidMount() {
    this.externalWindow = window.open('', '', 'width=600, height=400, left=200, top=200');
    this.externalWindow.document.body.appendChild(this.container);
  }

  componentWillUnmount() {
    this.externalWindow.close();
  }

  render() {
    return createPortal(
      this.props.children, this.container
    )
  }
}

export default NewWindowPortal;