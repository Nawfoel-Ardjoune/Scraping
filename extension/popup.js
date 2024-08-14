//Action du click sur le bouton de collecte
document.getElementById('scrape').addEventListener('click', () => {
  // const nbPages = document.getElementById('nbPages').value;
  // console.log("Nombre de pages == ", nbPages);
  // for (let i = 0; i <= nbPages; i++){
    
  // }
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ['content.js']
    });
  });
});

//Action du click sur le bouton de Linkedin
document.getElementById('linkedinSearch').addEventListener('click', () => {
  const query = document.getElementById('searchBox').value;
  if (query) {
    const encodedValue = encodeURIComponent(query);
    const linkedinSearchUrl = `https://www.linkedin.com/search/results/people/?geoUrn=%5B"104246759"%5D&keywords=${encodedValue}`;
    chrome.tabs.create({ url: linkedinSearchUrl });
  }else {
    console.log("Erreur : Une erreur dans la requête du site Linkedin");
  }
});

//Action du click sur le bouton de Indeed
document.getElementById('indeedSearch').addEventListener('click', () => {
  const query = document.getElementById('searchBox').value;
  if (query) {
    const encodedValue = encodeURIComponent(query);
    const indeedSearchUrl = `https://resumes.indeed.com/search?q=${encodedValue}&l=Île-de-France`;
    chrome.tabs.create({ url: indeedSearchUrl });
  }else {
    console.log("Erreur : Une erreur dans la requête du site indeed");
  }
});

//Action du click sur la lecture des fichiers
document.getElementById('formFile').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
      console.log('Selected file:', file.name);
      // Add your code to handle the selected file
  }
});