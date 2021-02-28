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
      content: '',
      token: ''
    }
},
methods: {
 onUpload(evt) {
   evt.preventDefault();

  this.token = JSON.parse(localStorage.getItem('token'));


  axios.post(`messages/${this.messageId}/comment/new`,{content: this.content}, {
    headers:{
       'Authorization': `Bearer ${this.token}`
    }
  })

  .then(response => {
    console.log(response)
    this.$router.push(`/getOneMessage/${this.messageId}`);

  })
  }
 }
 }

</script>

<style>

</style>