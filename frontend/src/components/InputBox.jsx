export const InputBox = ({ label, placeholder }) => {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>

      <input className="w-full border rounded-sm px-2 py-1 border-slate-300" placeholder={placeholder}></input>
    </div>
  );
};
