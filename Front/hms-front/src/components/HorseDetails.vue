<template>
    <div>
        {{ intro }}
        <div class="card">
          <div class="card-content">
            <div class="content">
              <div>
                <p>{{ horseData.horse_name }}</p>
                <p>{{ horseData.horse_id }}</p>
                <p>{{ printDate }}</p>
                toto
              </div>
              <!-- <div v-else>
                Pas de données encore
              </div> -->
            </div>
          </div>
      </div>
    </div>
</template>
<script>
import * as axios from "axios";
const apiAddr = "http://localhost:5008";

export default {
  name: 'horse_detail',
  props: {
    horseid: {
      type: Number,
      default: -1
    },
  },
  data() {
    return {
      intro: 'composant detail pour un cheval',
      horseData: ''
    }
  },
  watch: {

  },
  computed: {
    printDate() {
      return this.horseData.horse_name
    }
  },
  methods: {
     getOneHorse () {
      axios.get(`${apiAddr}/horses`, {
        params: {
          id: this.horseid
        }
      }).then( elem => {
        const dataReceived = elem.data[0];
        console.log(`les données recu pour un chevald'id = ${this.horseid} :`);
        console.log(dataReceived);
      });
    
    },
    loadData () {
      this.getOneHorse()
    }
  },
  created () {
    this.loadData();
    console.log('created')
  },
    
}
</script>
<style lang="">
    
</style>