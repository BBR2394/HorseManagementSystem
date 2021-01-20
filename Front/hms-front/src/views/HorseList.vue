<template >
  <div>
    <div class="container">
      <div class="columns">
  <div class="column is-three-fifths">
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
      <div class="field">{{ selectedHorse.horse_name | fulli }}</div>
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
    <!-- button to add a horse -->
    <div>
      <button class="button is-primary " v-on:click="showNewCard" v-show="!newHorse">+</button>
    </div>
    <!-- to add new horse -->
    <div v-show="newHorse">
        {{ fullInfo }}
        <div class="field">
          <div class="control">
            <input class="input is-primary" id="name" type="text" placeholder="new horse name" required minlength="2" maxlength="255" v-model="newHorseCard.horse_name">
            <div class="select">
              <select v-model="ownerSelected">
                <option v-for="owner in owners" :key="owner.id" >{{ ownerNameFormated(owner) }}</option>
              </select>
            </div>
            <div class="select">
              <select v-model="sexSelected">
                <option v-for="sx in sexs" :key="sx.id" >{{ sx.sex_name }}</option>
              </select>
            </div>
            <div class="select">
              <select v-model="coatSelected">
                <option v-for="ct in coats" :key="ct.id" >{{ ct.color_name }}</option>
              </select>
            </div>
          </div>
        </div>
        <p>{{ newHorseCard.name }} </p>
        <button class="button is-primary is-rounded" v-on:click="ValidateNewwHorse" >Validate</button>
    </div>
  </div>
    <div class="column">
    Second column
  </div>
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
      ownerSelected: undefined,
      sexSelected: undefined,
      coatSelected: undefined,
      showMore: false,
      message: "horse list",
      newHorse: false,
      horses: [],
      owners: [],
      coats: [],
      sexs: [],
      counter: 0,
      newHorseCard: {
            horse_name: null,
            size: null,
            coat: null,
            sex: null,
            owner: null
      }
    };
  },
  filters: {
        fulli: function(str) {
            return `Le cheval sélectionné est : ${str}`;
        }
    },
  computed: {
    fullInfo() {
      if (this.newHorseCard.horse_name === null) {
        return "ajout d'un nouveau cheval"
      } else {
        return `Le cheval à ajouter est : ${this.newHorseCard.horse_name}`;
      }
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
      this.loadOtherData();
      console.log("j'ai appuyé sur le bouton");
    },
    ownerNameFormated: function (ownr) {
      return `${ownr.lastname}  ${ownr.firstname}`
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
        console.log(this.newHorseCard.horse_name);
        console.log(this.ownerSelected);
        console.log(this.sexSelected);
        console.log(this.coatSelected);
        this.newHorseCard.sex = this.sexSelected;
        this.newHorseCard.coat = this.coatSelected;
        //this.newHorseCard.o
        this.postHorse(this.newHorseCard);
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
    async getOwners() {
      const res = await axios.get(`${apiAddr}/owners`);
      this.owners = res.data;
      console.log(this.owners);
    },
    async getSex() {
      const res = await axios.get(`${apiAddr}/characteristic/sex`);
      this.sexs = res.data;
      console.log(this.sexs);
    },
    async getCoat() {
      const res = await axios.get(`${apiAddr}/characteristic/coat`);
      this.coats = res.data;
      console.log(this.coats);
    },
    async postHorse(hrs) {
      if (hrs.horse_name != null) {
        const res = await axios.post(`${apiAddr}/horses`, hrs);
        console.log(res);
        this.loadHorses();
      }
    },
    //we need to create another function, if we call directly getHorses() from created() it doesnt work
    async loadHorses() {
      this.horses = [];
      this.message = "getting the horse, please be patient";
      this.horses = await this.getHorses();
      this.message = "";
    },
    async loadOtherData() {
      console.log("we reach other useful data");
      this.getOwners();
      this.getSex();
      this.getCoat();

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