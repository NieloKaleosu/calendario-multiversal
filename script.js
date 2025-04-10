
import { db } from './firebase-config.js';
import { collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const calendar = document.getElementById("calendar");
const nomeInput = document.getElementById("nome");
const dataInput = document.getElementById("data");
const adicionarBtn = document.getElementById("adicionar");

const aniversariosRef = collection(db, "aniversarios");

function calcularIdade(dataNasc) {
  const hoje = new Date();
  const nasc = new Date(dataNasc);
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const m = hoje.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) {
    idade--;
  }
  return idade;
}

function criarCalendario(aniversarios) {
  calendar.innerHTML = "";
  const mesesMap = Array.from({ length: 12 }, (_, i) => []);

  aniversarios.forEach(a => {
    const data = new Date(a.data);
    const mes = data.getMonth();
    mesesMap[mes].push(a);
  });

  meses.forEach((mesNome, i) => {
    const div = document.createElement("div");
    div.classList.add("month");
    div.innerHTML = `<h2>${mesNome}</h2>`;
    mesesMap[i].forEach(({ nome, data }) => {
      const dataObj = new Date(data);
      const dia = String(dataObj.getDate()).padStart(2, '0');
      const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
      const ano = dataObj.getFullYear();
      const idade = calcularIdade(data);
      div.innerHTML += `<div class="entry">${nome} - ${dia}/${mes}/${ano} - ${idade} anos</div>`;
    });
    calendar.appendChild(div);
  });
}

adicionarBtn.addEventListener("click", async () => {
  const nome = nomeInput.value.trim();
  const data = dataInput.value;
  if (nome && data) {
    await addDoc(aniversariosRef, { nome, data });
    nomeInput.value = "";
    dataInput.value = "";
  }
});

onSnapshot(aniversariosRef, (snapshot) => {
  const aniversarios = snapshot.docs.map(doc => doc.data());
  criarCalendario(aniversarios);
});
