const url = 'http://localhost:3000/movies';

// Ladda in filmdata när sidan laddas
window.addEventListener('load', fetchData);

function fetchData() {
    // Hämta filmdata från servern
    fetch(url)
        .then((result) => result.json())
        .then((movies) => {
            if (movies.length > 0) {
                // Skapa HTML för att visa filmerna på sidan
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

                // Uppdatera gränssnittet med filmerna
                const listContainer = document.getElementById('listContainer');
                listContainer.innerHTML = '';
                listContainer.insertAdjacentHTML('beforeend', html);
            }
        });
}


//Intisar börjar här

// Funktion för att sätta aktuell film baserat på ID och fylla i formuläret
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
            // Fyll i formuläret med filmens information
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



// Funktion för att ta bort en film baserat på ID
function deleteMovie(id) {
    console.log('delete', id);
    // Skicka förfrågan till servern för att ta bort filmen
    fetch(`${url}/${id}`, { method: 'DELETE' })
        .then((result) => {
            showMessage("Filmen är borttagen!", 'success'); // Visa meddelande om att filmen är borttagen
            fetchData(); // Uppdatera filmdata efter borttagning
        })
        .catch((error) => {
            showMessage("Ett fel uppstod vid borttagning av filmen.", 'error'); // Visa felmeddelande om något går fel
        });
}


//Safiyo börjar här
// Funktion för att skicka in eller uppdatera filminformation
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

    // Skapa en Request för att skicka data till servern
    const request = new Request(url, {
        method: serverMovieObject.id ? 'PUT' : 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(serverMovieObject)
    });

    // Skicka förfrågan till servern för att skicka in eller uppdatera filmen
    fetch(request)
        .then((response) => {
            // Visa meddelande om att filmen är skapad eller uppdaterad
            showMessage(serverMovieObject.id ? "Filmen är uppdaterad!" : "Filmen är skapad!", 'success');

            fetchData();// Uppdatera filmdata
            localStorage.removeItem("currentId");// Rensa localStorage och återställ formuläret
            movieForm.reset();
        })
        .catch((error) => {
            showMessage("Ett fel uppstod vid hantering av filmen.", 'error');// Visa felmeddelande om något går fel vid hantering av filmen
        });
}

// Funktion för att visa meddelanden i en popup-modal
function showMessage(message, messageType) {
    const modal = document.getElementById('popup-modal');
    const messageBox = modal.querySelector('.text-gray-500');

    messageBox.textContent = message;
    modal.classList.remove('hidden');

    // Ändra färgen på meddelandet beroende på typ av meddelande
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
<<<<<<< HEAD
<<<<<<< HEAD
    }, 2000);
=======
    }, 10000);
>>>>>>> 564bc336dc73d5359f0942dda82c926884a84e18
=======
    }, 200);
>>>>>>> fe757dc4b33c00886d051a9a58f8aded5d3da621


}

