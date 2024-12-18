let balance = 0; // Játékos egyenlege
let betAmount = 0; // Jelenlegi tét
let bombs = []; // Bombák pozíciói
let hits = 0; // Jól eltalált mezők száma
let profit = 0; // Aktuális játék profitja
let gameRunning = false;

// Balance frissítése
function updateBalance() {
    document.getElementById('balance').innerHTML = `<p>Balance: $${balance}</p>`;
}

// Deposit kezelése
function deposit() {
    document.getElementById('displayDep').style.display = 'block';
}

function add(amount) {
    balance += amount;
    updateBalance();
}

function confirmDep() {
    document.getElementById('displayDep').style.display = 'none';
}

// Tét beállítása
function max() {
    document.getElementById('inp').value = balance;
}

function bet() {
    if (gameRunning) {
        resetGame(); // Ha játék már fut, új játék kezdése
    }
    betAmount = parseInt(document.getElementById('inp').value);
    if (betAmount > 0 && betAmount <= balance) {
        balance -= betAmount;
        updateBalance();
        startGame();
    } else {
        alert('Invalid bet amount!');
    }
}

// Játék indítása
function startGame() {
    bombs = generateBombs(25, 3); // 4 bomba generálása
    hits = 0;
    profit = 0;
    gameRunning = true;
    document.getElementById('alert').innerText = 'Game started!';
    updateGameStatus();
    clearBoard();
    enableBoard();
}

// Bombák generálása
function generateBombs(totalCells, bombCount) {
    const bombSet = new Set();
    while (bombSet.size < bombCount) {
        const randomPos = Math.floor(Math.random() * totalCells) + 1;
        bombSet.add(randomPos);
    }
    return Array.from(bombSet);
}

// Mező kattintás kezelése
function clicar(cellId) {
    if (!gameRunning || document.getElementById(`btnGame${cellId}`).classList.contains('clicked')) return;

    const button = document.getElementById(`btnGame${cellId}`);
    button.classList.add('clicked');

    if (bombs.includes(cellId)) {
        button.style.backgroundImage = "url('bomb.jpg')"; // Bombás mező
        button.style.backgroundSize = 'cover';
        button.style.backgroundColor = 'red';
        endGame(false);
    } else {
        button.style.backgroundImage = "url('gyemant.jpg')"; // Jó mező
        button.style.backgroundSize = 'cover';
        button.style.backgroundColor = 'green';
        hits++;
        profit += betAmount;
        updateGameStatus();
    }
}

// Játék állapot frissítése
function updateGameStatus() {
    document.getElementById('profit').innerHTML = `<p>${profit}$</p>`;
    document.getElementById('hits').innerHTML = `<p>${hits}</p>`;
}

// Tábla törlése
function clearBoard() {
    for (let i = 1; i <= 25; i++) {
        const btn = document.getElementById(`btnGame${i}`);
        btn.classList.remove('clicked');
        btn.style.backgroundImage = "url('kerdojel.jpg')"; // Alapértelmezett kérdőjel kép
        btn.style.backgroundSize = 'cover';
        btn.style.backgroundColor = ''; // Alapértelmezett háttérszín
        btn.style.border = 'none'; // Alapértelmezett keret
    }
}

// Mezők aktiválása
function enableBoard() {
    for (let i = 1; i <= 25; i++) {
        const btn = document.getElementById(`btnGame${i}`);
        btn.style.filter = 'none'; // Eltávolítja a homályosítást
    }
}

// Játék vége
function endGame(won) {
    gameRunning = false;
    if (won) {
        balance += betAmount + profit;
        document.getElementById('alert').innerText = 'You won!';
    } else {
        document.getElementById('alert').innerText = 'Game Over! You hit a bomb.';
    }
    updateBalance();
}

// Stop gomb kezelése
function stop() {
    if (!gameRunning) return;
    endGame(true);
}

// Játék teljes visszaállítása
function resetGame() {
    gameRunning = false;
    bombs = [];
    hits = 0;
    profit = 0;
    document.getElementById('alert').innerText = 'Waiting for a round...';
    clearBoard();
    updateGameStatus();
}