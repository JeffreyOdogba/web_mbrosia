<template>
  <div class="home">
    <BannerHomeMbrosia />
  </div>
</template>

<script>
// @ is an alias to /src

import BannerHomeMbrosia from "@/components/BannerHome_Mbrosia.vue";

export default {
  name: "Home",
  components: {
    BannerHomeMbrosia,
  },
};
</script>

<style scoped>
.home {
}
</style>
