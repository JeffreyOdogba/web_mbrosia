<template>
  <div id="container">
    <div id="logo-frame">
      <img width="300px" src="../assets/logo.png" />

      <div id="text">
        <span>The recipe app.</span> <br />
        <span>made for</span> <br />
        <span>the</span><br />
        <span>world.</span>
      </div>
    </div>
    <div id="button">
      <router-link to="#">Sign in as a Contributor.</router-link>
      <router-link to="##">Sign in as an Eatery.</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "BannerHome_Mbrosia",
};
</script>

<style scoped>
#container {
  display: flex;
  flex: 1;
  margin-top: 20px;
  flex-direction: column;
}
#container #logo-frame {
  align-self: center;
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
  margin-top: 30px;
}
#button a {
  flex-direction: column;
  margin: 15px;
  align-items: center;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  font-size: 20px;
}

#button a.router-link-exact-active {
  color: #42b983;
}
</style>
