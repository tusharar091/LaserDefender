this.PlayerBullet=function(game,x,y)
{
    Phaser.Sprite.call(this,game,x,y,'bullet');

    this.anchor.setTo(0.5);
    this.checkWorldBounds=true;
    this.outOfBoundsKill=true;
};

this.PlayerBullet.prototype=Object.create(Phaser.Sprite.prototype);
this.PlayerBullet.prototype.constructor=this.PlayerBullet;