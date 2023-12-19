export default function verificarTentativa(data) {
  const palavra = [...data];
  const inputs = document.querySelectorAll('.guess__input');
  const tries = document.querySelector('#tentativa');
  const mistakesP = document.querySelector('.mistakes p');
  const resetBtn = document.querySelector('#button__reset');
  const randomBtn = document.querySelector('#button__random');

  let mistakes = [];
  let tent = 10;

  console.log(palavra);
  inputs.forEach((input, i) =>
    input.addEventListener('input', () => {
      const value = input.value;

      if (value === palavra[i]) {
        input.disabled = true;

        const nextIndex = i + 1;
        if (nextIndex < inputs.length) {
          inputs[nextIndex].focus();
        }
      } else if (value != '') {
        tent--;
        tries.textContent = tent;
        mistakes.push(value);
        let err = mistakes.join(', ');
        mistakesP.textContent = `Erros: ${err}`;
      } else {
        null;
      }
    })
  );

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

  function randomWord() {
    return null;
  }

  randomBtn.addEventListener('click', randomWord);
  resetBtn.addEventListener('click', resetWord);
}
