const config = {
    production: {
        'port' :3000,
        'localdbURL' : 'mongodb://localhost:27017/cafeteria',
        'startingProcessMSJ' : 'Iniciando conexión con base de datos',
        'startedProcessMSJ' : 'Conexión realizada',
        'secretKey' : 'ITP..passw--request%%app235.tr<<<<e'
    },
    dev: {
        'port' :3000,
        'localdbURL' : 'mongodb://localhost:27017/cafeteria',
        'startingProcessMSJ' : 'Iniciando conexión con base de datos',
        'startedProcessMSJ' : 'Conexión realizada',
        'secretKey' : 'ITP..passw--request%%app235.tr<<<<e'
    }
};

exports.get = function get(env) {
    return config[env] || config.dev;
};




// undraw.co
