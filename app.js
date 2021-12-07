const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
    
});
app.post("/", function(req, res) {

   const query = req.body.cityName;
       const apiKey = "7c57c8e63de688687cd3cf901b9dd35c"
       const unit = "imperial"
       const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
       https.get(url, function(response){
           console.log(response.statusCode);
   
           response.on("data", function(data){
               const weatherData = JSON.parse(data)
               console.log(weatherData);
               const temp = weatherData.main.temp 
               const feelsLike = weatherData.main.feels_like
               const weatherDescription =weatherData.weather[0].description
               const icon = weatherData.weather[0].icon
               const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
               res.write("<p>The weather is currently " + weatherDescription + ".</p>")
               res.write("<h1>The temperature in " + query + " is " + temp + " degrees Fahrenheit.</h1>");
               res.write("<h3>It feels like " + feelsLike + ".</h3>")
               res.write("<img src=" +imageURL +">");
           })
       })
})




app.listen(3000, function() {
console.log("Server is running on port 3000.");

})