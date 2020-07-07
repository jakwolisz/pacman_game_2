import "../scss/main.scss";

class Furry {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.direction = "right";
    }
}

class Coin {
    constructor() {
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
    }
}

class Game {
    constructor() {
     this.board = document.querySelectorAll("#board div");
     this.furry = new Furry();
     this.coin = new Coin();
     this.score = 0;
    }

 
    index(x,y) {
      return x + (y * 10);
  }

    showFurry() {
        this.hideVisibleFurry();
        this.board[ this.index(this.furry.x,this.furry.y) ].classList.add('pacman');
    };

    showCoin() {
        this.board[ this.index(this.coin.x,this.coin.y) ].classList.add('coin');
    }

    resetScore() {
        let resetScore = document.querySelector('#score div strong');
        resetScore.innerHTML = this.score;
    }
    

    startGame() {
        var self = this;
        this.resetScore();
        this.showCoin();
        this.showFurry();
        this.idSetInterval = setInterval(() => {
           self.moveFurry();
        }, 250);
    }

    hideVisibleFurry() {
        const furryHide = document.querySelector('.pacman');
        if (furryHide !== null) {
            furryHide.classList.remove("pacman")
        }
    }

    hideVisibleCoin() {
        const coinHide = document.querySelector('.coin');
        if (coinHide !== null) {
            coinHide.classList.remove("coin")
        }

       
    }

    checkCoinCollision() {
        if(this.index(this.furry.x,this.furry.y) === this.index(this.coin.x,this.coin.y)) {
            let oldScore = this.score 
            this.score = oldScore + 1;

            let coinRemove = document.querySelector(".coin");
            coinRemove.classList.remove("coin");

            let newScore = document.querySelector('#score div strong');
            newScore.innerHTML = this.score;

            let newCoin = new Coin();
            this.coin = newCoin;
            this.showCoin();
        }
    }

    moveFurry() {
        //console.log("Hurra z setIntervala")
        if(this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        }
        else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;
        }
        else if (this.furry.direction === "up") {
            this.furry.y = this.furry.y + 1;
        }
        else if (this.furry.direction === "down") {
            this.furry.y = this.furry.y - 1;
        }
        this.gameOver();
        this.showFurry();
        this.checkCoinCollision();
    }

    turnFurry(event){
        switch (event.which) {
            case 37:
              this.furry.direction = 'left';
              break;
            case 38:
              this.furry.direction = "down";
              break;
            case 39:
              this.furry.direction = "right";
              break;
            case 40: 
              this.furry.direction = "up";
              break;
        }
    }   

    gameOver() {
        if(this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(this.idSetInterval);
            this.hideVisibleFurry();
            this.hideVisibleCoin();
            boardSection.classList.add("invisible");
            overSection.classList.remove("invisible");
            againSection.classList.remove("invisible");
        }
    }


}

const startBtn = document.querySelector("#start")
const againBtn = document.querySelector("#again_btn")
const scoreSection = document.querySelector("#score")
const boardSection = document.querySelector("#board")
const overSection = document.querySelector("#over")
const againSection = document.querySelector("#again")
const container = document.querySelector(".container")


startBtn.addEventListener("click", () => {
    var game = new Game();
    game.startGame();
    container.classList.add("invisible");
    scoreSection.classList.remove("invisible");
    boardSection.classList.remove("invisible");
    document.addEventListener("keydown", (event) => {
        game.turnFurry(event);
    })
})


againBtn.addEventListener("click", () => {
    container.classList.remove("invisible");
    scoreSection.classList.add("invisible");
    boardSection.classList.add("invisible");
    overSection.classList.add("invisible");
    againSection.classList.add("invisible");
})



