const sizes = {
    mobile: `566px`,
    tablet: `567px`,
    desktop: `1200px`,
};

export const device = {
    mobile: `(max-width: ${sizes.mobile})`,
    tablet: `(min-width: ${sizes.tablet}) and (max-width: ${sizes.desktop})`,
    desktop: `(min-width: ${sizes.desktop})`,
    nonDesktop: `(max-width: ${sizes.desktop})`,
};
