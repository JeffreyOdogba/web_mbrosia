<template>
  <v-card :loading="loading" class="mx-6 my-12" max-width="374">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img height="250" :src="recipe.photo" :alt="recipe._id"></v-img>

    <v-card-title>{{ recipe.recipeTitle }}</v-card-title>

    <v-card-text>
      <!-- <v-row align="center" class="mx-0">
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">
          4.5 (413)
        </div>
      </v-row> -->

      <div class="my-4 subtitle-1">
        {{ recipe.nationality }}
      </div>

      <div>
        {{ recipe.description }}
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title id="text-capitalize">{{
      recipe.creator.fullname
        ? recipe.creator.fullname
        : recipe.creator.username
    }}</v-card-title>

    <!-- <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>

        <v-chip>8:00PM</v-chip>

        <v-chip>9:00PM</v-chip>
      </v-chip-group>
    </v-card-text> -->

    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text @click="view">
        <!-- <router-link :to="'/recipe/' + recipe._id">View</router-link> -->
        <router-link
          :to="{ name: 'recipe', params: { id: recipe._id, recipe: recipe } }"
          >View</router-link
        >
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "RecipeCard",
  props: ["recipe"],
  data: () => ({
    loading: false,
    selection: 1,
  }),

  methods: {
    view() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
  },
};
</script>

<style scoped>
#text-capitalize {
  text-transform: capitalize;
}
</style>
