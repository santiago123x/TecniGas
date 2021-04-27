const moneda =(num)=>{
    return (new Intl.NumberFormat( "es-CO", {style: "currency", currency: "COP"}).format(num))
}

export default moneda;