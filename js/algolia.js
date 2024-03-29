(() => {
  // ns-params:@params
  var baseURL = "/";
  var params = { defaultcover: "https://hosting-images-samiratravel-palembang.netlify.app/logo-samira-travel-palembang.jpg", email: "palembangsamiratravel@gmail.com", images: ["https://hosting-images-samiratravel-palembang.netlify.app/logo-samira-travel-palembang.jpg"], showcopyright: true, showmore: true, showrss: true, socialmedia: [{ name: "Instagram", url: "https://www.instagram.com/samiratravel.palembang/" }, { name: "Whatsapp", url: "https://api.whatsapp.com/send?phone=6281377886689&text=Assalamu%27alaikum.%20Perkenalkan%20saya%20..." }, { name: "Facebook", url: "https://www.facebook.com/samira.travelofficial" }, { name: "Youtube", url: "https://www.youtube.com/channel/UChHnjnMy5dleNbhYOnnV6Yg" }], telephone: "081377886689" };

  // <stdin>
  var { appid, appkey, searchindex: indexName, enabled } = params.algolia;
  var searchClient = algoliasearch(appid, appkey);
  var { autocomplete, getAlgoliaResults } = window["@algolia/autocomplete-js"];
  function initAlgolia() {
    autocomplete({
      container: "#autocomplete",
      getSources({ query }) {
        return [
          {
            sourceId: "products",
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName,
                    query,
                    params: {
                      attributesToSnippet: ["name:10", "description:35"]
                    }
                  }
                ]
              });
            },
            templates: {
              item({ item, components, html }) {
                return html`<a class="aa-ItemWrapper" href="${baseURL}${item.uri}">
                <div class="aa-ItemContent">
                  <div class="aa-ItemContentBody">
                    <div class="aa-ItemContentTitle">
                      ${components.Highlight({
                  hit: item,
                  attribute: "name"
                })}
                    </div>
                    <div class="aa-ItemContentDescription">
                      ${components.Snippet({
                  hit: item,
                  attribute: "description"
                })}
                    </div>
                  </div>
                  <div class="aa-ItemActions">
                    <button
                      class="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly"
                      type="button"
                      title="Select"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="currentColor"
                      >
                        <path
                          d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </a>`;
              }
            }
          }
        ];
      }
    });
    document.querySelector("#autocomplete input").focus();
  }
  if (enabled) {
    initAlgolia();
  }
})();
