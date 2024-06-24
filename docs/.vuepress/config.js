module.exports = {
  port: 4200,
  theme:"reco",
  title: "PerfreeBlog文档",
  description: "PerfreeBlog文档,Java开发的建站平台",
  base: "/",
  head: [
    ["link",{ rel: "icon",href: "/assets/favicon.ico" }],
    ["meta", { name: "referrer", content: "never" }],
    [
      "meta",
      {
        name: "keywords",
        content:
          "PerfreeBlog文档,Perfree,Perfree博客文档,PerfreeBlog博客文档,PerfreeBlog建站文档"
      }
    ]
  ],
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    logo: '/assets/logo.png',
    smoothScroll: true,
    nav: require("./config/nav"),
    sidebar: require("./config/sidebar"),
    lastUpdated: "Last Updated",
    repo: "https://github.com/perfree/PerfreeBlog",
    editLinks: false,
    subSidebar: 'auto'
  }
};