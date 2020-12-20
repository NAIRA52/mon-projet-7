<template>
<form>
    <div class="form-group">
          <label>Présentation</label>
          <input type="text" class="form-control" v-model="bio" placeholder="Présentation"/>
    </div>
    <div class="btn">
        <a href="/user" @click="handleClickModify" class="button modify">Valider la modification</a>
    </div>
</form>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    name: 'ModifyProfil',
    data() {
    return{
    bio: ''
    }
},
    methods: {
    // Modifier la présentation de l'utilisateur
    async handleClickModify() {
       try {
        const response = await axios.put('user',{
        bio: this.bio

    });
    localStorage.getItem('token', response.data.token);
       }catch(e){
       this.error = 'Compte utilisateur modifié!'
   }
}
    },
computed: {
     ...mapGetters(['user'])
 }

}
</script>

<style>
.modify {
    width:auto;
}
</style>