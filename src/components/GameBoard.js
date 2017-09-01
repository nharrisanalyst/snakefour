import React from 'react';
import Sound from 'react-sound';



class GameBoard extends React.Component{
  handleKeyDown = (e) => {
     let {gameBoard, gameState,snake, handleUp, handleDown,handleRight,handleLeft, handleStart, handleRestart, handleStartGame, handleNewHigh}  = this.props;

        switch(e.keyCode) {
            case 37://left
                gameState==='running'?handleLeft():gameState==='ready'||gameState==='re-ready'?handleStartGame('left'):null;
                break;
            case 38://up
                gameState==='running'?handleUp():gameState==='ready'||gameState==='re-ready'?null:null;
                break;
            case 39://right
              gameState==='running'?handleRight():gameState==='ready'||gameState==='re-ready'?handleStartGame('right'):null;
                break;
            case 40://down
                gameState==='running'?handleDown():gameState==='ready'||gameState==='re-ready'?handleStartGame('down'):null;
                break;
             case 32:
               handleRestart();

            default:

                return;
        }


    }



 render(){
   let {snake, highScore, gameBoard, gameState, handleUp, handleDown,handleRight,handleLeft, handleStart, handleRestart, handleStartGame, handleNewHigh}  = this.props

     if(snake.length>highScore){handleNewHigh(snake.length)}

  return(

      <div>

      <div id='gameConsole'>
       <div id = 'gameScreen'>
       { (()=>{

        switch(gameState){
          case 'over':
          return(

            gameBoard.map((r,j)=>
               <div key ={'row'+j} className='row'>
                      {r.map((p,i)=>
                         p===0?<div className='peice' key={'peice'+i} style={{backgroundColor:'#d5e8b7'}}></div>:p===1?<div className='peice' style={{backgroundColor:'grey'}}></div>:<div id='gameFood' className='peice' style={{backgroundColor:'grey'}}></div>

                      )}
                 </div>

               )


               )



           default:
        return(

           gameBoard.map((r,j)=>
             <div key ={'row'+j} className='row'>
                    {r.map((p,i)=>
                       p===0?<div className='peice' key={'peice'+i} style={{backgroundColor:'#d5e8b7'}}></div>:p===1?<div className='peice' style={{backgroundColor:'green'}}></div>:<div id='gameFood' className='peice' style={{backgroundColor:'#F4A460'}}></div>

                    )}
               </div>)


             )
           }
           })()
           }
        </div>
        <div id="controller">
       <div id="restart" onClick ={()=>handleRestart()} > Restart</div>
       <div id="moveButtons">
       <div id ="up" className="controlls" onClick={()=>gameState==='running'?handleUp():gameState==='ready'||gameState==='re-ready'?null:null}>U</div>
       <div id="lrButtons">
       <div id="left" className="controlls" onClick ={()=>gameState==='running'?handleLeft():gameState==='ready'||gameState==='re-ready'?handleStartGame('left'):null} > L</div>
         <div id='buttonFill'></div>
        <div id="right" className="controlls" onClick ={()=> gameState==='running'?handleRight():gameState==='ready'||gameState==='re-ready'?handleStartGame('right'):null}> R </div>
       </div>
       <div id="down" className="controlls" onClick ={()=>gameState==='running'?handleDown():gameState==='ready'||gameState==='re-ready'?handleStartGame('down'):null} >D</div>
       </div>

      </div>
        <div id ='scores'>
         <div id ="highScore">HighScore: {highScore}</div><div id ='score'>Score: {snake.length}</div>
        </div>
        <div id='title'>
        <div id='snakeTitle'><b>SNAKE IV</b></div><div id='nameTitle'>IndependentViz.com production</div>
        </div>
      </div>

      </div>


  )


}
componentDidMount() {
        window.onkeydown = this.handleKeyDown;
    }
}
export default GameBoard;
