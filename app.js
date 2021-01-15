const express = require("express");

const app = express();

app.get("/mean", (req, res) => {
    let nums = req.query.nums
    nums = Array.from(nums.split(","))
    return res.send(`VALUE: ${ mean(nums)}`)
})

app.get("/median", (req, res) => {
    let nums = req.query.nums
    nums = Array.from(nums.split(","))
    return res.send(`VALUE: ${ median(nums)}`)
})



app.listen(3000, () => {
    console.log("Running on port 3000")
})


function mean(nums) {
    let sum = 0;
    for (let i=0; i < nums.length; i++) {
        sum = sum + nums[i];
    }
    return (sum / nums.length)
}

function median(arr) {
    const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

function mode(arr) {
    let obj = arr.reduce(function (acc, curr) {
        if (typeof acc[curr] == 'undefined') {
          acc[curr] = 1;
        } else {
          acc[curr] += 1;
        }
        return acc;
      }, 
      {});
    return Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b);
}

