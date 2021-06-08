class Game {
    constructor(keyboard,canvasId,world,mainChara){
        this.keyboard = keyboard;
        this.canvasId = canvasId;
        this.canvas = window.document.getElementById(this.canvasId);
        this.canvas.width = world.mapLengthX*32;
        this.canvas.height = world.mapLengthY*32;
        this.ctx = this.canvas.getContext('2d');
        this.world = world;
        this.mainChara = mainChara;
        this.enemies = [];
    }
    
    showBackground(){
        this.ctx.drawImage(this.world.bgImage,0,0,this.world.bgImage.width,this.world.bgImage.height,0,0,this.canvas.width,this.canvas.height);
    }
    
    showMap(){
        for (let n in this.world.map){
            for (let m in this.world.map[n]){
                const a = this.world.map[n][m];
                
                // ここでブロックの種類の設定を行なっている
                if(a === 0){
                    this.ctx.drawImage(this.world.mapChip0,0,32,32,32,m*32,n*32,32,32);
                }else if(a === 1){
                    this.ctx.drawImage(this.world.mapChip0,64,64,32,32,m*32,n*32,32,32);
                }else{
                    this.ctx.drawImage(this.world.mapChip0,0,32,32,32,m*32,n*32,32,32);
                }
            }
        }
    }
    
    showMainChara(keyboard){
        this.mainChara.act(keyboard);
        this.ctx.drawImage(this.mainChara.charaImage,0,0,48.4,48.4,this.mainChara.x,this.mainChara.y,32,32);
    }
    
    main(){
        this.showBackground();
        this.showMap();
        this.showMainChara(this.keyboard);
        window.requestAnimationFrame(this.main.bind(this));
    }
}


class Chara {
    constructor(world,x,y,height,mass,maxHp,hp,maxMp,mp){
        // 世界の取得
        this.world = world;
        
        // 物理的なキャラパラメータ
        this.x = x || 0;
        this.y = y || 0;
        this.vx = 0;
        this.vy = 0;
        
        this.width = 32;
        this.height = height || 64;
        this.coreX = (this.x + this.width)/2;
        this.coreY = this.y + this.height - 16;
        
        // ゲームシステム的なキャラパラメータ
        this.maxHp = maxHp || 100;
        this.maxMp = maxMp || 50;
        this.hp = hp || 100;
        this.mp = mp || 50;
        
        this.speed = 7;
        this.lowSpeed = 3;
        this.normalSpeed = 7;
        
        // キャラクタの元画像の設定とサイズの設定。ここではキャラの種類は設定していない。
        this.charaImage = new Image ();
        this.charaImage.src = 'sources/charactors/tohoChara.png';
        this.SIZE = 48.4;
        
    }
    
    act(keyboard){
        if(keyboard.shift === true){
            this.speed = this.lowSpeed;
        }else{
            this.speed = this.normalSpeed;
        }
        
        if(keyboard.d === true && this.vx < this.speed){
            // 横移動に関する条件分岐
            this.vx += 0.5;
        }else if(keyboard.a === true && this.vx > -this.speed){
            this.vx -= 0.5;
        }
        
        if(keyboard.d === false && this.vx > 0){
            this.vx -= 0.5;
        }else if(keyboard.a === false && this.vx < 0){
            this.vx += 0.5;
        }
        
        if(keyboard.w === true && this.world.map[Math.floor((this.y)/32 + 1)][Math.floor(this.x/32)] !==0){
            // ジャンプに関する条件分岐
            this.vy -= 15;
        }

        if(keyboard.left === true){
            this.blockDig(keyboard);
            window.console.log('hello');
        }
        
        if(keyboard.right === true){
            this.blockSet(keyboard);
        }
        
        this.gravity();
        // 着地の物理演算どうしよう
        this.touchBlock();
        
        this.calculate();
    }
    
    
    
