$(function() {
  var evil = $("#evil");
  var good = $("#good");
  var hero = $("#hero");
  var enemy = $("#enemy");
  var defence = $("#defence");
  var bool = true;
  var stop = true;

 

  var hpp;

  // var youHp = "";
  // var youAp = "";
  // var inc = "";
  // var hitHp = "";
  // var hitCap = "";

  function Char(side, name, img, hp, ap, cap) {
    this.side = side;
    this.name = name;
    this.img = img;
    this.hp = hp;
    this.ap = ap;
    this.cap = cap;
  }

  var assassin = new Char(
    "red",
    "assassin",
    "assets/images/assassin.jpg",
    150,
    5,
    1
  );

  var maul = new Char("red", "maul", "assets/images/maul.jpg", 250, 5, 1);

  var vader = new Char("red", "vader", "assets/images/vader.jpg", 350, 5, 1);

  var luck = new Char("blue", "luck", "assets/images/luck.jpg", 150, 5, 1);

  var yoda = new Char("blue", "yoda", "assets/images/yoda.jpg", 250, 5, 1);

  var boss = new Char("blue", "boss", "assets/images/boss.jpg", 350, 5, 1);

  var red = [assassin, maul, vader];
  var blue = [luck, yoda, boss];

  function character(color, side, select) {
    $.each(color, function(index, value) {
      var img = $("<img>");
      img.addClass(select);

      img.attr({
        src: value.img,
        // value: value.hp,
        ap: value.ap,
        cap: value.cap,
        name: value.name,
        side: value.side
      });
      hpp = value.hp;
      var wrapper = $("<p class='wrapper'></p>");
      var health = $("<p class='txt'>" + hpp + "</p>");
      wrapper.appendTo(side);
      wrapper.wrapInner(img);
      health.appendTo(wrapper);
    });
  }
  // ------------------------------------------------------------------------
  character(red, evil, "red-force force");
  character(blue, good, "blue-force force");
  // ========================================================================
  $(".force").on("click", function() {
    $(".phase1").empty();

    $("h3").text("");
    hero.html("<h3>Your hero:</h3>");
    var img = $("<img>");

    var wrapper = $("<p class='wrapper'></p>");
    img.attr({
      class: "you",
      src: $(this).attr("src"),
      // value: $(this).attr("value"),
      ap: $(this).attr("ap"),
      cap: $(this).attr("cap"),
      name: $(this).attr("name"),
      side: $(this).attr("side")
    });
    if (img.attr("side") == "red") {
      $.each(red, function(index, vab) {
        if (img.attr("name") == $(this).attr("name")) {
          hpp = vab.hp;
        }
      });
    } else if (img.attr("side") == "blue") {
      $.each(blue, function(index, vab) {
        if (img.attr("name") == $(this).attr("name")) {
          hpp = vab.hp;
        }
      });
    }
    // var value = img.attr("value");

    var health = $("<p class='txt'>" + hpp + "</p>");
    wrapper.appendTo(hero);
    wrapper.wrapInner(img);
    health.appendTo(wrapper);

    enemy.html("<h3>Choose whom to attack:</h3>");

    if ($(this).attr("class") == "red-force force") {
      character(blue, enemy, "blue-force hit");
    } else if ($(this).attr("class") == "blue-force force") {
      character(red, enemy, "red-force hit");
    }
    // -=====================================================================================

    $(".hit").on("click", function() {
      stop = true;

      if (bool == true) {
        $(this).remove();

        $("button").removeClass("hide");

        var img = $("<img>");
        var wrapper = $("<p class='wrapper'></p>");
        img.attr({
          class: $(this).attr("class"),
          src: $(this).attr("src"),

          ap: $(this).attr("ap"),
          cap: $(this).attr("cap"),
          name: $(this).attr("name"),
          side: $(this).attr("side")
        });
        img.attr("class", "def");

        if (img.attr("side") == "red") {
          $.each(red, function(index, vab) {
            if (img.attr("name") == $(this).attr("name")) {
              hpp = vab.hp;
            }
          });
        } else if (img.attr("side") == "blue") {
          $.each(blue, function(index, vab) {
            if (img.attr("name") == $(this).attr("name")) {
              hpp = vab.hp;
            }
          });
        }

        var health = $("<p class='txt'>" + hpp + "</p>");
        wrapper.appendTo(defence);
        wrapper.wrapInner(img);
        health.appendTo(wrapper);

        bool = false;
      }
      // =+++++++++++++++++++++++++++++++++++==================

      // =========================================================
      $("button").on("click", function() {
        if (stop === true) {
          // var you = $(".you");
          // var badBoy = $(".def");
          var youHp;
          var youAp;
          var apInc;
          var hitHp;
          var hitCap;

          if ($(".you").attr("side") == "red") {
            $.each(red, function(index, val) {
              if ($(".you").attr("name") == val.name) {
                youHp = val.hp;
                youAp = val.ap;
                apInc = parseInt($(".you").attr("ap"));

                $.each(blue, function(index, value) {
                  if ($(".def").attr("name") == value.name) {
                    hitHp = value.hp;
                    hitCap = value.cap;
                    hitHp -= youAp;
                    value.hp = hitHp;

                    console.log(hitHp);
                    console.log(hitCap);
                    if (hitHp <= 0) {
                      stop = false;
                      bool = true;

                      $("#defence").empty();
                    }
                  }
                });

                youHp -= hitCap;
                val.hp = youHp;
                val.ap += apInc;

                console.log(youHp);
                console.log(youAp);
                console.log("-----");

                if (youHp <= 0) {
                  stop = false;
                }
              }
            });
          }

          // ++++=========================================================
          else if (you.attr("side") == "blue") {
            $.each(blue, function(index, value) {
              if (you.attr("name") == value.name) {
                youHp = value.hp;
                youAp = value.ap;
                apInc = parseInt(you.attr("ap"));

                $.each(red, function(index, value) {
                  if (badBoy.attr("name") == value.name) {
                    hitHp = value.hp;
                    hitCap = value.cap;
                    hitHp -= youAp;
                    value.hp = hitHp;

                    console.log(hitHp);
                    console.log(hitCap);
                    if (hitHp <= 0) {
                      stop = false;
                      bool = true;
                      $("#defence").empty();
                      console.log(youAp);
                    }
                  }
                });

                youHp -= hitCap;
                value.hp = youHp;
                value.ap += apInc;

                console.log(youHp);
                console.log(youAp);
                console.log("-----");
                if (youHp <= 0) {
                  stop = false;
                }
              }
            });
          }
        } else {
          return false;
        }
      });
    });
  });
});
