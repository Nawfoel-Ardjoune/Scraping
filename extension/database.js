// This script handles interactions with the local database
let db;
const request = indexedDB.open('LinkedInProfiles', 1);

request.onupgradeneeded = event => {
  db = event.target.result;
  const objectStore = db.createObjectStore('profiles', { keyPath: 'id', autoIncrement: true });
  objectStore.createIndex('name', 'name', { unique: false });
  objectStore.createIndex('email', 'email', { unique: true });
  objectStore.createIndex('position', 'position', { unique: false });
  objectStore.createIndex('link', 'link', { unique: true });
};

request.onsuccess = event => {
  db = event.target.result;
};

function saveProfile(profile) {
  const transaction = db.transaction(['profiles'], 'readwrite');
  const objectStore = transaction.objectStore('profiles');
  const request = objectStore.add(profile);

  request.onsuccess = () => {
    console.log('Profile saved successfully');
  };

  request.onerror = () => {
    console.log('Error saving profile');
  };
}
