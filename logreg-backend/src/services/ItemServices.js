const Items = require('../models/Items');

class ItemServices {
    static async getAllItemsOfList ({ param = {} }) {
        const result = await Items.query().where({listid: param.listid});
        return result;
    };

    static async addItem ({ item = {} }) {
        return await Items.query().insert(item);
    };

    static async deleteItem ({ param = {} }) {
        await Items.query().delete().where('id','=',param.itemid);
    };

    static async updateItem ({ item = {}, id = {} }) {
        await Items.query().findById(id).patch({itemname: item.itemname});
    };

    static async changeStatus ({ item = {}, id = {} }) {
        await Items.query().findById(id).patch({status: item.status});
    };
}

module.exports = ItemServices;

