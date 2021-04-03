<template>
  <div>
    <VueSpeedMeter
      id="speedometer"
      :customStyle="customStyle"
      :customCurrentValue="currentValue"
      :shadowFilter="shadowFilter"
    />
  </div>
</template>

<script>
export default {
  name: "Speedometer",

  data: function() {
    return {
      currentValue: 100,
      customStyle: {
        size: 350,
        mainBackgroundColor: "#151412",
        borderColor: "#130F0B",
        scaleColor: "#F3B1BB",
        scaleValuesFontFamily: "'Roboto', sans-serif",
        scaleValuesColor: "#F3B1BB",
        scaleStep: 20,
        needleColor: "#EC2437",
        needleCircleColor: "#3F4140",
        needleCircleBorderColor: "#545454",
        animationTime: 3,
      },
      shadowFilter: false,
    };
  },
};
</script>
