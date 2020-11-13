<script>
import RecipeCard from "../components/RecipeCard.vue";
import AddActionButton from "../components/AddActionButton.vue";
export default {
  name: "Dashboard",
  components: { RecipeCard, AddActionButton },
};
</script>

<template>
  <v-container>
    <div class="container-card">
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
    </div>
    <AddActionButton />
  </v-container>
</template>

<style scoped>
.container-card {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
}
</style>
