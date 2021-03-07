<template>
<form>
 <div class="card m-5">
 <div class="form-group"> 
        <div class="form-group">
          <label>Message</label>
          <input type="text" class="form-control" v-model="content" placeholder="Ex: j'adore le sport, le cinéma"/>
      </div>
      <button class="btn btn-primary btn-block" @click="buttonChangeComment" >Poster</button> 
<button class="button" @click="buttonDeleteComment" >Supprimer le message</button>
</div>
 </div>
</form>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ModifyComment',
  data() {
        return {

         commentId: this.$route.params.commentId,
         messageId: this.$route.params.messageId,
         content:''
        }
  },

 methods: {
   //Modifier un commentaire
 buttonChangeComment(evt){
    evt.preventDefault();

 axios.put(`messages/comment/${this.commentId}`,{content: this.content})

 .then(res => {
    this.$router.push(`/getOneMessage/${this.messageId}`);
   console.log(res)

 })

 },
  // supprimer un commentaire
  buttonDeleteComment(evt){
evt.preventDefault();
 axios.delete(`messages/comment/${this.commentId}`)
  .then(res => {
    this.$router.push(`/getOneMessage/${this.messageId}`);
   console.log(res)
  })
  }
  }
}
  </script>

<style>

</style>