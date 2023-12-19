const wordContainer = document.querySelector('.word');
const guessInputContainer = document.querySelector('.guess__input--container');
const inputs = document.querySelectorAll('.guess__input');
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

function criarElemento(el, atr, content) {
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

let mistakes = [];
let tent = 10;
function verificarTentativa(data) {
  mistakes = [];
  tent = 10;

  guessInputContainer.addEventListener('input', (event) => {
    const input = event.target;
    const value = input.value;

    const index = Array.from(inputs).indexOf(input);

    if (value === data[index]) {
      input.disabled = true;

      const nextIndex = index + 1;
      if (nextIndex < inputs.length) {
        inputs[nextIndex].focus();
      }
    } else if (value !== '') {
      tent--;
      tries.textContent = tent;
      mistakes.push(value);
      let err = mistakes.join(', ');
      mistakesP.textContent = `Erros: ${err}`;
    }
  });
}

function resetWord() {
  inputs.forEach((input) => (input.value = ''));
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
  resetWord();
  while (wordContainer.firstChild && guessInputContainer.firstChild) {
    guessInputContainer.removeChild(guessInputContainer.firstChild);
    wordContainer.removeChild(wordContainer.firstChild);
  }
  const novaPalavra = await wordsFetch();
  separarLetras(novaPalavra).forEach((letra) => {
    criarElemento('span', 'word__letter', letra);
    criarInput();
  });
  verificarTentativa(novaPalavra);
}
randomWord();

randomBtn.addEventListener('click', randomWord);
resetBtn.addEventListener('click', resetWord);
