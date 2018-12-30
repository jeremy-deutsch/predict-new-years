import React from "react";
import { string, number, bool, func } from "prop-types";
import IconButton from "@material-ui/core/IconButton";

import styles from "./SongItem.module.css";
const imgSrc =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/168px-Spotify_logo_without_text.svg.png";

function SongItem(props) {
  const totalPayout = Number((props.tokens * props.odds).toFixed(2));

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.songInfoContainer}>
          <div className={styles.songInfoTextContainer}>
            <div className={styles.songTitleText}>{props.title}</div>
            <div className={styles.artistNameText}>{props.artist}</div>
          </div>
          {!!props.spotify && (
            <a
              href={`https://open.spotify.com/track/${props.spotify}`}
              target="_blank"
            >
              <img
                src={imgSrc}
                alt="spotify"
                className={styles.spotifyLogo}
                height="40"
              />
            </a>
          )}
        </div>
      </div>
      <div className={styles.bettingContainer}>
        <div className={styles.oddsContainer}>
          <div className={styles.oddsText}>
            {props.odds}
            {!props.tokens && " pts"}
          </div>
          {!!props.tokens && (
            <div className={styles.outcomeText}>
              &nbsp;x {props.tokens} = {totalPayout} pts
            </div>
          )}
        </div>
        <div>
          {!!props.tokens && (
            <IconButton
              style={iconButtonStyle}
              onClick={() => props.removeToken(props.title)}
            >
              ❌
            </IconButton>
          )}
          {!!props.hasTokens && (
            <IconButton
              style={iconButtonStyle}
              onClick={() => props.addToken(props.title)}
            >
              🤑
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
}

SongItem.propTypes = {
  title: string.isRequired,
  artist: string,
  tokens: number.isRequired,
  odds: number.isRequired,
  hasTokens: bool.isRequired,
  addToken: func.isRequired,
  removeToken: func.isRequired
};

// CSS doesn't work easily for material-ui
const iconButtonStyle = {
  fontSize: 20,
  padding: 6
};

export default React.memo(SongItem);
