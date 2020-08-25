import React, { useState, useEffect, useContext } from "react";
import { PageLayout } from "../UI/PageLayout";
import { getOnlineFonts, downloadFonts } from "../../Api";
import { UserContext } from "../context/UserProvider";
import MUIDataTable from "mui-datatables";
import "./fontsTable.css";
import { eTokenStatus } from "../../constants/tokenStatus";
import { generateData, columns, generateOptions } from "../onlineFontsData";

export const OnlineFontsTable = () => {
  const [onlineFonts, setOnlineFonts] = useState();
  const [mappedFonts, setMappedFonts] = useState();
  const [fontsToDownload, setFontsToDownload] = useState([]);
  const [loading, tokenStatus, user] = useContext(UserContext);
  const hasAccess = tokenStatus === eTokenStatus.OK;

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { success, keys } = await getOnlineFonts(user._id);
      if (success) {
        const formattedFonts = generateData(keys);
        setOnlineFonts(formattedFonts);
        const namesAndExtension = keys.map((f) => f.split("/")[1]);
        const formatted = namesAndExtension.map((f) => {
          return {
            name: f.split(".")[0],
            extension: f.split(".")[1],
          };
        });
        setMappedFonts(formatted.sort());
      }
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      if (!fontsToDownload.length) return;
      const fontsNamesAndExtensions = fontsToDownload.map(
        (f) => mappedFonts[f].name + "." + mappedFonts[f].extension
      );
      const { success, url } = await downloadFonts(
        user._id,
        fontsNamesAndExtensions
      );
      console.log({ url });
      window.open(url);
    })();
  }, [fontsToDownload]);

  return (
    <PageLayout>
      {hasAccess === false && (
        <p>Vous devez vous connecter pour accéder à ces informations</p>
      )}
      {!onlineFonts && hasAccess && <p>Chargement des polices...</p>}
      {hasAccess && onlineFonts && (
        <MUIDataTable
          title={`Mes ${onlineFonts.length} polices d'écriture synchronisées`}
          data={onlineFonts}
          columns={columns}
          options={generateOptions(setFontsToDownload)}
        />
      )}
    </PageLayout>
  );
};
