'use strict';

var isGitHub = function isGitHub(tabId, changeInfo, tab) {
  if (tab.url.indexOf('https://github.com') === 0) {
    chrome.pageAction.show(tabId);
  }
};

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.tabs.onUpdated.addListener(isGitHub);
//# sourceMappingURL=background.js.map
