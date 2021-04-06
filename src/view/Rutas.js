import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Ventas from "./ventas/Ventas";
import Inventario from "./inventario/Inv/Inventario";
import Cli_Prov_FormC from "./cli-prov/Cli_Prov-FormC";
import Clientes from "./cli-prov/Clientes";
import Proveedores from "./cli-prov/Proveedores";
import Compra from "./inventario/Compra/Compra";
import Login from "./login/Login";
import Layout from "./Componentes/Layout/Layout";
import Error404 from "./Componentes/Error/Error";


function Rutas() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />

          <Route path="/ventas">
            <Layout tipo="vent">
              <Ventas />
            </Layout>
          </Route>

          <Route path="/inventario">
            <Layout tipo="inv">
              <Inventario />
            </Layout>
          </Route>

          <Route path="/formulario-clientes" component={Cli_Prov_FormC} />

          <Route path="/clientes">
            <Layout tipo="cli">
              <Clientes />
            </Layout>
          </Route>

          <Route path="/proveedores">
            <Layout tipo="prov">
              <Proveedores />
            </Layout>
          </Route>
          <Route path="/compra">
            <Layout>
              <Compra />
            </Layout>
          </Route>

          <Route path="*">
            <Error404 ancho={400} error="Pagina no Encontrada, Error 404." />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default Rutas;
