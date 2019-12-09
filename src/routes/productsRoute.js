const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/products', function (req, res) {
    //get product catalog.
    connectionPool.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            let resObj = {};
            let responseBody = [];

            resObj.code = 100;
            resObj.message = "Error while retrieving catalog";
            responseBody.push(resObj);
            res.status(500)
            res.send(responseBody).end();
        } else {
            var response = {
                items : []
            }
            var item = {};
            
            /*
            var indexQuery = "CREATE FULLTEXT INDEX XXIBM_PRODUCT_SKU_FTS_INDEX ON XXIBM_PRODUCT_SKU(DESCRIPTION,LONG_DESCRIPTION, SKU_ATTRIBUTE_VALUE1, SKU_ATTRIBUTE_VALUE2)"
            
            connection.query(indexQuery, function(err, res, fields){
                if(err){
                    console.log("Error creating index")
                    console.log(err);
                }else{
                    console.log("Created Index");
                }
            });
            */
          
            //var query = 'select a.item_number, a.description, a.long_description, a.catalogue_category, a.sku_unit_of_measure, a.sku_attribute1, a.sku_attribute_value1, a.sku_attribute2, a.sku_attribute_value2, a.sku_attribute3, a.sku_attribute_value3, b.list_price, b.discount, b.in_stock, c.brand from xxibm_product_sku a, xxibm_product_pricing b, xxibm_product_style c where a.item_number=b.item_number and c.item_number=round(a.item_number/1000) * 1000';
            var query = 'select a.ITEM_NUMBER, a.DESCRIPTION, a.LONG_DESCRIPTION, a.CATALOGUE_CATEGORY, a.SKU_UNIT_OF_MEASURE, a.SKU_ATTRIBUTE1, a.SKU_ATTRIBUTE_VALUE1, a.SKU_ATTRIBUTE2, a.SKU_ATTRIBUTE_VALUE2, a.SKU_ATTRIBUTE3, a.SKU_ATTRIBUTE_VALUE3, b.LIST_PRICE, b.DISCOUNT, b.IN_STOCK, c.BRAND from XXIBM_PRODUCT_SKU a, XXIBM_PRODUCT_PRICING b, XXIBM_PRODUCT_STYLE c where a.ITEM_NUMBER=b.ITEM_NUMBER and c.ITEM_NUMBER=ROUND(a.ITEM_NUMBER/1000) * 1000';
            connection.query(query, function (error, results, fields) {
                
            if(error){
                console.log("Got error executing query");
                console.log(error);
            }
            console.log("Query results...");
            console.log(results);
            
            if(results) {
                Object.keys(results).forEach(function(key) {
                    var row = results[key];
                    if (row) {
                        item.category = {};
                        item.sku = row.ITEM_NUMBER;
                        item.description = row.DESCRIPTION;
                        item.long_description = row.LONG_DESCRIPTION;
                        item.price = row.LIST_PRICE;
                        item.discount = row.DISCOUNT;
                        item.uom = row.SKU_UNIT_OF_MEASURE;
                        item.brand = row.BRAND;
                        item.size = row.SKU_ATTRIBUTE_VALUE1;
                        item.color = row.SKU_ATTRIBUTE_VALUE2;
                        item.in_stock = row.IN_STOCK;
                        item.category.id = row.CATALOGUE_CATEGORY;
                        response.items.push(item);
                        console.log(item);
                        
                        item = {};
                    }

                });
            }
            
            response.total = response.items.length;
            
            connection.release();
            
            var responseObject = {}
            responseObject = response;
            
            res.send(responseObject);        
          });
        }
    });    
});

module.exports = router;
