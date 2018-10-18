// I made this program to dirty, a lot of unnecessary moves and bunch of codes. Still does not have 
// good skills with pseudo coding. But I am practising.
// In this program at the beginning I worked mostly with DOM elements, but later TA told me so it is better 
// to work first with JS, and then add DOM, to make it more clear and debuggable.  



$(function() {
  // reset button
  $("#reset").click(function() {
    document.location.reload();
  });
  // played with  sound effect when user attacks and choices the hero and enemies
  var objAttack = document.createElement("audio");
  objAttack.src = "assets/audio/attack.mp3";
  objAttack.volume = 1;
  objAttack.autoPlay = false;
  objAttack.preLoad = true;
  objAttack.controls = true;
  var objStart = document.createElement("audio");
  objStart.src = "assets/audio/start.mp3";
  objStart.volume = 1;
  objStart.autoPlay = false;
  objStart.preLoad = true;
  objStart.controls = true;

  // variables that choose DOM elements
  var evil = $("#evil");
  var good = $("#good");
  var hero = $("#hero");
  var enemy = $("#enemy");
  var defence = $("#defence");

  // variables to check condition for not repeating clicks
  var bool = true;
  var stop = true;
  // With this I am checking if all enemies are defeated
  var counter = 0;
  var arr = ["a", "b", "c"];

  // var for print HP
  var hpp;
  // variables to work with inside Click button event, attack action
  var youHp;
  var youAp;
  var apInc;
  var hitHp;
  var hitCap;

  // object constructor to make characters

  function Char(side, name, img, hp, ap, cap) {
    this.side = side;
    this.name = name;
    this.img = img;
    this.hp = hp;
    this.ap = ap;
    this.cap = cap;
  }

  // object of each character
  var assassin = new Char(
    "red",
    "assassin",
    "assets/images/assassin.jpg",
    110,
    5,
    10
  );

  var maul = new Char("red", "maul", "assets/images/maul.jpg", 150, 3, 7);

  var vader = new Char("red", "vader", "assets/images/vader.jpg", 200, 6, 8);

  var luck = new Char("blue", "luck", "assets/images/luck.jpg", 110, 5, 10);

  var yoda = new Char("blue", "yoda", "assets/images/yoda.jpg", 150, 3, 7);

  var boss = new Char("blue", "boss", "assets/images/boss.jpg", 200, 6, 8);

  // 2 arrays of characters for choosing side

  var red = [assassin, maul, vader];
  var blue = [luck, yoda, boss];

  // repeating action to shows heroes or enemies on the screen

  function character(color, side, select) {
    // checking each array's element depends of what arguments were passed
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
  // calling above function
  character(red, evil, "red-force force");
  character(blue, good, "blue-force force");
  // ========================================================================
  // show character on the screen which one was chosen by user with hp and other attributes
  $(".force").on("click", function() {
    objStart.play();
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
    // user choose enemies whom he wants to attack and then image is showing in another place with all attributes
    $(".hit").on("click", function() {
      objStart.play();
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

    // action when click attack button
    $("button").on("click", function(event) {
      // music on attack
      objAttack.play();
      // check if my hp or enemy  hp more than 0 then we can go further
      if (stop === true) {
        var you = $(".you");
        var badBoy = $(".def");

        // check who is your hero
        // If my hero is red guy

        if ($(".you").attr("side") == "red") {
          $.each(red, function(index, val) {
            if ($(".you").attr("name") == val.name) {
              youHp = val.hp;
              youAp = val.ap;
              apInc = parseInt($(".you").attr("ap"));

              // check who is your enemy
              // inside with click button I update numbers, HP, AP... and print what is going on on the screen

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

                    if ($(".hit").is("img") == false) {
                      $("#reset").removeClass("hide");
                      $(".read").html("You Won!!!  Game Over!!!");
                      $(".defender").addClass("hide");
                    }
                  }
                }
              });

              youHp -= hitCap;
              if (hitHp > 0) {
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
                $(".read").html("You been defeated!!!  Game Over!!!");
                $(".defender").addClass("hide");
              }
            }
          });
        }

        // ++++=========================================================
        // If my hero is blue guy
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

                    if ($(".hit").is("img") == false) {
                      $(".read").html("You Won!!!  Game Over!!!");
                      $("#reset").removeClass("hide");
                      $(".defender").addClass("hide");
                    }
                  }
                }
              });

              youHp -= hitCap;
              if (hitHp > 0) {
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
                $(".read").html("You been defeated!!!  Game Over!!!");
                $(".defender").addClass("hide");
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
