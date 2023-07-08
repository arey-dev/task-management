// eslint-disable-next-line react/prop-types
export function BoardLayout({ children }) {
  return (
    <div className="flex w-full max-w-[1440px] mx-auto">
      {children}
    </div>
  );
}
