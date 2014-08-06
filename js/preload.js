var EG3 = EG3 || {};

EG3.Preload = function() {
  this.loadComplete = false;
  this.preloadSprite;
}

EG3.Preload.prototype = {
  preload: function() {
    console.log("Preload.preload");

    this.textText = this.game.make.text(1,1,"Loading",
      {
        "font": "32px Comic Sans MS",
        "fill": "#FFFFFF"
      });

    this.textText.x = (this.game.world.width/2)- (this.textText.width/2);
    this.textText.y = (this.game.world.height/6)*4;
    this.game.world.add(this.textText);

    var img = this.game.cache.getImage("preloadeImage");
    this.ballDiameter = img.width;
    this.preloadSprite = this.add.sprite(
      this.game.world.width/2 - (img.width/2),
      (this.game.world.height/2) - (img.height/2) - (img.height*5),
      "preloadeImage");

    this.tween = this.game.add.tween(this.preloadSprite).to(
      {y:((this.game.world.height/2) - (img.height/2))},
      1000,
      Phaser.Easing.Bounce.Out,
      false,
      500,
      100000,
      true);

    this.dots = 0;
//    this.tween.onLoop.add(this.onLoop, this);
    this.tween.start();

    this.game.time.events.repeat(500, 10000, this.onLoop, this);

/*
    this.tween2 = this.game.add.tween(this.preloadSprite).to(
      {angle:360},
      2000,
      Phaser.Easing.Cubic.in, true);
*/
    this.game.load.image("bg", "assets/bg2.png");
    this.game.load.image("logo", "assets/logo.png");
    this.game.load.image("splash", "assets/bg3.png");
    this.game.load.image("greenBall", "assets/greenBall.png");
    this.game.load.image("redBall", "http://localhost/billsco/slowImg/slowImg.php?name=redBall.png&time=10000");
    //this.game.load.image("redBall", "assets/redBall.png");
    this.game.load.image("playerBody", "assets/playerBody.png");
    this.game.load.image("playerEye", "assets/playerEye.png");
    this.game.load.image("bodyBig", "assets/bodyBig.png");
    this.game.load.image("blankEyeBig", "assets/blankEyeBig.png");
    this.game.load.image("mouthBig", "assets/mouthBig.png");
    this.game.load.image("pupilBig", "assets/pupilBig.png");
    this.game.load.image("deadEye", "assets/deadEye.png");
    this.game.load.image("paper", "assets/paper.png");
    this.game.load.image("bacon", "assets/bacon.png");
    this.game.load.image("blankButton", "assets/blankButton.png");
    this.game.load.image("spaceBackground", "assets/spaceBackground.png");
    this.game.load.tilemap("tilemap1", "assets/tilemap1.json");
    this.game.load.image("tile2", "assets/tile2.png");

    //Load any audio here

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
  },
  onLoop: function() {
    this.dots++;
    if(this.dots > 4) {
      this.dots = 0;
    }

    var suffix = "";
    for(var i = 0; i<this.dots; i++) {
      suffix = suffix + ".";
    }
    this.textText.text = "Loading" + suffix;
  },
  update: function() {
  },
  onLoadComplete: function() {
    console.log("Preload.onLoadComplete");
    this.game.state.start("options");
  }
};
