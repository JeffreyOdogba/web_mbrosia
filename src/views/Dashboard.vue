<template>
  <v-container>
    <div class="container-card">
      <div v-for="recipe in allRecipes" :key="recipe._id">
        <RecipeCard :recipe="recipe" />
      </div>
    </div>
    <AddActionButton />
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import RecipeCard from "../components/RecipeCard.vue";
import AddActionButton from "../components/AddActionButton.vue";
export default {
  name: "Dashboard",
  components: { RecipeCard, AddActionButton },
  computed: {
    ...mapGetters(["allRecipes"]),
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
