import { w } from "windstitch";

export const Label = w.span("rounded rounded-sm inline-block font-satoshi", {
  variants: {
    variant: {
      primary: "border border-solid border-green-100 text-green-100",
    },
    size: {
      small: "text-xs px-[0.5rem]",
      large: "text-base py-2",
    },
  },
  defaultVariants: {
    size: "small",
  },
});
