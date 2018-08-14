
const { classes: Cc, interfaces: Ci, utils: Cu } = Components;

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
          async getURIsForTag(tag) {
            const URIs = taggingSvc.getURIsForTag(tag);
            // console.log(typeof URIs, URIs.toString(), XPCNativeWrapper.unwrap(URIs));
            return XPCNativeWrapper.unwrap(URIs).map(uri => uri.spec);
          },
          async getTagsForURI(URI) {
            const tags = taggingSvc.getTagsForURI(makeURI(URI));
            // console.log(typeof tags, tags.toString(), XPCNativeWrapper.unwrap(tags));
            return tags;
          },
        },
      },
    };
  }
};

