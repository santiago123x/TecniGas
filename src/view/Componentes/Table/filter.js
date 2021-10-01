import React, { useState } from "react";
import Row from "./TableRow";
import TableCell from "@material-ui/core/TableCell";
import { ModalDelete } from "../Modal/ModalDelete/Index";
import Modificar from "../../cli-prov/Control/Control_Form";
import FormularioDev from "../../Devolucion/FormDev/FormularioDev";
import ModalModUsu from "../Modal/ModalModUsu";
import "./Table.css";

const Opciones = (objeto, categoria, recarga, setRecarga) => {
  let titulo;
  const orden = 1;
  if (categoria === "cli") {
    titulo = `Cliente: ${objeto.nombre_pe}`;
  } else if (categoria === "prov") {
    titulo = `Proveedor: ${objeto.nombre_pe}`;
  } else if (categoria === "cat") {
    titulo = `Categoria: ${objeto.nombre_catg}`;
  } else {
    titulo = `Producto: ${objeto.nombre_pro} - ${objeto.codigo_pro}`;
  }
  if(categoria == 'dev'){
    return (
      <>
        <div className="container-buttons">
          <FormularioDev
            dev_full={objeto}
            recarga={recarga}
            setRecarga={setRecarga}
            orden={orden}
          />
          <ModalDelete
              tipo={categoria}
              elemento={objeto}
              recarga={recarga}
              setRecarga={setRecarga}
            />
        </div>
      </>
    );
  }else if(categoria !== "info"){
    return (
      <>
        <div className="container-buttons">
          {categoria == "usu" ? (
            <ModalModUsu
              objeto={objeto}
              recarga={recarga}
              setRecarga={setRecarga}
            />
          ) : (
            <Modificar
              objeto={objeto}
              tipo={categoria}
              titulo={titulo}
              metodo="put"
              imagen={categoria}
              recarga={recarga}
              setRecarga={setRecarga}
            />
          )}
          {categoria !== 'cat' ?
            <ModalDelete
              tipo={categoria}
              elemento={objeto}
              recarga={recarga}
              setRecarga={setRecarga}
            />
            : <></>
          }
        </div>
      </>
    );
  }
};

