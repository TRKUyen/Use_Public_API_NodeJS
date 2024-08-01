// Add module to access server configuration
import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

// Serve the public folder as static files
app.use(express.static("public"));

// Render the index template with default values for weather and error
app.get("/", (req, res) => {
  res.render("pages/index.ejs", { weather: null, error: null });
});

// Handle the "/weather" route
app.get("/weather", async (req, res) => {
  // Get the city from the query parameters
  const city = req.query.city;
  const apiKey = "1cdfff4b6f9125708b6f2ddef149d19c"; //pass your APIkey here

  // Add your logic here to fetch weather data from the API
  const API_URL = "https://api.openweathermap.org/data/2.5/";
  try {
    const response = await axios.get(
      API_URL + `weather?q=${city}&appid=${apiKey}`,
      {
        params: {
          APIKey: apiKey,
        },
      }
    );
    const weather = response.data;
    // Render the index template with the weather data and error message
    res.render("./views/pages/index.ejs", { weather, error });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("pages/index.ejs", {
      error: error.message,
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
