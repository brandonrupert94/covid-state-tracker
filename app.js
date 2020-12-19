

const baseUrl= "https://api.covidtracking.com/v1/states/"












function stateFormHtml(){
    let formHtml= `<form id="covid-form">
    <label for="state">Select a State:</label>
    <input type="text" id="state" class="state-form" value="" maxlength="2" required>
    <input type="submit" value="Get stats!">
</form>
<div id="results-container" class="results">`;
 $('#form-container').empty();

 $('#form-container').append(formHtml);

}







//displays results based off of fetch response
function displayResults(responseJson){
    
    let resultHtml=`<div>
     <ul>
        <li>
        ${responseJson["state"]}
        ${responseJson["positive"]}
        ${responseJson["pending"]}
        </li>     
     </ul>

    </div>`;
    console.log('displayResults ran');
    $('#results-container').append(resultHtml);
};


























//this function creates the url for a fetch command for what state will display results
/*function createUrl(){
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

$(handleGetStats());*/
function handleGetForm(){
    $('#js-state').on('click', event =>{
        event.preventDefault();
        stateFormHtml();
    })
}

$(handleGetForm());