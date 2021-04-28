import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Ventas from "./ventas/Ventas";
import Inventario from "./inventario/Inv/Inventario";
import Devolucion from "./Devolucion/Devolucion";
import Clientes from "./cli-prov/Clientes";
import Proveedores from "./cli-prov/Proveedores";
import Compra from "./inventario/Compra/Compra";
import Login from "./login/Login";
import Layout from "./Componentes/Layout/Layout";
import Error404 from "./Componentes/Error/Error";
import Perfil from "./Perfil";
import UserState from "./Context/User/UserState";
import IvaState from "./Context/Iva/IvaState";

function Rutas() {
  return (
    <div className="App">
      <UserState>
        <IvaState>
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

          <Route path="/devolucion">
            <Layout tipo="dev">
              <Devolucion />
            </Layout>
          </Route>

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
                <Layout tipo="compra">
                  <Compra />
                </Layout>
              </Route>
              <Route path="/perfil">
                <Layout tipo="perf">
                  <Perfil />
                </Layout>
              </Route>

              <Route path="*">
                <Error404
                  ancho={400}
                  error="Pagina no Encontrada, Error 404."
                  boton={true}
                />
              </Route>
            </Switch>
          </Router>
        </IvaState>
      </UserState>
    </div>
  );
}

export default Rutas;
