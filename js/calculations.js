function final_armor(base, agi, tower, aura_armor, reduction) {
  var bonus_armor_tower = tower == 0 ? 0 : tower == 1 ? 1 : 3;
  var armor = base + agi/7 + bonus_armor_tower + aura_armor - reduction;
  return armor;
};

function calc_level_stats(hero, level) {
  // should be an array of [str,agi,int,str_gain,agi_gain,int_gain]
  var base_stats = find_hero_base_stats(hero);
  var new_stats = [
    base_stats[0]+(base_stats[4]*level),
    base_stats[1]+(base_stats[5]*level),
    base_stats[2]+(base_stats[6]*level)
  ];
  // console.log("calc base "+ base_stats);
  return new_stats;
};

function find_hero_base_stats(hero) {
  var base_stats;
  var thisHero;
  $.getJSON("json/heroes.json").done( function(data) {
    $.each(data["DOTAHeroes"], function() {
      this.HeroID == hero ? thisHero = this : null;
    });
    console.log(thisHero || "nein")
    base_stats = [
      parseInt(thisHero.AttributeBaseStrength, 10),
      parseInt(thisHero.AttributeBaseAgility, 10),
      parseInt(thisHero.AttributeBaseIntelligence, 10),
      parseFloat(thisHero.AttributeStrengthGain, 10),
      parseFloat(thisHero.AttributeAgilityGain, 10),
      parseFloat(thisHero.AttributeIntelligenceGain, 10)
    ];
    // console.log("find base "+ base_stats);
    return base_stats;
  });
};
