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
        
        
    },
    
    update : function()
    {
        this.game.physics.arcade.overlap(this.playerBullets,this.enemies,this.damageEnemy,null,this);
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
        
        var enemy=new Enemy(this.game,100,100,'greenEnemy',10,[]);
        
        this.enemies.add(enemy);
        enemy.body.velocity.x=100;
        enemy.body.velocity.y=20;
    },
    
    damageEnemy : function(bullet,enemy)
    {
        enemy.damage(1);
        bullet.kill();
    }
};