<template lang="">
    <div>
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
        <router-link to="/">Home</router-link>
      </a>
      <a class="navbar-item">
        <router-link to="/horselist">Horses</router-link>
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
      <a class="navbar-item">
        <router-link to="/medinterv">Medical Intervention</router-link>
      </a>
      <a class="navbar-item">
        <router-link to="/testview">View to Test Bulma</router-link>
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