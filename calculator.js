// Calculator calls mean, median, mode when given array of nums
// checks to see if all numbers passed in or throws error
// method for response

const ExpressError = require("./expressError")


class Calculator {
    constructor(nums) {
      this.nums = nums;
      this.value;  
      this.operation;
      this.validateNums();
    }
  
    // return error msg if no numbers passed in or invalid input
    validateNums() {
      if (this.nums.length === 0) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
      }
      let testArray = Array.from(this.nums.split(","))
      testArray = testArray.map(el => parseFloat(el));
      this.nums = testArray.map(el => {
        if (Number.isNaN(el)) {
          throw new ExpressError("All inputs must be a valid number", 403)
          return
        }  
        return el
      })
      return this.nums
    } 
  
    mean() {
      this.operation = "mean"
      let sum = 0;
      for (let i=0; i < this.nums.length; i++) {
          sum = sum + parseInt(this.nums[i]);
      }
      this.value = (sum / this.nums.length);
      return this.value;
  }
  
    median() {
      this.operation = "median";
      let arr = this.nums;
      const mid = Math.floor(arr.length / 2),
      nums = [...arr].sort((a, b) => a - b);
      this.value = arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
      return this.value;
  }
    mode() {
      this.operation = "mode";
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
        this.value = parseFloat(this.value)
      return (this.value);
  }
    response() {
      let response = {
        operation: this.operation,
        value: this.value
      }
      return response
  }
  }

  module.exports = Calculator;