<template>
  <div class="pa-2">
    <v-avater size="110">
      <v-icon size="100" color="#c23616">
        mdi-account-circle
      </v-icon>
    </v-avater>
    <div class="pa-3">
      <v-row>
        <p>@Username</p>
        <v-spacer></v-spacer>
        <v-btn class="text" color="#c23616" elevation="3">
          Edit profile
        </v-btn>
      </v-row>
    </div>

    <div class="px-1 my-2">
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae culpa
        corrupti illum eos, non facilis, placeat, quis voluptate doloribus
        impedit magnam mollitia dolorum. Voluptatem inventore doloremque a odio
        sit voluptates?
      </span>
    </div>
    <div class="px-3 my-2">
      <v-row>
        <div>
          <v-icon color="#c23616">
            mdi-map-marker-outline
          </v-icon>
          <span class="mx-1">Nigeria 🇳🇬 </span>
        </div>
        <div class="mx-5">
          <v-icon color="#c23616">
            mdi-calendar-month
          </v-icon>
          <span class="mx-1">Joined April 2011</span>
        </div>
      </v-row>
    </div>
    <div class="px-3 my-auto">
      <v-row>
        <span class="mx-2"><b>32,222</b> Views</span>
        <span class="mx-2"><b>21,000</b> Likes</span>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileAccount",
};
</script>

<style scoped>
.text {
  color: antiquewhite;
}
</style>
