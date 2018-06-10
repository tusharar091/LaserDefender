var GameState={
    
    init : function()
    {
        this.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally=true;
        this.scale.pageAlignVertically=true;
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.cursors=this.game.input.keyboard.createCursorKeys();

        this.PLAYER_SPEED=200;
        this.BULLET_SPEED=-500;
    },
    
    preload : function()
    {
        this.load.image('space','assets/images/space.png');
        this.load.image('player','assets/images/player.png');
        this.load.image('bullet','assets/images/bullet.png');
        this.load.image('enemyParticle','assets/images/enemyParticle.png');
        
        this.load.spritesheet('yellowEnemy','assets/images/yellow_enemy.png',50,46,3,1,1);
        this.load.spritesheet('redEnemy','assets/images/red_enemy.png',50,46,3,1,1);
        this.load.spritesheet('greenEnemy','assets/images/green_enemy.png',50,46,3,1,1);
        
    },
    
    create : function()
    {
        this.background=this.game.add.tileSprite(0,0,this.game.world.width, this.game.world.height,'space');
        this.background.autoScroll(0,30);
        
        this.player=this.game.add.sprite(this.game.world.centerX,this.game.world.height-50,'player');
        this.player.anchor.setTo(0.5);
        
        this.game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds=true;
        
        this.initBullets();
        this.shootingTime=this.game.time.events.loop(Phaser.Timer.SECOND/5,this.createPlayerBullets,this);
        
        this.initEnemies();
        
        this.loadLevel();
        
        
    },
    
    update : function()
    {
        this.game.physics.arcade.overlap(this.playerBullets,this.enemies,this.damageEnemy,null,this);
        
        this.game.physics.arcade.overlap(this.enemyBullets,this.player,this.killPlayer,null,this);
        this.player.body.velocity.x=0;
        
        if(this.game.input.activePointer.isDown)
            {
                this.targetX=this.game.input.activePointer.x;
                
                if(this.targetX<=this.game.world.centerX)
                    {
                        this.direction=-1;
                    }
                else{
                    this.direction=1;
                }
                
                this.player.body.velocity.x=this.direction*this.PLAYER_SPEED;
            }
        else if(this.cursors.left.isDown)
            {
                this.player.body.velocity.x=-1*this.PLAYER_SPEED;
            }
        else if(this.cursors.right.isDown)
            {
                this.player.body.velocity.x=this.PLAYER_SPEED;
            }
    },
    
    initBullets : function()
    {
        this.playerBullets=this.game.add.group();
        this.playerBullets.enableBody=true;
    },
    
    createPlayerBullets :  function()
    {
        var bullet=this.playerBullets.getFirstExists(false);
        
        if(!bullet)
            {
                bullet=new PlayerBullet(this.game,this.player.x,this.player.top);
                this.playerBullets.add(bullet);
            }
        bullet.reset(this.player.x,this.player.top);
        
        bullet.body.velocity.y=this.BULLET_SPEED;
        
        
    },
    
    initEnemies :  function()
    {
        this.enemies=this.game.add.group();
        this.enemies.enableBody=true;
        
        this.enemyBullets=this.game.add.group();
        this.enemyBullets.enableBody=true;
        
        
        
    },
    
    damageEnemy : function(bullet,enemy)
    {
        this.enemy.damage(1);
        bullet.kill();
    },
    killPlayer : function(enemyBullet,player)
    {
        player.kill();
        this.game.state.restart('GameState');
    },
    
   
    
    loadLevel : function()
    {
        this.currentEnemyIndex=0;
        this.levelData={
  "duration": 35,
  "enemies": 
  [
    {
      "time": 1,
      "x": 0.05,
      "health": 6,
      "speedX": 20, 
      "speedY": 50,
      "key": "greenEnemy",
      "scale": 3
    },
    {
      "time": 2,
      "x": 0.3,
      "health": 3,
      "speedX": 50, 
      "speedY": 50,
      "key": "greenEnemy",
      "scale": 1
    },
    {
      "time": 3,
      "x": 0.5,
      "health": 3,
      "speedX": 50, 
      "speedY": 50,
      "key": "greenEnemy",
      "scale": 1
    },
    {
      "time": 4,
      "x": 0.9,
      "health": 3,
      "speedX": 50, 
      "speedY": 50,
      "key": "greenEnemy",
      "scale": 1
    },
    {
      "time": 5,
      "x": 0.1,
      "health": 3,
      "speedX": 50, 
      "speedY": 50,
      "key": "greenEnemy",
      "scale": 1
    },
    {
      "time": 6,
      "x": 0.1,
      "health": 6,
      "speedX": 50, 
      "speedY": 50,
      "key": "greenEnemy",
      "scale": 3
    },
    {
      "time": 7,
      "x": 0.9,
      "health": 3,
      "speedX": -50, 
      "speedY": 50,
      "key": "redEnemy",
      "scale": 2
    },
    {
      "time": 8,
      "x": 0.9,
      "health": 3,
      "speedX": -50, 
      "speedY": 50,
      "key": "redEnemy",
      "scale": 1
    },
    {
      "time": 9,
      "x": 0.9,
      "health": 3,
      "speedX": -50, 
      "speedY": 50,
      "key": "redEnemy",
      "scale": 1
    },
    {
      "time": 10,
      "x": 0.9,
      "health": 3,
      "speedX": -50, 
      "speedY": 50,
      "key": "redEnemy",
      "scale": 1
    },
    {
      "time": 11,
      "x": 0.9,
      "health": 3,
      "speedX": -50, 
      "speedY": 50,
      "key": "redEnemy",
      "scale": 1
    },
    {
      "time": 12,
      "x": 0.9,
      "health": 6,
      "speedX": -50, 
      "speedY": 50,
      "key": "redEnemy",
      "scale": 3
    },
    {
      "time": 13,
      "x": 0.1,
      "health": 3,
      "speedX": 100, 
      "speedY": 20,
      "key": "greenEnemy",
      "scale": 1
    },
    {
      "time": 14,
      "x": 0.1,
      "health": 3,
      "speedX": 100, 
      "speedY": 20,
      "key": "yellowEnemy",
      "scale": 1
    },
    {
      "time": 15,
      "x": 0.1,
      "health": 3,
      "speedX": 100, 
      "speedY": 20,
      "key": "yellowEnemy",
      "scale": 1
    },
    {
      "time": 16,
      "x": 0.1,
      "health": 3,
      "speedX": 100, 
      "speedY": 20,
      "key": "yellowEnemy",
      "scale": 1
    },
    {
      "time": 17,
      "x": 0.1,
      "health": 3,
      "speedX": 100, 
      "speedY": 20,
      "key": "yellowEnemy",
      "scale": 1
    },
    {
      "time": 18,
      "x": 0.1,
      "health": 12,
      "speedX": 120, 
      "speedY": 50,
      "key": "yellowEnemy",
      "scale": 5
    }
    
  ]
};
        
        this.scheduleNextEnemy();
    },
    
    scheduleNextEnemy : function()
    {
        
        var nextEnemy=this.levelData.enemies[this.currentEnemyIndex];
        
        if(nextEnemy)
            {
                var nextTime=1000*(nextEnemy.time-(this.currentEnemyIndex==0?0:this.levelData.enemies[this.currentEnemyIndex-1].time));
                
                this.nextEnemyTimer=this.game.time.events.add(nextTime,function(){
    this.createEnemy(nextEnemy.x*this.game.world.width,100,nextEnemy.health,nextEnemy.key,nextEnemy.scale,nextEnemy.speedX,nextEnemy.speedY);
                    
                    this.currentEnemyIndex++;
                    this.scheduleNextEnemy();             
    
                },this);
            }
    },
     createEnemy : function(x,y,health,key,scale,speedX,speedY){
        this.enemy=this.enemies.getFirstExists(false);
        
        if(!this.enemy)
            {
                this.enemy= new Enemy(this.game,x,y,key,health,this.enemyBullets);
                this.enemies.add(this.enemy);
            }
    
            this.enemy.reset(x,y,health,key,scale,speedX,speedY);
    
    }
};