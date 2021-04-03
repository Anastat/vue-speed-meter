<template>
  <div>
    <VueSpeedMeter
      id="blackAndWhite"
      :customStyle="customStyleBlackAndWhite"
      :customCurrentValue="currentValue"
      :shadowFilter="shadowFilterBlackAndWhite"
    />
  </div>
</template>

<script>
import VueSpeedMeter from "./vue-speed-meter";

export default {
  name: "BlackAndWhite",

  components: {
    VueSpeedMeter,
  },

  data: function() {
    return {
      currentValue: 100,
      customStyleBlackAndWhite: {
        size: 350,
        mainBackgroundColor: "#151412",
        borderColor: "#130F0B",
        scaleColor: "#F3B1BB",
        scaleValuesFontFamily: "'Roboto', sans-serif",
        scaleValuesColor: "#F0C7CD",
        scaleStep: 20,
        needleColor: "#EC2437",
        needleCircleColor: "#3F4140",
        needleCircleBorderColor: "#F3B1BB",
        animationTime: 3,
      },
    };
  },
};
</script>
