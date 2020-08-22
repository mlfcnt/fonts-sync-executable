import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import "./localFontsTable.css";
import { generateData, columns, options } from "../localFontsData";
import { getFonts } from "../../Api";
import { PageLayout } from "../UI/PageLayout";

export const LocalFontsTable = () => {
  const [fonts, setFonts] = useState();
  const [hostname, setHostname] = useState();
  const [hasAccess, setAccess] = useState(true);

  useEffect(() => {
    (async () => {
      const { success, errorMessage, fonts, hostname } = await getFonts();
      if (success === false) setAccess(false);
      setFonts(fonts);
      setHostname(hostname);
    })();
  }, []);
  return (
    <PageLayout>
      {!fonts && hasAccess && <p>Chargement des polices...</p>}
      {hasAccess === false && (
        <p>Vous devez vous connecter pour accéder à ces informations</p>
      )}
      {fonts && (
        <MUIDataTable
          title={`Mes ${
            fonts.length
          } polices d'écriture locales - ${hostname} (${
            fonts[0].system || ""
          })`}
          data={generateData(fonts)}
          columns={columns}
          options={options}
        />
      )}
    </PageLayout>
  );
};
