import { JSX } from "react";

export type RoutePath = {
    index?: boolean;
    path: string;
    element: JSX.Element;
    children?: RoutePath[];
}