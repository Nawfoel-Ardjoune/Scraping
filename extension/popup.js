//c'est juste un exemple 
document.getElementById('getInfo').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        function: getPageInfo,
      },
      (results) => {
        document.getElementById('info').innerText = results[0].result;
      }
    );
  });
});

function getPageInfo() {
  const title = document.title;
  const url = window.location.href;
  return `Title: ${title}\nURL: ${url}`;
}
