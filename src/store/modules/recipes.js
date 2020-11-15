// import axios from "axios";

const state = {
  recipes: [
    {
      _id: "23jdhfddksjksdfe3323d",
      recipeTitle: "Cafe Badilico",
      description:
        "Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.",
      cookTime: 20,
      serving: 4,
      kcal: 120,
      country: "Italian",
      photo: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
      ingredients: [
        "1/2 red onion, quartered, divided",
        "1/2 red bird's eye chile pepper, chopped",
        "1/4 cup water, divided",
        "2 tablespoons raw cashews",
        "1 clove garlic",
        "1/2 (1 inch) piece fresh ginger",
        "2-1/2 whole cloves",
        "1/2 black cardamom pod",
        "1/2 black cardamom pod",
        "1/2 bay leaf",
        "1/2 teaspoon cumin seeds",
        "1/8 teaspoon whole black peppercorns",
        "1/8 teaspoon ground coriander",
        "1/8 inch cinnamon stick",
        "2 tablespoons light vegetable oil",
        "1/4 pound cauliflower, cut into large pieces",
        "2-1/2 ounces broccoli, cut into large pieces",
      ],
      procedures: [
        "Blend 1/4 of the onion, green chile pepper, 1/4 cup water, cashews, garlic, tomato paste, and ginger together in an electric blender, adding extra water if necessary, until paste is creamy and has the consistency of a pesto. Set aside.",
        "Combine cloves, green and black cardamom pods, bay leaf, cumin seeds, peppercorns, coriander, and cinnamon in a mortar. Smash using a pestle to break open spices slightly, 3 to 4 times. Thinly slice remaining onion quarters.",
      ],
    },
  ],
};

const getters = {
  allRecipes: (state) => state.recipes,
};

const actions = {};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
