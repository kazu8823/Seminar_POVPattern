let WIDTH_PX = 32;
let HEIGHT_PX = 12;
let CELL_SIZE = 30;

//boolean[][] cellState = new boolean[HEIGHT_PX][WIDTH_PX]; 
let cellState = [];


function setup(){
    createCanvas(1060, 560);
    background(240);

    // for(int i = 0 ; i < WIDTH_PX ; i++){
    //     for(int j = 0 ; j < HEIGHT_PX ; j++){
    //         cellState[j][i] = false;
    //     }
    // }

    for(var i = 0 ; i < WIDTH_PX ; i++){
        cellState[i] = [];
        for(var j = 0 ; j < HEIGHT_PX ; j++){
            cellState[i][j] = false;
        }
    }
}

function draw(){
    backDraw();

    // ボタンの描画
    stroke(10);
    fill(255);
    rect(50, 460, 100, 50);
    rect(200, 460, 100, 50);
    textSize(20);
    textAlign(CENTER, CENTER);
    fill(0);
    text("RESET", 50, 460, 100, 50);
    text("OUTPUT", 200, 460, 100, 50);
    

    // マウス入力
    if(mouseIsPressed){
        let click = true;
        let cell_x = Math.floor((mouseX - 50) / 30);
        let cell_y = Math.floor((mouseY - 50) / 30);
        
        // 範囲制限
        if(cell_x < 0 || WIDTH_PX <= cell_x){
            click = false;
        }  
        if(cell_y < 0 || HEIGHT_PX <= cell_y){
            click = false;
        }

        if(click){
            switch(mouseButton){
                case LEFT:
                    cellState[cell_y][cell_x] = true;
                    break;
                case RIGHT:
                    cellState[cell_y][cell_x] = false;
                    break;
                default:
                    break;
            }
        }
    }
}

// 背景の描画
function backDraw(){
    // 外枠
    fill(10);
    noStroke();
    rect(50, 50, CELL_SIZE * WIDTH_PX , CELL_SIZE * HEIGHT_PX);

    // 各セル
    noFill();
    stroke(10);
    for(let i = 0 ; i < WIDTH_PX ; i++){
        for(let j = 0 ; j < HEIGHT_PX ; j++){
            if(cellState[j][i]){
                fill(255, 0, 0);
            }else{
                fill(100);
            }

            rect(50 + i * CELL_SIZE, 50 + j * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }
}

function mousePressed(){
    if(50 <= mouseX && mouseX <= 150 && 460 <= mouseY && mouseY <= 510){
        // リセットボタン
        for(let i = 0 ; i < WIDTH_PX ; i++){
            for(let j = 0 ; j < HEIGHT_PX ; j++){
                cellState[j][i] = false;
            }
        }
    }
    if(200 <= mouseX && mouseX <= 300 && 460 <= mouseY && mouseY <= 510){
        // 出力
        let outStr = "const unsigned int pattern[] = {\n";
        for(let i = 0 ; i < WIDTH_PX ; i++){
            let temp = "    0b";
            for(let j = HEIGHT_PX - 1 ; j >= 0 ; j--){
                if(cellState[j][i]){
                    temp += "1";
                }else{
                    temp += "0";
                }
            }
            outStr += temp + ",\n";
        }
        outStr += "};";

        navigator.clipboard.writeText(outStr);
    }
}

document.oncontextmenu = (e) => { e.preventDefault(); }
