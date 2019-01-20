import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import autoscroll from 'autoscroll-react';
import { Chat } from './Chat.jsx';

const ChatBoxStyle = styled.div`
  padding: 10px;
  height: calc(100vh - 189px);
  overflow-x: hidden;
  overflow-y: scroll;
  border-left: solid 1px rgb(218, 216, 222);
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