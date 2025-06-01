let plusleword = ""; // The correct PlusleWord to guess
let clues = []; // Array of clue objects with { clue, answer }

// Load the data from JSON and initialise the game
fetch("data/words.json")
  .then((res) => res.json())
  .then((data) => {
    // Select 6 unique words from the word pool
    const selectedWords = getRandomItems(data.wordPool, 6);

    // First 5 are used for clues
    clues = selectedWords.slice(0, 5);

    // Last one is the PlusleWord
    plusleword = selectedWords[5].answer.toUpperCase();

    // Render the clues and input fields
    renderClues();
    renderPlusleWord();

    // Enable auto-tab and backspace navigation
    setupAutoTab();
  });

// Utility: Get N unique random items from an array
function getRandomItems(arr, n) {
  const result = [];
  const usedIndices = new Set();

  while (result.length < n && result.length < arr.length) {
    const idx = Math.floor(Math.random() * arr.length);
    if (!usedIndices.has(idx)) {
      usedIndices.add(idx);
      result.push(arr[idx]);
    }
  }

  return result;
}

// Render the 5 crossword clues with pre-coloured input boxes
function renderClues() {
  const container = document.getElementById("clues-container");
  container.innerHTML = "";

  clues.forEach((item, index) => {
    const clueEl = document.createElement("div");

    const clueLabel = document.createElement("h2");
    clueLabel.textContent = `${index + 1}. ${item.clue}`;
    clueEl.appendChild(clueLabel);

    const inputGroup = document.createElement("div");
    inputGroup.className = "word-input";
    inputGroup.dataset.type = "clue";

    const clueAnswer = item.answer.toUpperCase().split("");
    const target = plusleword.split("");
    const colours = Array(5).fill("white");
    const used = Array(5).fill(false);

    // First pass for greens
    for (let i = 0; i < 5; i++) {
      if (clueAnswer[i] === target[i]) {
        colours[i] = "green";
        used[i] = true;
      }
    }

    // Second pass for yellows
    for (let i = 0; i < 5; i++) {
      if (colours[i] === "green") continue;
      for (let j = 0; j < 5; j++) {
        if (!used[j] && clueAnswer[i] === target[j]) {
          colours[i] = "yellow";
          used[j] = true;
          break;
        }
      }
    }

    // Render inputs with appropriate colouring
    for (let i = 0; i < 5; i++) {
      const input = document.createElement("input");
      input.maxLength = 1;
      input.classList.add(colours[i]);
      inputGroup.appendChild(input);
    }

    clueEl.appendChild(inputGroup);
    container.appendChild(clueEl);
  });
}

// Render the input row for the PlusleWord guess
function renderPlusleWord() {
  const container = document.getElementById("plusleword-container");
  container.innerHTML = "";

  const label = document.createElement("h2");
  label.textContent = "PlusleWord:";
  container.appendChild(label);

  const inputGroup = document.createElement("div");
  inputGroup.className = "word-input";
  inputGroup.dataset.type = "plusle";

  for (let i = 0; i < 5; i++) {
    const input = document.createElement("input");
    input.maxLength = 1;
    inputGroup.appendChild(input);
  }

  container.appendChild(inputGroup);
}

// Setup smooth typing (auto-tab) and backspace navigation
function setupAutoTab() {
  const allInputs = document.querySelectorAll("input");

  allInputs.forEach((input, idx) => {
    input.addEventListener("input", () => {
      const value = input.value;

      // Move to next input automatically
      if (value.length === 1 && idx < allInputs.length - 1) {
        allInputs[idx + 1].focus();
      }

      // If all inputs are filled, check the answers
      const allFilled = Array.from(allInputs).every(
        (i) => i.value.length === 1
      );
      if (allFilled) {
        checkAnswers();
      }
    });

    input.addEventListener("keydown", (e) => {
      // If backspace on empty field, move to the previous input
      if (e.key === "Backspace" && input.value === "" && idx > 0) {
        e.preventDefault();
        allInputs[idx - 1].focus();
      }
    });
  });
}

// Check if all clue answers and PlusleWord guess are correct
function checkAnswers() {
  const inputGroups = document.querySelectorAll(
    ".word-input[data-type='clue']"
  );
  let allCorrect = true;

  // Check each clue line
  inputGroups.forEach((group, clueIndex) => {
    const expectedAnswer = clues[clueIndex].answer.toUpperCase();
    const inputs = group.querySelectorAll("input");

    for (let i = 0; i < 5; i++) {
      const userInput = inputs[i].value.toUpperCase();
      if (userInput !== expectedAnswer[i]) {
        allCorrect = false;
        break;
      }
    }
  });

  // Check PlusleWord
  const plusleInputs = document
    .querySelector("#plusleword-container")
    .querySelectorAll("input");
  let plusleGuess = "";
  plusleInputs.forEach((input) => (plusleGuess += input.value.toUpperCase()));
  const correctPlusle = plusleGuess === plusleword;

  // Show message to user
  let messageEl = document.getElementById("message");
  if (!messageEl) {
    messageEl = document.createElement("p");
    messageEl.id = "message";
    messageEl.style.marginTop = "1rem";
    messageEl.style.fontWeight = "bold";
    document.body.appendChild(messageEl);
  }

  messageEl.textContent =
    allCorrect && correctPlusle
      ? "✅ All correct! Well done!"
      : "❌ Some answers are incorrect. Try again!";
}
