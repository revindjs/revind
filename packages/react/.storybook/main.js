const TsChecker = require("vite-plugin-ts-checker").default;
const TsConfigPaths = require("vite-tsconfig-paths").default;

module.exports = {
    stories: [
        "../src/**/*.stories.mdx",
        "../src/components/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    framework: "@storybook/react",
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "storybook-dark-mode/register",
        {
            name: "@storybook/addon-postcss",
            options: {
                postcssLoaderOptions: {
                    implementation: require("postcss"),
                },
            },
        },
    ],
    core: {
        builder: "storybook-builder-vite",
    },
    async viteFinal(config) {
        config.plugins.push(TsChecker({ checker: "tsc" }), TsConfigPaths());
        config.server.fs.strict = false;
        if ("GITPOD_REPO_ROOT" in process.env) {
            /* gitpod.io configurations */
            config.server.hmr.port = 443;
        }
        return config;
    },
};
