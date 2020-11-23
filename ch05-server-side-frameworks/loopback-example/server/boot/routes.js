//adding routes this way isn’t typical in a LoopBack project
//it may be required for certain unusual API endpoints, but in general, routes are added automatically when models are generated
module.exports = (app) => {
    const router = app.loopback.Router();
    router.get('/hello', (req, res) => {
        res.send('Hello, world');
    });
    app.use(router);
 };