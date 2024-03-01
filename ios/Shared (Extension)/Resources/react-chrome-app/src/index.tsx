import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {GoogleOAuthProvider} from "@react-oauth/google";

const rootElement = document.createElement("div");
rootElement.id = "react-chrome-app";
const overlayElement = document.createElement("div");
overlayElement.id = 'reactOverlay'
const globalStyles = document.createElement("style");
globalStyles.innerHTML = `
  #${rootElement.id} {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 83vh;
  z-index: 2999999999;
  letter-spacing: 0;
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: transparent;
  }
  #reactOverlay {
  display: flex;
  flex-direction: column;
  flex: 1;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  letter-spacing: 0;
  z-index: 9999998;
  background-color: rgba(50, 50, 50, 0.60);
  }
`;
let productName = ''
let authToken = ''
// @ts-ignore
let refreshToken = ''
let savedURL = '';
let openOnSearch: boolean = false

// @ts-ignore
function handleResponse(message) {
    console.log(`Message from the background script: ${message}`);
}

function handleError(error: any) {
    console.log(`Error: ${error}`);
}

function fetchToken() {
    console.error('fetchToken action >>>>>>>>>>>>>>>>>>>>>>>>>>10101010')
    // @ts-ignore
    let sending = chrome.runtime.sendMessage({fetchToken: true});
    sending.then(handleResponse, handleError)
    // @ts-ignore
    chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
        console.log('opened here1')
        if (msg.action === 'displayButton') {
            const isButtonDisplayed = document.getElementById('actionButton')
            if (!isButtonDisplayed) {
                createButton()
                const domain = new URL(savedURL)
                console.log('domain',domain)
                const root = ReactDOM.createRoot(rootElement);
                root.render(
                    <React.StrictMode>
                        <GoogleOAuthProvider
                            clientId={'473803567705-bofpr870r0nov80c3clim1vnevvla5k6.apps.googleusercontent.com'}
                            onScriptLoadError={() => console.log('err load script outh')}
                            onScriptLoadSuccess={() => console.log('success')}>
                            <App productName={productName} openOnSearch={openOnSearch} domain={domain.hostname}/>
                        </GoogleOAuthProvider>
                    </React.StrictMode>
                );
                const scrollPosition = window.pageYOffset;

                document.body.style.position = 'fixed';
                document.body.style.top = `-${scrollPosition}px`;
                document.body.style.width = '100%';
                document.body.appendChild(rootElement);
                document.body.appendChild(overlayElement);
            }
        }
        if (msg.text) {
            console.log('opened here2')
            const tokens = JSON.parse(msg.text)
            const isOpenApp = document.getElementById('reactOpenApp')
            if (tokens[0] !== authToken) {
                authToken = tokens[0];
            }
            refreshToken = tokens[1];
            if (tokens[4] && !isOpenApp) {
                const root = ReactDOM.createRoot(rootElement);
                root.render(
                    <React.StrictMode>
                        <GoogleOAuthProvider
                            clientId={'473803567705-bofpr870r0nov80c3clim1vnevvla5k6.apps.googleusercontent.com'}
                            onScriptLoadError={() => console.log('err load script outh')}
                            onScriptLoadSuccess={() => console.log('success')}>
                            <App productName={productName} openOnSearch={openOnSearch} domain={''}/>
                        </GoogleOAuthProvider>
                    </React.StrictMode>
                );
                const scrollPosition = window.pageYOffset;

                // Disable scrolling on the body
                document.body.style.position = 'fixed';
                document.body.style.top = `-${scrollPosition}px`;
                document.body.style.width = '100%';
                document.body.appendChild(rootElement);
                document.body.appendChild(overlayElement);
            }
            sendResponse({success: true})
        }
    });
}

function createButton(showProductTitle?: number) {
    const actionButton = document.createElement('button')
    actionButton.id = 'actionButton'

    const openExtensionButton = document.getElementById('CrewAppButton')
    if (openExtensionButton) {
        console.log('opened here3')
        openExtensionButton.addEventListener('click', () => {
            const domain = new URL(savedURL)
            console.log('domain',domain)
            const root = ReactDOM.createRoot(rootElement);
            root.render(
                <React.StrictMode>
                    <GoogleOAuthProvider
                        clientId={'473803567705-bofpr870r0nov80c3clim1vnevvla5k6.apps.googleusercontent.com'}
                        onScriptLoadError={() => console.log('err load script outh')}
                        onScriptLoadSuccess={() => console.log('success')}>
                        <App productName={productName} openOnSearch={openOnSearch} domain={domain.hostname}/>
                    </GoogleOAuthProvider>
                </React.StrictMode>
            );
            const scrollPosition = window.pageYOffset;

            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollPosition}px`;
            document.body.style.width = '100%';
            document.body.appendChild(rootElement);
            document.body.appendChild(overlayElement);
        })
    }

    const badge = document.createElement('div')
    badge.className = 'actionButtonBadge'
    const doc = document.getElementById("actionButton")
    if (doc) {
        doc.appendChild(badge)
    }
    actionButton.innerHTML = '<svg width="35" height="35" viewBox="0 0 502.664 502.664" xmlns="http://www.w3.org/2000/svg" fill="none">\n' +
        '<path d="M153.821,358.226L0,274.337v-46.463l153.821-83.414v54.574L46.636,250.523l107.185,53.431 C153.821,303.954,153.821,358.226,153.821,358.226z" fill="white"/>\n' +
        '<path d="M180.094,387.584L282.103,115.08h32.227L212.084,387.584H180.094z" fill="white"/>\n' +
        '<path d="M348.843,358.226v-54.272l107.164-52.999l-107.164-52.59v-53.927l153.821,83.522v46.183 L348.843,358.226z" fill="white"/>\n' +
    '</svg>'

    window.addEventListener('beforeunload', () => {
        // sessionStorage.removeItem('domainData')

    })

    actionButton.addEventListener('click', () => {
        const showedProductName = showProductTitle ? productName : ''
        const domain = new URL(savedURL)
        console.log('domain',domain)
        console.log('opened here4')
        const root = ReactDOM.createRoot(rootElement);
        root.render(
            <React.StrictMode>
                <GoogleOAuthProvider
                    clientId={'473803567705-bofpr870r0nov80c3clim1vnevvla5k6.apps.googleusercontent.com'}
                    onScriptLoadError={() => console.log('err load script outh')}
                    onScriptLoadSuccess={() => console.log('success')}>
                    <App productName={showedProductName} openOnSearch={openOnSearch} domain={domain.hostname}/>
                </GoogleOAuthProvider>
            </React.StrictMode>
        );
        const scrollPosition = window.pageYOffset;

        // Disable scrolling on the body
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.width = '100%';
        document.body.appendChild(rootElement);
        document.body.appendChild(overlayElement);
    })

    document.body.appendChild(globalStyles);
    document.body.appendChild(actionButton)
}

// @ts-ignore
function handleDocumentChange(mutationsList, observer) {
    const currentPageUrl = window.location.href;
    if (currentPageUrl !== savedURL) {
        console.log('currentPageUrl',currentPageUrl)
        console.log('savedURL',savedURL)
        savedURL = currentPageUrl
    }
}

function setupMutationObserver() {
    const observer = new MutationObserver(handleDocumentChange);
    const config = {childList: true, subtree: true, attributes: true};

    observer.observe(document, config);
}


fetchToken();
document.addEventListener("DOMContentLoaded", () => {
    createButton();
    setupMutationObserver();
    window.addEventListener('beforeunload', function () {
        savedURL = '';
    });
    window.addEventListener('unload', function () {
        savedURL = '';
    });
    fetchToken();
})


