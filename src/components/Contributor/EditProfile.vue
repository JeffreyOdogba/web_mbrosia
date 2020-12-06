<template>
  <v-dialog v-model="dialog" scrollable persistent max-width="600px">
    <v-card class="mx-auto pa-3" height="100%">
      <v-form>
        <v-row class="d-flex align-center mx-3">
          <v-btn icon color="#c23616">
            <v-icon color="#c23616" elevation="3" outlined @click="close_click"
              >mdi-close</v-icon
            >
          </v-btn>

          <h3 class="mx-3 ">Edit profile</h3>
          <v-spacer></v-spacer>
          <v-btn color="#c23616" @click="save_click" rounded>
            <span class="text">Save</span>
          </v-btn>
        </v-row>
        <div class="d-flex justify-center">
          <label>
            <v-file-input
              accept="image/*"
              v-model="photoAvater"
              style="display:none"
              @change="onFileChange"
            >
            </v-file-input>

            <v-avatar size="160">
              <v-overlay absolute opacity="0.25">
                <v-icon size="25">
                  mdi-camera-enhance-outline
                </v-icon>
              </v-overlay>
              <v-icon
                v-if="!selected_file && !contributor.photoAvater"
                size="180"
                color="#c23616"
              >
                mdi-account-circle
              </v-icon>
              <v-img v-if="selected_file" :src="selected_file" />
              <v-img
                v-if="!selected_file && contributor.photoAvater"
                :src="contributor.photoAvater"
              />
            </v-avatar>
          </label>
        </div>
        <div>
          <v-col cols="12">
            <v-text-field
              color="#c23616"
              label="Name"
              v-model="fullname"
              :value="fullname_auto"
              filled
              counter
              maxlength="20"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              color="#c23616"
              label="Bio"
              v-model="bio"
              :value="bio_auto"
              filled
              counter
              maxlength="160"
            >
            </v-textarea>
          </v-col>
          <v-col cols="12">
            <v-text-field
              color="#c23616"
              label="Loaction"
              v-model="location"
              :value="location_auto"
              filled
              counter
              maxlength="20"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              color="#c23616"
              label="Website"
              v-model="website"
              :value="website_auto"
              filled
              counter
              maxlength="100"
            >
            </v-text-field>
          </v-col>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions } from "vuex";
import { EventBus } from "../../utils/event-bus";
export default {
  name: "EditProfile",
  props: ["dialog", "contributor"],
  components: {},
  data() {
    return {
      dialogChild: false,
      selected_file: null,
      photoAvater: null,
      fullname: "",
      bio: "",
      location: "",
      website: "",
    };
  },
  computed: {
    ...mapGetters({ msg: "getMsg" }),

    fullname_auto() {
      return (this.fullname = this.contributor.fullname);
    },
    bio_auto() {
      return (this.bio = this.contributor.bio);
    },
    location_auto() {
      return (this.location = this.contributor.location);
    },
    website_auto() {
      return (this.website = this.contributor.website);
    },
  },
  methods: {
    ...mapActions({ update: "updateProfile" }),

    close_click() {
      //   this.dialog = !this.dialog;
      this.$emit("close_dialog", this.dialogChild);
    },
    onFileChange(e) {
      console.log(e);
      this.selected_file = URL.createObjectURL(e);
    },
    save_click(e) {
      const fd = new FormData();
      fd.append("photoAvater", this.photoAvater);
      fd.append("fullname", this.fullname);
      fd.append("bio", this.bio);
      fd.append("location", this.location);
      fd.append("website", this.website);

      this.update(fd).then(() => {
        EventBus.$emit("msg", this.msg);
        this.$emit("close_dialog", this.dialogChild);
      });
    },
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
.v-dialog__content {
  height: 70%;
  align-items: center;
  display: flex;
  justify-content: center;
  left: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  transition: 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), z-index 1ms;
  width: 100%;
  z-index: 6;
  outline: none;
}
</style>
