import "./App.css";

import { useState, useEffect } from "react";

import Modal from "react-modal";

import Board from "./Components/Board";
import Score from "./Components/Score";

Modal.setAppElement("#root");

function App() {
  let [scores, setScores] = useState([0, 0]);
  let [gameOver, setGameOver] = useState(false);
  let [isOpenHUD, setOpenHUD] = useState(true);
  let [HUDLabel, setHUDLabel] = useState("Welcome!");

  useEffect(() => {
    if (gameOver) {
      if (scores[0] == scores[1]) {
        setHUDLabel("Tie!");
      } else if (scores[0] > scores[1]) {
        setHUDLabel("Player 1 win!");
      } else if (scores[0] < scores[1]) {
        setHUDLabel("Player 2 win!");
      }
    }
  }, [gameOver]);
  return (
    <div className="App">
      <Modal
        isOpen={isOpenHUD || gameOver}
        contentLabel={HUDLabel}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "column",
          },
        }}
      >
        <h3 style={{ textAlign: "center" }}>{HUDLabel}</h3>
        <button
          onClick={() => {
            setOpenHUD(false);
            setScores([0, 0]);
            setGameOver(false);
          }}
        >
          New Game!
        </button>
      </Modal>
      <Board
        ncol={5}
        npawn={5}
        setScores={setScores}
        scores={scores}
        setGameOver={setGameOver}
        setHUDLabel={setHUDLabel}
        gameOver={gameOver}
      />
      <Score scores={scores} />
      {(gameOver && <div>Game Over</div>) || undefined}
    </div>
  );
}

export default App;
