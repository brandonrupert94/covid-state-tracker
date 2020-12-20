'use strict'
const apiKey= "AIzaSyDPLbIT5mkBx1vlDjD101H3w4rAv31Cfz4";
const baseUrl= "https://api.covidtracking.com/v1/states/";

//this function returns the form html for selecting a state

function stateFormHtml(){
    
    let formHtml= `<form id="covid-form">
    <label for="state">Select a State:</label>
    <input type="text" id="state" class="state-form" value="" placeholder="IL" maxlength="2" required>
    <input type="submit" id="state-stats" value="Get stats!">
</form>
`;
 $('#form-container').empty();
 $('#results-container').empty();

 $('#form-container').append(formHtml);

}
function displayVideos(responseJson){
 $('#results-container').empty();
   ;

  for (let i=0; i < responseJson['items'].length; i++){
    let videoUrl= `https://www.youtube.com/watch?v=${responseJson['items'][i]['id']['videoId']}`;

    $('#results-container').append(`<div class="video">
     <p>${responseJson['items'][i]['snippet']["title"]}</p>
     <a href="${videoUrl}">${videoUrl}</a>
     </div>`);
  };
 
  console.log('ddisplayVideos ran')
};

//displays results based off of fetch response
function displayResults(responseJson){
    
    $('#results-container').empty();
    
    
    let resultHtml=`<div>
     <ul>
        <li>Positive Cases: ${responseJson["positive"]}</li>
        <li>Negative Cases: ${responseJson["negative"]}</li>
        
        <li>Deaths: ${responseJson["death"]}</li>
        <li>Currently Hospitalized: ${responseJson["hospitalizedCurrently"]}</li>
        

     </ul>

    </div>`;
    console.log('displayResults ran');
    $('#results-container').append(resultHtml);
};
//this function creates the url for a fetch command for what state will display results
function createUrl(){
    $('.error-message').hide();
    let stateSelected = document.getElementById('state').value;
    let fullUrl= `${baseUrl}${stateSelected}/current.json`;
    fullUrl.toLowerCase();
    console.log(fullUrl)
    
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
    console.log('getYTVideos ran');
}
//This function listens to the user selecting to show global stats or to pull up an additional form to select a state
function handleGetForm(){
    $('#js-state').on('click', event =>{
        event.preventDefault();
        stateFormHtml();
    })
    $('#js-youtube').on('click', event =>{
        event.preventDefault();
        getYoutubeVideos();
    })
}


$(handleGetStats());
$(handleGetForm());