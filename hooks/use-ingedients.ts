import {useState, useEffect} from "react";
import {Ingredient} from "@prisma/client";
import {Api} from "@/services/api-client";

export const useIngredients = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState(true);

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
    };
}