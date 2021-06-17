class Game {
    constructor(canvasId,width,height){
        this.gameMode = 0;
        this.canvas = window.document.getElementById(canvasId || 'canvas');
        this.canvas.width = width || 1280;
        this.canvas.height = height || 640;
        this.ctx = this.canvas.getContext('2d');
        
        this.difficulty = 1;
        this.charaName = null;
        
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
        
        this.map = [];
        
        this.frame = 0;
        this.preSelectFrame = 0;
        this.preDigFrame = 0;
        
        this.bgmPlay = new Audio();
        this.bgmPlay.loop = true;
        this.bgmPlay.src = 'sources/sounds/bgm3.mp3';
        
        // ブラウザの使用上ページを開いてすぐに音を流すことはできないので今回は追加していない。
        this.bgmMenu = new Audio();
        this.bgmMenu.loop = true;
        this.bgmMenu.src = 'sources/sounds/bgmMenu.mp3';
        
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
        
        /*
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
        */
    }
    
    makeMap(mapHeight = Math.floor(this.game.canvas.height/32),mapLength = Math.floor(this.game.canvas.width/32),){
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
        
        this.game.ctx.drawImage(this.game.backgroundImage0,0,0,this.game.canvas.width,this.game.canvas.height);
        
        for(let y in this.game.map){
            for(let x in this.game.map[y]){
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
                    this.game.ctx.drawImage(this.game.blockImage0,0,32,32,32,32*x,32*y,32,32);
                }else if(this.game.map[y][x] === 1){
                    this.game.ctx.drawImage(this.game.blockImage1,64,64,32,32,32*x,32*y,32,32);
                }else if(this.game.map[y][x] === 2){
                    this.game.ctx.drawImage(this.game.blockImage2,224,64,32,32,32*x,32*y,32,32);
                }else if(this.game.map[y][x] === 3){
                    this.game.ctx.drawImage(this.game.blockImage3,0,64,32,32,32*x,32*y,32,32);
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
        this.preVx = this.vx;
        this.preVy = this.vy;
        
        this.coreX = (this.x + this.x + 30)/2;
        this.coreY = (this.y + this.y + 30)/2;
        
        this.maxHp = 100;
        this.hp = 100;
        
        this.blockStock = [];
        for(let i = 0;i < 9;i++){
            this.blockStock.push(0);
        }
        
        this.selectBlockNumber = 0;
        
        // SPEEDとMAXSPEED変数になっちゃいました。ごめんなさい。
        this.NORMALSPEED = 1;
        this.NORMALMAXSPEED = 7;
        this.SLOWSPEED = 0.5;
        this.SLOWMAXSPEED = 3;
        this.SPEED = this.NORMALSPEED;
        this.MAXSPEED = this.NORMALMAXSPEED;
        this.jump = 7.75;
        this.FRICTION = 0.3;
        this.GRAVITY = 0.4;
        this.chanceGetForceDamage = 15;
        
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
        
        this.STATUSHEIGHT = 25;
        this.STATUSWIDTH = 200;
        this.STATUSX = 10;
        this.STATUSY = 10;
        
        this.DIGINTERVAL = 10;
        
        this.soundDamageSmall = new Audio();
        this.soundDamageSmall.src = 'sources/sounds/hit.mp3';
        
        this.soundDamageBig = new Audio();
        this.soundDamageBig.src = 'sources/sounds/creanHit.mp3';
        
        this.soundKnockOut = new Audio();
        this.soundKnockOut.src = 'sources/sounds/KO.mp3';
    }
    
    act(){
        
        // 1フレーム前のx、vxなどの値。変化量から落下ダメージなどを計算
        this.preX = this.x;
        this.preY = this.y;
        this.preVx = this.vx;
        this.preVy = this.vy;
        
        this.move();
        
        this.gravity();
        
        this.touchBlock();
        
        this.caluculate();
        
        this.hitBox();
        
        this.getDamage();
        
        this.selectBlock();
        
        this.setBlock();
        this.digBlock();
        
        this.showHP();
        this.showItems();
        
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
        if(this.keyboard.shift === true){
            this.SPEED = this.SLOWSPEED;
            this.MAXSPEED = this.SLOWMAXSPEED;
        }else{
            this.SPEED = this.NORMALSPEED;
            this.MAXSPEED =this.NORMALMAXSPEED;
        }
        if(this.keyboard.right === true && this.vx < this.MAXSPEED){
            this.vx += this.SPEED;
            this.preMotion = 'right';
        }else if(this.keyboard.left === true && this.vx > -this.MAXSPEED){
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
        
        if(this.keyboard.space === true && ((this.game.map[Math.floor((this.y + 35)/32)][Math.floor((this.x+4)/32)] !== 0) ||(this.game.map[Math.floor((this.y + 35)/32)][Math.floor((this.x + 28)/32)] !== 0))){
            this.vy = -this.jump;
        }
    }
    
    showItems(){
        for(let i = 0;i < 9;i++){
            this.game.ctx.fillStyle = '#AAA';
            
        }
    }
    
    selectBlock(){
        if(this.keyboard.one === true){
            this.selectBlockNumber = 1;
        }else if(this.keyboard.two === true){
            this.selectBlockNumber = 2;
        }else if(this.keyboard.three === true){
            this.selectBlockNumber = 3;
        }else if(this.keyboard.four === true){
            this.selectBlockNumber = 4;
        }else if(this.keyboard.five === true){
            this.selectBlockNumber = 5;
        }else if(this.keyboard.six=== true){
            this.selectBlockNumber = 6;
        }else if(this.keyboard.seven === true){
            this.selectBlockNumber = 7;
        }else if(this.keyboard.eight === true){
            this.selectBlockNumber = 8;
        }else if(this.keyboard.nine === true){
            this.selectBlockNumber = 9;
        }
    }
    
    showItems(){
        let BIGFRAMESIZE = 50;
        let LITTLEFRAMESIZE = 45;
        let BLOCKSIZE = 40;
        let BLOCKKINDNUM = 9;
        
        for(let i = 1;i < BLOCKKINDNUM;i++){
            this.game.ctx.fillStyle = '#AAA';
            if(i === this.selectBlockNumber){
                this.game.ctx.fillStyle = '#F00';
            }
            this.game.ctx.fillRect(this.game.canvas.width - 64 -(BLOCKKINDNUM*BIGFRAMESIZE) + i*BIGFRAMESIZE,20,BIGFRAMESIZE,BIGFRAMESIZE);
            this.game.ctx.fillStyle = '#888';
            this.game.ctx.fillRect((this.game.canvas.width - 64 -(BLOCKKINDNUM*BIGFRAMESIZE) + (BIGFRAMESIZE-LITTLEFRAMESIZE)/2) + i*BIGFRAMESIZE,20 + (BIGFRAMESIZE - LITTLEFRAMESIZE)/2,LITTLEFRAMESIZE,LITTLEFRAMESIZE);
            
            // ブロックの画像表示をしたい。まだ未完成。
            switch(i){
                case 0:
                    this.game.ctx.drawImage(this.game.blockImage0,0,32,32,32,(this.game.canvas.width - 64 -(BLOCKKINDNUM*BIGFRAMESIZE) + (BIGFRAMESIZE-LITTLEFRAMESIZE)/2) + i*BIGFRAMESIZE,20 + (BIGFRAMESIZE - LITTLEFRAMESIZE)/2,32,32);
                    break;
                    /*
                case 1:
                    this.game.ctx.drawImage();
                    break;
                case 2:
                    this.game.ctx.drawImage();
                    break;
                case 3:
                    this.game.ctx.drawImage();
                    break;
                case 4:
                    this.game.ctx.drawImage();vc  /  
                    break;
                case 5:
                    this.game.ctx.drawImage();
                    break;
                case 6:
                    this.game.ctx.drawImage();
                    break;
                case 7:
                    this.game.ctx.drawImage();
                    break;
                case 8:
                    this.game.ctx.drawImage();
                    break;
                case 9:
                    this.game.ctx.drawImage();
                    break;
                    */
                default:
                    break;
            }
            
            this.game.ctx.fillStyle = '#FFF';
            this.game.ctx.textBaseline = 'alphabetic';
            this.game.ctx.font = '12px "sans-serif"';
            this.game.ctx.fillText(this.blockStock[i],this.game.canvas.width - 64 -(BLOCKKINDNUM*BIGFRAMESIZE) + (BIGFRAMESIZE-LITTLEFRAMESIZE)/2 + i*BIGFRAMESIZE,20 + (BIGFRAMESIZE - LITTLEFRAMESIZE)/2 + LITTLEFRAMESIZE,LITTLEFRAMESIZE,LITTLEFRAMESIZE);
            
        }
    }
    
    setBlock(){
        if(this.keyboard.s === true){
            if(this.preMotion === 'right'){
                if(this.game.map[Math.floor((this.coreY)/32)][Math.floor((this.coreX + 32)/32)] === 0 && this.blockStock[this.selectBlockNumber] > 0){
                    this.blockStock[this.selectBlockNumber]--;
                        this.game.map[Math.floor((this.coreY)/32)][Math.floor((this.coreX + 32)/32)] = this.selectBlockNumber; 
                }
            }else if(this.preMotion === 'left'){
                if(this.game.map[Math.floor((this.coreY)/32)][Math.floor((this.coreX - 32)/32)] === 0 && this.blockStock[this.selectBlockNumber] > 0){
                    this.blockStock[this.selectBlockNumber]--;
                        this.game.map[Math.floor((this.coreY)/32)][Math.floor((this.coreX - 32)/32)] = this.selectBlockNumber; 
                }
            }else if(this.preMotion === 'center'){
                console.log('digdig');
                if(this.game.map[Math.floor((this.coreY + 32)/32)][Math.floor((this.coreX)/32)] === 0 && this.blockStock[this.selectBlockNumber] > 0){
                    this.blockStock[this.selectBlockNumber]--;
                        this.game.map[Math.floor((this.coreY + 32)/32)][Math.floor((this.coreX)/32)] = this.selectBlockNumber; 
                }
            }else if(this.preMotion === 'up'){
                if(this.game.map[Math.floor((this.coreY - 32)/32)][Math.floor(this.coreX/32)] === 0 && this.blockStock[this.selectBlockNumber] > 0){
                    this.blockStock[this.selectBlockNumber]--;
                        this.game.map[Math.floor((this.coreY - 32)/32)][Math.floor(this.coreX/32)] = this.selectBlockNumber; 
                        
                }
            }
        }
    }
    
    digBlock(){
        if(this.keyboard.d === true && this.game.frame - this.game.preDigFrame > this.DIGINTERVAL){
            /*
            毎回そうだが繰り返しはswitchと相性が悪いのか？
            switch(this.preMotion){
                case 'right':
                    if(this.game.map[Math.round((this.coreY)/32)][Math.round((this.coreX + 32)/32)] !== 0){
                        this.blockStock[this.game.map[Math.round((this.coreY)/32)][Math.round((this.coreX + 32)/32)]]++;
                        this.game.map[Math.round((this.coreY)/32)][Math.round((this.coreX + 32)/32)] = 0; 
                    }
                    break;
                case 'left':
                    if(this.game.map[Math.round(this.coreY)][Math.round(this.coreX - 32)] !== 0){
                        this.blockStock[this.game.map[Math.round(this.coreY)][Math.round(this.coreX - 32)]]++;
                        this.game.map[Math.round(this.coreY)][Math.round(this.coreX - 32)] = 0; 
                    }
                    break;
                case 'center':
                    if(this.game.map[Math.round((this.coreY + 32)/32)][Math.round((this.coreX)/32)] !== 0){
                        this.blockStock[this.game.map[Math.round((this.coreY + 32)/32)][Math.round((this.coreX)/32)]]++;
                        this.game.map[Math.round((this.coreY + 32)/32)][Math.round((this.coreX)/32)] = 0; 
                    }
                    break;
                case 'up':
                    if(this.game.map[Math.round((this.coreY - 32)/32)][Math.round(this.coreX/32)] !== 0){
                        this.blockStock[this.game.map[Math.round(this.coreY - 32)][Math.round(this.coreX)]]++;
                        this.game.map[Math.round((this.coreY - 32)/32)][Math.round(this.coreX/32)] = 0; 
                    }
                    break;
            }
            */
            if(this.preMotion === 'right'){
                if(this.game.map[Math.floor((this.coreY)/32)][Math.floor((this.coreX + 32)/32)] !== 0){
                        this.blockStock[this.game.map[Math.floor((this.coreY)/32)][Math.floor((this.coreX + 32)/32)]]++;
                        this.game.map[Math.floor((this.coreY)/32)][Math.floor((this.coreX + 32)/32)] = 0; 
                }
            }else if(this.preMotion === 'left'){
                if(this.game.map[Math.floor((this.coreY)/32)][Math.floor((this.coreX - 32)/32)] !== 0){
                        this.blockStock[this.game.map[Math.floor((this.coreY)/32)][Math.floor((this.coreX - 32)/32)]]++;
                        this.game.map[Math.floor((this.coreY)/32)][Math.floor((this.coreX - 32)/32)] = 0; 
                }
            }else if(this.preMotion === 'center'){
                console.log('digdig');
                if(this.game.map[Math.floor((this.coreY + 32)/32)][Math.floor((this.coreX)/32)] !== 0){
                        this.blockStock[this.game.map[Math.floor((this.coreY + 32)/32)][Math.floor((this.coreX)/32)]]++;
                        this.game.map[Math.floor((this.coreY + 32)/32)][Math.floor((this.coreX)/32)] = 0; 
                        console.log('dig');
                }
            }else if(this.preMotion === 'up'){
                if(this.game.map[Math.floor((this.coreY - 32)/32)][Math.floor(this.coreX/32)] !== 0){
                        this.blockStock[this.game.map[Math.floor((this.coreY - 32)/32)][Math.floor((this.coreX)/32)]]++;
                        this.game.map[Math.floor((this.coreY - 32)/32)][Math.floor(this.coreX/32)] = 0; 
                        
                }
            }
            
            this.game.preDigFrame = this.game.frame;
        }
    }
    
    attack(){
        
    }
    
    hitBox(){
        if(this.game.map[Math.floor((this.y+4)/32)][Math.floor((this.x + 4)/32)] !== 0){
            this.x = this.preX;
            this.vx = 0;
        }else if(this.game.map[Math.floor((this.y+28)/32)][Math.floor((this.x + 4)/32)] !== 0){
            this.x = this.preX;
            this.vx = 0;
        }else if(this.game.map[Math.floor((this.y+4)/32)][Math.floor((this.x+28)/32)] !== 0){
            this.x = this.preX;
            this.vx = 0;
        }else if(this.game.map[Math.floor((this.y+28)/32)][Math.floor((this.x+28)/32)] !== 0){
            this.x = this.preX;
            this.vx = 0;
        }
        
        if(this.game.map[Math.floor((this.y+4)/32)][Math.floor((this.x+4)/32)] !== 0){
            this.y = this.preY;
            this.vy = 0;
        }else if(this.game.map[Math.floor((this.y+29)/32)][Math.floor((this.x+4)/32)] !== 0){
            this.y = this.preY;
            this.vy = 0;
        }else if(this.game.map[Math.floor((this.y+4)/32)][Math.floor((this.x+28)/32)] !== 0){
            this.y = this.preY;
            this.vy = 0;
        }else if(this.game.map[Math.floor((this.y+29)/32)][Math.floor((this.x+28)/32)] !== 0 && keyboard.space !== true){
            this.y = this.preY;
            this.vy = 0;
        }
    }
    
    touchBlock(){
        if((this.game.map[Math.floor((this.y + 33)/32)][Math.floor(this.x/32)] !== 0) || (this.game.map[Math.floor((this.y + 40)/32)][Math.floor((this.x+32)/32)] !== 0)){
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
        
        this.coreX = (this.x + this.x + 30)/2;
        this.coreY = (this.y + this.y + 30)/2;
    }
    
    showHP(){
        this.game.ctx.fillStyle = '#000';
        this.game.ctx.fillRect(this.STATUSX,this.STATUSY,this.STATUSWIDTH,this.STATUSHEIGHT);
        this.game.ctx.fillStyle = '#0F0';
        this.game.ctx.fillRect(this.STATUSX,this.STATUSY,this.STATUSWIDTH*(this.hp/this.maxHp),this.STATUSHEIGHT);
    }
    
    getDamage(){
        if(Math.abs(this.vx - this.preVx) > this.chanceGetForceDamage){
            if(Math.abs(this.vx - this.preVx) > 30){
                this.soundDamageBig.currentTime = 0;
                this.soundDamageBig.play();
            }else{
                this.soundDamageSmall.currentTime = 0;
                this.soundDamageSmall.play();
            }
            this.hp -= Math.abs(this.vx - this.preVx);
            console.log('damageX!');
            this.confirmAlive();
        }
        
        if(Math.abs(this.vy -this.preVy) > this.chanceGetForceDamage){
            if(Math.abs(this.vy - this.preVy) > 30){
                this.soundDamageBig.currentTime = 0;
                this.soundDamageBig.play();
            }else{
                this.soundDamageSmall.currentTime = 0;
                this.soundDamageSmall.play();
            }
            this.hp -= Math.abs(this.vy - this.preVy);
            console.log('damageY!');
            this.confirmAlive();
        }
        
        // 敵からの攻撃判定などをここに記述
        
    }
    
    confirmAlive(){
        if(this.hp < 0){
            this.soundKnockOut.currentTime = 0;
            this.soundKnockOut.play();
            this.game.bgmPlay.pause();
            this.game.gameMode = 0;
            
            // ステータス初期化
            this.vx = 0;
            this.vy = 0;
            this.preVx = this.vx;
            this.preVy = this.vy;
        
            this.maxHp = 100;
            this.hp = 100;
        }
    }
    
}



class Menu {
    constructor(game){
        this.game = game;
        
        this.backgroundImage0 = new Image();
        this.backgroundImage0.src = 'sources/backgrounds/mainImage2.jpg';
        
        this.selectNum = 0;
        this.selectList = ['Play','config','quit'];
        this.WAITFRAME = 10;
        
        this.FONTSIZE = 60;
        
        this.setSound = new Audio();
        this.setSound.src = 'sources/sounds/set.mp3';
        
        this.decideSound = new Audio();
        this.decideSound.src = 'sources/sounds/decide.mp3';
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
                this.decideSound.currentTime = 0;
                this.decideSound.play();
                this.game.gameMode = 2;
                this.game.bgmPlay.currentTime = 0;
                this.game.bgmPlay.play();
                this.game.preSelectFrame = this.game.frame;
            }
            
        }
        
        if(keyboard.down === true && this.game.frame - this.game.preSelectFrame > this.WAITFRAME){
            if(this.selectNum + 1 < this.selectList.length){
                this.setSound.currentTime = 0;
                this.setSound.play();
                this.selectNum++;
                this.game.preSelectFrame = this.game.frame;
            }
        }else if(keyboard.up === true && this.game.frame - this.game.preSelectFrame > this.WAITFRAME){
            if(this.selectNum > 0){
                this.setSound.currentTime = 0;
                this.setSound.play();
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

game.main();