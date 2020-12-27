# vue-speed-meter

Vue component for use in a web application to display round gauges such as a speedometer, thermometer, barometer or tachometer.

![default](/src/assets/example.png)

## Demo

https://anastat.github.io/vue-speed-meter/

### Install

```
npm i vue-speed-meter
```

## Add to project

### Global

```
// main.js
import VueSpeedMeter from "vue-speed-meter";
Vue.component('vue-speed-meter', VueSpeedMeter);
```

### Local Usage

```
<template>
  <div>
    <VueSpeedMeter
      :customStyle="customStyle"
      :customCurrentValue="customCurrentValue"
    />
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
        size: 500,
      },
      customCurrentValue: 20,
    };
  },
 }
</script>
```

### Parameters

| Props                     | Type    | Default                       | Description                                                                            |
| ------------------------- | ------- | ----------------------------- | -------------------------------------------------------------------------------------- |
| customCurrentValue        | Number  | 0                             | Speed meter value.                                                                     |
|                           |         |                               |                                                                                        |
| customStyle:              | Object  |                               |                                                                                        |
| - mainBackgroundColor     | String  | "#051226"                     | Background color of speed meter.                                                       |
| - size                    | Number  | 400                           | Width and height of the speed meter in 'px'.                                           |
| - borderColor             | String  | "#041326"                     | Border color of the outer speed meter circle.                                          |
| - scaleColor              | String  | "#B0CBE9"                     | Color of the scale lines.                                                              |
| - scaleValuesFontFamily   | String  | "'Titillium Web', sans-serif" | Font family of the scale values.                                                       |
| - scaleValuesColor        | String  | "#B0CBE9"                     | Color of the scale values.                                                             |
| - scaleStartValue         | Number  | 0                             | Start value of the scale.                                                              |
| - scaleStep               | Number  | 20                            | Scale step between long lines. Cannot be 0 or negative value.                          |
| - animationTime           | Number  | 1                             | Time of animation in seconds. Time of moving needle from start value to current value. |
| - needleColor             | String  | "#FE3816"                     | Color of the speed meter needle.                                                       |
| - needleCircleColor       | String  | "#041326"                     | Color of the small needle circle.                                                      |
| - needleCircleBorderColor | String  | "#62A6F1"                     | Color of the border of small needle circle.                                            |
|                           |         |                               |                                                                                        |
| needleAnimation           | Boolean | true                          | Animation of needle. Moving from 0 to current value. Can be disabled with 'false'.     |
|                           |         |                               |                                                                                        |
| shadowFilter              | Boolean | true                          | Shadow of the scale values and needle circle.                                          |
