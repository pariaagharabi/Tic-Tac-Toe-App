import React, { useState } from 'react';

const TicTacToeApp = () => {
    // Destructuring & Updating
    const [board, setBoard] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState("X");
    const [gameStatus, setGameStatus] = useState("Start Game");
    const [roundPlayed, setRoundPlayed] = useState(0);
    const [gameWinnerStatus, setGameWinnerStatus] = useState("No winner! ☠️");

    // Methods
    const handleBoardClicked = (idx) => {
        const clonedBoard = [...board];
        if (clonedBoard[idx] !== null || gameStatus === "Game Over!") {
            return
        }

        let clonedRoundPlayed = roundPlayed;
        clonedBoard[idx] = playerTurn;
        setBoard(clonedBoard);
        setPlayerTurn(prevPlayerTurn => prevPlayerTurn === "X" ? "O" : "X");
        clonedRoundPlayed += 1;
        setRoundPlayed(clonedRoundPlayed);

        const winner = calculateWinner(clonedBoard);
        if (winner) {
            setGameWinnerStatus(`${winner} 🥳`);
            setGameStatus("Game Over!");
        } else if (clonedRoundPlayed < 9) {
            setGameStatus("Playing Game...");
        } else {
            setGameStatus("Game Over!");
        }
    };

    const calculateWinner = (board) => {
        const winningPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let pattern of winningPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        return null;
    };

    const handleBtnReset = () => {
        setBoard(Array(9).fill(null));
        setPlayerTurn("X");
        setGameStatus("Start Game");
        setRoundPlayed(0);
        setGameWinnerStatus("No winner! ☠️");
    };

    // Render in UI
    return (
        <>
            <div className="app-container">
                <div className="app-inner-container">
                    <div className="app-header">
                        <h1>Tic-Tac-Toa Game App</h1>
                    </div>

                    <div className="app-board-container">
                        {board.map((cell, index) => (
                            <div className="cell" key={crypto.randomUUID().toString()}>
                                <button onClick={() => handleBoardClicked(index)}>
                                    {cell}
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="game-status-container">
                        <div className="game-status">
                            <h3>Status: {gameStatus}</h3>
                        </div>
                    </div>

                    <div className="game-winner">
                        <h3>Winner: {gameWinnerStatus}</h3>
                    </div>

                    <div className="btn-reset">
                        <button onClick={handleBtnReset}>Reset Game</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TicTacToeApp;