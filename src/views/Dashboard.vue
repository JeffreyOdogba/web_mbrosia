/* eslint-disable prettier/prettier */
<template>
  <v-container>
    <div class="container-card">
      <v-row
        v-if="isLoading"
        class="fill-height"
        align-content="center"
        justify="center"
      >
        <v-col class="subtitle-1 text-center" cols="12">
          Getting your files
        </v-col>
        <v-col cols="6">
          <v-progress-linear
            color="deep-purple accent-4"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </v-col>
      </v-row>

      <div
        v-else-if="!isLoading"
        v-for="recipe in allRecipes"
        :key="recipe._id"
      >
        <RecipeCard :recipe="recipe" />
      </div>
    </div>
    <AddActionButton />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import RecipeCard from "../components/RecipeCard.vue";
import AddActionButton from "../components/AddActionButton.vue";
export default {
  name: "Dashboard",
  components: { RecipeCard, AddActionButton },
  methods: {
    ...mapActions(["fetchRecipe"]),
  },
  computed: {
    ...mapGetters(["allRecipes", "isLoading"]),
  },
  created() {
    this.fetchRecipe();
  },
};
</script>

<style scoped>
.container-card {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
}
</style>
