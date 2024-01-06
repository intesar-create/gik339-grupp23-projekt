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
          <h3> Titel: ${movie.titel}</h3> 
          <h3>Regissör: ${movie.dirctor}</h3>
          <p> År: ${movie.release_date}</p>
          <div>
            <button
              class="rounded-md bg-white/50 p-1 text-sm"
              <button
              class="border border-${movie.color}-300 hover:bg-white/100 rounded-md bg-white/50 p-1 text-sm mt-2" onclick="setCurrentMovie('${movie.id}')">
              Ändra
            </button>
            <button class="border border-${movie.color}-300 hover:bg-white/100 rounded-md bg-white/50 p-1 text-sm mt-2 type="button" onclick="deleteMovie(${movie.id})">
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
// när vi klickar på "Ändra" knappen så blir alla fält ifyllda .
function setCurrentMovie(id) {
    console.log("current", id);
    fetch(`${url}/${id}`)
        .then((result) => result.json())
        .then((movie) => {
            console.log(movie);
            movieForm.titel.value = movie.titel;
            movieForm.dirctor.value = movie.dirctor;
            movieForm.release_date.value = movie.release_date;
            movieForm.color.value = movie.color;

            localStorage.setItem("currentId", movie.id);
        });
}
// Funktion för att ta bort en film, går efter ID.
function deleteMovie(id) {
    console.log('delete', id);
    fetch(`${url}/${id}`, { method: 'DELETE' })
        .then((result) => {
            messageFunction("Filmen är borttagen!", 'warning');
            fetchData(); // Anropa fetchData() eller motsvarande funktion för att uppdatera filmdata efter borttagning.
        });
}


//Funktion för att ta bort, går efter ID.
function deleteMovie(id) {
    console.log('delete', id);
    fetch(`${url}/${id}`, { method: 'DELETE' })
        .then((result) => {
            messageFunction("Filmen är borttagen!", 'warning');
            fetchData();
        });
}

movieForm.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    const serverUserObject = {
        titel: '',
        dirctor: '',
        release_date: '',
        color: ''
    };
    serverUserObject.titel = movieForm.titel.value;
    serverUserObject.dirctor = movieForm.dirctor.value;
    serverUserObject.release_date = movieForm.release_date.value;
    serverUserObject.color = movieForm.color.value;

    const id = localStorage.getItem("currentId");
    if (id) {
        serverUserObject.id = id;
    }

    const request = new Request(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(serverUserObject)
    });

    fetch(request).then((response) => {
        fetchData();
        movieForm.reset();
    });
}