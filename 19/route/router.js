class MVCRouter {
  constructor(uri_templates) {
    this.uri_templates = [...arguments];
  }
}

class MVC {
  constructor(router, controllers) {
    this.router = router;
    this.controllers = controllers;
    this.use = (req, res, next) => {
      const controller = this.controllers.controllers_map[req.params.controller];
      if (!controller) {
        res.sendStatus(404);
        return;
      }

      const action = controller[req.params.action];
      if (!action) {
        res.sendStatus(404);
        return;
      }

      const method = action[req.method.toLowerCase()];
      if (!method) {
        res.sendStatus(405);
        return;
      }

      method(req, res, next);
    };
  }
}

exports.MVCRouter = MVCRouter;
exports.MVC = MVC;