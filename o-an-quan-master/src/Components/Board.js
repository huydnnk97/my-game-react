import { useState, useEffect } from "react";
import styled, { css } from "styled-components";

import { King, Pawn, ArrowLeft, ArrowRight } from "./Items";
import { RandPos } from "../Utils/RandUtils";
import { GameOver, MoveItem } from "../Utils/GameUtils";

const BORDER_SIZE = 0.1;

const PAWN_SIZE_PER = 15;
const KING_SIZE_PER = 25;

const PawnBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  flex-grow: ${(props) => props.ncol};
  order: 2;
`;

const PawnCell = styled.div`
  width: ${(props) => 100 / props.ncol}%;
  position: relative;
  box-sizing: border-box;
  border: ${BORDER_SIZE}rem solid palevioletred;
  border-${(props) => (props.top && "top") || "bottom"}-width: 
    ${2 * BORDER_SIZE}rem;
  order: ${(props) => props.order};
  &:before {
    content: "";
    float: left;
    padding-top: 100%;
  }
  ${(props) => {
    if (props.is_clicked) {
      return css`
        background-color: gray;
      `;
    }
  }}
`;

const KingCell = styled.div`
  position: relative;
  box-sizing: border-box;
  background-color: transparent;
  border-top-${(props) => (props.left && "left") || "right"}-radius: 1000rem;
  border-bottom-${(props) => (props.left && "left") || "right"}-radius: 1000rem;
  border: ${2 * BORDER_SIZE}rem solid palevioletred;
  border-${(props) =>
    (props.left && "right") || "left"}-width: ${BORDER_SIZE}rem;
  flex-grow: 1;
  order: ${(props) => (props.left && 1) || 3};
  ${(props) => {
    if (props.is_clicked) {
      return css`
        background-color: gray;
        z-index: 0;
      `;
    }
  }}
`;

const BoardContainer = styled.div`
  display: flex;
  width: 90%;
  margin: auto;
`;

const initializeBoard = (ncol, npawn) => {
  let temps = new Array(2 * (ncol + 1));
  temps[0] = { pawn: [], king: [{ x: 50, y: 50 }] };
  for (let i = 1; i < ncol + 1; ++i) {
    temps[i] = {
      pawn: RandPos(npawn, KING_SIZE_PER / 2, 100 - KING_SIZE_PER / 2),
      king: [],
    };
  }
  temps[ncol + 1] = { pawn: [], king: [{ x: 50, y: 50 }] };
  for (let i = ncol + 2; i < 2 * ncol + 2; ++i) {
    temps[i] = {
      pawn: RandPos(npawn, KING_SIZE_PER / 2, 100 - KING_SIZE_PER / 2),
      king: [],
    };
  }
  return temps;
};

const Board = (props) => {
  let [board, SetBoard] = useState(
    () => initializeBoard(props.ncol, props.npawn),
    []
  );

  let [clicked, SetClick] = useState("");

  let [player, setPlayer] = useState(0);

  useEffect(() => {
    if (props.gameOver === false) {
      console.log("Rerender");
      SetBoard(initializeBoard(props.ncol, props.npawn));
    }
  }, [props.gameOver]);

  return (
    <BoardContainer>
      {[
        { side: "left", arrow: ArrowRight },
        { side: "right", arrow: ArrowLeft },
      ].map((cell, i) => (
        <KingCell
          data-key={`side,${cell.side}`}
          key={`side,${cell.side}`}
          left={cell.side == "left" ? 1 : undefined}
          onClick={(e) => {
            SetClick(
              clicked == e.target.dataset.key ? "" : e.target.dataset.key
            );
          }}
          is_clicked={clicked == `side,${cell.side}`}
        >
          {[25, 75].map((top) => (
            <cell.arrow
              key={`${cell.side},${top}`}
              top={top}
              size={"2.5rem"}
              is_clicked={clicked == `side,${cell.side}` ? 1 : undefined}
            />
          ))}
          {[
            { component: King, key: "king", width: KING_SIZE_PER },
            { component: Pawn, key: "pawn", width: PAWN_SIZE_PER },
          ].map((item) =>
            board[i * (props.ncol + 1)][item.key].map((pos, i) => (
              <item.component
                key={`${cell.side},${item.key},${i}`}
                width={item.width}
                top={pos.x}
                left={pos.y}
                side
              />
            ))
          )}
        </KingCell>
      ))}
      <PawnBoard ncol={props.ncol}>
        {[
          { start: 1, end: props.ncol + 1, direction: -1 },
          { start: props.ncol + 2, end: 2 * props.ncol + 2, direction: 1 },
        ].map((cells, i) =>
          board.slice(cells.start, cells.end).map((cell, j) => (
            <PawnCell
              data-key={`${i},${j}`}
              key={`${i},${j}`}
              ncol={props.ncol}
              top={i == 0 ? 1 : undefined}
              order={2 * i * props.ncol - j * cells.direction}
              onClick={(e) => {
                SetClick(
                  clicked == e.target.dataset.key ? "" : e.target.dataset.key
                );
              }}
              is_clicked={clicked == `${i},${j}`}
            >
              {[
                { Tag: ArrowLeft, direction: cells.direction },
                { Tag: ArrowRight, direction: -cells.direction },
              ].map((arrow) => {
                return (
                  <arrow.Tag
                    key={`${arrow.Tag},${i},${j}`}
                    size={"2.5rem"}
                    is_clicked={clicked == `${i},${j}` ? 1 : undefined}
                    onClick={async () => {
                      SetClick("");
                      const score = await MoveItem(
                        board,
                        KING_SIZE_PER,
                        i * (props.ncol + cells.direction) + j + 1,
                        arrow.direction,
                        SetBoard
                      );
                      props.scores[player] += score;
                      props.setScores(props.scores.slice());
                      setPlayer(1 - player);
                      props.setGameOver(GameOver(board));
                    }}
                  />
                );
              })}
              {cell.pawn.map((pos, k) => (
                <Pawn
                  key={`${i},${j},${k}`}
                  top={pos.x}
                  left={pos.y}
                  width={PAWN_SIZE_PER}
                />
              ))}
            </PawnCell>
          ))
        )}
      </PawnBoard>
    </BoardContainer>
  );
};

export default Board;
