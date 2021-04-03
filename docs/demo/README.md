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
    <VueSpeedMeter
      :customCurrentValue="currentValue"
      :shadowFilter="shadowFilterBlackAndWhite"
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

## Speedometer

::: center

<Speedometer/>

:::

```vue
<template>
  <div>
    <VueSpeedMeter
      :customStyle="customStyle"
      :customCurrentValue="currentValue"
      :shadowFilter="shadowFilter"
    />
  </div>
</template>

<script>
import VueSpeedMeter from "vue-speed-meter";

export default {
  name: "Speedometer",

  components: {
    VueSpeedMeter,
  },

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
```
