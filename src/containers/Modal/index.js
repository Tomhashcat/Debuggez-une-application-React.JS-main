import PropTypes from "prop-types";
import { useState } from "react";
import Icon from "../../components/Icon";
import "./style.scss";



const Modal = ({ opened, Content, children}) => {
  
  const [isOpened, setIsOpened] = useState(opened);
  const handleClose = () => {
    setIsOpened(false);
    // Appelle la fonction onModalClose pour réinitialiser le formulaire
    // Actualiser la page
    window.location.reload(); 
   
  };
  return (
    <>
      {children({ isOpened, setIsOpened })}
      {isOpened && (
        <div className="modal">
          <div className="content">
            {Content}
            <button
              type="button"
              data-testid="close-modal"
              onClick={handleClose}
            >
              <Icon name="close" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

Modal.defaultProps = {
  opened: false,
  
}

Modal.propTypes = {
  opened: PropTypes.bool,
  Content: PropTypes.node.isRequired,
  children: PropTypes.func.isRequired,
 
}

export default Modal;
