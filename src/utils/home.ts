// assets
import dollarEthereumExchangeIcon from "../../public/icons8-dollar-ethereum-exchange-100.png";
import ethereumIcon from "../../public/icons8-ethereum-96.png";
import exchangeIcon from "../../public/icons8-exchange-100.png";
import usdIcon from "../../public/icons8-usd-96.png";

interface ITab {
  id: number;
  selected: boolean;
  title: string;
}

const TABS_POOLS_ID = 1;
const TABS_SWAPS_ID = 2;
const TABS_TOKENS_ID = 3;

const tabs: ITab[] = [
  {
    id: TABS_POOLS_ID,
    selected: true,
    title: "Pools",
  },
  {
    id: TABS_SWAPS_ID,
    selected: false,
    title: "Swaps",
  },
  {
    id: TABS_TOKENS_ID,
    selected: false,
    title: "Tokens",
  },
];

export default {
  images: {
    dollarEthereumExchangeIcon,
    ethereumIcon,
    exchangeIcon,
    usdIcon,
  },
  tabs: {
    content: tabs,
    ids: {
      TABS_POOLS_ID,
      TABS_SWAPS_ID,
      TABS_TOKENS_ID,
    },
  },
};
