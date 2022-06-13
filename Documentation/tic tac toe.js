let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

//let players = ["O", "X"];

let currentPlayer;
let available = [];
let human="X";
let ai="O";

function setup() {
  createCanvas(300, 300);
  frameRate(10);
  currentPlayer = human;

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      available.push([i,j]);
    }
  }
}

function mousePressed(){

    let w=width/3;
    let h=height/3;
  
    let i=floor(mouseX/w);
    let j=floor(mouseY/h);
    if(board[i][j]==''){
      board[i][j]=human;
      currentPlayer=ai;
      nextTurn();
    }
}

function nextTurn() {
    if(currentPlayer==human)
        mousePressed();
  
    if(currentPlayer==ai){
      let index = floor(random(available.length));
      let spot = random(available);
      let i = spot[0];
      let j = spot[1];
    
      if(board[i][j]==''){
        board[i][j]=ai;
        currentPlayer=human;
      }
    }
}

function equals3(a,b,c){
  return (a==b && b==c && a != "");
}
function checkWinner(){
  
  let winner=null;
  
  //horizontal
  for(let i = 0; i < 3; i++){
    if(equals3(board[i][0],board[i][1],board[i][2])){
      winner=board[i][0];
    }
  }
  
  //vertical
  for(let i = 0; i < 3; i++){
    if(equals3(board[0][i],board[1][i],board[2][i])){
      winner=board[i][0];
    }
  }
  
  //diagonal1
    if(equals3(board[0][0],board[1][1],board[2][2])){
      winner=board[0][0];
    }
  //diagonal2
    if(equals3(board[0][2],board[1][1],board[2][0])){
      winner=board[0][2];
    }
  
  if(winner==null && available.length==0){
    return 'tie';
  }else{
    return winner;
  }
}

function draw() {
  background(220);
  let w = width / 3;
  let h = height / 3;

  line(0, w, width, h);
  line(0, w * 2, width, h * 2);
  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
      if (spot == ai) {
        noFill();
        ellipseMode(CENTER);
        ellipse(x, y, w / 2);
      }
      if (spot == human) {
        let c = w / 4;
        line(x - c, y - c, x + c, y + c);
        line(x + c, y - c, x - c, y + c);
      }
    }
  }
  let result=checkWinner();
  if(result != null){
    noLoop();
    createP(result).style('color','#0FFF').style('font-size','32pt');

  }
  nextTurn();
}
