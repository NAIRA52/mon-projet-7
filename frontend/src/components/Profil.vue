<template>
<form>
    <div v-if="user" class="card">
  <h3>Nom: {{user.username}}</h3>
  <h4 class="bio">Présentation: {{user.bio}}</h4>
  <h5 class="email">Contact: {{user.email}}</h5>
<router-link to="/" @click="handleClickDelete" class="button delete">Supprimer le compte</router-link>
<router-link to="/modifyProfil" class="button">Modifier la présentation</router-link>
    </div>
</form>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    name: 'Profil',
    data() {
    return{
    userId: ''
    }
},
    methods: {
    // supprimer le compte utilisateur
    async handleClickDelete() {
       try {
        const response = await axios.delete('user',{
        userId: this.userId
    });
    localStorage.clear('token', response.data.token);
    this.$router.push('/');
   } catch(e) {
       this.error = 'Compte utilisateur supprimé!'
   }
}
    },
 computed: {
      ...mapGetters(['user'])
  }

}
</script>

<style>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: center;
  font-family: arial;
}

.title {
  color: grey;
  font-size: 18px;
}

.button {
  border: 2px;
  margin: 2px;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #3498DB;
  text-align: center;
  cursor: pointer;
  width: 50%;
  font-size: 18px;
}
 .delete {
     background-color: rgb(235, 35, 35);
 }

a {
  text-decoration: none;
    font-size: 22px;
  color: black;
}

button:hover, a:hover {
  opacity: 0.7;
}
</style>