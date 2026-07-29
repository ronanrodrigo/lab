const flavorBases = [
  { name: "Citrus", tag: "cítrico", profile: "limão siciliano, grapefruit e um toque de hortelã" },
  { name: "Mango", tag: "tropical", profile: "manga madura, maracujá e acidez vibrante" },
  { name: "Berry", tag: "frutas vermelhas", profile: "amora, mirtilo e framboesa com final doce" },
  { name: "Apple", tag: "frutado", profile: "maçã verde, carambola e frescor crocante" },
  { name: "Peach", tag: "suave", profile: "pêssego branco, chá gelado e baunilha" },
  { name: "Melon", tag: "refrescante", profile: "melão cantalupo, pepino e final gelado" },
  { name: "Cherry", tag: "intenso", profile: "cereja ácida, hibisco e especiarias leves" },
  { name: "Coco", tag: "cremoso", profile: "água de coco, abacaxi e baunilha tostada" },
  { name: "Grape", tag: "uva", profile: "uva roxa, lichia e uma nota floral" },
  { name: "Pineapple", tag: "tropical", profile: "abacaxi grelhado, gengibre e hortelã" }
];

const energyWords = ["Rush", "Voltage", "Pulse", "Nitro", "Charge", "Surge", "Impact", "Orbit", "Turbo", "Blitz", "Drive", "Core"];
const accents = ["Neon", "Ultra", "Midnight", "Wild", "Hyper", "Electric"];
const profiles = [
  "com ataque cítrico e final que desperta",
  "com doçura equilibrada e textura refrescante",
  "com camadas tropicais e personalidade intensa",
  "com frescor gelado e uma assinatura inesperada",
  "com um lado frutado vibrante e fácil de lembrar"
];

// 10 bases x 6 acentos = 60 possibilidades locais para manter o fluxo independente.
const generatedFlavors = flavorBases.flatMap((fruit, fruitIndex) => accents.map((accent, accentIndex) => ({
  name: `${accent} ${fruit.name} ${energyWords[(fruitIndex + accentIndex) % energyWords.length]}`,
  description: `Uma mistura de ${fruit.profile}, ${profiles[(fruitIndex + accentIndex) % profiles.length]}.`,
  tags: [fruit.tag, accent.toLowerCase(), "energy"]
})));

const resultTitle = document.querySelector("#result-title");
const resultDescription = document.querySelector("#result-description");
const flavorTags = document.querySelector("#flavor-tags");
const feedback = document.querySelector("#feedback");
const generateButton = document.querySelector("#generate-button");
const copyButton = document.querySelector("#copy-button");
let currentFlavor;
let lastIndex = -1;

function pickFlavor() {
  let index;
  do {
    index = Math.floor(Math.random() * generatedFlavors.length);
  } while (generatedFlavors.length > 1 && index === lastIndex);
  lastIndex = index;
  return generatedFlavors[index];
}

function renderFlavor(flavor) {
  currentFlavor = flavor;
  resultTitle.textContent = flavor.name;
  resultDescription.textContent = flavor.description;
  flavorTags.replaceChildren(...flavor.tags.map((tag) => {
    const element = document.createElement("span");
    element.textContent = tag;
    return element;
  }));
  feedback.textContent = "";
}

function generateFlavor() {
  generateButton.disabled = true;
  resultTitle.classList.add("is-changing");
  window.setTimeout(() => {
    renderFlavor(pickFlavor());
    resultTitle.classList.remove("is-changing");
    generateButton.disabled = false;
  }, 180);
}

async function copyIdea() {
  if (!currentFlavor) return;
  const text = `${currentFlavor.name} — ${currentFlavor.description}`;
  try {
    await navigator.clipboard.writeText(text);
    feedback.textContent = "Ideia copiada para a área de transferência.";
  } catch {
    feedback.textContent = "A cópia automática não está disponível neste navegador.";
  }
}

generateButton.addEventListener("click", generateFlavor);
copyButton.addEventListener("click", copyIdea);
renderFlavor(pickFlavor());
