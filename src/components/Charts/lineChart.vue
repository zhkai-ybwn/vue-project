<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
import resize from "../../mixins/resize";
// 因vue3中使用了Proxy对象代理，但echarts中使用了大量的===造成对比失败
const unwarp = (obj) => obj && (obj.__v_raw || obj.valueOf() || obj);

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "lineChart",
    },
    id: {
      type: String,
      default: "lineChart",
    },
    width: {
      type: String,
      default: "200px",
    },
    height: {
      type: String,
      default: "200px",
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.initChart();
  },
  beforeUnmount() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id));
      unwarp(this.chart).setOption({
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: 100,
          left: "2%",
          right: "2%",
          bottom: "2%",
          containLabel: true,
        },
        xAxis: {
          boundaryGap: false,
          type: "category",
          data: ["区域A", "区域B", "区域C", "区域D", "区域E", "区域F", "区域G"],
        },
        yAxis: {
          name: "单位：个",
          type: "value",
        },
        series: [
          {
            type: "line",
            smooth: true,
            data: [3.78, 4.01, 7.66, 5.01, 10, 7.12, 6.05],
          },
        ],
      });
    },
  },
};
</script>
