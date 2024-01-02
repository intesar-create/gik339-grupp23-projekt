const url = 'http://localhost:5500/movies';

window.addEventListener('load', fetchData);

function fetchData() {
  fetch(url)
    .then((result) => result.json())
    .then((movies) => {
      if (movies.length > 0) {
        let html = `<ul class="w-3/4 my-3 mx-auto flex flex-wrap gap-2 justify-center">`;
        movies.forEach((user) => {
          html += `
        <li
          class="bg-${user.color}-200 basis-1/4 text-${user.color}-900 p-2 rounded-md border-2 border-${user.color}-400 flex flex-col justify-between">
          <h3>${user.firstName} ${user.lastName}</h3>
          <p>Användarnamn: ${user.username}</p>
          <div>
            <button
              class="border border-${user.color}-300 hover:bg-white/100 rounded-md bg-white/50 p-1 text-sm mt-2" onclick="setCurrentUser(${user.id})">
              Ändra
            </button>
            <button class="border border-${user.color}-300 hover:bg-white/100 rounded-md bg-white/50 p-1 text-sm mt-2" onclick="deleteUser(${user.id})">
              Ta bort
            </button>
          </div>
        </li>`;
        });
        html += `</ul>`;

        const listContainer = document.getElementById('listContainer');
        listContainer.innerHTML = '';
        listContainer.insertAdjacentHTML('beforeend', html);
      }
    });
}

