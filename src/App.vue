<template>
  <div id="app">
    <VueSpeedMeter :customProps="customValues" />
  </div>
</template>

<script>
import VueSpeedMeter from "./components/vue-speed-meter";

export default {
  name: "App",
  components: {
    VueSpeedMeter,
  },
  data: function() {
    return {
      customValues: {
        size: 500,
        borderColor: "black",
        scaleColor: "black",
      },
    };
  },
};
</script>

<style></style>
