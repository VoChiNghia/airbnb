import React, { useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {};

const Language = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  const handleClick = (language: string) => {
    setLoading(true);

    setTimeout(() => {
      i18n.changeLanguage(language);

      setLoading(false);
    }, 1500);
  };

  return (
    <div className="language">
      <h1>{t("content.choselanguage")}</h1>

      {loading ? (
        <h2 style={{ color: "red" }}>Loading ...</h2>
      ) : (
        <ul>
          <li
            onClick={() => handleClick("vi")}
            className={i18n.language === "vi" ? "active" : ""}
          >
            <p>Tiếng việt</p>
            <span>Việt nam</span>
          </li>
          <li
            onClick={() => handleClick("en")}
            className={i18n.language === "en" ? "active" : ""}
          >
            <p>English</p>
            <span>Australia</span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Language;
