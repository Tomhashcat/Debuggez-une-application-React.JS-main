import PropTypes from "prop-types";

import "./style.scss";

export const FIELD_TYPES = {
  INPUT_TEXT: 1,
  TEXTAREA: 2,
};
// isValid 
 export const isValidEmail = (str) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
export const isValid = (str) => /^[A-Za-z]+$/.test(str);

const Field = ({ type = FIELD_TYPES.INPUT_TEXT && FIELD_TYPES.TEXTAREA, label, name, placeholder, value, onChange }) => {
  
  const handleChange = (e) => {
    const newValue = e.target.value;

    // Valider la nouvelle valeur pour ne permettre que des lettres
    if (
      (type === FIELD_TYPES.INPUT_TEXT && isValid(newValue)) ||
      (type === FIELD_TYPES.TEXTAREA && name==="field-name" && onChange()) || // Pas de validation spécifique pour le TEXTAREA
      (type === FIELD_TYPES.INPUT_TEXT && name === "Email" &&  (newValue))
    ) {
      onChange(newValue);
    }
  };
  let component;
  switch (type) {
    case FIELD_TYPES.INPUT_TEXT:
      component = (
        <input
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        data-testid="field-testid"
        autoComplete={name === "Email" ? "email" : "name"}  
      
        />
      );
      break;
    case FIELD_TYPES.TEXTAREA:
      component =
       <textarea name={name} 
      onChange={handleChange} // Ajoute cette ligne pour les champs TEXTAREA
      placeholder={placeholder} data-testid="field-testid" 
      />;
      
      break;
    default:
      component = (
        <input
          type="text"
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          data-testid="field-testid"
        
         
        />
      );
  }
  return (
    <div className="inputField">
      <span>{label}</span>
      {component}
    </div>
  );
};

Field.propTypes = {
  type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string, // Ajout de la prop type value
  onChange: PropTypes.func,
 
};
 Field.defaultProps = {
   label: "",
   placeholder: "",
   type: FIELD_TYPES.INPUT_TEXT,
   name: "field-name",
   value: "",
   onChange:() => {},
 }

export default Field;
