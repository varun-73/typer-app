const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
  'sigh','tense','airplane','ball','pies','juice','warlike','bad','flashcard','formation','Frequently','vocabulary','mastering','Chemistry','Resources','Maharashtra','Commerce',
  'north','dependent','steer', 'silver','highfalutin','superficial','quince','eight','feeble','understand','xanthenes','Cookies','Dictionary','opportunity','remarkably',
  'admit','drag','Between','Radical','Sixteen','Webcast','strengthen','communication','learning','effectively','remember','squizzing','bemuzzled','buckjumps','scuzzball',
  'loving','welcome','javascript','python','hakerrank','introduction','neetcode','discord','script','readme','search','embezzled','unpuzzled','jumboizes','zigzagged','maximized',
  'quickbeam',Sure,
apple, chair, table, light, house, green, flower, laptop, window, smile, river, dance, rabbit, garden, sunset, pencil, monkey, coffee, cloud, pillow, kitten, camera,
  forest, soccer, bookshelf, orange, school, castle, guitar, ocean, jacket, cheese, cookie, planet, dragon, keyboard, cereal, rocket, circus, dragon, turtle, basket, 
  jungle, blanket, trumpet, dolphin, bridge, pirate, shadow, monkey, basket, puppet, hammer, bottle, artist, whistle, temple, compass, donkey, engine, scarf, violin,
  ladder, robot, castle, donkey, island, galaxy, wizard, rocket, whisper, basket, pirate, kitten, tunnel, anchor, lantern, mirror, wallet, galaxy, coconut, ladder, dragon,
  castle, whisper, kitten, garden, puzzle, dragon, cherry, forest, elephant, flower, ticket, candle, silver, mouse, piano, monkey, island, garden, puzzle, whisper, planet,
  pirate, rocket, galaxy, castle, monkey, basket, elephant, kitten, robot, dragon, puzzle, kitten, planet, forest, garden, rocket, castle, island, basket, monkey, planet,
  whisper, kitten, galaxy, robot, elephant, puzzle, garden, monkey, basket, pirate, planet, castle, kitten, whisper, forest, island, rocket, galaxy, elephant, robot, monkey,
  basket, kitten, planet, whisper, garden, castle, pirate, island, forest, elephant, rocket, galaxy, kitten, robot, monkey, basket, whisper, planet, pirate, garden, castle,
  island, kitten, forest, elephant, rocket, monkey, basket, galaxy, robot, whisper, planet, pirate, garden, castle, kitten, island, elephant, monkey, basket, forest, robot,
  galaxy, whisper, planet, rocket, pirate, castle, kitten, garden, island, elephant, monkey, basket, forest, robot, galaxy, whisper, planet, rocket, pirate, castle, kitten,
  garden, island, elephant, monkey, basket, forest, robot, galaxy, whisper, planet, rocket, pirate, castle, kitten, garden, island, elephant, monkey, basket, forest, robot, 
  galaxy, whisper, planet, rocket, pirate, castle, kitten, garden, island, elephant, monkey, basket, forest, robot, galaxy, whisper, planet, rocket, pirate, castle, kitten,
  garden, island, elephant, monkey, basket, forest, robot, galaxy, whisper, planet, rocket, pirate, castle, kitten, garden, island, elephant, monkey, basket, forest, robot,
  galaxy, whisper, planet, rocket, pirate, castle, kitten, garden, island, elephant, monkey, basket, forest, robot, galaxy, whisper, planet, rocket, pirate, castle, kitten,
  garden, island, elephant, monkey, basket, forest, robot, galaxy, whisper, planet, rocket, pirate, castle, kitten, garden, island, elephant, monkey, basket, forest, robot,
  galaxy, whisper, planet, rocket, pirate, castle, kitten, garden, island, elephant, monkey, basket, forest, robot, galaxy, whisper, planet, rocket, pirate, castle, kitten
  , garden, island, elephant, monkey, basket, forest, robot, galaxy, whisper, planet, rocket, pirate, castle, kitten, garden, island, elephant, monkey, basket, forest, robot,
  galaxy, whisper, planet, rocket, pirate, castle, kitten, garden, island, elephant, monkey, basket, forest, robot, galaxy, whisper, planet, rocket, pirate, castle, kitten,
  garden, island, elephant, monkey, basket, forest, robot, galaxy, whisper, planet, rocket, pirate, castle, kitten, garden, island, elephant, monkey, basket, forest, robot, 
  galaxy, whisper, planet, rocket, pirate, castle, kitten, garden, island, elephant, monkey, basket, forest, robot, galaxy, whisper, planet, rocket, pirate, castle, kitten,
  garden, island, elephant, monkey, basket, forest, robot, galaxy, whisper, planet, rocket, pirate, castle, kitten, garden, island, elephant, monkey, basket, forest, robot,
  galaxy, whisper, planet, rocket, pirate, castle, kitten, garden, island, elephant, monkey, basket, forest, robot, galaxy, whisper, planet, rocket, pirate, castle, kitten,
];

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 60;

// Set difficulty to value in ls or medium
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// Set difficulty select value
difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// Focus on text on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);
    // end game
    gameOver();
  }
}

// Game over, show end screen
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = 'flex';
}

addWordToDOM();

// Event listeners

// Typing
text.addEventListener('input', e => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // Clear
    e.target.value = '';

    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 4;
    }

    updateTime();
  }
});

// Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});
