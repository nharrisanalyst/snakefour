import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from'react-redux';
import rootReducer from './reducer/reducer';
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import soundsMiddleware from 'redux-sounds';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

//sound data
const soundData = {
    eating :"http://soundbible.com/mp3/Slime-SoundBible.com-803762203.mp3",
    gameOver:"http://soundbible.com/mp3/Dying-SoundBible.com-1255481835.mp3",
    move:{
   urls: [ 'http://soundbible.com/mp3/Single%20Water%20Droplet-SoundBible.com-425249738.mp3' ],
   sprite: {
     short: [0, 250],

   }
  }
}

const loadedSoundsMiddleware =soundsMiddleware(soundData);



let store =createStore(rootReducer,composeWithDevTools(applyMiddleware(ReduxThunk,logger,loadedSoundsMiddleware),));

ReactDOM.render(
   <Provider store={store}>
    <App />
   </Provider>
  , document.getElementById('root'));
registerServiceWorker();
