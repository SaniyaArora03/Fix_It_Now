export default function Layout({ title, children, onLogout }) {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>{title}</h2>
        {onLogout && <button onClick={onLogout}>Logout</button>}
      </header>

      <main style={styles.main}>{children}</main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f5f7fa"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px 24px",
    background: "#1f2937",
    color: "white"
  },
  main: {
    padding: 24,
    maxWidth: 900,
    margin: "auto"
  }
};
