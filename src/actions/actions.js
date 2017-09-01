
//actions

const Move = 'Move';
const Dir_Up='Dir_Up';
const Dir_Down ='Dir_Down';
const Dir_Left = 'Dir_Left';
const Dir_Right = 'Dir_Right';
const Grow_Snake = 'Grow_Snake';
const Start_Game = 'Start_Game';
const Over_Game = 'Over_Game';
const Restart_Game = 'Restart_Game';
const New_High = 'New_High';





//action creators

function move(head){

  return {type:Move,head, meta:{sound:'move.short'}}
}
function dirDown(){

  return {type:Dir_Down}
}

function dirUp(){
  return {type:Dir_Up}
}

function dirLeft(){
  return {type:Dir_Left}
}

function dirRight(){
  return {type:Dir_Right}
}

function growSnake(head,food){
  return {type: Grow_Snake, head, food, meta:{sound:'eating'}}
}

function startGame(){
  return {type:Start_Game};
}

function overGame(){
  return {type:Over_Game, meta:{sound:'gameOver'}};
}

function restartGame(){
    return{ type:Restart_Game}
}

function newHigh(high){
  return {type:New_High, high}
}

//makes semi random new food
function randFood(getState){
  let nextFood=[]
  nextFood[0]=getState().gameBoard.food[0]>(getState().gameBoard.board.length/2)?Math.floor(Math.random()*(getState().gameBoard.board.length/2)):Math.floor(Math.random()*(getState().gameBoard.board.length/2))+getState().gameBoard.board.length/2;
  nextFood[1]=getState().gameBoard.food[1]>(getState().gameBoard.board[0].length/2)?Math.floor(Math.random()*(getState().gameBoard.board[0].length/2)):Math.floor(Math.random()*(getState().gameBoard.board[0].length/2))+getState().gameBoard.board[0].length/2;
  return nextFood
}
//check if head has hit the snakes body ending the gameBoard
function checkEnd(getState, head){
  var snakeCheck=[[],[]]
    var check =false;
    console.log('head')
    console.log(head[0])
    console.log(head[1])
  getState().gameBoard.snake.forEach((body,i)=>{
        if(i===0){}else{
        if (head[0]===body[0] && head[1]===body[1]){check=true}

        if(head[0]<0 || head[0]>getState().gameBoard.board.length-1 ||head[1]<0||head[1]>getState().gameBoard.board[0].length-1){check=true}

  }
  })
    return check;
}

//thunks
function moveRightThunk(){
  return function (dispatch,getState){

   if(getState().direction.dir!='left'){
      dispatch(dirRight())
     let head = getState().gameBoard.snake[0];
      const newHead = [head[0],head[1]+1]

     dispatch(move(newHead))
     if(checkEnd(getState,newHead)){
       console.log('gameOver');
       dispatch(overGame());
     }
     if(getState().gameBoard.snake[0][0]===getState().gameBoard.food[0] && getState().gameBoard.snake[0][1]===getState().gameBoard.food[1]){

          //somewhat randomly creating new food
         let newFood = randFood(getState);
          let head = getState().gameBoard.snake[0];
           const newHead = [head[0],head[1]+1]

        dispatch(growSnake(newHead,newFood))
      }
     }
   }

}

function moveLeftThunk(){
  return function(dispatch,getState){
   if(getState().direction.dir!='right'){
     dispatch(dirLeft())
     let head = getState().gameBoard.snake[0];
      const newHead = [head[0],head[1]-1]
     dispatch(move(newHead))
     if(checkEnd(getState,newHead)){
       console.log('gameOver');
       dispatch(overGame());
     }
     if(getState().gameBoard.snake[0][0]===getState().gameBoard.food[0] && getState().gameBoard.snake[0][1]===getState().gameBoard.food[1]){

          //somewhat randomly creating new food
         let newFood = randFood(getState);
          let head = getState().gameBoard.snake[0];
           const newHead = [head[0],head[1]-1]

        dispatch(growSnake(newHead,newFood))
      }
     }
   }

}

function moveDownThunk(){
  return function (dispatch,getState){
   if(getState().direction.dir!='up'){
     dispatch(dirDown())
     let head = getState().gameBoard.snake[0];
      const newHead = [head[0]+1,head[1]]
     dispatch(move(newHead))
     if(checkEnd(getState,newHead)){
       console.log('gameOver');
       dispatch(overGame());
     }
     if(getState().gameBoard.snake[0][0]===getState().gameBoard.food[0] && getState().gameBoard.snake[0][1]===getState().gameBoard.food[1]){

          //somewhat randomly creating new food
         let newFood = randFood(getState);
          let head = getState().gameBoard.snake[0];
           const newHead = [head[0]+1,head[1]]

        dispatch(growSnake(newHead,newFood))
      }
    }
   }

}

function moveUpThunk(){
  return function(dispatch,getState){
   if(getState().direction.dir!='down'){
     dispatch(dirUp())
     let head = getState().gameBoard.snake[0];
      const newHead = [head[0]-1,head[1]]
     dispatch(move(newHead))
     if(checkEnd(getState,newHead)){
       console.log('gameOver');
       dispatch(overGame());
     }
     if(getState().gameBoard.snake[0][0]===getState().gameBoard.food[0] && getState().gameBoard.snake[0][1]===getState().gameBoard.food[1]){

          //somewhat randomly creating new food
         let newFood = randFood(getState);
          let head = getState().gameBoard.snake[0];
           const newHead = [head[0]-1,head[1]]

        dispatch(growSnake(newHead,newFood))
      }
    }
   }

}

function hold(time){
  return new Promise(resolve =>
    setTimeout(resolve,time))

}

//game loop
function startTheGame(){
 return  async(dispatch, getState)=>{
   while(getState().start.start==='ready'||getState().start.start==='running'){
          console.log(getState().direction.dir);
     switch(getState().direction.dir){
        case 'up':
            dispatch(moveUpThunk())
            break;
        case 'down':
            dispatch(moveDownThunk())
            break;
        case 'left':
            dispatch(moveLeftThunk())
            break;
        case 'right':
            dispatch(moveRightThunk())
            break;
     }
   await hold(150);

   }
  }
}



function start(direction){
  return  function(dispatch, getState){
    
    switch(direction){
         case 'down':
             dispatch(dirDown())
             dispatch(startGame())
             dispatch(startTheGame())
             break;
         case 'left':
             dispatch(dirLeft())
             dispatch(startGame())
             dispatch(startTheGame())
             break;
         case 'right':
             dispatch(dirRight())
             dispatch(startGame())
             dispatch(startTheGame())
             break;

    }
  }
}


export{moveLeftThunk, moveRightThunk, moveDownThunk, moveUpThunk, startTheGame, restartGame, start, newHigh};
