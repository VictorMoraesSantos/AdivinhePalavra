import wordsFetch from './Modules/fetch.js';
import separarLetras from './Modules/separarLetras.js';
import criarElemento from './Modules/criarElemento.js';
import verificarTentativa from './Modules/verificarTentativa.js';
import criarInput from './Modules/criarInput.js';

const palavra = await wordsFetch();
separarLetras(palavra).forEach((letra) => {
  criarElemento('span', 'word__letter', letra);
  criarInput();
});
verificarTentativa(palavra);
