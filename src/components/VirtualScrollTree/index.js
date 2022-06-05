let lastTime = 0;
export default {
  name: "virtualScrollTree",
  props: {
    tree: {
      type: Array,
      required: true,
      default () {
        return [];
      },
    },
    defaultExpand: {
      type: Boolean,
      required: false,
      default: false,
    },
    timeout: {
      //刷新频率
      type: Number,
      default: 17,
    },
    option: {
      // 配置对象
      type: Object,
      required: true,
      default () {
        return {
          height: 500, //滚动容器的高度
          itemHeight: 25, // 单个item的高度
        };
      },
    },
  },
  data() {
    return {
      offset: 0, // translateY偏移量
      contentHeight: "0px",
      visibleData: [],
    };
  },
  computed: {
    /**
     * 格式化源数据
     * @returns 格式化后的数据
     */
    flattenTree() {
      const flatten = function (
        list,
        childKey = "children",
        level = 1,
        parent = null,
        defaultExpand = true
      ) {
        let arr = [];
        list.forEach((item) => {
          // 节点层级
          item.level = level;
          // 是否展开
          if (item.expand === undefined) {
            item.expand = defaultExpand;
          }
          // 该节点是否可见
          if (item.visible === undefined) {
            item.visible = true;
          }
          // 该节点是否可见
          if (!parent.visible || !parent.expand) {
            item.visible = false;
          }
          item.parent = parent;
          arr.push(item);
          // 处理子节点数据
          if (item[childKey]) {
            arr.push(
              ...flatten(
                item[childKey],
                childKey,
                level + 1,
                item,
                defaultExpand
              )
            );
          }
        });
        return arr;
      };
      return flatten(this.tree, "children", 1, {
        level: 0,
        visible: true,
        expand: true,
        children: this.tree,
      });
    },
    /**
     * 计算展示区域可展示节点数量
     * @returns 可展示节点数量
     */
    visibleCount() {
      return Math.floor(this.option.height / this.option.itemHeight);
    },
  },
  mounted() {
    this.updateView();
  },
  methods: {
    updateView() {
      this.getContentHeight();
      this.handleScroll();
    },
    handleScroll() {
      let currentTime = +new Date();
      if (currentTime - lastTime > this.timeout) {
        this.updateVisibleData(this.$refs.scroller.scrollTop);
        lastTime = currentTime;
      }
    },
    updateVisibleData(scrollTop = 0) {
      let start =
        Math.floor(scrollTop / this.option.itemHeight) -
        Math.floor(this.visibleCount / 2);
      start = start < 0 ? 0 : start;
      const end = start + this.visibleCount * 2;
      const allVisibleData = (this.flattenTree || []).filter(
        (item) => item.visible
      );
      this.visibleData = allVisibleData.slice(start, end);
      this.offset = start * this.option.itemHeight;
    },
    /**
     * 获取滚动容器的高度
     */
    getContentHeight() {
      this.contentHeight =
        (this.flattenTree || []).filter((item) => item.visible).length *
        this.option.itemHeight +
        "px";
    },
    /**
     * 展开或者折叠操作
     *
     * @param {*} item  操作行数据
     */
    toggleExpand(item) {
      const isExpand = item.expand;
      if (isExpand) {
        this.collapse(item, true); // 折叠
      } else {
        this.expand(item, true); // 展开
      }
      this.updateView();
    },
    /**
     *展开节点
     *
     * @param {*} item 当前节点数据
     */
    expand(item) {
      item.expand = true;
      this.recursionVisible(item.children, true);
    },
    /**
     *折叠节点
     *
     * @param {*} item 当前节点数据
     */
    collapse(item) {
      item.expand = false;
      this.recursionVisible(item.children, false);
    },
    /**
     * 折叠所有
     * @param {*} level 节点层级
     */
    collapseAll(level = 1) {
      this.flattenTree.forEach((item) => {
        item.expand = false;
        if (item.level != level) {
          item.visible = false;
        }
      });
      this.updateView();
    },
    /**
     * 展开所有
     */
    expandAll() {
      this.flattenTree.forEach((item) => {
        item.expand = true;
        item.visible = true;
      });
      this.updateView();
    },
    /**
     * 递归节点
     *
     * @param {*} children
     * @param {*} status
     */
    recursionVisible(children, status) {
      children.forEach((node) => {
        node.visible = status;
        if (node.children) {
          this.recursionVisible(node.children, status);
        }
      });
    },
  },
};