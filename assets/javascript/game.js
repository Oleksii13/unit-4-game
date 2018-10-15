$(function() {
  $("#reset").click(function() {
    document.location.reload();
  });
  var evil = $("#evil");
  var good = $("#good");
  var hero = $("#hero");
  var enemy = $("#enemy");
  var defence = $("#defence");
  var bool = true;
  var stop = true;
  var counter = 0;
  var arr = ["a", "b", "c"];

  var hpp;

  var youHp;
  var youAp;
  var apInc;
  var hitHp;
  var hitCap;

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

        ap: value.ap,
        cap: value.cap,
        name: value.name,
        side: value.side
      });
      hpp = value.hp;
      var wrapper = $("<p class='wrapper'></p>");
      wrapper.attr("class", arr[counter]);
      counter++;
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
    counter = 0;

    $("h1").text("");
    hero.html("<h1>Your hero:</h1>");
    var img = $("<img>");

    var wrap = $("<p class='wrap'></p>");
    img.attr({
      class: "you",
      src: $(this).attr("src"),

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

    var health = $("<p class='hpHero'>" + hpp + "</p>");
    wrap.appendTo(hero);
    wrap.wrapInner(img);
    health.appendTo(wrap);

    enemy.html("<h1>Enemies available to attack:</h1>");

    if ($(this).attr("class") == "red-force force") {
      character(blue, enemy, "blue-force hit");
    } else if ($(this).attr("class") == "blue-force force") {
      character(red, enemy, "red-force hit");
    }
    // -=====================================================================================

    $(".hit").on("click", function() {
      stop = true;

      if (bool == true) {
        $(this)
          .parent()
          .remove();

        $("#attack").removeClass("hide");
        $("h2").removeClass("hide");
        $(".read").html(" ");

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

        var health = $("<p class='hpEnemy'>" + hpp + "</p>");
        wrapper.appendTo(defence);
        wrapper.wrapInner(img);
        health.appendTo(wrapper);

        bool = false;
      }
      // =+++++++++++++++++++++++++++++++++++==================

      // =========================================================

      // .hit
    });
    $("button").on("click", function(event) {
      if (stop === true) {
        
        var you = $(".you");
        var badBoy = $(".def");
        
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

                  $(".hpEnemy").text(hitHp);

                  if (hitHp <= 0) {
                    stop = false;
                    bool = true;
                    
                    $(".read").html(
                      "You have defeated <span class='sBlue'>" +
                        $(".def").attr("name") +
                        "</span>, you can choose to fight another enemy!"
                    );

                    $("#defence").empty();
                    $("#reset").removeClass("hide");
                  }
                }
              });

              youHp -= hitCap;
              if(hitHp>0){
              $(".read").html(
                "You attacked <span class='sBlue'>" +
                  $(".def").attr("name") +
                  "</span> for " +
                  youAp +
                  " \ndamage!\n<span class='sBlue'>" +
                  $(".def").attr("name") +
                  "</span> attacked you back for " +
                  hitCap +
                  " damage!"
              );
            }
              val.hp = youHp;
              val.ap += apInc;

              $(".hpHero").text(youHp);

              if (youHp <= 0) {
                stop = false;
                $("#reset").removeClass("hide");
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
                  $(".hpEnemy").text(hitHp);

                  if (hitHp <= 0) {
                    stop = false;
                    bool = true;
                    $(".read").html(
                      "You have defeated <span class='sRed'>" +
                        $(".def").attr("name") +
                        "</span>, you can choose to fight another enemy!"
                    );
                    $("#defence").empty();
                    $("#reset").removeClass("hide");
                  }
                }
              });

              youHp -= hitCap;
              if(hitHp>0){
                $(".read").html(
                  "You attacked <span class='sRed'>" +
                    $(".def").attr("name") +
                    "</span> for " +
                    youAp +
                    " \ndamage!\n<span class='sRed'>" +
                    $(".def").attr("name") +
                    "</span> attacked you back for " +
                    hitCap +
                    " damage!"
                );
              }
              value.hp = youHp;
              value.ap += apInc;
              $(".hpHero").text(youHp);

              if (youHp <= 0) {
                stop = false;
                $("#reset").removeClass("hide");
              }
            }
          });
        }
      }
      // button
    });
    // .focus
  });
});
