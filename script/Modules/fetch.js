export default async function wordsFetch() {
  try {
    const url = 'https://api.dicionario-aberto.net/random';
    const response = await fetch(url);
    const data = await response.json();
    return data.word;
  } catch (err) {
    throw new Error(err);
  }
}