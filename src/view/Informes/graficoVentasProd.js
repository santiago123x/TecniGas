import React, {Component} from 'react';
import { Doughnut } from 'react-chartjs-2';
import useAxios from '../Hooks/useAxios';


const GraficoVentasProd = (datos) =>{
    const arrayDatos = []
    
    const { data } = useAxios("/detalleventa");
    
    
    const calcular = ()=>{
        
        data.forEach(detVenta => {
            let producto= {};
            let productoEnc= arrayDatos.filter(prod => prod.nombre_pro == detVenta.nombre_pro);
            
            if(productoEnc.length == 0){
                producto={nombre_pro : detVenta.nombre_pro, cantidad_pro : detVenta.cantidad_ven};
                arrayDatos.push(producto);
            }else{
                //arrayDatos[productoEnc].cantidad_pro = arrayDatos[productoEnc].cantidad_pro + detVenta.cantidad_ven;
               const index = arrayDatos.findIndex(element => 
                element.nombre_pro == detVenta.nombre_pro  
               )
               arrayDatos[index].cantidad_pro = parseInt(arrayDatos[index].cantidad_pro) + parseInt(detVenta.cantidad_ven);
               
               
                
            }                      
                     
        });
           
        
    }
    
    calcular();
    const labels = [];
    const daticos = [];
    const funcion = ()=>{
        arrayDatos.forEach(dato => {
            labels.push(dato.nombre_pro);
            daticos.push(dato.cantidad_pro);
        })
    }
    funcion(); 
    const dat = {
        labels: labels,
        datasets: [
          {
            label: 'Ventas por mes',
            data: daticos,
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
                            
                            size: 0
                        }
                    }
                }
            }
      }
     
    return (
        <>
        
        
       
    
        
        <Doughnut data={dat} options={options}/> 
      
            
        </>
    );
};

export default GraficoVentasProd;