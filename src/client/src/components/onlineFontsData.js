import React from "react";
import { OnlineFontsToolbar } from "./OnlineFontsToolbar";

export const generateData = (fonts) => {
  const namesAndExtension = fonts.map((f) => f.split("/")[1]);
  const formatted = namesAndExtension.map((f) => {
    return {
      name: f.split(".")[0],
      extension: f.split(".")[1],
    };
  });
  return formatted.sort().map(({ name, extension }) => [name, extension]);
};

export const columns = [
  { name: "Nom", options: { filter: false, sort: true } },
  { name: "Extension", options: { filter: true, sort: true } },
];

export const generateOptions = (setFontsToDownload) => {
  return {
    filterType: "checkbox",
    filter: true,
    print: false,
    download: false,
    textLabels: {
      body: {
        noMatch: "Pas de polices trouvées :(",
        toolTip: "Trier",
        columnHeaderTooltip: (column) => {
          if (column.name === "Extension")
            return `Grouper par ${column.label.toLowerCase()}`;
          return `Trier par ${column.label.toLowerCase()}`;
        },
      },
      pagination: {
        next: "Page suivante",
        previous: "Page précédente",
        rowsPerPage: "Polices par page:",
        displayRows: "de",
      },
      toolbar: {
        search: "Recherche",
        viewColumns: "Voir les colonnes",
        filterTable: "Filter le tableau",
      },
      filter: {
        all: "Toutes",
        title: "FILTRES",
        reset: "RESET",
      },
      viewColumns: {
        title: "Voir les colonnes",
        titleAria: "Afficher/Cacher les colonnes du tableau",
      },
      selectedRows: {
        text: "police(s) séléctionnée(s)",
      },
    },
    customToolbarSelect: (selectedRows) => (
      <OnlineFontsToolbar
        selectedRows={selectedRows}
        setFontsToDownload={setFontsToDownload}
      />
    ),
  };
};
