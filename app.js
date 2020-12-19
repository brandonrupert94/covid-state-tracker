

const baseUrl= "https://api.covidtracking.com/v1/states/"







function globalStats(){
    let url='https://api.covidtracking.com/v1/us/current.json'




         fetch(url)
            .then(response =>{
                if (response.ok){
                    return response.json();
                } throw new Error(response.status)
            })
            .then(responseJson => displayGlobalResults(responseJson))
            .then(responseJson => console.log(responseJson))
            .catch(err => {
                $('.error-message').show();
                });

}




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
function displayGlobalResults(responseJson){
    $('#form-container').empty();
    $('#results-container').empty();
    
    let resultHtml=`<div>
     <ul>
        <li>Positive Cases: ${responseJson["positive"]}</li>
        <li>Negative Cases: ${responseJson["negative"]}</li>
        <li>Cases Pending: ${responseJson["pending"]}</li>
        <li>Deaths: ${responseJson["death"]}</li>
        <li>Currently Hospitalized: ${responseJson["hospitalizedCurrently"]}</li>
        <li>Total Hospitalized: ${responseJson["hospitalizedCumulative"]}</li>

     </ul>

    </div>`;
    console.log('displayResults ran');
    $('#results-container').append(resultHtml);
};




function displayStateResults(responseJson){
    $('#form-container').empty();
    $('#results-container').empty();
    let resultHtml = `<div>
    <ul>
        <li>Positive Cases: ${responseJson["positive"]}</li>
        <li>Negative Cases: ${responseJson["negative"]}</li>
        <li>Cases Pending: ${responseJson["pending"]}</li>
        <li>Deaths: ${responseJson["death"]}</li>
        <li>Currently Hospitalized: ${responseJson["hospitalizedCurrently"]}</li>
        <li>Total Hospitalized: ${responseJson["hospitalizedCumulative"]}</li>
    </ul>
    
    </div>`;
    console.log('displayStateResults ran');
    $('#results-container').append(resultHtml);
}






//this function creates the url for a fetch command for what state will display results
function createUrl(){
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
            .then(responseJson => displayStateResults(responseJson))
            .then(responseJson => console.log(responseJson))
            .catch(err => {
                $('.error-message').show();
                });
            
    
    console.log('createUrl ran');
};



//This function will listen for form submit and return values and upload to DOM
function handleGetStats(){
    $('main').submit(event =>{
        event.preventDefault();
        createUrl();
    })

}

$(handleGetStats())
function handleGetForm(){
    $('#js-state').on('click', event =>{
        event.preventDefault();
        stateFormHtml();
    })
    $('#js-global').on('click', event =>{
        event.preventDefault();
        globalStats();
    })
    
}

$(handleGetForm());