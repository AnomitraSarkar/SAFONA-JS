console.clear();

engine = {
  connector: root,
  renderer: Safona,
};

function creator(name, ...children) {
  let elem = document.createElement(name);

  elem.setId = function (value) {
    this.setAttribute("id", value);
    return this;
  };
  elem.setClass = function (value) {
    this.setAttribute("class", value);
    return this;
  };
  elem.setAny = function (name, value) {
    this.setAttribute(name, value);
    return this;
  };

  elem.clicked = function (callback) {
    this.onclick = callback;
    return this;
  };

  for (const child of children) {
    if (typeof child == "string") {
      throw new Error(
        "Attempted to Pass String Object, Use Text Wrappers Instead "
      );
    }
    elem.appendChild(child);
  }
  return elem;
}

function div(...children) {
  return creator("div", ...children);
}

function img(src) {
  return creator("img").setAny("src", src);
}

function h1(...children) {
  return creator("h1", ...children);
}
function h2(...children) {
  return creator("h2", ...children);
}
function h3(...children) {
  return creator("h3", ...children);
}

function p(...children) {
  return creator("p", ...children);
}

function span(...children) {
  return creator("span", ...children);
}

function text(str) {
  return document.createTextNode(str);
}

function a(...children) {
  return creator("a", ...children);
}

function canvas(...children) {
  return creator("canvas", ...children);
}

function Safona(appender, init = engine.connector) {
  init.appendChild(appender);
  console.log(init);
}

function tabSwitcher(names, choose) {
  return div(
    ...names.map((name, index) => {
      return span(
        a(text(name))
          .setAny("href", "#")
          .clicked(() => choose(index))
      ).setClass(`tab t${index}`);
    })
  ).setClass("tabelem");
}

function tabs(ts) {
  const names = Object.keys(ts);
  const tags = names.map((name) => ts[name]);

  console.assert(tags.length > 0);

  let currentTab = 0;
  const tabSlot = div(tags[currentTab]);

  return div(
    tabSwitcher(Object.keys(ts), (index) => {
      tabSlot.removeChild(tags[currentTab]);
      tabSlot.appendChild(tags[index]);
      currentTab = index;
    }),
    tabSlot
  );
}

function router(routes) {
  let result = div();
  result.syncHash = function () {
    let hashLocation = document.location.hash.split("#")[1];

    if (!hashLocation) {
      hashLocation = "/";
    }

    if (!(hashLocation in routes)) {
      const route404 = "/404";
      console.assert("/404" in routes);
      hashLocation = route404;
    }
    while (this.firstChild) {
      this.removeChild(this.lastChild);
    }
    this.appendChild(routes[hashLocation]);
  };
  return result;
}

function webglPreview() {
  const previewCanvas = canvas().setAny("width", "112").setAny("height", "112");

  const previewContext = previewCanvas.getContext("2d");
  previewContext.fillStyle = "red";
  previewContext.fillRect(10, 10, 150, 80);

  return div(h1(text("simple webgl component")), previewCanvas);
}

function initRouting(hashContext) {
  hashContext.syncHash();
  window.addEventListener("hashchange", () => {
    hashContext.syncHash();
  });
  Safona(hashContext);
}

window.onload = () => {
  console.log("SAFONA ARENA");
  Safona(text("Saffona Development"));
  const app = router({
    "/": div(
      tabs({
        Component: Component(),
        BlogPost: BlogPost(),
        Dislay: Dislay(),
        foo: text("helo"),
      }),
      a(text("secret base")).setAny("href", "#/secret")
    ),
    "/webgl": webglPreview(),
    "/secret": div(text("This is a secret page what are u doing here bro?")),
    "/404": div(
      text("ERROR PAGE BRO"),
      a(text("go back to home")).setAny("href", "#")
    ),
  });

  initRouting(app);
};
