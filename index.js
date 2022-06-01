const mainContainer = document.querySelector(".dpcontainer")
let Players = []

const renderResult = () => {
    // For each player
    // Display Name
    // Roll results
    // Evaluation of Result
    getResult()

    // New Game (same players)
    // Reset Settings (return to default settings)
}
// Render Prompt ______________________________________
const renderPrompt = () => {
    // Display Prompt
    // If more players left
    renderDashboard()
    // If all players rolled 
    renderResult()
}

// Render Game Dashboard ____________________________
const renderDashboard = () => {
    // Display Player Name
    // Dice Roll --> Roll Button and Store Data
    // Next Player's --> next button after dice roll
    renderPrompt()
}

// Create Player __________________________________
const createPlayer = (name, num) => {
    return {name: name, num: num, roll: [], eval:'', score: 0}
}

// Render Start Page __________________________________
const renderStart = () => {
   
    const initText = document.createElement("h3")
    initText.classList.add("init-text")
    initText.innerText = "Initialize Players"
    mainContainer.appendChild(initText)

    const nameInput = document.createElement("input")
    nameInput.classList.add("name-input")
    mainContainer.appendChild(nameInput)
    document.querySelector(".name-input").placeholder = "Player name..."
    nameInput.addEventListener("keypress", (event) => {
        if(event.key === "Enter") {
            event.preventDefault()
            console.log(event.target.value)
            addPlayer(event.target.value)
            event.target.value = null
            displayName()
        }
    })

    // Initialize Players
    const addPlayer = (name) => {
        let num = Players.length + 1
        Players.push(createPlayer(name, num))
    }

    // Display Players' Names
    const nameContainer = document.createElement("div")
    const displayName = () => {
        let x = Players.length - 1
        const playerName = document.createElement("h4")
        playerName.classList.add("player-name")
        playerName.innerText = `Player ${Players[x].num}: ${Players[x].name}`
        nameContainer.appendChild(playerName)
    }
    mainContainer.appendChild(nameContainer)




    
    // Start Button
    renderDashboard()
}

renderStart()


const getResult = () => {
    // Evaluation Logic
}

