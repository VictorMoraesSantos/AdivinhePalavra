export default function verificarTentativa(data) {
  const palavra = [...data];
  const input = document.querySelectorAll('.guess__input');
  const wordContainer = document.querySelector('.word__letter');
  const mistakes = document.querySelector('.mistakes');

  console.log(palavra);
  input.forEach((input, i) =>
    input.addEventListener('input', () => {
      const value = input.value;
      if (value === palavra[i]) {
        input.disable = true

        const nextIndex = i + 1;
        if (nextIndex < input.length) {
          input[nextIndex].focus();
        }
      }
    })
  );
}
