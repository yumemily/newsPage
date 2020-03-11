let newsList = [];
let apiKey = '957e244988d4422e806f06d82ddd8856'
let status = "less";

let callAPI = async () => {

    let url = `https://newsapi.org/v2/everything?sources=bbc-news&apiKey=${apiKey}`

    let data = await fetch(url);
    let result = await data.json();

    let newsList = result.articles;
    document.getElementById('articleCount').innerHTML = `Displaying ${newsList.length} Articles`;
    console.log(newsList.length)
    console.log("data", data);
    console.log("json", result);
    console.log("article list", newsList);

    render(newsList);
}

let render = (array) => {
    let htmlForNews = array.map((item) => {
        return `<div class="card mb-3" style="max-width: 800px;">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img src="${item.urlToImage}" class="card-img" height="100%" style="object-fit:cover;" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
        <p mb-1 class="card-text">${item.source.name}</p>  
        <h5 class="card-title">${item.title}</h5>
          <p class="card-text">${item.description}</p>
          <div class="card-text"><a href="${item.url}">Read More</a></div>
          <span class="card-text"><small class="text-muted">${item.author}</small></span>
          <p class="card-text"><small class="text-muted">${moment(item.publishedAt).format('LLL')}</small></p>
        </div>
      </div>
    </div>
  </div>`
    }).join('')
    document.getElementById('newsArea').innerHTML = htmlForNews
}



let getMoreData = async () => {
    let moreUrl = `https://newsapi.org/v2/everything?sources=bbc-news&pageSize=40&apiKey=${apiKey}`

    let moreData = await fetch(moreUrl);
    let moreResult = await moreData.json();

    let newsListMore = moreResult.articles;
    document.getElementById('articleCount').innerHTML = `Displaying ${newsListMore.length} Articles`;
    console.log(newsListMore.length)
    console.log("data", moreData);
    console.log("json", moreResult);
    console.log("article list", newsListMore);
    render(newsListMore);
}

function toggleShow() {
    if (status == "less") {
        getMoreData();
        document.getElementById("toggleButton").innerText = "See Less";
        status = "more";
    } else if (status == "more") {
        callAPI();
        document.getElementById("toggleButton").innerText = "See More";
        status = "less"
    }
}

callAPI();