import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';
import Timer from 'easytimer.js';
import { PostMessageBox } from './PostMessageBox.jsx';
import ChatBox from './ChatBox.jsx';
import { Chat } from './Chat.jsx';
import { generateRandomNumber, twitchChatGenerator } from '../functions/chatGenerator.js';
import { emotes } from '../functions/emotesObject.js';

const timer = new Timer();

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
`;

export class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalID: [],
      twitchChats: []
    };

    this.generateChatsAtRandomTimes = this.generateChatsAtRandomTimes.bind(this);
    this.generateRandomChats = this.generateRandomChats.bind(this);
    this.generateRandomUser = this.generateRandomUser.bind(this);
    this.emoteCheck = this.emoteCheck.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.postMessage = this.postMessage.bind(this);
    this.test = this.test.bind(this);
  }

  componentDidMount() {
    const intervalID = setInterval(() => this.generateChatsAtRandomTimes(), 1000);
    this.setState({intervalID: [intervalID]});
    timer.start();
  }

  generateChatsAtRandomTimes() {
    const randomMilisecond = generateRandomNumber(250, 5000);
    setTimeout(() => this.generateRandomChats(), randomMilisecond);
  }

  generateRandomChats() {
    return this.generateRandomUser()
      .then(randomUser => {
        const randomMessage = twitchChatGenerator(randomUser.twitch_sub);
        const chatInfo = {
          id: randomUser.id,
          chat: this.emoteCheck(randomMessage, randomUser.twitch_sub),
          username: randomUser.username,
          twitch_sub: randomUser.twitch_sub,
          mod_status: randomUser.mod_status,
          currentTimeStamp: this.formatTime(),
          color: randomUser.color
        };
        this.setState({
          twitchChats: [...this.state.twitchChats, chatInfo]
        });
      })
      .catch(err => {
        console.error('error from generateRandomChats function in ChatContainer', err);
      });
  }

  generateRandomUser() {
    const id = generateRandomNumber(1, 502);
    return axios.get('http://localhost:3028/users', {
      params: { id }
    })
      .then(userObj => {
        return userObj.data;
      })
      .catch(err => {
        console.error('error from generateRandomUser in ChatContainer', err);
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

  formatTime() {
    const currentTime = timer.getTimeValues();
    const seconds = currentTime.seconds < 10 ? `0${currentTime.seconds}` : currentTime.seconds;
    const minutes = currentTime.minutes < 10 ? `0${currentTime.minutes}` : currentTime.minutes;
    const hours = currentTime.hours < 10 ? `0${currentTime.hours}` : currentTime.hours;
    if (currentTime.hours < 1) {
      if (currentTime.minutes < 1) {
        return `0:${seconds}`;
      } else {
        return `${minutes}:${seconds}`;
      }
    } else {
      return `${hours}:${minutes}:${seconds}`;
    }
  }

  postMessage(chat) {
    const message = this.emoteCheck(chat, true);
    const chatInfo = {
      user_id: 504,
      chat: message,
      username: 'taco_TUESDAY',
      color: 'slateblue',
      twitch_sub: true,
      mod_status: false,
      currentTimeStamp: this.formatTime()
    };
    this.setState({
      twitchChats: [...this.state.twitchChats, chatInfo]
    });
  }

  test() {
    console.log('🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥')

  }
  render() {
    // console.log('outside =>', this)
    // let intervalID = this.state.intervalID;
    // const hashHandle = () => {
    //   if(window.location.hash === '#/Videos') {
    //     // console.log('location it changed')
    //     this.state.intervalID.forEach(num => clearInterval(num));
    //     // clearInterval(this.state.intervalID);
    //     this.setState({intervalID: []});
    //     console.log('inside =>', this)
    //   } else if(window.location.hash === '#/Followers') {
    //     console.log('Oh hey look, it is some followers!')
    //     this.test();
    //   } else if (window.location.hash === '#/') {
    //     console.log('Here we go, back to the beginning fam')
    //     const newIntervalID = setInterval(() => this.generateChatsAtRandomTimes(), 10000);
    //     this.setState({intervalID: [...this.state.intervalID, newIntervalID]});
    //   }
    // }
    // const thisHashHandler = hashHandle.bind(this);
    // window.addEventListener('hashchange', thisHashHandler, {once:true});
    return (
      <App>
        <Header>Chat On Videos</Header>
        <ChatBox chatsArray={this.state.twitchChats} />
        <PostMessageBox postMessage={this.postMessage}/>
      </App>
    );
  }
}
