import { createAction } from 'redux-actions';
import axios from 'axios';

import routes from '../routes';

export const initChannels = createAction('INIT_CHANNELS');
export const initUser = createAction('INIT_USER');
export const initSocket = createAction('INIT_SOCKET');

export const sendMessageRequest = createAction('MESSAGE_SEND_REQUEST');
export const sendMessageSuccess = createAction('MESSAGE_SEND_SUCCESS');
export const sendMessageFailure = createAction('MESSAGE_SEND_FAILURE');

export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');

export const deleteChannelRequest = createAction('CHANNEL_DELETE_REQUEST');
export const deleteChannelSuccess = createAction('CHANNEL_DELETE_SUCCESS');
export const deleteChannelFailure = createAction('CHANNEL_DELETE_FAILURE');

export const renameChannelRequest = createAction('CHANNEL_RENAME_REQUEST');
export const renameChannelSuccess = createAction('CHANNEL_RENAME_SUCCESS');
export const renameChannelFailure = createAction('CHANNEL_RENAME_FAILURE');

export const addNewMessage = createAction('ADD_NEW_MESSAGE');
export const addNewChannel = createAction('ADD_NEW_CHANNEL');
export const changeChannel = createAction('CHANGE_CHANNEL');
export const removeChannel = createAction('REMOVE_CHANNEL');
export const renameChannel = createAction('RENAME_CHANNEL');

export const deleteChannel = ({ channelId }) => async (dispatch) => {
  dispatch(deleteChannelRequest());
  try {
    const url = routes.getDeleteChannelUrl(channelId);

    await axios.delete(url, {});
    dispatch(deleteChannelSuccess());
  } catch (e) {
    dispatch(deleteChannelFailure());
    console.log(`Error for deleting channel. ${e.message}`); // eslint-disable-line no-console
  }
};

export const changeChannelName = ({ text }, { channelId }) => async (dispatch) => {
  dispatch(renameChannelRequest());
  try {
    const url = routes.getRenameChannelUrl(channelId);

    const newChannelData = {
      data: {
        attributes: {
          name: text,
        },
      },
    };

    await axios.patch(url, newChannelData);
    dispatch(renameChannelSuccess());
  } catch (e) {
    dispatch(renameChannelFailure());
    console.log(`Error for renaming channel. ${e.message}`); // eslint-disable-line no-console
  }
};


export const addChannel = ({ text }) => async (dispatch) => {
  dispatch(addChannelRequest());
  try {
    const url = routes.getAddChannelUrl();

    const newChannelData = {
      data: {
        attributes: {
          name: text,
        },
      },
    };

    await axios.post(url, newChannelData);
    dispatch(addChannelSuccess());
  } catch (e) {
    dispatch(addChannelFailure());
    console.log(`Error for adding new channel. ${e.message}`); // eslint-disable-line no-console
  }
};

export const addMessage = ({ text }, currentChannelId, userName) => async (dispatch) => {
  dispatch(sendMessageRequest());
  try {
    const url = routes.getAddMessageUrl(currentChannelId);
    const newMessageData = {
      data: {
        attributes: {
          text,
          autor: userName,
        },
      },
    };

    await axios.post(url, newMessageData);
    dispatch(sendMessageSuccess(newMessageData));
  } catch (e) {
    dispatch(sendMessageFailure());
    console.log(`Error for sending message. ${e.message}`); // eslint-disable-line no-console
  }
};
