const apikey = "7a3ab43e363bd861df687f3e0a672b8c"; 
const cityname = document.getElementById("citysearch");
const searchbtn = document.getElementById("search");
const card = document.getElementById("box");
const name = document.getElementById("name");
const temp = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const weather = document.getElementById("description");
const emoji = document.getElementById("weatheremoji");

searchbtn.addEventListener("click", async function () {
  event.preventDefault();
  const city = cityname.value;

  if (city) {
    try {
      const weatherdata = await fetchWeather(city);
      displayweather(weatherdata);
      card.style.display = "block"; 
      error.style.display = "none";
    } catch (error) {
      console.error("Error fetching data:", error);
      displayError(error.message); 
    }
  } else {
    displayError("Please enter a city");
  }
});

async function fetchWeather(city) {
  const dataurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

  try {
    const response = await fetch(dataurl);

    if (!response.ok) {
      throw new Error(`Network response was not ok (${response.status})`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
}

function displayweather(data) {
  name.textContent = data.name;
  temper= data.main.temp - 273.15;
  temp.textContent=`${temper.toFixed(2)}°C`;  
  humidity.textContent = `${data.main.humidity}%`;
  weather.textContent = `${data.weather[0].description}`;
  emoji.textContent = weatheremojis(data.weather[0].id);
}

function weatheremojis(weatherid) {
  switch (true) {
    case (weatherid >= 200 && weatherid < 300):
      return '⛈️';
    case (weatherid >= 300 && weatherid < 400):
      return '🌧️';
    case (weatherid >= 500 && weatherid < 600):
      return '☔️';
    case (weatherid >= 600 && weatherid < 700):
      return '❄';
    case (weatherid >= 700 && weatherid < 800):
      return '💨';
    case (weatherid === 800):
      return '☀️';
    case (weatherid >= 801 && weatherid < 810):
      return '⛅️';
    default:
      return '😅';
  }
}

function displayError(message) {
  const errormsg = document.createElement("p");
  errormsg.textContent = message;
  errormsg.classList.add("error");
  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errormsg);
}