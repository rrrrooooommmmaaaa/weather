<template>
    <div v-if="info.main">
        <div class="info_header"><label>Информация о погоде выбранного города:</label></div>
        <div class="info">
            <label><img v-bind:src="loadCity" width="50px"> Город: {{ info.name }}</label><br>
            <label><img v-bind:src="loadHumidity" width="50px"> Влажность: {{ info.main.humidity }} f</label><br>
            <label><img v-bind:src="loadTemp" width="50px"> Температура: {{ (info.main.temp - 273.15).toFixed(2) }}°С</label><br>
            <label><img v-bind:src="loadPressure" width="50px"> Давление: {{ info.main.pressure }} Па</label><br>
            <label><img v-bind:src="loadDescription" width="50px"> Описание: {{ info.weather[0].description }}</label><br>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import city from '../img/city.png'
    import humidity from '../img/humidity.png'
    import temp from '../img/temp.png'
    import pressure from '../img/pressure.png'
    import description from '../img/description.png'

    export default {
        name: 'WeatherOnly',
        props: {
            city: String,
        },
        data() {
            return {
                info: {}
            }
        },
        mounted() {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=fe57b721fd47b8600afac45a7829c1ea`)
                .then((response) => this.info = response.data)
        },
        computed: {
            loadCity() {
                return city
            },
            loadHumidity() {
                return humidity
            },
            loadTemp() {
                return temp
            },
            loadPressure() {
                return pressure
            },
            loadDescription() {
                return description
            },
        },
    }
</script>

<style scoped>
    .info {
        margin-top: 130px;
        font-size: 35px;
        margin-left: 470px;
    }

    .info_header {
        font-size: 35px;
        text-align: center;
        margin-top: 50px;
    }
</style>
