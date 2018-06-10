this.Enemy= function(game,x,y,key,health,enemyBullets)
{
    Phaser.Sprite.call(this,game,x,y,key);
    
    this.animations.add('hit',[0,1,2,1,0],25,false);
    this.anchor.setTo(0.5);
    
    this.health=health;
    
    this.enemyBullets=enemyBullets;
    
    this.enemyTimer=this.game.time.create(false);
    this.enemyTimer.start();
    
    this.scheduleShooting();
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
    
    if(this.health<=0)
        {
            var emitter=this.game.add.emitter(this.x,this.y,100);
            emitter.makeParticles('enemyParticle');
            emitter.minParticleSpeed.setTo(-200,-200);
            emitter.maxParticleSpeed.setTo(200,200);
            emitter.gravity=0;
            emitter.start(true,500,null,100);
            
            this.enemyTimer.pause();
            
        }
};

this.Enemy.prototype.reset=function(x,y,health,key,scale, speedX,speedY)
{
    Phaser.Sprite.prototype.reset.call(this,x,y,health);
    this.loadTexture(key);
    this.scale.setTo(scale);
    this.body.velocity.x=speedX;
    this.body.velocity.y=speedY;
    
    this.enemyTimer.resume();
};

this.Enemy.prototype.scheduleShooting=function()
{
    this.shoot();
    this.enemyTimer.add(Phaser.Timer.SECOND*2,this.scheduleShooting,this);
};

this.Enemy.prototype.shoot=function()
{
    this.enemyBullet=this.enemyBullets.getFirstExists(false);
    
    if(!this.enemyBullet)
        {
            this.enemyBullet=new EnemyBullet(game,this.x,this.bottom);
            this.enemyBullets.add(this.enemyBullet);
        }
    
    this.enemyBullet.reset(this.x,this.bottom);
    
    this.enemyBullet.body.velocity.y=1000;
}