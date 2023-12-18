export default function criarInput() {
  const guessInputContainer = document.querySelector(
    '.guess__input--container'
  );

  const input = document.createElement('input');
  input.classList.add('guess__input');
  input.setAttribute('type', 'text');
  input.setAttribute('maxlength', '1');
  guessInputContainer.appendChild(input);
}
