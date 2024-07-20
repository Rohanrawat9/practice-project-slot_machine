// Deposit a amount
// Determine number of lines to bet
// Collect a bet amount
// Spin the slot machine
//  Determine the outcome
// Give the user their winnings
// Repeat until the user quits

const prompt =  require('prompt-sync')({sigint: true}); // import prompt-sync

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A : 2,
    B : 4,
    C : 6,
    D : 8
}

const SYMBOLS_VALUES = {
    A : 5,
    B : 4,
    C : 3,
    D : 2

}



const Deposit = () => {
    while(true){
        let deposit = prompt("How much would you like to deposit : ");
    const numberdeposit = parseFloat( deposit ); // convert string to float

    if(isNaN(numberdeposit) || numberdeposit <= 0){
        console.log("Invalid amount, Please try again.");
    }else{
        return numberdeposit; // return the deposit amount
    }
    }
}

const getnumberofLines = ()=> {
    while(true){
        let  lines = prompt("Enter the number of lines would you like to bet (1-3) : ");
        const  numberofLines = parseFloat( lines ); // convert string to int

        if(isNaN(numberofLines) || numberofLines <= 0 || numberofLines > 3){
            console.log("Invalid number of lines, Please try again.");
        }else{
            return  numberofLines; // return the number of lines
        }
    }
}

const getbet = (balance, lines) => {
    while(true){
        const  bet = prompt("Enter the bet per line: ");
        const  numberBet = parseFloat( bet ); // convert string to int

        if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines){
            console.log("Invalid number of Bets, Please try again.");
        }else{
            return  numberBet; 
        } 
    }
}

const spin = () => {
    const symbols= [];
    for(const[symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }

    const reels = [[], [], []];
        for(let i = 0; i < COLS; i++){
        const reelSymbols = [...symbols];
            for(let j = 0; j < ROWS; j++){
                const randomIndex = Math.floor(Math.random() * reelSymbols.length);
                const selectedSymbol = reelSymbols[randomIndex];
                reels[i].push(selectedSymbol);
                reelSymbols.splice( randomIndex, 1 ); // remove the selected symbol from the array
        }
    }
    return reels;
}

const transpose = (reels) => {
    const rows = [];

    for(let i = 0; i < ROWS; i++){
        rows.push([]);
        for(let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

const printRows = (rows) => {
    for(const row of rows){
        let rowString = "";
        for(const [i, symbol] of row.entries()){
            rowString += symbol;
            if(i != row.length - 1){
                rowString  += " | ";
                }
            }
            console.log( rowString );

    }
}

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for(let row = 0; row < lines; row++){
        const symbols = rows[row]; // get the symbols in the row
        let allSame = true;

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break; // stop checking the rest of the symbols
            }
        }
        if(allSame){
            winnings += bet * SYMBOLS_VALUES[symbols[0]]
        }
    }
    return winnings;
}

const game = () => {
    let balance = Deposit();  // call the Deposit function

    while(true){
        console.log("You have a balance of $" + balance);
        const  numberofLines = getnumberofLines(); // call the getnumberofLines function
        const bet = getbet( balance, numberofLines ); // call the getbet function
        balance -= bet * numberofLines; // deduct the bet from the balance
        const reels = spin();
        const  rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberofLines);
        balance += winnings; // add the winnings to the balance
        console.log("You won, $" +  winnings.toString()); // print the winnings

        if( balance <= 0){
            console.log("You have run out of money, game over");
            break;
    }   
    const  playAgain = prompt("Do you want to play again? (y/n)"); // ask the user if they want to play again

    if(playAgain != "y")
        break;
    }
};

game();



