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
            
        }else if(this.gameMode === 1){
            
        }else if(this.gameMode === 2){
            world.drawMap();
        }
        window.requestAnimationFrame(this.main.bind(this));
    }
}


class World {
    constructor(game,mapHeight,mapLength){
        this.game = game;
        
        this.makeMap(mapHeight,mapLength);
        
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

class MainMenu {
    constructor(game){
        this.game = game;
        this.firstLayerNumber = 0;
        this.secoundLayerNumber = 0;
    }
    
    drawFirstLayer(){
        
    }
    
    drawSe
    
}

const game = new Game();

/*
const menu = new Menu(game);

const name = new Name(game);
*/
const world = new World(game);

game.gameMode = 2;

game.main();