<template>
  <div>
    <v-row>
      <v-dialog v-model="dialog" persistent max-width="610px">
        <v-form>
          <v-card>
            <v-card-title>
              <span class="headline">Create Recipe</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="form.recipeTitle"
                      color="purple darken-2"
                      label="Recipe name"
                      :rules="rules.item"
                      required
                      @input="$v.form.recipeTitle.$touch()"
                      @blur="$v.form.recipeTitle.$touch()"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="form.summary"
                      :rules="rules.item"
                      color="teal"
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
                      color="purple darken-2"
                      label="Cooking Time"
                      :rules="rules.number"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="form.serving"
                      color="purple darken-2"
                      label="Servings"
                      :rules="rules.number"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="form.kcal"
                      color="purple darken-2"
                      label="Kcal"
                      :rules="rules.number"
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
                      label="Image"
                    ></v-file-input>
                  </v-col>
                  <!-- Ingredient Tab -->
                  <v-col cols="11">
                    <v-text-field
                      v-model="queryI"
                      color="purple darken-2"
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
                      color="purple darken-2"
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
                        color="primary"
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
              <v-btn color="blue darken-1" text @click="clear">
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                :disabled="!formIsValid"
                @click="dialog = false"
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
import { validationMixin } from "vuelidate";
const defaultForm = Object.freeze({
  recipeTitle: "",
  summary: "",
  cookTime: "",
  serving: "",
  kcal: "",
  country: "",
  photo: [],
  ingredient: [],
  procedure: [],
});
export default {
  mixins: [validationMixin],
  name: "AddActionButton",
  data: () => ({
    form: Object.assign({}, defaultForm),
    queryI: "",
    queryP: "",
    ingredientCount: 0,
    procedureCount: 0,
    show: {
      ingredient: false,
      procedure: false,
    },
    rules: {
      image: [
        (photo) =>
          !photo ||
          photo.size < 5000000 ||
          "Image size should be less than 5 MB!",
      ],
      item: [(val) => (val || "").length > 0 || "This field is required"],
      number: [
        (val) =>
          +val ||
          "".length > 0 ||
          "This field is required and must be a number",
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
        +this.form.cookTime &&
        +this.form.serving &&
        +this.form.kcal &&
        this.form.photo &&
        this.form.ingredient &&
        this.form.procedure
      );
    },
  },
  methods: {
    addIngredient() {
      this.form.ingredient.push(this.queryI);
      // this.ingredient.push(this.queryI);
      this.ingredientCount++;
      this.queryI = "";
      console.log(this.form);
    },
    addProcedure() {
      this.form.procedure.push(this.queryP);
      this.procedureCount++;
      this.queryP = "";
      console.log("obj", this.form);

      //   this.procedure.push(this.queryP);
      //   this.procedureCount++;
      //   this.queryP = "";
      //   console.log(this.procedure);
    },
    clear() {
      this.form.recipeTitle = "";
      this.form.summary = "";
      this.form.cookTime = "";
      this.form.serving = "";
      this.form.kcal = "";
      this.form.photo = null;
      this.form.ingredient = null;
      this.form.procedure = null;
      this.dialog = false;
      this.$v.$reset();
    },
  },
};
</script>

<style scoped></style>
