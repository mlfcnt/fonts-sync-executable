import React, { useState, useEffect, useContext } from "react";
import MUIDataTable from "mui-datatables";
import "./localFontsTable.css";
import { generateData, columns, generateOptions } from "../localFontsData";
import { getFonts, uploadFonts } from "../../Api";
import { PageLayout } from "../UI/PageLayout";
import { UserContext } from "../context/UserProvider";

export const LocalFontsTable = () => {
  const [formattedFonts, setFormattedFonts] = useState([]);
  const [mappedFonts, setMappedFonts] = useState([]);
  const [hostname, setHostname] = useState("");
  const [hasAccess, setAccess] = useState(true);
  const [fontsToUpload, setFontsToUpload] = useState([]);
  const userId = useContext(UserContext)[2]._id;
  useEffect(() => {
    (async () => {
      const { success, errorMessage, fonts, hostname } = await getFonts();
      if (success === false) setAccess(false);
      setFormattedFonts(generateData(fonts));
      setMappedFonts(
        fonts.sort((a, b) => a.postscriptName.localeCompare(b.postscriptName))
      );
      setHostname(hostname);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!mappedFonts || !fontsToUpload) return;
      const fontsPaths = fontsToUpload.map((f) => mappedFonts[f].path);
      const fontsNames = fontsToUpload.map(
        (f) => `${mappedFonts[f].postscriptName}.ttf`
      );
      console.log({ fontsNames });
      const test = await uploadFonts(fontsPaths, fontsNames, userId);
    })();
  }, [fontsToUpload]);

  return (
    <PageLayout>
      {!formattedFonts.length && hasAccess && <p>Chargement des polices...</p>}
      {hasAccess === false && (
        <p>Vous devez vous connecter pour accéder à ces informations</p>
      )}
      {formattedFonts.length && (
        <MUIDataTable
          title={`Mes ${
            formattedFonts.length
          } polices d'écriture locales - ${hostname} (${
            formattedFonts[0].system || ""
          })`}
          data={formattedFonts}
          columns={columns}
          options={generateOptions(setFontsToUpload)}
        />
      )}
    </PageLayout>
  );
};
