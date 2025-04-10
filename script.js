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

function formatDateDMY(dateStr) {
  const [year, month, day] = dateStr.split("-");
  return `${day.padStart(2, '0')} / ${month.padStart(2, '0')} / ${year}`;
}

function renderCalendar() {
  calendar.innerHTML = "";
  months.forEach((month, index) => {
    const monthDiv = document.createElement("div");
    monthDiv.className = "month";
    monthDiv.innerHTML = `<h2>${month}</h2>`;

    const monthBirthdays = Object.entries(birthdays).filter(
      ([, b]) => new Date(b.date).getMonth() === index
    );

    if (monthBirthdays.length === 0) {
      monthDiv.innerHTML += `<p style="color:#aaa;">Sem aniversários.</p>`;
    } else {
      monthBirthdays.sort((a, b) => {
        return new Date(a[1].date).getDate() - new Date(b[1].date).getDate();
      });

      monthBirthdays.forEach(([id, b]) => {
        const birthDate = new Date(b.date);
        const age = calculateAge(b.date);
        const formatted = formatDateDMY(b.date);
        const entryDiv = document.createElement("div");
        entryDiv.className = "entry";
        entryDiv.innerHTML = `
          <div>
            <div class="name">${b.name}</div>
            <div class="info">${formatted} – ${age} anos</div>
          </div>
          <button class="remove-btn" onclick="removeBirthday('${id}')">Remover</button>
        `;
        monthDiv.appendChild(entryDiv);
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
  const name = document.getElementById("nameInput").value.trim();
  const date = document.getElementById("dateInput").value;
  if (!name || !date) return alert("Preencha todos os campos!");

  push(ref(db, "birthdays"), { name, date });
  document.getElementById("nameInput").value = "";
  document.getElementById("dateInput").value = "";
};

window.removeBirthday = function (id) {
  remove(ref(db, "birthdays/" + id));
};
