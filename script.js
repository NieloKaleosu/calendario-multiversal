
// script.js
import { db, ref, push, onValue, remove } from './firebase-config.js';

const calendar = document.getElementById("calendar");
let birthdays = {};
const months = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

function calculateAge(birthdate) {
  const today = new Date();
  const birth = new Date(birthdate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

function renderCalendar() {
  calendar.innerHTML = "";
  months.forEach((month, index) => {
    const monthDiv = document.createElement("div");
    monthDiv.className = "month";
    monthDiv.innerHTML = `<h2>${month}</h2>`;
    const monthBirthdays = Object.entries(birthdays).filter(([id, b]) => new Date(b.date).getMonth() === index);
    if (monthBirthdays.length === 0) {
      monthDiv.innerHTML += `<p style="color:#aaa;">Sem aniversários.</p>`;
    } else {
      monthBirthdays.sort((a, b) => new Date(a[1].date).getDate() - new Date(b[1].date).getDate());
      monthBirthdays.forEach(([id, b]) => {
        const birthDate = new Date(b.date);
        const age = calculateAge(b.date);
        monthDiv.innerHTML += `
          <div class="entry">
            <div class="name">${b.name}</div>
            <div class="info">${birthDate.getFullYear()} – ${age} anos</div>
          </div>
        `;
      });
    }
    calendar.appendChild(monthDiv);
  });
}

onValue(ref(db, "birthdays"), snapshot => {
  birthdays = snapshot.val() || {};
  renderCalendar();
});

window.addBirthday = function () {
  const name = document.getElementById("nameInput").value;
  const date = document.getElementById("dateInput").value;
  if (!name || !date) return alert("Preencha todos os campos!");
  push(ref(db, "birthdays"), { name, date });
};

window.removeBirthday = function () {
  const name = document.getElementById("nameInput").value.toLowerCase();
  const date = document.getElementById("dateInput").value;
  const entry = Object.entries(birthdays).find(([id, b]) =>
    b.name.toLowerCase() === name && b.date === date);
  if (entry) {
    remove(ref(db, "birthdays/" + entry[0]));
  } else {
    alert("Aniversário não encontrado.");
  }
};
