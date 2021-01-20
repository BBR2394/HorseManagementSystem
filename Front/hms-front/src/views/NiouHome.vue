<template lang="">
    <div>
      <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
    </a>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item">
        <router-link to="/horselist">Horses</router-link>
      </a>
      <a class="navbar-item">
        Documentation
      </a>

      <a class="navbar-item">
        <router-link to="/stableslist">Stables</router-link>
      </a>
      <a class="navbar-item">
        <router-link to="/about">Owner</router-link>
      </a>

    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">
            Log in
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>
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