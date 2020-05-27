// eslint-disable-next-line import/no-extraneous-dependencies
import { GenerateSW } from "workbox-webpack-plugin";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (_pluginOptions) => ({
    webpack: (config) => {
        config.plugins.push(new GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
            runtimeCaching: [{
                urlPattern: new RegExp("/"),
                handler: "StaleWhileRevalidate",
            }],
        }));
        return config;
    },
});
