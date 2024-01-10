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
    console.log("current", id);
    fetch(`${url}/${id}`)
        .then((result) => {
            if (!result.ok) {
                showMessage("Det gick inte att hämta filmen.", 'error');
                throw new Error('Network response was not ok');
            }
            return result.json();
        })
        .then((movie) => {
            console.log(movie);
            movieForm.titel.value = movie.titel;
            movieForm.dirctor.value = movie.dirctor;
            movieForm.release_date.value = movie.release_date;
            movieForm.color.value = movie.color;

            localStorage.setItem("currentId", movie.id);
            showMessage("Filmuppgifterna har hämtats!", 'success');
        })
        .catch((error) => {
            showMessage("Det gick inte att hämta filmen.", 'error');
        });
}

// Funktion för att ta bort en film, går efter ID.

function deleteMovie(id) {
    console.log('delete', id);
    fetch(`${url}/${id}`, { method: 'DELETE' })
        .then((result) => {
            showMessage("Filmen är borttagen!", 'success'); // Visa meddelande om att filmen är borttagen
            fetchData(); // Uppdatera filmdata efter borttagning
        })
        .catch((error) => {
            showMessage("Ett fel uppstod vid borttagning av filmen.", 'error'); // Visa felmeddelande om något går fel
        });
}



movieForm.addEventListener('submit', handleSubmit);

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

function showMessage(message, messageType, duration = 15000) {
    const modal = document.getElementById('popup-modal');
    const messageBox = modal.querySelector('.text-gray-500');

    messageBox.textContent = message;
    modal.classList.remove('hidden');
<<<<<<< HEAD

    // Ange olika färger beroende på meddelandetypen (ex. 'success', 'error', 'warning', etc.)
=======
    
>>>>>>> 0b38f935d8cb8d09fea20dc9e7d6af3a40d0dd99
    if (messageType === 'success') {
        messageBox.classList.remove('text-red-500');
        messageBox.classList.add('text-green-500');
    } else if (messageType === 'error') {
        messageBox.classList.remove('text-green-500');
        messageBox.classList.add('text-red-500');
    } else {
        messageBox.classList.remove('text-red-500', 'text-green-500');
    }

    setTimeout(() => {
        modal.classList.add('hidden');
    }, duration);
}

