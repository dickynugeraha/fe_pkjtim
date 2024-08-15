import { Spinner } from "react-bootstrap";

export default function Loading() {
  return (
    <div style={styles.page}>
      <Spinner animation="border text-light" size="lg" />
      <p className="text-light fs-3">Loading...</p>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    overflow: "hidden",
    position: "fixed",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.4)",
    "--bg-opacity": "0.75",
    zIndex: 9999,
  },
};
