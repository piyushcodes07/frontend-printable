export default function ScannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-4 bg-green-600 text-white text-center font-bold">
        Scanner Tools
      </header>

      <main className="p-6">{children}</main>

      <footer className="p-4 text-center text-xs text-gray-500">
        Printable Scanner © {new Date().getFullYear()}
      </footer>
    </div>
  );
}


