// Get Page

let cityName = document.querySelector('.cityName')
let country = document.querySelector('.country')
let cloud = document.querySelector('.cloud')
let cloudIcon = document.querySelector('.cloudIcon')

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
    fetch(`http://api.weatherapi.com/v1/current.json?key=${KEY}&q=${lat},${long}&aqi=no`)
    .then(res=>res.json())
    .then(res=>dataToPage(res))
}

function dataToPage(response){
    cityName.innerText = response.location.name
    country.innerText = response.location.country
    cloud.innerText = response.current.condition.text
    cloudIcon.src = response.current.condition.icon    
}

function getCityWeather(city){
    fetch(`http://api.weatherapi.com/v1/current.json?key=${KEY}&q=${city}&aqi=no`)
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
