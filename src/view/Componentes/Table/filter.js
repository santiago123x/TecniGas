import Row from "./TableRow";
import TableCell from "@material-ui/core/TableCell";

const filter = (tipo, data, filtro, titulosDetalle) => {
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
            />
          );
        });
      }

    case "prov":
      if (filtro !== "") {
        arreglo = data.filter((dat) => {
          const nombreC = dat.nombre_pe + " " + dat.apellido;
          return (
            nombreC
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
          const nombreC = row.nombre_pe + " " + row.apellido;
          const firstData = [nombreC, row.identificacion, row.telefono];
          const secondData = [row.email, row.direccion];

          return (
            <Row
              key={index}
              firstData={firstData}
              secondData={secondData}
              titulosDetalles={titulosDetalle}
            />
          );
        });
      } else {
        return data.map((row, index) => {
          const nombreC = row.nombre_pe + " " + row.apellido;
          const firstData = [nombreC, row.identificacion, row.telefono];
          const secondData = [row.email, row.direccion];

          return (
            <Row
              key={index}
              titulosDetalles={titulosDetalle}
              firstData={firstData}
              secondData={secondData}
            />
          );
        });
      }
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
