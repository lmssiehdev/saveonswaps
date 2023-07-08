import { w } from "windstitch";

export const Button = w.button("rounded-sm inline-block shadow-md", {
  variants: {
    variant: {
      primary:
        "bg-green-200 text-green-800 hover:bg-green-100  hover:text-green-700",
    },
    size: {
      small: "text-sm px-2 py-1",
      medium: "text-base px-3 py-2",
      large: "text-lg  px-4 py-3",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});
