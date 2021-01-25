<template lang="">
    <div>
    <div class="container">
      <div class="columns">
        <div class="column is-two-fifths">
          <h1>Liste des proriétaire</h1>
          <ul class="list">
            <li v-for="owner in ownerList" :key="owner.id" class="menu-list elem-in-list">
              <a
                class="list-item"
                @click="selectedOwner = owner"
                :class="{ 'is-active': selectedOwner === owner}">
                <span class="title">
                    {{ owner | fullInfo }}
                </span>
              </a>
            </li>
          </ul>
          <!-- button to add a horse -->
          <div>
            <button class="button is-primary" v-on:click="showNewCard" v-show="!newOwner">+</button>
          </div>
        </div>
        <div class="column">
            <div v-show="newOwner">
                <input class="input is-primary" type="text" placeholder="lastname" requiredminlength="2" maxlength="255" v-model="newOwnerCard.lastname" />
                <input class="input is-primary" type="text" placeholder="lastname" required minlength="2" maxlength="255" v-model="newOwnerCard.firstname" />
                <input class="input is-info" type="number" placeholder="phone" required maxlength="10" v-model="newOwnerCard.phone"/>
                <button class="button is-primary is-rounded" v-on:click="validateNewOwner">Validate</button>
                <button class="button is-danger is-rounded" v-on:click="newOwner = !newOwner ">Cancel</button>
            </div>
            <div v-if="selectedOwner">
                <p>Information on selected owner :
                <div class="field">{{ selectedOwner.firstname}}</div>
                <div class="field">{{ selectedOwner.lastname}}</div>
                <div class="field">{{ selectedOwner.firstname}}</div>
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
    name : "OwnersList",
    data() {
        return {
            selectedOwner: undefined,
            ownerList: [],
            newOwnerCard: [],
            newOwner: false
        }
    },
    filters: {
        fullInfo(owner) {
            return owner.firstname + " " + owner.lastname;
        }
    },
    computed: {

    },
    methods:  {
        async loadOwnerList() {
            const res = await axios.get(`${apiAddr}/owners`);
            this.ownerList = res.data;
            console.log(this.ownerList);
        },
        async sendNewOwner(owner) {
            const res = await axios.post(`${apiAddr}/owners`, owner);
            console.log("nouveau owner");
            console.log(res);
            this.loadOwnerList();
        },
        validateNewOwner: function() {
            const ownerFormated = {
                "firstname": this.newOwnerCard.firstname,
                "lastname": this.newOwnerCard.lastname,
                "phone" : this.newOwnerCard.phone
            }
            console.log(`verification du nouveau roriétaire ${ownerFormated}`)
            this.sendNewOwner(ownerFormated)
            this.newOwner = false;
        },
        showNewCard: function() {
            this.newOwner = true;
        },
    },
    created() {
        this.loadOwnerList()
    }
}
</script>
<style lang="">
    
</style>