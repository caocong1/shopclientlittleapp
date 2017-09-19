var appgl = getApp().globalData;
function toggle(t) {
  (appgl.open) ? t.setData({ open: false }) : t.setData({ open: true });
  appgl.open=!appgl.open;
}
function dragstart(e){
  appgl.mark = appgl.newmark = appgl.startmarkX = e.touches[0].pageX;
  appgl.startmarkY = e.touches[0].pageY;
}
function drag(e) {
  appgl.newmark = e.touches[0].pageX;
  appgl.endmarkY = e.touches[0].pageY;
  (appgl.newmark > appgl.mark) ? appgl.open = true : appgl.open = false;
  appgl.mark = appgl.newmark;
}
function dragend(t) {
  var x = (appgl.mark > appgl.startmarkX) ? (appgl.mark - appgl.startmarkX) : (appgl.startmarkX - appgl.mark);
  var y = (appgl.startmarkY > appgl.endmarkY) ? (appgl.startmarkY - appgl.endmarkY) : (appgl.endmarkY - appgl.startmarkY);
  appgl.mark = 0;
  appgl.newmark = 0;
  if((x > 100)&&(y < 150)){
    (appgl.open) ? t.setData({ open: true }) : t.setData({ open: false })
  }else return
}
module.exports.toggle = toggle
module.exports.dragstart = dragstart
module.exports.drag = drag
module.exports.dragend = dragend