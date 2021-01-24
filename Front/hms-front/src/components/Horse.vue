<template>
  <!-- I will used this with rops to be better for horse list -->
  <div class="horse">
    <h1> {{ message }} </h1>
    <div class="card">
      <p>{{ horse.name }} </p>
      <p>{{ horse.id }} </p>
      <p>{{ horse.note }} </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Horse',
  data () {
    return {
      message: "le titre de la page",
      horse: {
        id: 42,
        name: "Gladi",
        note: "rien de special "
      }
    };
  },
  methods: {
    cancelHero() {
        this.message = "canceld"
      },
      saveHero() {
        this.message = JSON.stringify(this.hero, null, '\n')
      }
    }
  }
</script>

<!--
On peut aussi faire son stylme pour seulement ce composant
<style lang="stylus">

</style>
 -->
<style>

</style>