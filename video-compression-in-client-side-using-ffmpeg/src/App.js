import React, { useState, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { toBlobURL } from "@ffmpeg/util";

function App() {
  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef(null);
  const messageRef = useRef(null);
  const fileInputRef = useRef(null);
  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.4/dist/umd";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      messageRef.current.innerHTML = message;
      console.log(message);
    });
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
    setLoaded(true);
  };

  const handleFileChange = async () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      const startTime = performance.now();
      const ffmpeg = ffmpegRef.current;
      await ffmpeg.writeFile("input.webm", await fetchFile(file));
      await ffmpeg.exec([
        "-i",
        "input.webm",
        "-vcodec",
        "libx264",
        "-crf",
        "28",
        "output.mp4",
      ]);
      const data = await ffmpeg.readFile("output.mp4");
      videoRef.current.src = URL.createObjectURL(
        new Blob([data.buffer], { type: "video/mp4" })
      );
      const endTime = performance.now();
      const totalTime = (endTime - startTime) / 1000;
      console.log(`Total time taken: ${totalTime} seconds`);
    }
  };

  return loaded ? (
    <>
      <input
        type="file"
        accept="video/*"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <br />
      <video ref={videoRef} controls></video>
      <br />
      <p ref={messageRef}></p>
    </>
  ) : (
    <button onClick={load}>Load ffmpeg-core</button>
  );
}

export default App;
