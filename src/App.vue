<template>
  <div class="container">
    <el-button :type="buttonType" @click="changeTheme('primary')"
      >primary</el-button
    >
    <el-button :type="buttonType" @click="changeTheme('success')"
      >success</el-button
    >
    <el-button :type="buttonType" @click="changeTheme('warning')"
      >warning</el-button
    >
    <el-button :type="buttonType" @click="changeTheme('danger')"
      >danger</el-button
    >
    <el-button :type="buttonType" @click="changeTheme('info')">info</el-button>
    <div class="tab">
      <router-link to="/tree" name="tree">树组件</router-link><br />
      <router-link to="/list" name="list">列表</router-link><br />
      <router-link to="/tip" name="tip">提示</router-link><br />
      <router-link to="/echarts" name="echarts">折线图</router-link><br />
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<style>
:root {
  --theme_bg_color: #409eff;
}

.container {
  width: 80%;
  height: 600px;
  border: 2px solid var(--theme_bg_color);
  margin: auto;
  display: flex;
}
.tab {
  flex: 1;
  border: 2px solid var(--theme_bg_color);
  display: flex;
  flex-direction: column;
  text-align: center;
}
.tab a {
  color: black;
  text-decoration: none;
}
.tab a:hover {
  color: var(--theme_bg_color);
}
.content {
  flex: 5;
  border: 1px solid var(--theme_bg_color);
}
</style>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("theme");
export default {
  name: "app",
  data(){
    return{
      options: [
        {
          value: "primary",
          label: "primary",
        },
        {
          value: "success",
          label: "success",
        },
        {
          value: "warning",
          label: "warning",
        },
        {
          value: "danger",
          label: "danger",
        },
        {
          value: "info",
          label: "info",
        }
      ],
      value: "primary",
    };
  },
  computed: {
    ...mapState({
      buttonType: (state) => state.buttonType, //指定模块后，这里默认就是获取user下面的state了
    }),
  },
  methods: {
    changeTheme(type) {
      this.$store.commit("theme/setButtonType", type);
      document.documentElement.style.setProperty(
        "--theme_bg_color",
        this.borderColor(type)
      );
    },
    borderColor(type) {
      switch (type) {
        case "primary":
          return "#409eff";
        case "success":
          return "#67c23a";
        case "warning":
          return "#e6a23c";
        case "danger":
          return "#f56c6c";
        case "info":
          return "#909399";
      }
    },
  },
};
</script>
