<template>
  <div class="main">
    <virtualScrollTree
      ref="bigTree"
      :tree="tree"
      :defaultExpand="false"
      :option="option"
    >
      <template v-slot="{ item }">
        <div>{{ item.label }}</div>
      </template>
    </virtualScrollTree>
    <div class="btn-group">
      <el-button :type="buttonType" @click="expandAll"
        >展开所有</el-button
      >
      <el-button :type="buttonType" @click="collapseAll"
        >折叠所有</el-button
      >
    </div>
  </div>
</template>
<style>
.btn-group {
  margin-top: 20px;
}
</style>
<script>
import virtualScrollTree from "../../components/VirtualScrollTree/index.vue";
import treeTools from "../../mixins/treeTools";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("theme");

export default {
  name: "virtualScrollTreeView",
  mixins: [treeTools],
  data() {
    return {
      option: {
        height: 500, //滚动容器的高度
        itemHeight: 25, // 单个item的高度
      },
    };
  },
  components: {
    virtualScrollTree,
  },
  computed: {
    ...mapState({
      buttonType: (state) => state.buttonType, //指定模块后，这里默认就是获取user下面的state了
    }),
  },
  methods: {
    collapseAll() {
      this.$refs.bigTree.collapseAll();
    },
    expandAll() {
      this.$refs.bigTree.expandAll();
    }
  },
};
</script>
