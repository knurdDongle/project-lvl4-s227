import React from 'react';
import { Button } from 'reactstrap';
import NewChannelForm from './NewChannelForm';
import connect from '../connect';
import RemoveChannelForm from './RemoveChannelForm';
import RenameChannelForm from './RenameChannelForm';

const mapStateToProps = ({ channels }) => {
  const props = { channels };
  return props;
};

@connect(mapStateToProps)
export default class ChannelsList extends React.Component {
  onClick = currentChannelId => (e) => {
    e.preventDefault();
    this.props.changeChannel({ currentChannelId });
  }

  renderChannels = () => {
    const { channels } = this.props;
    const channelsList = channels.map(c => (
      <li key={c.id}>
        <Button color="link" onClick={this.onClick(c.id)}>{c.name}</Button>
        {c.removable ? <RenameChannelForm buttonName="R" channelId={c.id} /> : ''}
        {c.removable ? <RemoveChannelForm buttonName="-" channelId={c.id} /> : ''}
      </li>
    ));
    return (
      <div>
        <div>
          <h4>Channels (<NewChannelForm buttonName="ADD" />)</h4>
          <ul>
            {channelsList}
          </ul>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.renderChannels()}
      </div>
    );
  }
}
