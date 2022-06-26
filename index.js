const mainContainer = document.querySelector(".dpcontainer")
let Players = []

// It is player y's turn to roll the dice
// Change
let y = 0;
let x = 0;


const evalMap = {
    A: "Five of a kind",
    B: "Four of a kind",
    C: "Full House",
    D: "Straight",
    E: "Three of a kind",
    F: "Two Pairs",
    G: "One Pair",
    I: "Nothing"
}

const processRoll = (roll) => {
    const isFiveOfKind = (roll) => {
        let confirm = true
        for (let i = 0; i < roll.length - 1; i++) {
            if (roll[i] !== roll[i + 1]) {
                confirm = false
            }
        }
        return confirm
    }

    const isFourOfKind = (roll) => {
        let map = [0, 0, 0, 0, 0, 0, 0]
        roll.forEach( e => map[e]++)
        return map.includes(4)
    }

    const isFullHouse = (roll) => {
        let map = [0, 0, 0, 0, 0, 0, 0]
        roll.forEach( e => map[e]++)
        return (map.includes(3) && map.includes(2))
    }

    const isStraight = (roll) => {
        roll.sort()
        let confirm = true
        for (let i = 0; i < roll.length - 1; i++) {
            if(roll[i] !== roll[i + 1] - 1) {
                confirm = false
            }
        }
        return confirm
    }

    const isThreeOfKind = (roll) => {
        let map = [0, 0, 0, 0, 0, 0, 0]
        roll.forEach( e => map[e]++ )
        return map.includes(3)
    }

    const isTwoPairs = (roll) => {
        let map = [0, 0, 0, 0, 0, 0, 0]
        roll.forEach( e => map[e]++ )
        return (map.filter(e => e === 2).length === 2)
    }

    const isPair = (roll) => {
        let map = [0, 0, 0, 0, 0, 0, 0]
        roll.forEach( e => map[e]++ )
        return map.includes(2)
    }
    
    if(isFiveOfKind(roll)) return evalMap.A
    if(isFourOfKind(roll)) return evalMap.B
    if(isFullHouse(roll)) return evalMap.C
    if(isStraight(roll)) return evalMap.D
    if(isThreeOfKind(roll)) return evalMap.E
    if(isTwoPairs(roll)) return evalMap.F
    if(isPair(roll)) return evalMap.G
    return evalMap.I
    
}

const getEval = () => {
    Players.forEach(player => {
       player.eval = processRoll(player.roll)
    })
    getRank()
}

const processRank = (evalMap, eval) => {
    return Object.keys(evalMap).find(key => evalMap[key] === eval)
}

const getRank = () => {
    Players.forEach(player => {
        player.rank = processRank(evalMap, player.eval)
    })
    sortPlayers()
}

const sortPlayers = () => {
    Players.sort((a, b) => {
        if (a.rank < b.rank) return - 1;
        if (a.rank > b.rank) return 1;
        return 0;
    })
    console.log(Players)
    renderResult()
}

const renderResult = () => {
    const winner = document.createElement("h1")
    winner.innerText = `The WINNER is ${Players[0].name} with a ${Players[0].eval}`
    mainContainer.appendChild(winner)

    const newGameBtn = document.createElement("button")
    const newGameTxt = document.createElement("h3")
    newGameTxt.innerText = "New Game"
    newGameBtn.appendChild(newGameTxt)
    mainContainer.appendChild(newGameBtn)

    newGameBtn.onclick = () => {
        mainContainer.removeChild(winner)
        mainContainer.removeChild(newGameBtn)
        mainContainer.removeChild(resetBtn)
        Players.sort((a, b) => {
            if (a.num < b.num) return - 1;
            if (a.num > b.num) return 1;
            return 0;
        })
        Players.forEach( player => {
            player.rank = ''
            player.eval = ''
            player.roll = []
        })
        y = 0
        x = 0
        renderStart()
    }

    const resetBtn = document.createElement("button")
    const resetTxt = document.createElement("h3")
    resetTxt.innerText = "Reset"
    resetBtn.appendChild(resetTxt)
    mainContainer.appendChild(resetBtn)

    resetBtn.onclick = () => {
        mainContainer.removeChild(winner)
        mainContainer.removeChild(newGameBtn)
        mainContainer.removeChild(resetBtn)
        Players = []
        y = 0
        x = 0
        renderStart()
    }


}

