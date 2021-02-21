function format(aNumber){
    return new Intl.NumberFormat("en-US",
                      { style: "currency", currency: "USD",
                        minimumFractionDigits: 2 }).format(aNumber);
  }

  module.exports = format