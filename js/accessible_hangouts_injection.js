/**
 * Injection script for content.
 *
 * @author Mohamed Mansour 2012 (http://mohamedmansour.com)
 */

/**
 * Discovers if it finds the text input so that we can start doing business!.
 */
function discoverChatInputElement() {
  var chatFrame = document.querySelector('iframe[title="Group chat window"]');
  if (chatFrame) {
    var chatDom = chatFrame.contentDocument;
    if (chatDom) {
      var chatInput = chatDom.querySelector('textarea');
      if (chatInput) {
        onChatInputDiscovered(chatDom);
        return; // Exit so we don't loop again.
      }
    }
  }

  setTimeout(discoverChatInputElement, 1000);
}

/**
 * Start monitoring the chat box. Using HTML5 mutation observers. We just care
 * about the child and subs. Since when a user chats again in his own freedom
 * (when they chat right after they chattted), it appends to that DOM not the
 * parent like it was done before.
 *
 * @param {HTMLElementDOM} chatDOM The main chat container DOM, needed since we
 *                                 are in a contentDocument iframe.
 */
function onChatInputDiscovered(chatDom) {
  speak('Chat Speech Engine Loaded');
  var historyContainerDOM = chatDom.getElementById('history');
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  var observer = new MutationObserver(onMutationObserver);
  observer.observe(historyContainerDOM, { childList: true, subtree: true });
}

/**
 * Listens on each DOM Mutation Event for the chat container.
 *
 * @param {Array<MutationRecord>} mutations An array of objects that contains the record
 *                                          queue for the mutations.
 */
function onMutationObserver(mutations) {
  mutations.forEach(function(mutationNode) {
    var mutationAddedNodes = mutationNode.addedNodes;
    // No idea why the mutation API returns empty added mutations. Doesn't make
    // sense, oh well ...
    if (mutationAddedNodes && mutationAddedNodes.length > 0) {
      // The first node is always the combined mutations. So we just need that
      // since we are using the subtree attribute for observers.
      var mainMutationNode = mutationNode.addedNodes[0];
      // This is not needed, but incase bugs happen in Chrome (it happened in
      // the past) we can deal with it gracefully.
      if (mainMutationNode.nodeType === Node.ELEMENT_NODE && mainMutationNode.nodeName === 'DIV') {
        onNewInsertedChatDOM(mainMutationNode);
      }
    }
  });
}

/**
 * Gets called whenever a new chat item has been inserted into the DOM.
 *
 * @param {HTMLElementDOM} insertedDOM The inserted DOM element.
 */
function onNewInsertedChatDOM(insertedDOM) {
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
 *
 * @param {String} text The phrase for the tts engine for the backend.
 */
function speak(text) {
  chrome.extension.sendRequest({method: 'Speak', data: text});
}

// We need to discover the textbox because it gets lazy loaded.
discoverChatInputElement();
