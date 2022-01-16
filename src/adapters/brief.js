window.onload = function() {
    searchBtnHandler()
  };

const searchBtnHandler = () => {
const briefBtn = document.getElementById('brief-btn')
briefBtn.addEventListener('click', () => {
    const btnClassList = briefBtn.classList
    for(var i = 0; i < btnClassList.length; i++){
        if(btnClassList[i] == 'btn-primary'){
           briefBtn.classList.toggle('btn-danger')
        }
    }
    })
}

const fetchBriefing = () => {
    fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=bcd9264c4d4646b5a22d288a9a796d3d')
    .then(response => response.json())
    .then(response => console.log(response.status, response.articles)
    )
}

