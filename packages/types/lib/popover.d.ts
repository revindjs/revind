import { BaseStyleObj } from "./styles";

export type PopoverTrigger = "click" | "hover";
export type LazyBehavior = "unmount" | "keepMounted";

export interface PopoverOptions<InitRef> {
    /**
     * The html `id` attribute of the popover.
     * If not provided, we generate a unique id.
     *
     * This `id` is also used to auto-generate the `aria-labelledby`
     * and `aria-decribedby` attributes that points to the `PopoverHeader` and `PopoverBody`
     */
    id?: string;
    /**
     * If `true`, the popover will be opened in controlled mode.
     */
    isOpen?: boolean;
    /**
     * If `true`, the popover will be initially opened.
     */
    defaultIsOpen?: boolean;
    /**
     * The `ref` of the element that should receive focus when the popover opens.
     */
    initialFocusRef?: InitRef;
    /**
     * If `true`, focus will be returned to the element that triggers the popover
     * when it closes
     */
    returnFocusOnClose?: boolean;
    /**
     * If `true`, focus will be transferred to the first interactive element
     * when the popover opens
     */
    autoFocus?: boolean;
    /**
     * If `true`, the popover will close when you blur out it by
     * clicking outside or tabbing out
     */
    closeOnBlur?: boolean;
    /**
     * If `true`, the popover will close when you hit the `Esc` key
     */
    closeOnEsc?: boolean;
    /**
     * Callback fired when the popover opens
     */
    onOpen?: () => void;
    /**
     * Callback fired when the popover closes
     */
    onClose?: () => void;
    /**
     * The size of the popover arrow
     */
    arrowSize?: number;
    /**
     * The `box-shadow` of the popover arrow
     */
    arrowShadowColor?: string;
    /**
     * The interaction that triggers the popover.
     *
     * `hover` - means the popover will open when you hover with mouse or
     * focus with keyboard on the popover trigger
     *
     * `click` - means the popover will open on click or
     * press `Enter` to `Space` on keyboard
     */
    trigger?: PopoverTrigger;
    openDelay?: number;
    closeDelay?: number;
    /**
     * Performance 🚀:
     * If `true`, the PopoverContent rendering will be deferred
     * until the popover is open.
     */
    isLazy?: boolean;
    /**
     * Performance 🚀:
     * The lazy behavior of popover's content when not visible.
     * Only works when `isLazy={true}`
     *
     * - "unmount": The popover's content is always unmounted when not open.
     * - "keepMounted": The popover's content initially unmounted,
     * but stays mounted when popover is open.
     *
     * @default "unmount"
     */
    lazyBehavior?: LazyBehavior;
    /**
     * If `true`, the popover will be positioned when it mounts
     * (even if it's not open)
     *
     * Note 🚨: We don't recommend using this in a popover/menu intensive UI or page
     * as it might affect scrolling performance.
     */
    computePositionOnMount?: boolean;
}

export type PopoverStyleObj = BaseStyleObj;
