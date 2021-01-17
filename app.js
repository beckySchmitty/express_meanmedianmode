const express = require("express");
const app = express();
app.use(express.json())
const Calculator = require("./calculator")

// routes
app.get("/mean", (req, res, next) => {
  try {
    let nums = req.query.nums
    const calc = new Calculator(nums);
    calc.mean()
    return res.send(calc.response())
  } catch(e) {
    next(e)
  }
})

app.get("/median", (req, res, next) => {
  try {
    let nums = req.query.nums
    const calc = new Calculator(nums);
    calc.median()
    return res.send(calc.response())
  } catch(e) {
    next(e)
  }
})

app.get("/mode", (req, res, next) => {
  try {
    let nums = req.query.nums
    const calc = new Calculator(nums);
    calc.mode()
    return res.send(calc.response())
  } catch (e) {
    next(e)
  }
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


