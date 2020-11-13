<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="#c23616" outlined dark v-bind="attrs" v-on="on">
          {{ btnName }}
        </v-btn>
      </template>
      <form @submit="loginInContributor">
        <v-card>
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
                    v-model.trim="username"
                    :error-messages="usernameErrors"
                    label="Your Username*"
                    required
                    @input="$v.username.$touch()"
                    @blur="$v.username.$touch()"
                  ></v-text-field>
                  <v-text-field
                    color="#c23616"
                    v-else-if="title == 'Eatery.'"
                    v-model.trim="eatery"
                    :error-messages="eateryErrors"
                    label="Eatery*"
                    required
                    @input="$v.eatery.$touch()"
                    @blur="$v.eatery.$touch()"
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
            <SignUpDialog :btnName="title" :title="title" />
            <v-spacer></v-spacer>
            <v-btn color="#c23616" text @click="dialog = false">
              Cancel
            </v-btn>
            <v-btn color="#c23616" text @click="loginInContributor">
              Log in
            </v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
  </v-row>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import validationMixins from "../mixins/validationMixins";
import SignUpDialog from "./SignUpDialog";
export default {
  mixins: [validationMixin, validationMixins],
  name: "SignInDialog",
  components: {
    SignUpDialog,
  },
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
  },
  data: () => ({
    username: "",
    eatery: "",
    password: "",
    dialog: false,
  }),
  computed: {},
  methods: {
    loginInContributor() {
      this.$v.$touch();
      console.log(this.username);
      this.$v.$reset();
      this.$router.push("/dashboard");
      this.username = "";
      this.password = "";
      this.eatery = "";
      this.dialog = false;
    },
  },
};
</script>
