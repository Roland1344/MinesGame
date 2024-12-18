import { endGame, balance } from './game';

describe('Game End Tests', () => {
    beforeEach(() => {
        
        balance = 100; 
        betAmount = 10; 
        gameRunning = true; 
    });

    test('should update balance correctly when player wins', () => {
        endGame(true); 
        expect(balance).toBe(100 + 10); 
    });

    test('should not change balance when player loses', () => {
        endGame(false); 
        expect(balance).toBe(100); 
    });

    test('should display winning message when player wins', () => {
        document.body.innerHTML = `<div id="alert"></div>`; 
        endGame(true);
        expect(document.getElementById('alert').innerText).toBe('You won!');
    });

    test('should display losing message when player loses', () => {
        document.body.innerHTML = `<div id="alert"></div>`; 
        endGame(false);
        expect(document.getElementById('alert').innerText).toBe('Game Over! You hit a bomb.');
    });
});