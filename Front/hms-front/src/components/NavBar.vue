<template lang="">
    <div>
        <div clas="columns">
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
        </div>
    </div>
</template>
<script>
export default {
    name: "navBar"
}
</script>
<style lang="">
    
</style>