const filter = (
  tipo,
  data,
  filtro,
  titulosDetalle,
  categoria,
  recarga,
  setRecarga
) => {
  let arreglo = [];

  switch (tipo) {
    case "inv":
      if (filtro !== "") {
        arreglo = data.filter((dat) => {
          return (
            dat.nombre_catg
              .toLowerCase()
              .trim()
              .includes(filtro.toString().toLowerCase().trim()) ||
            dat.nombre_pro
              .toLowerCase()
              .trim()
              .includes(filtro.toString().toLowerCase().trim()) ||
            dat.codigo_pro
              .toString()
              .toLowerCase()
              .trim()
              .includes(filtro.toString().toLowerCase().trim())
          );
        });

        return arreglo.map((row, index) => {
          const firstData = [
            row.codigo_pro,
            row.nombre_pro,
            row.cantidad_pro,
            row.nombre_catg,
          ];
          const secondData = [
            `$ ${row.precio_uni}`,
            `$ ${row.precio_may}`,
            row.stock_min,
          ];

          return (
            <Row
              key={index}
              firstData={firstData}
              secondData={secondData}
              titulosDetalles={titulosDetalle}
              opciones={Opciones(row, tipo, recarga, setRecarga)}
            />
          );
        });
      } else {
        return data.map((row, index) => {
          const firstData = [
            row.codigo_pro,
            row.nombre_pro,
            row.cantidad_pro,
            row.nombre_catg,
          ];
          const secondData = [
            `$ ${row.precio_uni}`,
            `$ ${row.precio_may}`,
            row.stock_min,
          ];

          return (
            <Row
              key={index}
              titulosDetalles={titulosDetalle}
              firstData={firstData}
              secondData={secondData}
              opciones={Opciones(row, tipo, recarga, setRecarga)}
            />
          );
        });
      }

    case "dev":
      if (filtro !== ""){
        arreglo = data.filter((dat) => {
          return (
            dat.devolucion_id
              .toString()
              .trim()
              .includes(filtro.toString().trim()) ||
            dat.id_venta
              .toString()
              .trim()
              .includes(filtro.toString().trim()) ||
            dat.fecha_dev
              .toString()
              .toLowerCase()
              .trim()
              .includes(filtro.toString().toLowerCase().trim())  
          );
        });
        let valida = 0;
        return arreglo.map((row, index) => {
          const vari = index + 1;
          if(vari !== arreglo.length && valida !== row.devolucion_id){
            if( row.devolucion_id == arreglo[vari].devolucion_id){
              const firstData = [row.devolucion_id, row.id_venta, row.fecha_dev, `$ ${row.total_gral_d}`];
              const secondData = [row.cantidad_det, `$ ${row.precio_uni}`, row.codigo_pro, row.nombre_pro, row.nombre_catg];
              let thirdData = [];
              valida = row.devolucion_id;
              data.map((rew,ind)=>{
                if( rew.devolucion_id == row.devolucion_id && rew.codigo_pro !== row.codigo_pro){
                  thirdData.push([rew.cantidad_det, `$ ${rew.precio_uni}`, rew.codigo_pro,  rew.nombre_pro,  rew.nombre_catg]);   
                  
                } 
              })
                    return (
                      <Row
                        key={index}
                        firstData={firstData}
                        secondData={secondData}
                        thirdData={thirdData}
                        titulosDetalles={titulosDetalle}
                        opciones={Opciones(row, categoria, recarga, setRecarga)}
                      />
                    );
              } else {
                    const firstData = [row.devolucion_id, row.id_venta, row.fecha_dev, `$ ${row.total_gral_d}`];
                    const secondData = [row.cantidad_det, `$ ${row.precio_uni}`, row.codigo_pro, row.nombre_pro, row.nombre_catg];
                    return (
                      <Row
                        key={index}
                        firstData={firstData}
                        secondData={secondData}
                        titulosDetalles={titulosDetalle}
                        opciones={Opciones(row, categoria, recarga, setRecarga)}
                      />
                    );
                  }
          } else {
            let var_dos = index -1;
            if(var_dos < 0){
                const firstData = [row.devolucion_id, row.id_venta, row.fecha_dev, `$ ${row.total_gral_d}`];
                const secondData = [row.cantidad_det, `$ ${row.precio_uni}`, row.codigo_pro, row.nombre_pro, row.nombre_catg];
                return (
                  <Row
                    key={index}
                    firstData={firstData}
                    secondData={secondData}
                    titulosDetalles={titulosDetalle}
                    opciones={Opciones(row, categoria, recarga, setRecarga)}
                  />
                );
            } else if(row.devolucion_id !== arreglo[index-1].devolucion_id){
                const firstData = [row.devolucion_id, row.id_venta, row.fecha_dev, `$ ${row.total_gral_d}`];
                const secondData = [row.cantidad_det, `$ ${row.precio_uni}`, row.codigo_pro, row.nombre_pro, row.nombre_catg];
                return (
                  <Row
                    key={index}
                    firstData={firstData}
                    secondData={secondData}
                    titulosDetalles={titulosDetalle}
                    opciones={Opciones(row, categoria, recarga, setRecarga)}
                  />
                );
              }
            }
        });
      } else {
        let valida = 0;
        return data.map((row, index) => {
          const vari = index + 1;
          if(vari !== data.length && valida !== row.devolucion_id){
            if( row.devolucion_id == data[vari].devolucion_id){
              const firstData = [row.devolucion_id, row.id_venta, row.fecha_dev, `$ ${row.total_gral_d}`];
              const secondData = [row.cantidad_det, `$ ${row.precio_uni}`, row.codigo_pro, row.nombre_pro, row.nombre_catg];
              let thirdData = [];
              valida = row.devolucion_id;
                data.map((rew,ind)=>{
                  if( rew.devolucion_id == row.devolucion_id && rew.codigo_pro !== row.codigo_pro){
                    thirdData.push([rew.cantidad_det, `$ ${rew.precio_uni}`, rew.codigo_pro,  rew.nombre_pro,  rew.nombre_catg]);   
                  
                  } 
                })
                  return (
                    <Row
                      key={index}
                      firstData={firstData}
                      secondData={secondData}
                      thirdData={thirdData}
                      titulosDetalles={titulosDetalle}
                      opciones={Opciones(row, categoria, recarga, setRecarga)}
                    />
                  );
                  
          
            } else {
              const firstData = [row.devolucion_id, row.id_venta, row.fecha_dev, `$ ${row.total_gral_d}`];
              const secondData = [row.cantidad_det, `$ ${row.precio_uni}`, row.codigo_pro, row.nombre_pro, row.nombre_catg];
              return (
                <Row
                  key={index}
                  firstData={firstData}
                  secondData={secondData}
                  titulosDetalles={titulosDetalle}
                  opciones={Opciones(row, categoria, recarga, setRecarga)}
                />
              );
            }
          }else if(row.devolucion_id !== data[index-1].devolucion_id){
                const firstData = [row.devolucion_id, row.id_venta, row.fecha_dev, `$ ${row.total_gral_d}`];
                const secondData = [row.cantidad_det, `$ ${row.precio_uni}`, row.codigo_pro, row.nombre_pro, row.nombre_catg];
                return (
                  <Row
                    key={index}
                    firstData={firstData}
                    secondData={secondData}
                    titulosDetalles={titulosDetalle}
                    opciones={Opciones(row, categoria, recarga, setRecarga)}
                  />
                );
            }
        });
      }

    case "clipro":
      if (filtro !== "") {
        arreglo = data.filter((dat) => {
          return (
            dat.nombre_pe
              .toLowerCase()
              .trim()
              .includes(filtro.toString().toLowerCase().trim()) ||
            dat.identificacion
              .toString()
              .toLowerCase()
              .trim()
              .includes(filtro.toString().toLowerCase().trim())
          );
        });

        return arreglo.map((row, index) => {
          const firstData = [row.nombre_pe, row.identificacion, row.telefono];
          const secondData = [row.email, row.direccion];

          return (
            <Row
              key={index}
              firstData={firstData}
              secondData={secondData}
              titulosDetalles={titulosDetalle}
              opciones={Opciones(row, categoria, recarga, setRecarga)}
            />
          );
        });
      } else {
        return data.map((row, index) => {
          const firstData = [row.nombre_pe, row.identificacion, row.telefono];
          const secondData = [row.email, row.direccion];

          return (
            <Row
              key={index}
              titulosDetalles={titulosDetalle}
              firstData={firstData}
              secondData={secondData}
              opciones={Opciones(row, categoria, recarga, setRecarga)}
            />
          );
        });
      }

    case "usu":
      if (filtro !== "") {
        arreglo = data.filter((dat) => {
          return (
            dat.nombre_pe
              .toLowerCase()
              .trim()
              .includes(filtro.toString().toLowerCase().trim()) ||
            dat.identificacion
              .toString()
              .toLowerCase()
              .trim()
              .includes(filtro.toString().toLowerCase().trim()) ||
            dat.nombre_usr
              .toLowerCase()
              .trim()
              .includes(filtro.toString().toLowerCase().trim()) ||
            dat.rol
              .toLowerCase()
              .trim()
              .includes(filtro.toString().toLowerCase().trim())
          );
        });

        return arreglo.map((row, index) => {
          const firstData = [row.nombre_usr, row.nombre_pe, row.rol];
          const secondData = [row.identificacion, row.email, row.contraseña];

          return (
            <Row
              key={index}
              firstData={firstData}
              secondData={secondData}
              titulosDetalles={titulosDetalle}
              opciones={Opciones(row, categoria, recarga, setRecarga)}
            />
          );
        });
      } else {
        return data.map((row, index) => {
          const firstData = [row.nombre_usr, row.nombre_pe, row.rol];
          const secondData = [row.identificacion, row.email, row.contraseña];

          return (
            <Row
              key={index}
              titulosDetalles={titulosDetalle}
              firstData={firstData}
              secondData={secondData}
              opciones={Opciones(row, categoria, recarga, setRecarga)}
            />
          );
        });
      }
      case "info":
        if (filtro !== ""){
          arreglo = data.filter((dat) => {
            console.log(dat.id_venta.toString());
            return (
              dat.id_venta
                .toString()
                .trim()
                .includes(filtro.toString().trim()) ||
              dat.fecha_ve
                .toString()
                .toLowerCase()
                .trim()
                .includes(filtro.toString().toLowerCase().trim()) ||
              dat.nombre_pro
                .toLowerCase()
                .trim()
                .includes(filtro.toString().toLowerCase().trim()) ||
              dat.codigo_pro
                .toString()
                .toLowerCase()
                .trim()
                .includes(filtro.toString().toLowerCase().trim())  
            );
          });
          let valida = 0;
          return arreglo.map((row, index) => {
            const vari = index + 1;
            if(vari !== arreglo.length && valida !== row.id_venta){
              if( row.id_venta == arreglo[vari].id_venta){
                const firstData = [row.id_venta, row.nombre_pe, row.tipo_clpr, row.nombre_usr, row.fecha_ve,`$ ${row.sub_total}`, `$ ${row.total_ve}`, `$ ${row.recibido}`, `$ ${row.cambio}`,row.estado_ve, `$ ${row.total_iva}`, row.observacion_vta];
                const secondData = [row.nombre_pro, row.codigo_pro, row.nombre_catg,`$ ${row.descuento}`, row.cantidad_ven, `$ ${row.precio_ven}`, `$ ${row.total_ven}`];
                let thirdData = [];
                valida = row.id_venta;
                data.map((rew,ind)=>{
                  if( rew.id_venta == row.id_venta && rew.codigo_pro !== row.codigo_pro){
                    thirdData.push([rew.nombre_pro, rew.codigo_pro, rew.nombre_catg,`$ ${rew.descuento}`, rew.cantidad_ven, `$ ${rew.precio_ven}`, `$ ${rew.total_ven}`]);   
                    
                  } 
                })
                      return (
                        <Row
                          key={index}
                          firstData={firstData}
                          secondData={secondData}
                          thirdData={thirdData}
                          titulosDetalles={titulosDetalle}
                          opciones={Opciones(row, categoria, recarga, setRecarga)}
                        />
                      );
                } else {
                  const firstData = [row.id_venta, row.nombre_pe, row.tipo_clpr, row.nombre_usr, row.fecha_ve,`$ ${row.sub_total}`, `$ ${row.total_ve}`, `$ ${row.recibido}`, `$ ${row.cambio}`,row.estado_ve, `$ ${row.total_iva}`, row.observacion_vta];
                  const secondData = [row.nombre_pro, row.codigo_pro, row.nombre_catg,`$ ${row.descuento}`, row.cantidad_ven, `$ ${row.precio_ven}`, `$ ${row.total_ven}`];
                      return (
                        <Row
                          key={index}
                          firstData={firstData}
                          secondData={secondData}
                          titulosDetalles={titulosDetalle}
                          opciones={Opciones(row, categoria, recarga, setRecarga)}
                        />
                      );
                    }
            } else {
              let var_dos = index -1;
              if(var_dos < 0){
                const firstData = [row.id_venta, row.nombre_pe, row.tipo_clpr, row.nombre_usr, row.fecha_ve,`$ ${row.sub_total}`, `$ ${row.total_ve}`, `$ ${row.recibido}`, `$ ${row.cambio}`,row.estado_ve, `$ ${row.total_iva}`, row.observacion_vta];
                const secondData = [row.nombre_pro, row.codigo_pro, row.nombre_catg,`$ ${row.descuento}`, row.cantidad_ven, `$ ${row.precio_ven}`, `$ ${row.total_ven}`];
                  return (
                    <Row
                      key={index}
                      firstData={firstData}
                      secondData={secondData}
                      titulosDetalles={titulosDetalle}
                      opciones={Opciones(row, categoria, recarga, setRecarga)}
                    />
                  );
              } else if(row.id_venta !== arreglo[index-1].id_venta){
                const firstData = [row.id_venta, row.nombre_pe, row.tipo_clpr, row.nombre_usr, row.fecha_ve,`$ ${row.sub_total}`, `$ ${row.total_ve}`, `$ ${row.recibido}`, `$ ${row.cambio}`,row.estado_ve, `$ ${row.total_iva}`, row.observacion_vta];
                const secondData = [row.nombre_pro, row.codigo_pro, row.nombre_catg,`$ ${row.descuento}`, row.cantidad_ven, `$ ${row.precio_ven}`, `$ ${row.total_ven}`];
                  return (
                    <Row
                      key={index}
                      firstData={firstData}
                      secondData={secondData}
                      titulosDetalles={titulosDetalle}
                      opciones={Opciones(row, categoria, recarga, setRecarga)}
                    />
                  );
                }
              }
          });
        } else {
          let valida = 0;
          return data.map((row, index) => {
            const vari = index + 1;
            if(vari !== data.length && valida !== row.id_venta){
              if( row.id_venta == data[vari].id_venta){
                const firstData = [row.id_venta, row.nombre_pe, row.tipo_clpr, row.nombre_usr, row.fecha_ve,`$ ${row.sub_total}`, `$ ${row.total_ve}`, `$ ${row.recibido}`, `$ ${row.cambio}`,row.estado_ve, `$ ${row.total_iva}`, row.observacion_vta];
                const secondData = [row.nombre_pro, row.codigo_pro, row.nombre_catg,`$ ${row.descuento}`, row.cantidad_ven, `$ ${row.precio_ven}`, `$ ${row.total_ven}`];
                let thirdData = [];
                valida = row.id_venta;
                  data.map((rew,ind)=>{
                    if( rew.id_venta == row.id_venta && rew.codigo_pro !== row.codigo_pro){
                      thirdData.push([rew.nombre_pro, rew.codigo_pro, rew.nombre_catg,`$ ${rew.descuento}`, rew.cantidad_ven, `$ ${rew.precio_ven}`, `$ ${rew.total_ven}`]);   
                      
                    } 
                  })
                  
                    return (
                      <Row
                        key={index}
                        firstData={firstData}
                        secondData={secondData}
                        thirdData={thirdData}
                        titulosDetalles={titulosDetalle}
                        opciones={Opciones(row, categoria, recarga, setRecarga)}
                      />
                    );
                    
            
              } else {
                const firstData = [row.id_venta, row.nombre_pe, row.tipo_clpr, row.nombre_usr, row.fecha_ve,`$ ${row.sub_total}`, `$ ${row.total_ve}`, `$ ${row.recibido}`, `$ ${row.cambio}`,row.estado_ve, `$ ${row.total_iva}`, row.observacion_vta];
                const secondData = [row.nombre_pro, row.codigo_pro, row.nombre_catg,`$ ${row.descuento}`, row.cantidad_ven, `$ ${row.precio_ven}`, `$ ${row.total_ven}`];
                return (
                  <Row
                    key={index}
                    firstData={firstData}
                    secondData={secondData}
                    titulosDetalles={titulosDetalle}
                    opciones={Opciones(row, categoria, recarga, setRecarga)}
                  />
                );
              }
            }else if(row.id_venta !== data[index-1].id_venta){
              const firstData = [row.id_venta, row.nombre_pe, row.tipo_clpr, row.nombre_usr, row.fecha_ve,`$ ${row.sub_total}`, `$ ${row.total_ve}`, `$ ${row.recibido}`, `$ ${row.cambio}`,row.estado_ve, `$ ${row.total_iva}`, row.observacion_vta];
              const secondData = [row.nombre_pro, row.codigo_pro, row.nombre_catg,`$ ${row.descuento}`, row.cantidad_ven, `$ ${row.precio_ven}`, `$ ${row.total_ven}`];
                return (
                    <Row
                      key={index}
                      firstData={firstData}
                      secondData={secondData}
                      titulosDetalles={titulosDetalle}
                      opciones={Opciones(row, categoria, recarga, setRecarga)}
                    />
                  );
              }
          });
        }
    case 'cat':

      if (filtro !== "") {
        arreglo = data.filter((dat) => {
          return (
            dat.nombre_catg
              .toLowerCase()
              .trim()
              .includes(filtro.toString().toLowerCase().trim()) 
          );
        });

        return arreglo.map((row, index) => {
          const firstData = [
            row.nombre_catg,
          ];

          return (
            <Row
              key={index}
              firstData={firstData}
              secondData={[]}
              titulosDetalles={[]}
              opciones={Opciones(row, tipo, recarga, setRecarga)}
            />
          );
        });
      } else {
        return data.map((row, index) => {
          const firstData = [
            row.nombre_catg,
          ];


          return (
            <Row
              key={index}
              titulosDetalles={[]}
              firstData={firstData}
              secondData={[]}
              opciones={Opciones(row, tipo, recarga, setRecarga)}
            />
          );
        });
      }

    default:
      break;
  }
};

const mapTitle = (titulo, index) => {
  if (index === 0) {
    return (
      <TableCell key={index} align="center">
        {titulo}
      </TableCell>
    );
  } else if (index === 1) {
    return (
      <TableCell size="small" align="center" key={index}>
        {titulo}
      </TableCell>
    );
  } else {
    return (
      <TableCell key={index} align="center">
        {titulo}
      </TableCell>
    );
  }
};

export { filter, mapTitle };
