document.addEventListener("DOMContentLoaded", async()=> {
    let date = document.getElementById("search-input").value;
    getCurrentImageOfTheDay()
})

async function getCurrentImageOfTheDay() {
    let currentDate = new Date().toISOString().split("T")[0];
    console.log(currentDate)
    let api_key = "LCc8yC3V8qH2zpKDNlqx2G9jEKIw2kwPOhuNCX2a";
    let response = await fetch(`https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${api_key} `);
    let data = await response.json();
    renderImage(data);
    console.log(data);
}

function renderImage(data) {
    let mainContent = document.getElementById("main-content");
    mainContent.innerHTML = `
        <div class="image-sec">
            <h1>Picture on ${data.date}</h1>
            <img src="${data.url}">
            <h2>${data.title}</h2>
            <p>${data.explanation}</p>
        </div>`
}

document.getElementById("btn").addEventListener("click", (event) => {
    event.preventDefault();
})