// （注意）このモジュールを使うとグローバル定数keyboardを定義する。
// enterキーの追加
class Keyboard {
    constructor(){
        // 方向キー
        this.left = false;
        this.up = false;
        this.right = false;
        this.down = false;
        
        // 東方
        this.shift = false;
        this.z = false;
        this.x = false;
        
        // マインクラフト
        this.a = false;
        this.w = false;
        this.d = false;
        this.s = false;
        this.space = false;
        // this.shift = false; 定義済み
        this.e = false;
        this.q = false;
        this.t = false;
        
        // 数字
        this.one = false;
        this.two = false;
        this.three = false;
        this.four = false;
        this.five = false;
        this.six = false;
        this.seven = false;
        this.eight = false;
        this.nine = false;
        this.zero = false;
        
        
        // 決定キー
        this.enter = false;
        
    }
}

function keyDown(event){
    let code = event;
    Number.isInteger(event)?false:code = event.keyCode;
    // alert(code);
    switch(code){
        case 37 :
            keyboard.left = true;
            break;
        
        case 38 :
            keyboard.up = true;
            break;
        
        case 39 :
            keyboard.right = true;
            break;
        
        case 40 :
            keyboard.down = true;
            break;
        
        case 16:
            keyboard.shift = true;
            break;
        
        case 90:
            keyboard.z = true;
            break;
        
        case 88:
            keyboard.x = true;
            break;
            
        case 65:
            keyboard.a = true;
            break;
            
        case 87:
            keyboard.w = true;
            break;
            
        case 68:
            keyboard.d = true;
            break;
            
        case 83:
            keyboard.s = true;
            break;
            
        case 32:
            keyboard.space = true;
            break;
            
        case 69:
            keyboard.e = true;
            break;
            
        case 81:
            keyboard.q = true;
            break;
            
        case 84:
            keyboard.t = true;
            break;
            
                
        case 49:
            keyboard.one = true;
            break;
            
        case 50:
            keyboard.two = true;
            break;
            
        case 51:
            keyboard.three = true;
            break;
            
        case 52:
            keyboard.four = true;
            break;
            
        case 53:
            keyboard.five = true;
            break;
            
        case 54:
            keyboard.six = true;
            break;
            
        case 55:
            keyboard.seven = true;
            break;
            
        case 56:
            keyboard.eight = true;
            break;
            
        case 57:
            keyboard.nine = true;
            break;
            
        case 48:
            keyboard.zero = true;
            break;
            
            
        case 13:
            keyboard.enter = true;
            break;
            
        default:
            break;
    }
    
    event.preventDefault();
}

function keyUp (event){
    let code = event;
    Number.isInteger(event)?false:code = event.keyCode;
    // alert(code);
    switch(code){
        case 37 :
            keyboard.left = false;
            break;
        
        case 38 :
            keyboard.up = false;
            break;
        
        case 39 :
            keyboard.right = false;
            break;
        
        case 40 :
            keyboard.down = false;
            break;
        
        case 16:
            keyboard.shift = false;
            break;
        
        case 90:
            keyboard.z = false;
            break;
        
        case 88:
            keyboard.x = false;
            break;
            
        case 65:
            keyboard.a = false;
            break;
            
        case 87:
            keyboard.w = false;
            break;
            
        case 68:
            keyboard.d = false;
            break;
            
        case 83:
            keyboard.s = false;
            break;
            
        case 32:
            keyboard.space = false;
            break;
            
        case 69:
            keyboard.e = false;
            break;
            
        case 81:
            keyboard.q = false;
            break;
            
        case 84:
            keyboard.t = false;
            break;
            case 49:
            keyboard.one = false;
            break;
            
        case 50:
            keyboard.two = false;
            break;
            
        case 51:
            keyboard.three = false;
            break;
            
        case 52:
            keyboard.four = false;
            break;
            
        case 53:
            keyboard.five = false;
            break;
            
        case 54:
            keyboard.six = false;
            break;
            
        case 55:
            keyboard.seven = false;
            break;
            
        case 56:
            keyboard.eight = false;
            break;
            
        case 57:
            keyboard.nine = false;
            break;
            
        case 48:
            keyboard.zero = false;
            break;
            
            
        case 13:
            keyboard.enter = false;
            break;
            
        default:
            break;
    }
    
    event.preventDefault();
}


const keyboard = new Keyboard();
addEventListener('keydown',keyDown);
addEventListener('keyup',keyUp);
