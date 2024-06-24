<template></template>
<script>
export default {
  name: "Msg",
  mounted() {
    this.$notification.open({
        message: "交流群",
        description: "PerfreeBlog交流QQ群: 938402724",
        icon:  <a-icon type="qq" style="color: #1890ff"/>,
        duration: 0,
        placement: "bottomRight",
        key: "20210516"
    });
  }
};
</script>