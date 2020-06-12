module.exports = {

  mascaraMoney(v) {
    v = String(Number(v));
    let len = v.length;
    if (1 === len)
      v = v.replace(/(\d)/, "0,0$1");
    else if (2 === len)
      v = v.replace(/(\d)/, "0,$1");
    else if (len > 2) {
      v = v.replace(/(\d{2})$/, ',$1');
      if (len > 5) {
        let x = len - 5
          , er = new RegExp('(\\d{' + x + '})(\\d)');
        v = v.replace(er, '$1.$2');
      }
    }
    return v;
  },

}
