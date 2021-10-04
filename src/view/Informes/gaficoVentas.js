import React, {Component} from 'react';
import { Pie } from 'react-chartjs-2';
import useAxios from '../Hooks/useAxios';


const GraficoVentas = (datos) =>{
    const arrayDatos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    
    const { data } = useAxios("/venta");
    
    
    const calcular = ()=>{
        
        data.forEach(venta => {
            let fechaventa = new Date(venta.fecha_ve);
            arrayDatos[fechaventa.getMonth()]=arrayDatos[fechaventa.getMonth()] + 1;
            
                     
        });
    }
    calcular(); 
    const dat = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio','Agosto','Septiempre', 'Octubre', 'Noviembre','Diciembre'],
        datasets: [
          {
            label: 'Ventas por mes',
            data: arrayDatos,
            backgroundColor: [
                '#9E7777', '#DEBA9D', '#916BBF', '#C996CC', '#D4ECDD', '#345B63', '#865439', '#38A3A5', 
                '#57CC99', '#D5EEBB', '#5F7A61', '#A7C4BC'],
            borderColor: [
                '#9E7777', '#DEBA9D', '#916BBF', '#C996CC', '#D4ECDD', '#345B63', '#865439', '#38A3A5', 
                '#57CC99', '#D5EEBB', '#5F7A61', '#A7C4BC' 
            ],
            borderWidth: 2,
          },          
        ],
       
      };
      const options ={
    
            plugins: {
                legend: {
                    
                    labels: {
                        // This more specific font property overrides the global property
                        color: 'white',                        
                        
                        font: {
                            
                            size: 14
                        }
                    }
                }
            }
      }
     
    return (
        <>
        <div className='header'>
        <h1 className='titleVentasMes'>Ventas por Mes</h1>
       
      </div>
        
        <Pie data={dat} options={options}/> 
      
            
        </>
    );
};

export default GraficoVentas;