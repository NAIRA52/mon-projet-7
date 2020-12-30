<template>
<form>
  <!-- Poster un message -->
      <div class="btn">
<router-link to="/postMessage" @click="handleClickPostMessage" class="button post">Poster une discussion</router-link>
</div>
 <!-- Affichage du message -->
 <div v-if="user">
 <div :key="index" v-for="(message, index) in messages"  class="card m-5">
   <h3>Nom: {{user.username}}</h3>
  <h3>Title: {{message.title}}</h3>
  <h3>Message: {{message.content}}</h3>
  <img
    :src="message.attachment" 
    alt="image"
/>
<router-link to="/modifyMessage" class="button">Modifier le message</router-link>
</div>
 </div>
</form>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'ListMessages',
  data(){
        return {
          userId: '',
          messages: []
        }
  },
  mounted(){
    axios
    .get('messages')
    .then((response) => {
      this.messages = response.data;
    // console.log(this.messages)
  });
  
  },
  methods:{
    handleClickPostMessage() {
       this.$router.push('/postMessage')
    }
  },
   computed: {
      ...mapGetters(['user'])
   }
  
  }
</script>

<style>
 img {
  width:100%
}
</style>