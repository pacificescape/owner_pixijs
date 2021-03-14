module.exports = function actionGetMapPortion(obj) {
  console.log(obj);

  const size = Math.floor(((obj.width / 65) * obj.height) / 54);
  const start = map.width * Math.ceil(obj.height / 54) + Math.ceil(obj.x / 65);

  console.log("size", size, "start", start);

  const portion = map.elevation.slice(start, start + size);
  return portion.toString();
};
