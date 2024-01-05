const url = 'http://localhost:3000/movies';

window.addEventListener('load', fetchData);

function fetchData() {
    fetch(url)
        .then((result) => result.json())
        .then((movies) => {
            if (movies.length > 0) {
                let html = `<ul class="w-3/4 my-3 mx-auto flex flex-wrap gap-2 justify-center">`;
                movies.forEach((movie) => {
                    html += `
        <li
          class="bg-${movie.color}-200 basis-1/4 text-${movie.color}-900 p-2 rounded-md border-2 border-${movie.color}-400 flex flex-col justify-between">
          <h3>${movie.movietitle} ${movie.director}</h3>
          <p>Vilket år filmen släpptes: ${movie.yearreleased}</p>
          <div>
            <button
              class="rounded-md bg-white/50 p-1 text-sm"
              <button
              class="border border-${movie.color}-300 hover:bg-white/100 rounded-md bg-white/50 p-1 text-sm mt-2">
              Ändra
            </button>
            <button class="border border-${movie.color}-300 hover:bg-white/100 rounded-md bg-white/50 p-1 text-sm mt-2">
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

userForm.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    const serverUserObject = {
        firstName: '',
        lastName: '',
        username: '',
        color: ''
    };
    serverUserObject.firstName = userForm.firstName.value;
    serverUserObject.lastName = userForm.lastName.value;
    serverUserObject.username = userForm.username.value;
    serverUserObject.color = userForm.color.value;

    const request = new Request(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(serverUserObject)
    });

    fetch(request).then((response) => {
        fetchData();
        userForm.reset();
    });
}