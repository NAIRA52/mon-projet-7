<template>
   <form>
      <h3>Poster une discussion</h3>
      <div class="form-group">
          <label>Titre</label>
          <input type="text" class="form-control" v-model="title" placeholder="Votre prénom"/>
      </div>
        <div class="form-group">
          <label>Message</label>
          <input type="text" class="form-control" v-model="content" placeholder="Ex: j'adore le sport, le cinéma"/>
      </div>
      <div class="form-group">
         <input type="file" @change="onFileSelected">
      </div>
       <button class="btn btn-primary btn-block" @click="onUpload">Poster</button> 
      </form>
</template>

<script>
import axios from 'axios'
export default {
    name: 'PostMessage',
data() {
    return {
        
          title: '',
          content: '',
          image: null
    }
},
methods: {
  onFileSelected(event) {
 this.image= event.target.files[0]
 console.log(this.image)
},
onUpload() {
 const fd = new FormData();
  fd.append("title", this.title);
  fd.append("content", this.content);
fd.append('image', this.image);
 axios.post('message/new',fd)
 .then(res => {
   console.log(res)
 })
 this.$router.push('/listMessages')
 }
}
}

</script>

<style>

</style>