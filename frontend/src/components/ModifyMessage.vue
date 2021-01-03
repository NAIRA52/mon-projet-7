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
         <input type="file">
      </div>
      <a href="/listMessages" class="btn btn-primary btn-block" @click="onChangeUpload">Poster</a> 
<button class="button">Supprimer le message</button>
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
 onChangeUpload(){
   const fd = new FormData();
  fd.append("title", this.title);
  fd.append("content", this.content);
fd.append('image', this.image);
const response = axios.put('message/${this.messageId}',fd)
  .then(res => {
   console.log(res)
   this.$router.push('/listMessages')
 })
localStorage.getItem('token', response.data.token) 
 }

  }
  }

</script>

<style>
 img {
  width:100%
}