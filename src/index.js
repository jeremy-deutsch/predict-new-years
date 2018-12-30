import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";

import SongItem from "./components/SongItem";
import songData from "./songData.json";
import "./global.css";
import styles from "./index.module.css";

import Button from "@material-ui/core/Button";

const MAX_TOKENS = 8;

function App() {
  const [spentTokens, setSpentTokens] = useState({});

  const addToken = useCallback(
    songName => {
      setSpentTokens(spentTokens =>
        spentTokens[songName]
          ? { ...spentTokens, [songName]: spentTokens[songName] + 1 }
          : { ...spentTokens, [songName]: 1 }
      );
    },
    [setSpentTokens]
  );

  const removeToken = useCallback(
    songName => {
      setSpentTokens(spentTokens =>
        spentTokens[songName]
          ? { ...spentTokens, [songName]: spentTokens[songName] - 1 }
          : spentTokens
      );
    },
    [setSpentTokens]
  );

  const totalTokensUsed = Object.values(spentTokens).reduce((x, y) => x + y, 0);
  const hasTokens = totalTokensUsed < MAX_TOKENS;

  const renderSongItem = song => (
    <SongItem
      title={song.title}
      artist={song.artist}
      tokens={spentTokens[song.title]}
      hasTokens={hasTokens}
      odds={song.odds}
      spotify={song.spotify}
      addToken={addToken}
      removeToken={removeToken}
      key={song.title}
    />
  );

  const [name, setName] = useState("");

  const emailLink = `mailto:torpedobets@gmail.com?subject=${encodeURIComponent(
    name
  )}&body=${JSON.stringify(spentTokens)}`;

  let errorMessage = null;
  if (totalTokensUsed < MAX_TOKENS) {
    errorMessage = `Use all your tokens! You have ${MAX_TOKENS -
      totalTokensUsed} left.`;
  }

  const submitDisabled = Boolean(errorMessage) || !name;

  return (
    <div>
      <div>
        <div className={styles.headerTitleText}>
          Predict the Zuerserhof New Years' Playlist
        </div>
        <div>
          Every year, The Torpedos perform at the Zuerserhof's new years'
          celebration, performing old standbys as well as a couple new hits
          every year. Send in your guesses as to what they'll play this year!
          You get {MAX_TOKENS} tokens; use them to place bets on songs and earn
          points if those songs get played.
        </div>
      </div>
      <div className={styles.tokensLeftText}>
        Tokens left: {MAX_TOKENS - totalTokensUsed}
      </div>
      <div>
        <div className={styles.sectionTitleText}>New Songs</div>
        <div className={styles.sectionDescriptionText}>
          These are popular songs that came out this year. Their individual
          chances are pretty low, so you can win a lot of points here.
        </div>
        <div>{songData.new.map(renderSongItem)}</div>
      </div>
      <div>
        <div className={styles.sectionTitleText}>Classic Hits</div>
        <div className={styles.sectionDescriptionText}>
          These are songs that the Torpedos played in previous years. They're
          pretty safe bets, but you can't win a lot from them.
        </div>
        <div>{songData.old.map(renderSongItem)}</div>
      </div>
      <div>
        <div className={styles.yourNameText}>Your Name</div>
        <input
          type="text"
          className={styles.yourNameInput}
          onChange={e => setName(e.target.value)}
          value={name}
        />
      </div>
      {!!errorMessage && <div>{errorMessage}</div>}
      <Button
        variant="contained"
        style={buttonStyle(submitDisabled)}
        href={emailLink}
        disabled={submitDisabled}
      >
        Submit
      </Button>
    </div>
  );
}

// css doesn't work with material-ui
const buttonStyle = disabled => ({
  backgroundColor: disabled ? "#c1dad6" : "#6d929b",
  color: "white",
  fontWeight: 600,
  fontFamily: "Open Sans",
  fontSize: 18,
  marginTop: 16,
  width: "100%"
});

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
