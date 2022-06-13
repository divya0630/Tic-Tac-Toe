let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

let human='O';
let ai='X';
let currentPlayer=human;
let w;
let h;

function setup() {
  createCanvas(300, 300);
  w=width/3;
  h=height/3;
  bestMove();
}

function mousePressed(){
  if(currentPlayer==human){
    let i=floor(mouseX/w);
    let j=floor(mouseY/h);
    if(board[i][j]==''){
      board[i][j]=human;
      currentPlayer=ai;
      bestMove();
    }
  }
}

//minimax
let scores={
  X:10,
  O:-10,
  tie:0
}

function bestMove(){
  //AI's turn
  let bestScore=-Infinity;
  let move;
  console.log("start");
  for(let i=0; i<3; i++){
    for(let j=0; j<3; j++){
      if(board[i][j]==''){
        board[i][j]=ai;
        let score=minimax(board,0,false);
        board[i][j]='';
        if(score>bestScore){
          bestScore=score;
          move={i,j};
        }
      }
    }
  }
  board[move.i][move.j]=ai;
  currentPlayer=human;
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
      winner=board[0][i];
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

	let available=0;
	for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      if(board[i][j]=='')
        available++;
    }
  }
  
  if(winner==null && available==0){
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
      if (spot == human) {
        noFill();
        ellipseMode(CENTER);
        ellipse(x, y, w / 2);
      }
      if (spot == ai) {
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
  // bestMove();
}

function minimax(board,depth,isMaximizing){
  let result=checkWinner();
  if(result!==null){
    return scores[result];
  }
  
  if(isMaximizing){
    let bestScore=-Infinity;
    for(let i=0; i<3; i++){
      for(let j=0; j<3; j++){
        if(board[i][j]==''){
          board[i][j]=ai;
          let score=minimax(board,depth+1,false);
          board[i][j]='';
          bestScore=max(score,bestScore);
        }
      }
    }
    return bestScore;
  }
  else{
      let bestScore=Infinity;
      for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
          if(board[i][j]==''){
            board[i][j]=human;
            let score=minimax(board,depth+1,true);
            board[i][j]='';
            bestScore=min(score,bestScore);
          }
        }
      }
    return bestScore;
  }
}


//minimax end

