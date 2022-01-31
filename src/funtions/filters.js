const priceFormat = num => {
  return new Intl.NumberFormat('cl', {
    style: 'currency',
    currency: 'CLP'
  }).format(num);
};

const firstUpperCase = str => {
  let cero=str.slice(0,1);
  cero=cero.toUpperCase();
  return cero+str.slice(1,str.length);
}

export {
  priceFormat,
  firstUpperCase
}