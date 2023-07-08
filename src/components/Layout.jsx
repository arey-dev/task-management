// eslint-disable-next-line react/prop-types
export function Layout({ children }) {
  return (
    <div className="grid grid-cols-2 grid-rows-2 max-w-[1440px] min-h-screen">
      {children}
    </div>
  );
}
