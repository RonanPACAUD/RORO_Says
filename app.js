const app = {
  
  init: function () {
    console.log("Init game");

    app.gameSequence = [];
    app.playerSequence = [];

    app.defineButton();
    app.initSequence();

    app.instruction.textContent = 'Click on ready to start a new game'
  },

  defineButton: function () {
    app.redButton = document.querySelector(".red");
    app.greenButton = document.querySelector(".green");
    app.blueButton = document.querySelector(".blue");
    app.yellowButton = document.querySelector(".yellow");

    app.listOfGameButton = [
      app.redButton,
      app.greenButton,
      app.blueButton,
      app.yellowButton,
    ];

    app.devilSmiley = document.querySelector('.devil');
    app.happySmiley = document.querySelector('.happy');
    app.sunglassesSmiley = document.querySelector('.sunglasses');

    app.instruction = document.querySelector('.instruction-container');

    app.playButton = document.querySelector(".play");
    app.playButton.addEventListener("click", app.game);
  },

  generateRandomNumber: function () {
    const randomNb = Math.round(Math.random() * 3);
    return randomNb;
  },

  initSequence: function () {
    for (i = 0; i < 3; i++) {
      app.gameSequence.push(app.generateRandomNumber());
    }
  },

  readSequence: async function () {

    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
    
    for await (const color of app.gameSequence) {
      await sleep(1000);
      if (color === 0) {
        app.redButton.style.opacity = 1;
        await sleep(1000);
        app.redButton.style.opacity = 0.5;
      } else if (color === 1) {
        app.greenButton.style.opacity = 1;
        await sleep(1000);
        app.greenButton.style.opacity = 0.5;
      } else if (color === 2) {
        app.blueButton.style.opacity = 1;
        await sleep(1000);
        app.blueButton.style.opacity = 0.5;
      } else {
        app.yellowButton.style.opacity = 1;
        await sleep(1000);
        app.yellowButton.style.opacity = 0.5;
      }

    }
    console.log('Prout de fin')
  },

  writePlayerSequence: function (event) {
    const btn = event.target;

    btn.style.opacity = 1;
    setTimeout(() => {
      btn.style.opacity = 0.5;
    }, 500);
    app.playerSequence.push(Number(btn.getAttribute("value")));

    console.log(app.playerSequence);
    console.log(app.gameSequence);

    if (!app.compareResult()) {
      app.errorStatus();
    } else if (app.compareResult() && app.gameSequence.length === app.playerSequence.length) {
      app.succesStatus();
    }

  },

  removeListener: function () {
    app.listOfGameButton.forEach((btn) => {
      btn.removeEventListener('click', app.writePlayerSequence);
    });
  },

  compareResult: function () {
    for (i = 0; i < app.playerSequence.length; i++) {
      if (app.gameSequence[i] !== app.playerSequence[i]) {
        return false;
      }
    }
    return true;
  },

  errorStatus: async function () {
    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

    app.instruction.textContent = 'FAIL, try again'

    app.happySmiley.classList.add('hidden');
    app.devilSmiley.classList.remove('hidden');

    document.body.classList.remove('blue-background')
    document.body.classList.add('red-background-first');
    await sleep(500)
    document.body.classList.remove('red-background-first')
    document.body.classList.add('red-background-second');
    await sleep(500)
    document.body.classList.remove('red-background-second')
    document.body.classList.add('red-background-first');
    await sleep(500)
    document.body.classList.remove('red-background-first')
    document.body.classList.add('red-background-second');
    await sleep(500)
    document.body.classList.remove('red-background-second')
    document.body.classList.add('red-background-first');
    await sleep(500)

    app.happySmiley.classList.remove('hidden');
    app.devilSmiley.classList.add('hidden');

    document.body.classList.remove('red-background-first')
    document.body.classList.add('blue-background');

    app.init();
  },

  succesStatus: async function () {
    app.removeListener();

    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

    app.instruction.textContent = 'GOOD, we add color now !'

    app.happySmiley.classList.add('hidden');
    app.sunglassesSmiley.classList.remove('hidden');

    document.body.classList.remove('blue-background')
    document.body.classList.add('green-background');

    await sleep(2000);

    document.body.classList.remove('green-background');
    document.body.classList.add('blue-background')

    app.happySmiley.classList.remove('hidden');
    app.sunglassesSmiley.classList.add('hidden');

    app.playerSequence = [];
    app.gameSequence.push(app.generateRandomNumber());

    console.log(app.playerSequence);

    app.game();
  },

  game: async function () {
    app.playButton.removeEventListener("click", app.game);

    app.instruction.textContent = 'Be careful, memorize the sequence'

    console.log("Joue la gameSequence");
    await app.readSequence();

    app.instruction.textContent = 'What is the sequence ?'

    console.log("Ecoute le sequence du joueur");
    for (btn of app.listOfGameButton) {
      btn.addEventListener('click', app.writePlayerSequence)
    };

  },

    
};

document.addEventListener("DOMContentLoaded", app.init());
