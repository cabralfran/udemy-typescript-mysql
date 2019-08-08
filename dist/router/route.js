"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router();
router.get('/heroe', (req, resp) => {
    const query = 'select id, nombre, poder from hereos';
    mysql_1.default.ejecutarQuery(query, (err, heroes) => {
        if (err) {
            resp.status(400).json({
                err: true,
                error: err
            });
        }
        else {
            resp.json({
                ok: true,
                heroes
            });
        }
    });
});
router.get('/heroe/:id', (req, resp) => {
    try {
        let id = req.params.id;
        const scapeID = mysql_1.default.instance.connection.escape(id); // para que no envien cosas raras
        // if(!id || !Number(id)){
        //     resp.status(400).json({
        //         err:true,
        //         error:'El id es un parámetro númerico y obligatorio'
        //     });
        // }
        const query = 'select id, nombre, poder from hereos where id =' + scapeID;
        mysql_1.default.ejecutarQuery(query, (err, heroes) => {
            if (err) {
                console.log('asd');
                return resp.status(500).json({
                    err: true,
                    error: err
                });
            }
            else {
                return resp.json({
                    ok: true,
                    heroes
                });
            }
        });
    }
    catch (error) {
        console.log('asd1');
        return resp.status(500).json({
            err: true,
            error: error
        });
    }
});
exports.default = router;
