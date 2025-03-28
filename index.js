// Fetch data from db.json and display it
function fetchWines() {
  fetch("https://phase-1-javascript-project-mode-1-pwys.onrender.com/wines") // Replace with your JSON server URL
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      displayWineCollection(data); 
    })
    .catch((error) => console.error("Error fetching wines:", error));
}

// Display the wine collection
function displayWineCollection(wines) {
  const wineList = document.getElementById("wine-list");
  wineList.innerHTML = ""; 

  wines.forEach((wine) => {
    const wineItem = document.createElement("div");
    wineItem.className = "wine-item";
    wineItem.innerHTML = `
      <img src="${wine.image}" alt="${wine.varietal}" style="width: 150px; height: auto; border-radius: 8px;" 
           onerror="this.src='https://via.placeholder.com/150';">
      <h3>${wine.varietal}</h3>
      <p><strong>Region:</strong> ${wine.region}</p>
      <p><strong>Year:</strong> ${wine.year}</p>
      <p><strong>ABV:</strong> ${wine.abv}%</p>
      <button class="details-btn">View Details</button>
    `;

    // Add event listener to the "View Details" button
    wineItem.querySelector(".details-btn").addEventListener("click", () => {
      displayWineDetails(wine);
    });

    wineList.appendChild(wineItem);
  });
}

// Display details of a selected wine
function displayWineDetails(wine) {
  const wineDetails = document.getElementById("wine-details");
  wineDetails.innerHTML = `
    <h2>${wine.varietal}</h2>
    <img src="${wine.image}" alt="${wine.varietal}" style="width: 200px; height: auto;">
    <p><strong>Region:</strong> ${wine.region}</p>
    <p><strong>Year:</strong> ${wine.year}</p>
    <p><strong>ABV:</strong> ${wine.abv}%</p>
    <p><strong>Appearance:</strong> ${wine.tasting_notes.appearance}</p>
    <p><strong>Nose:</strong> ${wine.tasting_notes.nose}</p>
    <p><strong>Taste:</strong> ${wine.tasting_notes.taste}</p>
    <p><strong>Finish:</strong> ${wine.tasting_notes.finish}</p>
    <p><strong>Food Pairings:</strong> ${wine.food_pairings.join(", ")}</p>
    <p><strong>Rating:</strong> ${wine.rating}</p>
  `;
}

document.getElementById("wine-form").addEventListener("submit", (event) => {
  event.preventDefault(); 

  const newWine = {
    varietal: event.target.varietal.value,
    year: parseInt(event.target.year.value),
    abv: parseFloat(event.target.abv.value),
    image: event.target.image.value,
    tasting_notes: {
      appearance: event.target.appearance.value,
      nose: event.target.nose.value,
      taste: event.target.taste.value,
      finish: event.target.finish.value,
    },
    food_pairings: event.target["food-pairings"].value.split(","),
  };

  fetch("https://phase-1-javascript-project-mode-1-pwys.onrender.com/wines", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newWine),
  })
    .then((response) => response.json())
    .then((wine) => {
      console.log("Wine added:", wine);
      fetchWines(); 
      event.target.reset(); 
    })
    .catch((error) => console.error("Error adding wine:", error));
});

// Fetch and display wines when the page loads
fetchWines();