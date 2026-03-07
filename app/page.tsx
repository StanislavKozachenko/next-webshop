import {Container, Title, TopBar, Filters, ProductsGroupList} from "@/components/shared";

export default function Home() {
    return (
        <>
            <Container className="mt-10">
                <Title text="Все пиццы" size="lg" className="font-extrabold"/>

            </Container>

            <TopBar/>

            <Container className="mt-10 pb-14">
                <div className="flex gap-[80px]">

                    {/* Фильтрация */}
                    <div className="w-[250px]">
                        <Filters/>
                    </div>

                    {/* Список товаров */}
                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            <ProductsGroupList
                                title="Пиццы"
                                categoryId={1}
                                items={[
                                    {
                                        id: 1,
                                        name: "Мега Ранч",
                                        imageUrl: "https://media.dodostatic.net/image/r:584x584/019ac618b24778eba506f9bebdae5546.avif",
                                        price: 14.90,
                                        items: [{ price: 14.90 }, { price: 26.90 }, { price: 31.90 }]
                                    },
                                    {
                                        id: 2,
                                        name: "Мега Сырный цыпленок",
                                        imageUrl: "https://media.dodostatic.net/image/r:584x584/019ac61af813785bb3dd96307ff6ef4a.avif",
                                        price: 16.90,
                                        items: [{ price: 16.90 }, { price: 26.90 }, { price: 31.90 }]
                                    },
                                    {
                                        id: 3,
                                        name: "Мега Барбекю",
                                        imageUrl: "https://media.dodostatic.net/image/r:584x584/019b21757d4b7440809316ed7be8844b.avif",
                                        price: 16.90,
                                        items: [{ price: 16.90 }, { price: 26.90 }, { price: 31.90 }]
                                    }
                                ]}
                            />

                            <ProductsGroupList
                                title="Комбо"
                                categoryId={2}
                                items={[
                                    {
                                        id: 1,
                                        name: "Комбо Масала",
                                        imageUrl: "https://media.dodostatic.net/image/r:584x584/019c65cfa535733fac44479e9720eb66.avif",
                                        price: 36.99,
                                        items: [{ price: 36.99 }]
                                    },
                                    {
                                        id: 2,
                                        name: "2 Сытные пиццы 30 см и напиток",
                                        imageUrl: "https://media.dodostatic.net/image/r:584x584/019c41632a84762ea56eda397372f466.avif",
                                        price: 42.99,
                                        items: [{ price: 42.99 }]
                                    },
                                    {
                                        id: 3,
                                        name: "2 Сытные пиццы 30 см и 2 напитка",
                                        imageUrl: "https://media.dodostatic.net/image/r:584x584/019c41640e73748c82268f3d0d4299d3.avif",
                                        price: 45.99,
                                        items: [{ price: 45.99 }]
                                    }
                                ]}
                            />
                        </div>
                    </div>

                </div>
            </Container>
        </>
    );
}
