document.addEventListener("DOMContentLoaded", async()=> {
    getCurrentImageOfTheDay();
    let dates = JSON.parse(localStorage.getItem("dates")) || [];
    addSearchToHistory(dates);
})


async function getCurrentImageOfTheDay() {
    //Get current date in given format - 2025-02-03
    const currentDate = new Date().toISOString().split("T")[0];
    console.log("Today date: ", currentDate);
    let api_key = "LCc8yC3V8qH2zpKDNlqx2G9jEKIw2kwPOhuNCX2a";
    let response = await fetch(`https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${api_key} `);
    let data = await response.json();
    renderImage(data);
    console.log("Todays Image Data", data);
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


async function getImageOfTheDay() {
    let date = document.getElementById("search-input").value;
    console.log("Input Date", date)
    let dates = JSON.parse(localStorage.getItem("dates")) || [];
    console.log("Dates form locatStorage: ", dates);
    dates.push(date);
    saveSearch(dates);
    let api_key = "LCc8yC3V8qH2zpKDNlqx2G9jEKIw2kwPOhuNCX2a";
    let response = await fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${api_key} `);
    let data = await response.json();
    console.log("Image for selected date: ", data);
    renderImage(data);
}

//This function should save a date to local storage
function saveSearch(dates) {
    localStorage.setItem("dates", JSON.stringify(dates));
}

function addSearchToHistory(dates) {
    let history = document.getElementById("search-history");
    history.innerHTML = "";
    dates.map((item, index) => {
        history.innerHTML += `
        <li>${item}</li>
        `
    })
}

document.getElementById("btn").addEventListener("click", (event) => {
    event.preventDefault();
    getImageOfTheDay()
    
})
