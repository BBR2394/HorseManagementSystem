<template lang="">
    <div>
        <!--div clas="columns">
            <div class="column is-one-fifth">
                <img alt="Vue logo" src="../assets/hms_icone.png">
            <aside class="menu">
            <p class="menu-label">General</p>
            <ul class="menu-list">
                <li>
                    <a @click="selectedMenu = 'horses'"
                    :class="{ 'is-active': selectedMenu === 'horses'}">
                    <router-link to="/horselist">Horses</router-link>
                    </a></li>
                <li>
                    <a @click="selectedMenu = 'stables'"
                    :class="{ 'is-active': selectedMenu === 'stables'}">
                    <router-link to="/stableslist">Stables</router-link>
                    </a></li>
                <li>
                    <a @click="selectedMenu = 'owner'"
                    :class="{ 'is-active': selectedMenu === 'owner'}">
                    <router-link to="/about">Owner</router-link>
                    </a></li>
            </ul>
            </aside>
            </div>
        </div-->
              <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a >
      <img alt="HMS Logo" src="../assets/hms_icone.png" width="100" height="100">
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
        <router-link to="/ownerlist">Owners</router-link>
      </a>

      <a class="navbar-item">
        <router-link to="/vetlist">Vetirinarians</router-link>
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
    </div>
</template>
<script>
export default {
  name: "navBar"
};
</script>
<style lang="">
</style>