class Game {
    constructor(canvasId,width,height){
        this.gameMode = 0;
        this.canvas = window.document.getElementById(canvasId || 'canvas');
        this.canvas.width = width || 1280;
        this.canvas.height = height || 640;
        this.ctx = this.canvas.getContext('2d');
        
        this.difficulty = 1;
        this.charaName = null;
        
        this.map = [];
        
        this.frame = 0;
        this.preSelectFrame = 0;
        
    }
    
    main(){
        // 画面を暗くするやつ
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
        
        /*
        //これを実行するためにはmain()の引数にgameModeが必要
        switch(gameMode){
            case 0:
                break;
            
            case 1:
                break;
            
            case 2:
                play.drawMap();
                break;
        }
        */
        
        if(this.gameMode === 0){
            menu.drawMenu()
        }else if(this.gameMode === 1){
            
        }else if(this.gameMode === 2){
            world.drawMap();
            charactor.act();
        }
        this.frame++;
        window.requestAnimationFrame(this.main.bind(this));
    }
}


class World {
    constructor(game,mapHeight,mapLength){
        this.game = game;
        
        this.makeMap(mapHeight,mapLength);
        
        this.backgroundImage0 = new Image();
        this.backgroundImage0.src = 'sources/backgrounds/background.jpg';
        
        this.blockImage0 = new Image();
        this.blockImage0.src = 'sources/blocks/mapChip.png';
        
        this.blockImage1 = new Image();
        this.blockImage1.src = 'sources/blocks/mapChip.png';
        
        this.blockImage2 = new Image();
        this.blockImage2.src = 'sources/blocks/mapChip.png';
        
        this.blockImage3 = new Image();
        this.blockImage3.src = 'sources/blocks/mapChip.png';
    }
    
    makeMap(mapHeight = 20,mapLength = 40,){
        for(let h = 0;h < mapHeight; h++){
            this.game.map.push([]);
            for(let l = 0;l < mapLength; l++){
                if(mapHeight - h < 2){
                    this.game.map[h].push(2);
                }else if(mapHeight - h < 7){
                    this.game.map[h].push(1);
                }else if(mapHeight - h < 8){
                    this.game.map[h].push(3);
                }else{
                    this.game.map[h].push(0);
                }
            }
        }
    }
    
    drawMap (){
        
        this.game.ctx.drawImage(this.backgroundImage0,0,0,this.game.canvas.width,this.game.canvas.height);
        
        for(let y in this.game.map){
            for(let x in this.game.map){
                /*
                switch(this.map[y][x]){
                    case 0:
                        this.game.ctx.drawImage(this.blockImage0,0,32,32,32,32*x,32*y,32,32);
                        break;
                    case 1:
                        this.game.ctx.drawImage(this.blockImage1,64,64,32,32,32*x,32*y,32,32);
                        break;
                    case 2:
                        this.game.ctx.drawImage(this.blockImage2,224,64,32,32,32*x,32*y,32,32);
                        break;
                    case 3:
                        this.game.ctx.drawImage(this.blockImage3,0,64,32,32,32*x,32*y,32,32);
                        break;
                }
                */
                
                if(this.game.map[y][x] === 0){
                    this.game.ctx.drawImage(this.blockImage0,0,32,32,32,32*x,32*y,32,32);
                }else if(this.game.map[y][x] === 1){
                    this.game.ctx.drawImage(this.blockImage1,64,64,32,32,32*x,32*y,32,32);
                }else if(this.game.map[y][x] === 2){
                    this.game.ctx.drawImage(this.blockImage2,224,64,32,32,32*x,32*y,32,32);
                }else if(this.game.map[y][x] === 3){
                    this.game.ctx.drawImage(this.blockImage3,0,64,32,32,32*x,32*y,32,32);
                }
                
            }
        }
    }
}

