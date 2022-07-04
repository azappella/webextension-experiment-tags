
# WebExtension Experiment For Firefox Tags

Since the WebExtension API does not currently support bookmarks tags (see [bugzilla thread](https://bugzilla.mozilla.org/show_bug.cgi?id=1225916#c12), I created this [WebExtension Experiment API](https://firefox-source-docs.mozilla.org/toolkit/components/extensions/webextensions/index.html) to expose some of the internal Firefox API for tags, thus enabling users/developers to access & retrieve bookmark tags in their own extensions.

There is an example extension (in the /src folder) which shows how to use the experimental API in a background.js script.

## How to install this API and the associated WebExtension

1. Run a non-release build (Nightly or unbranded Beta/Release), the latest tested working version is 103.0b2
   (or newer) build.
2. Navigate to `about:config` 
   - set the pref `extensions.legacy.enabled` to
   `true`
   - set the pref `extensions.experiments.enabled` to `true`
3.  Navigate to `about:debugging`, choose
   "Load Temporary Add-on" and select `manifest.json`
   in this project.  You should see a new entry in the list of
   extensions titled "Firefox Bookmark Webhooks".

You should see a new toolbar icon that resembles a tag.

## API

`getURIsForTags(tags)` - Finding all URLs with a given tag

```
const uris = browser.experiments.tags.getURIsForTags(["tag 1","tag 2"]);

// Returns an array of URIs
```

`getTagsForURI(URI)` - Getting all tags associated with a URL

```
const tags = browser.experiments.tags.getTagsForURI("http://example.com/");

// Returns an array of tags stored for that URI
```

## References

- [Firefox issue tracker #1225916](https://bugzilla.mozilla.org/show_bug.cgi?id=1225916#c12)
- [StackOverflow Question About Getting Bookmark Tags](https://stackoverflow.com/questions/42294207/get-bookmark-tags)
- [WebExtensions API currently not supporting bookmarks tags](https://discourse.mozilla.org/t/webextensions-api-currently-not-supporting-bookmarks-tags/22677)
- [WebExtensions API Development](https://firefox-source-docs.mozilla.org/toolkit/components/extensions/webextensions/index.html)
- [PlacesUtils.bookmarks.fetch implementation](https://searchfox.org/mozilla-central/source/toolkit/components/places/Bookmarks.jsm#1507)
- [Firefox Places Architecture Overview](https://firefox-source-docs.mozilla.org/browser/places/architecture-overview.html)
- [PlacesUtils.jsm module source code](https://searchfox.org/mozilla-central/source/toolkit/components/places/PlacesUtils.jsm)
- ~~[Using The Places Tagging Service](https://developer.mozilla.org/en-US/docs/Mozilla/Tech/Places/Using_the_Places_tagging_service)~~
- ~~[nsITaggingService](https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsITaggingService)~~
- ~~[XPConnectWrappers](https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Language_bindings/XPConnect/XPConnect_wrappers)~~
- ~~[XPConnectWrappers More Information](http://mdn.beonex.com/en/XPConnect_wrappers.html)~~

## Disclaimer

This software is supplied "AS IS" without any warranties and support.

## Author

Andrew Zappella
