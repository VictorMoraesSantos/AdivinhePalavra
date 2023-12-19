const wordContainer = document.querySelector('.word');
const guessInputContainer = document.querySelector('.guess__input--container');
const tries = document.querySelector('#tentativa');
const mistakesP = document.querySelector('.mistakes p');
const resetBtn = document.querySelector('#button__reset');
const randomBtn = document.querySelector('#button__random');

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

let mistakes;
let tent;
function verificarTentativa(data) {
  inputs = document.querySelectorAll('.guess__input');
  mistakes = [];
  tent = 10;

  inputs.forEach((input, i) => {
    input.addEventListener('input', () => {
      const value = input.value;

      if (value === [...data][i]) {
        input.disabled = true;

        const nextIndex = i + 1;
        if (nextIndex < inputs.length) {
          inputs[nextIndex].focus();
        }
      } else if (value !== '') {
        --tent;
        tries.textContent = tent;
        mistakes.push(value);
        let err = mistakes.join(', ');
        mistakesP.textContent = `Erros: ${err}`;
      } else {
        return null;
      }
    });
  });
}

let inputs
function resetWord() {
  mistakes = [];
  mistakesP.textContent = 'Erros:';
  tent = 10;
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

randomBtn.addEventListener('click', randomWord);
resetBtn.addEventListener('click', resetWord);
