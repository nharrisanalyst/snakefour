import React from 'react';
import { connect } from 'react-redux';
import GameBoard from '../components/GameBoard';
import {moveLeftThunk, moveRightThunk, moveDownThunk, moveUpThunk,startTheGame, restartGame, start, newHigh} from '../actions/actions';

const mapStateToProps = state =>{

  return{
            gameBoard: state.gameBoard.board,
            gameState: state.start.start,
            snake: state.gameBoard.snake,
            highScore:state.score.high
  };
}



const mapDispatchToProps = dispatch =>{
  return{
    handleUp:()=>dispatch(moveUpThunk()),
    handleDown:()=>dispatch(moveDownThunk()),
    handleLeft: ()=>dispatch(moveLeftThunk()),
    handleRight: () => dispatch(moveRightThunk()),
    handleStart: () => dispatch(startTheGame()),
    handleRestart: ()=>dispatch(restartGame()),
    handleStartGame:dir=>dispatch(start(dir)),
    handleNewHigh:score=>dispatch(newHigh(score))
  };
}



const GameCon =connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameBoard)

export default GameCon;
