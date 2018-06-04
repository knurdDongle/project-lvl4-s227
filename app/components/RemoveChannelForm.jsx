import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import connect from '../connect';

const mapStateToProps = () => {
  const props = {};
  return props;
};

@connect(mapStateToProps)
export default class RemoveChannelForm extends React.Component {
  state = {
    modal: false,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  deleteChannel = (e) => {
    e.preventDefault();
    const { channelId } = this.props;
    this.props.deleteChannel({ channelId });
    this.toggle();
  }

  render() {
    return (
      <div style={{ display: 'inline' }}>
        <Button size="sm" color="secondary" onClick={this.toggle}>{this.props.buttonName}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Delete channel.</ModalHeader>
          <ModalBody>
            <Button color="primary" onClick={this.deleteChannel}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}