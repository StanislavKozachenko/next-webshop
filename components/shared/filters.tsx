'use client'

import React from 'react'
import {Title, RangeSlider, CheckboxFiltersGroup} from "@/components/shared"
import {Input} from "@/components/ui";
import {useIngredients} from "@/hooks/use-ingedients";
import {useFilters} from "@/hooks/use-filters";
import {useQueryFilters} from "@/hooks/use-query-filters";

interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({className}) => {
    const {ingredients, loading} = useIngredients();

    const filters = useFilters();
    useQueryFilters(filters);

    const {
        prices,
        sizes,
        pizzaTypes,
        selectedIngredients,
        togglePizzaTypes,
        toggleSizes,
        updatePrice,
        toggleIngredients
    } = filters;

    const items = ingredients.map((item) => ({
        text: item.name,
        value: String(item.id),
    }));

    return (
        <div className={className}>
            <Title
                text="Фильтрация"
                size="sm"
                className="mb-5 font-bold pb-4 border-b border-b-neutral-100"
            />

            <CheckboxFiltersGroup
                name="pizzaTypes"
                className="mb-5"
                title="Тип теста"
                onClickCheckbox={togglePizzaTypes}
                selected={pizzaTypes}
                items={[
                    {text: 'Тонкое', value: '1'},
                    {text: 'Традиционное', value: '2'},
                ]}
            />

            <CheckboxFiltersGroup
                name="sizes"
                className="mb-5"
                title="Размеры"
                onClickCheckbox={toggleSizes}
                selected={sizes}
                items={[
                    {text: '20 см', value: '20'},
                    {text: '30 см', value: '30'},
                    {text: '40 см', value: '40'},
                ]}
            />

            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        max={30000}
                        value={String(prices.priceFrom)}
                        onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}
                    />
                    <Input
                        type="number"
                        min={100}
                        max={1000}
                        placeholder="1000"
                        value={String(prices.priceTo)}
                        onChange={(e) => updatePrice('priceTo', Number(e.target.value))}
                    />
                </div>

                <RangeSlider
                    min={0}
                    max={1000}
                    step={2}
                    value={[prices.priceFrom || 0, prices.priceTo || 1000]}
                    onValueChange={([priceFrom, priceTo]) => {
                        updatePrice('priceFrom', priceFrom);
                        updatePrice('priceTo', priceTo);
                    }}
                />
            </div>

            <CheckboxFiltersGroup
                title="Ингредиенты"
                name="ingredients"
                className="mt-5"
                limit={6}
                defaultItems={items.slice(0, 6)}
                items={items}
                loading={loading}
                onClickCheckbox={toggleIngredients}
                selected={selectedIngredients}
            />
        </div>
    );
}
