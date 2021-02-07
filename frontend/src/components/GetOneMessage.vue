<template>
<form>
 <!-- Affichage du message -->

 
 <div>           
<div :key="message" v-if="message" class="p-5" >
    <router-link :to='`/modifyMessage/${message.id}`'>
   <tr class="text-left bg-dark text-light ">
        <!-- <td class="w-25 align-middle">Nom: {{user.username}}</td> -->
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
 
        <div class="btn-success m-5 w-25">
<router-link :to='`/postComment`'>Poster un commentaire</router-link>
</div>
 <router-view />
  <!-- Affichage du commentaire -->

 <div>
   <div :key="comment" v-for="comment in comments" class="p-5" >
     <router-link :to='`/getOneMessage/${message.id}`'>
   <tr class="text-left bg-dark text-light ">
        <!-- <td class="w-25 align-middle">Nom: {{user.username}}</td> -->
        <!-- <td class="w-25 align-middle">Title: {{message.title}}</td> -->
        <td class="w-25 align-middle">Comment: {{comment.content}}</td>
        <!-- <td class="w-25"><img :src="message.attachment" alt="image" class="img-fluid img-thumbnail w-75"></td> -->
   </tr>
   </router-link>

</div>
   <!-- <div :key="comment" v-for="comment in comments" class="p-5" >
   <tr class="text-left bg-dark text-light ">
         <td class="w-25 align-middle">Nom: {{user.username}}</td> 
        <td class="w-25 align-middle">Commentaire: {{comment.content}}</td>
       
   </tr>
   
</div> -->
<router-view/>
 </div>
</div>
</form>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'GetOneMessage',
  data(){
        return {
          message: [],
          comments: []
        }
  },
  mounted(){
    axios
    .get('messages/message/:id')
    .then((response) => {
      this.message = response.data;
    console.log(this.message)
  });
  
  },
  created(){
    axios
    .get('messages/comment/message')
    .then((response) => {
      this.comment = response.data;
    console.log(this.comment)
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