# About Tacky
Tacky is a lightweight, functional library built to help you (yes, you!) write Tic-Tac-Toe applications!  
Tacky makes it simple to interact with a Tic-Tac-Toe instance without complicated validation logic.  
## How to Use
To include Tacky in your project, install with `npm i @asebexen/tacky`  
A full demo of Tacky in React can be found [here](https://spontaneous-sundae-ae1826.netlify.app/). ([Repository](https://github.com/asebexen/tacky-reacky))  
Tacky exposes only a few functions, but they're all mega powerful!
```typescript
import * as tacky from '@asebexen/tacky';

// Generate a new, empty game board with an optional config object.
const initGame0 = tacky.init();
const initGame1 = tacky.init({startingPlayer: 'o'});

// Make a move in the top right square (2). Valid positions are in the range [0, 8].
const result0 = tacky.makeMove(initGame0, 2);
// Tacky guarantees that a valid game is returned, even if there are errors (in which case, the game will be unmodified). Errors are string enums, so they can be printed and understood.
if (result0.error) console.error(`Tacky error: ${result0.error}`);
const game0 = result0.game;

// Make another move, but this time without error handling!
const {game: game1} = tacky.makeMove(game0, 1);

// This is boring; let's just skip ahead to a game that X wins already.
const winningGame = tacky.fromHistory([2, 1, 4, 0, 6]);
```
Let's have a look at the winning game object...
```json
{
  "game": {
    "board": [ "o", "o", "x", null, "x", null, "x", null, null ],
    "moveHistory": [ 2, 1, 4, 0, 6 ],
    "startingPlayer": "x",
    "currentPlayer": "o",
    "state": "xwin",
    "winningLine": [ 2, 4, 6 ]
  },
  "error": null
}
```
The beauty of Tacky is that it's meant to be human-readable and friendly. I don't even think I have to explain the object above!  
By gracefully reporting errors in the `error` field, Tacky is flexible and unopinionated; it can be attached to any kind of frontend, and errors can be ignored or reported as desired!
## Features
- Full TypeScript support. I like types, you like types!
- Functional design, supporting immutability. Tryna make this crap work nicely with React and stuff.
- Automatic turn tracking. Why use mutable variables when it could be part of the game state?
- No-throw error handling for the following:
  - Out-of-bounds positions. While I applaud thinking outside the box, my game (sadly) does not.
  - Placing tiles in occupied cells. Preventing cheating is another way I stop you from having real fun.
  - Continuing to play after the game is over.
- History tracking. Everyone wants to relive that Play of the Game moment, right?
- Winning line provided free of charge. I get it, Tic Tac Toe is complex. You probably want a way to figure out how exactly X won instead of O.
## Planned Features
- Minimax tree support. I know you wanna know the optimal way to crush your opponents. (Hint: YOU CAN'T. Unless they're stupid. No offense.)
- Alternate ruleset support. Because normal Tic Tac Toe is boring. No offense.
- More robust input validation. Because some ~~JavaScript user~~ human being is gonna try to pass a boolean into my beautifully-typed functions and they're gonna BREAK IT and I'm gonna CRY.
## Bonus Features
- I told Cursor to use Tacky to write a sample Tic Tac Toe game and it did. It's so easy, even an AI can use it. uwu
## License
Tacky is licensed under the GNU GPLv3. If this is a royal pain in your arse, write to me and we can work it out. :3
## Contact
Email all inquiries to asebexen@gmail.com  
If you used Tacky in a project, feel free to let me know! I'd actually be quite flattered to hear from you lmao.
