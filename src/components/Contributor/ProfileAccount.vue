<template>
  <div class="pa-2">
    <v-avatar size="100">
      <v-img v-if="contributor.photoAvater" :src="contributor.photoAvater">
      </v-img>
      <v-icon v-else size="100" color="#c23616">
        mdi-account-circle
      </v-icon>
    </v-avatar>
    <div class="pa-3">
      <v-row>
        <p class="p-username">@{{ contributor.username }}</p>
        <v-spacer></v-spacer>
        <v-btn color="#c23616" elevation="3" outlined @click="close_click">
          Edit profile
        </v-btn>
      </v-row>
    </div>

    <div class="px-1 my-2">
      <span>
        {{ contributor.bio }}
      </span>
    </div>
    <div class="px-3 my-2">
      <v-row>
        <div>
          <v-icon color="#c23616">
            mdi-map-marker-outline
          </v-icon>
          <span class="mx-1">{{ contributor.location }} </span>
        </div>
        <div class="link-website mx-2">
          <v-icon color="#c23616">
            mdi-link-variant
          </v-icon>
          <a :href="contributor.website" target="_blank">{{
            contributor.website
          }}</a>
        </div>
        <div class="mx-1">
          <v-icon color="#c23616">
            mdi-calendar-month
          </v-icon>
          <span class="mx-1">Joined {{ formatDate }} </span>
        </div>
      </v-row>
    </div>
    <div class="px-3 my-auto">
      <v-row>
        <span class="mx-2"><b>32,222</b> Views</span>
        <span class="mx-2"><b>21,000</b> Likes</span>
        <span class="mx-2"><b>591,000</b> Followers</span>
      </v-row>
    </div>
    <EditProfile
      :dialog="dialog"
      :contributor="contributor"
      @close_dialog="close_click"
    />
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import EditProfile from "./EditProfile";
export default {
  name: "ProfileAccount",
  components: { EditProfile },
  data: () => ({
    dialog: false,
    joinedDate: "",
  }),
  computed: {
    ...mapGetters({
      contributor: "getContributor",
    }),
    formatDate() {
      return (this.joinedDate = moment(this.contributor.createdAt).format(
        "MMM YYYY"
      ));
    },
  },

  methods: {
    ...mapActions({
      fetchContributor: "fetchContributor",
    }),
    close_click(value) {
      this.dialog = !this.dialog;
    },
  },
  created() {
    this.fetchContributor();
  },
};
</script>

<style>
.text {
  color: antiquewhite;
  font-weight: 800;
}
.v-text-field .v-counter {
  font-size: 15px;
  font-weight: 700;
}
.link-website a {
  text-decoration: none;
}
.link-website a:hover {
  text-decoration-line: underline;
}
.p-username {
  font-weight: 700;
}
</style>
