var selectElem = document.getElementById('select');
var pElem = document.getElementById('sortBy');

// When a new <option> is selected
selectElem.addEventListener('change', function() {
  var index = selectElem.options[selectElem.selectedIndex].value;
  // Add that data to the <p>
  pElem.innerHTML =  selectElem.options[selectElem.selectedIndex].innerText;
  chrome.runtime.sendMessage(index);
});