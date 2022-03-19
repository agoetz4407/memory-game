// declaring global variables
var brainEmoji = '🧠'
var numTiles = 20
var startTime = 30
var time = startTime
var intervalId
var score = 0

var countdownEl = document.getElementById("countdown");
var scoreEl = document.getElementById("score");
var tilesEl = document.getElementById("tiles");

var flippedTile1 = null
var flippedTile2 = null


//functions
function updateScore() {
    //make background green
    flippedTile1.classList.add("matched")
    flippedTile2.classList.add("matched")
    //increase score
    score++
    scoreEl.innerText = score
    //reset flipped tiles
    flippedTile1 = null
    flippedTile2 = null

}

function unFlipTiles() {
    setTimeout(function() {
        // replaced tiles number with brain emoji, remove flipped class for style, and reset flipped tiles values     
        flippedTile1.innerText = brainEmoji
        flippedTile2.innerText = brainEmoji
        flippedTile1.classList.remove("flipped")
        flippedTile2.classList.remove("flipped")
        flippedTile1 = null
        flippedTile2 = null    
    }, 1000)
}

function compareTiles() {
    var num1 = flippedTile1.getAttribute("data-number")
    var num2 = flippedTile2.getAttribute("data-number")

    if (num1 === num2) {
        updateScore()
    } else {
        unFlipTiles()
    }
}


function handleTileClick(event) {
    if (flippedTile1 && flippedTile2) {
        return
    }
    var clickedTile = event.target
    var num = clickedTile.getAttribute("data-number")
    clickedTile.innerText = num
    clickedTile.classList.add("flipped")

    if (!flippedTile1) {
        flippedTile1 = clickedTile
    }
    else {
        flippedTile2 = clickedTile
        compareTiles()
    }
}

function createShuffledNumbers() {
    var nums = []
    for (var i = 0; i < (numTiles / 2); i++) {
        var randNum = Math.floor(Math.random() * 500)
        nums.push(randNum, randNum)
    }
    for (var i = nums.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * i)
        var temp = nums[i]
        nums[i] = nums[j]
        nums[j] = temp
    }
    return nums
}

function createTiles() {
    var shuffledNums = createShuffledNumbers()
    
    for (var i = 0; i < shuffledNums.length; i++) {
        var li = document.createElement("li")
        li.innerText = brainEmoji
        li.setAttribute("data-number", shuffledNums[i])
        li.classList.add("tile")
        li.addEventListener("click", handleTileClick)
        tilesEl.appendChild(li)
    }
}

function gameOver() {
    clearInterval(intervalId)
    alert("Time is up. Game Over!")
    var initials = prompt("Please enter your initials")

    localStorage.setItem("MemoryGameChamp", JSON.stringify({initials: initials, score: score}))

    var playAgain = confirm("Want to play again?")
    if (playAgain) {
        window.location.reload()
    }
}

function startTimer() {
    console.log("Starting Timer...")

    intervalId = setInterval(function() {
        time--
        countdownEl.innerText = time
        if (time === 0) {
            gameOver()
        }
    }, 1000)
}


function startRound() {
    createTiles()
    startTimer()
}


//main process
startRound()


