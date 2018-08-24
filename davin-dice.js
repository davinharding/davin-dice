let  readlineSync  =  require('readline-sync'),
     bankRoll = 500,
     betAmount=0,
     firstRun=true;

//This function gives the user an option to review instructions prior to rolling

function menuOptions(option) {
  if (option === "v") {
    console.log("Davin Dice is a simple game of chance.");
    console.log("You start the game with a bankroll of 500 chips.")
    console.log("Choose an amount to bet then roll a 1-100 sided dice."); 
    console.log("If you roll greater than 50 you double your bet, roll a 50 or less and you lose your bet." );
    console.log("Use strategy or just plain luck to increase your bankroll and become a dice tycoon!");
    let go = readlineSync.question('( Back to menu --> press enter <-- )');
    game();
  } else if (option === "b") {
    bet();
  } else {
    console.log( "A bouncer escorts you out of Davin Dice." );
    console.log( "Bouncer: \"Come back when you're ready to play.\"" );
 }
}

//This function allows the user to enter a bet and confirms if the bet is correct before rolling

function bet() {
  console.log(`Bankroll = ${bankRoll}`)
  let userBet = Number(readlineSync.question("How much would you like to bet?"));
  if (bankRoll >= userBet > 0) {
    let betConfirm = readlineSync.question(`Bet ${userBet}? [Y]es or [N]o:  `);
      if (betConfirm === "y") {
        betAmount = userBet;
        roll();
      } else if (betConfirm === "n") {
        bet();
      } else {
        console.log('Bouncer: "Quit messing around!"' );
        let go = readlineSync.question('( press enter )');
        bet();
      }
  } else {
    console.log('Bouncer: "Quit messing around!"' );
    let go = readlineSync.question('( press enter )');
    bet();
  }
}

//This function rolls the dice and tells the user if they won or lost based on the outcome.  Also displays new bankroll based on outcome

function roll() {
  let roll = Math.random()*100;
  if (roll > 50.00) {
    console.log(roll);
    console.log("You win!"); 
    bankRoll += betAmount;
    console.log(`Bankroll: ${bankRoll}`);
  } else {
    console.log(roll);
    console.log("You lose.");
    bankRoll -= betAmount
    console.log(bankRoll);
  }
}

//This function displays the lose message when the player runs out of chips

function lose() {
    console.log(`Looks like you're all out of chips!`);
    console.log(`Come back when you got more guap kid.`);
}

//This function allows the user to bet again

function game(){
  let playAgain = true,
      option;
  while (playAgain) {
    if(firstRun){
        console.log( "Welcome to Davin Dice!");
        var fs = require('fs');
        var array = fs.readFileSync('/Users/davinharding/Desktop/wyncode/davin-dice/dice-pic.txt').toString().split("\n");
        for(i in array) {
        console.log(array[i]);
        }
        option = readlineSync.question( "[V]iew Instructions or [B]et:  ").toLowerCase();
        menuOptions(option);
    } else{
        if(bankRoll > 0)
          playAgain = readlineSync.question("Bet again? [Y]es or [N]o:  ").toLowerCase() === 'y';
        else {
          lose();
          return;
        }
    }
    if(playAgain){
        bet();
    }
    firstRun = false;
  };
  console.log(`Thanks for playing!`)
}


//The game begins below

game();


