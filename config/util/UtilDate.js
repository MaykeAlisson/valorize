const moment = require('moment');

module.exports = {

  primeiroDiaMes(){
    let hoje = moment().format('YYYY-MM-DD');
    return moment(hoje).startOf('month').format('YYYY-MM-DD');
  },

  ultimoDiaMes(){
    let hoje = moment().format('YYYY-MM-DD');
    return moment(hoje).endOf('month').format('YYYY-MM-DD');
  },

  primeiroDiaMesAnterior(){
    let hoje = moment().format('YYYY-MM-DD');
    return moment(hoje).subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
  },

  ultimoDiaMesAnterior(){
    let hoje = moment().format('YYYY-MM-DD');
    return moment(hoje).subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
  },
};
