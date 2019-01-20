import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';
import { PostMessageBox } from './PostMessageBox.jsx';
import ChatBox from './ChatBox.jsx';
import { Chat } from './Chat.jsx';
import { generateRandomNumber, twitchChatGenerator } from '../functions/chatGenerator.js';
import { emotes } from '../functions/emotesObject.js';
import { usersData } from '../functions/userData.js'

const App = styled.div`
  background-color: #faf9fa;
  font-size: 12px;
  width: 335px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;
const Header = styled.div`
  padding: 20px 50px;
  text-align: center;
  box-shadow: inset 0 -1px 0 0 #dad8de;
  border-left: solid 1px rgb(218, 216, 222);
`;

export class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      twitchChats: []
    };
    this.generateChatsAtRandomTimes = this.generateChatsAtRandomTimes.bind(this);
    this.generateRandomChats = this.generateRandomChats.bind(this);
    this.emoteCheck = this.emoteCheck.bind(this);
    this.postMessage = this.postMessage.bind(this);
  }

  componentDidMount() {
    const intervalID = setInterval(() => this.generateChatsAtRandomTimes(), 1000);
  }

  generateChatsAtRandomTimes() {
    const randomMilisecond = generateRandomNumber(250, 5000);
    setTimeout(() => this.generateRandomChats(), randomMilisecond);
  }

  generateRandomChats() {
    const id = generateRandomNumber(1, 502);
    const randomUser = usersData(id);
    const randomChat = twitchChatGenerator(randomUser.twitch_sub);
    randomUser.chat = this.emoteCheck(randomChat, randomUser.twitch_sub);
    this.setState({
      twitchChats: [...this.state.twitchChats, randomUser]
    });
  }

  emoteCheck(string, bool = false) {
    const words = string.split(' ');
    if (bool) {
      const phraseToImgTag = words.map(word => {
        if (emotes.globalEmotes[word]) {
          return `<span> <img max-width='28px' max-height='28px' src=${emotes.globalEmotes[word]} /> </span>`;
        } else if (emotes.streamerEmotes[word]) {
          return `<span> <img width='28px' height='28px' src=${emotes.streamerEmotes[word]} /> </span>`;
        } else {
          return word;
        }
      });
      return phraseToImgTag.join(' ');

    } else {
      const wordsWithEmoteImgTags = words.map(word => {
        return emotes.globalEmotes[word]
          ? `<span> <img max-width='28px' max-height='28px' src=${emotes.globalEmotes[word]} /> </span>`
          : word;
      });
      return wordsWithEmoteImgTags.join(' ');
    }
  }

  postMessage(chat) {
    chat = this.emoteCheck(chat, true);
    const chatInfo = {
      chat,
      username: 'taco_TUESDAY',
      color: 'slateblue',
      twitch_sub: true,
      mod_status: false,
    };
    this.setState({
      twitchChats: [...this.state.twitchChats, chatInfo]
    });
  }

  render() {
    return (
      <App>
        <Header>Chat On Videos</Header>
        <ChatBox chatsArray={this.state.twitchChats} />
        <PostMessageBox postMessage={this.postMessage}/>
      </App>
    );
  }
}
