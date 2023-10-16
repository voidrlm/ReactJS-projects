import React, { useState } from "react";
import EXIF from "exif-js";

function App() {
  const [exifData, setExifData] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      EXIF.getData(file, function () {
        const data = EXIF.getAllTags(this);
        setExifData(data);
      });
    }
  };

  return (
    <div className="App">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {exifData && (
        <div>
          <h2>EXIF Data:</h2>
          <pre>{JSON.stringify(exifData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
