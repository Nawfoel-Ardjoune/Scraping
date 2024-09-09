let allProfiles = []; // Stocker les profils collectés

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'addProfiles') {
    // Ajouter les nouveaux profils collectés à allProfiles
    allProfiles = allProfiles.concat(request.profiles);
    sendResponse({ status: 'profiles_added' });
  }

  if (request.action === 'saveProfiles') {
    saveProfilesToFile(allProfiles);
    sendResponse({ status: 'profiles_saved' });
  }
});

function saveProfilesToFile(profiles) {
  try {
    const headers = 'Nom,Région,Description,Lien\n';
    let csvContent = profiles.map(profile => {
      return `${profile.name},"${profile.region}","${profile.description}",${profile.lien}`;
    }).join('\n');

    // Ajouter la BOM UTF-8 au début du contenu CSV
    const bom = '\uFEFF';
    csvContent = bom + headers + csvContent;

    // Encoder le contenu CSV en base64
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const reader = new FileReader();
    reader.onload = function() {
      const base64Data = reader.result.split(',')[1]; // Obtenir les données base64 sans le préfixe

      // Utiliser l'API chrome.downloads pour créer un fichier CSV
      chrome.downloads.download({
        url: `data:text/csv;base64,${base64Data}`,
        filename: 'profiles.csv',
        saveAs: true
      }, () => {
        console.log('Fichier CSV créé avec succès');
      });
    };
    reader.readAsDataURL(blob);
  } catch (err) {
    console.error('Échec de la création du fichier CSV :', err);
  }
}
