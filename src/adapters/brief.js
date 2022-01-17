window.onload = function() {
    searchBtnHandler()
  };

const searchBtnHandler = () => {
const briefBtn = document.getElementById('brief-btn')
const sectionOneImage = document.getElementById('section-one-img')
briefBtn.addEventListener('click', () => {
    sectionOneImage.src = "./styles/images/section1-logo3.svg"
    // if (sectionOneImage.src == "./styles/images/section1-logo4.svg") {
    //     console.log('if',sectionOneImage.src)
    //     sectionOneImage.src = "./styles/images/section1-logo3.svg"
    // } else {
    //     console.log('else',sectionOneImage.src)
    //     sectionOneImage.src = "./styles/images/section1-logo4.svg" 
    // }
    // const btnClassList = briefBtn.classList
    // for(var i = 0; i < btnClassList.length; i++){
    //     if(btnClassList[i] == 'btn-primary'){
    //        briefBtn.classList.toggle('btn-danger')
    //     }
    // }
    })
}

const fetchBriefing = () => {
    fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=bcd9264c4d4646b5a22d288a9a796d3d')
    .then(response => response.json())
    .then(response => console.log(response.status, response.articles)
    )
}

