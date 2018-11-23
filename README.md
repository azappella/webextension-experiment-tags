
# WebExtension Experiment For Firefox Tags

Since the [WebExtensions API does not currently support bookmarks tags](https://bugzilla.mozilla.org/show_bug.cgi?id=1225916#c12), I created this [WebExtension Experiment API](https://firefox-source-docs.mozilla.org/toolkit/components/extensions/webextensions/index.html) to expose some of the internal Firefox API for tags, thus enabling users/developers to access/read/retrieve bookmark tags in their own extensions.

NOTE: It is very likely that this API will not work in the near future, as there are plans to [merge the tagging API with the bookmarking API](https://bugzilla.mozilla.org/show_bug.cgi?id=1448885).

## How to install this API and WebExtension

1. Run a non-release build (Nightly or unbranded Beta/Release) version 59
   (or newer) build.
2. Navigate to `about:config` and set the pref `extensions.legacy.enabled` to
   `true`.
3.  Navigate to `about:debugging`, choose
   "Load Temporary Add-on" and select `manifest.json`
   in this project.  You should see a new entry in the list of
   extensions titled "Firefox Bookmark Webhooks".

You should see a new toolbar icon that resembles a tag.

## API

`getURIsForTag(tag)` - Finding all URLs with a given tag

```
const uris = browser.experiments.tags.getURIsForTag("tag 1");

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
- [Using The Places Tagging Service](https://developer.mozilla.org/en-US/docs/Mozilla/Tech/Places/Using_the_Places_tagging_service)
- [nsITaggingService](https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsITaggingService)
- [XPConnectWrappers](https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Language_bindings/XPConnect/XPConnect_wrappers)
- [XPConnectWrappers More Information](http://mdn.beonex.com/en/XPConnect_wrappers.html)

## Disclaimer

This software is supplied "AS IS" without any warranties and support.

## Author

Andrew Zappella