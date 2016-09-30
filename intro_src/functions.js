// pure functions
const add = (x, y) => x + y;
const multiply = (x, y) => x * y;

console.assert(add(3, 4) === 7);
console.assert(multiply(3, 4) === 12);

// impure functions
const mutableNumber = {
  value: 4,
  add: function(x) {
    this.value = this.value + x;
    return this;
  },
  multiply: function(x) {
    this.value = this.value * x;
    return this;
  },
  show: function() {
    console.log(this);
    return this;
  }
};

mutableNumber
  .show()
  .add(4)
  .multiply(10)
  .show()
  .add(100)
  .show();
