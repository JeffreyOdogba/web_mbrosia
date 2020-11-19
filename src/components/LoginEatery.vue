<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="#c23616" outlined dark v-bind="attrs" v-on="on">
          {{ btnName }}
        </v-btn>
      </template>
      <form @submit.prevent="loginInContributor">
        <v-card :loading="loading">
          <v-card-title>
            <span class="headline">{{ title }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    color="#c23616"
                    v-model.trim="email"
                    :error-messages="emailErrors"
                    label="Eatery email*"
                    required
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    color="#c23616"
                    label="Password*"
                    v-model.trim="password"
                    :error-messages="passwordErrors"
                    type="password"
                    required
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <SignUp_Contributor :btnName="title" :title="title" />
            <v-spacer></v-spacer>
            <v-btn color="#c23616" text @click="Login_Eatery_dialog = false">
              Cancel
            </v-btn>
            <v-btn
              color="#c23616"
              text
              :disabled="!formIsValidContributor"
              @click="loginInContributor"
            >
              Log in
            </v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
  </v-row>
</template>

<script>
/* eslint-disable */
import { mapActions, mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import validationMixins from "../mixins/validationMixins";
import SignUp_Eatery from "./SignUp_Eatery";
export default {
  mixins: [validationMixin, validationMixins],
  name: "LoginEatery",
  components: {
    SignUp_Eatery,
  },
  props: ["btnName", "title"],
  validations: {
    email: {
      required,
    },
    password: {
      required,
    },
  },
  data: () => ({
    email: "",
    password: "",
    Login_Eatery_dialog: false,
    loading: false,
  }),

  computed: {
    ...mapGetters(["getContributor"]),
    formIsValidContributor() {
      return this.username && this.password;
    },
  },
  methods: {
    // ...mapActions(["loginContributor"]),
    // loginInEatery() {
    //   this.loading = true;
    //   this.$v.$touch();
    //   this.loginContributor(this.email, this.password).then(() => {
    //     console.log(this.getContributor.authorizationToken);
    //     if (this.getContributor.authorizationToken) {
    //       this.loading = false;
    //       this.$router.push("/dashboard");
    //       this.$v.$reset();
    //       this.email = "";
    //       this.password = "";
    //       this.dialog = false;
    //     } else {
    //       this.$router.push("/");
    //     }
    //   });
    // },
  },
};
</script>
