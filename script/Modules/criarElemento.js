export default function criarElemento(el, atr, content) {
  const wordContainer = document.querySelector('.word');
  const element = document.createElement(el);
  element.classList.add(atr);
  element.textContent = content;
  wordContainer.appendChild(element);
}
