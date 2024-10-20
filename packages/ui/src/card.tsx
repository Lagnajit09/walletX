export function Card({
  title,
  children,
  classname,
  titleClass,
}: {
  title: string;
  children?: React.ReactNode;
  classname?: string;
  titleClass?: string;
}): JSX.Element {
  return (
    <div className={`border-2 border-gray-500 p-4 ${classname}`}>
      <h1 className={`text-xl border-b border-gray-400 pb-2 ${titleClass}`}>
        {title}
      </h1>
      <div>{children}</div>
    </div>
  );
}
