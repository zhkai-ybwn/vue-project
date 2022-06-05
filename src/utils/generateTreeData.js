const maxNode = 100000; //最大的节点数
const childNodesNumber = [2, 5]; //子节点数
const maxLevel = 3; //最大嵌套层级
const childRate = 0.4; //拥有子节点的概率
const label = "节点"; //节点label

let index = 0;
let data = [];

/**
 * 随机数生成
 * @param {*} min 子节点数最小值
 * @param {*} max 子节点数最大值
 * @returns 
 */
const randomInteger = function (min, max) {
  let result = min - 0.5 + Math.random() * (max - min + 1);
  result = Math.round(result);
  return result;
};

/**
 * 生成id
 * @returns id
 */
const generateId = function () {
  ++index;
  return Math.random().toString().slice(3) * 1;
};

/**
 * 生成node
 * @returns node
 */
const generateNode = function () {
  const id = generateId();
  return {
    id: id,
    label: `${label}_${id}`,
  };
};

/**
 *生成子节点对象
 * @param {*} tree tree对象
 * @param {*} level 嵌套层级
 * @returns
 */
const generateChild = function (tree, level = 1) {
  if (index > maxNode - 1) return;
  tree.children = [];
  const childNumber = randomInteger(childNodesNumber[0], childNodesNumber[1]);
  for (let i = 0; i < childNumber; i++) {
    if (index > maxNode - 1) break;
    let obj = generateNode();

    if (Math.random() < childRate && level < maxLevel) {
      generateChild(obj, ++level);
    }
    tree.children.push(obj);
  }
};

/**
 * mock数据
 * @returns tree数据 
 */
const generate = function () {
  for (; index < maxNode; ) {
    let obj = generateNode();
    index < maxNode && generateChild(obj);
    data.push(obj);
  }
  return data;
};
export default generate;
