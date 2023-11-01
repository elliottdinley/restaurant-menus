const { sequelize } = require('./db');
const { Restaurant, Menu } = require('./models/index');
const { seedRestaurant, seedMenu } = require('./seedData');

describe('Restaurant and Menu Models', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    test('can create a new Restaurant', async () => {
        const newRestaurant = await Restaurant.create({
            name: seedRestaurant[0].name,
            location: seedRestaurant[0].location,
            cuisine: seedRestaurant[0].cuisine
        });

        expect(newRestaurant.name).toBe(seedRestaurant[0].name);
    });

    test('can create a new Menu', async () => {
        const newMenu = await Menu.create({
            title: seedMenu[0].title
        });

        expect(newMenu.title).toBe(seedMenu[0].title);
    });

    test('can update a Restaurant instance', async () => {
        const restaurantToUpdate = await Restaurant.findOne({ where: { name: seedRestaurant[0].name } });

        if (restaurantToUpdate) {
            const updatedRestaurant = await restaurantToUpdate.update({ location: 'New Location' });
            expect(updatedRestaurant.location).toBe('New Location');
        } else {
            expect(true).toBe(false);
        }
    });

    test('can update a Menu instance', async () => {
        const menuToUpdate = await Menu.findOne({ where: { title: seedMenu[0].title } });

        if (menuToUpdate) {
            const updatedMenu = await menuToUpdate.update({ title: 'New Title' });
            expect(updatedMenu.title).toBe('New Title');
        } else {
            expect(true).toBe(false);
        }
    });

    test('can delete a Restaurant instance', async () => {
        const restaurantToDelete = await Restaurant.findOne({ where: { name: seedRestaurant[0].name } });

        if (restaurantToDelete) {
            await restaurantToDelete.destroy();
            const deletedRestaurant = await Restaurant.findOne({ where: { name: seedRestaurant[0].name } });
            expect(deletedRestaurant).toBeNull();
        } else {
            expect(true).toBe(false);
        }
    });

    test("can delete a Restaurant instance", async () => {
        const restaurant = await Restaurant.create(seedRestaurant[2]);
        await restaurant.destroy({ force: true });
        const count = await Restaurant.count();
        expect(count).toBe(0);
    });
});