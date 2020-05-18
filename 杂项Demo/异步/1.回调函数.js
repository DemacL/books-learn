// setTimeout(() => {

//   try {
//     console.log(a)
//   } catch (error) {
//     console.log('error', error);
//   }
// }, 3000);

try {
  setTimeout(() => {
    console.log(a)
  }, 3000);
} catch (error) {
  console.log('error', error);
}

// 1.trycatch捕捉整体的setTimeout无法捕获错误，放到try里面可以