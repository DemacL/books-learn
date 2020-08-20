let names = ["iPhone X", "iPhone XS"]

let colors = ["黑色", "白色"]

let storages = ["64g", "256g"]

const res = [];
// let comAll = (...chunks)=>{



chunks = [names, colors, storages]

// }


const handle = (index, prev) => {


  // prev.concat(chunks[index])
  console.log(index, chunks[index]);
  for (let i = 0; i < chunks[index].length; i++) {

    prev.push(chunks[index][i])
   
    if (index === chunks.length-1) {
      res.push(prev)
    } else {
      handle(index+1, prev)
    }
  }
}

handle(0, [])

console.log(res)