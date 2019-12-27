const age = 26;
switch (true) {
  case isNaN(age):
    console.log("not a number");
    break;
  case age < 18:
    console.log("under age");
    break;
  case age >= 18:
    console.log("adult");
    break;
  default:
    console.log("please set your age");
    break;
}