    blockDig(keyboard){
        if(keyboard.w === true && keyboard.a === true && Math.floor(this.x/32) - 1 !== -1){
            let block = this.world.map[Math.floor(this.y/32) - 1][Math.floor(this.x/32) -1];
            if(block !== 0){
                this.world.map[Math.floor(this.y/32) - 1].splice(Math.floor(this.x/32) - 1,1,0);
                console.log('koko');
            }
        }else if(keyboard.w === true && keyboard.d === true){
            let block = this.world.map[Math.floor(this.y/32) - 1][Math.floor(this.x/32) +1];
            if(block !== 0){
                this.world.map[Math.floor(this.y/32) - 1].splice(Math.floor(this.x/32) + 1,1,0);
                console.log('koko');
            }
        }else if(keyboard.d === true && keyboard.s === true){
            let block = this.world.map[Math.floor(this.y/32) + 1][Math.floor(this.x/32) +1];
            if(block !== 0){
                this.world.map[Math.floor(this.y/32) + 1].splice(Math.floor(this.x/32) + 1,1,0);
                console.log('koko');
            }
        }else if(keyboard.s === true && keyboard.a === true && Math.floor(this.x/32) - 32 !== -1){
            let block = this.world.map[Math.floor(this.y/32) + 1][Math.floor(this.x/32) -1];
            if(block !== 0){
                this.world.map[Math.floor(this.y/32) + 1].splice(Math.floor(this.x/32) - 1,1,0);
                console.log('koko');
            }
        }else if(keyboard.a === true && Math.floor(this.x/32) - 1 !== -1){
            let block = this.world.map[Math.floor(this.y/32)][Math.floor(this.x/32) -1];
            if(block !== 0){
                this.world.map[Math.floor(this.y/32)].splice(Math.floor(this.x/32) - 1,1,0);
                console.log('koko');
            }
        }else if(keyboard.w === true){
            let block = this.world.map[Math.floor(this.y/32) - 1][Math.floor(this.x/32)];
            if(block !== 0){
                this.world.map[Math.floor(this.y/32) - 1].splice(Math.floor(this.x/32),1,0);
                console.log('koko');
            }
        }else if(keyboard.d === true){
            let block = this.world.map[Math.floor(this.y/32)][Math.floor(this.x/32) +1];
            if(block !== 0){
                this.world.map[Math.floor(this.y/32)].splice(Math.floor(this.x/32) + 1,1,0);
                console.log('koko');
            }
        }else if(keyboard.s === true){
            let block = this.world.map[Math.floor(this.y/32) + 1][Math.floor(this.x/32)];
            if(block !== 0){
                this.world.map[Math.floor(this.y/32) + 1].splice(Math.floor(this.x/32),1,0);
                console.log('koko');
            }
            console.log('ここまではいく');
        }else{
            
        }
    }
    
