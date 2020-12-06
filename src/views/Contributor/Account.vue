<template>
  <div>
    <v-card max-width="1000" outlined elevation="1" class="mx-auto my-12">
      <v-container>
        <h1>Account</h1>
        <ProfileAccount />
      </v-container>
    </v-card>
  </div>
</template>

<script>
/* eslint-disable */
import ProfileAccount from "../../components/Contributor/ProfileAccount";
export default {
  name: "Account",
  components: { ProfileAccount },

  data: () => ({}),
};
</script>

<style></style>
