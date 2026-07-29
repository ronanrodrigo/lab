(() => {
  const fallbackJokes = [
    { question: "O que é, o que é? Tem dentes, mas não morde?", answer: "O pente." },
    { question: "O que é, o que é? Quanto mais se tira, maior fica?", answer: "O buraco." },
    { question: "O que é, o que é? Tem cabeça e dentes, mas não é gente nem animal?", answer: "O alho." },
    { question: "O que é, o que é? Tem folhas, mas não é árvore?", answer: "O livro." },
    { question: "O que é, o que é? Tem pescoço, mas não tem cabeça?", answer: "A garrafa." },
    { question: "O que é, o que é? Quanto mais seca, mais molhada fica?", answer: "A toalha." },
    { question: "O que é, o que é? Tem olhos, mas não vê?", answer: "A batata." },
    { question: "O que é, o que é? Cai em pé e corre deitado?", answer: "A chuva." },
    { question: "O que é, o que é? Tem coroa, mas não é rei?", answer: "O abacaxi." },
    { question: "O que é, o que é? Tem mãos, mas não bate palmas?", answer: "O relógio." },
    { question: "O que é, o que é? Pode viajar pelo mundo inteiro sem sair do canto?", answer: "O selo." },
    { question: "O que é, o que é? Tem cidades, rios e florestas, mas não tem casas, água nem árvores?", answer: "O mapa." },
    { question: "O que é, o que é? Tem uma perna e um chapéu?", answer: "O cogumelo." },
    { question: "O que é, o que é? É cheio de furos, mas consegue segurar água?", answer: "A esponja." },
    { question: "O que é, o que é? Nasce grande e morre pequeno?", answer: "A vela." },
    { question: "O que é, o que é? Enche uma sala inteira, mas não ocupa espaço?", answer: "A luz." },
    { question: "O que é, o que é? Tem quatro pernas, mas não caminha?", answer: "A mesa." },
    { question: "O que é, o que é? Quebra sem nunca cair?", answer: "A promessa." },
    { question: "O que é, o que é? Você pode pegar, mas não pode jogar?", answer: "Um resfriado." },
    { question: "O que é, o que é? Tem um olho só e não enxerga?", answer: "A agulha." },
    { question: "O que é, o que é? Corre, mas não tem pernas?", answer: "O rio." },
    { question: "O que é, o que é? Está sempre na sua frente, mas você nunca consegue ver?", answer: "O futuro." }
  ];
  const jokes = Array.isArray(window.JOKES) && window.JOKES.length ? window.JOKES : fallbackJokes;
  const question = document.querySelector("#joke-heading");
  const answer = document.querySelector("#joke-answer");
  const revealButton = document.querySelector("#reveal-button");
  const newJokeButton = document.querySelector("#new-joke-button");
  let currentIndex = -1;

  const chooseIndex = () => {
    if (jokes.length < 2) return 0;
    let nextIndex = currentIndex;
    while (nextIndex === currentIndex) nextIndex = Math.floor(Math.random() * jokes.length);
    return nextIndex;
  };

  const showJoke = () => {
    currentIndex = chooseIndex();
    const joke = jokes[currentIndex];
    question.textContent = joke.question;
    answer.textContent = joke.answer;
    answer.hidden = true;
    revealButton.disabled = false;
    revealButton.textContent = "Mostrar continuação";
  };

  revealButton.addEventListener("click", () => {
    answer.hidden = false;
    revealButton.disabled = true;
    revealButton.textContent = "Continuação mostrada";
  });

  newJokeButton.addEventListener("click", showJoke);
  showJoke();
})();
