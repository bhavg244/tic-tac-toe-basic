var game = {
  p1: "X",
  p2: "O",
  board: [["", "", ""], ["", "", ""], ["", "", ""]],
  maxTurn: 9,
  turnNum: 0,
  start: true,
  winner: null,
  currentPlayer: "X",
  checkWinner(player) {
    switch (player) {
      case "X":
        player = "X";
        break;
      case "O":
        player: "O";
        break;
    }

    //check horizontal
    for (let i = 0; i < 3; i++) {
      if (
        this.board[i][0] == player &&
        this.board[i][1] == player &&
        this.board[i][2] == player
      ) {
        this.start = false;
        this.winner = player == "X" ? "Player X" : "Player O";
      }
    }
    // //check vertical
    if (this.winner == null) {
      for (let i = 0; i < 3; i++) {
        if (
          this.board[0][i] == player &&
          this.board[1][i] == player &&
          this.board[2][i] == player
        ) {
          this.start = false;
          this.winner = player == "X" ? "Player X" : "Player O";
        }
      }
    }
    //check diagnally
    if (this.winner == null) {
      if (
        (this.board[0][0] == player &&
          this.board[1][1] == player &&
          this.board[2][2] == player) ||
        (this.board[0][2] == player &&
          this.board[1][1] == player &&
          this.board[2][0] == player)
      ) {
        this.start = false;
        this.winner = player == "X" ? "Player X" : "Player O";
      }
    }

    //Check for draw and end game if game == draw
    if (this.winner == null && this.turnNum == 9) {
      this.start = false;
      this.winner = "Draw";
    }
  },
  nextTurn(row, col) {
    //If game is not over
    if (this.start == true) {
      this.turnNum++;
      this.board[row][col] = this.currentPlayer;
      this.checkWinner(this.currentPlayer); //If won/draw set this.winner to players name/draw
      //if game !won then set next players turn
      if (this.winner == null) {
        if (this.currentPlayer == this.p1) {
          this.currentPlayer = this.p2;
        } else if (this.currentPlayer == this.p2) {
          this.currentPlayer = this.p1;
        }
      }
      //else If game == won
      else {
        switch (this.winner) {
          case "Draw":
            $("#result").text(`${this.winner} game.`);
            break;
          default:
            $("#result").text(`${this.winner} has won the game`);
        }
      }
    }
    //else If game over
    else {
      this.resetGame();
      $("#result").text("Please refresh to start the game");
    }
  },
  resetGame() {
    this.start = false;
    this.winner = null;
    this.turnNum = 0;
    this.currentPlayer = "X";

    this.board[0][0] = "";
    this.board[0][1] = "";
    this.board[0][2] = "";
    this.board[1][0] = "";
    this.board[1][1] = "";
    this.board[1][2] = "";
    this.board[2][0] = "";
    this.board[2][1] = "";
    this.board[2][2] = "";
  }
};
function setup() {
  createCanvas(600, 300);
}

function draw() {
  background(220);

  let w = width / 3;
  let h = height / 3;

  /**  Grid setup */
  //Horizontal
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);
  //Vertical
  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);

 //Displaying items in grid
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      stroke(32);
      textSize(50);
      textAlign(RIGHT);
      text(game.board[i][j], w * (j + 1), h * (i + 1));
    }
  }
}

function mouseClicked() {
  /**** if blocks have no values then only proceed with click ****/

  //Block 1
  if (game.board[0][0] == "") {
    if (mouseX > 0 && mouseX < 200 && (mouseY > 0 && mouseY < 100))
      game.nextTurn(0, 0);
  }
  //Block 2
  if (game.board[0][1] == "") {
    if (mouseX > 200 && mouseX < 400 && (mouseY > 0 && mouseY < 100))
      game.nextTurn(0, 1);
  }

  //Block 3
  if (game.board[0][2] == "") {
    if (mouseX > 400 && mouseX < 600 && (mouseY > 0 && mouseY < 100))
      game.nextTurn(0, 2);
  }

  //Block 4
  if (game.board[1][0] == "") {
    if (mouseX < 200 && (mouseY > 100 && mouseY < 200)) game.nextTurn(1, 0);
  }

  //Block 5
  if (game.board[1][1] == "") {
    if (mouseX > 200 && mouseX < 400 && (mouseY > 100 && mouseY < 200))
      game.nextTurn(1, 1);
  }

  //Block 6
  if (game.board[1][2] == "") {
    if (mouseX > 400 && mouseX < 600 && (mouseY > 100 && mouseY < 200))
      game.nextTurn(1, 2);
  }

  //Block 7
  if (game.board[2][0] == "") {
    if (mouseX < 200 && (mouseY > 200 && mouseY < 300)) game.nextTurn(2, 0);
  }

  //Block 8
  if (game.board[2][1] == "") {
    if (mouseX > 200 && mouseX < 400 && (mouseY > 200 && mouseY < 300))
      game.nextTurn(2, 1);
  }

  //Block 9
  if (game.board[2][2] == "") {
    if (mouseX > 400 && mouseX < 600 && (mouseY > 200 && mouseY < 300))
      game.nextTurn(2, 2);
  }
}
