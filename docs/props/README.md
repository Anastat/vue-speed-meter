# Props

## `customCurrentValue`

Current value of the gauge.

<span style="color: var(--accent-color)">Type:</span> `Number`
<br>
<span style="color: var(--accent-color)">Default: </span> `0`

## `customStyle`

A style values object for specifying size and color ​of the component.

<span style="color: var(--accent-color)">Type:</span> `Object`
<br>
<span style="color: var(--accent-color)">Default: </span> `{}`

- ### `size`

Width and height of the gauge in 'px'.

<span style="color: var(--accent-color)">Type:</span> `Number`
<br>
<span style="color: var(--accent-color)">Default: </span> `400`

- ### `mainBackgroundColor`

Main background color of the component.

<span style="color: var(--accent-color)">Type:</span> `String`
<br>
<span style="color: var(--accent-color)">Default: </span> `"#051226"`

- ### `borderColor`

Border color of the outer gauge circle.

<span style="color: var(--accent-color)">Type:</span> `String`
<br>
<span style="color: var(--accent-color)">Default: </span> `'#041326'`

- ### `scaleColor`

The color of the scale lines.

<span style="color: var(--accent-color)">Type:</span> `String`
<br>
<span style="color: var(--accent-color)">Default: </span> `'#B0CBE9'`

- ### `scaleValuesFontFamily`

Font of the scale values.

<span style="color: var(--accent-color)">Type:</span> `String`
<br>
<span style="color: var(--accent-color)">Default: </span> `'Titillium Web', sans-serif'`

::: tip Imported Google Font styles:

- 'Old Standard TT', serif
- 'Oswald', sans-serif
- 'Roboto', sans-serif
- 'Kameron', serif
- 'Copse', serif
- 'Lato', sans-serif
- 'Titillium Web', sans-serif

:::

- ### `scaleValuesColor`

The color of the scale values.

<span style="color: var(--accent-color)">Type:</span> `String`
<br>
<span style="color: var(--accent-color)">Default: </span> `'#B0CBE9'`

- ### `scaleStartValue`

The initial value of the scale.

<span style="color: var(--accent-color)">Type:</span> `Number`
<br>
<span style="color: var(--accent-color)">Default: </span> `0`

- ### `scaleStep`

Scale step between long lines.
::: warning

Cannot be 0 or negative value.

:::

<span style="color: var(--accent-color)">Type:</span> `Number`
<br>
<span style="color: var(--accent-color)">Default: </span> `20`

- ### `animationTime`

Animation time in seconds. The time the needle moves from initial value to current value.

<span style="color: var(--accent-color)">Type:</span> `Number`
<br>
<span style="color: var(--accent-color)">Default: </span> `1`

- ### `needleColor`

The color of the gauge needle.

<span style="color: var(--accent-color)">Type:</span> `String`
<br>
<span style="color: var(--accent-color)">Default: </span> `'#FE3816'`

- ### `needleCircleColor`

The color of the small needle circle.

<span style="color: var(--accent-color)">Type:</span> `String`
<br>
<span style="color: var(--accent-color)">Default: </span> `'#041326'`

- ### `needleCircleBorderColor`

The color of the border of small needle circle.

<span style="color: var(--accent-color)">Type:</span> `String`
<br>
<span style="color: var(--accent-color)">Default: </span> `'#62A6F1'`

## `needleAnimation`

Animation of needle. Moving from 0 to current value. Can be disabled with 'false'.

<span style="color: var(--accent-color)">Type:</span> `Boolean`
<br>
<span style="color: var(--accent-color)">Default: </span> `true`

## `shadowFilter`

Shadow of the scale values and needle circle.

<span style="color: var(--accent-color)">Type:</span> `Boolean`
<br>
<span style="color: var(--accent-color)">Default: </span> `true`

## Example

```vue
<template>
  <div>
    <VueSpeedMeter
      :customCurrentValue="customCurrentValue"
      :customStyle="customStyle"
      :needleAnimation="needleAnimation"
      :shadowFilter="shadowFilter"
    />
  </div>
</template>

<script>
import VueSpeedMeter from "vue-speed-meter";

export default {
  name: "Demo",

  components: {
    VueSpeedMeter,
  },

  data: function() {
    return {
      customCurrentValue: 25,
      customStyle: {
        size: 500,
        mainBackgroundColor: "white",
        borderColor: "black",
        scaleColor: "black",
        scaleValuesFontFamily: "'Kameron', serif",
        scaleValuesColor: "black",
        scaleStartValue: -30,
        scaleStep: 5,
        animationTime: 5,
        needleColor: "black",
        needleCircleColor: "black",
        needleCircleBorderColor: "black",
      },
      needleAnimation: false,
      shadowFilterBlackAndWhite: false,
    };
  },
};
</script>
```
