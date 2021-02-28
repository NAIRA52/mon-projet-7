<template>
<form>
 <div class="card m-5">
 <div class="form-group"> 
          <label>Titre</label>
          <input type="text" class="form-control" v-model="title" placeholder="Le titre"/>
      </div>
        <div class="form-group">
          <label>Message</label>
          <input type="text" class="form-control" v-model="content" placeholder="Ex: j'adore le sport, le cinéma"/>
      </div>
      <div class="form-group">
         <input type="file" @change="onChangeUpload">
      </div>
      <button class="btn btn-primary btn-block" @click="buttonChange" >Poster</button> 
<button class="button" @click="buttonDeleteMessage" >Supprimer le message</button>
</div>

</form>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ModifyMessage',
  data() {
        return {

         messageId: this.$route.params.messageId,
         title:'',
         content:'',
         image: null
        }
  },

 methods: {
   //Modifier l'image
   onChangeUpload(event){
this.image= event.target.files[0]
 console.log(this.image)
   },
   //Modifier un message
 buttonChange(evt){
    evt.preventDefault();
   const fd = new FormData();
  fd.append("title", this.title);
  fd.append("content", this.content);
fd.append('image', this.image);
 axios.put(`messages/message/${this.messageId}`,fd)
  .then(res => {
    this.$router.push('/listMessages');
   console.log(res)

 })

 },
  // supprimer un message
  buttonDeleteMessage(evt){
evt.preventDefault();
 axios.delete(`messages/message/${this.messageId}`)
  .then(res => {
    this.$router.push('/listMessages');
   console.log(res)
  })
  }
  }
}
  </script>

<style>

</style>