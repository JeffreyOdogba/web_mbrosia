<template>
  <v-row justify="center">
    <v-dialog v-model="dialog2" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-if="title == 'Contributor.'"
          color="#c23616"
          text
          dark
          v-bind="attrs"
          v-on="on"
        >
          Create a Contributor Account.
        </v-btn>
        <v-btn
          v-else-if="title == 'Eatery.'"
          color="#c23616"
          text
          dark
          v-bind="attrs"
          v-on="on"
        >
          Create an Eatery Account.
        </v-btn>
      </template>
      <form @submit="createNewContributorAccount">
        <v-card v-if="title == 'Contributor.'">
          <v-card-title>
            <span class="headline">{{ title }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    color="#c23616"
                    v-if="title == 'Contributor.'"
                    label="Email*"
                    v-model.trim="email"
                    :error-messages="emailErrors"
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="9">
                  <v-text-field
                    color="#c23616"
                    label="Your Username*"
                    v-model.trim="username"
                    :error-messages="usernameErrors"
                    @input="$v.username.$touch()"
                    @blur="$v.username.$touch()"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="3">
                  <v-text-field
                    color="#c23616"
                    label="Account Type*"
                    disabled
                    :value="select"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    color="#c23616"
                    label="Password*"
                    type="password"
                    v-model.trim="password"
                    :error-messages="passwordErrors"
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#c23616" text @click="dialog2 = false">
              Close
            </v-btn>
            <v-btn
              v-if="title == 'Contributor.'"
              color="#c23616"
              text
              @click="createNewContributorAccount"
            >
              Create Account
            </v-btn>
            <v-btn
              v-if="title == 'Eatery.'"
              color="#c23616"
              text
              @click="dialog2 = false"
            >
              Create Eatery Account
            </v-btn>
          </v-card-actions>
        </v-card>
      </form>

      <!-- Eatery Create Account -->
      <form @submit="createNewEateryAccount">
        <v-card v-if="title == 'Eatery.'">
          <v-card-title>
            <span class="headline">{{ title }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    color="#c23616"
                    label="Email*"
                    v-model.trim="email"
                    :error-messages="emailErrors"
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    color="#c23616"
                    label="Name of the Eatery*"
                    v-model.trim="eatery"
                    :error-messages="eateryErrors"
                    @input="$v.eatery.$touch()"
                    @blur="$v.eatery.$touch()"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="9" md="4">
                  <v-text-field
                    color="#c23616"
                    label="Address*"
                    v-model.trim="address"
                    :error-messages="addressErrors"
                    @input="$v.address.$touch()"
                    @blur="$v.address.$touch()"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="3" md="4">
                  <v-text-field
                    color="#c23616"
                    label="Postal Code*"
                    v-model.trim="postalCode"
                    :error-messages="postalCodeErrors"
                    @input="$v.postalCode.$touch()"
                    @blur="$v.postalCode.$touch()"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="9" md="4">
                  <v-select label="Eatery Type" :items="eateryType" required>
                  </v-select>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    color="#c23616"
                    label="Password*"
                    v-model.trim="password"
                    :error-messages="passwordErrors"
                    type="password"
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#c23616" text @click="dialog2 = false">
              Close
            </v-btn>
            <v-btn
              v-if="title == 'Eatery.'"
              color="#c23616"
              text
              @click="dialog2 = false"
            >
              Create Eatery Account
            </v-btn>
          </v-card-actions>
        </v-card>
      </form>
      <!-- Eatery Create Account -->
    </v-dialog>
  </v-row>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import validationMixins from "../mixins/validationMixins";
export default {
  mixins: [validationMixin, validationMixins],
  name: "SignUpDialog",
  props: ["btnName", "title"],
  validations: {
    username: {
      required,
    },
    password: {
      required,
    },
    eatery: {
      required,
    },
    email: {
      required,
    },
    address: {
      required,
    },
    postalCode: {
      required,
    },
  },
  data: () => ({
    username: "",
    eatery: "",
    email: "",
    password: "",
    address: "",
    postalCode: "",
    selectedEateryType: "",
    dialog2: false,
    select: "Creator",
    eateryType: [
      "Vegan",
      "Thai",
      "Chinese",
      "East African",
      "Indian",
      "Italian",
      "Vietnamese",
      "Pizza",
      "Family",
    ],
  }),
  computed: {},
  methods: {
    createNewContributorAccount() {
      this.$v.$touch();
      console.log(this.username);
      this.$v.$reset();
      this.username = "";
      this.password = "";
      this.eatery = "";
      this.dialog = false;
    },
    createNewEateryAccount() {
      this.$v.$touch();
      console.log(this.username);
      this.$v.$reset();
      this.username = "";
      this.password = "";
      this.email = "";
      this.address = "";
      this.postalCode = "";
      this.selectedEateryType = "";
      this.eatery = "";
      this.dialog = false;
    },
  },
};
</script>
