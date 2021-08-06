// Get Page

let cityName = document.querySelector('.cityName')
let country = document.querySelector('.country')
let cloud = document.querySelector('.cloud')
let cloudIcon = document.querySelector('.cloudIcon')

let temp = document.querySelector('.temp')

let maxTemp = document.querySelector('#max-temp')
let minTemp = document.querySelector('#min-temp')
let avgTemp = document.querySelector('#avg-temp')

let cityForm = document.querySelector('.search form')
let inputForm = document.querySelector('.search form input')
let cityFromForm

//Get Weather

const KEY = 'ef24d4f6e88e4cefbda163227210208'

let data = []

http://api.weatherapi.com/v1/current.json?key=ef24d4f6e88e4cefbda163227210208&q=London&aqi=no

function getLocation(){
    navigator.geolocation.getCurrentPosition(position=>{
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        
        getWeatherHere(lat, long)
    })
}

function getWeatherHere(lat, long){
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${lat},${long}&days=1&aqi=no&alerts=no`)
    .then(res=>res.json())
    .then(res=>dataToPage(res))
}

function dataToPage(response){
    cityName.innerText = response.location.name
    country.innerText = response.location.country
    cloud.innerText = response.current.condition.text
    cloudIcon.src = response.current.condition.icon
    temp.innerText = `${response.current.temp_c}℃`

    maxTemp.innerText = `${response.forecast.forecastday[0].day.maxtemp_c}℃`
    minTemp.innerText = `${response.forecast.forecastday[0].day.mintemp_c}℃`
    avgTemp.innerText = `${response.forecast.forecastday[0].day.avgtemp_c}℃`


    console.log(response.forecast.forecastday[0].day.maxtemp_c)
}

function getCityWeather(city){
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${city}&days=1&aqi=no&alerts=no`)
    .then(res=>res.json())
    .then(res=>dataToPage(res))
}

inputForm.addEventListener('input', (e)=>{
    cityFromForm = e.target.value
})


cityForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    getCityWeather(cityFromForm)

    inputForm.value = ""
})

getLocation()
