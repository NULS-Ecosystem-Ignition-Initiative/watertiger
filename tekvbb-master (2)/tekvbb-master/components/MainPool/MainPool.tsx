import { useEffect, useState } from "react";
import Card from "../Card/Card";
import NulsConnector from "../NulsConnector";

interface Props {
  nuls: NulsConnector,
  wallet:string
}

const MainPool: React.FC<Props> = ({nuls, wallet}) => {
  const [api, setApi] = useState([]);
  useEffect(() => {
    // Your API Endpoint goes here
    fetch("/api.json")
      .then((res) => res.json())
      .then((data) => setApi(data));
  }, []);
  return (
    <div className="flex flex-col space-y-5">
      {api.map((coin) => (
        <div key={coin.id}>
          <Card
            name={coin.name}
            logo={coin.logo}
            options={coin.options}
            apr={coin.apr}
            staked={coin.staked}
            tvl={coin.tvl}
            id={coin.id}
            claimable={coin.claimable}
            contract={coin.contract}
            stakingContract={coin.stakingContract}
            nuls = {nuls}
            wallet = {wallet}
          />
        </div>
      ))}
    </div>
  );
};

export default MainPool;
