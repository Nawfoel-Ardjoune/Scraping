//importScripts('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js');

function scrape() {
  const profiles = [];
  document.querySelectorAll('li.reusable-search__result-container').forEach(profileElement => {
    let lien, name, description, region;
    try {
      lien = profileElement.querySelector('a.app-aware-link').href;
      name = profileElement.querySelector('span[aria-hidden="true"]').textContent;
      description = profileElement.querySelector('div.entity-result__primary-subtitle').textContent;
      region = profileElement.querySelector('div.entity-result__secondary-subtitle').textContent;
      const profile = { name, region, description, lien };
      profiles.push(profile);
      //console.log(profile);
    } catch (error) {
      console.error(error);
    }
  });

  //updateOrCreateExcel(profiles);
}

function updateOrCreateExcel(profiles) {
  // Fonction pour convertir les données en format ArrayBuffer
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }

  const filename = 'profiles.xlsx';

  // Fonction pour télécharger le fichier
  function downloadFile(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // Lecture du fichier existant
  fetch(filename)
    .then(response => {
      if (!response.ok) throw new Error('File not found');
      return response.arrayBuffer();
    })
    .then(arrayBuffer => {
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });

      // Supposons que la feuille à mettre à jour est la première feuille
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      // Convertir la feuille en JSON
      const existingData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Ajouter les nouvelles données
      const newData = profiles.map(profile => [profile.name, profile.region, profile.description, profile.lien]);
      const updatedData = existingData.concat(newData);

      // Convertir les données mises à jour en feuille
      const updatedWorksheet = XLSX.utils.aoa_to_sheet(updatedData);
      workbook.Sheets[firstSheetName] = updatedWorksheet;

      // Générer le fichier Excel mis à jour et le télécharger
      const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
      const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
      downloadFile(blob, filename);
    })
    .catch(error => {
      console.log('File not found, creating a new one.');

      // Créer un nouveau classeur et une nouvelle feuille avec les données des profils
      const data = [
        ['Nom', 'Région', 'Description', 'Lien'],
        ...profiles.map(profile => [profile.name, profile.region, profile.description, profile.lien])
      ];
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.aoa_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Profiles');

      // Générer le fichier Excel et le télécharger
      const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
      const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
      downloadFile(blob, filename);
    });
}

scrape();
