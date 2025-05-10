export type CoffeeProps = {
    id: number;
    name: string;
    price: string;
    rating?: number;
    votes: number;
    popular: boolean;
    available: boolean;
    image: string;
}

export const CoffeeCard = ({ coffee }: { coffee: CoffeeProps }) => {
    return (
        <li>
            <div className="relative max-w-[312px] mx-auto hover:bg-[#30252280] min-[800px]:max-w-[380px]">

                {coffee.popular ? <p className="text-[0.875rem] bg-[#F6C768] text-[#111315] font-bold py-[1px] rounded-full w-fit px-3 absolute top-4 left-4">Popular</p> : null}
                <img src={coffee.image} alt={coffee.name} className="w-full rounded-xl object-cover" />
                <div className="flex justify-between items-center flex-no-wrap gap-6 py-4">
                    <h2 className="text-[#FEF7EE] font-bold">{coffee.name}</h2>
                    <p className="bg-[#BEE3CC] text-[#111315] font-bold px-2 py-1 rounded-md text-[0.75rem]">{coffee.price}</p>
                </div>
                <div className="flex justify-between pb-4">
                    {coffee.rating ?
                        <p className="inline-flex items-center font-bold text-[0.875rem]">
                            <span><img src="/Star_fill.svg" alt="" /></span>
                            <span className="px-1 py-1 text-[#FEF7EE] font-bold">{coffee.rating}</span>
                            <span className="py-1 text-[#6F757C]">  {`(${coffee.votes} votes)`}</span>
                        </p> : <p className="inline-flex items-center font-bold text-[#6F757C]">
                            <span><img src="/Star.svg" alt="" /></span>
                            <span className="px-1">No ratings</span>
                        </p>
                    }
                    {!coffee.available ? <p className="text-[#ED735D] font-bold">Sold Out</p> : null}
                </div>

            </div>
        </li>
    )
}
