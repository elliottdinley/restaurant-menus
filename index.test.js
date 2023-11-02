const { sequelize } = require('./db');
const { Restaurant, Menu, Item } = require('./models/index');
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
    
    test("can associate multiple Menu instances with a Restaurant", async () => {
        const restaurant = await Restaurant.create(seedRestaurant[1]);
        
        const menu1 = await Menu.create(seedMenu[1]);
        const menu2 = await Menu.create(seedMenu[2]);
        
        await restaurant.addMenu(menu1);
        await restaurant.addMenu(menu2);
        
        const associatedMenus = await restaurant.getMenus();
        expect(associatedMenus).toHaveLength(2);
    });
});

describe('Item Model', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });
    
    test('can create a new Item', async () => {
        const newItem = await Item.create({
            name: 'New Item',
            image: 'item.jpg',
            price: 9.99,
            vegetarian: true
        });
        
        expect(newItem.name).toBe('New Item');
        expect(newItem.price).toBe(9.99);
        expect(newItem.vegetarian).toBe(true);
    });
    
    test('can update an Item instance', async () => {
        const itemToUpdate = await Item.findOne({ where: { name: 'New Item' } });
        
        if (itemToUpdate) {
            const updatedItem = await itemToUpdate.update({ price: 12.99 });
            expect(updatedItem.price).toBe(12.99);
        } else {
            expect(true).toBe(false);
        }
    });
    
    test('can delete an Item instance', async () => {
        const itemToDelete = await Item.findOne({ where: { name: 'New Item' } });
        
        if (itemToDelete) {
            await itemToDelete.destroy();
            const deletedItem = await Item.findOne({ where: { name: 'New Item' } });
            expect(deletedItem).toBeNull();
        } else {
            expect(true).toBe(false);
        }
    });
});

describe('Associations', () => {
    test('can associate multiple Item instances with a Menu', async () => {
        const menu = await Menu.create(seedMenu[0]);

        const item1 = await Item.create({
            name: 'Item 1',
            image: 'item1.jpg',
            price: 8.99,
            vegetarian: true
        });
        const item2 = await Item.create({
            name: 'Item 2',
            image: 'item2.jpg',
            price: 11.99,
            vegetarian: false
        });
        
        await menu.addItems([item1, item2]);
        
        const associatedItems = await menu.getItems();
        expect(associatedItems).toHaveLength(2);
    });
});