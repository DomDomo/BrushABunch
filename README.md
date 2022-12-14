# BrushABunch
An online website where users are randomly chosen to draw while others guess the chosen word. You can see a demo of how it works [here](https://brushabunch.up.railway.app/).

## Client-Server
The "app" uses socket.io library to allow users to communicate via a server which only broadcasts their messages to each other. Just run `npm install && npm start` and you are good to go on localhost:3000.

## Play
Open two browser tabs on localhost:3000 or go to https://brushabunch.up.railway.app/ and join the lobby. Once 2 players are connected the round will begin.

## Drawing Canvas
The drawing is done on an HTML5 canvas. Mouse events for drawing and other events such as color and thickness change are communicated to other users on that same server.

## Chat
Chat functionality is also implemented so that users can chat and subbmit their guesses.
