<template >
  <div>
    <div class="container">
      <div class="columns">
        <div class="column is-two-fifths">
          <h1>Liste des chevaux</h1>
          <ul class="horse-list">
            <li v-for="horse in horses" :key="horse.id" class="menu-list horse-elem-in-list">
              <a
                class="list-item"
                @click="selectedHorse = horse"
                :class="{ 'is-active': selectedHorse === horse}"
              >
                <span class="title">
                  {{ horse.horse_name }}
                  <button
                    class="button is-primary is-light"
                    v-on:click="addMedicIntervention(horse)"
                    v-show="selectedHorse === horse"
                  >+</button>
                  <button
                    class="button is-primary is-link is-light"
                    v-on:click="assignToNewStable(horse)"
                    v-show="selectedHorse === horse"
                  >-></button>
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
            <button class="button is-primary" v-on:click="showNewCard" v-show="!newHorse">+</button>
          </div>
          <!-- to add new horse -->
          <div v-show="newHorse">
            {{ fullInfo }}
            <div class="field">
              <div class="control">
                <input
                  class="input is-primary"
                  id="name"
                  type="text"
                  placeholder="new horse name"
                  required
                  minlength="2"
                  maxlength="255"
                  v-model="newHorseCard.horse_name"
                />
                <div class="select">
                  <select v-model="ownerSelected">
                    <option v-for="owner in owners" :key="owner.id">{{ ownerNameFormated(owner) }}</option>
                  </select>
                </div>
                <div class="select">
                  <select v-model="sexSelected">
                    <option v-for="sx in sexs" :key="sx.id">{{ sx.sex_name }}</option>
                  </select>
                </div>
                <div class="select">
                  <select v-model="coatSelected">
                    <option v-for="ct in coats" :key="ct.id">{{ ct.color_name }}</option>
                  </select>
                </div>
              </div>
            </div>
            <p>{{ newHorseCard.name }}</p>
            <button class="button is-primary is-rounded" v-on:click="ValidateNewwHorse">Validate</button>
          </div>
        </div>
        <div class="column">
          <!-- to add medic report -->
          <div v-show="showMedicCard">
            <p>Add a medic report</p>
            <div class="field">
              <div class="control">
                <div class="select">
                  <select v-model="vetSelected">
                    <option v-for="vet in veterinarian" :key="vet.id">{{ ownerNameFormated(vet) }}</option>
                  </select>
                </div>
                <div class="select">
                  <select v-model="medicInterventionSelected">
                    <option
                      v-for="typeMed in typeMedic"
                      :key="typeMed.id"
                    >{{ typeMed.type_medic_name }}</option>
                  </select>
                </div>
                <textarea
                  class="textarea"
                  placeholder="Note about the medical intervention"
                  v-model="noteMedic"
                ></textarea>
                <button
                  class="button is-primary is-rounded"
                  :disabled="checkMedicInfo"
                  v-on:click="ValidateNewwIntervention"
                >Validate Medic Intervention</button>
                <button class="button is-danger" v-on:click="showMedicCard = !showMedicCard">Cancel</button>
              </div>
            </div>
          </div>
          <!-- to assign to new stable -->
          <div v-show="showStableCard">
            <div class="field">
              <div class="control">
                <div class="select">
                  <select v-model="stableSelected">
                    <option v-for="stb in stables" :key="stb.id">{{ stb.stable_name }}</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              class="button is-primary is-rounded"
              v-on:click="validNewStableAssigned"
            >Validate new Stable</button>
            <button class="button is-danger" v-on:click="showStableCard = !showStableCard">Cancel</button>
          </div>
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
    c olorname: "unknow",current_owner: "1",
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

