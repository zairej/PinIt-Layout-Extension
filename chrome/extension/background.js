const bluebird = require('bluebird');
global.Promise = bluebird;

function promisifier(method) {
  // return a function
  return function promisified(...args) {
    // which returns a promise
    return new Promise(resolve => {
      args.push(resolve);
      method.apply(this, args);
    });
  };
}

function promisifyAll(obj, list) {
  list.forEach(api => bluebird.promisifyAll(obj[api], { promisifier }));
}

// let chrome extension api support Promise
promisifyAll(chrome, [
  'tabs',
  'windows',
  'browserAction',
  'contextMenus'
]);
promisifyAll(chrome.storage, [
  'local',
]);

require('./background/contextMenus');
require('./background/inject');

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  chrome.tabs.sendMessage(tabId, { toggle: false }, (response) => {
    chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
    if (response.farewell) {
      chrome.browserAction.setBadgeText({ text: '+', tabId: tab.id });
    } else {
      chrome.browserAction.setBadgeText({ text: '0', tabId: tab.id });
    }
  });
});

chrome.browserAction.onClicked.addListener(() => {
  // Send a message to the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { toggle: true });
  });
});
