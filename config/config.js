const config = {
    production: {
        'port' :3000,
        'localdbURL' : 'mongodb://localhost:27017/cafeteria',
        'startingProcessMSJ' : 'Iniciando conexión con base de datos',
        'startedProcessMSJ' : 'Conexión realizada'
    },
    dev: {
        'port' :3000,
        'localdbURL' : 'mongodb://localhost:27017/cafeteria',
        'startingProcessMSJ' : 'Iniciando conexión con base de datos',
        'startedProcessMSJ' : 'Conexión realizada'
    }
};

exports.get = function get(env) {
    return config[env] || config.dev;
};

