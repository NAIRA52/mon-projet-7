import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
// Routes login, profil et register
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Profil from './components/Profil.vue'
import ModifyProfil from './components/ModifyProfil.vue'
// Routes Messages
import ListMessages from './components/ListMessages.vue'
import PostMessage from './components/PostMessage.vue'
import GetOneMessage from './components/GetOneMessage.vue'
import ModifyMessage from './components/ModifyMessage.vue'
// Route Commentaires
import PostComment from './components/PostComment.vue'
import ModifyComment from './components/ModifyComment.vue'

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
        { path: '/getOneMessage/:messageId', name: 'getOneMessage', component: GetOneMessage },
        { path: '/modifyMessage/:messageId', name: 'modifyMessage', component: ModifyMessage },
        { path: '/postComment/:messageId', name: 'postComment', component: PostComment },
        { path: '/modifyComment/:commentId', name: 'modifyComment', component: ModifyComment },

    ]
})