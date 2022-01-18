window.onload = function() {
    searchBtnHandler()
  };

const searchBtnHandler = () => {
const briefBtn = document.getElementById('brief-btn')
const sectionOneImage = document.getElementById('section-one-img')
briefBtn.addEventListener('click', () => {
    // const newsAdapter = new NewsAdapter
    // newsAdapter.getNews()
    renderData()
    const renderNewsSection = document.getElementById('render-news-section')
    const cardDiv = document.createElement('div')
    cardDiv.setAttribute('class', 'card')
    const cardImage = document.createElement('img')
    cardImage.setAttribute('src', 'https://a4.espncdn.com/combiner/i?img=%2Fphoto%2F2022%2F0105%2Fr958224_1296x729_16%2D9.jpg')
    cardImage.setAttribute('class', 'card-img-top')
    const cardBody = document.createElement('div')
    cardBody.setAttribute('class', 'card-body')
    const cardH5Tag = document.createElement('h5')
    cardH5Tag.setAttribute('class', 'card-title')
    cardH5Tag.innerText = 'Card Title'
    const cardPtag1 = document.createElement('p')
    cardPtag1.setAttribute('class', 'card-text')
    cardPtag1.innerText = 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
    const cardPtag2 = document.createElement('p')
    cardPtag2.setAttribute('class', 'card-text')
    const cardSmallText = document.createElement('small')
    cardSmallText.setAttribute('class', 'text-muted')
    cardSmallText.innerText = 'Last updated 3 mins ago'

    cardPtag2.appendChild(cardSmallText)
    cardBody.appendChild(cardPtag2)
    cardBody.appendChild(cardPtag1)
    cardBody.appendChild(cardH5Tag)
    cardBody.appendChild(cardImage)
    cardDiv.appendChild(cardBody)
    renderNewsSection.appendChild(cardDiv)





    })
}

{/* <div class="card">
    <img class="card-img-top" src="..." alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div> */}

const renderData = () => {
    const renderDataSection = document.getElementById('render-news-section');
    renderDataSection.classList.toggle('d-none')
    window.scrollTo({
        top: 700,
        behavior: 'smooth'
    });  
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