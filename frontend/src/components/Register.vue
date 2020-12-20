<template>
  <form @submit.prevent="handleSubmit">
    <error v-if="error" :error="error" />
      <h3>Sign Up</h3>

      <div class="form-group">
          <label>Nom</label>
          <input type="text" class="form-control" v-model="username" placeholder="Votre prénom"/>
      </div>

        <div class="form-group">
          <label>Présentez-vous</label>
          <input type="text" class="form-control" v-model="bio" placeholder="Ex: j'adore le sport, le cinéma"/>
      </div>

      <div class="form-group">
          <label>Email</label>
          <input type="text" class="form-control" v-model="email" placeholder="Email"/>
      </div>

      <div class="form-group">
          <label>Mot de Passe</label>
          <input type="password" class="form-control" v-model="password" placeholder="Password"/>
      </div>

      <button class="btn btn-primary btn-block">Sign Up</button>
  </form>
</template>

<script>
import axios from 'axios'
import Error from './Error.vue'

export default {
name: 'Register',
components: {
  Error
},
data() {
    return {
username: '',
bio: '',
email: '',
password: '',
error: ''
    }
},
methods: {
  async handleSubmit() {
    try {
     await axios.post('signup', {
      username: this.username,
      bio: this.bio,
      email: this.email,
      password: this.password
    });

  this.$router.push('/login');
  } catch(e) {
    this.error = 'Compte déjà utilisé!';
  }
}
}
}
</script>

<style>

</style>