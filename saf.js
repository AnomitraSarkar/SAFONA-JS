

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

// safona.entry = builder;
// safona.engine = () => {
//   return Safone(Dislay(), init = builder)
// };
// Safona(BlogPost());
// Safona(Dislay())
// Safona(Component());
// safona.engine(Dislay())
