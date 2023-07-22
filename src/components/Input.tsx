import { supportedCoins } from "@/utils/constants";
import { cryptoSymbolMapping } from "@/utils/price";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/Common/Button";
import { Input as CommonInput } from "@/components/Common/Input";
import * as Dialog from "@radix-ui/react-dialog";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useImmerReducer } from "use-immer";
import type { Params } from "@/utils/schemas";
// import { useRouter } from "next/navigation";

type Action =
  | { type: "from"; value: string }
  | { type: "to"; value: string }
  | { type: "amount"; value: number };

const initalState = {
  from: "btc",
  to: "xmr",
  amount: 1,
};

function reducer(state: typeof initalState, action: Action) {
  switch (action.type) {
    case "from":
      state.from = action.value;
      return state;
    case "to":
      state.to = action.value;
      return state;
    case "amount":
      state.amount = action.value;
      return state;
  }
}
export default function Input({
  from,
  to,
  amount,
}: {
  from: string;
  to: string;
  amount: number;
}) {
  const [state, dispatch] = useImmerReducer(reducer, {
    from,
    to,
    amount,
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          window.location = `/result?from=${state.from}&to=${state.to}&amount=${state.amount}`;
        }}
        className="mx-auto my-4"
      >
        {/* {JSON.stringify(state)} */}
        <div className="flex flex-wrap gap-x-2 items-center justify-center">
          <SelectCoin
            direction="from"
            defaultChecked={state.from}
            selected={state.from}
            update={(value: string) => dispatch({ type: "from", value })}
          />
          <SelectCoin
            direction="to"
            defaultChecked={state.to}
            selected={state.to}
            update={(value: string) => dispatch({ type: "to", value })}
          />
        </div>
        <CommonInput
          placeholder="amount..."
          className="font-medium py-2.5 px-4 mb-4 text-black 
          mt-1
          block
          w-full
          rounded-sm
          border-gray-300
          shadow-sm
          focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
        "
          min={0}
          name="amount"
          type="number"
          step="0.1"
          value={state.amount}
          onChange={({ target }) =>
            dispatch({ type: "amount", value: Number(target.value) })
          }
          required={true}
        />
        <Button variant="glowing" type="submit" className="block w-full py-2">
          Get Best Fee
        </Button>
      </form>
    </div>
  );
}

type Direction = "from" | "to";

function SelectCoin({
  direction,
  defaultChecked,
  selected,
  update,
}: {
  direction: Direction;
  defaultChecked: string;
  selected: string;
  update: (value: string) => void;
}) {
  return (
    <div className="flex-1 flex flex-col-reverse w-full min-w-[300px] input-wrapper  my-2">
      <CoinSelectModal
        direction={direction}
        updateSelected={update}
        selectedValue={selected}
      />
      <fieldset
        id="coin-selector"
        className="hidden selector-modal fixed top-[50%] left-[50%] w-[90vw] translate-x-[-50%] translate-y-[-50%] bg-black p-3"
      >
        <header className="flex justify-between items-center">
          <h2 className="text-lg font-bold">You send</h2>
          <a className="close-modal">
            <XMarkIcon className="h-5 w-5" />
          </a>
        </header>

        {/* NO JS STUFF */}
        {/* {supportedCoins.map((coin) => {
          const id = `${direction}_${coin}`;
          return (
            <>
              <div key={coin}>
                <input
                  className="coin-selector !hidden"
                  style={{
                    backgroundColor: coin === defaultChecked ? "crimson" : "",
                  }}
                  type="submit"
                  id={id}
                  name={direction}
                  value={coin}
                  defaultChecked={coin === defaultChecked}
                />
                {true && (
                  <label htmlFor={id} tabIndex={0}>
                    <div className="flex gap-2 p-2">
                      <picture>
                        <img
                          src={`/images/coins/${coin}.svg`}
                          alt={`${coin} icon`}
                          className="w-10"
                        />
                      </picture>
                      <div>
                        <div className="font-semibold">{coin}</div>
                        <span className="text-sm text-slate-500">
                          {cryptoSymbolMapping[coin]}
                        </span>
                      </div>
                    </div>
                  </label>
                )}
              </div>
            </>
          );
        })} */}
        {/* {defaultChecked && (
          <input type="hidden" name={direction} value={defaultChecked} />
        )} */}
      </fieldset>
    </div>
  );
}

function CoinSelectModal({
  direction,
  selectedValue,
  updateSelected,
}: {
  direction: Direction;
  selectedValue: string;
  updateSelected: (value: string) => void;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="flex items-center gap-4 border-2 border-solid p-10 rounded-sm text-muted text-left">
          <div className="flex items-center">
            <img
              src={`/images/coins/${selectedValue}.svg`}
              alt={`${selectedValue} icon`}
              className="w-full h-full"
            />
          </div>
          <div className="flex-1">
            <span className="block ">
              You {direction === "from" ? "Receive" : "Send"}
            </span>
            <span className="font-bold text-3xl uppercase text-white">
              {selectedValue}
            </span>

            <div className="capitalize">
              {cryptoSymbolMapping[selectedValue].replace("-", " ")}
            </div>
          </div>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/40 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-inherit p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-mauve12 m-0 text-xl font-bold uppercase">
              You send
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>
          <CoinList
            direction={direction}
            updateSelected={updateSelected}
            selectedValue={selectedValue}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function CoinList({
  direction,
  selectedValue,
  updateSelected,
}: {
  direction: Direction;
  selectedValue: string;
  updateSelected: (value: string) => void;
}) {
  return (
    <ToggleGroup.Root
      value={selectedValue}
      onValueChange={(value) => {
        if (value) updateSelected(value);
      }}
      type="single"
      className="flex flex-col gap-2"
    >
      {supportedCoins.map((coin) => {
        const id = `${direction}_${coin}`;
        return (
          <ToggleGroup.Item
            defaultValue={"btc"}
            value={coin}
            key={id}
            className="data-[state=on]:bg-green-900/30 hover:bg-green-900/30 rounded-sm text-left"
          >
            <Dialog.Close asChild>
              <div className="flex items-center justify-between">
                <div className="flex gap-5 p-2 ">
                  <picture>
                    <img
                      src={`/images/coins/${coin}.svg`}
                      alt={`${coin} icon`}
                      className="w-10"
                    />
                  </picture>
                  <div>
                    <div className="font-semibold">{coin.toUpperCase()}</div>
                    <span className="text-sm text-muted">
                      {cryptoSymbolMapping[coin]}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  {selectedValue === coin && (
                    <CheckIcon className="text-green-400 h-8 w-8" />
                  )}
                </div>
              </div>
            </Dialog.Close>
          </ToggleGroup.Item>
        );
      })}
    </ToggleGroup.Root>
  );
}
