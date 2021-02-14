<template>
   <form>
      <h3>Poster une discussion</h3>
     
        <div class="form-group">
          <label>Message</label>
          <input type="text" class="form-control" v-model="content" placeholder="Le texte"/>
      </div>
    <button class="btn btn-primary btn-block" @click="onUpload" >Poster</button> 
       <!-- <a href="/getOneMessage/${messageId}" class="btn btn-primary btn-block" @click="onUpload">Poster</a>  -->
      </form>
</template>

<script>
import axios from 'axios'

export default {
    name: 'PostComment',
data() {
    return { 
      messageId: this.$route.params.messageId,
      userId: this.$route.params.UserId,
      content: ''
    }
},
methods: {
 onUpload(evt) {
   evt.preventDefault();
  const fd = new FormData();
   fd.append("content", this.content),

  axios.post(`messages/${this.messageId}/comment/new`,fd)
    
  .then(response => {
    localStorage.setItem('token', response.data.token);
    this.$router.push(`/getOneMessage/:messageId`);
    console.log(response)
  })
  }
 }
 }

</script>

<style>

</style>