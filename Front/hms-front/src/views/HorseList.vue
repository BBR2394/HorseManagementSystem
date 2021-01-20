<template >
  <div>
    <div class="container">
    <h1>Liste des chevaux</h1>
    <ul class="horse-list">
      <li v-for="horse in horses" :key="horse.id" class="menu-list horse-elem-in-list">
        <a class="list-item" @click="selectedHorse = horse"
            :class="{ 'is-active': selectedHorse === horse}">
          <span class="title">
              {{ horse.horse_name }}
            <button class="button is-primary " v-on:click="goToShowMore(horse)" v-show="selectedHorse === horse">+</button>
          </span>
        </a>
      </li>
    </ul>
    <p v-if="message">{{ message }}</p>
    <div v-if="selectedHorse">
      <div class="field">{{ fullInfo }}</div>
      <label for="show" class="checkbox">
        <input type="checkbox" class="is-primary" id="show" v-model="showMore" />
      </label>
      <!-- show more info fields -->
      <div v-show="showMore">
        <div class="field">Size : {{ selectedHorse.size }}</div>
        <div class="field">Coat color : {{ selectedHorse.colorname }}</div>
        <div class="field">Last name Owner : {{ selectedHorse.lastname }}</div>
      </div>
    </div>
    <div>
      <button class="button is-primary " v-on:click="showNewCard" v-show="!newHorse">+</button>
    </div>
    <!-- to add new horse -->
    <div v-show="newHorse">
        <input type="text" id="name" placeholder="new horse name" required minlength="2" maxlength="255" v-model="newHorseCard.name">
        <p>{{ newHorseCard.name }} </p>
        <button class="button is-primary is-rounded" v-on:click="ValidateNewwHorse" >Validate</button>
    </div>
    </div>
  </div>
</template>

<script>
/*const horsesConst = [
  {
    horse_id: 1,
    horse_name: "Gladiateur",
    size: 2,
    coat: "3",
    father: "0",
    mother: "0",
    sex: "3",

firstname: "",
lastname: "",
colorname: "unknow",current_owner: "1",
    created_on: "2021-01-03T18:45:48.010Z"
  },
  {
    horse_id: 2,
    horse_name: "Bojack Horseman",
    size: 2,
    coat: "3",
    father: "0",
    mother: "0",
    sex: "1",
firstname: "",
lastname: "",
colorname: "unknow",current_owner: "1",
    created_on: "2021-01-03T18:45:48.010Z"
  },
  {
    horse_id: 5,
    horse_name: "test un",
    size: null,
    coat: null,
    father: null,
    mother: null,
    sex: null,
    firstname: "",
    lastname: "",
    colorname: "unknow",
    current_owner: null,
    created_on: "2021-01-03T18:48:37.768Z"
  },
  {
    horse_id: 6,
    horse_name: "Toto",
    size: null,
    coat: null,
    father: null,
    mother: null,
    sex: null,
    firstname: "",
    lastname: "",
    colorname: "unknow",
    current_owner: null,
    created_on: "2021-01-03T18:49:57.663Z"
  },
  {
    horse_id: 7,
    horse_name: "Toto",
    size: null,
    coat: null,
    father: null,
    mother: null,
    sex: null,
    firstname: "",
    lastname: "",
    colorname: "unknow",
    current_owner: null,
    created_on: "2021-01-03T18:50:23.846Z"
  }
];*/

/*const coat = [
    {

    }
]*/
import * as axios from 'axios';
const apiAddr = "http://localhost:5008";
export default {
  name: "HorseList",

  //model ce sont les variable
  data() {
    return {
      selectedHorse: undefined,
      showMore: false,
      message: "horse list",
      newHorse: false,
      horses: [],
      counter: 0,
      coat: [],
      newHorseCard: {
          "name": "Rien",
          "coat": "",
      }
    };
  },
  computed: {
    fullInfo() {
      return `Le cheval selectionné est : ${this.selectedHorse.horse_name}`;
    }
  },
  watch: {
    //if we want to "watch" and react if a data change
  },
  methods: {
      goToShowMore: function(selectedHorseToShowMore) {
          console.log("we are going to show more information from");
          console.log(selectedHorseToShowMore.name)
      },
    showNewCard: function () {
      this.newHorse = true;
      console.log("j'ai appuyé sur le bouton");
    },
    greet: function (event) {
      // `this` fait référence à l'instance de Vue à l'intérieur de `methods`
      alert('Bonjour ' + this.name + ' !')
      // `event` est l'évènement natif du DOM
      if (event) {
        alert(event.target.tagName)
      }
    },
    ValidateNewwHorse: function() {
        console.log("je vais valider un nouveau cheval");
    },
    async getHorses() {
      this.horses = [];
      const res = await axios.get(`${apiAddr}/horses`)
      const dataReceived = res.data;
      console.log("les données recu :");
      console.log(dataReceived);
      return dataReceived;
      /*return new Promise(resolve => {  
        setTimeout(() => resolve(horsesConst), 150);
      });*/
    },
    //we need to create another function, if we call directly getHorses() from created() it doesnt work
    async loadHorses() {
      this.horses = [];
      this.message = "getting the horse, please be patient";
      this.horses = await this.getHorses();
      this.message = "";
    }
  },
  created() {
    this.loadHorses();
  }
};
</script>

<style>
.is-selected {
  color: red;
}
</style>