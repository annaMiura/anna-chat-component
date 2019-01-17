import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { emotes } from '../functions/emotesObject.js';

const Username = styled.span`
  font-weight: 600;
  color: ${props => props.color}
`;

const TimeStamp = styled.span`
  font-size: 11px;
  padding-left: .5rem;
  padding-right: .5rem;
`;

export const Chat = props => {
  const chatInfo = props.chat;
  const isSub = chatInfo.twitch_sub;
  const isMod = chatInfo.mod_status;
  const color = chatInfo.color;
  return (
    <div>
      <span>{ isMod ? <img className='mod' width='18px' height='18px' src='https://s3-us-west-1.amazonaws.com/twitchchat/mod.png'/> : null }</span>
      <span>{ isSub ? <img className='sub' width='18px' height='18px' src='https://s3-us-west-1.amazonaws.com/twitchchat/seagsub.png'/> : null }</span>
      <Username color={chatInfo.color}> {chatInfo.username}</Username>:{' '}
      <span dangerouslySetInnerHTML={{ __html: chatInfo.chat }} />
    </div>
  );
};
