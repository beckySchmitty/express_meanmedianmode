const express = require("express");
const app = express();
app.use(express.json())


app.get("/mean", (req, res) => {
    let nums = req.query.nums
    const calc = new Calculator("mean", nums);
    calc.mean()
    return res.send(calc.response())
})

app.get("/median", (req, res) => {
  let nums = req.query.nums
  const calc = new Calculator("median", nums);
  calc.median()
  return res.send(calc.response())
})



app.listen(3000, () => {
    console.log("Running on port 3000")
})


class Calculator {
  constructor(operation, nums) {
    this.operation = operation;
    this.nums = Array.from(nums.split(","))
    this.value;  
  }

  mean() {
    let sum = 0;
    for (let i=0; i < this.nums.length; i++) {
        sum = sum + parseInt(this.nums[i]);
    }
    this.value = (sum / this.nums.length);
    return this.value;
}

  median() {
    let arr = this.nums.map(el => parseInt(el));
    const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
    this.value = arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    return this.value;
}
  mode() {
    let arr = this.nums.map(el => parseInt(el));
    let obj = arr.reduce(function (acc, curr) {
        if (typeof acc[curr] == 'undefined') {
          acc[curr] = 1;
        } else {
          acc[curr] += 1;
        }
        return acc;
      }, 
      {});
      this.value = Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b);
    return this.value;
}

  response() {
    return {"response": {"operation": `${this.operation}`, "value": `${this.value}`}}
}
}





// // 
// function mean(nums) {
//   let sum = 0;
//   for (let i=0; i < nums.length; i++) {
//       sum = sum + nums[i];
//   }
//   return (sum / nums.length)
// }

// function median(arr) {
//   const mid = Math.floor(arr.length / 2),
//   nums = [...arr].sort((a, b) => a - b);
// return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
// };

// function mode(arr) {
//   let obj = arr.reduce(function (acc, curr) {
//       if (typeof acc[curr] == 'undefined') {
//         acc[curr] = 1;
//       } else {
//         acc[curr] += 1;
//       }
//       return acc;
//     }, 
//     {});
//   return Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b);
