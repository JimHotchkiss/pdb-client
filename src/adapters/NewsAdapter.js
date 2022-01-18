class NewsAdapter {
    constructor() {
        this.newsBaseUrl ="https://newsapi.org/v2/top-headlines?country=us&apiKey=bcd9264c4d4646b5a22d288a9a796d3d"
    }

    // Create a method that fetches the news data
    getNews() {
        return fetch(this.newsBaseUrl)
        .then(response => response.json())
        .then(response => console.log(response))
    }
}