class Charactor{
    constructor(game,x,y){
        this.game = game;
        this.keyboard = keyboard;
        
        this.x = x;
        this.y = y;
        this.preX = x;
        this.preY = y;
        this.vx = 0;
        this.vy = 0;
        
        this.SPEED = 1;
        this.jump = 10;
        this.FRICTION = 0.2;
        this.GRAVITY = 0.4;
        
        this.preMotion = 'right';
        
        this.imageLeft = new Image();
        this.imageLeft.src = 'sources/charactors/tohoChara.png';
        this.imageLeft.sx = 0;
        this.imageLeft.sy = 48.5;
        this.imageLeft.sw = 48.5;
        this.imageLeft.sh = 48.5;
        
        this.imageRight = new Image();
        this.imageRight.src = 'sources/charactors/tohoChara.png';
        this.imageRight.sx = 0;
        this.imageRight.sy = 97;
        this.imageRight.sw = 48.5;
        this.imageRight.sh = 48.5;
        
        this.imageCenter = new Image();
        this.imageCenter.src = 'sources/charactors/tohoChara.png';
        this.imageCenter.sx = 0;
        this.imageCenter.sy = 0;
        this.imageCenter.sw = 48.5;
        this.imageCenter.sh = 48.5;
        
        this.imageUp = new Image();
        this.imageUp.src = 'sources/charactors/tohoChara.png';
        this.imageUp.sx = 0;
        this.imageUp.sy = 145.5;
        this.imageUp.sw = 48.5;
        this.imageUp.sh = 48.5;
        
        
    }
    
    act(){
        
        this.preX = this.x;
        this.preY = this.y;
        
        this.move();
        
        this.gravity();
        
        this.touchBlock();
        
        this.caluculate();
        
        this.hitBox();
        
        if(this.preMotion === 'right'){
            this.game.ctx.drawImage(this.imageRight,this.imageRight.sx,this.imageRight.sy,this.imageRight.sw,this.imageRight.sh,this.x,this.y,32,32);
        }else if(this.preMotion === 'left'){
            this.game.ctx.drawImage(this.imageLeft,this.imageLeft.sx,this.imageLeft.sy,this.imageLeft.sw,this.imageLeft.sh,this.x,this.y,32,32);
        }else if(this.preMotion === 'center'){
            this.game.ctx.drawImage(this.imageCenter,this.imageCenter.sx,this.imageCenter.sy,this.imageCenter.sw,this.imageCenter.sh,this.x,this.y,32,32);
        }else if(this.preMotion === 'up'){
            this.game.ctx.drawImage(this.imageUp,this.imageUp.sx,this.imageUp.sy,this.imageUp.sw,this.imageUp.sh,this.x,this.y,32,32);
        }
        
    }
    
    move(){
        if(this.keyboard.right === true){
            this.vx += this.SPEED;
            this.preMotion = 'right';
        }else if(this.keyboard.left === true){
            this.vx -= this.SPEED;
            this.preMotion = 'left';
        }else if(this.keyboard.down === true){
            this.preMotion = 'center';
        }else if(this.keyboard.up === true){
            this.preMotion = 'up';
        }
        
        if(this.game.map[Math.floor((this.y +2)/32)][Math.round(this.x/32)] !== 0){
            if(this.vx < 0){
                this.vx += this.FRICTION;
            }else if(this.vx > 0){
                this.vx -= this.FRICTION;
            }
        }
        
        if(this.keyboard.space === true && ((this.game.map[Math.floor((this.y + 35)/32)][Math.floor(this.x/32)] !== 0) ||(this.game.map[Math.floor((this.y + 35)/32)][Math.floor((this.x + 32)/32)] !== 0))){
            this.vy -= this.jump;
        }
    }
    
