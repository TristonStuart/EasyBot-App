// Require Discordie
let discordie = require('discordie');
let Events = discordie.Events;
let Client = new discordie();
let hasInit = false;

// API
// Promise Handler
function prom(func, res, rej){
    return new Promise((resolve, reject) => {
        let val = func();
        if (val){
            resolve(res);
        }else {
            reject(rej)
        }
    })
}

// Define system

exports.system = {
    commandList: [],
    command: []
};

// Handle commands. Example : let help = new easybot.command('help', false); help.on= function(msg){msg.reply('Help Page 1')}
exports.command = (name, attributes) => {
    // Needed to put return into a variable
    let RETURN = {attributes : att => {
        return prom(() => {
            if (att){
                exports.system.command[name].attributes[exports.system.command[name].attributes.length] = att
                return true;
            }else {
                return false;
            }
        }, 'Good', 'Error on changing attributes')
    }, on : func => {
        exports.system.command[name].on = func;
    }, realData : () => exports.system.command[name]};

    // Create A Promise and return it
    return prom((resolve, reject) => {


        // Check if command already exists
        for (let i=0; i<exports.system.commandList.length; i++){
            if (exports.system.commandList[i] == name){
                return false
            }
        }
        exports.system.commandList[exports.system.commandList.length] = name;
        if (!attributes) {
            attributes = [];
        }
        exports.system.command[name] = {name : name, attributes : attributes, on : msg => []}
        return true

    }, RETURN, 'Command Already in use') // <= Set RETURN as the value to be handled if promise resolve, or Error if reject
}

// Connect on init, with provided token.
exports.init = (token) => {

    // Create a promise to handle errors.
    return prom(() => {
        // Connect with token
        Client.connect({
            token: token
        });
        return true;
    }, 'Good', 'Error')

}

// Add syntax
exports.syntax = (syntax) => {
    return prom(() => {
        if (syntax){
            exports.system.syntax = String(syntax);
            return true
        }else {
            return false
        }
    }, 'Good', 'No Syntax Provided');
}

// Event Handler
exports.event = {};
// On Connection
Client.Dispatcher.on(Events.GATEWAY_READY, e => {
    // If specified execute connect or log the username
    if (exports.event.connect){

        prom((resolve, reject) => {
            exports.event.connect(Client)
        }).catch(err => console.log(err))
    }else {
        console.log('Connected as ' + Client.User.username)
    }
});

Client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
    // Check if any commands added
    if (exports.system.commandList.length != 0){
        // Check if syntax defined
        if (exports.system.syntax){
            let message = e.message.content;
            let chars = message.split('');
            let params = 0;
            let command = '';
            let parameters = [];
            if (chars[0] == exports.system.syntax){
                for (let i=0; i<chars.length; i++){
                    if (chars[i] == ' '){
                        params++;
                    }
                }
                if (params == 0){
                    command = message.split(exports.system.syntax)[1];
                    for (let i=0; i<exports.system.commandList.length; i++){
                        if (command == exports.system.commandList[i]){
                            if (exports.system.command[command].attributes.length == 0){
                                c_d = {
                                    reply : c__ => e.message.channel.sendMessage(c__),
                                    user : {
                                        mention : e.message.member.mention,
                                        name : e.message.author.name,
                                        id : e.message.author.id
                                    },
                                    raw : e
                                }
                                exports.system.command[command].on(c_d)
                            }else {
                                e.message.channel.sendMessage(e.message.member.mention + '```' + command + ' requires attributes to be called, cancling function execution. |AED|```')
                            }
                        }
                    }
                }else {
                    parameters = message.split(' ');
                    parameters.splice(0, 1);

                }
            }
        }else {
            console.log('Error, command syntax not defined. Example : easybot.syntax("!")')
        }
    }
})
