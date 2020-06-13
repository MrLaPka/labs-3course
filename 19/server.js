const app = require("express")();
const PORT = 3000;

const router = new (require("./route/router")).MVCRouter(
  "/ller:contro/:action/:p",
  "/:controller/:action"
);
const handlers = require("./handler/handlers");
const controllers = new (require("./controller/controllers")).MVCControllers({
  home: {
    index: {
      get: handlers.getHomeIndex,
      post: handlers.postHomeIndex
    },
    account: {
      get: handlers.getHomeAccount,
      post: handlers.postHomeAccount
    }
  },
  calc: {
    salary: {
      get: handlers.getCalcSalary,
      post: handlers.postCalcSalary
    },
    trans: {
      get: handlers.getCalcTrans,
      post: handlers.postCalcTrans
    }
  },
  get: {
    home: {
      index: {
        get: handlers.getHomeIndex,
        post: handlers.postHomeIndex
      },
      account: {
        get: handlers.getHomeAccount,
        post: handlers.postHomeAccount
      }
    },
    calc: {
      salary: {
        get: handlers.getCalcSalary,
        post: handlers.postCalcSalary
      },
      trans: {
        get: handlers.getCalcTrans,
        post: handlers.postCalcTrans
      }
    }
  },
  post: {
    home: {
      index: {
        get: handlers.getHomeIndex,
        post: handlers.postHomeIndex
      },
      account: {
        get: handlers.getHomeAccount,
        post: handlers.postHomeAccount
      }
    },
    calc: {
      salary: {
        get: handlers.getCalcSalary,
        post: handlers.postCalcSalary
      },
      trans: {
        get: handlers.getCalcTrans,
        post: handlers.postCalcTrans
      }
    }
  }
});
const mvc = new (require("./route/router")).MVC(router, controllers);

app.use(mvc.router.uri_templates, mvc.use);
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
