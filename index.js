const mainContainer = document.querySelector(".dpcontainer")
let Players = []
// It is player y's turn to roll the dice
let y = 0;

const renderResult = () => {
    console.log(0)
    // For each player
    // Display Name
    // Roll results
    // Evaluation of Result
    //getResult()

    // New Game (same players)
    // Reset Settings (return to default settings)
}
// Render Prompt ______________________________________
const renderPrompt = () => {
    // first time rendering prompt
    if (y === Players.length) {
        const promptContainer = document.createElement("div")
        const promptText = document.createElement("h2")
        promptText.innerHTML = `All players have rolled the dice, the results are IN.`
        promptContainer.appendChild(promptText)

        const promptBtn = document.createElement("button")
        const promptBtnText = document.createElement("h3")
        promptBtnText.innerHTML = "SEE RESULT"
        promptBtn.appendChild(promptBtnText)
        promptContainer.appendChild(promptBtn)

        mainContainer.appendChild(promptContainer)

        promptBtn.onclick = () => {
            mainContainer.removeChild(promptContainer)
            renderResult()
        }
    // second to second last time rendering prompt page 
    } else if (y >= 1 || y <= Players.length - 2) {
        const nameContainer = document.createElement("div")
        const playersText = document.createElement("h2")
        playersText.innerHTML = "Players who rolled:"
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
        promptText.innerHTML = `Player ${Players[y].num}: ${Players[y].name}, are you ready?`
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

    // last time rendering prompt page
    } else if (y === 0) {
        const nameContainer = document.createElement("div")
        const playersText = document.createElement("h2")
        playersText.innerHTML = "Registered Players:"
        nameContainer.appendChild(playersText)

       for (let x = 0; x < Players.length; x++) {
            const playerName = document.createElement("h3")
            playerName.classList.add("player-names")
            playerName.innerText = `Player ${Players[x].num}: ${Players[x].name}`
            nameContainer.appendChild(playerName)
       }    

        mainContainer.appendChild(nameContainer)

        const promptContainer = document.createElement("div")
        const promptText = document.createElement("h2")
        promptText.innerHTML = `Player ${Players[y].num}: ${Players[y].name}, are you ready?`
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
        let i = 0
        while (i < 5) {
            //generate random number between 1 - 6
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
    return {name: name, num: num, roll: [], eval:'', score: 0}
}

// Render Start Page __________________________________
const renderStart = () => {
   
    const initText = document.createElement("h3")
    initText.classList.add("init-text")
    initText.innerText = "Register Players"
    mainContainer.appendChild(initText)
   
    // Name Input
    const nameInput = document.createElement("input")
    nameInput.classList.add("name-input")
    mainContainer.appendChild(nameInput)
    document.querySelector(".name-input").placeholder = "Player Name + 'Enter'"
    nameInput.addEventListener("keypress", (event) => {
        if(event.key === "Enter") {
            event.preventDefault()
            console.log(event.target.value)
            addPlayer(event.target.value)
            event.target.value = null
            displayName()
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
        let x = Players.length - 1
        const playerName = document.createElement("h4")
        playerName.classList.add("player-names")
        playerName.innerText = `Player ${Players[x].num}: ${Players[x].name}`
        nameContainer.appendChild(playerName)
    }
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
        mainContainer.removeChild(initText)
        mainContainer.removeChild(nameInput)
        mainContainer.removeChild(nameContainer)
        mainContainer.removeChild(startBtn)
        renderPrompt()
        }
    }
}

renderStart()


const getResult = () => {
    // Evaluation Logic
}

