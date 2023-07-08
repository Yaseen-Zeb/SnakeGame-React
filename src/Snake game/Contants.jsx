import React, { PureComponent } from 'react'
let SNAKEPOSITION = [
    { x: 12, y: 12 }
]
let FOODPOSITION = { x: 5, y: 7 }


let DIRECTION = {
    38: [0, -1],//up
    40: [0, +1],//down
    39: [+1, 0],//right
    37: [-1, 0]//left
}

let SPEED = 100

export default SNAKEPOSITION;
export { FOODPOSITION, DIRECTION, SPEED }
