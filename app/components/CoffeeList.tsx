import { CoffeeCard, CoffeeProps } from "./CoffeeCard"

export const CoffeeList = ({ coffeeList }: { coffeeList: CoffeeProps[] }) => {
    return (
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {coffeeList.map((coffee: CoffeeProps) => (
                <CoffeeCard key={coffee.id} coffee={coffee} />))}
        </ul>
    )
}