// function segmentsIntr(a, b, c, d) {
var intersection = function(start1, end1, start2, end2) {
  var area_abc = (start1.x - start2.x) * (end1.y - start2.y) - (start1.y - start2.y) * (end1.x - start2.x);
  var area_abd = (start1.x - end2.x) * (end1.y - end2.y) - (start1.y - end2.y) * (end1.x - end2.x);

  if (area_abc * area_abd >= 0) {
    return false;
  }

  var area_cda = (start2.x - start1.x) * (end2.y - start1.y) - (start2.y - start1.y) * (end2.x - start1.x);
  var area_cdb = area_cda + area_abc - area_abd;
  if (area_cda * area_cdb >= 0) {
    return false;
  }

  var t = area_cda / (area_abd - area_abc);
  var dx = t * (end1.x - start1.x),
    dy = t * (end1.y - start1.y);
  return { x: start1.x + dx, y: start1.y + dy };
};
