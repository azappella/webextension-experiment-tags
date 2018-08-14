browser.browserAction.onClicked.addListener(() => {
  console.log('Testing tags APIs...', browser.experiments);
  // browser.experiments.tags.getTagsForURI("https://www.wikipedia.org/").then(result => console.log('getTagsForURI', result))
  // browser.experiments.tags.getURIsForTag("knowledge").then(result => console.log('getURIsForTag', result));
});

function handleBookmarkEvent(id, bookmark) {
    console.log(id, bookmark);
    setTimeout(() => getTags(id), 10000);
}

function getTags(bookmarkId) {
    browser.bookmarks.get(bookmarkId).then(bookmarks => {
        const promises = bookmarks.map(b => {
            console.log(b.url);
            return browser.experiments.tags.getTagsForURI(b.url);
        });
        Promise.all(promises).then(result => console.log(result));
    });
}

browser.bookmarks.onChanged.addListener(handleBookmarkEvent);
browser.bookmarks.onCreated.addListener(handleBookmarkEvent);
browser.bookmarks.onMoved.addListener(handleBookmarkEvent);
browser.bookmarks.onRemoved.addListener(handleBookmarkEvent);
