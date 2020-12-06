<template>
  <v-container>
    <div class="d-flex justify-center mb-6 ">
      <label>
        <v-file-input
          accept="video/mp4, video/webm"
          v-model="video"
          style="display:none"
          @change="onFileChange"
        ></v-file-input>
        <video v-if="selected_file" class="rounded-lg " controls>
          <source :src="selected_file" />
        </video>
        <!-- <img
          v-if="selected_file"
          width="200"
          align="center"
          class="rounded-lg"
          :src="selected_file"
        /> -->
        <img
          v-else
          width="200"
          align="center"
          src="../../assets/upload_big.png"
        />
      </label>
    </div>

    <div class="d-flex justify-center ">
      <v-btn
        v-if="video && selected_file"
        color="#c23616"
        @click="dialog = true"
      >
        Video details
      </v-btn>
    </div>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <form enctype="multipart/form-data">
        <v-card :loading="isVideoSetLoading">
          <v-card-title>
            Details about video
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    color="#c23616"
                    v-model="videoTitle"
                    label="Video Title"
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    outlined
                    v-model="videoSummary"
                    color="#c23616"
                    name="input-7-4"
                    label="Summary Of Video"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-btn class="mr-4" @click="close">
                Cancel
              </v-btn>

              <v-btn @click="upload_click" color="#c23616">
                Upload
              </v-btn>
            </v-container>
          </v-card-text>
        </v-card>
      </form>
    </v-dialog>

    <v-row
      v-if="isVideoSetLoading"
      class="fill-height"
      align-content="center"
      justify="center"
    >
      <v-col class="subtitle-1 text-center" cols="12">
        Getting your sets
      </v-col>
      <v-col cols="6">
        <v-progress-linear
          color="#c23616"
          indeterminate
          rounded
          height="6"
        ></v-progress-linear>
      </v-col>
    </v-row>

    <div class="my-7" v-for="video_set in video_set" :key="video_set._id">
      <VideoSetCard :video_set="video_set" />
    </div>
  </v-container>
</template>

<script>
/* eslint-disable prettier/prettier */
import { mapGetters, mapActions } from "vuex";
import { EventBus } from "../../utils/event-bus";
import VideoSetCard from "../../components/Contributor/VideoSetCard";
export default {
  name: "Recipe_Video",

  components: {
    VideoSetCard,
  },

  data: () => ({
    video: null,
    selected_file: null,
    dialog: false,
    loading: false,
    videoTitle: null,
    videoSummary: null,
  }),
  computed: {
    ...mapGetters({
      videoSet_msg: "videoSet_msg",
      isVideoSetLoading: "isVideoSetLoading",
      video_set: "get_all_video_set",
    }),
    video_list() {
      return console.log("loading from Back", this.isVideoSetLoading);
    },
  },
  methods: {
    ...mapActions({
      add_Recipe_Video: "add_Recipe_Video",
      getVideoSet: "getVideoSet",
    }),
    onFileChange(e) {
      console.log(e);
      this.selected_file = URL.createObjectURL(e);
    },
    close() {
      this.dialog = false;
      this.selected_file = null;
    },
    upload_click(e) {
      e.preventDefault();
      this.loading = true;

      const fd = new FormData();
      fd.append("videoTitle", this.videoTitle);
      fd.append("videoSummary", this.videoSummary);
      fd.append("video", this.video, this.video.name);

      this.add_Recipe_Video(fd)
        .then(() => {
          this.loading = false;
          this.dialog = !this.dialog;
          this.videoTitle = null;
          this.videoSummary = null;
          EventBus.$emit("msg", this.videoSet_msg);
        })
        .catch(() => {
          this.loading = false;
          EventBus.$emit("msg", this.videoSet_msg);
        });
    },
  },
  created() {
    this.getVideoSet();
    console.log(this.video_set);
  },
};
</script>

<style scoped></style>
