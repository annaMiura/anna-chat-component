import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { emotes } from '../functions/emotesObject.js';
import { Emote } from './Emote.jsx';
import styled from 'styled-components';

const EmoteSelectorBox = styled.div`
  position: absolute;
  height: 300px;
  width: 296px;
  margin: 0;
  bottom: 113px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #dad8de;
  border-radius: 4px;
  box-shadow: 0 2px 4px -1px rgba(0,0,0,.1), 0 2px 2px -2px rgba(0,0,0,.02), 0 1px 4px 0 rgba(0,0,0,.04);
`;

const EmoteListContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
`;

const EmoteList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;s
  border-bottom: 1px solid #dad8de;
`;

export const EmoteSelector = (props) => {
  const streamerEmotes = emotes.streamerEmotes;
  const globalEmotes = emotes.globalEmotes;
  return (
    <EmoteSelectorBox>
      <EmoteListContainer>
        <EmoteList>
          {Object.keys(streamerEmotes).map((key, index) => {
            return <Emote emoteClicked={props.emoteClicked} phrase={key} src={streamerEmotes[key]} />;
          })}
        </EmoteList>

        <EmoteList>
          {Object.keys(globalEmotes).map((key, index) => {
            return <Emote emoteClicked={props.emoteClicked} phrase={key} src={globalEmotes[key]} />;
          })}
        </EmoteList>
      </EmoteListContainer>
    </EmoteSelectorBox>
  );
};
