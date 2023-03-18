const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const autherText = document.getElementById('author')
const newQuoteButton = document.getElementById('new-quote')
const twitterButton = document.getElementById('twitter')
const loader = document.getElementById('loader')

let apiQuotes = []

// showing loader
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// eraseing loader
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}



// Show new quotes
function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)]
    // chack if auther field is unknown
    if(!quote.author){
        autherText.textContent = "Unknown"
    }else{
        autherText.textContent = quote.author
    }
    // Chack the quote length to determine styling
    if (quote.text.length > 120){
        quoteText.classList.add('long-quote')
    }else{
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text
    complete();
}

// Get Quotes From API

async function getQuotes() {
    loading();
    const apiUrl = "https://type.fit/api/quotes"
    try{
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        newQuote()
    }catch(error){
        //Catch Error Here
        alert(error)
    }
}

// Tweet Quote

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${autherText.textContent}`;
    window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click',tweetQuote)

onload
getQuotes()