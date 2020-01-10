export function randomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function getRandomColorList() {
  var randomColorsList = [];
  for (let i = 0; i < 12; i++) {
    randomColorsList.push(randomColor());
  }
  return randomColorsList;
}
