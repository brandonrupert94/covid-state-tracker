

const baseUrl= "https://api.covidtracking.com/v1/states/"




















//displays results based off of fetch response
function displayResults(responseJson){

};

//this function creates the url for a fetch command for what state will display results
function createUrl(){
    let stateSelected = document.getElementById('.state').value;
    let fullUrl= `${baseUrl} + ${stateSelected} + '/current.json'`;
    console.log(fullUrl)
    /*

        fetch(fullUrl)
            .then(response =>{
                if (response.ok) {
                    response.json();
                } throw new Error(response.status);
            })
            .then(responseJson => displayResults(responseJson))
            .catch(err => {
                $('.error-message').show();
                });*/

    console.log('createUrl ran');
};



//This function will listen for form submit and return values and upload to DOM
function handleGetStats(){
    $('main').submit(event =>{
        event.preventDefault();
        createUrl();
    })

}

$(handleGetStats());