import { combineReducers } from 'redux';



const init =[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

function gameBoard(state={board:init,snake:[[3,6],[2,6],[1,6]], food:[17,26]}, action={type:undefined}){


  switch(action.type){
    case 'Move':

      var newSnake = state.snake;

      newSnake.pop()
      newSnake.unshift(action.head);

       return {board:state.board.map((row,i)=>{
            return row.map((p,j)=>{
              let check=0
              for(var k = 0; k<newSnake.length; k++){

                  if(newSnake[k][0]===i && newSnake[k][1]===j){
                    check = 1
                    break;
                  }else if (state.food[0]===i && state.food[1]===j) {
                        check=3
                        break;
                  }{
                    check = 0;
                  }
                }
                return check;

              })

            })
       ,snake:newSnake.map(body=>{     //using map to return a new array
           return body;
       }),food:state.food}

      case 'Grow_Snake':

            var newSnake = state.snake;


            newSnake.unshift(action.head);

             return {board:state.board.map((row,i)=>{
                  return row.map((p,j)=>{
                    let check=0
                    for(var k = 0; k<newSnake.length; k++){

                        if(newSnake[k][0]===i && newSnake[k][1]===j){
                          check = 1
                          break;
                        }else if (action.food[0]===i && action.food[1]===j) {
                              check=3
                              break;
                        }{
                          check = 0;
                        }
                      }
                      return check;

                    })

                  })
             ,snake:newSnake.map(body=>{     //using map to return a new array
                 return body;
             }),food:action.food.map(food=>{  //using map to return a new array
               return food;
             })}

       case 'Restart_Game':
         return Object.assign({}, state, {board:init,snake:[[3,6],[2,6],[1,6]], food:[17,26]})
      default:
      return state;
  }

}

function direction(state={dir:'down'}, action={type:undefined}){
  switch(action.type){
    case 'Dir_Up':
      return Object.assign({},state, {dir:'up'});
    case 'Dir_Down':
      return Object.assign({},state, {dir:'down'});
    case 'Dir_Left':
      return Object.assign({},state, {dir:'left'});
    case 'Dir_Right':
      return Object.assign({},state, {dir:'right'});
     case 'Restart_Game':
        return Object.assign({},state, {dir:'down'})
    default:
    return state
  }


}

function start(state={start:'ready'}, action={type:undefined}){
   switch(action.type){
     case 'Start_Game':
       return Object.assign({}, state, {start:'running'});
     case 'Over_Game':
       return Object.assign({}, state, {start:'over'});
     case 'Restart_Game':
      return Object.assign({},state,{start:'re-ready'})
     default:
       return state;
   }

}

function score(state={high:0}, action={type:undefined}){
  switch(action.type){
    case'New_High':
       return Object.assign({},state,{high:action.high})
     default:
      return state
     }
  }





const rootReducer = combineReducers({
  gameBoard,
  direction,
  start,
  score
})


export default rootReducer;
