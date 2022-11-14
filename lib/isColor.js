export default function isColor(strColor) {
  var s = new Option().style;
  s.color = strColor;
  return s.color ? true : false;
}
