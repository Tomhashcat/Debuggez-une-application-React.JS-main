import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 1000); })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // État pour le message d'erreur
  const [successMessage, setSuccessMessage] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);

      setErrorMessage("");
      setSuccessMessage("");
      // We try to call mockContactApi
      if (!nom.trim() || !prenom.trim()) { // Vérifie si les champs Nom et Prénom ne sont pas vides
        setSending(false);
        setErrorMessage("Les champs Nom et Prénom ne doivent pas être vides.");
        return;
      }
      try {
        await mockContactApi();
        setSending(false);

        onSuccess();
      } catch (err) {
        setSending(false);
        setErrorMessage("Une erreur s'est produite lors de l'envoi.");
        onError(err);
      }
    },
    [onSuccess, onError, nom, prenom]
  );
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" value={nom} label="Nom" onChange={(e) => setNom(e)} />
          <Field placeholder="" value={prenom} label="Prénom" onChange={(e) => setPrenom(e)} />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

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
