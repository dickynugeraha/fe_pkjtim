export default function Gap({ width = 0, height = 0 }) {
  return (
    <div
      style={{
        height: `${height}px`,
        width: `${width}px`,
      }}
    ></div>
  );
}
