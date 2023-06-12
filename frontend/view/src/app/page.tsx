import Image from "next/image";

export default function Home() {
  const snappedPoints = [
    {
      location: {
        latitude: -12.047029662406514,
        longitude: -77.002972105141765,
      },
      originalIndex: 0,
      placeId: "ChIJwVpAQwTGBZERWR83ZkWHzTc",
    },
    {
      location: {
        latitude: -12.047029662406514,
        longitude: -77.002972105141765,
      },
      originalIndex: 1,
      placeId: "ChIJwVpAQwTGBZERWR83ZkWHzTc",
    },
    {
      location: {
        latitude: -12.047029662406514,
        longitude: -77.002972105141765,
      },
      originalIndex: 2,
      placeId: "ChIJwVpAQwTGBZERWR83ZkWHzTc",
    },
  ];

  return (
    <div>
      <h1>Mapa con líneas</h1>
      <div style={{ height: "400px", width: "100%", border: "1px solid #ccc" }}>
        <svg style={{ height: "100%", width: "100%" }}>
          {snappedPoints.map((point, index) => (
            <line
              key={index}
              x1={point.location.longitude}
              y1={point.location.latitude}
              x2={
                index < snappedPoints.length - 1
                  ? snappedPoints[index + 1].location.longitude
                  : point.location.longitude
              }
              y2={
                index < snappedPoints.length - 1
                  ? snappedPoints[index + 1].location.latitude
                  : point.location.latitude
              }
              style={{ stroke: "#FF0000", strokeWidth: 2 }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
