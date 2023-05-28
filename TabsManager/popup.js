'use strict';

window.addEventListener('DOMContentLoaded', function () {
  const page1 = document.getElementById('page1');
  const page2 = document.getElementById('page2');
  const goToPage2Button = document.getElementById('goToPage2');
  const goToPage1Button = document.getElementById('goToPage1');
  const extTabs = document.getElementById('ext_tabs');
  const badge = document.getElementById('badge');

  goToPage2Button.addEventListener('click', function () {
    page1.style.display = 'none';
    page2.style.display = 'block';
  });

  goToPage1Button.addEventListener('click', function () {
    page2.style.display = 'none';
    page1.style.display = 'block';
  });

  function displayTabs() {
    chrome.tabs.query({}, function (tabs) {
      extTabs.innerHTML = '';

      const table = document.createElement('table');
      const tableHeader = table.createTHead();
      const headerRow = tableHeader.insertRow();
      const nameHeader = headerRow.insertCell();
      nameHeader.innerText = 'Name';
      const urlHeader = headerRow.insertCell();
      urlHeader.innerText = 'URL';

      const tableBody = table.createTBody();

      tabs.forEach(function (tab, index) {
        const row = tableBody.insertRow();
        row.addEventListener('click', function () {
          chrome.tabs.update(tab.id, { active: true });
        });

        const nameCell = row.insertCell();
        nameCell.innerText = tab.title;

        const urlCell = row.insertCell();
        const urlLink = document.createElement('a');
        urlLink.href = tab.url;
        urlLink.target = '_blank';
        urlLink.innerText = tab.url;
        urlCell.appendChild(urlLink);
      });

      extTabs.appendChild(table);

      updateBadge(tabs.length);
    });
  }

  function updateBadge(tabCount) {
    badge.innerText = tabCount.toString();
  }

  displayTabs(); 

  function updateBadgeByTabs(){
     chrome.tabs.query({}, function (tabs) {
      updateBadge(tabs.length);
    });
  }

  updateBadgeByTabs();

  chrome.tabs.onCreated.addListener(updateBadgeByTabs);

  chrome.tabs.onRemoved.addListener(updateBadgeByTabs);

});

