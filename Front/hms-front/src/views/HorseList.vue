<template >
  <div>
    <h1>Liste des chevaux</h1>
    <ul class="horse-list">
      <li v-for="horse in horses" :key="horse.id" class="horse-elem-in-list">
        <a class="list-item"
              @click="selectedHorse = horse" 
              :class="{ 'is-selected': selectedHorse === horse }" >
        <span class="title "> {{ horse.name }}</span></a>
      </li>
    </ul>
    <div v-if="selectedHorse">
        <div class="field"> {{ selectedHorse.name }} </div>
        <label for="show" class="checkbox">
            <input type="checkbox" class="is-primary" id="show" v-model="showMore">
        </label>
        <div v-show="showMore">
        <div class="field"> {{ selectedHorse.size }}</div>
        <div class="field">{{ selectedHorse.coat }}</div>
        <div class="field"> {{ selectedHorse.created_on }}</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HorseList",
  data() {
    return {
      selectedHorse : undefined,
      showMore: false,
      message: "horse list",
      horses: [
        {
          horse_id: 1,
          name: "Gladiateur",
          size: 2,
          coat: "3",
          father: "0",
          mother: "0",
          sex: "3",
          current_owner: "1",
          created_on: "2021-01-03T18:45:48.010Z"
        },
        {
          horse_id: 2,
          name: "Bojack Horseman",
          size: 2,
          coat: "3",
          father: "0",
          mother: "0",
          sex: "1",
          current_owner: "1",
          created_on: "2021-01-03T18:45:48.010Z"
        },
        {
          horse_id: 5,
          name: "test un",
          size: null,
          coat: null,
          father: null,
          mother: null,
          sex: null,
          current_owner: null,
          created_on: "2021-01-03T18:48:37.768Z"
        },
        {
          horse_id: 6,
          name: "Toto",
          size: null,
          coat: null,
          father: null,
          mother: null,
          sex: null,
          current_owner: null,
          created_on: "2021-01-03T18:49:57.663Z"
        },
        {
          horse_id: 7,
          name: "Toto",
          size: null,
          coat: null,
          father: null,
          mother: null,
          sex: null,
          current_owner: null,
          created_on: "2021-01-03T18:50:23.846Z"
        }
      ]
    };
  }
};
</script>

<style>
.is-selected {
    color: red
}
</style>