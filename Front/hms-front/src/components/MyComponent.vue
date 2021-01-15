<template>
  <H1 >{{ titre }}</H1>
    <a v-bind:href="github" target="_blank" rel="noopener noreferrer"></a>
</template>

<script>
export default {
  data() {
    return {
      github: 'https://github.com/johnpapa/vue-getting-started',
    };
  },
};
</script>

<style>

</style>