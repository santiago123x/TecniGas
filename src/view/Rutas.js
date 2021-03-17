import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Ventas from "./ventas/Ventas";
import Inventario from "./inventario/Inventario";
import Cli_Prov from "./cli-prov/Cli_Prov";
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
            <Layout>
              <Ventas />
            </Layout>
          </Route>
          <Route path="/inventario">
            <Layout>
              <Inventario />
            </Layout>
          </Route>
          <Route path="/clientes-proveedores">
            <Layout>
              <Cli_Prov />
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
