<template>
  <div
    class="b-tree"
    ref="scroller"
    :style="{ height: option.height + 'px' }"
    @scroll="handleScroll"
  >
    <div class="b-tree__phantom" :style="{ height: contentHeight }"></div>
    <div
      class="b-tree__content"
      :style="{ transform: `translateY(${offset}px)` }"
    >
      <div
        v-for="(item, index) in visibleData"
        :key="item.id"
        class="b-tree__list-view"
        :style="{
          paddingLeft: 18 * (item.level - 1) + 'px',
          height: option.itemHeight + 'px',
        }"
      >
        <i
          :class="item.expand ? 'b-tree__expand' : 'b-tree__close'"
          @click="toggleExpand(item)"
          v-if="item.children && item.children.length"
        />
        <span v-else style="margin-right: 5px"></span>
        <slot :item="item" :index="index"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "./index.css";
</style>
<script>
import indexjs from "./index.js";
export default indexjs;
</script>
