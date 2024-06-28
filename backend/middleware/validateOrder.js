export default function validateOrder(req, res, next) {
    req.bodyError = false;
    if (!req.body) 
        req.bodyError = true;
    const order = req.body;
    if (!(order.order && order.user)) 
        req.bodyError = true;

    console.log(req.body);

    next();    
}