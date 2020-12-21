
const apiKey= "AIzaSyDPLbIT5mkBx1vlDjD101H3w4rAv31Cfz4";
const baseUrl= "https://api.covidtracking.com/v1/states/";

//this function returns the form html for selecting a state

function stateFormHtml(){
    
    let formHtml= `
        <form id="covid-form">
            <label for="state">Select a State:</label>
            <input type="text" id="state" class="state-form" value="" placeholder="IL" maxlength="2" required>
            <input type="submit" id="state-stats" value="Get stats!">
        </form>`;
    $('#form-container').empty();
    $('#results-container').empty();

    $('#form-container').append(formHtml);

}
//this function is called when the Youtube Covid Safety button submits a fetch request and uses the data to display results
function displayVideos(responseJson){
    $('#results-container').empty();
    $('#youtube-video').empty();
    
    for (let i=0; i < responseJson['items'].length; i++){
        let videoUrl= `https://www.youtube.com/watch?v=${responseJson['items'][i]['id']['videoId']}`;
        let videoDescription= `${responseJson['items'][i]['snippet']['description']}`;

        $('#youtube-video').append(`
        <div class="video">
            <h3>${responseJson['items'][i]['snippet']["title"]}</h3>
                <ol>
                    <li><p>Description: ${videoDescription}</p></li>
                    <li><p>Video Link: <a href="${videoUrl}">${videoUrl}</a></p></li>
                </ol>
        </div>`);
  };
 
  console.log('ddisplayVideos ran')
};

//displays results based off of fetch response to the state covid stat tracker form
function displayResults(responseJson){
   
    $('#results-container').empty();
    
    
    let resultHtml=`<div>
     <ul>
        <li class="results">Positive Cases: ${responseJson["positive"]}</li>
        <li class="results">increase from previous day: ${responseJson["positiveIncrease"]}</li>
        <li class="results">Negative Cases: ${responseJson["negative"]}</li>
        
        <li class="results">Deaths: ${responseJson["death"]}</li>
        <li class="results">Death increase from previous day: ${responseJson["deathIncrease"]}</li>
        <li class="results">Currently Hospitalized: ${responseJson["hospitalizedCurrently"]}</li>
        

     </ul>

    </div>`;
    $('#results-container').append(resultHtml);
};
//this function creates the url for a fetch command for what state will display results
function createUrl(){
    $('.error-message').hide();
    let stateSelected = document.getElementById('state').value;
    let fullUrl= `${baseUrl}${stateSelected}/current.json`;
    fullUrl.toLowerCase();
        
        fetch(fullUrl)
            .then(response =>{
                if (response.ok) {
                   return response.json();
                } throw new Error(response.status);
            })
            .then(responseJson => displayResults(responseJson))
            .catch(err => {
                $('.error-message').show();
                });
            
    
    console.log('createUrl ran');
};


//This function will listen for form submit and return values and upload to DOM. This specifically happens when retrieving state values
function handleGetStats(){
    $('main').submit(event =>{
        event.preventDefault();
        createUrl();
    })
}

//this function is the fetch for the youtube api to get the response data and pass it through the displayVideos function

function getYoutubeVideos(){
    $('.error-message').hide();
    let url=`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=covid%20safety&key=${apiKey}`

    fetch(url)
        .then(response =>{
            if (response.ok) {
                return response.json();
            } throw new Error(response.status);
        })
        .then(responseJson => displayVideos(responseJson))
        .catch(err => {
            $('.error-message').show();
        });
}
//This function listens to the user selecting to show state stats or to pull up a list of covid safety youtube videos
function handleGetForm(){
    $('#js-state').on('click', event =>{
        event.preventDefault();
        $('#youtube-video').empty();
        stateFormHtml();
        handleGetStats();
    })
    $('#js-youtube').on('click', event =>{
        event.preventDefault();
        $('#form-container').empty();
        $('#results-container').empty();
        getYoutubeVideos();
    })
}



$(handleGetForm());