function getKeys(list) {
  let keys = []
  let text
  list &&
    list.forEach(item => {
      let key
      if (isString(item)) {
        key = [item]
      } else if (item instanceof Object) { //Element
        key = item.key
      }
      keys.push(key)
    })
  return keys
}

const StateEnums = {
  Remove: 'Remove',
  Insert: 'Insert',
  Move: 'Move'
}


function listDiff(oldList, newList, index, patches) {
  // 为了遍历方便，先取出两个 list 的所有 keys
  let oldKeys = getKeys(oldList)
  let newKeys = getKeys(newList)
  console.log(oldKeys, newKeys);

  // 这里放节点 索引和操作类型（删除 新增）
  let changes = []

  // 用于保存变更后的节点数据
  // 使用该数组保存有以下好处
  // 1.可以正确获得被删除节点索引
  // 2.交换节点位置只需要操作一遍 DOM
  // 3.用于 `diffChildren` 函数中的判断，只需要遍历
  // 两个树中都存在的节点，而对于新增或者删除的节点来说，完全没必要
  // 再去判断一遍
  // 这里只放key
  let list = [];


  oldList &&
    oldList.forEach(item => {// 循环原列表中的每一个key
      let key = item.key
      if (isString(item)) {
        key = item
      }
      // 寻找新的 children 中是否含有当前节点
      // 没有的话需要删除
      let index = newKeys.indexOf(key)
      list.push(index === -1 ? null : key)// 如果原来的节点不在新列表中，则放入一个null，否则将原来的节点key放入数组
    })

  console.log('置空待删除元素：',list);// 这里的旧的list被删除的元素被放入null,还在的元素保持位置不变

  // 遍历变更后的数组
  let length = list.length
  // 因为删除数组元素是会更改索引的
  // 所以从后往前删可以保证索引不变
  for (let i = length - 1; i >= 0; i--) {
    // 判断当前元素是否为空，为空表示需要删除
    if (!list[i]) {
      list.splice(i, 1)
      changes.push({
        type: StateEnums.Remove,
        index: i
      })
    }
  }

  console.log('标记旧列表中待删除的元素索引',JSON.parse(JSON.stringify(list)) ,JSON.parse(JSON.stringify(changes)) );//changes type为1的对应的index元素即标记为需要删除的

  // 遍历新的 list，判断是否有节点新增或移动
  // 同时也对 `list` 做节点新增和移动节点的操作
  newList &&
    newList.forEach((item, i) => {
      let key = item.key
      if (isString(item)) {
        key = item
      }
      // 寻找旧的 children 中是否含有当前节点
      let index = list.indexOf(key)
      // 没找到代表新节点，需要插入
      if (index === -1 || key == null) {
        changes.push({
          type: StateEnums.Insert,
          node: item,
          index: i
        })
        list.splice(i, 0, key)
      } else {
        // 找到了，需要判断是否需要移动
        if (index !== i) {
          changes.push({
            type: StateEnums.Move,
            from: index,
            to: i
          })
          move(list, index, i)
        }
      }
    })

  console.log(list, changes);

}


const oldList = [
  { key: 1, value: 'A' },
  { key: 2, value: 'B' },
  { key: 3, value: 'C' },
  { key: 4, value: 'D' },
]

const newList = [
  { key: 2, value: 'B' },
  { key: 4, value: 'D' },
  { key: 5, value: 'E' },
  { value: 'F' },
]


function isString(obj) {
  return typeof obj === 'string'
}

listDiff(oldList, newList)