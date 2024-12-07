export default function Button({
  children,
  className = "bg-blue-500 hover:bg-blue-700 text-white",
  spacing = "py-2 px-4",
}: {
  className?: string;
  spacing?: string;
  children?: React.ReactNode;
}) {
  return (
    <button className={`${className} font-bold ${spacing} rounded-lg`}>
      {children}
    </button>
  );
}
