import { JSX } from "react";

export type RoutePath = {
    index?: boolean;
    path: string;
    element: JSX.Element;
    children?: RoutePath[];
    label?: string | JSX.Element;
    isShowMenu?: boolean;
    icon?: JSX.Element;
    requireAuth?: boolean
}