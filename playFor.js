const plays = require('./plays.js')

function playFor(aPerformance) {
  return plays[aPerformance.playID];
}

module.exports = playFor