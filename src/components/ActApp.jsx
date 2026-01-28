//ActApp.jsx

import './index.css'
import Player from './Player.jsx'
import GameBoard from './GameBoard.jsx'
import Log from './Log.jsx'
import GameOver from './GameOver.jsx'
import { useState } from 'react'

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

const WINNING_COMBINATIONS = [
    [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 }
    ],
    [
        { row: 1, col: 0 },
        { row: 1, col: 1 },
        { row: 1, col: 2 }
    ],
    [
        { row: 2, col: 0 },
        { row: 2, col: 1 },
        { row: 2, col: 2 }
    ],
    [
        { row: 0, col: 2 },
        { row: 1, col: 1 },
        { row: 2, col: 0 }
    ],
    [
        { row: 0, col: 0 },
        { row: 1, col: 1 },
        { row: 2, col: 2 }
    ],
    [
        { row: 0, col: 0 },
        { row: 1, col: 0 },
        { row: 2, col: 0 }
    ],
    [
        { row: 0, col: 1 },
        { row: 1, col: 1 },
        { row: 2, col: 1 }
    ],
    [
        { row: 0, col: 2 },
        { row: 1, col: 2 },
        { row: 2, col: 2 }
    ]
]

function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X'

    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O'
    }
    return currentPlayer
}
function deriveWinner(board, players) {
    let winner = null
    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol = board[combination[0].row][combination[0].col]
        const secondSquareSymbol = board[combination[1].row][combination[1].col]
        const thirdSquareSymbol = board[combination[2].row][combination[2].col]

        if (firstSquareSymbol &&
            firstSquareSymbol === secondSquareSymbol &&
            firstSquareSymbol === thirdSquareSymbol
        ) {
            winner = players[firstSquareSymbol]
        }
    }
    return winner
}

function deriveBoard(gameTurns) {
    let board = [...initialGameBoard.map(row => [...row])];


    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;

        board[row][col] = player
    }

    return board;

}
function ActApp() {
    const [gameTurns, setGameTurns] = useState([])
    const [players, setPlayers] = useState({
        X: 'Player 1',
        O: 'Player 2'
    })


    const activePlayer = deriveActivePlayer(gameTurns)

    const board = deriveBoard(gameTurns)

    const winner = deriveWinner(board, players)


    const hasDraw = gameTurns.length === 9 && !winner

    const handleSelectSquare = (rowIndex, colIndex) => {

        setGameTurns(prev => {

            const currentPlayer = deriveActivePlayer(prev)
            const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prev]

            return updatedTurns
        })
    }
    const handleRestart = () => {
        setGameTurns([])
    }
    const handlePlayerNameChange = (symbol, newName) => {
        setPlayers(prev => {
            return {
                ...prev,
                [symbol]: newName
            }
        })
    }

    return <main>
        <div id="game-container">
            <ol id="players" className='highlight-player'>
                <Player name="Player 1" symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
                <Player name="Player 2" symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
            </ol>
            {(winner || hasDraw) && <GameOver winner={winner} restart={handleRestart} />}
            <GameBoard onSelectSquare={handleSelectSquare}
                board={board}
            />
        </div>
        <Log turns={gameTurns} />
    </main>
}
export default ActApp