<template>
  <div id="container">
    <div id="logo-frame">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2 img"
        contain
        src="../assets/Mbrosai.png"
        transition="scale-transition"
        width="740"
      />
    </div>

    <div id="button">
      <SignInDialog btnName="Sign in as a Contributor." title="Contributor." />
      <SignInDialog btnName="Sign in as an Eatery." title="Eatery." />
    </div>
  </div>
</template>

<script>
import SignInDialog from "../components/SignInDialog.vue";
export default {
  name: "BannerHome_Mbrosia",
  components: {
    // eslint-disable-next-line
    SignInDialog, // eslint-disable-next-line
  },
};
</script>

<style lang="scss" scoped>
#container {
  flex: 1;
  margin-top: 120px;
}
#container #logo-frame {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
}
#logo-frame {
  perspective: 1500px;
  .img {
    transform: rotateX(13deg);
    box-shadow: 2px 10px 30px rgb(165, 74, 74);
    border-radius: 0.25em;
    transition: 0.3s;
  }
  &:hover .img {
    transform: rotate(0);
  }
}
#text {
  text-align: center;
}
#text span {
  text-transform: capitalize;
  font-size: 20px;
}
#button {
  display: flex;
  align-self: center;
  margin-top: 90px;
  flex: 1;
  padding: 30px;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
#button a {
  flex-direction: column;
  margin: 15px;
  align-items: center;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  font-size: 20px;
  padding: 5px;
}

#button a.router-link-exact-active {
  color: #c23616;
}
</style>
