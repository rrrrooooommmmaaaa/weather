import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Weather from './components/Weather.vue'
import WeatherOnly from './components/WeatherOnly.vue'

const routes = [
    { path: '/', component: Weather },
    { path: '/:city', component: WeatherOnly, props: true},
]

const router = new VueRouter({
    routes,
})

Vue.use(VueRouter)

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
