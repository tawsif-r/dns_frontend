// Reusable Input Field Component
// label : str
// name: used for making the form
// value: the state field
// onChange: {()=> setInputMessage(e.target.value)}
const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="border rounded p-2 w-full bg-slate-950 text-gray-100"
    />
  </div>
);
export default InputField;