<template>
  <div>
    <table>
      <tr>
        <td style="text-align: -webkit-center">
          <h2>Default</h2>
          <VueSpeedMeter :customStyle="customStyle" :customCurrentValue="25" />
        </td>
        <td>
          <pre><code>{{codeSampleDefault}}</code></pre>
        </td>
      </tr>
      <tr>
        <td style="text-align: -webkit-center">
          <h2>Thermometer 'Black&White'</h2>
          <VueSpeedMeter
            id="blackAndWhite"
            :customStyle="customStyleBlackAndWhite"
            :customCurrentValue="25"
            :shadowFilter="shadowFilterBlackAndWhite"
          />
        </td>
        <td>
          <pre><code>{{codeSample}}</code></pre>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import VueSpeedMeter from "./vue-speed-meter";
export default {
  name: "Demo",
  components: {
    VueSpeedMeter,
  },
  data: function() {
    return {
      customStyle: {
        size: 300,
      },
      currentValue: 40,
      customStyleBlackAndWhite: {
        size: 500,
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
      codeSample: `
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
        import VueSpeedMeter from "vue-speed-meter";
        export default {
        name: "Component",
        components: {
            VueSpeedMeter,
        },
        data: function() {
            return {
            currentValue: 25,
            customStyleBlackAndWhite: {
                size: 500,
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
        <script> 
      `,
      codeSampleDefault: `
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
        <script> 
       `,
    };
  },
  methods: {
    animateCurrentValue: function() {
      setInterval(() => {
        this.currentValue = Math.floor(Math.random() * 120 + 1);
      }, 1000);
    },
  },
  created: function() {
    //this.animateCurrentValue();
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
}
td,
th {
  padding: 5px;
  border: 2px solid black;
}
</style>
