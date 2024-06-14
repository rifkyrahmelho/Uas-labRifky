<template>
  <q-page class="column items-center justify-center q-pa-md">
    <div class="input-section">
      <q-input v-model="newLocation" label="Enter Location" />
      <q-btn @click="addWeatherWidget" label="Add Widget" color="primary" />
    </div>
    <div class="tasks-section">
      <q-select
        v-model="selectedTask"
        :options="tasks"
        label="Select Task"
        emit-value
        map-options
        color="primary"
      />
      <q-btn @click="navigateToTask" label="Go to Task" color="primary" />
    </div>
    <div class="widgets-section">
      <div
        v-for="(weather, index) in weatherStore.weatherWidgets"
        :key="index"
        class="weather-widget"
      >
        <q-icon :name="getWeatherIcon(weather.weather[0].main)" size="50px" />
        <div class="location">
          <h2>{{ weather.name }}</h2>
        </div>
        <div class="temperature">
          <p>{{ convertTemp(weather.main.temp) }}</p>
        </div>
        <div class="details">
          <p>{{ weather.weather[0].description }}</p>
          <p>Wind: {{ weather.wind.speed }} m/s</p>
          <p>Humidity: {{ weather.main.humidity }}%</p>
          <p>Feels Like: {{ convertTemp(weather.main.feels_like) }}</p>
        </div>
        <q-btn
          @click="removeWidget(index)"
          label="Remove Widget"
          color="negative"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { QInput, QBtn, QIcon, QSelect } from "quasar";
import { useWeatherStore } from "../stores/weatherStores";

const weatherStore = useWeatherStore();

const newLocation = ref("");

const weatherIconMapping = {
  Clear: "wb_sunny",
  Clouds: "cloud",
  Rain: "grain",
  Drizzle: "grain",
  Thunderstorm: "flash_on",
  Snow: "ac_unit",
  Mist: "blur_on",
  Smoke: "blur_on",
  Haze: "blur_on",
  Dust: "blur_on",
  Fog: "blur_on",
  Sand: "blur_on",
  Ash: "blur_on",
  Squall: "blur_on",
  Tornado: "toys",
};

const convertTemp = (tempInCelsius) => {
  return `${tempInCelsius.toFixed(1)} °C / ${(
    (tempInCelsius * 9) / 5 +
    32
  ).toFixed(1)} °F`;
};

const getWeatherIcon = (weatherMain) => {
  return weatherIconMapping[weatherMain] || "wb_cloudy";
};

const addWeatherWidget = async () => {
  if (newLocation.value.trim() !== "") {
    await weatherStore.fetchWeather(newLocation.value);
    newLocation.value = "";
  }
};

const removeWidget = (index) => {
  weatherStore.removeWidget(index);
};

const tasks = ref([
  { label: "Tugas 1", value: "https://rifkyrahmel-projectcv.netlify.app/" },
  {
    label: "Tugas 2",
    value: "https://praktikum-pbk-tugas2.vercel.app/",
  },
  { label: "Tugas 3", value: "https://praktikum-rifky-pbk-3.vercel.app/" },
  {
    label: "Tugas 4",
    value:
      "https://rifky-223510044tugas4prak-rifky-rahmels-projects.vercel.app/",
  },
  { label: "Tugas 5", value: "https://tugas5-pbk-223510044-rifky.vercel.app/" },
  {
    label: "Tugas 6",
    value: "https://pert6-rifky-rahmels-projects.vercel.app/",
  },
]);

const selectedTask = ref(null);

const navigateToTask = () => {
  if (selectedTask.value) {
    window.location.href = selectedTask.value;
  }
};
</script>

<style scoped>
.input-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding: 12px;
  background-color: #e0f2f1; /* Light Teal */
  border-radius: 10px;
}

.tasks-section {
  position: absolute;
  top: 10px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
  z-index: 1000; /* Ensure the task section is on top */
}

.widgets-section {
  display: flex;
  flex-wrap: nowrap;
  gap: 24px;
  justify-content: flex-start;
  overflow-x: auto;
  padding: 24px;
  background-color: #ffffff; /* White */
  border-radius: 10px;
}

.weather-widget {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 260px;
  width: 260px;
  padding: 24px;
  background-color: #ffffff; /* White */
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  text-align: center;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.weather-widget:hover {
  transform: translateY(-8px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  background-color: #eeeeee; /* Light Grey */
}

.weather-widget h2 {
  font-size: 1.6em;
  margin: 12px 0;
  color: #00695c; /* Teal */
}

.weather-widget p {
  font-size: 1em;
  margin: 6px 0;
  color: #424242; /* Dark Grey */
}

.weather-widget .temperature p {
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 12px;
  color: #d32f2f; /* Red */
}

.weather-widget .details p {
  font-size: 0.95em;
  margin: 4px 0;
  color: #555555; /* Grey */
}

.q-icon {
  color: #ffab40; /* Orange */
}

.q-btn {
  margin-top: 12px;
}
</style>
