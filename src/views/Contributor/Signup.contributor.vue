<template>
  <v-row justify="center" class="pa-2">
    <form @submit.prevent="createNewContributorAccount">
      <v-card :loading="loading">
        <v-card-title>
          <span class="headline">Be a new Contributor.</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  color="#c23616"
                  label="Email*"
                  type="email"
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
                  v-model.trim="username"
                  :error-messages="usernameErrors"
                  label="Your Username*"
                  required
                  @input="$v.username.$touch()"
                  @blur="$v.username.$touch()"
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

              <v-col cols="12" sm="5" md="5">
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
              <v-col cols="12" sm="5" md="5">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Date of Birth"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="date"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#c23616" href="/" text>
            Back
          </v-btn>
          <v-btn
            color="#c23616"
            text
            :disabled="!formIsValid"
            @click="createNewContributorAccount"
          >
            Create Account
          </v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </v-row>
</template>

<script>
/* eslint-disable */
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
import validationMixins from "../../mixins/validationMixins";
import { EventBus } from "../../utils/event-bus";
export default {
  mixins: [validationMixin, validationMixins],
  name: "Signup_contributor",
  validations: {
    password: {
      required,
    },
    email: {
      required,
    },
    username: {
      required,
    },
    dob: {
      required,
    },
  },
  data: () => ({
    email: "",
    password: "",
    username: "",
    select: "Creator",
    date: null,
    menu: false,
    loading: false,
    msg: null,
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
  computed: {
    ...mapGetters({ getContributor: "getContributor", getMsg: "getMsg" }),
    formIsValid() {
      return this.username && this.password && this.email && this.date;
    },
  },
  methods: {
    ...mapActions({ createContributor: "createContributor" }),
    save(date) {
      this.$refs.menu.save(date);
    },
    createNewContributorAccount(e) {
      this.loading = true;
      const form = {
        username: this.username,
        email: this.email,
        password: this.password,
        accountType: this.select,
        dob: this.date,
      };

      this.createContributor(form).then(() => {
        this.loading = false;
        EventBus.$emit("msg", this.getMsg.msg);
        this.$router.push("/");
        this.$v.$touch();
        this.$v.$reset();
        this.username = "";
        this.password = "";
        this.email = "";
        this.date = "";
        // this.selectedEateryType = "";
      });
    },
  },
};
</script>
