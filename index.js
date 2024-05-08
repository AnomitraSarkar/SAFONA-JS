console.clear();

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

function Safona(appender, init = root) {
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
    tabSwitcher(Object.keys(ts), (index)=>{
      tabSlot.removeChild(tags[currentTab]);
      tabSlot.appendChild(tags[index]);
      currentTab = index;
    }),
    tabSlot
  );
}

window.onload = () => {
  console.log("SAFONA ARENA");

  // Safona(BlogPost);
  Safona(
    tabs({
      Component: Component(),
      BlogPost: BlogPost(),
      Dislay: Dislay(),
      foo: text("helo")
    })
  );
  Safona(text("hello"))

  //   console.log(div(div().setId("child").setClass("animal")));
  //   //   root.appendChild();
  //   //   Safona(div().setClass("c1"))
};
