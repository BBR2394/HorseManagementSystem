<template lang="">
    <div>
    <div class="container">
      <div class="columns">
        <div class="column is-two-fifths">
          <h1>Liste des veterinaires</h1>
          <ul class="list">
            <li v-for="vet in vetList" :key="vet.id" class="menu-list elem-in-list">
              <a
                class="list-item"
                @click="selectedVet = vet"
                :class="{ 'is-active': selectedVet === vet}">
                <span class="title">
                    {{ vet | fullInfo }}
                </span>
              </a>
            </li>
          </ul>
          <!-- button to add a horse -->
          <div>
            <button class="button is-primary" v-on:click="showNewCard" v-show="!newVet">+</button>
          </div>
        </div>
        <div class="column">
            <div v-show="newVet">
                <p>{{ tempGenTrigramme }}</p>
                <p>{{ newVetFirstname }}</p>
                <p>{{ newVetLastname }}</p>
                <input class="input is-primary" type="text" placeholder="firstname" requiredminlength="2" maxlength="255" v-model="newVetFirstname" />
                <input class="input is-primary" type="text" placeholder="lastname" required minlength="2" maxlength="255" v-model="newVetLastname" />
                <input class="input is-primary" type="text" placeholder="trigramme" required minlength="3" maxlength="3" v-model="tempGenTrigramme" />
                <input class="input is-info" type="number" placeholder="phone" required maxlength="10" v-model="newVetCard.phone"/>
                <button class="button is-primary is-rounded" v-on:click="validateNewVet">Validate</button>
                <button class="button is-danger is-rounded" v-on:click="newVet = !newVet">Cancel</button>
            </div>
            <div v-if="selectedVet">
                <div class="field">{{ selectedVet.firstname}}</div>
                <div class="field">{{ selectedVet.lastname}}</div>
                <div class="field">{{ selectedVet.firstname}}</div>
            </div>
        </div>
        </div>
        </div>
    </div>
</template>
<script>
import * as axios from "axios";
const apiAddr = "http://localhost:5008";

export default {
    name : "VetList",
    data() {
        return {
            selectedVet: undefined,
            vetList: [],
            newVetFirstname: "",
            newVetLastname: "",
            newVetCard: [],
            newVet: false,
            tempGenTrigramme: "---"
        }
    },
    filters: {
        fullInfo(vet) {
            return vet.firstname + " " + vet.lastname;
        }
    },
    computed: {
        //TODO create the trigram, but maybe i should moove this into a watch property
        testFirsqtjnameComputed : function () {
            return `test ${this.newVetFirstname}`
        },
        //just to use that as memo ^^
        /*testBisFirstname: {
            // getter
            get: function () {
                if (this.newVetFirstname == "" || this.newVetLastname == "") {
                    return "==="
                }
                else {
                    this.generatedTrigramme()
                    return this.tempGenTrigramme
                }
                //return `test ${this.newVetFirstname}`
            },
            // setter
            set: function (newValue) {
                this.newVetFirstname = newValue
            }
        }*/
    },
    watch: {
        //here, I think it is better to use watcher instead of computed
        //because computed is "lighter" 
        newVetFirstname: function () {
            if (this.newVetFirstname == "" || this.newVetLastname == "") {
                this.tempGenTrigramme = "+++"
            }
            else {
                this.generatedTrigramme()
            }
        },
        newVetLastname: function () {
            if (this.newVetFirstname == "" || this.newVetLastname == "") {
                this.tempGenTrigramme = "---"
            }
            else {
                this.generatedTrigramme()
            }
        }
    },
    methods:  {
        generatedTrigramme () {
            this.tempGenTrigramme = "gen"
        },
        async loadVetList() {
            const res = await axios.get(`${apiAddr}/medic/vet`);
            this.vetList = res.data;
            console.log(this.vetList);
        },
        async sendNewVet(vet) {
            const res = await axios.post(`${apiAddr}/medic/vet`, vet);
            console.log("nouveau vet");
            console.log(res);
            this.loadVetList();
        },
        validateNewVet: function() {
            const vetFormated = {
                "firstname": this.newVetCard.firstname,
                "lastname": this.newVetCard.lastname,
                "phone" : this.newVetCard.phone,
                "trig" : this.trigramme
            }
            console.log(`verification du nouveau veterinaire ${vetFormated}`)
            this.sendNewVet(vetFormated)
        },
        showNewCard: function() {
            this.newVet = true;
            console.log("j'ai appuyé sur le bouton");
        },
    },
    created() {
        this.loadVetList()
    }
}
</script>
<style lang="">
</style>