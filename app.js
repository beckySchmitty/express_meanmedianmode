const express = require("express");
const app = express();
app.use(express.json())
const ExpressError = require("./expressError")

// routes
app.get("/mean", (req, res) => {
  try {
    let nums = req.query.nums
    const calc = new Calculator("mean", nums);
    calc.mean()
    return res.send(calc.response())
  } catch(e) {
    next(e)
  }
})

app.get("/median", (req, res) => {
  let nums = req.query.nums
  const calc = new Calculator("median", nums);
  calc.median()
  return res.send(calc.response())
})

app.get("/mode", (req, res) => {
  let nums = req.query.nums
  const calc = new Calculator("mode", nums);
  calc.mode()
  return res.send(calc.response())
})

// error handler
app.use((error, req, res, next) => {
  let status = error.status || 500;
  let message = error.msg;

  return res.status(status).json({
    error: {message, status}
  })
})

app.listen(3000, () => {
    console.log("Running on port 3000")
})


// Calculator calls mean, median, mode
// checks to see if all numbers passed in or throws error
// method for response
class Calculator {
  constructor(operation, nums) {
    this.operation = operation;
    this.nums = nums;
    this.value;  
    this.validateNums();
  }

  validateNums() {
    let testArray = Array.from(this.nums.split(","))
    testArray = testArray.map(el => parseInt(el));
    this.nums = [];
    testArray.forEach((el)=> {
      if (Number.isNaN(el)) {
        throw new ExpressError("ERROR: All inputs must be a valid number", 403)
      }  
      this.nums.push(el)
    })
    return this.nums
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
    let arr = this.nums;
    const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
    this.value = arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    return this.value;
}
  mode() {
    let arr = this.nums;
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
    let response = {
      operation: this.operation,
      value: this.value
    }
    return response
    // return {"response": {"operation": `${this.operation}`, "value": `${this.value}`}}
}
}