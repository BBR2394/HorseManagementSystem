<template lang="">
    <div>
        <div clas="columns">
            <div class="column is-one-fifth">
        <aside class="menu">
            <p class="menu-label">General</p>
            <ul class="menu-list">
                <li>
                    <a @click="selectedMenu = 'horses'"
                    :class="{ 'is-active': selectedMenu === 'horses'}">
                    Horses<router-link to="/horselist">Horses</router-link>
                    </a></li>
                <li>
                    <a @click="selectedMenu = 'stables'"
                    :class="{ 'is-active': selectedMenu === 'stables'}">Stables</a></li>
                <li>
                    <a @click="selectedMenu = 'owner'"
                    :class="{ 'is-active': selectedMenu === 'owner'}">Owner</a></li>
            </ul>
        </aside>
        </div>
        <div class="column">
            <p>toto</p>
            </div>
             <div class="column">
    Third column
  </div>
  <div class="column">
    Fourth column
  </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "NiouHome",
  data() {
    return {
      message: "Bonjour ",
      selectedMenu: true
    };
  }
};
</script>
<style lang="">
</style>