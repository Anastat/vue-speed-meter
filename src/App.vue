<template>
  <div id="app">
    <VueSpeedMeter />
    <div>
      <VueSpeedMeter
        id="blackAndWhite"
        :customStyle="customStyleBlackAndWhite"
        :customCurrentValue="35"
        :shadowFilter="shadowFilterBlackAndWhite"
      />
    </div>
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
      currentValue: 40,
      customStyleBlackAndWhite: {
        size: 500,
        mainBackgroundColor: "white",
        borderColor: "black",
        scaleColor: "black",
        scaleValuesFontFamily: "'Old Standard TT', serif",
        scaleValuesColor: "black",
        scaleStartValue: 0,
        scaleStep: 10,
        needleColor: "black",
        needleCircleColor: "black",
        needleCircleBorderColor: "black",
      },
      shadowFilterBlackAndWhite: false,
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

<style></style>
