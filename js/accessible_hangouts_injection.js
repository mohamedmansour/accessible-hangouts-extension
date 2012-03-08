/**
 * Injection script for content.
 *
 * @author Mohamed Mansour 2012 (http://mohamedmansour.com)
 */
 
/**
 * Discovers if it finds the text input so that we can start doing business!.
 */
function discoverChatInputElement() {
  var chatInput = document.querySelector('textarea');
  if (chatInput) {
    onChatInputDiscovered(chatInput);
  }
  else {
    setTimeout(discoverChatInputElement, 1000);
  }
}

/**
 * Start monitoring the chat box.
 */
function onChatInputDiscovered(chatInput) {
  speak('Chat Speech Engine Loaded');
  
  // TODO: Use MutationObservers when stable gets to v18.
  var historyContainerDOM = document.getElementById('history');
  historyContainerDOM.addEventListener('DOMNodeInserted',
      onContentModified, false);
}

/**
 * Chat Monitoring Callback. Will return a lot of garbage. 
 */
function onContentModified(e) {
  // We only care about nodes since anything other is irrelevant.
  var insertedDOM = e.target;
  if (insertedDOM.nodeType !== Node.ELEMENT_NODE || insertedDOM.nodeName !== 'DIV') {
    return;
  }

  // Verify it is the chatbox we are looking for.
  var chatType = insertedDOM.getAttribute('role');
  if (chatType === 'group' || (chatType !== 'group' && chatType !== 'listitem')) {
    insertedDOM = insertedDOM.querySelector('div[role="listitem"]');
  }
  
  // Not something we need, dispose. DOM changes produce a lot of garbage.
  if (!insertedDOM) {
    return;
  }
  
  // Check if it is a system event.
  var fromType = insertedDOM.getAttribute('from');
  var message = insertedDOM.innerText;
  if (fromType === 'g') {
    speak(message.substring(0, message.lastIndexOf(' group chat.')));
    return;
  }

  // Parse the chat message. Never speak what I am saying.
  var chatDOM = insertedDOM.parentNode.childNodes;
  var user = chatDOM[0].childNodes[0].innerText;
  if (user !== 'me') {
    if (chatDOM.length == 2) {
      message = user + ' says ' + message;
    }
    speak(message);
  }
}

/**
 * Speech Engine, speak to me!
 */
function speak(text) {
  chrome.extension.sendRequest({method: 'Speak', data: text});
}

// We need to discover the textbox because it gets lazy loaded.
discoverChatInputElement();
