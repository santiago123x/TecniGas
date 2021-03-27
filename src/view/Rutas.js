import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Ventas from "./ventas/Ventas";
import Inventario from "./inventario/Inventario";
import Cli_Prov from "./cli-prov/Cli_Prov-Lista";
import Cli_Prov_FormC from "./cli-prov/Cli_Prov-FormC";
import Login from "./login/Login";
import Layout from "./Componentes/Layout/Layout";


function Rutas() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Layout>
            <Route path="/ventas" component={Ventas} />
            <Route path="/inventario" component={Inventario} />
            <Route path="/clientes-proveedores" component={Cli_Prov} />
            <Route path="/formulario-clientes" component={Cli_Prov_FormC} />
          </Layout>
        </Switch>
      </Router>
    </div>
  );
}

export default Rutas;
