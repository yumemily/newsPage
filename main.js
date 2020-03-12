let newsList = [];
let apiKey = '957e244988d4422e806f06d82ddd8856'
let page = 1;

let callAPI = async () => {

  let url = `https://newsapi.org/v2/everything?q=korea&page=${page}&apiKey=${apiKey}`;

  let data = await fetch(url);
  let result = await data.json();

  newsList = newsList.concat(result.articles);
  searchBySource();
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


let getSources = (item) => {
  item.map(a => {
    let source = a.source.name;
    if (sources[source] == null) {
      sources[source] = 0;
    };
    sources[source]++;
  })
  showSources(newsList);
}

let loadMore = () => {
  page++;
  console.log(page);
  callAPI();
}

let searchByCategory = async () => {
  let category = document.getElementById("category").value;
  let url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`;
  let data = await fetch(url);
  let result = await data.json();

  newsList = result.articles;
  render(newsList);
};


let searchBySource = () => {
  let sourceNames = newsList.map(item => item.source.name);

  let sourceObject = sourceNames.reduce((total, name) => {
    console.log("total:", total);
    if (name in total) {// in is the operator to use for object and find the key from object
      total[name]++;
    } else {
      total[name] = 1;
    }
    return total;
  }, {});

  let sourceArray = Object.keys(sourceObject);// get the Key from object to the array 

  let htmlForSource = sourceArray.map(
    item =>
    `<li class="list-group-item"> <input onchange='sourceClicked("${item}")' type="checkbox" id="${item}"/> ${item} (${sourceObject[item]})</li>`
     
  ).join('');

  document.getElementById("source").innerHTML = htmlForSource;
}

let sourceClicked = index => {
  if (document.getElementById(index).checked == true) {
    let filteredNews = newsList.filter(item => item.source.name === index);
    render(filteredNews);
  } else {
    render(newsList);
  }
};

callAPI();