    hitBox(){
        if(this.game.map[Math.floor(this.y/32)][Math.floor(this.x/32)] !== 0){
            this.x = this.preX;
            this.vx = 0;
        }else if(this.game.map[Math.floor((this.y+30)/32)][Math.floor(this.x/32)] !== 0){
            this.x = this.preX;
            this.vx = 0;
        }else if(this.game.map[Math.floor(this.y/32)][Math.floor((this.x+32)/32)] !== 0){
            this.x = this.preX;
            this.vx = 0;
        }else if(this.game.map[Math.floor((this.y+30)/32)][Math.floor((this.x+32)/32)] !== 0){
            this.x = this.preX;
            this.vx = 0;
        }
        
        if(this.game.map[Math.floor(this.y/32)][Math.floor(this.x/32)] !== 0){
            this.y = this.preY;
            this.vy = 0;
        }else if(this.game.map[Math.floor((this.y+32)/32)][Math.floor(this.x/32)] !== 0){
            this.y = this.preY;
            this.vy = 0;
        }else if(this.game.map[Math.floor(this.y/32)][Math.floor((this.x+32)/32)] !== 0){
            this.y = this.preY;
            this.vy = 0;
        }else if(this.game.map[Math.floor((this.y+32)/32)][Math.floor((this.x+32)/32)] !== 0){
            this.y = this.preY;
            this.vy = 0;
        }
    }
    
    touchBlock(){
        if((this.game.map[Math.floor((this.y + 40)/32)][Math.floor(this.x/32)] !== 0) || (this.game.map[Math.floor((this.y + 40)/32)][Math.floor(this.x/32 + 32)] !== 0)){
            if(this.vx < this.FRICTION && this.vx > 0){
                this.vx = 0;
            }else if(this.vx > -this.FRICTION && this.vx < 0){
                this.vx = 0;
            }
            
            if(this.vx < 0){
                this.vx += this.FRICTION;
            }else if(this.vx > 0){
                this.vx -= this.FRICTION;
            }
        }
    }
    
    gravity(){
        this.vy += this.GRAVITY;
    }
    
    caluculate(){
        this.x += this.vx;
        this.y += this.vy;
    }
}



class Menu {
    constructor(game){
        this.game = game;
        
        this.backgroundImage0 = new Image();
        this.backgroundImage0.src = 'sources/backgrounds/mainImage2.jpg';
        
        window.addEventListener('keydown',this.keydown.bind(this));
        
        this.selectNum = 0;
        this.selectList = ['Play','config','quit'];
        this.WAITFRAME = 10;
        
        this.FONTSIZE = 60;
    }
    
    drawMenu(){
        this.keydown();
        this.game.ctx.drawImage(this.backgroundImage0,0,0,this.game.canvas.width,this.game.canvas.height);
        for(let i=0; i < this.selectList.length; i++){
            this.game.ctx.fillStyle = '#000';
            this.game.ctx.font = this.FONTSIZE + 'px "sans-serif"';
            this.game.ctx.textBaseline = 'top';
            if(i === this.selectNum){
                this.game.ctx.fillStyle = '#f00';
            }
            this.game.ctx.fillText(this.selectList[i],30,30+i*this.FONTSIZE);
        }
    }
    
    keydown(){
        if(keyboard.enter === true){
            if(this.selectNum === 0){
                this.game.gameMode = 2;
                this.game.preSelectFrame = this.game.frame;
            }
            
        }
        
        if(keyboard.down === true && this.game.frame - this.game.preSelectFrame > this.WAITFRAME){
            if(this.selectNum + 1 < this.selectList.length){
                this.selectNum++;
                this.game.preSelectFrame = this.game.frame;
            }
        }else if(keyboard.up === true && this.game.frame - this.game.preSelectFrame > this.WAITFRAME){
            if(this.selectNum > 0){
                this.selectNum--;
                this.game.preSelectFrame = this.game.frame;
            }
        }
    }
    
}

const game = new Game();

const menu = new Menu(game);

// const name = new Name(game);

const world = new World(game);

const charactor = new Charactor(game,10,10);

game.gameMode = 0;

game.main();