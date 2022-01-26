// Object literal
// const carObj = {
//     make: 'Ford',
//     year: '2021',
//     color: 'blue',
//     getSummary: () => {
//         return `This vehicle is a ${this.make}, it was built in ${this.year} and the color is ${this.color}`
//     }
// }

// console.log(Object.values(carObj))
// console.log(Object.keys(carObj))

// ******* Constructor
function Car(make, year, color) {
    this.make = make;
    this.year = year;
    this.color = color;
    
}
// ******* Prototype method
// Note: arrow functioin have odd behavior with prototypes, due to this being global (undefined)
// Car.prototype.getSummary = function() {
//     return `This vehicle is a ${this.make}, it was built in ${this.year} and the color is ${this.color}`
// }

const car1 = new Car('Volvo', '2010', 'red')