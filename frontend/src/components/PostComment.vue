<template>
   <form>
      <h3>Poster une discussion</h3>
     
        <div class="form-group">
          <label>Message</label>
          <input type="text" class="form-control" v-model="content" placeholder="Le texte"/>
      </div>
    
       <a href="/getOneMessage/${message.id}" class="btn btn-primary btn-block" @click="onUpload">Poster</a> 
      </form>
</template>

<script>
import axios from 'axios'
export default {
    name: 'PostComment',
data() {
    return { 
          content: ''
   
    }
},
methods: {

onUpload() {
 const fd = new FormData();
 
  fd.append("content", this.content);

 axios
 .post('messages/comment/new',fd)
 .then(res => {
   console.log(res)
 })
//  this.$router.push('/listMessages')
 }
}
}

</script>

<style>

</style>