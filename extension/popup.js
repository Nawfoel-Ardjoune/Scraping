document.getElementById('scrape').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ['content.js']
    });
  });
});

document.getElementById('save').addEventListener('click', async function() {
  try {
      const handle = await window.showSaveFilePicker({
          suggestedName: 'newfile.txt',
          types: [{
              description: 'Text Files',
              accept: {'text/plain': ['.txt']}
          }]
      });
      
      const writable = await handle.createWritable();
      await writable.write('Hello, world!');
      await writable.close();
      console.log('File created successfully');
  } catch (err) {
      console.error('File creation failed:', err);
  }
});

document.getElementById('linkedinSearch').addEventListener('click', () => {
  const query = document.getElementById('searchBox').value;
  if (query) {
    const encodedValue = encodeURIComponent(query);
    const linkedinSearchUrl = `https://www.linkedin.com/search/results/people/?keywords=${encodedValue}`;
    chrome.tabs.create({ url: linkedinSearchUrl });
  }else {
    console.log("Erreur : Rien reçu de la searchbox");
  }
});



                //============//
//Faire un Bouton pour récupérer un seul profile//
                //============//
