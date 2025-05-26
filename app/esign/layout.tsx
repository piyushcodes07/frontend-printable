import SignProvider from "./useSign";
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignProvider>{children}</SignProvider>
    </>
  );
}

export default Layout;
