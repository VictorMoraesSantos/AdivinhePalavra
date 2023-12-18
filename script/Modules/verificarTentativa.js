export default function verificarTentativa(data) {
  const palavra = [...data];
  const inputs = document.querySelectorAll('.guess__input');
  const tries = document.querySelector('#tentativa');
  const mistakes = document.querySelector('.mistakes');

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
      } else {
        null;
      }
    })
  );
}
