# MinesGame

Teszt neve: should update balance correctly when player wins
Leírás: A játék végeztével a nyerés esetén a balance érték helyesen frissül.
Input: endGame(true)
Elvárt kimenet: A balance értéke 110 lesz (100 + 10).
Eredmény: Teszt sikeres.

Teszt neve: should not change balance when player loses
Leírás: A játék végeztével a vesztés esetén a balance érték nem változik.
Input: endGame(false)
Elvárt kimenet: A balance értéke 100 marad.
Eredmény: Teszt sikeres.

Teszt neve: should display winning message when player wins
Leírás: Győzelem esetén az alert HTML elem tartalma a megfelelő üzenetet mutatja.
Input: endGame(true) és <div id="alert"></div>
Elvárt kimenet: Az alert.innerText értéke: "You won!".
Eredmény: Teszt sikeres.

Teszt neve: should display losing message when player loses
Leírás: Veszteség esetén az alert HTML elem tartalma a megfelelő üzenetet mutatja.
Input: endGame(false) és <div id="alert"></div>
Elvárt kimenet: Az alert.innerText értéke: "Game Over! You hit a bomb.".
Eredmény: Teszt sikeres.