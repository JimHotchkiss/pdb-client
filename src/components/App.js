window.onload = function() {
    getYourBriefBtnHandler()
    searchTopicBtnHandler()
  };

const searchTopicBtnHandler = () => {
    const searchTopicBtn = document.getElementById('search-topic-btn')
    searchTopicBtn.addEventListener('click', () => {
        clearHtmlContent()
        const searchTopicInput = document.getElementById('search-topic-input')
        const searchInputValue = searchTopicInput.value
        getSearchTopicData(searchInputValue)
        resetSearchTopicPlaceHolder()
    
    } )
}

const clearHtmlContent = () => {
    const renderNewsSection = document.getElementById('render-news-section')
    renderNewsSection.innerHTML = ''
}

const resetSearchTopicPlaceHolder = () => {
    const searchTopicInput = document.getElementById('search-topic-input')
    searchTopicInput.value = ''
}

const getSearchTopicData = (searchInputValue) => {
    fetch(`https://newsapi.org/v2/everything?q=${searchInputValue}&apiKey=bcd9264c4d4646b5a22d288a9a796d3d`)
    .then(response => response.json())
    .then(response => renderData(response.articles))
}

const getYourBriefBtnHandler = () => {
const briefBtn = document.getElementById('brief-btn')
briefBtn.addEventListener('click', () => {
   clearHtmlContent()
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
        console.log(newsData[item])
    const cardDiv = document.createElement('div')
    cardDiv.setAttribute('class', 'card m-2')
    cardDiv.setAttribute('style', 'min-width: 20%')
    const cardImage = document.createElement('img')
    if (newsData[item].urlToImage == null) {
        cardImage.setAttribute('src', '../../styles/images/no-photo.png')
    } else {
        cardImage.setAttribute('src', `${newsData[item].urlToImage}`)
    }
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
    const cardBtn = document.createElement('a')
    cardBtn.setAttribute('class', 'btn btn-primary')
    cardBtn.setAttribute('href', `${newsData[item].url}`)
    cardBtn.setAttribute('target', '_blank')
    cardBtn.innerText = 'Learn More'
    const cardSmallText = document.createElement('small')
    cardSmallText.setAttribute('class', 'text-muted')

    // Date function 
    const event = new Date(newsData[item].publishedAt)
    let stringEvent = event.toString()

    stringEvent = stringEvent.split(" ").slice(0, 4).join(" ")
    cardSmallText.innerText = `${stringEvent}`
    cardBody.appendChild(cardH5Tag)
    cardBody.appendChild(cardImage)
    cardPtag2.appendChild(cardSmallText)
    cardBody.appendChild(cardPtag2)
    cardBody.appendChild(cardPtag1)
    cardBody.appendChild(cardBtn)
    cardDiv.appendChild(cardBody)
    renderNewsSection.appendChild(cardDiv)
    }
    window.scrollTo({
        top: 700,
        behavior: 'smooth'
    });  
}

