import { SVGProps } from "react";

function EyeOpenIcon({ width = 32, height = 32, fill = "#000", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 32 32" fill={fill} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M16 25C7.874 25 1.481 16.959 1.213 16.617C1.07497 16.441 0.999963 16.2237 0.999963 16C0.999963 15.7763 1.07497 15.559 1.213 15.383C1.481 15.041 7.874 7 16 7C24.126 7 30.519 15.041 30.787 15.383C30.925 15.559 31 15.7763 31 16C31 16.2237 30.925 16.441 30.787 16.617C30.519 16.959 24.126 25 16 25ZM3.313 16C4.932 17.814 10.075 23 16 23C21.925 23 27.068 17.814 28.687 16C27.068 14.186 21.925 9 16 9C10.075 9 4.932 14.186 3.313 16Z" />
      <path d="M16 21C15.0111 21 14.0444 20.7068 13.2221 20.1573C12.3999 19.6079 11.759 18.827 11.3806 17.9134C11.0022 16.9998 10.9031 15.9945 11.0961 15.0245C11.289 14.0546 11.7652 13.1637 12.4645 12.4645C13.1637 11.7652 14.0546 11.289 15.0245 11.0961C15.9945 10.9031 16.9998 11.0022 17.9134 11.3806C18.827 11.759 19.6079 12.3999 20.1573 13.2221C20.7068 14.0444 21 15.0111 21 16C20.9984 17.3256 20.4711 18.5964 19.5338 19.5338C18.5964 20.4711 17.3256 20.9984 16 21ZM16 13C15.4067 13 14.8266 13.1759 14.3333 13.5056C13.8399 13.8352 13.4554 14.3038 13.2284 14.8519C13.0013 15.4001 12.9419 16.0033 13.0576 16.5853C13.1734 17.1672 13.4591 17.7018 13.8787 18.1213C14.2982 18.5409 14.8328 18.8266 15.4147 18.9424C15.9967 19.0581 16.5999 18.9987 17.1481 18.7716C17.6962 18.5446 18.1648 18.1601 18.4944 17.6667C18.8241 17.1734 19 16.5933 19 16C19 15.2043 18.6839 14.4413 18.1213 13.8787C17.5587 13.3161 16.7956 13 16 13Z" />
    </svg>
  );
}

export default EyeOpenIcon;