import "@/styles/globals.css";

export const metadata = {
  title: "Promptopia",
  description: "Descubre & Comparte AI Prompts",
}
const RootLayout = ({ children }) => {
  return (
    <html lang="es">
      <body>
        <div className="main">
          <div className="gradient"></div>
        </div>

        <main className="app">
          {children}
        </main>
      </body>
    </html>
  );
}

export default RootLayout;