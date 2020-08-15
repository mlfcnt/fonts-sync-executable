import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [fonts, setFonts] = useState();
  useEffect(() => {
    fetch("/api/fonts")
      .then((res) => res.json())
      .then((json) => setFonts(json.fonts));
  }, []);

  if (!fonts) return <p>Chargement des polices...</p>;

  return (
    <div className="App">
      <h3>{fonts.length} polices trouvées</h3>
      {fonts.map((f) => (
        <p style={{ fontSize: "0.7rem" }}>{f}</p>
      ))}
    </div>
  );
}

export default App;
