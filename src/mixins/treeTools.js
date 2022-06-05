import generateData from "../utils/generateTreeData";
export default {
  computed: {
    tree() {
      return generateData();
    }
  },
};
