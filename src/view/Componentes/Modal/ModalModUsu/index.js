import { useState } from "react";
import { IconButton, Modal } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import { MdModeEdit } from "react-icons/md";
import ContenidoModal from "./ContenidoModal";

const ModalModUsu = ({ recarga, setRecarga, objeto }) => {
  const estadoInicial = { ...objeto };
  const [datos, setDatos] = useState({
    ...objeto,
  });
  const [modal, setModal] = useState(false);

  const abrirCerrarModal = () => {
    setModal(!modal);
    setDatos({ ...estadoInicial });
  };

  return (
    <div>
      <Tooltip title="Editar Rol" placement="top">
        <IconButton
          size="small"
          variant="contained"
          color="primary"
          onClick={() => abrirCerrarModal()}
        >
          <MdModeEdit />
        </IconButton>
      </Tooltip>

      <Modal open={modal} onClose={abrirCerrarModal}>
        <ContenidoModal
          datos={datos}
          abrirCerrarModal={abrirCerrarModal}
          recarga={recarga}
          setRecarga={setRecarga}
        />
      </Modal>
    </div>
  );
};

export default ModalModUsu;
