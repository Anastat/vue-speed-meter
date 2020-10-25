<template>
  <div id="app">
    <VueSpeedMeter
      :customStyle="customStyle"
      :customCurrentValue="currentValue"
    />
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
      customStyle: {
        size: 500,
        scaleColor: "#B0CBE9",
      },
      currentValue: 430,
    };
  },
  methods: {
    animateCurrentValue: function() {
      setInterval(() => {
        this.currentValue = Math.floor(Math.random() * 120 + 1);
      }, 1000);
    },
  },
  created: function() {
    //this.animateCurrentValue();
  },
};
</script>

<style>
/* Import Google Font styles. */
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@200&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Old+Standard+TT&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Kameron&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Copse&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Copse&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@100;300&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200&display=swap");
</style>
