<template>
  <v-container>
    <v-card>
      <div class="d-flex justify-center mb-6">
        <h1>{{ recipe.recipeTitle }}</h1>
      </div>
    </v-card>

    <div class="d-flex justify-center mb-6">
      <v-img
        height="350"
        max-width="350"
        :src="recipe.photo"
        :alt="recipe._id"
        class="rounded-lg"
      ></v-img>
    </div>
    <div class="d-flex justify-center mb-6">
      <h4>Dish: {{ recipe.nationality }}</h4>
    </div>

    <v-card-text class="d-flex justify-center mb-6">
      <v-row align="center" class="mx-0">
        <p>
          {{ recipe.description }}
        </p>
      </v-row>
    </v-card-text>

    <div class="d-flex justify-center justify-space-around mb-6">
      <h4>🍽 Servings: {{ recipe.servings }}</h4>
      <h4>⏰ Cooking: {{ recipe.cooktime }}</h4>
      <h4>🔥 Kcals: {{ recipe.kcal }}</h4>
      <h4>♥️ Likes: {{ recipe.likes }}</h4>
    </div>
    <v-expansion-panels class="d-flex justify-center mb-6">
      <v-expansion-panel>
        <v-expansion-panel-header>
          Ingredients
        </v-expansion-panel-header>
        <v-expansion-panel-content
          v-for="(ingredients, i) in recipe.ingredients"
          :key="i"
        >
          ✔︎ {{ ingredients }}
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>
          Procedures
        </v-expansion-panel-header>
        <v-expansion-panel-content
          v-for="(procedures, i) in recipe.procedures"
          :key="i"
        >
          ✔︎ {{ procedures }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-expansion-panels class="d-flex justify-center mb-6">
      <v-expansion-panel>
        <v-expansion-panel-header>
          Comments
        </v-expansion-panel-header>
        <v-expansion-panel-content
          v-for="(comment, i) in recipe.comment"
          :key="i"
        >
          ✔︎ {{ comment }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <div class="d-flex justify-center mb-12">
      <v-btn color="#c23616">
        Hide recipe
      </v-btn>
    </div>
  </v-container>
</template>

<script>
/* eslint-disable */
export default {
  name: "Recipe_Item",
  props: ["recipe"],
  data: () => ({
    loading: false,
  }),
  computed: {},
  created() {
    console.log(this.$route.params);
  },
};
</script>

<style scoped></style>
