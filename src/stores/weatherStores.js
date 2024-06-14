import { defineStore } from "pinia";

export const useWeatherStore = defineStore("weather", {
  state: () => ({
    weatherWidgets: JSON.parse(localStorage.getItem("weatherWidgets")) || [],
  }),
  actions: {
    async fetchWeather(location) {
      const apiKey = "11ec25ca81ed6a0c9cde655cbde7d2cf"; // Replace with your API key
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const weather = await response.json();
        this.weatherWidgets.push(weather);
        this.saveWeather();
      } catch (error) {
        console.error("Failed to fetch weather data:", error.message);
      }
    },
    removeWidget(index) {
      this.weatherWidgets.splice(index, 1);
      this.saveWeather();
    },
    saveWeather() {
      localStorage.setItem(
        "weatherWidgets",
        JSON.stringify(this.weatherWidgets)
      );
    },
    loadStoredWeather() {
      const storedWeather = localStorage.getItem("weatherWidgets");
      if (storedWeather) {
        this.weatherWidgets = JSON.parse(storedWeather);
      }
    },
  },
});
