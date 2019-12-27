function IsRequired() {
  throw new Error("param is required");
}
function Func(name = IsRequired()) {
  console.log("I Love " + name);
}
Func(); // "param is required"
Func("You"); // "I Love You"
