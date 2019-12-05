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

            var errorInfo = errorUtil.validateError(errors.array());
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
          
            var query = 'select a.item_number, a.description, a.long_description, a.catalogue_category, a.sku_unit_of_measure, a.sku_attribute1, a.sku_attribute_value1, a.sku_attribute2, a.sku_attribute_value2, a.sku_attribute3, a.sku_attribute_value3, b.list_price, b.discount, b.in_stock, c.brand from xxibm_product_sku a, xxibm_product_pricing b, xxibm_product_style c where a.item_number=b.item_number and c.item_number=round(a.item_number/1000) * 1000';
            connection.query(query, function (error, results, fields) {
            console.log(results);
            Object.keys(results).forEach(function(key) {
                var row = results[key];
                if (row) {
                    item.category = {};
                    item.sku = row.item_number;
                    item.description = row.description;
                    item.long_description = row.long_description;
                    item.price = row.list_price;
                    item.discount = row.discount;
                    item.uom = row.sku_unit_of_measure;
                    item.brand = row.brand;
                    item.size = row.sku_attribute_value1;
                    item.color = row.sku_attribute_value2;
                    item.in_stock = row.in_stock;
                    item.category.id = row.catalogue_category;
                    item.effective
                    response.items.push(item);
                    console.log(item);
                    
                    item = {};
                }

            });
            
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
