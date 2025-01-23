import { useEffect, useState } from "react";
import Card from "../Card/Card";
import NulsConnector from "../NulsConnector";
import CardMulti from "../CardMulti/CardMulti";

interface Props {
    nuls: NulsConnector,
    wallet:string
}

const Multi: React.FC<Props> = ({nuls, wallet}) => {
    const [api, setApi] = useState([]);
    useEffect(() => {
        // Your API Endpoint goes here
        fetch("/multi.json")
            .then((res) => res.json())
            .then((data) => setApi(data));
    }, []);

    return (
        <div className="flex flex-col space-y-5">
            {api.map((coin) => (
                <div key={coin.id}>
                    <CardMulti

                        name={coin.name}
                        logo={coin.logo}
                        options={coin.options}
                        apr={coin.apr}
                        staked={coin.staked}
                        tvl={coin.tvl}
                        claimable={coin.claimable}
                        contract={coin.contract}
                        stakingContract={coin.stakingContract}
                        stakingContractRouter = {coin.stakingContractRouter}
                        decimals={coin.decimals}
                        nuls={nuls}
                        wallet={wallet}
                    />
                </div>
            ))}
        </div>
    );
};

export default Multi;
