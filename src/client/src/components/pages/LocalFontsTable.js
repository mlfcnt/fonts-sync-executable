import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import "./localFontsTable.css";
import { generateData, columns, options } from "../localFontsData";
import { getFonts } from "../../Api";
import { PageLayout } from "../UI/PageLayout";

export const LocalFontsTable = () => {
  const [fonts, setFonts] = useState();
  const [hostname, setHostname] = useState();
  console.log({ fonts });

  useEffect(() => {
    (async () => {
      const { fonts, hostname } = await getFonts();
      setFonts(fonts);
      setHostname(hostname);
    })();
  }, []);

  if (!fonts) return <p>Chargement des polices...</p>;
  return (
    <PageLayout>
      <MUIDataTable
        title={`Mes ${fonts.length} polices d'écriture locales - ${hostname} (${
          fonts[0].system || ""
        })`}
        data={generateData(fonts)}
        columns={columns}
        options={options}
      />
    </PageLayout>
  );
};