import * as axios from "axios";
const apiAddr = "http://localhost:5008";
export default {
  name: "HorseList",

  //model ce sont les variable
  data() {
    return {
      selectedHorse: undefined,
      ownerSelected: undefined,
      stableSelected: "",
      sexSelected: undefined,
      coatSelected: undefined,
      vetSelected: undefined,
      medicInterventionSelected: undefined,
      noteMedic: "",
      showMore: false,
      showMedicCard: false,
      showStableCard: false,
      dropdownMenuOneActivated: false,
      message: "horse list",
      newHorse: false,
      horses: [],
      owners: [],
      coats: [],
      sexs: [],
      stables: [],
      veterinarian: [],
      typeMedic: [],
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
        return "ajout d'un nouveau cheval";
      } else {
        return `Le cheval à ajouter est : ${this.newHorseCard.horse_name}`;
      }
    },
    checkMedicInfo() {
      if (
        this.vetSelected != undefined &&
        this.medicInterventionSelected != undefined &&
        this.noteMedic != ""
      ) {
        return false;
      } else {
        return true;
      }
    }
  },
  watch: {
    //if we want to "watch" and react if a data change
  },
  methods: {
    addMedicIntervention: function(hrs) {
      this.loadMedicData();
      console.log("pour l'ajout d'une intervention medical"),
        (this.showMedicCard = true);
      console.log(hrs.horse_name);
    },
    assignToNewStable: function(hrs) {
      console.log("assignation d'une nouvelle ecurie"),
        (this.showStableCard = true);
      if (hrs.id_stables == null) {
        this.stableSelected = "";
      } else {
        this.stables.forEach(element => {
          if (element.stable_id == hrs.id_stables) {
            this.stableSelected = element;
          }
        });
      }
    },
    validNewStableAssigned: function() {
      //a refacto : le droppdown ne donne que le nom
      //il faut que je fasse un menu pour garder l'id
      var id = 0;
      console.log("validation de l'assignation d'une nouvelle ecurie");
      console.log(this.stableSelected);
      this.stables.forEach(element => {
        if (element.stable_name == this.stableSelected) {
          id = element.stable_id;
        }
      });
      console.log(this.selectedHorse);
      this.postMoveHorse(this.selectedHorse.horse_id, id)
      this.stableSelected = "";
      this.showStableCard = false;
    },
    goToShowMore: function(selectedHorseToShowMore) {
      console.log("we are going to show more information from");
      console.log(selectedHorseToShowMore.horse_name);
    },
    showNewCard: function() {
      this.newHorse = true;
      this.loadOtherData();
      console.log("j'ai appuyé sur le bouton");
    },
    ownerNameFormated: function(ownr) {
      return `${ownr.lastname}  ${ownr.firstname}`;
    },
    greet: function(event) {
      // `this` fait référence à l'instance de Vue à l'intérieur de `methods`
      alert("Bonjour " + this.name + " !");
      // `event` est l'évènement natif du DOM
      if (event) {
        alert(event.target.tagName);
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
    ValidateNewwIntervention: function() {
      //TODO : faire la requete
      console.log("les infos a envoyer a l'api");
      console.log(this.vetSelected);
      console.log(this.medicInterventionSelected);
      console.log(this.noteMedic);
      console.log(this.selectedHorse);

    },
    async getHorses() {
      this.horses = [];
      const res = await axios.get(`${apiAddr}/horses`);
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
    async getStables() {
      const res = await axios.get(`${apiAddr}/stables`);
      this.stables = res.data;
      console.log(this.stables);
    },
    async getVet() {
      const res = await axios.get(`${apiAddr}/medic/vet`);
      this.veterinarian = res.data;
      console.log("les veto : " + this.veterinarian);
    },
    async getMedicIntervention() {
      const res = await axios.get(`${apiAddr}/medic/typemedicintervention`);
      this.typeMedic = res.data;
      console.log("les medic intervention : " + this.typeMedic);
    },
    async postHorse(hrs) {
      if (hrs.horse_name != null) {
        const res = await axios.post(`${apiAddr}/horses`, hrs);
        console.log(res);
        this.loadHorses();
      }
    },
    async postMoveHorse(hrsid, stableid) {
      console.log(`le horse id : ${hrsid} et le stable id = ${stableid}`);
      const res = await axios.post(`${apiAddr}/horses/move`, {"stable_id": stableid, "horse_id":hrsid});
      console.log(res);
      this.loadHorses();
    },
    async posttMedicReport(vetName, typeName, report, horse) {
      console.log(vetName)
      console.log(typeName)
      console.log(report)
      console.log(horse)
      
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
    },
    async loadMedicData() {
      this.getVet();
      this.getMedicIntervention();
    },
    async loadStables() {
      if (this.stables) {
        this.getStables();
        console.log("fin de getStable");
        console.log(this.stables);
      }
    }
  },
  created() {
    this.loadHorses();
    this.loadStables();
  }
};
</script>

<style>
.is-selected {
  color: red;
}
</style>