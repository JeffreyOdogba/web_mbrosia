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
                    v-model.trim="username"
                    :error-messages="usernameErrors"
                    label="Your Username*"
                    required
                    @input="$v.username.$touch()"
                    @blur="$v.username.$touch()"
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
            <v-btn color="#c23616" href="/register_contributor" text dark>
              Create a Contributor Account.
            </v-btn>

            <v-spacer></v-spacer>
            <v-btn color="#c23616" text @click="dialog = false">
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
import validationMixins from "../../mixins/validationMixins";
import { EventBus } from "../../utils/event-bus";
export default {
  mixins: [validationMixin, validationMixins],
  name: "LoginContributor",
  components: {},
  props: ["btnName", "title"],
  validations: {
    username: {
      required,
    },
    password: {
      required,
    },
  },
  data() {
    return {
      username: "",
      password: "",
      dialog: false,
      msg: null,
    };
  },

  computed: {
    ...mapGetters({
      getContributor: "getContributor",
      loading: "loading",
      getMsg: "getMsg",
    }),
    formIsValidContributor() {
      return this.username && this.password;
    },
  },
  methods: {
    ...mapActions(["loginContributor"]),
    loginInContributor(e) {
      const form = {
        username: this.username,
        password: this.password,
      };

      this.loginContributor(form).then(() => {
        if (this.getContributor.authorizationToken) {
          this.$router.push("/dashboard");
          this.$v.$touch();
          this.$v.$reset();
          this.username = "";
          this.password = "";
          this.dialog = false;
        } else {
          this.$emit("msgNote", this.getMsg);
          // this.$router.push("/");
        }
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    if (to.query.redirectFrom) {
      next((vm) => {
        this.$emit("msgNote", "You must be logged in!");
      });
    } else {
      next();
    }
  },
};
</script>
