import { SVGProps } from "react";

function TrashIcon({ width = 32, height = 32, fill = "#000", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 32 32" fill={fill} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M13.5793 13.3517C13.5793 12.8032 13.1346 12.3586 12.5862 12.3586C12.0377 12.3586 11.593 12.8032 11.593 13.3517H13.5793ZM11.593 23.9448C11.593 24.4932 12.0377 24.9379 12.5862 24.9379C13.1346 24.9379 13.5793 24.4932 13.5793 23.9448H11.593ZM20.6414 13.3517C20.6414 12.8032 20.1968 12.3586 19.6483 12.3586C19.0997 12.3586 18.6552 12.8032 18.6552 13.3517H20.6414ZM18.6552 23.9448C18.6552 24.4932 19.0997 24.9379 19.6483 24.9379C20.1968 24.9379 20.6414 24.4932 20.6414 23.9448H18.6552ZM27.7034 6.28965C27.7034 5.74118 27.2588 5.29654 26.7103 5.29654C26.1619 5.29654 25.7172 5.74118 25.7172 6.28965H27.7034ZM6.51723 6.28965C6.51723 5.74118 6.07261 5.29654 5.52412 5.29654C4.97565 5.29654 4.53102 5.74118 4.53102 6.28965H6.51723ZM1.9931 5.29654C1.44462 5.29654 1 5.74118 1 6.28965C1 6.83812 1.44462 7.28275 1.9931 7.28275V5.29654ZM30.2414 7.28275C30.7898 7.28275 31.2345 6.83812 31.2345 6.28965C31.2345 5.74118 30.7898 5.29654 30.2414 5.29654V7.28275ZM20.4207 6.28965C20.4207 6.83812 20.8653 7.28275 21.4138 7.28275C21.9622 7.28275 22.4069 6.83812 22.4069 6.28965H20.4207ZM9.82758 6.28965C9.82758 6.83812 10.2722 7.28275 10.8207 7.28275C11.3691 7.28275 11.8138 6.83812 11.8138 6.28965H9.82758ZM11.593 13.3517V23.9448H13.5793V13.3517H11.593ZM18.6552 13.3517V23.9448H20.6414V13.3517H18.6552ZM25.7172 6.28965V27.4758H27.7034V6.28965H25.7172ZM23.1792 30.0138H9.05521V32H23.1792V30.0138ZM6.51723 27.4758V6.28965H4.53102V27.4758H6.51723ZM9.05521 30.0138C7.65351 30.0138 6.51723 28.8774 6.51723 27.4758H4.53102C4.53102 29.9745 6.55655 32 9.05521 32V30.0138ZM25.7172 27.4758C25.7172 28.8774 24.581 30.0138 23.1792 30.0138V32C25.6779 32 27.7034 29.9745 27.7034 27.4758H25.7172ZM1.9931 7.28275H30.2414V5.29654H1.9931V7.28275ZM22.4069 6.28965V4.52414H20.4207V6.28965H22.4069ZM17.8827 0H14.3518V1.9862H17.8827V0ZM9.82758 4.52414V6.28965H11.8138V4.52414H9.82758ZM14.3518 0C11.8531 0 9.82758 2.02552 9.82758 4.52414H11.8138C11.8138 3.12247 12.95 1.9862 14.3518 1.9862V0ZM22.4069 4.52414C22.4069 2.02552 20.3813 0 17.8827 0V1.9862C19.2844 1.9862 20.4207 3.12247 20.4207 4.52414H22.4069Z" />
    </svg>
  );
}

export default TrashIcon;
