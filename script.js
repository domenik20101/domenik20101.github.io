const mods = [
  "Гипер-снежки ❄️", 
  "Шахтёры-боты 🤖", 
  "Порталы в случайные измерения 🔮",
  "Летающие лодки 🚀",
  "Светящиеся книги 📘",
  "Магические кристаллы 💎",
  "Временные петли ⏳",
  "Гигантские грибы 🍄"
];
const names = [
  "Зинтор", "Алайра", "Ксаргус", "Люмена", "Драквор", "Тайрин",
  "Эльвира", "Ринтар", "Селена", "Горвен", "Мираэль", "Фалкор",
  "Лираэль", "Дрейк", "Тарина", "Кельвин", "Найла", "Орлен",
  "Вирен", "Серана", "Эрандор", "Айлина", "Морвен", "Зарек",
  "Кайлин", "Элиора", "Танрис", "Файра", "Эскар", "Нимара"
];


const resultBox = document.getElementById("result");
const historyList = document.getElementById("history");

document.getElementById("generate").addEventListener("click", () => {
  const mode = document.getElementById("mode").value;
  let result = "";

  if (mode === "seed") {
    const seed = generateRandomSeed();
    result = "🌍 Сид: " + seed;
  } else if (mode === "mod") {
    result = "🛠️ Идея мода: " + random(mods);
  } else if (mode === "name") {
    result = "👤 Имя персонажа: " + random(names);
  }

  resultBox.textContent = result;
  resultBox.classList.remove("animated");
  void resultBox.offsetWidth; 
  resultBox.classList.add("animated");

  addToHistory(result);
});

document.getElementById("copy").addEventListener("click", () => {
  const text = resultBox.textContent;
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    alert("Скопировано!");
  });
});

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
  const themeBtn = document.getElementById("themeToggle");
  themeBtn.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
});

function addToHistory(text) {
  const li = document.createElement("li");
  li.textContent = text;
  historyList.prepend(li);
  if (historyList.children.length > 10) {
    historyList.removeChild(historyList.lastChild);
  }
}

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomSeed() {
  
  const min = -2000000000;
  const max = 2000000000;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


document.getElementById("download").addEventListener("click", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 600;
  canvas.height = 100;

  ctx.fillStyle = document.body.classList.contains("light") ? "#f5f5f5" : "#203a43";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = "20px Segoe UI";
  ctx.fillStyle = document.body.classList.contains("light") ? "#111" : "#fff";
  ctx.fillText(resultBox.textContent, 20, 60);

  const link = document.createElement("a");
  link.download = "result.png";
  link.href = canvas.toDataURL();
  link.click();
});


window.addEventListener("load", () => {
  document.body.classList.add("loaded");
  const splash = document.getElementById("splash");
  splash.classList.add("fade-out");
  setTimeout(() => {
    splash.remove();
  }, 1000);
});

document.getElementById("clearHistory").addEventListener("click", () => {
  historyList.innerHTML = "";
  alert("История очищена!");
});
