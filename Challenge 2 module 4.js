var inputElement = document.querySelector('input');
var buttonElement = document.querySelector('button');
var repositoryList = document.querySelector('ul');

// inputElement.style.width = '500px';

buttonElement.onclick = function searchUser() {
    deleteChild();
    var inputValue = inputElement.value;
    axios.get('https://api.github.com/users/' + inputValue + '/repos')
        .then(function (response) {
            var objectEntries = Object.entries(response.data[0]);

            for (objectEntrie of objectEntries) {
                var objectEntrieString = objectEntrie.toString();
                objectEntrieString = objectEntrieString.replace(/,/, ': ');

                var itemElement = document.createElement('li');
                var textElement = document.createTextNode(objectEntrieString)
                console.log(response);

                itemElement.appendChild(textElement);
                repositoryList.appendChild(itemElement);
            }
        })
        .catch(function (error) {
            alert('Please, type a valid Github username');
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

//(6) ["data", "status", "statusText", "headers", "config", "request"]