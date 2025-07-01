const ButtonCreate = ({ label = "Create", onClick }) => {
    return (

        <button type="submit" className="bg-cyan-700 hover:bg-cyan-600 transition-transform duration-300 p-2 rounded " {...(onClick ? { onClick } : {})}>
            {label}
        </button>


    );
};
export default ButtonCreate;

