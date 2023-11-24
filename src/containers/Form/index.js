import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES, isValidEmail} from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 1000); })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  // Set Name and Surname 
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [Email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // State initial pour le champ Select

  const [selected, setSelected] = useState("");
  const [error, setError] = useState(null);
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);

      if (!isValidEmail(Email)) {
        setSending(false);
        setError("L'email fourni n'est pas valide."); // Appeler onError en cas d'email invalide
        return;
      }
      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        setError(null); // Clear error message on success
        setMessage("Message envoyé !");
        onSuccess();
      } catch (err) {
        setSending(false);
        setError("Erreur lors de l'envoi. Veuillez réessayer.");
        onError();
      }
    },
    [onSuccess, onError, Email]
  );

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
         {error && <p style={{ color: "red" }}>{error}</p>}
         {message && <p style={{ color: "green" }}>{message}</p>}
          <Button data-testid="button-test-id" type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            <p data-testid="button-test-id" className={sending ? "sending-text" : "normal-text"}>
    {sending ? "En cours" : "Envoyer"}
  </p>
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