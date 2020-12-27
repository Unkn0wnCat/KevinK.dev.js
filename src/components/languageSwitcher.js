import React from "react"
import { Link, Trans, useI18next } from 'gatsby-plugin-react-i18next';

export default function LanguageSwitcher() {
    const { languages, originalPath } = useI18next();

    return (
        <div className="languageModalInner">
            <h2>Languages (<a href="#top" className="modalCloseLink">&times;</a>)</h2>
            <ul>
                {languages.map((lng) => (
                    <li key={lng}>
                        <Link to={originalPath} language={lng}>
                            <Trans>{lng}</Trans>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}