    blockSet(keyboard){
        if(keyboard.w === true && keyboard.a === true && Math.floor(this.x/32) - 1 !== -1){
            let block = this.world.map[Math.floor(this.y/32) - 1][Math.floor(this.x/32) -1];
            if(block === 0){
                this.world.map[Math.floor(this.y/32) - 1].splice(Math.floor(this.x/32) - 1,1,1);
                console.log('koko');
            }
        }else if(keyboard.w === true && keyboard.d === true){
            let block = this.world.map[Math.floor(this.y/32) - 1][Math.floor(this.x/32) +1];
            if(block === 0){
                this.world.map[Math.floor(this.y/32) - 1].splice(Math.floor(this.x/32) + 1,1,1);
                console.log('koko');
            }
        }else if(keyboard.d === true && keyboard.s === true){
            let block = this.world.map[Math.floor(this.y/32) + 1][Math.floor(this.x/32) +1];
            if(block === 0){
                this.world.map[Math.floor(this.y/32) + 1].splice(Math.floor(this.x/32) + 1,1,1);
                console.log('koko');
            }
        }else if(keyboard.s === true && keyboard.a === true && Math.floor(this.x/32) - 32 !== -1){
            let block = this.world.map[Math.floor(this.y/32) + 1][Math.floor(this.x/32) -1];
            if(block === 0){
                this.world.map[Math.floor(this.y/32) + 1].splice(Math.floor(this.x/32) - 1,1,1);
                console.log('koko');
            }
        }else if(keyboard.a === true && Math.floor(this.x/32) - 1 !== -1){
            let block = this.world.map[Math.floor(this.y/32)][Math.floor(this.x/32) -1];
            if(block === 0){
                this.world.map[Math.floor(this.y/32)].splice(Math.floor(this.x/32) - 1,1,1);
                console.log('koko');
            }
        }else if(keyboard.w === true){
            let block = this.world.map[Math.floor(this.y/32) - 1][Math.floor(this.x/32)];
            if(block === 0){
                this.world.map[Math.floor(this.y/32) - 1].splice(Math.floor(this.x/32),1,1);
                console.log('koko');
            }
        }else if(keyboard.d === true){
            let block = this.world.map[Math.floor(this.y/32)][Math.floor(this.x/32) +1];
            if(block === 0){
                this.world.map[Math.floor(this.y/32)].splice(Math.floor(this.x/32) + 1,1,1);
                console.log('koko');
            }
        }else if(keyboard.s === true){
            let block = this.world.map[Math.floor(this.y/32) + 1][Math.floor(this.x/32)];
            if(block === 0){
                this.world.map[Math.floor(this.y/32) + 1].splice(Math.floor(this.x/32),1,1);
                console.log('koko');
            }
            console.log('ここまではいく');
        }else{
            
        }
    }
    
    touchBlock(){
        if(this.vy > 0 && this.world.map[Math.floor(this.y/32) + 1][Math.round(this.x/32)] !== 0){
            this.vy = 0;
            this.y = 32*Math.floor(this.y/32);
        }else if((this.vy < 0 && Math.round(this.y/32) - 1 === -1) || (this.vy < 0 && this.world.map[Math.floor(this.y/32 - 1)][Math.round(this.x/32)] !== 0)){
            this.vy = 0;
            this.y = 32*Math.floor(this.y/32);
        }
        
        if(this.vx > 0 && this.world.map[Math.floor(this.y/32)][Math.floor(this.x/32) + 1] !== 0){
            this.vx = 0;
            this.x = 32*Math.round(this.x/32);
        }else if((this.vx < 0 && Math.floor((this.x+20)/32) - 1 === -1) || (this.vx < 0 && this.world.map[Math.round(this.y/32)][Math.round(this.x/32) - 1] !== 0)){
            this.vx = 0;
            this.x = 32*Math.round(this.x/32);
        }
        
        
    }
    
    gravity(){
        this.vy += 1;
    }
    
    calculate(){
        this.x += this.vx;
        this.y += this.vy;
    }
    
    
    
}

class World{
    constructor(gravity,dayFrame,mapLengthX,mapLengthY){
        // 毎フレーム
        this.gravity = gravity || 9.8;
        this.dayFrame = dayFrame || 5184000;
        
        this.map = [];
        this.mapLengthX = mapLengthX || 60;
        this.mapLengthY = mapLengthY || 30;
        
        // 背景の元画像の設定
        this.bgImage = new Image();
        this.bgImage.src = 'sources/backgrounds/background.jpg';
        
        // マップチップの元となる画像の設定。ここではブロックの種類の設定はしない。
        this.mapChip0 = new Image();
        this.mapChip0.src = 'sources/blocks/mapChip.png';
    }
    
    makeMap(blankNumber){
        for (let i = 0;i < this.mapLengthY;i++){
            let layer = [];
            if(i<blankNumber){
                for(let n = 0;n<this.mapLengthX;n++){
                    layer.push(0);
                }
            }else{
                for(let n = 0;n<this.mapLengthX;n++){
                    layer.push(1);
                }
            }
        this.map.push(layer);
        }
    }
}

const world = new World();
world.makeMap(20);

const chara = new Chara(world,0,500);

const game = new Game(keyboard,'canvas',world,chara);
game.main();
