const { config } = require("vuepress-theme-hope");

module.exports = config({
  title: "Vue-speed-meter",
  description: "UI component",
  base: "/vue-speed-meter/",
  plugins: [
    [
      "md-enhance",
      {
        // Enable Align
        align: true,
      },
    ],
  ],
  themeConfig: {
    sidebar: [
      {
        title: "Getting started",
        path: "/",
      },
      {
        title: "Props",
        path: "/props/",
      },
      {
        title: "Demo",
        path: "/demo/",
      },
    ],
    themeColor: false,
    darkmode: "switch",
    fullscreen: false,
    footer: {
      display: true,
      copyright: "Copyright © Anastat | MIT LICENSE",
    },
    git: {
      contributor: false,
    },
  },
});
