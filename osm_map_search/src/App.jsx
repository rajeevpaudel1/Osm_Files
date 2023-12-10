import Map from "./Map";

function App() {
  const selectedLocation = [27.69266, 84.4384];
  const center = [27.658, 84.478];
  return (
    <>
      <Map selectedLocation={selectedLocation} getCenter={center}></Map>
    </>
  );
}

export default App;
