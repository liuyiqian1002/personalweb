/**
 * 设置root rem
 */
(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      if (clientWidth >= 750) {
        docEl.style.fontSize = "100px"; //1rem  = 100px
        // document.documentElement.style.fontSize = "100px" 相当于根节点的字体大小
      } else {
        docEl.style.fontSize = 100 * (clientWidth / 750) + "px";
        /*
                    以375px计算rem
                    50px = 1rem;
                    12px = 0.24rem
                    14px = 0.28rem
                    16px = 0.32rem
                    18px = 0.36rem
                    20px = 0.4rem
                    以此类推...
                */
        //console.log(docEl.style.fontSize);
      }
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener("DOMContentLoaded", recalc, false);
  recalc();
})(document, window);
