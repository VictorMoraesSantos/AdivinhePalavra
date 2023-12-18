import wordsFetch from './Modules/fetch.js';
import separarLetras from './Modules/separarLetras.js';
import criarElemento from './Modules/criarElemento.js';
import verificarTentativa from './Modules/verificarTentativa.js';
import criarInput from './Modules/criarInput.js';

const letras = await wordsFetch();
separarLetras(letras).forEach((letra) => {
  criarElemento('span', 'word__letter', letra);
  criarInput();
});
verificarTentativa(letras);
