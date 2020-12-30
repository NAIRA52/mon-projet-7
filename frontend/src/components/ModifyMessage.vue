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
         <input type="file" @change="onChangeSelected">
      </div>
<router-link to="/listMessages" class="btn btn-primary btn-block" @click="onChangeUpload">Poster</router-link> 
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
          id: '',
          title: '',
          content: '',
          image: null
        }
  },

 methods: {
  onChangeSelected(event) {
 this.image= event.target.files[0]
 console.log(this.image)
},
 onChangeUpload(){
 const response = axios.put('message/id',{
    id: this.id,
     title: this.title,
     content: this.content,
     image: this.image
 })
 localStorage.getItem('token', response.data.token);
 }
 }
  }

</script>

<style>
 img {
  width:100%
}
</style>