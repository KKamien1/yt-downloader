import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./sw.js')
    .then(() => {
      console.log('Service worker registered! \uD83D\uDE00');
    })
    .catch(err => console.log(err));
}


ReactDOM.render(<App />, document.getElementById('app'));