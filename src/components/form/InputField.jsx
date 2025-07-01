// Reusable Input Field Component
// label : str
// name: used for making the form
// value: the state field
// onChange: {()=> setInputMessage(e.target.value)}
// <InputField label="overs" value={teamOvers} onChange={(e)=>setTeamOvers(e.target.value)} name="teamOvers" />
const InputField = ({ label, name, value, onChange, type = "text", placeholder=""}) => (
  <div>
    <label className="block p-2 text-sm font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="rounded p-2 w-full bg-slate-950 text-gray-100"
    />
  </div>
);
export default InputField;