// Render Prompt ______________________________________
const renderPrompt = () => {
    // Render prompt for the last time (before results)
    if (y === Players.length) {
        const promptContainer = document.createElement("div")
        const promptText = document.createElement("h2")
        promptText.innerHTML = `Evaluating Results`
        promptContainer.appendChild(promptText)

        const promptBtn = document.createElement("button")
        const promptBtnText = document.createElement("h3")
        promptBtnText.innerHTML = "READY"
        promptBtn.appendChild(promptBtnText)
        promptContainer.appendChild(promptBtn)

        mainContainer.appendChild(promptContainer)

        promptBtn.onclick = () => {
            mainContainer.removeChild(promptContainer)
            getEval()
        }
    // Render prompt for the first time (after start page)
    } else if (y === 0) {
        const nameContainer = document.createElement("div")
        const playersText = document.createElement("h2")
        playersText.innerHTML = "Registered Players"
        nameContainer.appendChild(playersText)

       for (let i = 0; i < Players.length; i++) {
            const playerName = document.createElement("h3")
            playerName.classList.add("player-names")
            playerName.innerText = `Player ${Players[i].num}: ${Players[i].name}`
            nameContainer.appendChild(playerName)
       }    

        mainContainer.appendChild(nameContainer)

        const promptContainer = document.createElement("div")
        const promptText = document.createElement("h2")
        promptText.innerHTML = `${Players[y].name}, are you ready?`
        promptContainer.appendChild(promptText)

        const promptBtn = document.createElement("button")
        const promptBtnText = document.createElement("h3")
        promptBtnText.innerHTML = "READY"
        promptBtn.appendChild(promptBtnText)
        promptContainer.appendChild(promptBtn)

        mainContainer.appendChild(promptContainer)

        promptBtn.onclick = () => {
            mainContainer.removeChild(nameContainer)
            mainContainer.removeChild(promptContainer)
            renderDashboard()
        }
    // Render prompt in between second player roll and last player roll 
    } else if (y >= 1 || y <= Players.length - 2) {
        const nameContainer = document.createElement("div")
        const playersText = document.createElement("h2")
        playersText.innerHTML = "Players who rolled"
        nameContainer.appendChild(playersText)

        let x = 0 
        while (x < y) {
            const playerName = document.createElement("h3")
            playerName.classList.add("player-names")
            playerName.innerText = `Player ${Players[x].num}: ${Players[x].name}`
            nameContainer.appendChild(playerName)
            x++
        }    

        mainContainer.appendChild(nameContainer)

        const promptContainer = document.createElement("div")
        const promptText = document.createElement("h2")
        promptText.innerHTML = `${Players[y].name}, are you ready?`
        promptContainer.appendChild(promptText)

        const promptBtn = document.createElement("button")
        const promptBtnText = document.createElement("h3")
        promptBtnText.innerHTML = "READY"
        promptBtn.appendChild(promptBtnText)
        promptContainer.appendChild(promptBtn)

        mainContainer.appendChild(promptContainer)

        promptBtn.onclick = () => {
            mainContainer.removeChild(nameContainer)
            mainContainer.removeChild(promptContainer)
            renderDashboard()
        }
    } 
}

// Generate Random Number (range: [1,6])
const randNum = () => {
    let min = 1;
    let max = 6;
    let diff = max - min;

    return Math.floor(Math.random() * diff) + min
}

