<template>
  <div>
    <v-row justify="center" class="pa-9">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <h1>
              Verify you account.
            </h1>
          </v-col>

          <v-col cols="8">
            <v-text-field
              v-model="email"
              color="#c23616"
              type="email"
              label="Email To LookUp"
            >
            </v-text-field>
          </v-col>
          <v-col cols="8">
            <v-btn color="#c23616" @click="verify" :loading="loading">
              Verify.
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </div>
</template>
<script>
/* eslint-disable */
import { mapActions, mapGetters } from "vuex";
import { EventBus } from "../../utils/event-bus";
export default {
  data: () => ({
    robot: false,
    key: process.env.RECAPTCHA_KEY,
    secret: process.env.RECAPTCHA_SECERT,
    email: "",
  }),

  components: {},
  computed: {
    ...mapGetters({
      getMsg: "getMsg",
      loading: "loading",
    }),
  },
  methods: {
    ...mapActions({
      verify_contributor: "verify_contributor",
    }),
    verify(e) {
      if (this.email !== "") {
        const form = {
          email: this.email,
          token: this.$route.params.token,
        };
        this.verify_contributor(form).then(() => {
          this.$router.push("/");
          EventBus.$emit("msg", this.getMsg.msg);
        });
        //this.$router.push("/");
      } else {
        EventBus.$emit("msg", "Verification is important!");
      }
    },
  },
};
</script>

<style scoped></style>
