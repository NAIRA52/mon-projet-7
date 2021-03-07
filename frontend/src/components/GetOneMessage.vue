<template>
<form>
 <!-- Affichage du message -->
 <div>           
<div :key="message" v-if="message" class="p-5" >
    <router-link :to='`/modifyMessage/${messageId}`'>
   <tr class="text-left bg-dark text-light ">
        <!-- <td class="w-25 align-middle">Nom: {{user.username}}</td> -->
        <td class="w-25 align-middle">Title: {{message.title}}</td>
        <td class="w-25 align-middle">Message: {{message.content}}</td>
        <td class="w-25"><img :src="message.attachment" alt="image" class="img-fluid img-thumbnail w-75"></td>
   </tr>
</router-link> 
 </div>

 <!-- Poster un commentaire -->
        <div class="btn-success m-5 w-25">
<router-link :to='`/postComment/${messageId}`'>Poster un commentaire</router-link>
</div>

  <!-- Affichage du commentaire -->

 <div>
   <div :key="comment" v-for="comment in comments" class="p-5" >
     <router-link :to='`/modifyComment/${message.id}/${comment.id}`'>
   <tr class="text-left bg-dark text-light ">
        <td class="w-25 align-middle">Comment: {{comment.content}}</td>
   </tr>
   </router-link>

</div>
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
          messageId: this.$route.params.messageId,
          commentId: this.$route.params.commentId,
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
    .get(`messages/${this.messageId}/comment`)
    .then((response) => {
      this.comments = response.data;
    console.log(this.comments)
  });
  
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
form {
  padding: 5rem
}
</style>