<template>
<div class="auth-wrapper">
    <div class="auth-inner">
<div>
    <h3 v-if="user">Bonjour, {{user.username}}</h3>
<h3 v-if="!user">Vous n'êtes pas connecté!</h3>
</div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
name: 'Home',
computed: {
    ...mapGetters(['user'])
}

}


</script>

<style>

</style>