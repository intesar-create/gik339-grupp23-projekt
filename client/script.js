const url = 'http://localhost:3000/movies';

window.addEventListener('load', fetchData);

function fetchData() {
  fetch(url)
    .then((result) => result.json())
    .then((movies) => {
      if (movies.length > 0) {


        const listContainer = document.getElementById('resourceList');
        listContainer.innerHTML = '';
        listContainer.insertAdjacentHTML('beforeend', html);
      }
    });
}

const resourceForm = document.getElementById('resourceForm');
console.log(resourceForm);
resourceForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault(); // Förhindra standardbeteendet för formuläret
  console.log(e); // Se till att event-objektet används korrekt
}