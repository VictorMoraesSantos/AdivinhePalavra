const wordContainer = document.querySelector('.word');
const guessInputContainer = document.querySelector('.guess__input--container');
const tries = document.querySelector('#tentativa');
const mistakesP = document.querySelector('.mistakes p');
const resetBtn = document.querySelector('#button__reset');
const randomBtn = document.querySelector('#button__random');
const overlay = document.querySelector('.overlay');
const modalBtns = document.querySelectorAll('.modal__button');
const winModal = document.querySelector('.winModal');
const loseModal = document.querySelector('.loseModal');

let mistakes;
let tent;
const tentativas = 20;

async function wordsFetch() {
  try {
    const url = 'https://api.dicionario-aberto.net/random';
    const response = await fetch(url);
    const data = await response.json();
    return data.word;
  } catch (err) {
    throw new Error(err);
  }
}

function separarLetras([...data]) {
  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
  }
  return data;
}

function criarLetrasDisplay(el, atr, content) {
  const element = document.createElement(el);
  element.classList.add(atr);
  element.textContent = content;
  wordContainer.appendChild(element);
}

function criarInput() {
  const input = document.createElement('input');
  input.classList.add('guess__input');
  input.setAttribute('type', 'text');
  input.setAttribute('maxlength', '1');
  guessInputContainer.appendChild(input);
}

function verificarTentativa(data) {
  inputs = document.querySelectorAll('.guess__input');
  mistakes = [];
  tent = tentativas;

  inputs.forEach((input, i) => {
    input.addEventListener('input', () => {
      const value = input.value;

      if (value === [...data][i]) {
        input.disabled = true;
        const nextIndex = i + 1;
        data[i + 1] ? inputs[nextIndex].focus() : displayModal('.winModal');
      } else if (value !== '' && tent > 1) {
        input.value = '';
        tent--;
        tries.textContent = tent;
        mistakes.push(value);
        let err = mistakes.join(', ');
        mistakesP.textContent = `Erros: ${err}`;
      } else {
        displayModal('.loseModal');
        tent = 0;
      }
    });
  });
}

let inputs;
function resetWord() {
  mistakes = [];
  mistakesP.textContent = 'Erros:';
  tent = tentativas;
  tries.textContent = tent;
  inputs.forEach((input) => {
    input.disabled = false;
    input.value = '';
  });
}

async function randomWord() {
  while (wordContainer.firstChild && guessInputContainer.firstChild) {
    guessInputContainer.removeChild(guessInputContainer.firstChild);
    wordContainer.removeChild(wordContainer.firstChild);
  }
  const palavra = await wordsFetch();
  separarLetras(palavra).forEach((letra) => {
    criarLetrasDisplay('span', 'word__letter', letra);
    criarInput();
  });
  verificarTentativa(palavra);
  resetWord();
}
randomWord();

function displayModal(el) {
  const modal = document.querySelector(el);
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function removeModal() {
  overlay.classList.add('hidden');
  winModal.classList.contains('hidden')
    ? loseModal.classList.add('hidden')
    : winModal.classList.add('hidden');
  randomWord();
}

modalBtns.forEach((btn) => btn.addEventListener('click', removeModal));
overlay.addEventListener('click', removeModal);
randomBtn.addEventListener('click', randomWord);
resetBtn.addEventListener('click', resetWord);
