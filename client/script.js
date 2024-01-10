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
            <button class="border border-${movie.color}-300 hover:bg-white/100 rounded-md bg-white/50 p-1 text-sm mt-2" type="button" onclick="deleteMovie(${movie.id})">
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
    fetch(`${url}/${id}`)
        .then((result) => result.json())
        .then((movie) => {
            movieForm.titel.value = movie.titel;
            movieForm.dirctor.value = movie.dirctor;
            movieForm.release_date.value = movie.release_date;
            movieForm.color.value = movie.color;

            localStorage.setItem("currentId", movie.id);
        })
        .catch((error) => {
            showMessage("Det gick inte att hämta filmen.", 'error');
        });
}

function deleteMovie(id) {
    fetch(`${url}/${id}`, { method: 'DELETE' })
        .then((result) => {
            showMessage("Filmen är borttagen!", 'success');
            fetchData(); // Uppdatera filmdata efter borttagning
        })
        .catch((error) => {
            showMessage("Ett fel uppstod vid borttagning av filmen.", 'error');
        });
}

function handleSubmit(e) {
    e.preventDefault();
    const serverMovieObject = {
        titel: movieForm.titel.value,
        dirctor: movieForm.dirctor.value,
        release_date: movieForm.release_date.value,
        color: movieForm.color.value
    };

    const id = localStorage.getItem("currentId");
    if (id) serverMovieObject.id = id;

    const request = new Request(url, {
        method: serverMovieObject.id ? 'PUT' : 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(serverMovieObject)
    });

    fetch(request)
        .then((response) => {
            showMessage(serverMovieObject.id ? "Filmen är uppdaterad!" : "Filmen är skapad!", 'success');
            fetchData();
            localStorage.removeItem("currentId");
            movieForm.reset();
        })
        .catch((error) => {
            showMessage("Ett fel uppstod vid hantering av filmen.", 'error');
        });
}

function showMessage(message, messageType) {
    const modal = document.getElementById('popup-modal');
    const messageBox = modal.querySelector('.text-gray-500');

    // Uppdatera meddelandetexten i rutan
    messageBox.textContent = message;

    // Visa modalfönstret
    modal.classList.remove('hidden');

    // Ange olika färger beroende på meddelandetypen (ex. 'success', 'error', 'warning', etc.)
    if (messageType === 'success') {
        messageBox.classList.remove('text-red-500'); // Ta bort tidigare färgklasser
        messageBox.classList.add('text-green-500'); // Lägg till klass för framgångsmeddelanden
    } else if (messageType === 'error') {
        messageBox.classList.remove('text-green-500');
        messageBox.classList.add('text-red-500');
    } else {
        // Om ingen specifik typ anges, återställ till standardfärg
        messageBox.classList.remove('text-red-500', 'text-green-500');
    }
}


