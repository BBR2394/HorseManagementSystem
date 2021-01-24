<template lang="fr">
    <div>
    <div class="columns">

        <div class="column is-two-fifths">
        <ul class="stables-lists">
        <li v-for="stb in stables" :key="stb.id" class="menu-list stable-elem-in-list">
            <a class="list-item" @click="selectedStables = stb"
            :class="{ 'is-active': selectedStables === stb}">
            <span class="title">
              {{ stb.stable_name }}
            </span>
            
            </a>
        </li>

        </ul>
        </div>
        <div class="column">
                    <div v-if="selectedStables">
                {{ selectedStables.stable_name }}</br>
                {{ selectedStables.address }}</br>
                postcode : {{ selectedStables.postcode }}</br>
                Available total place : {{ selectedStables.place_available }}
            </div>
        </div>
    </div> 
    </div>
</template>
<script>
import * as axios from 'axios';
const apiAddr = "http://localhost:5008";

export default {
    
    name : "StablesList",
    data() {
        return {
            selectedStables : undefined,
            showMore : false,
            message : "nothing to show",
            stables : []
        }
    },
    filters: {
        capitalize: function(str) {
            return str.charAt(0).toUpperCase() + str.slice(1)
        }
    },
    methods: {
        async getStables() {
            const res = await axios.get(`${apiAddr}/stables`);
            this.stables = res.data;
            console.log(this.stables);
        },
        async loadStables() {
            this.getStables();
        }
    },
    created() {
        this.loadStables();
    }
}
</script>
<style lang="">
    
</style>