this.Enemy= function(game,x,y,key,health,enemyBullets)
{
    Phaser.Sprite.call(this,game,x,y,key);
    
    this.animations.add('hit',[0,1,2,1,0],25,false);
    this.anchor.setTo(0.5);
    
    this.health=health;
    
    this.enemyBullets=enemyBullets;
};

this.Enemy.prototype=Object.create(Phaser.Sprite.prototype);
this.Enemy.prototype.constructor=this.Enemy;

this.Enemy.prototype.update=function()
{
    if(this.x<0.05*this.game.world.width)
        {
            this.x=0.05*this.game.world.width+2;
            this.body.velocity.x=-this.body.velocity.x;
        }
    else if(this.x>0.95*this.game.world.width){
        this.x=0.95*this.game.world.width-2;
        this.body.velocity.x=-this.body.velocity.x;
    }
    
    if(this.top>this.game.world.height)
        {
            this.kill();
        }
};

this.Enemy.prototype.damage=function(amount)
{
    Phaser.Sprite.prototype.damage.call(this,amount);
    this.play('hit');
}