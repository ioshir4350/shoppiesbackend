const { networkInterfaces } = require('os');

const getLocalIP = () => {
    const nets = networkInterfaces();
    const results = Object.create(null);

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
    
                results[name].push(net.address);
                return net.address
            }
        }
    }
}

exports.getLocalIP = getLocalIP