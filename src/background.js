browser.browserAction.onClicked.addListener(() => {
  console.log('browserAction.onClicked', browser.experiments);

  browser.experiments.tags.getTagsForURI("https://www.wikipedia.org/")
    .then(result => console.log('getTagsForURI', result))
    .catch(e => {
        console.error('getURIsForTagError', e.message, e);
        return e;
    });

  browser.experiments.tags.getURIsForTags(["firefox","source code"])
    .then(result => {
        console.log('getURIsForTags', result);
        return result;
    })
    .catch(e => {
        console.error('getURIsForTagsError', e.message, e);
        return e;
    })
});


function handleBookmarkEvent(id, bookmark) {
    console.log(id, bookmark);
    setTimeout(() => getTagsById(id), 10000);
}

function getTagsById(bookmarkId) {
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
