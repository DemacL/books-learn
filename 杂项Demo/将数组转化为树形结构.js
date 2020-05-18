var data = [
  { pid: null, id: 'a', value: 'aaa' },
  { pid: 'a', id: 'c', value: 'ccc' },
  { pid: 'd', id: 'f', value: 'fff' },
  { pid: 'c', id: 'e', value: 'eee' },
  { pid: 'b', id: 'd', value: 'ddd' },
  { pid: 'a', id: 'b', value: 'bbb' },
]

function array2Tree(arr) {
  const root = arr.filter(item => item.pid === null)[0];
  addChildren(root, arr);
  console.log(JSON.stringify(root));
}
/** 给一个节点添加所有子节点 */
function addChildren(pnode, arr) {
  pnode.children = arr.filter(item => item.pid === pnode.id)
  if (pnode.children.length > 0) {
    pnode.children.forEach(element => {
      addChildren(element, arr)
    });
  }
}

array2Tree(data);