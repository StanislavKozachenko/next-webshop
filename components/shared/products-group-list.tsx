'use client'

import React from 'react';
import {useIntersection} from 'react-use';
import {ProductCard} from "@/components/shared/product-card";
import {Title} from "@/components/shared/title";
import {cn} from '@/lib/utils';
import {useCategoryStore} from "@/store/category";

interface Props {
    title: string;
    items: any[];
    listClassName?: string;
    categoryId: number;
    className?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
                                                       title,
                                                       items,
                                                       listClassName,
                                                       categoryId,
                                                       className
                                                   }) => {

    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
    const intersectionRef = React.useRef<HTMLDivElement>(null);

    const intersection = useIntersection(intersectionRef as React.RefObject<HTMLElement>, {
        threshold: 0.4,
    });

    React.useEffect(() => {
        if(intersection?.isIntersecting) {
            setActiveCategoryId(categoryId)
        }
    }, [categoryId, intersection?.isIntersecting, title])

    return (
        <div className={className} id={title}>
            <Title text={title} size="lg" className="font-extrabold mb-5"/>

            <div ref={intersectionRef} className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
                {
                    items.map((item, index) => (
                        <ProductCard
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            price={item.items[0].price}
                            imageUrl={item.imageUrl}
                        />
                    ))
                }
            </div>

        </div>
    );
};