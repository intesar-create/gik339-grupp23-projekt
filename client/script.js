const url = 'http://localhost:5500/movies';

window.addEventListener('load', fetchData);
fetch(url)

.then((response) => {
    if (!response.ok) {
      throw new Error(`Network response was not ok, status code: ${response.status}`);
    }
    return response.json();
  })
  .then((jsonData) => {
    // Skapa en array av JavaScript-objekt som representerar användare
    const moviesArray = jsonData.map((movies) => {
      return {
        id: movies.id,
        titel: movies.titel,
        datum: movies.datum,
        tid: movies.tid,
      };
    });

    // Skapa ett ul-element och ge det en klass
    const eventList = document.createElement("ul");
    eventList.classList.add("eventList");
      // Hämta alla card-body element
      const cardBodies = document.querySelectorAll('.card-body');

      // Loopa igenom användarobjekten och skapa li-element för varje
      eventArray.forEach((event, index) => {
      // Skapa li-element och fyll det med användarinformation
        const listItem = document.createElement("li");
        listItem.innerHTML = `
        ${event.titel}<br>
        Datum: ${event.datum}<br>
        Plats: ${event.plats}<br>
        Tid: ${event.tid}<br>
        <button onclick="handleEdit(${event.id})">Redigera</button>
        <button onclick="handleDelete(${event.id})">Ta bort</button>`;
  
      // Lägg till li-elementet i ul-elementet
      eventList.appendChild(listItem);
  
      // Lägg till li-elementet i det matchande card-body
      if (cardBodies[index]) {
        cardBodies[index].appendChild(listItem);
      }
  });
      // Lägg till ul-elementet i body eller där du vill ha det i DOM-trädet
      document.body.appendChild(eventList);
      // Logga resultatet
      console.log(eventArray);
      console.log(jsonData);
    })
    .catch((error) => {
      // Hantera eventuella fel under hämtningen
      console.error("Fetch error:", error);
    });

// // funktion för att skapa event
// function addNewEvent(newEvent) {
//   fetch("http://localhost:3000/events", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newEvent),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`Network response was not ok, status code: ${response.status}`);
//       }
//       // Uppdatera listan och DOM-trädet efter att ha lagt till evenemanget
//       updateEventList();
//       console.log("Evenemang har lagts till i databasen");
//     })
//     .catch((error) => {
//       console.error("Fetch error:", error);
//     });
// }

// Funktion för att hantera redigering
function handleEdit(id) {
  // Implementera din logik för redigering här
  console.log(`Redigera resurs med ID ${id}`);
}

// Funktion för att hantera borttagning
function handleDelete(id) {
    fetch(`http://localhost:3000/events/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok, status code: ${response.status}`);
      }
      // Uppdatera listan och DOM-trädet efter borttagning
      updateEventList();
      console.log(`Event med ID ${id} borttaget framgångsrikt`);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });

}

//--------------- Formulär ---------------


// Lägg till formulär


const form = document.getElementById("myForm");

form.addEventListener("submit", responseModal)

function responseModal (e) {
  e.preventDefault();

  const eventData = {form.eventNameInput.value}

  fetch()


}


const inputCRUD = document.getElementsByTagName("input");



// Eventet "submit" kan användas för att visa medddelande rutan sen.

myModal.addEventListener('shown.bs.modal', (e) => {
  console.log(e)
  button.focus()
});



  // ${"form"}.on('submit', () => $(".modal").show());
