const { Router } = require('express');
const routes = Router();

routes.get('/default', (req, res) => {return res.status(200).json({ message: 'Router route' })});
routes.post('/toggle-restricted-proxy', (req, res) => {
    const cache = req.app.get('cache');
    let currentValue = cache.get("restrictedProxy");
    if (currentValue === undefined) {
        currentValue = false;
        cache.set("restrictedProxy", currentValue);
    }

    const newValue = !currentValue;
    cache.set("restrictedProxy", newValue);
    console.log({ success: true, restrictedProxy: newValue });

    return res.status(200).json({ success: true, restrictedProxy: newValue });
});
routes.get('/restricted-proxy-status', (req, res) => {
    const cache = req.app.get('cache');
    const currentValue = cache.get("restrictedProxy");
    console.log({ restrictedProxy: currentValue });
    
    return res.status(200).json({ restrictedProxy: currentValue });
});

module.exports = routes;