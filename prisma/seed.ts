import {hashSync} from 'bcrypt'
import {categories, ingredients, products} from "@/prisma/constants";
import {Prisma} from "@prisma/client";
import {prisma} from "@/prisma/prisma-client";

async function up() {
    await prisma.user.createMany({
        data: [
            {
                fullName: 'User Test',
                email: 'user@test.ru',
                password: hashSync('111111', 10),
                verified: new Date(),
                role: 'USER',
            },
            {
                fullName: 'Admin Admin',
                email: 'admin@test.ru',
                password: hashSync('111111', 10),
                verified: new Date(),
                role: 'ADMIN',
            },
        ],
    })

    await prisma.category.createMany({
        data: categories
    });

    await prisma.ingredient.createMany({
        data: ingredients
    })

    await prisma.product.createMany({
        data: products
    });

    const pizza1 = await prisma.product.create({
        data: {
            name: 'Пепперони фреш',
            imageUrl:
                'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(0, 5),
            },
        },
    });

    const pizza2 = await prisma.product.create({
        data: {
            name: 'Сырная',
            imageUrl:
                'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(5, 10),
            },
        },
    });

    const pizza3 = await prisma.product.create({
        data: {
            name: 'Чоризо фреш',
            imageUrl:
                'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(10, 40),
            },
        },
    });

    const price = () => Math.floor(Math.random() * (600 - 190) + 190);

    const pizzaConfigs = [
        {id: pizza1.id, variants: [[1, 20], [2, 30], [2, 40]]},
        {id: pizza2.id, variants: [[1, 20], [1, 30], [1, 40], [2, 20], [2, 30], [2, 40]]},
        {id: pizza3.id, variants: [[1, 20], [2, 30], [2, 40]]},
    ];

    const data: Prisma.ProductItemUncheckedCreateInput[] = [
        ...pizzaConfigs.flatMap(({id, variants}) =>
            variants.map(([pizzaType, size]) => ({productId: id, pizzaType, size, price: price()}))
        ),

        ...Array.from({length: 17}, (_, i) => ({productId: i + 1, price: price()}))
    ];

    await prisma.productItem.createMany({data});

    await prisma.cart.createMany({
        data: [
            {
                userId: 1,
                totalAmount: 0,
                token: '11111',
            },
            {
                userId: 2,
                totalAmount: 0,
                token: '22222',
            }
        ]
    });

    await prisma.cartItem.create({
        data:
            {
                productItemId: 1,
                cartId: 1,
                quantity: 2,
                ingredients: {
                    connect: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]
                }
            }
    })
}

async function down() {
    const tables = [
        'User',
        'Product',
        'Ingredient',
        'Category',
        'ProductItem',
        'Cart',
        'CartItem'
    ];

    for (const table of tables) {
        await prisma.$executeRawUnsafe(
            `TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE;`
        );
    }
}

async function main() {
    try {
        await down();
        await up();
    } catch (e) {
        console.error(e)
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
