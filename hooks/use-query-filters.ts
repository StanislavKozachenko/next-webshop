import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {Filters} from "@/hooks/use-filters";
import qs from "qs";

export const useQueryFilters = (filters: Filters) => {
    const router = useRouter();

    useEffect(() => {
        const params = {
            ...filters.prices,
            pizzaTypes: Array.from(filters.pizzaTypes),
            sizes: Array.from(filters.sizes),
            ingredients: Array.from(filters.selectedIngredients),
        };

        router.replace(`?${qs.stringify(params, {arrayFormat: 'comma'})}`, {
            scroll: false,
        });
    }, [filters.prices, filters.pizzaTypes, filters.sizes, filters.selectedIngredients]);
}
