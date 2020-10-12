<template>
  <div>
    <div id="main-container" :style="cssProps">
      <svg id="svg-container">
        <circle
          class="outer-circle"
          :r="this.size / 2"
          :cx="centerPoint"
          :cy="centerPoint"
        />
        <!-- Rotation in SVG works only as inline style-->
        <g
          class="scale-circles"
          stroke-dasharray="25% 160%"
          :transform="`rotate(90 ${centerPoint} ${centerPoint}) `"
        >
          <circle
            :r="this.size / 3"
            :cx="centerPoint"
            :cy="centerPoint"
            stroke="black"
            stroke-dasharray="1 5 10 15"
          />
          <circle
            class="bottom-circle"
            :r="this.size / 3"
            :cx="centerPoint"
            :cy="centerPoint"
            :stroke-width="scaleWidth + 2"
          />
        </g>
        <circle
          class="midle-circle"
          :r="this.size / 14"
          :cx="centerPoint"
          :cy="centerPoint"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "VueSpeedMeter",
  props: {
    customProps: {
      type: Object,
    },
  },
  data: function() {
    return {
      // If some of the custom props are not set, apply default values.
      mainBackgroundColor: this.customProps.mainBackgroundColor || "red",
      size: this.customProps.size || 400,
      borderColor: this.customProps.borderColor || "black",
      scaleColor: this.customProps.scaleColor || "green",
    };
  },

  computed: {
    cssProps() {
      return {
        "--main-background-color": this.mainBackgroundColor,
        "--circle-size": this.size + "px",
        "--border-color": this.borderColor,
        "--scale-color": this.scaleColor,
        "--center-point": this.centerPoint,
        "--scale-width": this.scaleWidth,
      };
    },
    centerPoint() {
      return this.size / 2;
    },
    scaleWidth() {
      return this.size * 0.04;
    },
  },

  methods: {},
};
</script>

<style scoped>
#main-container {
  position: relative;
  height: var(--circle-size);
  width: var(--circle-size);
}

#svg-container {
  position: absolute;
  width: var(--circle-size);
  height: var(--circle-size);
}

.scale-circles {
  fill: none;
  stroke-width: var(--scale-width);
}

.outer-circle {
  /* Backgroud of whole speed meter*/
  fill: var(--main-background-color);
  stroke: var(--border-color);
}

.bottom-circle {
  /* Border color*/
  stroke: var(--main-background-color);
}
</style>
