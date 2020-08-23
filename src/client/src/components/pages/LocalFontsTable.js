import React, { useState, useEffect, useContext } from "react";
import MUIDataTable from "mui-datatables";
import "./fontsTable.css";
import { generateData, columns, generateOptions } from "../localFontsData";
import { getLocalFonts, uploadFonts } from "../../Api";
import { PageLayout } from "../UI/PageLayout";
import { UserContext } from "../context/UserProvider";
import { openToast } from "../UI/notifications";

export const LocalFontsTable = () => {
  const [formattedFonts, setFormattedFonts] = useState([]);
  const [mappedFonts, setMappedFonts] = useState([]);
  const [hostname, setHostname] = useState("");
  const [hasAccess, setAccess] = useState(true);
  const [fontsToUpload, setFontsToUpload] = useState([]);
  const userId = useContext(UserContext)[2]._id;
  useEffect(() => {
    (async () => {
      if (hasAccess === false) return;
      const { success, errorMessage, fonts, hostname } = await getLocalFonts();
      if (success === false)
        return openToast(
          "error",
          "Erreur lors de la récupération des polices locales",
          errorMessage
        );
      if (success === false) setAccess(false);
      setFormattedFonts(generateData(fonts));
      setMappedFonts(
        fonts.sort((a, b) => a.postscriptName.localeCompare(b.postscriptName))
      );
      setHostname(hostname);
    })();
  }, [hasAccess]);

  useEffect(() => {
    (async () => {
      if (!mappedFonts.length || !fontsToUpload.length) return;
      const fontsPaths = fontsToUpload.map((f) => mappedFonts[f].path);
      const fontsNames = fontsToUpload.map(
        (f) => mappedFonts[f].postscriptName + mappedFonts[f].extension
      );
      const { success, errorMessage } = await uploadFonts(
        fontsPaths,
        fontsNames,
        userId
      );
      if (success === false)
        return openToast("error", "Erreur lors du téléversement", errorMessage);
      if (success)
        return openToast(
          "success",
          "Police(s) téléversée(s)",
          "Vos polices ont été stockées sur le cloud"
        );
    })();
  }, [fontsToUpload]);

  return (
    <PageLayout>
      {!mappedFonts.length && hasAccess && <p>Chargement des polices...</p>}
      {hasAccess === false && (
        <p>Vous devez vous connecter pour accéder à ces informations</p>
      )}
      {mappedFonts.length && (
        <MUIDataTable
          title={`Mes ${
            formattedFonts.length
          } polices d'écriture locales - ${hostname} (${
            mappedFonts[0].system || ""
          })`}
          data={formattedFonts}
          columns={columns}
          options={generateOptions(setFontsToUpload)}
        />
      )}
    </PageLayout>
  );
};
