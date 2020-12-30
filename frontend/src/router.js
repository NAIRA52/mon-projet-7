import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Profil from './components/Profil.vue'
import ModifyProfil from './components/ModifyProfil.vue'
import ListMessages from './components/ListMessages.vue'
import PostMessage from './components/PostMessage.vue'
import ModifyMessage from './components/ModifyMessage.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', component: Home },
        { path: '/login', component: Login },
        { path: '/register', component: Register },
        { path: '/user', component: Profil },
        { path: '/modifyProfil', component: ModifyProfil },
        { path: '/listMessages', component: ListMessages },
        { path: '/postMessage', component: PostMessage },
        { path: '/modifyMessage', component: ModifyMessage }
    ]
})