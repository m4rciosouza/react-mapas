import React, { useState } from 'react';
import './modal-descricao-local.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ModalDescricaoLocal(props) {

  const [exibirModal, setExibirModal] = useState(false);

  function handleFecharModal() {
    setExibirModal(false);
  }

  return (
    <>
      <div className="div-exibir-info">
        <Button
          variant="info"
          onClick={() => setExibirModal(true)}>
          <span className="oi oi-info"></span> Exibir informações
        </Button>
      </div>
      <Modal
        show={exibirModal}
        onHide={handleFecharModal}
        size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Informações sobre: {props.nome}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.descricao.map((linha, i) => <p key={i}>{linha}</p>)}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleFecharModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDescricaoLocal;
