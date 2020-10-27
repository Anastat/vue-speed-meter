<template>
  <div>
    <div class="main-container" :style="cssProps">
      <svg class="svg-container">
        <defs>
          <filter id="outer-shadow">
            <feDropShadow
              dx="0"
              dy="0"
              :stdDeviation="size * 0.007"
              :flood-color="needleCircleBorderColor"
            />
          </filter>
        </defs>
        <!-- Divide by 2.02 so that the circle is slightly smaller than outer container.
             Otherwise, at a small size (less than 50), the circle border is clipped.
             The circle border takes 1% of width (see .outer-circle css).-->
        <circle
          class="outer-circle"
          :r="this.size / 2.02"
          :cx="centerPoint"
          :cy="centerPoint"
        />
        <path
          :id="`text-path-${this._uid}`"
          fill="transparent"
          :d="circleToPath()"
          :transform="`rotate(-90 ${centerPoint} ${centerPoint}) `"
        />
        <!-- letter-spacing is a 0.05% of svg-container size -->
        <text
          class="scale-values"
          :letter-spacing="this.size * -0.005"
          :filter="shadowFilter ? 'url(#outer-shadow)' : ''"
        >
          <textPath :xlink:href="`#text-path-${this._uid}`">
            <tspan
              :id="`value-1-${this._uid}`"
              x="30.25%"
              v-text="scaleStartValue"
            />
            <!-- X value defines a space between scale values.-->
            <tspan
              :id="`value-2-${this._uid}`"
              x="45.35%"
              v-text="scaleStartValue + scaleStep"
            />
            <tspan
              :id="`value-3-${this._uid}`"
              x="60.45%"
              v-text="scaleStartValue + scaleStep * 2"
            />
            <tspan
              :id="`value-4-${this._uid}`"
              x="75.55%"
              v-text="scaleStartValue + scaleStep * 3"
            />
            <tspan
              :id="`value-5-${this._uid}`"
              x="90.65%"
              v-text="scaleStartValue + scaleStep * 4"
            />
            <tspan
              :id="`value-6-${this._uid}`"
              x="105.75%"
              v-text="scaleStartValue + scaleStep * 5"
            />
            <tspan
              :id="`value-7-${this._uid}`"
              x="121%"
              v-text="scaleStartValue + scaleStep * 6"
            />
            <tspan
              :id="`value-8-${this._uid}`"
              x="136.5%"
              v-text="scaleStartValue + scaleStep * 7"
            />
            <tspan
              :id="`value-9-${this._uid}`"
              x="151.5%"
              v-text="scaleStartValue + scaleStep * 8"
            />
            <tspan
              :id="`value-10-${this._uid}`"
              x="166.5%"
              v-text="scaleStartValue + scaleStep * 9"
            />
            <tspan
              :id="`value-11-${this._uid}`"
              x="181.5%"
              v-text="scaleStartValue + scaleStep * 10"
            />
            <tspan
              :id="`value-12-${this._uid}`"
              x="196.5%"
              v-text="scaleStartValue + scaleStep * 11"
            />
            <tspan
              :id="`value-13-${this._uid}`"
              x="211.5%"
              v-text="scaleMaxValue"
            />
          </textPath>
        </text>
        <!-- Rotation in SVG works only as inline style. 
             Rotate on 89.35 degree so needle points to the center of each scale line. -->
        <g
          class="scale-circles"
          stroke-dasharray="24% 149%"
          :transform="`rotate(89.35 ${centerPoint} ${centerPoint}) `"
        >
          <circle
            class="scale-bigger-width"
            :r="scaleRadius"
            :cx="centerPoint"
            :cy="centerPoint"
            :stroke-dasharray="this.calculateLongScaleLines()"
          />
          <circle
            class="scale-small-width"
            :r="scaleRadius"
            :cx="centerPoint"
            :cy="centerPoint"
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
          :key="customCurrentValue"
          class="speedometer-needle"
          :points="calculateNeedlePoint()"
          :transform="
            `rotate(${currentValueInDegrees} ${centerPoint} ${centerPoint})`
          "
        >
          <template v-if="animation">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              :from="`0 ${centerPoint} ${centerPoint}`"
              :to="`${currentValueInDegrees} ${centerPoint} ${centerPoint}`"
              :dur="`${this.animationTime}s`"
            />
          </template>
        </polygon>
        <circle
          class="needle-circle"
          :r="needleCircleRadius"
          :cx="centerPoint"
          :cy="centerPoint"
          :filter="shadowFilter ? 'url(#outer-shadow)' : ''"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "VueSpeedMeter",
  props: {
    customStyle: {
      type: Object,
      default: function() {
        return {};
      },
    },
    customCurrentValue: {
      type: Number,
      default: 0,
    },
    shadowFilter: {
      type: Boolean,
      default: true,
    },
    needleAnimation: {
      type: Boolean,
      default: true,
    },
  },
  data: function() {
    return {
      // If some of the custom props are not set, apply default values.
      mainBackgroundColor: this.customStyle.mainBackgroundColor || "#051226",
      size: this.customStyle.size || 400,
      borderColor: this.customStyle.borderColor || "#041326",
      scaleColor: this.customStyle.scaleColor || "#B0CBE9",
      // Imported Google Fonts:
      // 'Old Standard TT', serif
      // 'Oswald', sans-serif
      // 'Roboto', sans-serif
      // 'Kameron', serif
      // 'Copse', serif
      // 'Lato', sans-serif
      // 'Titillium Web', sans-serif
      scaleValuesFontFamily:
        this.customStyle.scaleValuesFontFamily || "'Titillium Web', sans-serif",
      scaleValuesColor: this.customStyle.scaleValuesColor || "#B0CBE9",
      scaleStartValue: this.customStyle.scaleStartValue || 0,
      scaleStep: this.customStyle.scaleStep || 20,
      animationTime: this.customStyle.animationTime || 1,
      needleColor: this.customStyle.needleColor || "#FE3816",
      needleCircleColor: this.customStyle.needleCircleColor || "#041326",
      needleCircleBorderColor:
        this.customStyle.needleCircleBorderColor || "#62A6F1",
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
        "--needle-circle-color": this.needleCircleColor,
        "--needle-circle-border-color": this.needleCircleBorderColor,
        "--needle-color": this.needleColor,
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
      return this.size / 3.2;
    },
    scaleValuesRadius() {
      return this.size / 2.6;
    },
    needleCircleRadius() {
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
      return this.size * 0.06 + "px";
    },
    scaleRange() {
      return this.scaleStartValue + this.scaleStep * 12 - this.scaleStartValue;
    },
    scaleMaxValue() {
      return this.scaleStartValue + this.scaleStep * 12;
    },
    valueOnScale() {
      return this.customCurrentValue - this.scaleStartValue;
    },
    // Calculate current value for rotation the speed meter needle.
    currentValueInDegrees() {
      // Range from 0 degrees to 270 degrees
      if (this.scaleStep <= 0) {
        //console.log("Scale step cannot be 0 or negative value.");
        return 0;
      }
      if (
        this.customCurrentValue >= this.scaleStartValue &&
        this.customCurrentValue <= this.scaleMaxValue
      ) {
        return (270 * this.valueOnScale) / this.scaleRange;
      } else if (this.customCurrentValue > this.scaleMaxValue) return 270;
      return 0;
    },
  },

  methods: {
    /**
     * Converts circle to path for text.
     *
     */
    circleToPath: function() {
      const r = this.size / 2.6;
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
     * Calculate points for needle.
     */
    calculateNeedlePoint: function() {
      // Radius for bottom of the needle.
      const smallRadius = this.needleCircleRadius / 3.5;
      // Radius for top point of the needle.
      const topPointRadius = this.size / 2.4;

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
  /**
   * Places scale values to the center of the scale line.
   */
  mounted: function() {
    for (let valueElNum = 1; valueElNum <= 13; valueElNum++) {
      const el = document.getElementById(`value-${valueElNum}-${this._uid}`);
      const textLength = el.getComputedTextLength();
      el.setAttribute("dx", -textLength / 2);
    }
  },
};
</script>

<style scoped>
/* Import Google Font styles. */
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@200&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Old+Standard+TT&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Kameron&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Copse&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Copse&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@100;300&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200&display=swap");

.main-container {
  height: var(--circle-size);
  width: var(--circle-size);
}
.svg-container {
  width: var(--circle-size);
  height: var(--circle-size);
}

.scale-circles {
  fill: none;
  stroke: var(--scale-color);
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
  stroke-width: 1%;
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

.needle-circle {
  fill: var(--needle-circle-color);
}

.speedometer-needle {
  fill: var(--needle-color);
  /*stroke-linejoin: round;*/
}
</style>
