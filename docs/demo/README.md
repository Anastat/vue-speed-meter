# Demo

## Default

::: center

<VueSpeedMeter/>

:::

```vue
<template>
  <div>
    <VueSpeedMeter :customStyle="customStyle" />
  </div>
</template>

<script>
import VueSpeedMeter from "vue-speed-meter";

export default {
  name: "Component",
  components: {
    VueSpeedMeter,
  },
  data: function() {
    return {
      customStyle: {
        size: 300,
      },
    };
  },
};
</script>
```

## Thermometer

::: center

<BlackAndWhite/>

:::

```vue
<template>
  <div>
    <VueSpeedMeter id="blackAndWhite" "customStyleBlackAndWhite"
    :customCurrentValue="currentValue" :shadowFilter="shadowFilterBlackAndWhite"
    />
  </div>
</template>

<script>
import VueSpeedMeter from "vue-speed-meter";

export default {
  name: "BlackAndWhite",

  components: {
    VueSpeedMeter,
  },

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
```
