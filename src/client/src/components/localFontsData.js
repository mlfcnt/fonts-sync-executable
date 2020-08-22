import React, { useState } from "react";
import moment from "moment";
import { booleanFormatter } from "./helpers/booleanFormatter";
import { CustomToolbarSelect } from "./CustomToolbarSelect";
moment.locale("fr");

export const generateData = (fonts) => {
  return fonts
    .sort((a, b) => a.postscriptName.localeCompare(b.postscriptName))
    .map(
      ({
        path,
        postscriptName: name,
        family,
        style,
        weight,
        width,
        italic,
        monospace,
        birthtime,
        extension,
      }) => [
        name,
        extension,
        family,
        style,
        weight,
        width,
        monospace,
        italic,
        // path,
        moment(birthtime).format("DD/MM/YYYY - HH:mm"),
      ]
    );
};

export const columns = [
  { name: "Nom", options: { filter: false, sort: true } },
  { name: "Extension", options: { filter: true, sort: true } },
  { name: "Famille", options: { filter: true, sort: true } },
  { name: "Style", options: { filter: true, sort: true } },
  { name: "Weight", options: { filter: true, sort: true } },
  { name: "Width", options: { filter: true, sort: true } },
  {
    name: "Monospace",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => booleanFormatter(value),
    },
  },
  {
    name: "Italic",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => booleanFormatter(value),
    },
  },
  // { name: "Chemin", options: { filter: false, sort: true } },
  { name: "Ajoutée le", options: { filter: false, sort: true } },
];

export const generateOptions = (setFontsToUpload) => {
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
      <CustomToolbarSelect
        selectedRows={selectedRows}
        setFontsToUpload={setFontsToUpload}
      />
    ),
  };
};
