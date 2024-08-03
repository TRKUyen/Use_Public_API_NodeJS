// Add module to access server configuration
import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

// Serve the public folder as static files
app.set("views", "./views"); // assuming your views directory is inside src
app.set("view engine", "ejs");
// Render the index template with default values for weather and error
app.get("/", (req, res) => {
  res.render("pages/index.ejs", { weather: null, error: null });
});

// Handle the "/weather" route
app.get("/weather", async (req, res) => {
  // Get the city from the query parameters
  const city = req.query.city;
  const API_URL = "https://api.openweathermap.org/data/2.5/";
  const apiKey = "1cdfff4b6f9125708b6f2ddef149d19c"; //pass your APIkey here

  const config = {
    params: {
      q: city,
      appid: apiKey,
      units: "metric", // optional, but recommended to get temperature in Celsius
    },
  };

  let weather = null;
  let error = null;
  // Add your logic here to fetch weather data from the API
  try {
    const response = await axios.get(API_URL + "weather", config);
    weather = response.data;
    console.log(weather);
    // Render the index template with the weather data and error message
    res.render("pages/index.ejs", { weather: weather, error: null });
  } catch (err) {
    error = "Error fetching weather data. Please try again later.";
    res.render("pages/index.ejs", {
      weather: null,
      error: error,
    });
  }
});

// Handle the "/about" route
app.get("/about", (req, res) => {
  res.render("pages/about.ejs");
});

// Start the server on the specified port
app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
