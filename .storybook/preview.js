import "../styles/globals.css";
import * as NextImage from "next/image";
import { muiTheme } from "storybook-addon-material-ui";
export const decorators = [muiTheme()];
const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
    configurable: true,
    value: (props) => < OriginalNextImage {...props }
    unoptimized / > ,
});

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};