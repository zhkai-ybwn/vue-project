// size:每一个item的高度 remain:要显示几个 items:获取到的数组
<template>
  <div id="home">
    <virtualScrollList :size="40" :remain="8" :items="items"></virtualScrollList>
  </div>
</template>
<script>
import virtualScrollList from "../../components/VirtualScrollList/index.vue";
export default {
  name: "virtualScrollListView",
  components: {
    virtualScrollList,
  },
  data() {
    return {
      items: [],
    };
  },
  created() {
    for (let i = 0; i < 10000; i++) {
      this.items.push({ name: "我是第" + i + "个", id: i });
    }
  },
};
</script>
