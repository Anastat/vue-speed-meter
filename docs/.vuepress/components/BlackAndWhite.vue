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
export default {
  name: "BlackAndWhite",

  data: function() {
    return {
      currentValue: 25,
      customStyleBlackAndWhite: {
        size: 350,
        mainBackgroundColor: "white",
        borderColor: "black",
        scaleColor: "black",
        scaleValuesFontFamily: "'Old Standard TT', serif",
        scaleValuesColor: "black",
        scaleStartValue: -30,
        scaleStep: 5,
        needleColor: "black",
        needleCircleColor: "black",
        needleCircleBorderColor: "black",
        animationTime: 5,
      },
      shadowFilterBlackAndWhite: false,
    };
  },
};
</script>
