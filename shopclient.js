var appgl = getApp().globalData;
function toggle(t) {
  (appgl.open) ? t.setData({ open: false }) : t.setData({ open: true });
  appgl.open=!appgl.open;
}
function dragstart(e){
  appgl.mark = appgl.newmark = e.touches[0].pageX;
}
function drag(e) {
  appgl.newmark = e.touches[0].pageX;
  (appgl.newmark > appgl.mark) ? appgl.open = true : appgl.open = false;
  appgl.mark = appgl.newmark;
}
function dragend(t) {
  appgl.mark = 0;
  appgl.newmark = 0;
  (appgl.open) ? t.setData({ open: true }) : t.setData({ open: false })
}
module.exports.toggle = toggle
module.exports.dragstart = dragstart
module.exports.drag = drag
module.exports.dragend = dragend