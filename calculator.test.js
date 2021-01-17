const Calculator = require("./calculator")

describe("calc.mean()", function(){
    it("finds the mean of an even set", function(){ 
      calc = new Calculator("1,2,4,4")
      calc.mean()
      expect(calc.response().value).toEqual(2.75)
    })
    it("finds the mean of a negative set", function(){ 
        calc = new Calculator("-1,-2,-4,-4")
        calc.mean()
        expect(calc.response().value).toEqual(-2.75)
      })
  })

  describe("calc.median()", function(){
    it("finds the median of an even set", function(){ 
      calc = new Calculator("1,2,2,4")
      calc.median()
      expect(calc.response().value).toEqual(2)
    })
    it("finds the median of a negative set", function(){ 
        calc = new Calculator("-1,-2,-2,-4")
        calc.median()
        expect(calc.response().value).toEqual(-2)
      })
  })
  
  describe("calc.mode()", function(){
    it("finds the mode of an even set", function(){ 
      calc = new Calculator("1,2,4,4")
      calc.mode()
      expect(calc.response().value).toEqual(4)
    })
    it("finds the mode of a negative set", function(){ 
        calc = new Calculator("-1,-2,-4,-4")
        calc.mode()
        expect(calc.response().value).toEqual(-4)
      })
  })
