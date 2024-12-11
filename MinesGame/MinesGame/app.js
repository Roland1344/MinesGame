document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.querySelector(".grid-container");
    const scoreDisplay = document.getElementById("score");
    const restartButton = document.getElementById("restart");
    const startPanel = document.getElementById("start-panel");
    const startButton = document.getElementById("start-game");
    const bombButtons = document.querySelectorAll(".bomb-count");
    const customBombInput = document.getElementById("custom-bomb-count");
    const mainGame = document.querySelector("main");

    let gridSize = 36;
    let bombCount = 3;
    let score = 0;
    let gameOver = false;

    bombButtons.forEach((button) => {
        button.addEventListener("click", () => {
            bombButtons.forEach((btn) => btn.classList.remove("selected"));
            customBombInput.value = ""; 
            button.classList.add("selected");
            bombCount = parseInt(button.dataset.count, 10);
        });
    });

    customBombInput.addEventListener("input", () => {
        bombButtons.forEach((btn) => btn.classList.remove("selected")); 
        const value = parseInt(customBombInput.value, 10);
        if (value >= 2 && value <= 35) {
            bombCount = value; 
        }
    });

    startButton.addEventListener("click", () => {
        if (!bombCount || bombCount < 2 || bombCount > 35) {
            alert("Adj meg egy érvényes bombaszámot (2 és 35 között)!");
            return;
        }
        initializeGrid();
    });

    function initializeGrid() {
        gridContainer.innerHTML = "";
        score = 0;
        gameOver = false;
        scoreDisplay.textContent = score;

        const bombs = generateBombs(gridSize, bombCount);

        for (let i = 0; i < gridSize; i++) {
            const gridItem = document.createElement("div");
            gridItem.classList.add("grid-item");
            gridItem.dataset.index = i;

            if (bombs.has(i)) {
                gridItem.dataset.type = "bomb";
            } else {
                gridItem.dataset.type = "safe";
            }

            gridItem.addEventListener("click", () => handleItemClick(gridItem));
            gridContainer.appendChild(gridItem);
        }
    }

    function generateBombs(size, count) {
        const bombPositions = new Set();
        while (bombPositions.size < count) {
            const bombPosition = Math.floor(Math.random() * size);
            bombPositions.add(bombPosition);
        }
        return bombPositions;
    }

    function handleItemClick(item) {
        if (gameOver || item.classList.contains("revealed")) return;

        item.classList.add("revealed");
        const type = item.dataset.type;

        if (type === "bomb") {
            item.classList.add("bomb");
            endGame(false);
        } else {
            item.classList.add("safe");
            score++;
            scoreDisplay.textContent = score;

            if (score === gridSize - bombCount) {
                endGame(true);
            }
        }
    }

    function endGame(won) {
        gameOver = true;
        alert(won ? "Nyertél!" : "Vesztettél!");
    }

    restartButton.addEventListener("click", () => {
        initializeGrid();
    });
});