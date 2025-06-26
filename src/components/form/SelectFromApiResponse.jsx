const SelectFromApiResponse = ({ label, value, onChange, dropdownsLoading, options }) => {
    return (
        <div className="bg-gray-800 rounded-lg py-7 p-6">
            {label && <label className="block text-white mb-2">{label}</label>}
            <select
                label={label}
                value={value}
                onChange={onChange}
                disabled={dropdownsLoading}
                className='w-full bg-black rounded px-3 py-2 text-white focus:outline-none focus:border-blue-200 cursor-pointer'

            >
                <option value="">
                    {dropdownsLoading ? 'Loading players...' : 'select players'}
                </option>
                {options?.map((opt) => (
                    <option key={opt.id} value={opt.name}>{opt.name}</option>
                ))}

            </select>
        </div>
    )

}
export default SelectFromApiResponse;