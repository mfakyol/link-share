import convertHextToRGB from "./convertHextToRGBA";

export function generateGradient(baseColor: string, degree = 0) {
  let gradientColors = [];

  const { r, g, b } = convertHextToRGB(baseColor);

  gradientColors.push(`rgb(${r}, ${g}, ${b})`);

  gradientColors.push(`rgb(${floorColorCode(r)}, ${floorColorCode(g)}, ${floorColorCode(b)})`);

  return `linear-gradient(${degree}deg, ${gradientColors.join(", ")})`;
}

function floorColorCode(colorCode: number) {
  colorCode = colorCode + (255 - colorCode) / 3;
  if (colorCode > 255) return 255;
  return colorCode;
}
