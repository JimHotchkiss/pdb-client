window.onload = function() {
    getYourBriefBtnHandler()
    getFavoritesBtnHandler()
    searchTopicBtnHandler()
    
  }

// Your Brief handler
const getYourBriefBtnHandler = () => {
    const briefBtn = document.getElementById('brief-btn')
    briefBtn.addEventListener('click', () => {
        if(NewsData.state){
            const newsData = NewsData.state
            renderData(newsData)
            } else {
                clearHtmlContent()
                getBriefingData() 
            }
        })
    }

// Favorites handler
const getFavoritesBtnHandler = () => {
    const usersIdBtn = document.getElementById('favorites-id')
    usersIdBtn.addEventListener('click', () => {
        getFavorites()
    })

}

const hideSectionOneTwo = () => {
    const sectionOneTwo = document.getElementById('section-one-two')
    sectionOneTwo.style.display = 'none'
}

const getFavorites = () => {
    const usersBaseUrl = 'http://localhost:3000/api/v1/'
    fetch(usersBaseUrl + `favorites`)
    .then(response => response.json())
    .then(response => {
        if (response.length == 0 ) {
            alert('No stories have been saved to "favorites". Be the first!')
        } else {
            FavoriteStories.state = response
            renderData(FavoriteStories.state)
            hideSectionOneTwo()
        }
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
    .then(response =>  {
        renderData(response.articles)
        newsDataState = response.articles
    })
}


const getBriefingData = () => {
    fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=bcd9264c4d4646b5a22d288a9a796d3d')
    .then(response => response.json())
    .then(response => {
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
        // Headline News
        cardBtn.setAttribute('class', 'btn btn-warning')
        cardBtn.setAttribute('href', `${newsData[item].url}`)
        cardBtn.setAttribute('id', `story-url-${itemId}`)
        cardBtn.setAttribute('target', '_blank')
        // Join Conversation - Instead of text, make it an icon
        // Create conditional to put in conversation icon instead of heart
        // Headline News
        cardBtn.setAttribute('class', 'btn btn-warning')
        cardBtn.setAttribute('href', `${newsData[item].url}`)
        cardBtn.setAttribute('id', `story-url-${itemId}`)
        cardBtn.setAttribute('target', '_blank')
        
        
        cardBtn.innerText = 'Learn More'
     
        const dataIcon = document.createElement('div')
        if (!newsData[0].id) {
            dataIcon.setAttribute('class', 'data-bookmark-img mt-1 mb-3')  
            dataIcon.setAttribute('data-id', itemId) 
            dataIcon.addEventListener('click', () => {
                const favoriteId = itemId
                favoriteBtnHandler(itemId)
            })
        } else {
            dataIcon.setAttribute('class', 'comment-image mt-1 mb-3') 
            dataIcon.setAttribute('data-id', itemId) 
            dataIcon.addEventListener('click', () => {
                const favoriteId = itemId
                conversationBtnHandler()
            })
        }

        const conversationBtnHandler = () => {
            console.log(newsData[item])
            // <div class="mb-3">
            //     <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
            //     <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            // </div>
            clearHtmlContent()
            renderCommentInput()

        }

        const renderCommentInput = () => {
            hideSectionOneTwo()
            const commentInputDiv = document.createElement('div')
            commentInputDiv.setAttribute('class', 'container mb-3')
            const commentLabel = document.createElement('label')
            commentLabel.setAttribute('class', 'form-label')
            commentLabel.innerText = "Join the conversation"
            const commentText = document.createElement('textarea')
            commentText.setAttribute('class', 'form-control')
            // Put together div, label and text 
            commentInputDiv.appendChild(commentLabel)
            commentInputDiv.appendChild(commentText)
            // Render news section
            const renderNewsSection = document.getElementById('render-news-section')
            renderNewsSection.appendChild(commentInputDiv)

        }

        const cardSmallText = document.createElement('small')
        cardSmallText.setAttribute('class', 'text-muted')
        cardSmallText.setAttribute('id', `date-published-${itemId}`)
    
        // Date function 
       const event = new Date(newsData[item].publishedAt)
        let stringEvent = event.toString()
        stringEvent = stringEvent.split(" ").slice(0, 4).join(" ")
        cardSmallText.innerText = `${stringEvent}`
  

        if(newsData[item].publishedAt) {
            cardBody.appendChild(dataIcon)
        } 
        // Put the Join Conversation icon btn
        cardBody.appendChild(dataIcon)
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
        const cardDiv = document.createElement('div')
        cardDiv.setAttribute('class', 'card border m-2')
        cardDiv.setAttribute('style', 'min-width: 20%')
        const cardImage = document.createElement('img')
        if (newsData.urlToImage == null) {
            cardImage.setAttribute('src', '../../styles/images/no-photo.png')
        } else {
            cardImage.setAttribute('src', `${newsData.urlToImage}`)
        }
        // Favorite Page 
        cardImage.setAttribute('class', 'card-img-top')
        const cardBody = document.createElement('div')
        cardBody.setAttribute('class', 'card-body max-width: 60%')
        const cardH5Tag = document.createElement('h5')
        cardH5Tag.setAttribute('class', 'card-title')
        cardH5Tag.innerText = `${newsData.title}`
        const cardPtag1 = document.createElement('p')
        cardPtag1.setAttribute('class', 'card-text')
        cardPtag1.innerText = `${newsData.description}`
        const cardPtag2 = document.createElement('p')
        cardPtag2.setAttribute('class', 'card-text')
        const cardBtn = document.createElement('a')
        cardBtn.setAttribute('class', 'btn btn-warning')
        cardBtn.setAttribute('href', `${newsData.url}`)
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
    
        // Date function 
        const event = new Date(newsData.publishedAt)
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
        urlToImage: favoriteImgUrl = document.getElementById(`card-image-${favoriteId}`).getAttribute("src"),
        url:document.getElementById(`story-url-${favoriteId}`).getAttribute("href"),
        publishedAt: document.getElementById(`date-published-${favoriteId}`).innerText,
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
    .then(response => {
        if (response.error) {
            alert('This story has already been saved to "favorites". Check the "favorites" in the menu')
        } else {
            FavoriteStories.state = response
            renderData(response)
        }
    })
}

const toggleNewSection = () => {
    const renderNewsSection = document.getElementById('render-news-section')
    renderNewsSection.classList.toggle('d-none')
}




