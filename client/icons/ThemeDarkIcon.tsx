import { SVGProps } from "react";

function ThemeDarkIcon({ width = 32, height = 32, fill = "#000", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M14.5898 3.51524C14.7453 4.18658 14.8275 4.886 14.8275 5.60462C14.8275 10.6979 10.6986 14.8267 5.60537 14.8267C4.88649 14.8267 4.18682 14.7445 3.51526 14.5889L3.50998 14.5876C3.45225 14.5742 3.39473 14.5603 3.33743 14.5458C3.12573 14.4923 2.91695 14.4314 2.71136 14.3635C2.30893 14.2306 1.89196 14.5786 2.02536 14.9809C2.10251 15.2135 2.18777 15.4425 2.2808 15.6674C2.30703 15.7308 2.33388 15.7939 2.36134 15.8566L2.36592 15.8671C3.95057 19.478 7.55748 22 11.7535 22C17.4126 22 22.0003 17.4124 22.0003 11.7532C22.0003 7.55753 19.4786 3.95083 15.8681 2.36601L15.8576 2.36142C15.7949 2.33396 15.7318 2.3071 15.6684 2.28087C15.4435 2.18782 15.2146 2.10254 14.9819 2.02538C14.5797 1.89194 14.2316 2.30888 14.3645 2.71133C14.4324 2.91691 14.4932 3.1257 14.5467 3.33741C14.5612 3.39471 14.5752 3.45223 14.5886 3.50996L14.5898 3.51524Z" />
    </svg>
  );
}

export default ThemeDarkIcon;