<template lang="">
    <div>
        <ul class="list">
            <li v-for="itrv in medicInterventionList" :key="itrv.id" class="menu-list elem-in-list">
              <a
                class="list-item"
                @click="selectedData = itrv"
                :class="{ 'is-active': selectedData === itrv}">
                <span class="">
                    {{ itrv.note }}
                </span>
              </a>
            </li>
          </ul>
    </div>
</template>
<script>
import * as axios from "axios";
const apiAddr = "http://localhost:5008";

export default {
    name : "MedicInterventionsLists",  
    data() {
        return {
            medicInterventionList : [],
            selectedData: undefined

        }
    },
    methods: {
        async loadData() {
            const res = await axios.get(`${apiAddr}/medic/vet`);
            this.medicInterventionList = res.data;
        }
    },
    created() {
        this.loadData();
    }

}
</script>
<style lang="">
    
</style>