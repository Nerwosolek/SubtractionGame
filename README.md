# SubtractionGame
This is a short puzzle game in JS.
Version 1.0

Rules
========
Take one ball or two balls. Who takes the last ball looses.
Play with computer and see if you can win when he starts or if you start.

Starting game
===============
Just open subgame_en.html for english version or
subgame.html for polish version.

Plans for next version
=======================
1. Add generalization of the game by introducing two parameters:
  - balls number
  - balls to take in 1 move
2. Better internationalization (not with X different htmls)
3. Checking if balls number is not < 3 and balls in 1 move < 1.
	Others conditions OK (balls in 1 move could be > total balls number,
	cause you cannot take more balls than you see on screen).
4. In title DIV make and update info about:
	a. remaining balls
	b. balls currently highlighted

Development hints
===================
1. after changing sub.js which is main java script file for the game, remember to update sub.min.js
  by minifying sub.js
