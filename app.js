'use strict'

const baseUrl= "https://api.covidtracking.com/v1/states/"






//this function returns the compare form
function compareStats(){
    
    let formHtml= `<div id="state-one" class="compare">
        <form id="covid-form">
            <label for="state-one">Select 1st State:</label>
            <input type="text" id="state-one" class="state-form" value="" placeholder="il" maxlength="2" required>
        </form>
     
    </div>
    <div id="state-two" class="compare">
        <form id="covid-form">
            <label for="state-two">Select 2nd State:</label>
            <input type="text" id="state-two" class="state-form" value="" placeholder="ca" maxlength="2" required>
        </form>    
    </div>
    <div id="compare">
        <input type="submit" id="button" value="Compare">
        </div>`;

    $('#form-container').empty();
    $('#results-container').empty();
    $('#form-container').append(formHtml);
}


//this function returns the form html for selecting a state

function stateFormHtml(){
    
    let formHtml= `<form id="covid-form">
    <label for="state">Select a State:</label>
    <input type="text" id="state" class="state-form" value="" placeholder="IL" maxlength="2" required>
    <input type="submit" value="Get stats!">
</form>
`;
 $('#form-container').empty();
 $('#results-container').empty();

 $('#form-container').append(formHtml);

}






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
//This function listens to the user selecting to show global stats or to pull up an additional form to select a state
function handleGetForm(){
    $('#js-state').on('click', event =>{
        event.preventDefault();
        stateFormHtml();
    })
    $('#js-compare').on('click', event =>{
        event.preventDefault();
        $('#form-container').empty();
        compareStats();
    })
    
}


$(handleGetStats());
$(handleGetForm());