## Multiplayer Super Mario Bros.

This is a *incomplete* multi-player recreation of [Nintendo's Super Mario Bros.](http://en.wikipedia.org/wiki/Super_Mario_Bros).
This is _not_ a port of the game, this is _not_ code conversion, this is _not_ the ROM running in an emulator. This is
a complete, written from scratch, recreation of one of my favorite classic games using HTML5 technologies in the browser. While I
will try my hardest to preserve the spirit of the game, and to come as close to the original as I can; expect slight
differences in gameplay, mechanics, and graphics.

This project is in no way endorsed by [Nintendo](http://www.nintendo.com/). Most images, logos, characters, dialog,
plot, and other assets taken from the original Super Mario Bros are copyrights of Nintendo; I claim no ownership of
any of the assets taken from the original game.

This game is built with [Phaser](http://phaser.io) and uses [Peer.js](http://peerjs.com/) + [WebRTC]() for peer to peer communications.

### Running the Game

The current state of the game is highly in flux, but you can always run the current state of master by installing
[Node.js](http://nodejs.org)

If you don’t have the grunt cli installed, do so first:

```shell
npm install grunt-cli -g
```

Then run the following:

```shell
git clone https://github.com/adelciotto/multiplayer-mario.git
cd multiplayer-mario
npm install
grunt
```

Then point your browser to [http://localhost:3000](http://localhost:3000).

### Preview

![preview](http://imgur.com/gkeQuZG.gif)

![title screen](http://imgur.com/v2fd8Ni.gif)

![multiplayer](http://imgur.com/e5Jheqc.png)

### License and Legal

This code-base is released under the [MIT License](http://opensource.org/licenses/MIT).

All dependencies are released under their own respective licenses.

Most images, logos, characters, dialog, plot, and other assets taken from the original Super Mario Bros
are copyrights of [Nintendo](http://www.nintendo.com/); I claim no ownership of any of the assets taken from the original game.
