window.onload = function() {
    getYourBriefBtnHandler()
    getFavoritesBtnHandler()
    searchTopicBtnHandler()
    
  }


const getFavoritesBtnHandler = () => {
    const usersIdBtn = document.getElementById('favorites-id')
    usersIdBtn.addEventListener('click', () => {
        getFavorites()
    })

}

const getFavorites = () => {
    const usersBaseUrl = 'http://localhost:3000/api/v1/'
    fetch(usersBaseUrl + `favorites`)
    .then(response => response.json())
    .then(response => {
        FavoriteStories.state = response
        renderData(FavoriteStories.state)
    })
}

const NewsData = () => {
    state = []
}

const FavoriteStories = () => {
    state = []
}


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
    .then(response => () => {
        renderData(response.articles)
        newsDataState = response.articles
    })
}

const getYourBriefBtnHandler = () => {
const briefBtn = document.getElementById('brief-btn')
briefBtn.addEventListener('click', () => {
    console.log(NewsData.state)
    if(NewsData.state){
        const newsData = NewsData.state
        renderData(newsData)
        } else {
            clearHtmlContent()
            getBriefingData() 
        }
    })
}

const getBriefingData = () => {
    fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=bcd9264c4d4646b5a22d288a9a796d3d')
    .then(response => response.json())
    .then(response => {
        console.log(response.articles)
        NewsData.state = response.articles
        renderData(NewsData.state)
    })
}

