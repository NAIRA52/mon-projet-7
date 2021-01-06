<template>
<form>
  <!-- Poster un message -->
      <div class="btn-danger m-5">
<router-link to="/postMessage">Poster une discussion</router-link>
</div>

 <router-view />
 <!-- Affichage du message -->

 <div>
   <div :key="message" v-for="message in messages" class="p-5" >
     <router-link :to='`/modifyMessage/${message.id}`'>
   <tr class="text-left bg-dark text-light ">
        <td class="w-25 align-middle">Nom: {{user.username}}</td>
        <td class="w-25 align-middle">Title: {{message.title}}</td>
        <td class="w-25 align-middle">Message: {{message.content}}</td>
        <td class="w-25"><img :src="message.attachment" alt="image" class="img-fluid img-thumbnail w-75"></td>
   </tr>
        
       
 <!-- <div :key="message" v-for="message in messages"  class="card m-5">
   <router-link :to='`/modifyMessage/${message.id}`'>
   <h3>Nom: {{user.username}}</h3>
  <h3>Title: {{message.title}}</h3>
  <h3>Message: {{message.content}}</h3>
  <img
    :src="message.attachment" 
    alt="image"
/> -->
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
    .get('messages/messages')
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
form {
  padding: 5rem
}
</style>