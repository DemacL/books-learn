function getGrowthData() {
  const num = Math.floor(Math.random() * 100)
  const rate = (Math.random() * 20).toFixed(2)
  setTimeout(() => {
    console.log(num / (1 + rate / 100) * (rate / 100))
  }, 20*1000)
  return [num, rate]
}


console.log(getGrowthData());