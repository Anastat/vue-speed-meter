# Getting Started

UI component to display round gauges such as speedometer, thermometer, barometer or tachometer.

## Install

```sh
npm i vue-speed-meter
```

## Add to Project

### Global

```js
// main.js
import VueSpeedMeter from "vue-speed-meter";
Vue.component("vue-speed-meter", VueSpeedMeter);
```

### Local Usage

```js
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

## CDN

The component is accessible on Content Delivery Network (CDN), so it can be included in websites.

```js
<script src="https://unpkg.com/vue-speed-meter"></script>
```
