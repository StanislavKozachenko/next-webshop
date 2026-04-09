import {useSearchParams} from "next/navigation";
import {useSet} from "react-use";
import {useState} from "react";

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

export interface Filters {
    sizes: Set<string>;
    pizzaTypes: Set<string>;
    selectedIngredients: Set<string>;
    prices: PriceProps;
}

interface ReturnProps extends Filters {
    updatePrice: (name: keyof PriceProps, value: number) => void;
    togglePizzaTypes: (value: string) => void;
    toggleSizes: (value: string) => void;
    toggleIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams();

    const [selectedIngredients, {toggle: toggleIngredients}] = useSet(new Set<string>(
        searchParams.get('ingredients')?.split(',') || []
    ));

    const [pizzaTypes, {toggle: togglePizzaTypes}] = useSet(
        new Set<string>(searchParams.get('pizzaTypes')?.split(',') || [])
    );

    const [sizes, {toggle: toggleSizes}] = useSet(
        new Set<string>(searchParams.get('sizes')?.split(',') || [])
    );

    const [prices, setPrices] = useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || 0,
        priceTo: Number(searchParams.get('priceTo')) || 1000,
    });

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrices(prev => ({...prev, [name]: value}));
    };

    return {
        sizes,
        prices,
        pizzaTypes,
        selectedIngredients,
        updatePrice,
        togglePizzaTypes,
        toggleSizes,
        toggleIngredients,
    };
}
