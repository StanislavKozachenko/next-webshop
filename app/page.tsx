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

        </>
    );
}
