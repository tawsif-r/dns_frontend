// Select Field Component
// options: ["job","john","cole"] array of options
const SelectField = ({ placeholder="",label,name, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium">{label}</label>
    <select
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className="border rounded p-2 w-full bg-slate-950 text-gray-100"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt.charAt(0).toUpperCase() + opt.slice(1)} && {opt.name}
        </option>
      ))}
    </select>
  </div>
);
export default SelectField;