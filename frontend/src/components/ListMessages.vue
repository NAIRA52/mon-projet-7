<template>
<form>
  <!-- Poster un message -->
      <div class="btn">
<router-link to="/postMessage" class="button post">Poster une discussion</router-link>
</div>
 <router-view />
 <!-- Affichage du message -->
 <div>
 <div :key="message" v-for="message in messages"  class="card m-5">
   <router-link :to='`/modifyMessage/${message.id}`'>
   <h3>Nom: {{user.username}}</h3>
  <h3>Title: {{message.title}}</h3>
  <h3>Message: {{message.content}}</h3>
  <img
    :src="message.attachment" 
    alt="image"
/>
</router-link>
</div>
<router-view/>
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
          messages: []
        }
  },
  mounted(){
    axios
    .get('messages')
    .then((response) => {
      this.messages = response.data;
    console.log(this.messages)
  });
  
  },
  // methods:{
  //   handleClickPostMessage() {
  //      this.$router.push('/postMessage')
  //   }
  // },
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