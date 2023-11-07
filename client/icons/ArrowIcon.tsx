import { SVGProps } from "react";

function ArrowIcon({ width = 32, height = 32, fill = "#000", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 32 32" fill={fill} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M18.062 23.6288C16.9232 24.7676 15.0768 24.7676 13.938 23.6288L1.95964 11.6504C1.12456 10.8153 1.12456 9.46138 1.95964 8.62631C2.79472 7.79123 4.14864 7.79123 4.98372 8.62631L16 19.6426L27.0163 8.62631C27.8514 7.79123 29.2053 7.79123 30.0404 8.62631C30.8754 9.46138 30.8754 10.8153 30.0404 11.6504L18.062 23.6288Z" />
    </svg>
  );
}

export default ArrowIcon;
