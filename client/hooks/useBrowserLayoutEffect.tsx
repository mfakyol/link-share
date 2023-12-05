import { useLayoutEffect } from "react";

export const useBrowserLayoutEffect = process.browser ? useLayoutEffect : () => {};
