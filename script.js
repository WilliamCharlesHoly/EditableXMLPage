let xmlDoc;

document.getElementById('loadData').addEventListener('click', function () {
  fetch('data.xml')
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      xmlDoc = parser.parseFromString(data, 'text/xml');
      displayXMLData(xmlDoc);
    })
    .catch(error => console.error('Error loading XML:', error));
});

document.getElementById('addItemForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  if (xmlDoc) {
    const newItem = xmlDoc.createElement('item');

    const newTitle = xmlDoc.createElement('title');
    newTitle.textContent = title;
    newItem.appendChild(newTitle);

    const newDescription = xmlDoc.createElement('description');
    newDescription.textContent = description;
    newItem.appendChild(newDescription);

    xmlDoc.getElementsByTagName('data')[0].appendChild(newItem);

    displayXMLData(xmlDoc);

    // Clear the form
    document.getElementById('addItemForm').reset();
  } else {
    alert('Please load the XML data first.');
  }
});

function displayXMLData(xmlDoc) {
  const items = xmlDoc.getElementsByTagName('item');
  let html = '<h2>XML Data:</h2><ul>';
  for (let i = 0; i < items.length; i++) {
    const title = items[i].getElementsByTagName('title')[0].textContent;
    const description = items[i].getElementsByTagName('description')[0].textContent;
    html += `<li><strong>${title}</strong>: ${description}</li>`;
  }
  html += '</ul>';
  document.getElementById('xmlData').innerHTML = html;
}
