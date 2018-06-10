this.EnemyBullet=function(game,x,y)
{
    Phaser.Sprite.call(this,game,x,y,'bullet');
    this.anchor.setTo(0.5);
    this.checkWorldBounds=true;
    this.outOfBoundsKill=true;
};

this.EnemyBullet.prototype=Object.create(Phaser.Sprite.prototype);
this.EnemyBullet.prototype.constructor=this.EnemyBullet;

