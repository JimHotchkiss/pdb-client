class Book {
    constructor(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }
// Add method to our class
    getSummory() {
        return `This book is ${this.title}, it was written by ${this.author} in the year ${this.year}`
    }
}

// Instantiate Object 
const book1 = new Book('Book One', 'John Doe', '2022')
// console.log(book1.getSummory())