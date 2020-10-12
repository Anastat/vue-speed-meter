<template>
  <div>
    <div id="main-container" :style="cssProps">
      <svg id="svg-container">
        <!-- Divide by 2.1 so that the circle is slightly smaller than outer container.
             Otherwise, at a small size (less than 50), the circle border is clipped.-->
        <circle
          class="outer-circle"
          :r="this.size / 2.1"
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
            class="scale-bigger-width"
            :r="scaleRadius"
            :cx="centerPoint"
            :cy="centerPoint"
            stroke="black"
            :stroke-dasharray="this.calculateLongScaleLines()"
          />
          <circle
            class="scale-small-width"
            :r="scaleRadius"
            :cx="centerPoint"
            :cy="centerPoint"
            stroke="black"
            :stroke-dasharray="this.calculateShortScaleLines()"
          />
          <circle
            class="bottom-circle"
            :r="scaleRadius"
            :cx="centerPoint"
            :cy="centerPoint"
            :stroke-width="scaleBiggerWidth + 2"
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
        "--scale-small-width": this.scaleSmallWidth,
        "--scale-bigger-width": this.scaleBiggerWidth,
      };
    },
    centerPoint() {
      return this.size / 2;
    },
    scaleSmallWidth() {
      return this.size * 0.04;
    },
    scaleBiggerWidth() {
      return this.size * 0.08;
    },
    scaleRadius() {
      return this.size / 3;
    },
    scaleCircumference() {
      return Math.PI * 2 * this.scaleRadius;
    },
    // Scale contains 16 equal sections.
    scaleOneSectionLength() {
      return this.scaleCircumference / 16;
    },
  },

  methods: {
    /**
     * Scale contains equal sections.
     * One section has one long line and 4 short lines.
     * Long line is twice as wide as the short line.
     * The space between lines triple the width of long line.
     * So, the formula is next 2 6 1 6 1 6 1 6 1 6
     * There are the first 2 is a width of long line,
     * next 6 is a gap beetween lines, 1 is a width of short line.
     *
     * Thus, the section length should be divided by 36
     * equal parts (2+6+1+6+1+6+1+6+1+6=26).
     *
     * There are two circles - one with long lines and
     * one with short lines.
     */

    // Return stroke-dasharray for long scale lines
    calculateLongScaleLines: function() {
      // The width of the first  line is 2 parts and rest is a gap.
      const onePart = this.scaleOneSectionLength / 36;
      const dasharray = onePart * 2 + " " + onePart * 34;
      return dasharray;
    },
    // Returns stroke-dasharray for short scale lines
    calculateShortScaleLines: function() {
      const onePart = this.scaleOneSectionLength / 36;
      const dasharray =
        "0 " +
        onePart * 8 +
        " " +
        onePart +
        " " +
        onePart * 6 +
        " " +
        onePart +
        " " +
        onePart * 6 +
        " " +
        onePart +
        " " +
        onePart * 6 +
        " " +
        onePart +
        " " +
        onePart * 6;
      return dasharray;
    },
  },
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
}

.scale-bigger-width {
  stroke-width: var(--scale-bigger-width);
}

.scale-small-width {
  stroke-width: var(--scale-small-width);
}

.outer-circle {
  /* Backgroud of whole speed meter*/
  fill: var(--main-background-color);
  /* Border of the outer circle*/
  stroke: var(--border-color);
}

.bottom-circle {
  /* Border color*/
  stroke: var(--main-background-color);
}
</style>
