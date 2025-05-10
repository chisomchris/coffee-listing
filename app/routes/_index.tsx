import { LoaderFunctionArgs, defer } from "@remix-run/node"
import { Await, isRouteErrorResponse, useLoaderData, useRouteError, useSearchParams } from "@remix-run/react"
import { Suspense } from "react"
import { CoffeeProps } from "~/components/CoffeeCard"
import { CoffeeList } from "~/components/CoffeeList"

const getCoffeeList = async (): Promise<CoffeeProps[]> => {
    const response = await fetch("https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/simple-coffee-listing-data.json")
    return response.json()
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const filter = url.searchParams.get("filter");
    try {
        const coffeeList = getCoffeeList()
        if (!coffeeList)
            throw new Response("Oh no! Something went wrong!", {
                status: 500,
            });
        if (filter == "available") {
            return defer({
                coffeeList: Promise.resolve(coffeeList).then(coffeeList => coffeeList.filter(coffee => coffee.available)),
                filter
            })
        }
        return defer({ coffeeList, filter: 'all' })
    } catch (error) {
        throw new Response("Oh no! Something went wrong!", {
            status: 500,
        });
    }

}

export default function Index() {
    const { coffeeList, filter } = useLoaderData<typeof loader>()
    const [, setSearchParams] = useSearchParams()

    const handleFilterChange = (term: "all" | "available") => {
        if (term === "all") return setSearchParams({})
        setSearchParams({ filter: term })
    }

    return (
        <div className="relative bg-[#1B1D1F] overflow-hidden z-10 rounded-xl min-h-[calc(100vh-240px)] px-8 pt-4 pb-12 lg:pt-10 min-[1320px]:px-12 min-[1320px]:pt-16">
            <img src="/vector.svg" alt="" className="absolute left-1/2 top-4 -z-10 lg:left-[57%] lg:top-6 min-[1280px]:top-8 min-[1280px]:left-1/2" />
            <h1 className="text-[2rem] font-bold text-center py-4 text-[#FEF7EE]">Our Collection</h1>

            <p className="text-center max-w-[480px] mx-auto text-[#6F757C]">
                Introducing our Coffee Collection, a selection of unique coffees from different roast types and origins, expertly roasted in small batches and shipped fresh weekly.
            </p>

            <ul className="flex justify-center gap-2 pt-8 pb-12 text-[#FEF7EE] font-bold">
                <li>
                    <button className={` px-3 py-1 rounded-md ${filter === "all" ? "bg-[#4D5562]" : ""}`} onClick={() => handleFilterChange("all")}>All Products</button>
                </li>
                <li>
                    <button className={`px-3 py-1 rounded-md ${filter === "available" ? "bg-[#4D5562]" : ""}`} onClick={() => handleFilterChange("available")}>Available Now</button>
                </li>
            </ul>

            <Suspense fallback={<div>Loading...</div>}>
                <Await resolve={coffeeList} errorElement={<div>Oops!</div>}>
                    {(coffeeList) => <CoffeeList coffeeList={coffeeList} />}
                </Await>
            </Suspense>

        </div>
    )
}

export function ErrorBoundary() {
    const error = useRouteError();
    if (isRouteErrorResponse(error)) {
        return (
            <div>
                <h1>Opps</h1>
                <p>{error.data || "Something went wrong!"}</p>
            </div>
        )
    }

}
