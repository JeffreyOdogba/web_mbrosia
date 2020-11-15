<template>
  <div id="footer-container">
    <p>@Mbrosia {{ new Date().getFullYear() }}.</p>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
#footer-container {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
}
#footer-container p {
  display: flex;
  flex: 1;
  justify-content: center;
}
</style>
