import styled, { css } from "styled-components";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const Circle = styled.div`
  border-radius: 50%;
  display: inline-block;
  border: 0.1rem solid palevioletred;
`;

const Pawn = styled(Circle)`
  background-color: green;
  position: absolute;
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
  transform: translate(-50%, -50%);
  width: ${(props) => props.width}%;
  height: ${(props) => (!props.side && props.width) || props.width / 2}%;
`;

const King = styled(Pawn)`
  background-color: red;
  z-index: -1;
`;

const ArrowLeft = styled(FaArrowAltCircleLeft)`
  position: absolute;
  transform: translate(0, -50%);
  left: 0%;
  top: ${(props) => props.top || 50}%;
  display: none;
  z-index: 10;
  ${(props) => {
    if (props.is_clicked) {
      return css`
        display: block;
      `;
    }
  }}
`;

const ArrowRight = styled(FaArrowAltCircleRight)`
  position: absolute;
  transform: translate(0, -50%);
  right: 0%;
  top: ${(props) => props.top || 50}%;
  display: none;
  z-index: 10;
  ${(props) => {
    if (props.is_clicked) {
      return css`
        display: block;
      `;
    }
  }}
`;

export { Circle, Pawn, King, ArrowLeft, ArrowRight };
