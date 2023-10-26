import Globe from "react-globe.gl";
const markerSvg = `<svg viewBox="-4 0 36 36">
    <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
    <circle fill="black" cx="14" cy="14" r="7"></circle>
  </svg>`;
const data = [
  {
    lat: 33.895847,
    lng: -118.22007,
    size: 50,
    color: "red",
  },
];
console.log(data);
function App() {
  return (
    <Globe
      //unpkg.com/three-globe/example/img/earth-blue-marble.jpg
      //unpkg.com/three-globe/example/img/earth-day.jpg
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      htmlElementsData={data}
      htmlElement={(d) => {
        const el = document.createElement("div");
        el.innerHTML = markerSvg;
        el.style.color = d.color;
        el.style.width = `${d.size}px`;
        el.style["pointer-events"] = "auto";
        el.style.cursor = "pointer";
        el.onclick = () => console.info(d);
        return el;
      }}
    />
  );
}

export default App;
