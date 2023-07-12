import React, { useRef, useEffect, useState } from 'react'
import SNAKEPOSITION, { FOODPOSITION, DIRECTION, SPEED } from './Contants';
import UseInterval from './Use_interval';
import snake_bg from './images/snake_bg.jpg';
import './app.css';

function App() {
    let gameArea_ref = useRef();
    let snake_ref = useRef();
    let food_ref = useRef();
    let [dir, setDir] = useState([0, 0]);
    let [snake, setSnake] = useState(SNAKEPOSITION)
    let [speed, setSpeed] = useState(SPEED)
    let [food, setFood] = useState(FOODPOSITION)






    let display = () => {
        gameArea_ref.current.innerHTML = ""
        snake.forEach((e, i) => {
            let snakeSpan = document.createElement("span")
            snakeSpan.setAttribute("ref", "snake_ref")
            snakeSpan.style.gridColumnStart = e.x
            snakeSpan.style.gridRowStart = e.y
            gameArea_ref.current.append(snakeSpan)
            snakeSpan.style.background = "radial-gradient(red,black,black,black)"
            snakeSpan.style.borderRadius = "5px"
            if (i === 0) {
                snakeSpan.style.background = "radial-gradient(white,black,black,black)"
            }
        })

        let foodSpan = document.createElement("span")
        foodSpan.setAttribute("ref", "food_ref")
        foodSpan.style.gridColumnStart = food.x
        foodSpan.style.gridRowStart = food.y
        gameArea_ref.current.append(foodSpan)
        foodSpan.style.background = "radial-gradient(black,red,red,red)"
        foodSpan.style.borderRadius = "50%"
    }

    window.onkeydown = (e) => {
        let { keyCode } = e
        if (keyCode === 40 || keyCode === 39 || keyCode === 38 || keyCode === 37) {
            setDir(DIRECTION[keyCode])
        }
    }

    let snake_movement = () => {
        let snakeCopy = snake;
        let Y = snakeCopy[0].y + dir[1]
        let X = snakeCopy[0].x + dir[0]
        let snakeHead = { x: X, y: Y }
        snakeCopy.unshift(snakeHead) // push { x: X, y: Y } in the start of snake array

        if (collision(snakeHead) === true) {
            gnameOver()
        }
        if (foodEating() === true) {
            let rand_X = Math.round(Math.random() * 13)
            let rand_Y = Math.round(Math.random() * 20)
            setFood({ x: rand_X, y: rand_Y })
        } else {
            snakeCopy.pop() // if move and not in condition of eating, remove last segment from snake array
        }
        setSnake(snakeCopy)
    }



    UseInterval(() => {
        snake_movement()
    }, speed);
    UseInterval(() => {
        display()
    }, 0)



    let collision = (head, snk = snake) => {
        // collision to walls
        if (head.x === 19 || head.y === 22 || head.x === 0 || head.y === 0) {
            return true;
        }
        // collision snake self
        for (let i = 2; i < snk.length; i++) {
            let segment = snk[i]
            if (head.x === segment.x && head.y === segment.y) {
                return true
            }
        }
    }

    let foodEating = () => {
        if (snake[0].x === food.x && snake[0].y === food.y) {
            return true
        } else {
            return false
        }
    }

    let gnameOver = () => {
        setSpeed(null)
        setDir([0, 0])
        return (true,
            alert("Game Over"),
            window.location.reload())
    }

    return (
        <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid", backgroundImage: `url(${snake_bg})`, backgroundSize: "100% 100%", backgroundRepeat: "no-repeat" }}>
                <div ref={gameArea_ref} className="container" style={{
                    width: "676px",
                    height: "calc(100vh - 32px)",
                    border: "14px solid green",
                    borderRradius: "11px",
                    background: "linear-gradient(#48ff48, #fff773)",
                    display: "grid",
                    gridTemplateColumns: "repeat(18, 1fr)",
                    gridTemplateRows: "repeat(21, 1fr)"
                }}>
                </div>
            </div>
        </>
    )
}

export default App