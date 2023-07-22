import { w } from "windstitch";

export const Button = w.button("rounded-sm inline-block shadow-md", {
  variants: {
    variant: {
      primary:
        "bg-green-200 text-green-800 hover:bg-green-100  hover:text-green-700",
      glowing:
        "border rounded-sm bg-[#232021] hover:bg-[#262321] border-[#58c169] text-[#58c169] relative px-3 py-2 font-satoshi  before:opacity-10 before:top-0 before:left-0 before:w-full before:h-full before:absolute before:hover:opacity-20",
    },
    color: {
      pink: "bg-[#232021] hover:bg-[#262321] border-[#58c169] text-[#58c169] before:bg-gradient-glow",
      red: "border-red-500 text-red-500 before:bg-[radial-gradient(190.82%_190.82%_at_50%_100%,_rgb(254_15_15)_0%,_rgb(168_64_64_/_62%)_18.09%)]",
      green:
        "bg-[#232021] hover:bg-[#262321] border-[#40916c] text-[#40916c] before:bg-[radial-gradient(190.82%_190.82%_at_50%_100%,_rgb(15_254_150)_0%,_rgb(64_168_109_/_62%)_18.09%)]",
    },
    size: {
      small: "text-sm px-2 py-1",
      medium: "text-base px-3 py-2",
      large: "text-lg  px-4 py-3",
    },
  },
  defaultVariants: {
    variant: "glowing",
    color: "pink",
    size: "medium",
  },
});
