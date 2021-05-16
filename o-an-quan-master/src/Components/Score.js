import styled from "styled-components";

const ScoreContainer = styled.div`
  display: flex;
  margin: auto;
  width: 90%;
`;

const ScorePlayer = styled.div`
  width: 50%;
`;

const PlayerName = styled.h2``;

const Score = (props) => {
  return (
    <ScoreContainer>
      {[0, 1].map((player) => (
        <ScorePlayer key={`player,${player}`}>
          <PlayerName>Player {player + 1}</PlayerName>
          {props.scores[player]}
        </ScorePlayer>
      ))}
    </ScoreContainer>
  );
};

export default Score;
