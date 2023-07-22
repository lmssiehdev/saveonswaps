import { w } from "windstitch";

export const Label = w.span("rounded rounded-sm inline-block font-satoshi", {
  variants: {
    variant: {
      primary: "border border-solid border-green-100 text-green-100",
      glowing:
        "bg-[radial-gradient(202.04%_202.04%_at_50%_111.22%,_rgba(255,_254,_241,_0.2)_0%,_rgba(120,_120,_120,_0.2)_23.95%)] bg-[#17171a] border border-white/20",
    },
    size: {
      small: "text-xs  py-[0.15rem] px-[0.5rem]",
    },
  },
  defaultVariants: {
    size: "small",
    variant: "glowing",
  },
});
