import { start, use } from "./MVC-controller.js";
import { writeFile, readFile } from "fs";

let input = process.argv.slice(3);
const command = process.argv[2];

use("create", function create(input) {
    readFile("./dataBase.json", (err, data) => {
        const newUser = {
            id: crypto.randomUUID(),
            userName: input[0],
            email: input[1],
        };
        if (err) {
            throw err;
        }

        let objValue = JSON.parse(data);
        objValue.users.push(newUser);
        writeFile("./dataBase.json", JSON.stringify(objValue), (err, data) => {
            if (err) {
                throw err;
            }
            console.log("SUCCESS:", data);
        });
    });
});
use("print", function print(input) {
    readFile("./dataBase.json", (err, data) => {
        if (err) throw err;

        let dataUsersForCleanCode = JSON.parse(data);

        let printValue = JSON.stringify(dataUsersForCleanCode.users);
        console.log(printValue);
    });
});
use("sabDA", function sabtDA(input) {
    readFile("./dataBase.json", (err, data) => {
        if (err) throw err;

        let dataUsersForCleanCode = JSON.parse(data);
        const newSabt = {
            id: crypto.randomUUID(),
            mablagh: input[0],
            srcDarAmad: input[1],
            tarikh: input[2],
            description: input[3],
        };
        let objValue = JSON.parse(data);
        objValue.darAmad.push(newSabt);
        writeFile("./dataBase.json", JSON.stringify(objValue), (err, data) => {
            if (err) {
                throw err;
            }
            console.log("SUCCESS:", data);
        });
    });
});
use("sabtHaz", function sbtHaz(input) {
    readFile("./dataBase.json", (err, data) => {
        if (err) throw err;
        let daste = ["food", "HVN", "ghobooz", "kharid", "sargarmi", "sayer"];
        let isUserDasteExist = daste.some((daste) => daste === input[1]);

        if (isUserDasteExist) {
            const newHaz = {
                id: crypto.randomUUID(),
                mablagh: input[0],
                daste: input[1],
                tarikh: input[2],
                description: input[3],
            };
            let objValue = JSON.parse(data);
            objValue.sbtHaz.push(newHaz);
            writeFile("./dataBase.json", JSON.stringify(objValue), (err, data) => {
                if (err) {
                    throw err;
                }
                console.log("SUCCESS:", data);
            });

        } else {
            console.log("daste vojood nadare! do yot want add it to list or no?");

            console.log();


            if (input[0] === 'add') {
                daste.push(input[1]);
                console.log("add to daste or list!");

            } else {
                console.log("ok");

            }
        }
    });
});
start();