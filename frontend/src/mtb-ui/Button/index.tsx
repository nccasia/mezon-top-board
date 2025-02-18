import { colorMap } from "@app/constants/color";
import { TinyColor } from "@ctrl/tinycolor";
import { Button as AntdButton, ButtonProps as AntdButtonProps, ConfigProvider } from "antd";
import { useMemo } from "react";

interface IButtonProps {
    color?: "default" | "primary" | "secondary",
}

const Button = (props: IButtonProps & Omit<AntdButtonProps, "color">) => {
    const { color = "primary", children } = props;

    const colorPrimary = useMemo(() => {
        return colorMap[color];
    }, [color]);

    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        colorPrimary,
                        colorPrimaryHover: new TinyColor(colorPrimary).lighten(5).toString(),
                        colorPrimaryActive: new TinyColor(colorPrimary).lighten(10).toString(),
                        fontWeight: 500
                    },
                },
            }}
        >
            <AntdButton {...props}>{children}</AntdButton>
        </ConfigProvider>
    )
}

export default Button
