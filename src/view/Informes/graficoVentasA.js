import React, {Component} from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import useAxios from '../Hooks/useAxios';

const GraficoVentasAnio = () =>{
    const arrayDatos = []
    const arrayDatos2 = []
    
    const { data } = useAxios("/venta");
    
    
    const calcularAnios = ()=>{
        
        data.forEach(venta => {
            let fechaventa = new Date(venta.fecha_ve);
            let agregar = true;
            
            if(arrayDatos.length == 0){
                arrayDatos.push(fechaventa.getFullYear());
                 
            }else{
                arrayDatos.forEach(anio => {
                    
                    if(anio == fechaventa.getFullYear()){
                        agregar = false;
                        return
                    }
                    
                })
                if(agregar){
                    arrayDatos.push(fechaventa.getFullYear());
                }
            }           
                    
                     
        });
    }
    calcularAnios(); 

    const calcular = ()=>{
        for(let j=0 ; j < arrayDatos.length ; j++){
            arrayDatos2.push(0);
        }

        for(let i=0 ; i<arrayDatos.length; i++){            
            data.forEach(venta => {
                let fechaventa = new Date(venta.fecha_ve);
                
                if(arrayDatos[i]==fechaventa.getFullYear()){
                    arrayDatos2[i]=arrayDatos2[i] + 1;
                }          
            });
           
        }
    }
    calcular(); 
    
    
    const dat = {
        labels: arrayDatos,
        datasets: [
          {
            label: 'Ventas por año',
            data: arrayDatos2,
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
        <h1 className='titleVentasAnio'>Ventas por Año</h1>
       
      </div>
        
        <Bar data={dat} options={options}/> 
      
            
        </>
    );
};

export default GraficoVentasAnio;