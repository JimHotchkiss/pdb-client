window.onload = function() {
    searchBtnHandler()
  };

const searchBtnHandler = () => {
const briefBtn = document.getElementById('brief-btn')
const sectionOneImage = document.getElementById('section-one-img')
briefBtn.addEventListener('click', () => {
   getBriefingData()
    })
}

const getBriefingData = () => {
    fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=bcd9264c4d4646b5a22d288a9a796d3d')
    .then(response => response.json())
    .then(response => renderData(response.articles))
}


const renderData = (newsData) => {
    const renderNewsSection = document.getElementById('render-news-section')
    for(let item in newsData) {
    const cardDiv = document.createElement('div')
    cardDiv.setAttribute('class', 'card w-25')
    const cardImage = document.createElement('img')
    cardImage.setAttribute('src', `${newsData[item].urlToImage}`)
    cardImage.setAttribute('class', 'card-img-top')
    const cardBody = document.createElement('div')
    cardBody.setAttribute('class', 'card-body')
    const cardH5Tag = document.createElement('h5')
    cardH5Tag.setAttribute('class', 'card-title')
    cardH5Tag.innerText = `${newsData[item].title}`
    const cardPtag1 = document.createElement('p')
    cardPtag1.setAttribute('class', 'card-text')
    cardPtag1.innerText = `${newsData[item].description}`
    const cardPtag2 = document.createElement('p')
    cardPtag2.setAttribute('class', 'card-text')
    const cardSmallText = document.createElement('small')
    cardSmallText.setAttribute('class', 'text-muted')
    cardSmallText.innerText = `${newsData[item].publishedAt}`
    cardBody.appendChild(cardH5Tag)
    cardBody.appendChild(cardImage)
    cardPtag2.appendChild(cardSmallText)
    cardBody.appendChild(cardPtag2)
    cardBody.appendChild(cardPtag1)
    cardDiv.appendChild(cardBody)
    renderNewsSection.appendChild(cardDiv)
    }
    // renderNewsSection.classList.toggle('d-none')
    // window.scrollTo({
    //     top: 700,
    //     behavior: 'smooth'
    // });  
}

