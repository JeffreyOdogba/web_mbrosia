<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <!-- <h1>{{ video_set.videoTitle }}</h1> -->
      <v-card class="mx-auto" max-width="344" @click="dialog = true">
        <video width="344" controls preload="metadata">
          <source :src="video_set.video" />
        </video>

        <v-card-text>
          <h2>{{ video_set.videoTitle }}</h2>
        </v-card-text>

        <v-fade-transition>
          <v-overlay v-if="hover" absolute color="#036358">
            <v-img src="../../assets/play_mid.png" @click="dialog = true" />
          </v-overlay>
        </v-fade-transition>

        <v-dialog v-model="dialog" max-width="755px">
          <video width="755" controls preload="metadata">
            <source :src="video_set.video" />
          </video>
        </v-dialog>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
export default {
  name: "VideoSetCard",
  props: ["video_set"],

  data: () => ({
    overlay: false,
    dialog: false,
  }),

  methods: {
    remove() {
      console.log("remove");
    },
  },
};
</script>

<style scoped>
video {
  max-width: 100%;
}
</style>
