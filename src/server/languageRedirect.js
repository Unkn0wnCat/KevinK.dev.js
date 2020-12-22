const config = require("../../config"), locale = require("locale");

let supported = new locale.Locales(conifg.languages);
let defaultLang = "en";

export default ({ Router }) => {
    Router.on("*", checkLang);
};

async function checkLang({ request }) {
    const { url } = request

    let requestURL = new URL(url);

    config.languages.forEach((language) => {
        if(requestURL.pathname.startsWith("/"+language+"/")) {
            return;
        }
    });

    let headers = request.headers;

    let selectedLanguage = defaultLang;

    if(headers.has("Accept-Language")) {
        let languageHeader = headers.get("Accept-Language");

        let requestLocales = new locale.Locales(languageHeader);

        selectedLanguage = requestLocales.best(supported);
    }
    
    requestURL.pathname = "/"+selectedLanguage+requestURL.pathname;
        
    return Response.redirect(requestURL.toString(), 302);
  }
  