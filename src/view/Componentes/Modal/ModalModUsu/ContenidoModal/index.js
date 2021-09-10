import { useState } from "react";
import "./style.css";
import Button from "@material-ui/core/Button";
import logoU from "./Usuario.ico";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { BootstrapInput } from "./styleSelec";
import { rolUsu, rolUsuNum } from "./rol";
import axios from "axios";
import { notify } from "../../../notify/Notify";

const uri = "http://localhost:5000";

const ContenidoModal = ({ datos, abrirCerrarModal, recarga, setRecarga }) => {
  const [loading, setLoading] = useState(false);

  const [selectValue, setSelectValue] = useState(rolUsu(datos.rol));

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const rol = rolUsuNum(selectValue);
      const body = {
        rol: rol,
      };
      await axios.put(`${uri}/usurol/${datos.usuario_id}`, body);
      setLoading(false);
      setRecarga(!recarga);
      notify(`Rol del usuario ${datos.nombre_usr} actualizado`, "", "info");
      abrirCerrarModal();
    } catch (err) {
      setLoading(false);
      notify(`Error al actualizar el Rol`, "", "error");
    }
  };
  return (
    <div className="controlModal ">
      <div className="contenedorModal">
        <form className="formModal" onSubmit={onSubmit}>
          <img className="imagen" src={logoU} />

          <h5 className="mt-4">
            <strong>Actualizar Rol</strong>
          </h5>
          <h5>Usuario: {datos.nombre_usr}</h5>

          <div className="selectUsu">
            <Select
              defaultValue={() => rolUsu(datos.rol)}
              input={<BootstrapInput />}
              label="Rol"
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
            >
              <MenuItem value={10}>Administrador</MenuItem>
              <MenuItem value={20}>Vendedor</MenuItem>
              <MenuItem value={30}>Contador</MenuItem>
            </Select>
          </div>

          <div className="botonesUsu">
            <Button
              size="small"
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              Actualizar
            </Button>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              type="reset"
              onClick={() => abrirCerrarModal()}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContenidoModal;
