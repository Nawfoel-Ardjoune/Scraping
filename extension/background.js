// Background script to handle persistent tasks or data management
importScripts('database.js');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'saveProfile') {
    saveProfile(message.profile);
  }
});
