# PlusleWord

**PlusleWord** is a Pokémon-themed word puzzle game inspired by the *PlusWord* and *Wordle* formats.

Players are presented with five clues, each having a 5-letter Pokémon-related answer. All five answers share a connection: they reveal the hidden **PlusleWord**, which is also a 5-letter Pokémon name.

---

## 🚀 Getting Started

1. Clone the repository or download the files:  
   `git clone https://github.com/alexmendola/PlusleWord.git`
2. Open `index.html` in your web browser.
3. Play!

---

## 🎮 How to Play

Five clues will appear, each with a 5-letter answer.

Fill in the boxes for each clue.

Letters are automatically coloured based on the hidden PlusleWord. The game uses colour-coded hints:

- 🟩 **Green**: Correct letter in the correct position  
- 🟨 **Yellow**: Correct letter, wrong position  
- ⬜ **White**: Letter not in the PlusleWord

You win when you figure out each of the crossword clues and the hidden PlusleWord.

---

## 🧠 More Specific Letter Matching Logic

Letter colouring follows strict rules to reflect true matches and avoid duplicates:

### Green Pass

- For each clue letter, if it matches the PlusleWord letter at the same index, it's marked green.

### Yellow Pass

- Remaining unmatched letters in the clue are then checked against unmatched letters in the PlusleWord.
- The first valid occurrence is marked yellow.
- If a letter appears twice in the clue but once in the PlusleWord, only the first match will be coloured.

#### Example

- If the PlusleWord is **AIPOM** and the clue answer is **HOOPA**:  
  Only one **O** exists in AIPOM, so the first **O** in HOOPA is **yellow**, the second is **white**.

- If the PlusleWord is **ROTOM** and the clue answer is **AIPOM**:  
  Only one **O** exists in AIPOM. Since ROTOM has two Os, but the **second O** is in the correct position, it is **green**, and the first is **white**.

---

## 🗂 Project Structure

```text
project-root/
├── index.html         # Main game layout
├── style.css          # Game styling (colour logic, layout, UX)
├── script.js          # Game logic and rendering
├── data/
│   └── words.json     # Word pool of Pokémon-related 5-letter words with clues
```

---

## 📄 `words.json` Format

All Pokémon clues and answers live in `data/words.json`, which looks like this:

```json
{
  "wordPool": [
    {
      "clue": "Snake Pokémon that spells backward",
      "answer": "EKANS"
    },
    {
      "clue": "Cobra Pokémon that spells backward",
      "answer": "ARBOK"
    }
    // More entries...
  ]
}
```

Each object includes:

- `clue`: a riddle or hint  
- `answer`: the 5-letter Pokémon name

You can add more entries freely to expand the puzzle pool.

---

## 🧑‍💻 Development Notes

- Matching logic lives in `script.js`, specifically inside the `renderClues()` function.
- Letter colouring uses a two-pass system (green, then yellow), with a `used` array to prevent false double-counts.
- Styling is in `style.css` and supports colour feedback visually.
- Puzzles are fully client-side — no backend needed.

---

## 🧑‍🎨 Credits

- Game by Alexander Mendola  
- Pokémon © Nintendo / Game Freak / The Pokémon Company  
- Puzzle concept inspired by *Wordle* and *The Telegraph’s PlusWord*

---

## 🪪 License

This is a fan-made, non-commercial project. All trademarks and Pokémon character names belong to their respective owners.  
Code is open-source and provided under the MIT License. See the [LICENSE](LICENSE) file for details.
