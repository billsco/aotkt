var EG3 = EG3 || {};

EG3.BouncyBalls = function(args) {

  console.log("Level1 function invoked");
  this.settings = args;

  this.firstUpdate = true;

  /**
   * Part of the "level" contract
   */
  this.onetimeCreate = function() {
    console.log("BouncyBalls.onetimeCreate");

    //Add background
    this.game.add.sprite(0,0,"bg");

    this.greenBallGroup = new this.RandomBallGroup(this.game, this.settings.greenBallGroupSettings);
    this.greenBallGroup.init();
    this.greenBallGroup.bttw();

    this.sprite = new this.BlobSprite(this.game, this.settings);
    this.sprite.init();

    //Ask prototype to enable tab/follow motion of player
    this.enableTapFollow(this.sprite);

    this.countownClock = this.createCountDownTimer(this.settings.totalTime);
  };


  /**
   * Part of "level" contract
   */
  this.reset = function() {
    console.log("BouncyBalls.reset()");

    this.firstUpdate = true;
    this.sprite.resetPlayer();
    this.greenBallGroup.bttw();

    //re-enable the tap/follow on the sprite
    this.enableTapFollow(this.sprite);
    this.countownClock.reset(this.settings.totalTime);
    this.playerDead = false;
  };

  /**
   *
   */
  this.init = function(params) {
    console.log("Init called.  This is how I can pass state between ... states");
  };

  /**
   * Part of the "level" contract
   */
  this.displayFailState = function() {
    this.disableTapFollow();
    this.greenBallGroup.stopBalls();
    this.sprite.killPlayer();
  };
  /**
   * Part of the "level" contract
   */
  this.displayVictoryState = function() {
    this.disableTapFollow();
    this.greenBallGroup.stopBalls();
    this.sprite.stopPlayerMoving();
  };

  /**
   *
   */
  this.updateImpl = function() {
    if(this.firstUpdate) {
      this.firstUpdate = false;
      this.countownClock.startTimming();
    }
    else {
      if(!this.playerDead && this.countownClock.update()) {
        this.levelCompleted();
        return;
      }

    }
    //Useful thing which shows the bounding box of the sprite
//    this.game.debug.body(this.playerEye);

    this.game.physics.arcade.collide(this.greenBallGroup);
    this.game.physics.arcade.collide(this.sprite,
      this.greenBallGroup,
      null,
      this.playerBallCollisionProcess,
      this);
  };

  /**
   *
   */
  this.playerBallCollisionProcess = function(playerBody, ball) {
    console.log("Player/ball collision - process callback");
    if(this.playerDead) {
      return;
    }
    this.playerDead = true;
    this.levelFailed();

    return true;
  };
};

EG3.BouncyBalls.constructor = EG3.BouncyBalls;

EG3.BouncyBalls.prototype = new EG3.Level();


