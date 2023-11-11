import { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 1000); })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  // Set Name and Surname 
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [Email, setEmail] = useState("");
   // State initial pour le champ Select
  
  const [selected, setSelected] = useState("");



  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      // We try to call mockContactApi
      try {
        await mockContactApi();
        // Réinitialiser les champs et le statut d'envoi
        setNom("");
        setPrenom("");
        setEmail("");

        setSending(false);
       setSelected("");


        // Call on success
        onSuccess(); 
       
       
      } catch (err) {
        setSending(false);
        onError();
      }
    },
    [onSuccess, onError]
  );
 
  useEffect(() => {
    if (sending === false) {
      // Reset the form fields when sending is done
      setNom("");
      setPrenom("");
      setEmail("");
      setSelected("");
    }
  }, [sending]);
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field
            placeholder=""
            label="Nom"
            // get the new value
            value={nom}
            onChange={(newValue) => setNom(newValue)} />
          <Field
            placeholder=""
            label="Prénom"
            // get the new value
            value={prenom}
            onChange={(newValue) => setPrenom(newValue)} />

          <Select
            selection={["Personel", "Entreprise"]}
            onChange={(newValue) => setSelected(newValue)}
            value={selected}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field
            placeholder=""
            name="Email"
            label="Email"
            value={Email}
            onChange={(newValue) => setEmail(newValue)}
            required
          />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>

        <div className="col">

          <Field 
          
          type={FIELD_TYPES.TEXTAREA}
            name="field-name"
            placeholder="message"
            label="Message"


          
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,

}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;