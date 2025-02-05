(function () {
  var worker = 'sw.js';

    if ("serviceWorker" in navigator) {
      	window.addEventListener("load", function() {
            navigator.serviceWorker.register(worker).then(function(reg) {
                 console.log('Service Worker registered with scope: ', registration.scope);
                reg.onupdatefound = function() {
                    var installingWorker = reg.installing;

                    installingWorker.onstatechange = function() {
                        switch (installingWorker.state) {
                            case 'installed':
                                if (navigator.serviceWorker.controller) {
                                   clients.matchAll().then(function(clients) {
                                        clients.forEach(function(client) {
                                          client.postMessage({ action: "newVersionAvailable" });
                                        });
                                    });
                                } else {
                                    // console.log('Content is now available offline!');
                                }
                                break;

                            case 'redundant':
                                // console.error('The installing service worker became redundant.');
                                break;
                        }
                    };
                };
            }).catch(function(e) {
                // console.error('Error during service worker registration:', e);
            });
      	})
	}

})();

if (navigator.serviceWorker) {
  navigator.serviceWorker.addEventListener('message', function(event) {
    if (event.data && event.data.action === 'newVersionAvailable') {
      showUpdateBanner();
    }
  });
}

function showUpdateBanner() {
  const banner = document.getElementById('update-banner');
  const reloadBtn = document.getElementById('reload-btn');
  
  banner.style.display = 'block'; // Show the banner

  reloadBtn.addEventListener('click', function() {
    window.location.reload(); // Refresh the page to load the new version
  });
}