import React from 'react';
import {ProductCard} from "@/components/shared/product-card";
import {Title} from "@/components/shared/title";
import {cn} from '@/lib/utils'

interface Props {
    title: string;
    items: any[];
    listClassName: string;
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
    return (
        <div className={className}>
            <Title text={title} size="lg" className="font-extrabold mb-5"/>

            <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
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