<template>
   <form>
      <h3>Poster une discussion</h3>
      <div class="form-group">
          <label>Titre</label>
          <input type="text" class="form-control" v-model="title" placeholder="Le titre"/>
      </div>
        <div class="form-group">
          <label>Message</label>
          <input type="text" class="form-control" v-model="content" placeholder="Le texte"/>
      </div>
      <div class="form-group">
         <input type="file" @change="onFileSelected">
      </div>
       <a href="/listMessages" class="btn btn-primary btn-block" @click="onUpload">Poster</a> 
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

 axios.post('messages/message/new',fd)
 .then(res => {
   console.log(res)
 })
 }
}
}

</script>

<style>

</style>