// Render Game Dashboard ____________________________
const renderDashboard = () => {
    const nameContainer = document.createElement("div")

    // Display Player Name
    const playerName = document.createElement("h2")
    playerName.innerText = `Player ${Players[y].num}: ${Players[y].name}`
    nameContainer.appendChild(playerName)

    //Display 'Roll Dice' button
    const rollBtn = document.createElement("button")
    const rollBtnText = document.createElement("h3")
    rollBtnText.innerText = "Roll Dice"
    rollBtn.appendChild(rollBtnText)
    nameContainer.appendChild(rollBtn)

    mainContainer.appendChild(nameContainer)

    // Dice Roll on click
    rollBtn.onclick = () => {
        nameContainer.removeChild(rollBtn)
        let i = 0
        while (i < 5) {
            //generate 5 random numbers between 1 - 6
            Players[y].roll.push(randNum())
            i++
        }
        console.log(Players[y].roll)
        const rollResult = document.createElement("h1")
        rollResult.innerText = `YOU ROLLED: ${Players[y].roll[0]}, ${Players[y].roll[1]}, ${Players[y].roll[2]}, ${Players[y].roll[3]}, ${Players[y].roll[4]}`

        rollBtn.onclick = null;
        mainContainer.appendChild(rollResult)

        // Next Player Button
        const doneBtn = document.createElement("button")
        const doneBtnText = document.createElement("h3")
        doneBtnText.innerText = "Done!"
        doneBtn.appendChild(doneBtnText)
        mainContainer.appendChild(doneBtn)
        doneBtn.onclick = () => {
            y++
            mainContainer.removeChild(nameContainer)
            mainContainer.removeChild(rollResult)
            mainContainer.removeChild(doneBtn)
            renderPrompt()
        }
    }

    
}

// Create Player __________________________________
const createPlayer = (name, num) => {
    return {name: name, num: num, roll: [], eval: '', rank:''}
}

// Render Start Page __________________________________
const renderStart = () => {
    // "Register Players" text
    const startText = document.createElement("h2")
    startText.classList.add("init-text")
    startText.innerText = "Register Players"
    mainContainer.appendChild(startText)
   
    // Name Input
    const nameInput = document.createElement("input")
    nameInput.classList.add("name-input")
    mainContainer.appendChild(nameInput)
    document.querySelector(".name-input").placeholder = "Player Name + 'Enter'"
    nameInput.addEventListener("keypress", (event) => {
        if(event.key === "Enter") {
            event.preventDefault()
            if(event.target.value !== '') {
                addPlayer(event.target.value)
                event.target.value = null
                displayName()
            }
        }
    })

    // Initialize Players on 'Enter'
    const addPlayer = (name) => {
        let num = Players.length + 1
        Players.push(createPlayer(name, num))
    }

    // Display Players' Names on 'Enter'
    const nameContainer = document.createElement("div")
    const displayName = () => {
        while(x < Players.length) {
        const playerName = document.createElement("h2")
        playerName.classList.add("player-names")
        playerName.innerText = `Player ${Players[x].num}: ${Players[x].name}`
        nameContainer.appendChild(playerName)
        x++
        }
    }
    displayName()
    mainContainer.appendChild(nameContainer)

    // Start Button
    const startBtn = document.createElement("button")
    startBtn.classList.add("start-btn")
    const startBtnText = document.createElement("h3")
    startBtnText.innerText = "Play"
    startBtn.appendChild(startBtnText)
    mainContainer.appendChild(startBtn)
    // Start Button on click --> render next page
    startBtn.onclick = () => {
        if(Players.length < 2) {
            alert("You must register at least two players to start game.")
        } else {
        mainContainer.removeChild(startText)
        mainContainer.removeChild(nameInput)
        mainContainer.removeChild(nameContainer)
        mainContainer.removeChild(startBtn)
        console.log(Players)
        renderPrompt()
        }
    }
}

renderStart()




