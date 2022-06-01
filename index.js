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

// Initialize Player __________________________________
const createPlayer = (name) => {
    return {name: name, roll: [], result:''}
}

// Render Start Page __________________________________
const renderStart = () => {
    // Initialize Players --> must enter name
    Players.push(createPlayer())
    // Start Button
    renderDashboard()
}

renderStart()


const getResult = () => {
    // Evaluation Logic
}