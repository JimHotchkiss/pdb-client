window.onload = function() {
    searchBtnHandler()
  };

const searchBtnHandler = () => {
const briefBtn = document.getElementById('brief-btn')
const sectionOneImage = document.getElementById('section-one-img')
briefBtn.addEventListener('click', () => {
    fetchBriefing()
    })
}

const fetchBriefing = () => {
    fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=bcd9264c4d4646b5a22d288a9a796d3d')
    .then(response => response.json())
    .then(response => fetchedData(response.articles))
}

const fetchedData = (newsData) => {
    for(let item in newsData) {
        console.log(newsData[item])
    }
}

