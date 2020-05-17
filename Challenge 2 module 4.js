var inputElement = document.querySelector('input');
var buttonElement = document.querySelector('button');
var repositoryList = document.querySelector('ul');

buttonElement.onclick = function searchUser() {
    deleteChild();
    var inputValue = inputElement.value;

    var loadingElement = document.createElement('li');
    repositoryList.appendChild(loadingElement);
    var loadingText = document.createTextNode('Loading...');
    loadingElement.appendChild(loadingText);

    var loading = axios.get('https://api.github.com/users/' + inputValue + '/repos')
        .then(function (response) {
            repositoryList.removeChild(loadingElement);
            var length = response.data.length;
            var i = 0;

            if (length === i) {
                alert(inputValue + ' doesn’t have any public repositories yet.');
            } else {
                while (i <= length - 1) {
                    var objectEntries = Object.entries(response.data[i]);

                    var itemElement = document.createElement('li');
                    repositoryList.appendChild(itemElement);
                    var textElement = document.createTextNode('Repository ' + (i + 1) + ': ');
                    itemElement.appendChild(textElement);
                    var brElement = document.createElement("br");
                    itemElement.appendChild(brElement);

                    for (objectEntrie of objectEntries) {
                        var objectEntrieString = objectEntrie.toString();
                        objectEntrieString = objectEntrieString.replace(/,/, ': ');

                        var textElement = document.createTextNode(' - ' + objectEntrieString)
                        itemElement.appendChild(textElement);

                        var brElement = document.createElement("br");
                        itemElement.appendChild(brElement);
                    }
                    i++;
                };

            }
        })
        .catch(function (error) {
            var response = error.response;

            if (response != null) {
                var objectEntries = Object.entries(response);
                defineError(objectEntries);
            } else {
                alert('An unknown error ocurred. Please, try again.');
            }
            repositoryList.removeChild(loadingElement);
        })
    inputElement.value = '';
}

function deleteChild() {
    var child = repositoryList.lastElementChild;
    while (child) {
        repositoryList.removeChild(child);
        child = repositoryList.lastElementChild;
    }
}

function defineError(objectEntries) {
    var status = objectEntries[1];

    if (status[1] == 404) {
        alert('Please, enter a valid Github username.');
    } else {
        alert('An unknown error ocurred. Please, try again.');
    }
}

inputElement.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        buttonElement.click();
    }
});