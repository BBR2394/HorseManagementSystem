<template lang="">
    <div>
        <div class="container">
          <article class="media">
  <div class="media-content">
    <div class="content">
      <ul class="list">
            <li v-for="itrv in medicInterventionList" :key="itrv.id" class="menu-list elem-in-list">
              <a
                class="list-item"
                @click="selectedData = itrv"
                :class="{ 'is-active': selectedData === itrv}">
                <span class="">
                    <strong>{{ itrv | vetName }}</strong><br>
                    {{ itrv.horse_name | horseName}}<br>
                    <strong class="type_medic">{{ itrv.type_medic_name | medType }}</strong>
                    <br>
                    {{ itrv.note  }}
                </span>
              </a>
            </li>
          </ul>
    </div>
  </div>
</article>
    </div>
    </div>
</template>
<script>
import * as axios from "axios";
const apiAddr = "http://localhost:5008";

export default {
  name: "MedicInterventionsLists",
  data() {
    return {
      medicInterventionList: [],
      selectedData: undefined
    };
  },
  filters: {
    vetName(data) {
      return `Veterinarian : Dr ${data.lastname} ${data.firstname}`;
    },
    horseName(hrd) {
        return `Horse : ${hrd}`;    
    },
    medType(data) {
        return `Medical Intervention : ${data}`;
    }
  },
  methods: {
    async loadData() {
      const res = await axios.get(`${apiAddr}/medic/intervention`);
      this.medicInterventionList = res.data;
    }
  },
  created() {
    console.log("created -> " + this.name);
    this.loadData();
  }
};
</script>
<style>
.type_medic {
    color: red;
}
</style>