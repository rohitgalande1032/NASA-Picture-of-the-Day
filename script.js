//Once the user visited website it will show current date Image
document.addEventListener("DOMContentLoaded", async()=> {
    getCurrentImageOfTheDay();
    
})


//Function for getting current date image of the day
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


//Function for rendering image of the day
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


//function for getting random image of the day from user input date
async function getImageOfTheDay() {
    let date = document.getElementById("search-input").value;
    console.log("Input Date", date)
    let dates = JSON.parse(localStorage.getItem("dates")) || [];
    console.log("Dates form locatStorage: ", dates);
    if(!dates.includes(date)) {
        dates.push(date);
    }
    saveSearch(dates);
    addSearchToHistory(dates);
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


//When click on list item it will show the image of the day for that date
function addSearchToHistory(dates) {
    let history = document.getElementById("search-history");
    history.innerHTML = "";
    
    dates.forEach(date => {
        let li = document.createElement("li");
        li.textContent = date;
        li.onclick = () => fetchData(date);
        history.appendChild(li);
    });
}


//fetch data from api for the selected date 
async function fetchData(date) {
    console.log("Search History date", date);
    let api_key = "LCc8yC3V8qH2zpKDNlqx2G9jEKIw2kwPOhuNCX2a";
    let response = await fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${api_key} `);
    let data = await response.json();
    renderImage(data);
}

//User click on search button it show the image of the day for the selected date
document.getElementById("btn").addEventListener("click", (event) => {
    event.preventDefault();
    getImageOfTheDay()
})
