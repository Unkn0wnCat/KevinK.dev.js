const config = require("../../config");
const locale = require("locale");

let supported = new locale.Locales(config.languages);
let defaultLang = "en";

export default ({ Router }) => {
    Router.on("*", checkLang);
};

async function checkLang({ request }) {
    const { url } = request

    let requestURL = new URL(url);

    for (let i = 0; i < config.languages.length; i++) {
        const language = config.languages[i];

        if(requestURL.pathname.startsWith("/"+language)) {
            return;
        }
    }

    let headers = request.headers;

    let selectedLanguage = defaultLang;

    if(headers.has("Accept-Language")) {
        let languageHeader = headers.get("Accept-Language");

        let requestLocales = new locale.Locales(languageHeader);

        selectedLanguage = requestLocales.best(supported);
    }
    
    requestURL.pathname = "/"+selectedLanguage+requestURL.pathname;
        
    ///return Response.redirect(requestURL.toString(), 302);
    
    return new Response(null, {
        status: 302,
        headers: {
            Location: requestURL.toString(),
        },
    });
  }
  