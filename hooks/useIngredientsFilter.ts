'use client'

import {Ingredient} from "@prisma/client";
import React, {useEffect, useState} from "react";
import {Api} from "@/services/api-client";
import {useSet} from "react-use";

interface ReturnProps {
    ingredients: Ingredient[];
    loading: boolean;
    selectedIds: Set<string>;
    onAddId: (id: string) => void;
}

export const useFilterIngredients = (): ReturnProps => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedIds, {toggle}] = useSet(new Set<string>([]));

    useEffect(() => {
        setLoading(true);
        Api.ingredients.getAll()
            .then((data) => {
                setIngredients(data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return {
        ingredients,
        loading,
        onAddId: toggle,
        selectedIds
    };
};