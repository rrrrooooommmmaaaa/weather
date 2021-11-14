<template>
    
    <!-- Блок добавления города в массив и вывода списка городов -->
    <div class="block">
        <!-- Блок добавления городов -->
        <div class="block_custom_city">
            <div class="add">
                <label><h3>Добавление города</h3></label><hr>
                <input type="text" v-model="inputCity"><br><br>
                <button @click="addCity()">Добавить город</button>
            </div>
            <!-- Блок списка городов -->
            <div class="block_spisok" v-if="cities.length">
                <label><h3>Выбор города</h3></label><hr>
                <select name="cities" v-model="selectedCity" style="width: 170px;">
                    <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
                </select><br><br>
                <button><router-link :to="'/' + selectedCity">Посмотреть погоду</router-link></button>
            </div>
            <div class="block_empty" v-else>
                <label> ← Вы не добавили ни одного города =( Добавьте его!</label>
            </div>
        </div>

        <div class="block_geo_info">
            <div v-if="info.main" class="info">
                <label><h3>Погода в городе, в котором Вы находитесь</h3></label>
                <div class="info_only">
                    <label><img v-bind:src="loadCity" width="30px"> Город: {{ info.name }}</label><br>
                    <label><img v-bind:src="loadHumidity" width="30px"> Влажность: {{ info.main.humidity }} f</label><br>
                    <label><img v-bind:src="loadTemp" width="30px"> Температура: {{ (info.main.temp - 273.15).toFixed(2) }}°С</label><br>
                    <label><img v-bind:src="loadPressure" width="30px"> Давление: {{ info.main.pressure }} Па</label><br>
                    <label><img v-bind:src="loadDescription" width="30px"> Описание: {{ info.weather[0].description }}</label><br>
                </div>
            </div>
            <div class="block_empty" v-else>
                <label> Пожалуйста, разрешите доступ к своему местоположению.</label>
            </div>
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
        name: 'Weather',
        data() {
            return {
                inputCity: '',
                cities: [],
                info: {},
                selectedCity: '',
            }
        },
        mounted() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=fe57b721fd47b8600afac45a7829c1ea`)
                        .then((response) => this.info = response.data)
                })
            }


            if(localStorage.getItem("cities") !== '') 
            this.cities = JSON.parse(localStorage.getItem("cities") || "[]");
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
        methods: {
            addCity() {
                this.cities.push(this.inputCity)
                this.selectedCity = this.inputCity
                this.inputCity = ''
                
                
                localStorage.setItem("cities", JSON.stringify(this.cities))
            },
        }
    }
</script>

<style scoped>
    .block {
        margin-top: 100px;
        margin-left: 450px;
    }
    
    .block_custom_city {
        display: flex;
    }

    .block_spisok {
        padding-left: 65px;
    }

    .block_empty {
        padding-top: 70px;
    }

    .block_geo_info {
        padding-top: 80px;
    }

    .info_only {
        margin-left: 110px;
    }

    .info {
        margin-left: 38px;
    }

    a {
        text-decoration: none;
        color: white;
    }

    button {
        background-color: rgb(32, 32, 255);
        color: white;
        width: 150px;
        height: 30px;
    }
</style>
