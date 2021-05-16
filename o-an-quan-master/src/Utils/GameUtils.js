import { RandPos } from "./RandUtils";
import { CircularIndex } from "./ArrayUtils";

const Sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const MoveItemHelper = async (
  board,
  offset_size,
  index,
  direction,
  SetBoard
) => {
  while (board[index].pawn.pop()) {
    let real_index = CircularIndex(index + direction, board.length);
    let rand_pos = undefined;
    if (real_index == 0) {
      rand_pos = RandPos(
        board[real_index].pawn.length + board[real_index].king.length + 1,
        25,
        75,
        12.5 + offset_size / 2,
        100 - offset_size / 2
      );
      if (board[real_index].king.length != 0) {
        board[real_index].king[0] = rand_pos[board[real_index].pawn.length + 1];
      }
    } else if (real_index == Math.floor(board.length / 2)) {
      rand_pos = RandPos(
        board[real_index].pawn.length + board[real_index].king.length + 1,
        25,
        75,
        offset_size / 2,
        87.5 - offset_size / 2
      );
      if (board[real_index].king.length != 0) {
        board[real_index].king[0] = rand_pos[board[real_index].pawn.length + 1];
      }
    } else {
      rand_pos = RandPos(
        board[real_index].pawn.length + 1,
        offset_size / 2,
        100 - offset_size / 2
      );
    }
    board[real_index].pawn = rand_pos.slice(
      0,
      board[real_index].pawn.length + 1
    );
    SetBoard(board.slice());
    await Sleep(250);
    direction += Math.sign(direction);
  }
  return CircularIndex(index + direction, board.length);
};

const MoveItem = async (board, offset_size, index, direction, SetBoard) => {
  for (;;) {
    const current_index = await MoveItemHelper(
      board,
      offset_size,
      index,
      direction,
      SetBoard
    );
    if (current_index == 0 || current_index == Math.floor(board.length / 2)) {
      return 0;
    } else if (board[current_index].pawn.length != 0) {
      index = current_index;
    } else if (board[current_index].pawn.length == 0) {
      const next_index = CircularIndex(current_index + direction, board.length);
      if (next_index == 0 || next_index == Math.floor(board.length / 2)) {
        if (board[next_index].pawn.length < 3) {
          return 0;
        }
      }
      if (board[next_index].pawn.length != 0) {
        const score =
          board[next_index].pawn.length + board[next_index].king.length * 5;
        board[next_index].pawn = [];
        board[next_index].king = [];
        SetBoard(board.slice());
        return score;
      } else {
        return 0;
      }
    }
  }
};

const GameOver = (board) => {
  return (
    board[0].king.length + board[Math.floor(board.length / 2)].king.length == 0
  );
};

export { Sleep, MoveItem, GameOver };
