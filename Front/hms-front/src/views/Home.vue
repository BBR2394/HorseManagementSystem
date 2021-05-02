<template>
  <div class="home">
    <div class="container">
      <div class="column is-one-third">
        <img alt="Vue logo" src="../assets/hms_icone.png" width="258px" height="258ppx">
      </div> 
      <div class="column ">
        <h1>Welcom to Horse Management System</h1>
        <p>This is a new alication and innovative to manage their horse in our stable</p>
      </div>
      <div class="column">
        <HorseDetails :horseid="4"/>
      </div>
    </div>
    <!--HelloWorld msg="Welcome to Your Vue.js App"/-->
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import HorseDetails from '@/components/HorseDetails.vue'

export default {
  name: 'Home',
  data() {
    return {
      intro: "ceci est l apage d'accueil de HMS"
    }
  },
  components: {
    HorseDetails
  }
}
</script>
