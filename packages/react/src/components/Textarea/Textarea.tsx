import React, { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Input, ReactRevindInputOptions } from "components/Input/Input";
import { forwardRef, HTMLRevindProps } from "utils/forward-ref";
import { ComponentIds } from "utils/component-ids";

/**
 * This component is heavily under development. It has many bugs
 * There's a high chance of major logic change. Don't impletment this
 * for frameworks other than React. Currently typescript's typesafety
 * is turned off too for this component's props & hooks
 */

export interface TextareaProps
    extends HTMLRevindProps<"textarea">,
        Pick<
            ReactRevindInputOptions,
            | "variant"
            | "scheme"
            | "size"
            | "margin"
            | "full-width"
            | "label"
            | "label-props"
            | "wrapper-props"
        > {
    "min-rows"?: number;
    "max-rows"?: number;
}

export const Textarea = forwardRef<TextareaProps, "textarea">(function Textarea(
    { "min-rows": minRows, "max-rows": maxRows, onInput, rows, size, ...props },
    ref,
) {
    const [defaultHeight, setDefaultHeight] = useState(0);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    function handleInput(e: FormEvent<HTMLTextAreaElement>) {
        const { target } = e;
        onInput?.(e);
        const el = target as HTMLTextAreaElement;
        el.style.height = minRows ? `${(minRows - 1) * defaultHeight}px` : "auto";
        let height = el.scrollHeight;
        const offset = getOffset();
        if (maxRows && height > maxRows * (defaultHeight - offset) + offset) {
            el.style.overflow = "auto";
        } else {
            el.style.overflow = "hidden";
        }
        el.style.height = `${height}px`;
    }

    if (maxRows && rows) {
        console.error(
            "[revind]: Using both resizable & fixed properties isn't valid. Use either `max-rows` for auto-resize or `rows` for static",
        );
    }

    const getOffset = useCallback(function getOffset() {
        switch (size) {
            case "sm":
                return 12;
            case "lg":
                return 32;
            case "xl":
                return 48;
            default:
                return 16;
        }
    }, []);

    useEffect(() => {
        if (inputRef.current) {
            const height = inputRef.current.scrollHeight;
            setDefaultHeight(height);
            if (minRows && !rows) {
                inputRef.current.style.height = `${(minRows - 1) * height}px`;
            }
            if (maxRows) {
                const offset = getOffset();
                inputRef.current.style.maxHeight = `${
                    maxRows * (height - offset) + offset
                }px`;
            }
        }
    }, []);

    return (
        <Input
            as="textarea"
            ref={inputRef as any}
            onInput={(rows ? onInput : handleInput) as any}
            rows={rows ?? 1}
            {...(props as any)}
        />
    );
});

Textarea.id = ComponentIds.Textarea;

Textarea.propTypes = {
    ...Textarea.propTypes,
    "min-rows": PropTypes.number,
    "max-rows": PropTypes.number,
    variant: PropTypes.oneOf(["filled", "outlined", "minimal"]),
    scheme: PropTypes.oneOf(["primary", "secondary", "red", "green", "yellow"]),
    margin: PropTypes.bool,
    "full-width": PropTypes.bool,
    label: PropTypes.string,
    "wrapper-props": PropTypes.object as any,
    "label-props": PropTypes.object as any,
};
