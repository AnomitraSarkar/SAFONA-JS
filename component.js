

// Create your Components here

function Component() {
  return div(img("img.jpg"), img("img.jpg"), img("img.jpg"));
}

function BlogPost() {
  return div(
    h1(text(`Heading:5 `)),
    p(text("hello my name is anomitra sarkar"))
  );
}

function Dislay() {
  return div(h1(text("my name hola des")).setId("h1boy"));
}

function webglPreview() {
  const previewCanvas = canvas().setAny("width", "112").setAny("height", "112");

  const previewContext = previewCanvas.getContext("2d");
  previewContext.fillStyle = "red";
  previewContext.fillRect(10, 10, 150, 80);

  return div(h1(text("simple webgl component")), previewCanvas);
}

// Router Base
const app = router({
  "/": div(
    //tabbing and navigation
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

// engine reduction
engine.connector = builder // if injection to be changed

Compile = engine.renderer // customizable naming convention

// ADD Components
Safona(h1(text("Saffona Development")));

initRouting(app);
Compile(text("FOOTER"));
