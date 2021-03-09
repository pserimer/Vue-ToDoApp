const List = require('../models/List');
// Load dependency
var solr = require('solr-client');
// Create a client
//var client = solr.createClient();
var SolrNode = require('solr-node');

var client = new SolrNode({
    host: '127.0.0.1',
    port: '8983',
    core: 'new_core',
    protocol: 'http'
});

class ListServices {
    static async getAllLists ({ user = {}, throwError = true }) {
        let result = await List.query().where('userid','=',user.id);

        if(!result) {
            if(throwError){
                const err = new Error();
                err.statusCode = 404;
                err.message = 'list not found';
                throw err;
            }
        }
        return result;
    };

    static async getOneList ({ listid = {}, throwError = true }) {
        let result = await List.query().findOne({id: listid});
        
        if(!result) {
            if(throwError){
                const err = new Error();
                err.statusCode = 404;
                err.message = 'list is not found';
                throw err;
            }
        }
        return result;
    };

    static async addList ({ list = {} }) {
        return await List.query().insert(list);
    };

    static async updateList ({ list = {}, id = {} }) {
        await List.query().findById(id).patch({listname: list.listname});
    };

    static async deleteOneList ({ listid = {} }) {
        await List.query().delete().where('id','=',listid);
    };

    static async userControl ({ userid = {}, listid = {} }) {
        const list = await this.getOneList({ listid: listid });
        
        if(userid == list.userid){
            return true;
        }
        return false;
    };

    static createIndexForList () {
        client.autoCommit = true;
        var docs = [];
        for(let element in list){
            var doc = {
                id: element.id,
                listname: element.listname,
                userid: element.userid
            }
            docs.push(doc);
        }

        // Add documents
        client.add(docs,function(err,obj){
        if(err){
            console.log(err);
        }else{
            console.log(obj);
        }
        });
         
        // Update document to Solr server
        client.update(data, function(err, result) {
           if (err) {
              console.log(err);
              return;
           }
           console.log('Response:', result.responseHeader);
        });
    }

    static search ({ lllistname = {}, uuuserid = {} }) {
        var objQuery = {listname:lllistname}
        client.search(objQuery, function (err, result) {
            if (err) {
               console.log(err);
               return err;
            }
            console.log(result.response);
            return result.response;
        });
    }
}

module.exports = ListServices;
