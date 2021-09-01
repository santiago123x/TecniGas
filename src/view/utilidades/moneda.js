const moneda =(num)=>{
    return (new Intl.NumberFormat( "es-CO", {style: "currency", currency: "COP", maximumFractionDigits: 0}).format(num))
}

export default moneda;