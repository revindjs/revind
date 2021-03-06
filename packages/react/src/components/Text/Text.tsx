import PropTypes from "prop-types";
import React from "react";
import { forwardRef, HTMLRevindProps } from "utils/forward-ref";
import { TextOptions } from "@revind/types";
import { useStyleConfig } from "hooks/useStyleConfig";
import { useClasses } from "hooks/useClasses";
import { ComponentIds } from "utils/component-ids";

export type TextElement = "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type TextProps = HTMLRevindProps<TextElement> & TextOptions;

export const Text = forwardRef<TextProps, TextElement>(function Text(
    {
        scheme = "regular",
        variant = "body1",
        inline: isInline = false,
        align = "left",
        wrap: isWrap = true,
        "bottom-margin": isBottomMargin = true,
        className = "",
        styleObj,
        children,
        ...props
    },
    ref,
) {
    const {
        default: { start, end },
        conditionals: { bottomMargin, inline, noWrap, wrap },
        variantSchemes,
        variants,
        schemes,
        alignments,
    } = useStyleConfig("Text", styleObj);
    const Component = {
        h1: "h1",
        h2: "h2",
        h3: "h3",
        h4: "h4",
        h5: "h5",
        h6: "h6",
        sub1: "h6",
        sub2: "h6",
        body1: "p",
        body2: "p",
        caption: "span",
        overline: "span",
    }[variant] as any;

    const classes = useClasses(
        start,
        variants[variant],
        schemes[scheme],
        variantSchemes?.[variant]?.[scheme],
        alignments[align],
        {
            [inline]: isInline,
            [bottomMargin]: isBottomMargin,
        },
        wrap ? wrap : noWrap,
        end,
        className,
    );
    return (
        <Component ref={ref} className={classes} {...props}>
            {children}
        </Component>
    );
});

Text.id = ComponentIds.Text;

Text.propTypes = {
    ...Text.propTypes,
    variant: PropTypes.oneOf<TextOptions["variant"]>([
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "body1",
        "body2",
        "sub1",
        "sub2",
        "caption",
        "overline",
    ]),
    align: PropTypes.oneOf<TextOptions["align"]>(["left", "center", "right", "justify"]),
    scheme: PropTypes.oneOf<TextOptions["scheme"]>([
        "primary",
        "secondary",
        "red",
        "green",
        "yellow",
        "regular",
        "inverted",
    ]),
    inline: PropTypes.bool,
    wrap: PropTypes.bool,
    "bottom-margin": PropTypes.bool,
};
