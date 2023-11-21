const email = document.getElementById("email");
email.addEventListener('input', () => validate(email));

const submit = document.getElementById('submit');
submit.addEventListener('click', () => validate(email));

function validate(element) {
  if (element.validity.typeMismatch) {
    element.setCustomValidity("The Email is not in the right format!!!");
    element.reportValidity();
  } else {
    element.setCustomValidity('');
  }
}

function clearAll() {
  localStorage.clear();
  displayEntries();
}

function AgeCalculate(dob) {
  let present = new Date();
  let birthDay = new Date(dob);

  let age = present.getFullYear() - birthDay.getFullYear();
  let month = present.getMonth() - birthDay.getMonth();

  if (month < 0 || (month === 0 && present.getDate() < birthDay.getDate())) {
    age--;
  }
  return age;
}

let userForm = document.getElementById("user-form");

const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};

let userEntries = retrieveEntries();

const displayEntries = () => {
  const entries = retrieveEntries();
  const tableEntries = entries
    .map((entry) => {
      const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
      const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
      const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
      const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
      const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptedTermsAndconditions}</td>`;

      const row = `<tr> ${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
      return row;
    })
    .join("\n");

  const table = `<table class="table-auto w-full"><tr>
      <th class="px-4 py-2">Name</th>
      <th class="px-4 py-2">Email</th>
      <th class="px-4 py-2">Password</th>
      <th class="px-4 py-2">Dob</th>
      <th class="px-4 py-2">Accepted terms?</th>
   </tr>${tableEntries}</table>`;

  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};

const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTermsAndconditions = document.getElementById("acceptTerms").checked;
  const age = AgeCalculate(dob);

  if (age < 18 || age > 55) {
    alert("Registration age is between 18 and 55");
    return false;
  }

  const entry = {
    name,
    email,
    password,
    dob,
    acceptedTermsAndconditions,
  };

  userEntries.push(entry);

  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntries();
};

userForm.addEventListener("submit", saveUserForm);
displayEntries();
