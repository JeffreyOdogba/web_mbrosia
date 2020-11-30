<template>
  <div>
    <v-row>
      <v-dialog v-model="dialog" persistent max-width="610px">
        <v-form @submit.prevent="onSubmit" enctype="multipart/form-data">
          <v-card :loading="loading">
            <v-card-title>
              <span class="headline">Create Recipe</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="form.recipeTitle"
                      color="#c23616"
                      label="Recipe name"
                      :rules="rules.item"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="form.summary"
                      :rules="rules.item"
                      color="#c23616"
                    >
                      <template v-slot:label>
                        <div>
                          Summary
                          <small>(Short summary about the recipe)</small>
                        </div>
                      </template>
                    </v-textarea>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="form.cookTime"
                      color="#c23616"
                      label="Cooking Time"
                      :rules="rules.number"
                      type="number"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="form.serving"
                      color="#c23616"
                      label="Servings"
                      :rules="rules.number"
                      type="number"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="form.kcal"
                      color="#c23616"
                      label="Kcal"
                      :rules="rules.number"
                      type="number"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <v-autocomplete
                      ref="form.country"
                      v-model="form.country"
                      :rules="[
                        () => !!form.country || 'This field is required',
                      ]"
                      :items="countries"
                      label="Country"
                      placeholder="Select..."
                      color="#c23616"
                      required
                    ></v-autocomplete>
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <v-file-input
                      v-model="form.photo"
                      show-size
                      :rules="rules.image"
                      accept="image/png, image/jpeg, image/bmp"
                      placeholder="Pick an Image"
                      prepend-icon="mdi-camera"
                      color="#c23616"
                      label="Image"
                    ></v-file-input>
                  </v-col>
                  <!-- Ingredient Tab -->
                  <v-col cols="11">
                    <v-text-field
                      v-model="queryI"
                      color="#c23616"
                      label="Ingredient"
                      required
                    >
                    </v-text-field>

                    <v-badge
                      :content="ingredientCount"
                      :value="ingredientCount"
                      color="#c23616"
                    >
                      <v-icon
                        @click="show.ingredient = !show.ingredient"
                        medium
                      >
                        mdi-clipboard-list
                      </v-icon>
                    </v-badge>

                    <v-list v-show="show.ingredient" disabled>
                      <v-list-item-group
                        color="primary"
                        v-model="form.ingredient"
                      >
                        <v-list-item
                          v-for="(ingredient, i) in form.ingredient"
                          :key="i"
                        >
                          <v-list-item-content>
                            <v-list-item-title
                              v-text="ingredient"
                            ></v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-col>

                  <v-col cols="1">
                    <v-icon
                      @click="addIngredient"
                      :disabled="!formIsValidI"
                      color="#c23616"
                      >mdi-plus</v-icon
                    >
                  </v-col>
                  <!-- Ingredient Tab -->
                  <!-- Procedure Tab -->
                  <v-col cols="11" sm="11">
                    <v-text-field
                      v-model="queryP"
                      color="#c23616"
                      label="Procedure"
                      required
                    >
                    </v-text-field>
                    <v-badge
                      :content="procedureCount"
                      :value="procedureCount"
                      color="#c23616"
                    >
                      <v-icon @click="show.procedure = !show.procedure" medium>
                        mdi-clipboard-list
                      </v-icon>
                    </v-badge>

                    <v-list v-show="show.procedure" disabled>
                      <v-list-item-group
                        color="#c23616"
                        v-model="form.procedure"
                      >
                        <v-list-item
                          v-for="(procedure, i) in form.procedure"
                          :key="i"
                        >
                          <v-list-item-content>
                            <v-list-item-title
                              v-text="procedure"
                            ></v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-col>
                  <v-col cols="1" sm="1">
                    <v-icon
                      @click="addProcedure"
                      :disabled="!formIsValidP"
                      color="#c23616"
                      >mdi-plus</v-icon
                    >
                  </v-col>
                  <!-- Procedure Tab -->
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#c23616" text @click="clear">
                Cancel
              </v-btn>
              <v-btn
                color="#c23616"
                text
                :disabled="!formIsValid"
                type="submit"
              >
                Publish
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-row>

    <v-fab-transition>
      <v-btn
        @click="dialog = true"
        color="#c23616"
        dark
        large
        fixed
        bottom
        right
        fab
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { EventBus } from "../../utils/event-bus";
const defaultForm = Object.freeze({
  recipeTitle: "",
  summary: "",
  cookTime: null,
  serving: null,
  kcal: null,
  country: "",
  photo: [],
  ingredient: [],
  procedure: [],
});
/* eslint-disable */
export default {
  mixins: [validationMixin],
  name: "AddActionButton",
  data: () => ({
    form: Object.assign({}, defaultForm),
    queryI: "",
    queryP: "",
    ingredientCount: null,
    procedureCount: null,
    show: {
      ingredient: false,
      procedure: false,
    },
    loading: false,
    rules: {
      image: [
        (photo) =>
          !photo ||
          photo.size < 5000000 ||
          "Image size should be less than 5 MB!",
      ],
      item: [(val) => !!(val || "").length > 0 || "This field is required"],
      number: [
        (val) =>
          !!parseInt(val) || "This field is required and must be a number",
      ],
    },
    countries: [
      "Afghanistan",
      "Albania",
      "Algeria",
      "Andorra",
      "Angola",
      "Anguilla",
      //   "Antigua & Barbuda",
      "Argentina",
      "Armenia",
      "Aruba",
      "Australia",
      "Austria",
      "Azerbaijan",
      "Bahamas",
      "Bahrain",
      "Bangladesh",
      "Barbados",
      "Belarus",
      "Belgium",
      "Belize",
      "Benin",
      "Bermuda",
      "Bhutan",
      "Bolivia",
      "Bosnia & Herzegovina",
      "Botswana",
      "Brazil",
      "British Virgin Islands",
      "Brunei",
      "Bulgaria",
      "Burkina Faso",
      "Burundi",
      "Cambodia",
      "Cameroon",
      "Cape Verde",
      "Cayman Islands",
      "Chad",
      "Chile",
      "China",
      "Colombia",
      "Congo",
      "Cook Islands",
      "Costa Rica",
      "Cote D Ivoire",
      "Croatia",
      "Cruise Ship",
      "Cuba",
      "Cyprus",
      "Czech Republic",
      "Denmark",
      "Djibouti",
      //   "Dominica",
      "Dominican Republic",
      "Ecuador",
      "Egypt",
      "El Salvador",
      "Equatorial Guinea",
      "Estonia",
      "Ethiopia",
      "Falkland Islands",
      "Faroe Islands",
      "Fiji",
      "Finland",
      "France",
      //   "French Polynesia",
      //   "French West Indies",
      "Gabon",
      "Gambia",
      "Georgia",
      "Germany",
      "Ghana",
      "Gibraltar",
      "Greece",
      "Greenland",
      "Grenada",
      "Guam",
      "Guatemala",
      "Guernsey",
      "Guinea",
      "Guinea Bissau",
      "Guyana",
      "Haiti",
      "Honduras",
      "Hong Kong",
      "Hungary",
      "Iceland",
      "India",
      "Indonesia",
      "Iran",
      "Iraq",
      "Ireland",
      "Isle of Man",
      "Israel",
      "Italy",
      "Jamaica",
      "Japan",
      "Jersey",
      "Jordan",
      "Kazakhstan",
      "Kenya",
      "Kuwait",
      //   "Kyrgyz Republic",
      "Laos",
      "Latvia",
      "Lebanon",
      "Lesotho",
      "Liberia",
      "Libya",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Macau",
      "Macedonia",
      "Madagascar",
      "Malawi",
      "Malaysia",
      "Maldives",
      "Mali",
      "Malta",
      "Mauritania",
      "Mauritius",
      "Mexico",
      "Moldova",
      "Monaco",
      "Mongolia",
      "Montenegro",
      "Montserrat",
      "Morocco",
      "Mozambique",
      "Namibia",
      "Nepal",
      "Netherlands",
      //   "Netherlands Antilles",
      "New Caledonia",
      "New Zealand",
      "Nicaragua",
      "Niger",
      "Nigeria",
      "Norway",
      "Oman",
      "Pakistan",
      "Palestine",
      "Panama",
      "Papua New Guinea",
      "Paraguay",
      "Peru",
      "Philippines",
      "Poland",
      "Portugal",
      "Puerto Rico",
      "Qatar",
      "Reunion",
      "Romania",
      "Russia",
      "Rwanda",
      //   "Saint Pierre & Miquelon",
      "Samoa",
      "San Marino",
      "Satellite",
      "Saudi Arabia",
      "Senegal",
      "Serbia",
      "Seychelles",
      "Sierra Leone",
      "Singapore",
      "Slovakia",
      "Slovenia",
      "South Africa",
      "South Korea",
      "Spain",
      "Sri Lanka",
      "St Kitts &amp; Nevis",
      "St Lucia",
      "St Vincent",
      "St. Lucia",
      "Sudan",
      "Suriname",
      "Swaziland",
      "Sweden",
      "Switzerland",
      "Syria",
      "Taiwan",
      "Tajikistan",
      "Tanzania",
      "Thailand",
      `Timor L'Este`,
      "Togo",
      "Tonga",
      "Trinidad &amp; Tobago",
      "Tunisia",
      "Turkey",
      "Turkmenistan",
      "Turks &amp; Caicos",
      "Uganda",
      "Ukraine",
      "United Arab Emirates",
      "United Kingdom",
      "United States",
      "Uruguay",
      "Uzbekistan",
      "Venezuela",
      "Vietnam",
      "Virgin Islands (US)",
      "Yemen",
      "Zambia",
      "Zimbabwe",
    ],

    dialog: false,
  }),
  computed: {
    ...mapGetters[
      {
        // isLoading: "isLoading",
        allRecipes: "allRecipes",
      }
    ],
    formIsValidI() {
      return this.queryI;
    },
    formIsValidP() {
      return this.queryP;
    },
    formIsValid() {
      return (
        this.form.recipeTitle &&
        this.form.summary &&
        parseInt(this.form.cookTime) &&
        parseInt(this.form.serving) &&
        parseInt(this.form.kcal) &&
        this.form.country &&
        this.form.photo.length != 0 &&
        this.form.ingredient.length != 0 &&
        this.form.procedure.length != 0
      );
    },
  },
  methods: {
    addIngredient() {
      this.form.ingredient.push(this.queryI);
      this.ingredientCount++;
      this.queryI = "";
    },
    addProcedure() {
      this.form.procedure.push(this.queryP);
      this.procedureCount++;
      this.queryP = "";
    },
    ...mapActions(["addRecipe"]),
    onSubmit(e) {
      this.loading = true;
      const fd = new FormData();

      fd.append("recipeTitle", this.form.recipeTitle);
      fd.append("summary", this.form.summary);
      fd.append("cookTime", this.form.cookTime);
      fd.append("serving", this.form.serving);
      fd.append("kcal", this.form.kcal);
      fd.append("country", this.form.country);
      fd.append("ingredient", JSON.stringify(this.form.ingredient));
      fd.append("procedure", JSON.stringify(this.form.procedure));
      fd.append("photo", this.form.photo, this.form.photo.name);

      this.addRecipe(fd).then(() => {
        this.form = Object.assign({}, this.defaultForm);
        this.ingredientCount = null;
        this.procedureCount = null;
        this.loading = false;
        EventBus.$emit("msg", "Recipe added to you library!");
        this.dialog = false;
      });
    },
    clear() {
      this.form.summary = Object.assign({}, this.defaultForm);
      this.ingredientCount = null;
      this.procedureCount = null;
      this.dialog = false;
    },
  },
};
</script>

<style scoped></style>
