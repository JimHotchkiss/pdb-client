window.onload = function() {
    getYourBriefBtnHandler()
    getFavoritesBtnHandler()
    searchTopicBtnHandler()
  };
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
    .then(response => console.log(response))
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
    const randomNumber = Math.random()
        // console.log(newsData[item], randomNumber)
    const cardDiv = document.createElement('div')
    cardDiv.setAttribute('id', randomNumber)
    cardDiv.setAttribute('class', 'card border m-2')
    cardDiv.setAttribute('style', 'min-width: 20%')
    const cardImage = document.createElement('img')
    if (newsData[item].urlToImage == null) {
        cardImage.setAttribute('src', '../../styles/images/no-photo.png')
    } else {
        cardImage.setAttribute('src', `${newsData[item].urlToImage}`)
    }
    cardImage.setAttribute('class', 'card-img-top')
    cardImage.setAttribute('id', `card-image-${randomNumber}`)
    const cardBody = document.createElement('div')
    cardBody.setAttribute('class', 'card-body')
    const cardH5Tag = document.createElement('h5')
    cardH5Tag.setAttribute('class', 'card-title')
    cardH5Tag.setAttribute('id', `card-title-${randomNumber}`)
    cardH5Tag.innerText = `${newsData[item].title}`
    const cardPtag1 = document.createElement('p')
    cardPtag1.setAttribute('class', 'card-text')
    cardPtag1.setAttribute('id', `card-description-${randomNumber}`)
    cardPtag1.innerText = `${newsData[item].description}`
    const cardPtag2 = document.createElement('p')
    cardPtag2.setAttribute('class', 'card-text')
    const cardBtn = document.createElement('a')
    cardBtn.setAttribute('class', 'btn btn-primary')
    cardBtn.setAttribute('href', `${newsData[item].url}`)
    cardBtn.setAttribute('id', `story-url-${randomNumber}`)
    cardBtn.setAttribute('target', '_blank')
    cardBtn.innerText = 'Learn More'
    const dataHeart = document.createElement('div')
    dataHeart.setAttribute('class', 'data-heart-image mt-1 mb-3')  
    dataHeart.setAttribute('data-id', randomNumber) 
    const cardSmallText = document.createElement('small')
    cardSmallText.setAttribute('class', 'text-muted')
    cardSmallText.setAttribute('id', `date-published-${randomNumber}`)

    // Date function 
    const event = new Date(newsData[item].publishedAt)
    let stringEvent = event.toString()
    stringEvent = stringEvent.split(" ").slice(0, 4).join(" ")
    cardSmallText.innerText = `${stringEvent}`

    cardBody.appendChild(dataHeart)
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
    favoriteBtnHandler()
}

const favoriteBtnHandler = () => {
    const dataHeartHtmlGroup = document.getElementsByClassName('data-heart-image')
    for (favoriteBtn of dataHeartHtmlGroup){
        favoriteBtn.addEventListener('click', () => {
            const favoriteId = favoriteBtn.dataset.id 
            findFavoriteStoryAttributes(favoriteId)})
    }
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
    .then(response => console.log(response))
}




