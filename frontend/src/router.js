import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Profil from './components/Profil.vue'
import ModifyProfil from './components/ModifyProfil.vue'
import ListMessages from './components/ListMessages.vue'
import PostMessage from './components/PostMessage.vue'
// import OneMessage from './components/OneMessage.vue'
import ModifyMessage from './components/ModifyMessage.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', name: 'Home', component: Home },
        { path: '/login', name: 'login', component: Login },
        { path: '/register', name: 'register', component: Register },
        { path: '/profil', name: 'profil', component: Profil },
        { path: '/modifyProfil', name: 'modifyProfil', component: ModifyProfil },
        { path: '/listMessages', name: 'listMessages', component: ListMessages },
        { path: '/postMessage', name: 'postMessage', component: PostMessage },
        // { path: '/oneMessage/:messageId', name: 'oneMessage', component: OneMessage },
        { path: '/modifyMessage/:messageId', name: 'modifyMessage', component: ModifyMessage }
    ]
})