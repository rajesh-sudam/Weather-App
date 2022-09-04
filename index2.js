const app = document.getElementById('weatherApp');
const temp = document.querySelectorAll('.temp');
const dateOutput = document.querySelectorAll('.date');
const timeOutput = document.querySelectorAll('.time');
const conditionOutput = document.querySelectorAll('.condition');
const nameOutput = document.querySelectorAll('.name');
const icon = document.querySelectorAll('.icon');
const cloudOutput = document.querySelectorAll('.cloud');
const humidityOutput = document.querySelectorAll('.humidity');
const windOutput = document.querySelectorAll('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelectorAll('.search');
const btn = document.querySelectorAll('.submit');
const cities = document.querySelectorAll('.city');

//Default city when the page loads
let cityInput = "London";

//Add click event to each city in the panel
cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        /*function that fetches and displays all 
        the data from the weather API
        (we will write it soon)*/
        fetchWeatherData();
        //Fade out the app(simple animation)
        app.style.opacity = "0"; 
    });  
})

//Add submit event to the form
form.addEventListener('submit', (e) => {
    if(search.value.length == 0){
        alert('Please typr in a city name');
    } else{
        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0";
    }
    e.preventDefault();
});
    
    /*function that returns a day of the week*/
    function dayOfTheWeek(day, month, year){
        const weekday = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        return weekday[new Date(`${day}/${month}/${year}`).getDay()];
    };
//function the fetches and displays thne data from weather API
function fetchWeatherData(){
    //fetch the data dynamically add the city name with template literals
    //use ur own key
    fetch (`https://api.weatherapi.com/v1/current.json?key=57cf184105b9410b963191122220707&q=${cityInput}&aqi=yes`)
    //take the data and convert the data into regular js format using JSON
    .then(response => response.json())
    .then(data => { 
        //u can console log the datato see it available
        console.log(data);
    
        /*
        lets start by adding the temperature and eather condition
        to the page*/
        temp.innerHTML = date.current.temp_c + "&#176;";
        conditionOutput.innerHTML = data.current.condition.text;
        //get the time from the city(extract day,month,year by individual element) 
        const date = date.location.localtime;
        const y = parseInt(date.substr(0,4)); 
        const m = parseInt(date.substr(5,2)); 
        const d = parseInt(date.substr(8,2)); 
        const time = date.substr(11);

        /*reformat the date into something more
        appealing and add it to the page*/
        
        dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m}, ${y}`;
        timeOutput.innerHTML = time;

        //add the name of the city into page
        nameOutput.innerHTML = date.location.name;
        
        //get corresponding icon url
        const iconId = data.current.condition.icon.substr(
            "/cdn.weatherapi.com/weather/64x64/".length);
            //reformat the icon url
            icon.src = "./icons/" + iconId;

            cloudOutput.innerHTML = data.current.cloud+"%";
            humidityOutput.innerHTML = data.current.humidity + "%";
            windOutput.innerHTML = data.current.wind_kph + "km/h";

            let timeOfDay = "day";

            const code = data.current.condition.code;

            if(!data.current.is_day){
                timeOfDay = "night";
            }
            if(code == 1000){
                app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
                btn.style.background = "#e5ba92";
                if(timeOfDay == "night"){
                    btn.style.background = "#181e27"
                }
             }

             else if(
                code == 1003||
                code == 1006||
                code == 1009||
                code == 1030||
                code == 1069||
                code == 1087||
                code == 1135|| 
                code == 1273||
                code == 1276||
                code == 1279||
                code == 1282
             ){
                app.style.backgroundImage = `url(./image/${timeOfDay}/cloudy.jpg)`;
                btn.style.background = "#fa6d1b";
                if(timeOfDay == "night"){
                    btn.style.background = "#181e27";

                }

            }else if(
                    code == 1063||
                    code == 1069||
                    code == 1072||
                    code == 1050||
                    code == 1153||
                    code == 1180||
                    code == 1183|| 
                    code == 1186||
                    code == 1189||
                    code == 1192||
                    code == 1195||
                    code == 1204||
                    code == 1207||
                    code == 1240|| 
                    code == 1243||
                    code == 1246||
                    code == 1249||
                    code == 1252
                ){
                    app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
                    btn.style.background = "#647d75";
                    if(timeOfDay == "night"){
                        btn.style.background = "#325c80";
                    }

                    }else{
                        app.style.background = `url(./images/${timesOfDay}/snowy.jpg)`;
                        btn.style.background = "#4d72aa";
                        if(timeOfDay == "night"){
                        btn.style.background = "#1b1b1b";
                        }
                     }
                    app.style.opacity = "1";
                     } )
                    
         .catch(() => {
            alert('City not found, please try again');
            app.style.opacity = "1";
        });
}
     

fetchWeatherData();
app.style.opacity = "1";