const renderData = (newsData) => {
    const renderNewsSection = document.getElementById('render-news-section')
    // Clear Html 
    clearHtmlContent()
    // Array
    if (Array.isArray(newsData)) {
        for(let item in newsData) {
        const itemId = Math.random()
        const cardDiv = document.createElement('div')
        cardDiv.setAttribute('id', itemId)
        cardDiv.setAttribute('class', 'card border m-2')
        cardDiv.setAttribute('style', 'min-width: 20%')
        const cardImage = document.createElement('img')
        let imgUrl 
        if (newsData[item].urlToImage) {
            imgUrl = newsData[item].urlToImage
        } else {
            imgUrl = newsData[item].imageUrl
        }
        if (imgUrl  == null) {
            cardImage.setAttribute('src', '../../styles/images/no-photo.png')
        } else {
            cardImage.setAttribute('src', `${imgUrl}`)
        }
        cardImage.setAttribute('class', 'card-img-top')
        cardImage.setAttribute('id', `card-image-${itemId}`)
        const cardBody = document.createElement('div')
        cardBody.setAttribute('class', 'card-body')
        const cardH5Tag = document.createElement('h5')
        cardH5Tag.setAttribute('class', 'card-title')
        cardH5Tag.setAttribute('id', `card-title-${itemId}`)
        cardH5Tag.innerText = `${newsData[item].title}`
        const cardPtag1 = document.createElement('p')
        cardPtag1.setAttribute('class', 'card-text')
        cardPtag1.setAttribute('id', `card-description-${itemId}`)
        cardPtag1.innerText = `${newsData[item].description}`
        const cardPtag2 = document.createElement('p')
        cardPtag2.setAttribute('class', 'card-text')
        const cardBtn = document.createElement('a')
        cardBtn.setAttribute('class', 'btn btn-primary')
        cardBtn.setAttribute('href', `${newsData[item].url}`)
        cardBtn.setAttribute('id', `story-url-${itemId}`)
        cardBtn.setAttribute('target', '_blank')
        cardBtn.innerText = 'Learn More'
        const dataHeart = document.createElement('div')
        dataHeart.setAttribute('class', 'data-heart-image mt-1 mb-3')  
        dataHeart.setAttribute('data-id', itemId) 
        dataHeart.addEventListener('click', () => {
            const favoriteId = itemId
            favoriteBtnHandler(itemId)
        })
        const cardSmallText = document.createElement('small')
        cardSmallText.setAttribute('class', 'text-muted')
        cardSmallText.setAttribute('id', `date-published-${itemId}`)
    
        // Date function 
        if(newsData[item].publishedAt) {
            const event = new Date(newsData[item].publishedAt)
            let stringEvent = event.toString()
            stringEvent = stringEvent.split(" ").slice(0, 4).join(" ")
            cardSmallText.innerText = `${stringEvent}`
        } else {
            cardSmallText.innerText = newsData[item].datePublished
        }

        if(newsData[item].publishedAt) {
            cardBody.appendChild(dataHeart)
        } 
        cardBody.appendChild(cardH5Tag)
        cardBody.appendChild(cardImage)
        cardPtag2.appendChild(cardSmallText)
        cardBody.appendChild(cardPtag2)
        cardBody.appendChild(cardPtag1)
        cardBody.appendChild(cardBtn)
        cardDiv.appendChild(cardBody)
        renderNewsSection.appendChild(cardDiv)
        }
    } else {
        const itemId = Math.random()
        const cardDiv = document.createElement('div')
        cardDiv.setAttribute('id', itemId)
        cardDiv.setAttribute('class', 'card border m-2')
        cardDiv.setAttribute('style', 'min-width: 20%')
        const cardImage = document.createElement('img')
        if (newsData.imageUrl == null) {
            cardImage.setAttribute('src', '../../styles/images/no-photo.png')
        } else {
            cardImage.setAttribute('src', `${newsData.imageUrl}`)
        }
        cardImage.setAttribute('class', 'card-img-top')
        cardImage.setAttribute('id', `card-image-${itemId}`)
        const cardBody = document.createElement('div')
        cardBody.setAttribute('class', 'card-body')
        const cardH5Tag = document.createElement('h5')
        cardH5Tag.setAttribute('class', 'card-title')
        cardH5Tag.setAttribute('id', `card-title-${itemId}`)
        cardH5Tag.innerText = `${newsData.title}`
        const cardPtag1 = document.createElement('p')
        cardPtag1.setAttribute('class', 'card-text')
        cardPtag1.setAttribute('id', `card-description-${itemId}`)
        cardPtag1.innerText = `${newsData.description}`
        const cardPtag2 = document.createElement('p')
        cardPtag2.setAttribute('class', 'card-text')
        const cardBtn = document.createElement('a')
        cardBtn.setAttribute('class', 'btn btn-primary')
        cardBtn.setAttribute('href', `${newsData.storyUrl}`)
        cardBtn.setAttribute('id', `story-url-${itemId}`)
        cardBtn.setAttribute('target', '_blank')
        cardBtn.innerText = 'Learn More'
        const cardLnk = document.createElement('button')
        cardLnk.setAttribute('type', 'button')
        cardLnk.setAttribute('class', 'btn btn-link')
        cardLnk.addEventListener('click', () => {
            renderData(NewsData.state)
        })
        cardLnk.innerText = "Back to the front page"
        const cardSmallText = document.createElement('small')
        cardSmallText.setAttribute('class', 'text-muted')
        cardSmallText.setAttribute('id', `date-published-${itemId}`)
    
        // Date function 
        const event = new Date(newsData.datePublished)
        let stringEvent = event.toString()
        stringEvent = stringEvent.split(" ").slice(0, 4).join(" ")
        cardSmallText.innerText = `${stringEvent}`
    
        cardBody.appendChild(cardH5Tag)
        cardBody.appendChild(cardImage)
        cardPtag2.appendChild(cardSmallText)
        cardBody.appendChild(cardPtag2)
        cardBody.appendChild(cardPtag1)
        cardBody.appendChild(cardBtn)
        cardBody.appendChild(cardLnk)
        cardDiv.appendChild(cardBody)
        renderNewsSection.appendChild(cardDiv)
    }
    window.scrollTo({
        top: 700,
        behavior: 'smooth'
    });  
}

const favoriteBtnHandler = (itemId) => {
    findFavoriteStoryAttributes(itemId)
}


const findFavoriteStoryAttributes = favoriteId => {
    const favoriteStoryObj = {favorite:{
        title: document.getElementById(`card-title-${favoriteId}`).innerText,
        description: document.getElementById(`card-description-${favoriteId}`).innerText,
        imageUrl: favoriteImgUrl = document.getElementById(`card-image-${favoriteId}`).getAttribute("src"),
        storyUrl:document.getElementById(`story-url-${favoriteId}`).getAttribute("href"),
        datePublished: document.getElementById(`date-published-${favoriteId}`).innerText,
      }};

     postFavoriteStory(favoriteStoryObj)
}

const postFavoriteStory = favoriteStoryObj => {
    fetch('http://localhost:3000/api/v1/favorites', {
        method: 'post',
        headers:  {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        body: JSON.stringify(favoriteStoryObj)
    })
    .then(response => response.json())
    .then(response => () => {
        FavoriteStories.state = response
        renderData(FavoriteStories.state)
    })
}

const toggleNewSection = () => {
    const renderNewsSection = document.getElementById('render-news-section')
    renderNewsSection.classList.toggle('d-none')
}




