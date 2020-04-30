for (var i = 0; i < 5; i++) {
  console.log(i);
}

for (var i = 0; i < 5; i++) {
  setTimeout(console.log(i), 1000 * i);
}

for (var i = 0; i < 5; i++) {
  setTimeout(
    (function (i) {
      console.log(i);
    })(i),
    1000 * i
  );
}

for (var i = 0; i < 5; i++) {
  setTimeout(
    (function () {
      console.log(i);
    })(i),
    1000 * i
  );
}

for (var i = 0; i < 5; i++) {
  setTimeout(
    (function (i) {
      return function () {
        console.log(i);
      };
    })(i),
    1000 * i
  );
}

for (var i = 0; i < 5; i++) {
  (function (x) {
    setTimeout(function () {
      console.log(x);
    }, x * 1000);
  })(i);
}
