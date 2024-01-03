//const url = 'http://localhost:3000/movies';
//
//window.addEventListener('load', fetchData);

//function fetchData() {
  //fetch(url)
   // .then((result) => result.json())
    //.then((movies) => {
      //if (movies.length > 0) {


      //  const listContainer = document.getElementById('resourceList');
       // listContainer.innerHTML = '';
        //listContainer.insertAdjacentHTML('beforeend', html);
      //}
   // });
//}

//const resourceForm = document.getElementById('resourceForm');
//console.log(resourceForm);
//resourceForm.addEventListener("submit", handleSubmit);

//function handleSubmit(e) {
 // e.preventDefault(); // Förhindra standardbeteendet för formuläret
 // console.log(e); // Se till att event-objektet används korrekt
//}


    // Assuming you have an API endpoint to fetch movies data
    const moviesEndpoint = 'http://localhost:3000/movies';

    // Function to fetch movies from the server
    async function fetchMovies() {
        try {
            const response = await fetch(moviesEndpoint);
            const movies = await response.json();

            // Call a function to dynamically populate the movies list
            populateMoviesList(movies);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }

    // Function to populate the movies list dynamically
    function populateMoviesList(movies) {
        const listContainer = document.getElementById('resourceList');

        // Clear existing content
        listContainer.innerHTML = '';

        // Iterate through each movie and create a list item
        movies.forEach(movie => {
            const listItem = document.createElement('li');
            listItem.className = `bg-${movie.color}-200 basis-1/4 text-${movie.color}-900 p-2 rounded-md border-2 border-${movie.color}-400 flex flex-col justify-between`;

            listItem.innerHTML = `
                <h3>${movie.titel}</h3>
                <p>Regissör: ${movie.dirctor}</p>
                <p>Release Date: ${movie.release_date}</p>
                <div>
                    <button class="border border-${movie.color}-300 hover:bg-white/100 rounded-md bg-white/50 p-1 text-sm mt-2" onclick="editMovie(${movie.id})">
                        Ändra
                    </button>
                    <button class="border border-${movie.color}-300 hover:bg-white/100 rounded-md bg-white/50 p-1 text-sm mt-2" onclick="deleteMovie(${movie.id})">
                        Ta bort
                    </button>
                </div>
            `;

            // Append the list item to the container
            listContainer.appendChild(listItem);
        });
    }

    // Call the fetchMovies function to initiate the process
    fetchMovies();
