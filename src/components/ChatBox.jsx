import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import autoscroll from 'autoscroll-react';
import { Chat } from './Chat.jsx';

const ChatBoxStyle = styled.div`
  padding: 10px;
  height: calc(100vh - 240px);
  overflow-x: hidden;
  overflow-y: scroll;
`;

class ChatBox extends React.Component {
  render() {
    return (
      <ChatBoxStyle {...this.props} >
        { this.props.chatsArray.length ? this.props.chatsArray.map((twitchChat, index) => {
          return <Chat key={index} chat={twitchChat}/>;
        }) : null }
      </ChatBoxStyle>
    );
  }
}

export default autoscroll(ChatBox);