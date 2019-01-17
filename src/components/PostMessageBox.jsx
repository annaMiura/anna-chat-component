import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { EmoteSelector } from './EmoteSelector.jsx';
import { HappyFaceIcon } from './HappyFaceIcon.jsx';
import { Modal } from './Modal.jsx';

const TextBoxContainer = styled.div`
  box-shadow: inset 0 1px 0 0 #dad8de;
  padding: 10px 20px 20px 20px;
  position: absolute;
  width: 89%;
  bottom: 0;
  background-color: inherit;
`;

const TextBox = styled.div`
  background: #fff;
  height: 45px;
  border: 1px solid #dad8de;
  border-radius: 4px;
  color: #433f4a;
  line-height: 1.5;
  outline: 0;
  transition: box-shadow .1s ease-in,border .1s ease-in;
  position: relative;
  &:focus-within {
    border-color: #7d5bbe;
    box-shadow: 0 0 6px -2px #7d5bbe;
  }
`;

const TextArea = styled.textarea`
  padding: 5px 0px 5px 10px;
  border: none;
  color: #433f49;
  resize: none;
  font-family: inherit;
  outline: none;
  width: 87%;
`;

const PostButtonContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding-top: 8px;
`;

const PostButton = styled.button`
  height: 30px;
  width: 45px;
  background: #6441a4;
  border: 1px solid transparent;
  border-radius: 4px;
  color: #fff;
  font-family: inherit;
`;

export class PostMessageBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: '',
      emoteSelector: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onEnterPress = this.onEnterPress.bind(this);
    this.toggleEmoteSelector = this.toggleEmoteSelector.bind(this);
    this.renderEmoteSelector = this.renderEmoteSelector.bind(this);
    this.insertEmote = this.insertEmote.bind(this);
  }

  handleChange(e) {
    const chat = e.target.value;
    this.setState({ chat });
  }

  handleClick() {
    this.props.postMessage(this.state.chat);
    const clearTextArea = document.getElementById('textBox');
    clearTextArea.value = '';
    this.setState({chat: ''});
  }

  onEnterPress(e) {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      this.handleClick();
    }
  }

  toggleEmoteSelector() {
    this.setState(prevState => {
      return {emoteSelector: !prevState.emoteSelector};
    });
  }

  insertEmote(phrase) {
    const textArea = document.getElementById('textBox');
    textArea.value += `${phrase} `;
    this.setState(prevState => {
      return {chat: `${prevState.chat} ${phrase}`};
    });
  }

  renderEmoteSelector() {
    return this.state.emoteSelector ? <Modal> <EmoteSelector emoteClicked={this.insertEmote} /> </Modal> : null;
  }

  render() {
    return (
      <TextBoxContainer>
        <TextBox>
          <TextArea id="textBox" placeholder="Post a message" onChange={e => this.handleChange(e)} onKeyDown={(e) => this.onEnterPress(e)}/>
          <HappyFaceIcon clickHandler={this.toggleEmoteSelector} />
          {this.renderEmoteSelector()}
        </TextBox>
        <PostButtonContainer>
          <PostButton id="postButton" onClick={this.handleClick}>
            Chat
          </PostButton>
        </PostButtonContainer>
      </TextBoxContainer>
    );
  }
}
