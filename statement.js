const plays = require('./resources/plays')
const invoices = require('./resources/invoices')
const playFor = require('./playFor')
const usd = require('./usd')

function statement (invoice, plays) {
  let totalAmount = 0;
  let result = `Statement for ${invoice.customer}\n`;
  
  for (let perf of invoice.performances) {
    let thisAmount = amountFor(perf, playFor(perf));
    
    // print line for this order
    result += `  ${playFor(perf).name}: ${usd(thisAmount)} (${perf.audience} seats)\n`;
    totalAmount += thisAmount;
  }
  
  let volumeCredits = this.totalVolumeCredits();
  result += `Amount owed is ${usd(totalAmount/100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}

function totalVolumeCredits(){
  let volumeCredits = 0;
  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf);
  }
  
  return volumeCredits;
}

function amountFor(aPerformance){
  let result = 0;

  switch (playFor(aPerformance).type) {
  case "tragedy":
    result = 40000;
    if (aPerformance.audience > 30) {
      result += 1000 * (aPerformance.audience - 30);
    }
    break;
  case "comedy":
    result = 30000;
    if (aPerformance.audience > 20) {
      result += 10000 + 500 * (aPerformance.audience - 20);
    }
    result += 300 * aPerformance.audience;
    break;
  default:
      throw new Error(`unknown type: ${playFor(aPerformance).type}`);
  }

  return result;
}

function volumeCreditsFor(perf){
  let volumeCredits = 0;
  volumeCredits += Math.max(perf.audience - 30, 0);
  if ("comedy" === playFor(perf).type)
    volumeCredits += Math.floor(perf.audience / 5);

  return volumeCredits;
}


const result = statement(invoices[0], plays)
console.log(result);