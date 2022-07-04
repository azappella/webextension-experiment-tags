
const { classes: Cc, interfaces: Ci, utils: Cu } = Components;

Cu.import("resource://gre/modules/PlacesUtils.jsm");

const TAGGING_SERVICE_ID = "@mozilla.org/browser/tagging-service;1";
const taggingSvc = Cc[TAGGING_SERVICE_ID].getService(Ci.nsITaggingService);

const IO_SERVICE_ID = '@mozilla.org/network/io-service;1';
const ioSvc = Cc[IO_SERVICE_ID].getService(Ci.nsIIOService);

function makeURI(aURL, aOriginCharset, aBaseURI) {
  return ioSvc.newURI(aURL, aOriginCharset, aBaseURI);
}

this.tags = class extends ExtensionAPI {
  getAPI(context) {
    return {
      experiments: {
        tags: {

          async getURIsForTags(tags) {
            const urls = [];
            try {
              // Implementation of PlacesUtils.bookmark.fetch can be found below:
              // - https://searchfox.org/mozilla-central/source/toolkit/components/places/Bookmarks.jsm#1507
              await PlacesUtils.bookmarks.fetch({ tags: tags }, b => urls.push(b.url));
            } catch (error) {
              return JSON.stringify(error.message);
            }

            return JSON.stringify(urls);
          },
          async getTagsForURI(URI) {
            const tags = taggingSvc.getTagsForURI(makeURI(URI));
            console.log(typeof tags, tags.toString(), XPCNativeWrapper.unwrap(tags));
            return tags;
          },
        },
      },
    };
  }
};

