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
        <path
          id="text-path"
          fill="transparent"
          :d="circleToPath()"
          :transform="`rotate(-47 ${centerPoint} ${centerPoint}) `"
        />
        <text class="scale-values">
          <textPath xlink:href="#text-path">
            <tspan v-text="scaleStartValue" />
            <tspan x="14%" v-text="scaleStartValue + scaleStep" />
            <tspan x="31%" v-text="scaleStartValue + scaleStep * 2" />
            <tspan x="47%" v-text="scaleStartValue + scaleStep * 3" />
            <tspan x="63%" v-text="scaleStartValue + scaleStep * 4" />
            <tspan x="79%" v-text="scaleStartValue + scaleStep * 5" />
            <tspan x="95%" v-text="scaleStartValue + scaleStep * 6" />
            <tspan x="111%" v-text="scaleStartValue + scaleStep * 7" />
            <tspan x="127%" v-text="scaleStartValue + scaleStep * 8" />
            <tspan x="143%" v-text="scaleStartValue + scaleStep * 9" />
            <tspan x="157%" v-text="scaleStartValue + scaleStep * 10" />
            <tspan x="173%" v-text="scaleStartValue + scaleStep * 11" />
            <tspan x="190%" v-text="scaleStartValue + scaleStep * 12" />
          </textPath>
        </text>
        <!-- Rotation in SVG works only as inline style. 
             Rotate on 89 degree so needle points to the center of each scale line. -->
        <g
          class="scale-circles"
          stroke-dasharray="25% 160%"
          :transform="`rotate(89.5 ${centerPoint} ${centerPoint}) `"
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
        <polygon
          class="speedometer-needle"
          :points="calculateNeedlePoint()"
          :transform="
            `rotate(${currentValueInDegrees} ${centerPoint} ${centerPoint})`
          "
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            :from="`0 ${centerPoint} ${centerPoint}`"
            :to="`${currentValueInDegrees} ${centerPoint} ${centerPoint}`"
            :dur="`${this.animationTime}s`"
          />
        </polygon>
        <circle
          class="small-center-circle"
          :r="smallCenterCircleRadius"
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
      // Imported Google Fonts:
      // 'Old Standard TT', serif
      // 'Oswald', sans-serif
      // 'Roboto', sans-serif
      // 'Kameron', serif
      // 'Copse', serif
      // 'Lato', sans-serif
      // 'Titillium Web', sans-serif
      scaleValuesFontFamily:
        this.customProps.scaleValuesFontFamily || "'Titillium Web', sans-serif",
      scaleValuesColor: this.customProps.scaleValuesColor || "yellow",
      scaleStartValue: this.customProps.scaleStartValue || 0,
      scaleStep: this.customProps.scaleStep || 10,
      currentValue: this.customProps.currentValue || 45,
      animationTime: this.customProps.animationTime || 5,
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
        "--scale-values-font-size": this.scaleValuesFontSize,
        "--scale-values-font-family": this.scaleValuesFontFamily,
        "--scale-values-color": this.scaleValuesColor,
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
    smallCenterCircleRadius() {
      return this.size / 14;
    },
    scaleCircumference() {
      return Math.PI * 2 * this.scaleRadius;
    },
    // Scale contains 16 equal sections.
    scaleOneSectionLength() {
      return this.scaleCircumference / 16;
    },
    scaleValuesFontSize() {
      return this.size * 0.05 + "px";
    },
    scaleRange() {
      return this.scaleStartValue + this.scaleStep * 12 - this.scaleStartValue;
    },
    // Calculate current value for rotation the speed meter needle.
    currentValueInDegrees() {
      // Range from 0 degrees to 270 degrees
      return (270 * this.currentValue) / this.scaleRange;
    },
  },

  methods: {
    /**
     * Converts circle to path for text.
     *
     */

    circleToPath: function() {
      const r = this.size / 2.45;
      return (
        "M " +
        this.centerPoint +
        " " +
        this.centerPoint +
        " m -" +
        r +
        ", 0 a " +
        r +
        "," +
        r +
        " 0 1,1 " +
        r * 2 +
        ",0 a " +
        r +
        "," +
        r +
        " 0 1,1 -" +
        r * 2 +
        ",0"
      );
    },
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

    /**
     * Calculate points for needle based on radius.
     */
    calculateNeedlePoint: function() {
      // Radius for bottom of the needle.
      const smallRadius = this.smallCenterCircleRadius / 2.5;
      // Radius for top point of the needle.
      const topPointRadius = this.size / 2.25;

      return (
        this.pointOnCircumference(smallRadius, 235) +
        ", " +
        this.pointOnCircumference(smallRadius, 45) +
        ", " +
        this.pointOnCircumference(topPointRadius, 135)
      );
    },
    pointOnCircumference: function(radius, angleInDeegrees) {
      // Convert from Degrees to Radians
      const angleInRadians = angleInDeegrees * (Math.PI / 180);
      const x = this.centerPoint + radius * Math.cos(angleInRadians);
      const y = this.centerPoint + radius * Math.sin(angleInRadians);
      return x + " " + y;
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
/* Scale with long lines.*/
.scale-bigger-width {
  stroke-width: var(--scale-bigger-width);
}
/* Scale with short lines.*/
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

.scale-values {
  font-size: var(--scale-values-font-size);
  font-family: var(--scale-values-font-family);
  fill: var(--scale-values-color);
}
</style>
