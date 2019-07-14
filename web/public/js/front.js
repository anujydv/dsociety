$('document').ready(function(){
  TweenLite.to($("body"), 0.6, {
    "width":"100vw"

  })
  TweenLite.to($("body"), 0.7, {
    "height":"100vh"
  }).delay(0.5)
})


// Services
var serviceList = [".service-01", ".service-02", ".service-03"];

function serviceoutgoing() {
  TweenLite.to(
    $(this).children()[1],
    0.6, {
      "opacity": "0",
    }
  );
  TweenLite.to(
    $(this).children()[0],
    0.6, {
      yPercent: "0%"
    }
  );
}

function serviceincoming() {
  TweenLite.to(
    $(this).children()[1],
    0.6, {
      opacity: "1",
      display: "block"
    }
  );
  TweenLite.to(
    $(this).children()[0],
    0.6, {
      yPercent: "-20%"
    }
  );
}
$(serviceList.join(",")).hover(serviceincoming,serviceoutgoing);
$(serviceList.join(",")).mouseup(function () {
  if (clicked === 0) {
    $(persons.join(",")).click(serviceincoming);
    clicked += 1;
  } else {
    clicked -= 1;
    $(persons.join(",")).click(serviceoutgoing);
  }
});
// About Us
var persons = [".person-01", ".person-02", ".person-03"]

function incoming() {
  TweenLite.to($(this).children()[0], 0.7, {
    "opacity": 0,
    "display": "none",
    yPercent: "20%"

  });
  TweenLite.to($(this).children()[1], 0.7, {
    "opacity": 1,
    "display": "block"
  })
}

function outgoing() {
  TweenLite.to($(this).children()[0], 0.7, {
    "opacity": 1,
    "display": "block",
    yPercent: "0%"
  });
  TweenLite.to($(this).children()[1], 0.7, {
    "opacity": 0,
    "display": "none"
  })
}
var clicked = 0;
$(persons.join(",")).mouseup(function () {
  if (clicked === 0) {
    $(persons.join(",")).click(incoming);
    clicked += 1;
  } else {
    clicked -= 1;
    $(persons.join(",")).click(outgoing);
  }
});

$(persons.join(",")).mouseenter(function () {
  TweenLite.to($(this).children()[0], 0.4, {
    yPercent: "10%"
  });
})
$(persons.join(",")).mouseleave(function () {
  TweenLite.to($(this).children()[0], 0.4, {
    yPercent: "0%"
  });
})

// Vertical Pages
var width = $(window).width();
TweenLite.to($(".main-view"), 0, {
  x: width,
  display: "block"
})
TweenLite.to($(".main-body"), 0, {
  x: 2 * width,
  display: "block"
});

// Icons
  $(".icons").hover(function(){
    TweenLite.to($(this).children()[0], 0.7, {
    yPercent:'-40%'
  })},
function(){
  TweenLite.to($(this).children()[0], 0.7, {
    yPercent:'0%'
  })
})