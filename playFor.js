const plays = require('./resources/plays.js')

function playFor(aPerformance) {
  return plays[aPerformance.playID];
}

module.exports = playFor