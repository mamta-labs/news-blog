const apiKey = '07be6922489345deb48d8d45c5ab98ee';

const blogContainer = document.getElementById('blog-container');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

async function fetchRandomNews(){
    try{
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data.articles;
    }catch(error){
        console.error('Error fetching Random news:', error);
        return [];
    }
}

async function fetchNewQuery(query){
    try{
        const url = `https://newsapi.org/v2/everything?q=${query}&pageSize=12&apiKey=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.articles;
    }catch(error){
        console.error('Error fetching news for query:', error);
        return [];
    }
}

searchButton.addEventListener('click',async ()=>{
    const query = searchInput.value.trim();
    if(query){
        const response = await fetchNewQuery(query);
        displayBlogs(response);
    }
})


function displayBlogs(articles){
    blogContainer.innerHTML = '';
    articles.forEach((article)=>{
        const blogCard = document.createElement('div');
        blogCard.classList.add('blog-card');
        const img = document.createElement('img');
        img.src = article.urlToImage || 'placeholder.jpg';
        img.alt = article.title;
        const title = document.createElement('h2');
        title.innerText = article.title.length > 40 ? article.title.substring(0, 40) + '...' : article.title;
        const description = document.createElement('p');
        description.innerText = article.description?.length > 200 ? article.description.substring(0, 200) + '...' : article.description;
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click',()=>{
            window.open(article.url, '_blank');
        })
        blogContainer.appendChild(blogCard);
    })
}


(async ()=>{
    try{
        const newsArticles = await fetchRandomNews();
        await displayBlogs(newsArticles);
    }catch(error){
        console.error('Error fetching news:', error);
    }
})();