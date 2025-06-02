export default function Btn({ styling, children, fun }) {
  return (
    <button className={styling} onClick={fun}>
      {children}
    </button>
  );
}
