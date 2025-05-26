let command = process.argv[2];

let input = process.argv.slice(3);

let controllers = []


function use(name, func) {
    let item = {
        command: name,
        function: func
    }

    controllers.push(item);
}

function start() {
    for (let controller of controllers) {
        if (controller.command === command) {
            controller.function(input);
        }
    }
}

export {
    start,
    use
}