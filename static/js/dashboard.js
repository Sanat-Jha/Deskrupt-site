function copyToClipboard(text) {
    // Create a temporary input element to copy the text
    var inputElement = document.createElement('input');
    inputElement.value = text;
    document.body.appendChild(inputElement);
    inputElement.select();
    document.execCommand('copy');
    document.body.removeChild(inputElement);

    // Optional: Change the button's color or show a confirmation
    var button = event.target;
    button.classList.add('copied'); // Adds the 'copied' class for green color
    setTimeout(function() {
        button.classList.remove('copied'); // Removes it after a short delay
    }, 1000);
}
