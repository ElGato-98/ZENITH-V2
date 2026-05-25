const TAU = Math.PI * 2;
const DEG = Math.PI / 180;
const RAD = 180 / Math.PI;

const hms = (h, m = 0, s = 0) => h + m / 60 + s / 3600;
const dms = (d, m = 0, s = 0) => d + (d < 0 ? -1 : 1) * (m / 60 + s / 3600);
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const normDeg = (value) => ((value % 360) + 360) % 360;
const normHours = (value) => ((value % 24) + 24) % 24;
const signedDeg = (value) => ((value + 540) % 360) - 180;
const lerpAngle = (a, b, t) => normDeg(a + signedDeg(b - a) * t);
const astronomyEngine = () => globalThis.Astronomy;

function astronomyObserver() {
  const Astronomy = astronomyEngine();
  if (!Astronomy?.Observer) return null;
  return new Astronomy.Observer(state.lat, state.lon, state.elevation || 0);
}

function astronomyBody(key) {
  const Astronomy = astronomyEngine();
  const names = {
    sun: "Sun",
    moon: "Moon",
    mercury: "Mercury",
    venus: "Venus",
    mars: "Mars",
    jupiter: "Jupiter",
    saturn: "Saturn",
    uranus: "Uranus",
    neptune: "Neptune",
    pluto: "Pluto"
  };
  const name = names[key];
  return Astronomy?.Body?.[name] || name;
}

const STARS = [
  { id: "sirius", name: "Sirius", ra: hms(6, 45, 9), dec: dms(-16, 42, 58), mag: -1.46, color: "#bde8ff", constellation: "Canis Major" },
  { id: "canopus", name: "Canopus", ra: hms(6, 23, 57), dec: dms(-52, 41, 44), mag: -0.74, color: "#fff0d0", constellation: "Carina" },
  { id: "arcturus", name: "Arcturus", ra: hms(14, 15, 39), dec: dms(19, 10, 57), mag: -0.05, color: "#ffd09c", constellation: "Bouvier" },
  { id: "vega", name: "Vega", ra: hms(18, 36, 56), dec: dms(38, 47, 1), mag: 0.03, color: "#dcecff", constellation: "Lyre" },
  { id: "capella", name: "Capella", ra: hms(5, 16, 41), dec: dms(45, 59, 53), mag: 0.08, color: "#fff2ba", constellation: "Cocher" },
  { id: "rigel", name: "Rigel", ra: hms(5, 14, 32), dec: dms(-8, 12, 6), mag: 0.13, color: "#b8d8ff", constellation: "Orion" },
  { id: "procyon", name: "Procyon", ra: hms(7, 39, 18), dec: dms(5, 13, 30), mag: 0.34, color: "#f8fbff", constellation: "Petit Chien" },
  { id: "betelgeuse", name: "Betelgeuse", ra: hms(5, 55, 10), dec: dms(7, 24, 25), mag: 0.42, color: "#ff9866", constellation: "Orion" },
  { id: "achernar", name: "Achernar", ra: hms(1, 37, 43), dec: dms(-57, 14, 12), mag: 0.46, color: "#bde5ff", constellation: "Eridan" },
  { id: "hadar", name: "Hadar", ra: hms(14, 3, 49), dec: dms(-60, 22, 23), mag: 0.61, color: "#b8dbff", constellation: "Centaure" },
  { id: "altair", name: "Altair", ra: hms(19, 50, 47), dec: dms(8, 52, 6), mag: 0.77, color: "#ecf5ff", constellation: "Aigle" },
  { id: "acrux", name: "Acrux", ra: hms(12, 26, 35), dec: dms(-63, 5, 57), mag: 0.76, color: "#c5e5ff", constellation: "Croix du Sud" },
  { id: "aldebaran", name: "Aldebaran", ra: hms(4, 35, 55), dec: dms(16, 30, 33), mag: 0.86, color: "#ffb36d", constellation: "Taureau" },
  { id: "spica", name: "Spica", ra: hms(13, 25, 12), dec: dms(-11, 9, 41), mag: 0.98, color: "#cbdfff", constellation: "Vierge" },
  { id: "antares", name: "Antares", ra: hms(16, 29, 24), dec: dms(-26, 25, 55), mag: 1.06, color: "#ff7b55", constellation: "Scorpion" },
  { id: "pollux", name: "Pollux", ra: hms(7, 45, 19), dec: dms(28, 1, 34), mag: 1.14, color: "#ffd7a5", constellation: "Gémeaux" },
  { id: "fomalhaut", name: "Fomalhaut", ra: hms(22, 57, 39), dec: dms(-29, 37, 20), mag: 1.16, color: "#edf6ff", constellation: "Poisson Austral" },
  { id: "deneb", name: "Deneb", ra: hms(20, 41, 26), dec: dms(45, 16, 49), mag: 1.25, color: "#dbeaff", constellation: "Cygne" },
  { id: "regulus", name: "Regulus", ra: hms(10, 8, 22), dec: dms(11, 58, 2), mag: 1.35, color: "#d8e8ff", constellation: "Lion" },
  { id: "adhara", name: "Adhara", ra: hms(6, 58, 37), dec: dms(-28, 58, 20), mag: 1.5, color: "#c7e5ff", constellation: "Canis Major" },
  { id: "castor", name: "Castor", ra: hms(7, 34, 36), dec: dms(31, 53, 18), mag: 1.58, color: "#f2f7ff", constellation: "Gémeaux" },
  { id: "gacrux", name: "Gacrux", ra: hms(12, 31, 10), dec: dms(-57, 6, 47), mag: 1.63, color: "#ffb980", constellation: "Croix du Sud" },
  { id: "bellatrix", name: "Bellatrix", ra: hms(5, 25, 8), dec: dms(6, 20, 59), mag: 1.64, color: "#c8e2ff", constellation: "Orion" },
  { id: "elnath", name: "Elnath", ra: hms(5, 26, 18), dec: dms(28, 36, 27), mag: 1.65, color: "#dbeaff", constellation: "Taureau" },
  { id: "alnilam", name: "Alnilam", ra: hms(5, 36, 12), dec: dms(-1, 12, 7), mag: 1.69, color: "#bfdcff", constellation: "Orion" },
  { id: "alnitak", name: "Alnitak", ra: hms(5, 40, 45), dec: dms(-1, 56, 34), mag: 1.74, color: "#b9dcff", constellation: "Orion" },
  { id: "mintaka", name: "Mintaka", ra: hms(5, 32, 0), dec: -dms(0, 17, 57), mag: 2.23, color: "#d5e8ff", constellation: "Orion" },
  { id: "saiph", name: "Saiph", ra: hms(5, 47, 45), dec: dms(-9, 40, 11), mag: 2.06, color: "#b8d8ff", constellation: "Orion" },
  { id: "meissa", name: "Meissa", ra: hms(5, 35, 8), dec: dms(9, 56, 3), mag: 3.39, color: "#d5e8ff", constellation: "Orion" },
  { id: "polaris", name: "Polaris", ra: hms(2, 31, 49), dec: dms(89, 15, 51), mag: 1.98, color: "#fff3cf", constellation: "Petite Ourse" },
  { id: "kochab", name: "Kochab", ra: hms(14, 50, 43), dec: dms(74, 9, 20), mag: 2.08, color: "#ffd8a8", constellation: "Petite Ourse" },
  { id: "pherkad", name: "Pherkad", ra: hms(15, 20, 43), dec: dms(71, 50, 2), mag: 3.05, color: "#f5f8ff", constellation: "Petite Ourse" },
  { id: "dubhe", name: "Dubhe", ra: hms(11, 3, 43), dec: dms(61, 45, 3), mag: 1.79, color: "#ffd5a2", constellation: "Grande Ourse" },
  { id: "merak", name: "Merak", ra: hms(11, 1, 51), dec: dms(56, 22, 57), mag: 2.37, color: "#d9e9ff", constellation: "Grande Ourse" },
  { id: "phecda", name: "Phecda", ra: hms(11, 53, 49), dec: dms(53, 41, 41), mag: 2.44, color: "#d9e9ff", constellation: "Grande Ourse" },
  { id: "megrez", name: "Megrez", ra: hms(12, 15, 25), dec: dms(57, 1, 57), mag: 3.31, color: "#e7f0ff", constellation: "Grande Ourse" },
  { id: "alioth", name: "Alioth", ra: hms(12, 54, 1), dec: dms(55, 57, 35), mag: 1.76, color: "#dcecff", constellation: "Grande Ourse" },
  { id: "mizar", name: "Mizar", ra: hms(13, 23, 56), dec: dms(54, 55, 31), mag: 2.23, color: "#dcecff", constellation: "Grande Ourse" },
  { id: "alkaid", name: "Alkaid", ra: hms(13, 47, 32), dec: dms(49, 18, 48), mag: 1.85, color: "#cfe6ff", constellation: "Grande Ourse" },
  { id: "caph", name: "Caph", ra: hms(0, 9, 11), dec: dms(59, 8, 59), mag: 2.27, color: "#f5f8ff", constellation: "Cassiopée" },
  { id: "schedar", name: "Schedar", ra: hms(0, 40, 30), dec: dms(56, 32, 14), mag: 2.24, color: "#ffcd98", constellation: "Cassiopée" },
  { id: "gamma-cas", name: "Navi", ra: hms(0, 56, 42), dec: dms(60, 43, 0), mag: 2.15, color: "#c9e3ff", constellation: "Cassiopée" },
  { id: "ruchbah", name: "Ruchbah", ra: hms(1, 25, 49), dec: dms(60, 14, 7), mag: 2.68, color: "#d9e9ff", constellation: "Cassiopée" },
  { id: "segin", name: "Segin", ra: hms(1, 54, 24), dec: dms(63, 40, 12), mag: 3.35, color: "#dbeaff", constellation: "Cassiopée" },
  { id: "denebola", name: "Denebola", ra: hms(11, 49, 4), dec: dms(14, 34, 19), mag: 2.14, color: "#e6f2ff", constellation: "Lion" },
  { id: "algieba", name: "Algieba", ra: hms(10, 19, 58), dec: dms(19, 50, 30), mag: 2.28, color: "#ffd4a2", constellation: "Lion" },
  { id: "zosma", name: "Zosma", ra: hms(11, 14, 6), dec: dms(20, 31, 25), mag: 2.56, color: "#f3f7ff", constellation: "Lion" },
  { id: "alpheratz", name: "Alpheratz", ra: hms(0, 8, 23), dec: dms(29, 5, 26), mag: 2.07, color: "#d8e8ff", constellation: "Andromède" },
  { id: "mirach", name: "Mirach", ra: hms(1, 9, 44), dec: dms(35, 37, 14), mag: 2.05, color: "#ffbe89", constellation: "Andromède" },
  { id: "almach", name: "Almach", ra: hms(2, 3, 54), dec: dms(42, 19, 47), mag: 2.1, color: "#ffd49c", constellation: "Andromède" },
  { id: "markab", name: "Markab", ra: hms(23, 4, 46), dec: dms(15, 12, 19), mag: 2.49, color: "#dcecff", constellation: "Pégase" },
  { id: "scheat", name: "Scheat", ra: hms(23, 3, 46), dec: dms(28, 4, 58), mag: 2.42, color: "#ffba85", constellation: "Pégase" },
  { id: "algenib", name: "Algenib", ra: hms(0, 13, 14), dec: dms(15, 11, 1), mag: 2.83, color: "#cfe6ff", constellation: "Pégase" },
  { id: "enif", name: "Enif", ra: hms(21, 44, 11), dec: dms(9, 52, 30), mag: 2.39, color: "#ffbd88", constellation: "Pégase" },
  { id: "mirfak", name: "Mirfak", ra: hms(3, 24, 19), dec: dms(49, 51, 40), mag: 1.79, color: "#fff1cf", constellation: "Persée" },
  { id: "algol", name: "Algol", ra: hms(3, 8, 10), dec: dms(40, 57, 20), mag: 2.09, color: "#cfe6ff", constellation: "Persée" },
  { id: "hamal", name: "Hamal", ra: hms(2, 7, 10), dec: dms(23, 27, 45), mag: 2.0, color: "#ffd2a0", constellation: "Bélier" },
  { id: "sheratan", name: "Sheratan", ra: hms(1, 54, 38), dec: dms(20, 48, 29), mag: 2.64, color: "#f6fbff", constellation: "Bélier" },
  { id: "diphda", name: "Diphda", ra: hms(0, 43, 35), dec: dms(-17, 59, 12), mag: 2.04, color: "#ffcf9a", constellation: "Baleine" },
  { id: "sadr", name: "Sadr", ra: hms(20, 22, 14), dec: dms(40, 15, 24), mag: 2.23, color: "#fff2d2", constellation: "Cygne" },
  { id: "gienah-cyg", name: "Gienah", ra: hms(20, 46, 13), dec: dms(33, 58, 13), mag: 2.48, color: "#ffcf9b", constellation: "Cygne" },
  { id: "delta-cyg", name: "Delta Cygni", ra: hms(19, 44, 58), dec: dms(45, 7, 50), mag: 2.87, color: "#dcecff", constellation: "Cygne" },
  { id: "albireo", name: "Albireo", ra: hms(19, 30, 43), dec: dms(27, 57, 35), mag: 3.05, color: "#ffcc91", constellation: "Cygne" },
  { id: "sheliak", name: "Sheliak", ra: hms(18, 50, 5), dec: dms(33, 21, 45), mag: 3.45, color: "#d7e8ff", constellation: "Lyre" },
  { id: "sulafat", name: "Sulafat", ra: hms(18, 58, 56), dec: dms(32, 41, 22), mag: 3.24, color: "#cfe6ff", constellation: "Lyre" },
  { id: "tarazed", name: "Tarazed", ra: hms(19, 46, 16), dec: dms(10, 36, 47), mag: 2.72, color: "#ffb67c", constellation: "Aigle" },
  { id: "alshain", name: "Alshain", ra: hms(19, 55, 19), dec: dms(6, 24, 24), mag: 3.71, color: "#fff4d5", constellation: "Aigle" },
  { id: "shaula", name: "Shaula", ra: hms(17, 33, 36), dec: dms(-37, 6, 13), mag: 1.62, color: "#b9dcff", constellation: "Scorpion" },
  { id: "sargas", name: "Sargas", ra: hms(17, 37, 19), dec: dms(-42, 59, 52), mag: 1.87, color: "#fff1cc", constellation: "Scorpion" },
  { id: "dschubba", name: "Dschubba", ra: hms(16, 0, 20), dec: dms(-22, 37, 18), mag: 2.32, color: "#d9e9ff", constellation: "Scorpion" },
  { id: "graffias", name: "Graffias", ra: hms(16, 5, 26), dec: dms(-19, 48, 20), mag: 2.56, color: "#dcecff", constellation: "Scorpion" },
  { id: "kaus-australis", name: "Kaus Australis", ra: hms(18, 24, 10), dec: dms(-34, 23, 5), mag: 1.79, color: "#bfe0ff", constellation: "Sagittaire" },
  { id: "nunki", name: "Nunki", ra: hms(18, 55, 15), dec: dms(-26, 17, 48), mag: 2.05, color: "#c7e5ff", constellation: "Sagittaire" },
  { id: "kaus-media", name: "Kaus Media", ra: hms(18, 20, 0), dec: dms(-29, 49, 42), mag: 2.7, color: "#ffd3a1", constellation: "Sagittaire" },
  { id: "kaus-borealis", name: "Kaus Borealis", ra: hms(18, 27, 58), dec: dms(-25, 25, 18), mag: 2.82, color: "#ffcf9a", constellation: "Sagittaire" },
  { id: "ascella", name: "Ascella", ra: hms(19, 2, 37), dec: dms(-29, 52, 49), mag: 2.6, color: "#d8e8ff", constellation: "Sagittaire" },
  { id: "alhena", name: "Alhena", ra: hms(6, 37, 43), dec: dms(16, 23, 57), mag: 1.93, color: "#dbeaff", constellation: "Gémeaux" },
  { id: "wasat", name: "Wasat", ra: hms(7, 20, 7), dec: dms(21, 58, 56), mag: 3.53, color: "#fff5d8", constellation: "Gémeaux" },
  { id: "menkalinan", name: "Menkalinan", ra: hms(5, 59, 32), dec: dms(44, 56, 51), mag: 1.9, color: "#dbeaff", constellation: "Cocher" },
  { id: "maia", name: "Maia", ra: hms(3, 45, 49), dec: dms(24, 22, 3), mag: 3.87, color: "#c8e4ff", constellation: "Taureau" },
  { id: "electra", name: "Electra", ra: hms(3, 44, 52), dec: dms(24, 6, 48), mag: 3.7, color: "#c8e4ff", constellation: "Taureau" },
  { id: "alphard", name: "Alphard", ra: hms(9, 27, 35), dec: dms(-8, 39, 31), mag: 1.98, color: "#ffbd87", constellation: "Hydre" },
  { id: "rasalhague", name: "Rasalhague", ra: hms(17, 34, 56), dec: dms(12, 33, 36), mag: 2.07, color: "#f3f7ff", constellation: "Ophiuchus" },
  { id: "menkent", name: "Menkent", ra: hms(14, 6, 41), dec: dms(-36, 22, 12), mag: 2.06, color: "#ffd09c", constellation: "Centaure" }
];

const CONSTELLATIONS = [
  { name: "Orion", color: "#ff9a3d", lines: [["meissa", "betelgeuse"], ["meissa", "bellatrix"], ["betelgeuse", "alnitak"], ["bellatrix", "mintaka"], ["mintaka", "alnilam"], ["alnilam", "alnitak"], ["alnitak", "saiph"], ["mintaka", "rigel"], ["rigel", "saiph"]] },
  { name: "Grande Ourse", color: "#62ff6e", lines: [["dubhe", "merak"], ["merak", "phecda"], ["phecda", "megrez"], ["megrez", "dubhe"], ["megrez", "alioth"], ["alioth", "mizar"], ["mizar", "alkaid"]] },
  { name: "Petite Ourse", color: "#62ff6e", lines: [["polaris", "kochab"], ["kochab", "pherkad"]] },
  { name: "Cassiopée", color: "#37d8ff", lines: [["caph", "schedar"], ["schedar", "gamma-cas"], ["gamma-cas", "ruchbah"], ["ruchbah", "segin"]] },
  { name: "Cygne", color: "#37d8ff", lines: [["deneb", "sadr"], ["sadr", "albireo"], ["sadr", "gienah-cyg"], ["sadr", "delta-cyg"]] },
  { name: "Lyre", color: "#d7e548", lines: [["vega", "sheliak"], ["vega", "sulafat"], ["sheliak", "sulafat"]] },
  { name: "Aigle", color: "#d7e548", lines: [["tarazed", "altair"], ["altair", "alshain"]] },
  { name: "Scorpion", color: "#ff4fad", lines: [["graffias", "dschubba"], ["dschubba", "antares"], ["antares", "shaula"], ["shaula", "sargas"]] },
  { name: "Sagittaire", color: "#ff9a3d", lines: [["kaus-borealis", "kaus-media"], ["kaus-media", "kaus-australis"], ["kaus-australis", "ascella"], ["ascella", "nunki"], ["nunki", "kaus-borealis"]] },
  { name: "Taureau", color: "#ff9a3d", lines: [["aldebaran", "elnath"], ["aldebaran", "maia"], ["maia", "electra"]] },
  { name: "Gémeaux", color: "#37d8ff", lines: [["castor", "pollux"], ["pollux", "wasat"], ["wasat", "alhena"]] },
  { name: "Lion", color: "#d7e548", lines: [["regulus", "algieba"], ["algieba", "zosma"], ["zosma", "denebola"]] },
  { name: "Pégase", color: "#37d8ff", lines: [["markab", "scheat"], ["scheat", "alpheratz"], ["alpheratz", "algenib"], ["algenib", "markab"], ["markab", "enif"]] },
  { name: "Andromède", color: "#ff4fad", lines: [["alpheratz", "mirach"], ["mirach", "almach"]] },
  { name: "Persée", color: "#ff9a3d", lines: [["mirfak", "algol"], ["algol", "almach"]] },
  { name: "Canis Major", color: "#37d8ff", lines: [["sirius", "adhara"]] },
  { name: "Croix du Sud", color: "#62ff6e", lines: [["acrux", "gacrux"]] }
];

const MESSIER = [
  { id: "m1", name: "M1", title: "Nébuleuse du Crabe", type: "Rémanent", ra: hms(5, 34, 31), dec: dms(22, 0, 52), mag: 8.4 },
  { id: "m2", name: "M2", title: "Amas du Verseau", type: "Amas globulaire", ra: hms(21, 33, 27), dec: -dms(0, 49, 24), mag: 6.5 },
  { id: "m3", name: "M3", title: "Amas des Chiens", type: "Amas globulaire", ra: hms(13, 42, 11), dec: dms(28, 22, 38), mag: 6.2 },
  { id: "m4", name: "M4", title: "Amas du Scorpion", type: "Amas globulaire", ra: hms(16, 23, 35), dec: dms(-26, 31, 32), mag: 5.6 },
  { id: "m5", name: "M5", title: "Amas du Serpent", type: "Amas globulaire", ra: hms(15, 18, 33), dec: dms(2, 4, 58), mag: 5.7 },
  { id: "m6", name: "M6", title: "Amas du Papillon", type: "Amas ouvert", ra: hms(17, 40, 20), dec: dms(-32, 13, 12), mag: 4.2 },
  { id: "m7", name: "M7", title: "Amas de Ptolémée", type: "Amas ouvert", ra: hms(17, 53, 51), dec: dms(-34, 47, 34), mag: 3.3 },
  { id: "m8", name: "M8", title: "Nébuleuse de la Lagune", type: "Nébuleuse", ra: hms(18, 3, 42), dec: dms(-24, 23, 12), mag: 6.0 },
  { id: "m11", name: "M11", title: "Amas du Canard Sauvage", type: "Amas ouvert", ra: hms(18, 51, 5), dec: dms(-6, 16, 12), mag: 6.3 },
  { id: "m13", name: "M13", title: "Grand amas d'Hercule", type: "Amas globulaire", ra: hms(16, 41, 42), dec: dms(36, 27, 37), mag: 5.8 },
  { id: "m15", name: "M15", title: "Amas de Pégase", type: "Amas globulaire", ra: hms(21, 29, 58), dec: dms(12, 10, 1), mag: 6.2 },
  { id: "m16", name: "M16", title: "Nébuleuse de l'Aigle", type: "Nébuleuse", ra: hms(18, 18, 48), dec: dms(-13, 47, 0), mag: 6.0 },
  { id: "m17", name: "M17", title: "Nébuleuse Oméga", type: "Nébuleuse", ra: hms(18, 20, 47), dec: dms(-16, 10, 36), mag: 6.0 },
  { id: "m20", name: "M20", title: "Nébuleuse Trifide", type: "Nébuleuse", ra: hms(18, 2, 20), dec: dms(-23, 1, 48), mag: 6.3 },
  { id: "m22", name: "M22", title: "Amas du Sagittaire", type: "Amas globulaire", ra: hms(18, 36, 24), dec: dms(-23, 54, 17), mag: 5.1 },
  { id: "m24", name: "M24", title: "Nuage stellaire", type: "Champ stellaire", ra: hms(18, 16, 56), dec: dms(-18, 33, 0), mag: 4.6 },
  { id: "m27", name: "M27", title: "Nébuleuse de l'Haltère", type: "Nébuleuse planétaire", ra: hms(19, 59, 36), dec: dms(22, 43, 16), mag: 7.4 },
  { id: "m31", name: "M31", title: "Galaxie d'Andromède", type: "Galaxie", ra: hms(0, 42, 44), dec: dms(41, 16, 9), mag: 3.4 },
  { id: "m32", name: "M32", title: "Satellite d'Andromède", type: "Galaxie", ra: hms(0, 42, 42), dec: dms(40, 51, 55), mag: 8.1 },
  { id: "m33", name: "M33", title: "Galaxie du Triangle", type: "Galaxie", ra: hms(1, 33, 51), dec: dms(30, 39, 37), mag: 5.7 },
  { id: "m35", name: "M35", title: "Amas des Gémeaux", type: "Amas ouvert", ra: hms(6, 8, 54), dec: dms(24, 20, 0), mag: 5.1 },
  { id: "m36", name: "M36", title: "Amas du Cocher", type: "Amas ouvert", ra: hms(5, 36, 12), dec: dms(34, 8, 24), mag: 6.3 },
  { id: "m37", name: "M37", title: "Amas du Cocher", type: "Amas ouvert", ra: hms(5, 52, 19), dec: dms(32, 33, 12), mag: 6.2 },
  { id: "m38", name: "M38", title: "Amas du Cocher", type: "Amas ouvert", ra: hms(5, 28, 43), dec: dms(35, 51, 18), mag: 7.4 },
  { id: "m41", name: "M41", title: "Amas sous Sirius", type: "Amas ouvert", ra: hms(6, 46, 0), dec: dms(-20, 45, 24), mag: 4.5 },
  { id: "m42", name: "M42", title: "Nébuleuse d'Orion", type: "Nébuleuse", ra: hms(5, 35, 17), dec: dms(-5, 23, 28), mag: 4.0 },
  { id: "m44", name: "M44", title: "Amas de la Crèche", type: "Amas ouvert", ra: hms(8, 40, 24), dec: dms(19, 40, 18), mag: 3.7 },
  { id: "m45", name: "M45", title: "Pléiades", type: "Amas ouvert", ra: hms(3, 47, 29), dec: dms(24, 6, 18), mag: 1.6 },
  { id: "m46", name: "M46", title: "Amas de la Poupe", type: "Amas ouvert", ra: hms(7, 41, 46), dec: dms(-14, 48, 36), mag: 6.0 },
  { id: "m47", name: "M47", title: "Amas de la Poupe", type: "Amas ouvert", ra: hms(7, 36, 32), dec: dms(-14, 29, 0), mag: 4.4 },
  { id: "m50", name: "M50", title: "Amas de la Licorne", type: "Amas ouvert", ra: hms(7, 2, 45), dec: dms(-8, 20, 12), mag: 5.9 },
  { id: "m51", name: "M51", title: "Galaxie du Tourbillon", type: "Galaxie", ra: hms(13, 29, 53), dec: dms(47, 11, 43), mag: 8.4 },
  { id: "m57", name: "M57", title: "Nébuleuse de l'Anneau", type: "Nébuleuse planétaire", ra: hms(18, 53, 35), dec: dms(33, 1, 45), mag: 8.8 },
  { id: "m63", name: "M63", title: "Galaxie du Tournesol", type: "Galaxie", ra: hms(13, 15, 49), dec: dms(42, 1, 45), mag: 8.6 },
  { id: "m64", name: "M64", title: "Galaxie de l'Oeil Noir", type: "Galaxie", ra: hms(12, 56, 44), dec: dms(21, 41, 0), mag: 8.5 },
  { id: "m65", name: "M65", title: "Triplet du Lion", type: "Galaxie", ra: hms(11, 18, 55), dec: dms(13, 5, 32), mag: 10.3 },
  { id: "m66", name: "M66", title: "Triplet du Lion", type: "Galaxie", ra: hms(11, 20, 15), dec: dms(12, 59, 30), mag: 8.9 },
  { id: "m67", name: "M67", title: "Amas du Cancer", type: "Amas ouvert", ra: hms(8, 51, 18), dec: dms(11, 48, 0), mag: 6.1 },
  { id: "m81", name: "M81", title: "Galaxie de Bode", type: "Galaxie", ra: hms(9, 55, 33), dec: dms(69, 3, 55), mag: 6.9 },
  { id: "m82", name: "M82", title: "Galaxie du Cigare", type: "Galaxie", ra: hms(9, 55, 52), dec: dms(69, 40, 47), mag: 8.4 },
  { id: "m92", name: "M92", title: "Amas d'Hercule", type: "Amas globulaire", ra: hms(17, 17, 7), dec: dms(43, 8, 11), mag: 6.4 },
  { id: "m94", name: "M94", title: "Galaxie des Chiens", type: "Galaxie", ra: hms(12, 50, 53), dec: dms(41, 7, 12), mag: 8.2 },
  { id: "m95", name: "M95", title: "Galaxie du Lion", type: "Galaxie", ra: hms(10, 43, 57), dec: dms(11, 42, 14), mag: 9.7 },
  { id: "m96", name: "M96", title: "Galaxie du Lion", type: "Galaxie", ra: hms(10, 46, 45), dec: dms(11, 49, 12), mag: 9.2 },
  { id: "m97", name: "M97", title: "Nébuleuse du Hibou", type: "Nébuleuse planétaire", ra: hms(11, 14, 48), dec: dms(55, 1, 9), mag: 9.9 },
  { id: "m101", name: "M101", title: "Galaxie du Moulinet", type: "Galaxie", ra: hms(14, 3, 13), dec: dms(54, 20, 57), mag: 7.9 },
  { id: "m104", name: "M104", title: "Galaxie du Sombrero", type: "Galaxie", ra: hms(12, 39, 59), dec: dms(-11, 37, 23), mag: 8.0 },
  { id: "m106", name: "M106", title: "Galaxie des Chiens", type: "Galaxie", ra: hms(12, 18, 58), dec: dms(47, 18, 14), mag: 8.4 },
  { id: "m108", name: "M108", title: "Galaxie de la Grande Ourse", type: "Galaxie", ra: hms(11, 11, 31), dec: dms(55, 40, 23), mag: 10.0 },
  { id: "m109", name: "M109", title: "Galaxie de la Grande Ourse", type: "Galaxie", ra: hms(11, 57, 36), dec: dms(53, 22, 28), mag: 9.8 },
  { id: "m110", name: "M110", title: "Satellite d'Andromède", type: "Galaxie", ra: hms(0, 40, 22), dec: dms(41, 41, 7), mag: 8.1 }
];

const PLANET_ELEMENTS = {
  mercury: { name: "Mercure", color: "#d8d4c8", mag: -0.2, N: [48.3313, 3.24587e-5], i: [7.0047, 5e-8], w: [29.1241, 1.01444e-5], a: [0.387098, 0], e: [0.205635, 5.59e-10], M: [168.6562, 4.0923344368] },
  venus: { name: "Vénus", color: "#ffe6ac", mag: -4.1, N: [76.6799, 2.4659e-5], i: [3.3946, 2.75e-8], w: [54.891, 1.38374e-5], a: [0.72333, 0], e: [0.006773, -1.302e-9], M: [48.0052, 1.6021302244] },
  mars: { name: "Mars", color: "#ff7a45", mag: -1.0, N: [49.5574, 2.11081e-5], i: [1.8497, -1.78e-8], w: [286.5016, 2.92961e-5], a: [1.523688, 0], e: [0.093405, 2.516e-9], M: [18.6021, 0.5240207766] },
  jupiter: { name: "Jupiter", color: "#ffe1b2", mag: -2.2, N: [100.4542, 2.76854e-5], i: [1.303, -1.557e-7], w: [273.8777, 1.64505e-5], a: [5.20256, 0], e: [0.048498, 4.469e-9], M: [19.895, 0.0830853001] },
  saturn: { name: "Saturne", color: "#f5d37a", mag: 0.6, N: [113.6634, 2.3898e-5], i: [2.4886, -1.081e-7], w: [339.3939, 2.97661e-5], a: [9.55475, 0], e: [0.055546, -9.499e-9], M: [316.967, 0.0334442282] },
  uranus: { name: "Uranus", color: "#91f4ff", mag: 5.7, N: [74.0005, 1.3978e-5], i: [0.7733, 1.9e-8], w: [96.6612, 3.0565e-5], a: [19.18171, -1.55e-8], e: [0.047318, 7.45e-9], M: [142.5905, 0.011725806] },
  neptune: { name: "Neptune", color: "#7194ff", mag: 7.8, N: [131.7806, 3.0173e-5], i: [1.77, -2.55e-7], w: [272.8461, -6.027e-6], a: [30.05826, 3.313e-8], e: [0.008606, 2.15e-9], M: [260.2471, 0.005995147] },
  earth: { name: "Terre", N: [0, 0], i: [0, 0], w: [282.9404, 4.70935e-5], a: [1, 0], e: [0.016709, -1.151e-9], M: [356.047, 0.9856002585] }
};

const SOLAR_SYSTEM_BODIES = [
  { id: "sun", name: "Soleil", type: "Étoile", color: "#fff0a0", glow: "#ffcc3d", mag: -26.7 },
  { id: "moon", name: "Lune", type: "Satellite", color: "#f5f0dc", glow: "#dcecff", mag: -12.6 },
  { id: "mercury", name: "Mercure", type: "Planète", color: "#d8d4c8", glow: "#d8d4c8", mag: -0.2 },
  { id: "venus", name: "Vénus", type: "Planète", color: "#ffe6ac", glow: "#ffe6ac", mag: -4.1 },
  { id: "mars", name: "Mars", type: "Planète", color: "#ff7a45", glow: "#ff7a45", mag: -1.0 },
  { id: "jupiter", name: "Jupiter", type: "Planète", color: "#ffe1b2", glow: "#ffe1b2", mag: -2.2 },
  { id: "saturn", name: "Saturne", type: "Planète", color: "#f5d37a", glow: "#f5d37a", mag: 0.6 },
  { id: "uranus", name: "Uranus", type: "Planète", color: "#91f4ff", glow: "#91f4ff", mag: 5.7 },
  { id: "neptune", name: "Neptune", type: "Planète", color: "#7194ff", glow: "#7194ff", mag: 7.8 },
  { id: "pluto", name: "Pluton", type: "Planète naine", color: "#cdb9a1", glow: "#cdb9a1", mag: 14.2 }
];

const starById = new Map(STARS.map((star) => [star.id, star]));

const state = {
  mode: "map",
  lat: 50.8503,
  lon: 4.3517,
  elevation: 0,
  placeLabel: "Bruxelles",
  centerAz: 180,
  centerAlt: 45,
  targetAz: 180,
  targetAlt: 45,
  sensorAz: 180,
  sensorAlt: 45,
  rawSensorAz: 180,
  rawSensorAlt: 45,
  sensorOffset: 0,
  sensorAltOffset: 0,
  hasSensorReading: false,
  aligned: false,
  fov: 82,
  live: true,
  time: new Date(),
  selectedId: "sun",
  followId: null,
  showLabels: true,
  showMessier: true,
  sensorsActive: false,
  cameraActive: false,
  cameraStream: null,
  lastBodies: [],
  lastFrame: 0,
  usingAstronomyEngine: false,
  dpr: 1,
  dragging: false,
  dragStart: null,
  status: "Carte gnomonique"
};

const els = {
  canvas: document.getElementById("skyCanvas"),
  video: document.getElementById("cameraFeed"),
  statusChip: document.getElementById("statusChip"),
  azValue: document.getElementById("azValue"),
  altValue: document.getElementById("altValue"),
  fovValue: document.getElementById("fovValue"),
  catalogPanel: document.querySelector(".catalog-panel"),
  search: document.getElementById("searchInput"),
  results: document.getElementById("searchResults"),
  objectCard: document.getElementById("objectCard"),
  liveTimeBtn: document.getElementById("liveTimeBtn"),
  alignBtn: document.getElementById("alignBtn"),
  labelsBtn: document.getElementById("labelsBtn"),
  messierBtn: document.getElementById("messierBtn")
};

const ctx = els.canvas.getContext("2d", { alpha: true });

function valueAt(pair, d) {
  return pair[0] + pair[1] * d;
}

function julianDate(date) {
  return date.getTime() / 86400000 + 2440587.5;
}

function gmstHours(jd) {
  const T = (jd - 2451545.0) / 36525;
  const theta = 280.46061837 + 360.98564736629 * (jd - 2451545) + 0.000387933 * T * T - (T * T * T) / 38710000;
  return normDeg(theta) / 15;
}

function horizontalFromEquatorial(raHours, decDeg, date = state.time) {
  const Astronomy = astronomyEngine();
  const observer = astronomyObserver();
  if (Astronomy?.Horizon && observer) {
    try {
      const horizontal = Astronomy.Horizon(date, observer, raHours, decDeg, "normal");
      return {
        az: normDeg(horizontal.azimuth),
        alt: horizontal.altitude
      };
    } catch (error) {
      state.status = "Astronomy fallback";
    }
  }

  const jd = julianDate(date);
  const lst = normHours(gmstHours(jd) + state.lon / 15);
  const hourAngle = signedDeg((lst - raHours) * 15) * DEG;
  const dec = decDeg * DEG;
  const lat = state.lat * DEG;
  const sinAlt = Math.sin(dec) * Math.sin(lat) + Math.cos(dec) * Math.cos(lat) * Math.cos(hourAngle);
  const alt = Math.asin(clamp(sinAlt, -1, 1));
  const cosAlt = Math.max(0.00001, Math.cos(alt));
  const sinAz = (-Math.cos(dec) * Math.sin(hourAngle)) / cosAlt;
  const cosAz = (Math.sin(dec) - Math.sin(alt) * Math.sin(lat)) / (cosAlt * Math.cos(lat));
  const az = Math.atan2(sinAz, cosAz);
  return { az: normDeg(az * RAD), alt: alt * RAD };
}

function heliocentricPosition(key, d) {
  const elements = PLANET_ELEMENTS[key];
  const N = valueAt(elements.N, d) * DEG;
  const i = valueAt(elements.i, d) * DEG;
  const w = valueAt(elements.w, d) * DEG;
  const a = valueAt(elements.a, d);
  const e = valueAt(elements.e, d);
  const M = normDeg(valueAt(elements.M, d)) * DEG;

  let E = M;
  for (let k = 0; k < 8; k += 1) {
    E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
  }

  const xv = a * (Math.cos(E) - e);
  const yv = a * Math.sqrt(1 - e * e) * Math.sin(E);
  const v = Math.atan2(yv, xv);
  const r = Math.hypot(xv, yv);
  const vw = v + w;

  return {
    x: r * (Math.cos(N) * Math.cos(vw) - Math.sin(N) * Math.sin(vw) * Math.cos(i)),
    y: r * (Math.sin(N) * Math.cos(vw) + Math.cos(N) * Math.sin(vw) * Math.cos(i)),
    z: r * (Math.sin(vw) * Math.sin(i)),
    r
  };
}

function eclipticToEquatorialFromVector(x, y, z, jd) {
  const T = (jd - 2451545.0) / 36525;
  const eps = (23.439291 - 0.0130042 * T) * DEG;
  const xe = x;
  const ye = y * Math.cos(eps) - z * Math.sin(eps);
  const ze = y * Math.sin(eps) + z * Math.cos(eps);
  const ra = normDeg(Math.atan2(ye, xe) * RAD) / 15;
  const dec = Math.atan2(ze, Math.hypot(xe, ye)) * RAD;
  return { ra, dec };
}

function eclipticLonLatToEquatorial(lonDeg, latDeg, jd) {
  const lon = lonDeg * DEG;
  const lat = latDeg * DEG;
  const x = Math.cos(lon) * Math.cos(lat);
  const y = Math.sin(lon) * Math.cos(lat);
  const z = Math.sin(lat);
  return eclipticToEquatorialFromVector(x, y, z, jd);
}

function sunPosition(jd) {
  const n = jd - 2451545.0;
  const L = normDeg(280.46646 + 0.98564736 * n);
  const g = normDeg(357.52911 + 0.98560028 * n) * DEG;
  const lon = L + 1.914602 * Math.sin(g) + 0.019993 * Math.sin(2 * g);
  return eclipticLonLatToEquatorial(lon, 0, jd);
}

function moonPosition(jd) {
  const d = jd - 2451543.5;
  const N = normDeg(125.1228 - 0.0529538083 * d) * DEG;
  const i = 5.1454 * DEG;
  const w = normDeg(318.0634 + 0.1643573223 * d) * DEG;
  const a = 60.2666;
  const e = 0.0549;
  const M = normDeg(115.3654 + 13.0649929509 * d) * DEG;

  let E = M;
  for (let k = 0; k < 8; k += 1) {
    E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
  }

  const xv = a * (Math.cos(E) - e);
  const yv = a * Math.sqrt(1 - e * e) * Math.sin(E);
  const v = Math.atan2(yv, xv);
  const r = Math.hypot(xv, yv);
  const vw = v + w;
  const xh = r * (Math.cos(N) * Math.cos(vw) - Math.sin(N) * Math.sin(vw) * Math.cos(i));
  const yh = r * (Math.sin(N) * Math.cos(vw) + Math.cos(N) * Math.sin(vw) * Math.cos(i));
  const zh = r * (Math.sin(vw) * Math.sin(i));

  return eclipticToEquatorialFromVector(xh, yh, zh, jd);
}

function planetPosition(key, jd) {
  const d = jd - 2451543.5;
  const earth = heliocentricPosition("earth", d);
  const planet = heliocentricPosition(key, d);
  return eclipticToEquatorialFromVector(planet.x - earth.x, planet.y - earth.y, planet.z - earth.z, jd);
}

function angularSeparation(aRa, aDec, bRa, bDec) {
  const ra1 = aRa * 15 * DEG;
  const ra2 = bRa * 15 * DEG;
  const dec1 = aDec * DEG;
  const dec2 = bDec * DEG;
  const cosD = Math.sin(dec1) * Math.sin(dec2) + Math.cos(dec1) * Math.cos(dec2) * Math.cos(ra1 - ra2);
  return Math.acos(clamp(cosD, -1, 1)) * RAD;
}

function makeAstronomySolarBodies(date) {
  const Astronomy = astronomyEngine();
  const observer = astronomyObserver();
  if (!Astronomy?.Equator || !Astronomy?.Horizon || !observer) return null;

  try {
    return SOLAR_SYSTEM_BODIES.map((meta) => {
      const equator = Astronomy.Equator(astronomyBody(meta.id), date, observer, true, true);
      const horizon = Astronomy.Horizon(date, observer, equator.ra, equator.dec, "normal");
      let mag = meta.mag;
      let phase = meta.id === "moon" ? 0.5 : undefined;

      if (Astronomy.Illumination) {
        try {
          const light = Astronomy.Illumination(astronomyBody(meta.id), date);
          if (Number.isFinite(light?.mag)) mag = light.mag;
          if (meta.id === "moon" && Number.isFinite(light?.phase_fraction)) phase = light.phase_fraction;
        } catch (error) {
          // Illumination is visual metadata; keep the ephemeris result.
        }
      }

      return {
        ...meta,
        key: meta.id,
        ra: equator.ra,
        dec: equator.dec,
        az: normDeg(horizon.azimuth),
        alt: horizon.altitude,
        mag,
        phase
      };
    });
  } catch (error) {
    state.status = "Astronomy fallback";
    return null;
  }
}

function makeFallbackSolarBodies(jd) {
  const sun = sunPosition(jd);
  const moon = moonPosition(jd);
  const elongation = angularSeparation(moon.ra, moon.dec, sun.ra, sun.dec);
  const phase = (1 - Math.cos(elongation * DEG)) / 2;
  const bodies = [
    { id: "sun", key: "sun", name: "Soleil", type: "Étoile", ra: sun.ra, dec: sun.dec, mag: -26.7, color: "#fff0a0", glow: "#ffcc3d" },
    { id: "moon", key: "moon", name: "Lune", type: "Satellite", ra: moon.ra, dec: moon.dec, mag: -12.6, color: "#f5f0dc", glow: "#dcecff", phase }
  ];
  for (const key of ["mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune"]) {
    const planet = planetPosition(key, jd);
    bodies.push({
      id: key,
      key,
      name: PLANET_ELEMENTS[key].name,
      type: "Planète",
      ra: planet.ra,
      dec: planet.dec,
      mag: PLANET_ELEMENTS[key].mag,
      color: PLANET_ELEMENTS[key].color,
      glow: PLANET_ELEMENTS[key].color
    });
  }
  return bodies;
}

function withHorizontal(body, type) {
  if (Number.isFinite(body.az) && Number.isFinite(body.alt)) {
    return { ...body, key: body.key || body.id, type: body.type || type };
  }
  const horizontal = horizontalFromEquatorial(body.ra, body.dec, state.time);
  return { ...body, ...horizontal, key: body.key || body.id, type: body.type || type };
}

function composeBodies() {
  const jd = julianDate(state.time);
  const stars = STARS.map((star) => withHorizontal(star, "Étoile"));
  const messier = state.showMessier
    ? MESSIER.map((object) => withHorizontal({ ...object, key: object.id, color: "#d7e548" }, object.type))
    : [];
  const astronomySolar = makeAstronomySolarBodies(state.time);
  state.usingAstronomyEngine = Boolean(astronomySolar);
  const solar = (astronomySolar || makeFallbackSolarBodies(jd)).map((body) => withHorizontal(body, body.type));
  state.lastBodies = [...solar, ...stars, ...messier];
  return { stars, messier, solar };
}

function vectorFromAzAlt(azDeg, altDeg) {
  const az = azDeg * DEG;
  const alt = altDeg * DEG;
  return [
    Math.cos(alt) * Math.sin(az),
    Math.cos(alt) * Math.cos(az),
    Math.sin(alt)
  ];
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function projectionBasis() {
  const az = state.centerAz * DEG;
  const alt = state.centerAlt * DEG;
  return {
    center: vectorFromAzAlt(state.centerAz, state.centerAlt),
    right: [Math.cos(az), -Math.sin(az), 0],
    up: [-Math.sin(alt) * Math.sin(az), -Math.sin(alt) * Math.cos(az), Math.cos(alt)]
  };
}

function project(az, alt) {
  const basis = projectionBasis();
  const v = vectorFromAzAlt(az, alt);
  const den = dot(v, basis.center);
  if (den <= 0.035) return null;
  const scale = Math.min(els.canvas.clientWidth, els.canvas.clientHeight) / (2 * Math.tan((state.fov * DEG) / 2));
  const x = els.canvas.clientWidth / 2 + (dot(v, basis.right) / den) * scale;
  const y = els.canvas.clientHeight / 2 - (dot(v, basis.up) / den) * scale;
  const margin = 84;
  if (x < -margin || x > els.canvas.clientWidth + margin || y < -margin || y > els.canvas.clientHeight + margin) return null;
  return { x, y, den };
}

function resizeCanvas() {
  const rect = els.canvas.getBoundingClientRect();
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  if (els.canvas.width !== Math.round(rect.width * dpr) || els.canvas.height !== Math.round(rect.height * dpr)) {
    els.canvas.width = Math.round(rect.width * dpr);
    els.canvas.height = Math.round(rect.height * dpr);
    state.dpr = dpr;
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawBackground(width, height) {
  if (state.mode === "ar" && state.cameraActive) {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.16)";
    ctx.fillRect(0, 0, width, height);
    return;
  }
  ctx.fillStyle = "#020204";
  ctx.fillRect(0, 0, width, height);
  const gradient = ctx.createLinearGradient(0, height * 0.2, width, height * 0.72);
  gradient.addColorStop(0, "rgba(55, 216, 255, 0.045)");
  gradient.addColorStop(0.48, "rgba(255, 79, 173, 0.035)");
  gradient.addColorStop(1, "rgba(215, 229, 72, 0.03)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

function drawGnomonicGrid() {
  const gridColor = state.mode === "ar" && state.cameraActive ? "rgba(98, 255, 110, 0.42)" : "rgba(98, 255, 110, 0.24)";
  ctx.save();
  ctx.lineWidth = 1;
  ctx.strokeStyle = gridColor;
  ctx.setLineDash([2, 7]);

  for (let alt = -15; alt <= 75; alt += 15) {
    drawSampledLine(Array.from({ length: 145 }, (_, index) => ({ az: index * 2.5, alt })));
  }

  ctx.setLineDash([6, 9]);
  for (let az = 0; az < 360; az += 30) {
    drawSampledLine(Array.from({ length: 53 }, (_, index) => ({ az, alt: -12 + index * 2 })));
  }
  ctx.restore();

  const horizon = Array.from({ length: 181 }, (_, index) => ({ az: index * 2, alt: 0 }));
  ctx.save();
  ctx.strokeStyle = "rgba(255, 154, 61, 0.42)";
  ctx.lineWidth = 1.1;
  ctx.setLineDash([]);
  drawSampledLine(horizon);
  ctx.restore();

  for (const cardinal of [
    ["N", 0],
    ["E", 90],
    ["S", 180],
    ["O", 270]
  ]) {
    const p = project(cardinal[1], 0);
    if (!p) continue;
    drawLabel(cardinal[0], p.x, p.y - 10, "#62ff6e", true);
  }
}

function drawSampledLine(points) {
  let drawing = false;
  ctx.beginPath();
  for (const point of points) {
    const p = project(point.az, point.alt);
    if (!p) {
      drawing = false;
      continue;
    }
    if (!drawing) {
      ctx.moveTo(p.x, p.y);
      drawing = true;
    } else {
      ctx.lineTo(p.x, p.y);
    }
  }
  ctx.stroke();
}

function drawConstellations(stars) {
  const byId = new Map(stars.map((star) => [star.id, star]));
  ctx.save();
  ctx.lineWidth = 1.15;
  ctx.globalCompositeOperation = "screen";
  for (const constellation of CONSTELLATIONS) {
    ctx.strokeStyle = `${constellation.color}aa`;
    ctx.shadowColor = constellation.color;
    ctx.shadowBlur = 8;
    for (const [aId, bId] of constellation.lines) {
      const a = byId.get(aId);
      const b = byId.get(bId);
      if (!a || !b) continue;
      const pa = project(a.az, a.alt);
      const pb = project(b.az, b.alt);
      if (!pa || !pb) continue;
      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.lineTo(pb.x, pb.y);
      ctx.stroke();
    }
  }
  ctx.restore();
}

function drawStar(star) {
  const p = project(star.az, star.alt);
  if (!p) return null;
  const twinkle = 0.72 + 0.28 * Math.sin(performance.now() / 720 + star.ra * 1.9);
  const radius = clamp(3.7 - star.mag * 0.62, 0.75, 4.8) * twinkle;
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.fillStyle = star.color || "#fff";
  ctx.shadowColor = star.color || "#fff";
  ctx.shadowBlur = radius * 3.3;
  ctx.beginPath();
  ctx.arc(p.x, p.y, radius, 0, TAU);
  ctx.fill();
  if (star.mag < 1.2) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(255,255,255,0.82)";
    ctx.beginPath();
    ctx.moveTo(p.x - radius * 2.3, p.y);
    ctx.lineTo(p.x + radius * 2.3, p.y);
    ctx.moveTo(p.x, p.y - radius * 2.3);
    ctx.lineTo(p.x, p.y + radius * 2.3);
    ctx.stroke();
  }
  ctx.restore();
  return p;
}

function drawMessier(object) {
  const p = project(object.az, object.alt);
  if (!p) return null;
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.strokeStyle = "rgba(215, 229, 72, 0.78)";
  ctx.shadowColor = "#d7e548";
  ctx.shadowBlur = 7;
  ctx.lineWidth = 1;
  const r = clamp(6.8 - object.mag * 0.28, 3.2, 6);
  ctx.beginPath();
  ctx.moveTo(p.x - r, p.y);
  ctx.lineTo(p.x + r, p.y);
  ctx.moveTo(p.x, p.y - r);
  ctx.lineTo(p.x, p.y + r);
  ctx.stroke();
  ctx.setLineDash([2, 3]);
  ctx.beginPath();
  ctx.arc(p.x, p.y, r + 2, 0, TAU);
  ctx.stroke();
  ctx.restore();
  return p;
}

function drawSolarBody(body) {
  const p = project(body.az, body.alt);
  if (!p) return null;
  const radius = body.id === "sun" ? 13 : body.id === "moon" ? 10 : clamp(7 - body.mag * 0.7, 3.6, 9);
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 5.5);
  glow.addColorStop(0, `${body.glow}ee`);
  glow.addColorStop(0.32, `${body.glow}44`);
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(p.x, p.y, radius * 5.5, 0, TAU);
  ctx.fill();

  if (body.id === "moon") {
    ctx.fillStyle = body.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, radius, 0, TAU);
    ctx.fill();
    ctx.globalCompositeOperation = "source-atop";
    ctx.fillStyle = "rgba(2,2,4,0.62)";
    const phaseOffset = (body.phase - 0.5) * radius * 2;
    ctx.beginPath();
    ctx.ellipse(p.x + phaseOffset, p.y, radius * (1 - Math.abs(body.phase - 0.5) * 0.65), radius, 0, 0, TAU);
    ctx.fill();
  } else if (body.id === "saturn") {
    ctx.strokeStyle = "rgba(245, 211, 122, 0.84)";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.ellipse(p.x, p.y, radius * 1.8, radius * 0.52, -0.22, 0, TAU);
    ctx.stroke();
    ctx.fillStyle = body.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, radius, 0, TAU);
    ctx.fill();
  } else {
    ctx.fillStyle = body.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, radius, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
  return p;
}

function drawLabel(text, x, y, color = "#fff", centered = false) {
  ctx.save();
  ctx.font = "500 12px Inter, system-ui, sans-serif";
  ctx.textBaseline = "middle";
  ctx.textAlign = centered ? "center" : "left";
  ctx.fillStyle = color;
  ctx.shadowColor = "#020204";
  ctx.shadowBlur = 8;
  ctx.fillText(text, x + (centered ? 0 : 10), y);
  ctx.restore();
}

function drawReticle() {
  const x = els.canvas.clientWidth / 2;
  const y = els.canvas.clientHeight / 2;
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.strokeStyle = state.mode === "ar" ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.38)";
  ctx.lineWidth = 1.2;
  ctx.setLineDash([1, 8]);
  ctx.beginPath();
  ctx.arc(x, y, 36, 0, TAU);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(x - 56, y);
  ctx.lineTo(x - 18, y);
  ctx.moveTo(x + 18, y);
  ctx.lineTo(x + 56, y);
  ctx.moveTo(x, y - 56);
  ctx.lineTo(x, y - 18);
  ctx.moveTo(x, y + 18);
  ctx.lineTo(x, y + 56);
  ctx.stroke();
  ctx.restore();
}

function drawSelected(body) {
  const p = project(body.az, body.alt);
  if (!p) return;
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.strokeStyle = "#ff4fad";
  ctx.shadowColor = "#ff4fad";
  ctx.shadowBlur = 12;
  ctx.lineWidth = 1.4;
  ctx.setLineDash([7, 5]);
  ctx.beginPath();
  ctx.arc(p.x, p.y, 22, 0, TAU);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(p.x, p.y);
  ctx.lineTo(els.canvas.clientWidth / 2, els.canvas.clientHeight / 2);
  ctx.strokeStyle = "rgba(255,79,173,0.34)";
  ctx.stroke();
  ctx.restore();
}

function drawFrame(now) {
  resizeCanvas();
  if (state.live) state.time = new Date();

  if ((state.mode === "sensor" || state.mode === "ar") && state.sensorsActive) {
    state.centerAz = lerpAngle(state.centerAz, state.sensorAz, 0.16);
    state.centerAlt += (state.sensorAlt - state.centerAlt) * 0.16;
  } else if (state.followId) {
    const target = state.lastBodies.find((body) => body.key === state.followId || body.id === state.followId);
    if (target) {
      state.centerAz = lerpAngle(state.centerAz, target.az, 0.08);
      state.centerAlt += (target.alt - state.centerAlt) * 0.08;
    }
  }

  const width = els.canvas.clientWidth;
  const height = els.canvas.clientHeight;
  drawBackground(width, height);
  const { stars, messier, solar } = composeBodies();

  drawGnomonicGrid();
  drawConstellations(stars);

  const labelCandidates = [];
  for (const object of messier) {
    const p = drawMessier(object);
    if (p && (object.mag < 6.2 || object.key === state.selectedId)) labelCandidates.push([object, p]);
  }
  for (const star of stars) {
    const p = drawStar(star);
    if (p && (star.mag < 1.65 || star.key === state.selectedId)) labelCandidates.push([star, p]);
  }
  for (const body of solar) {
    const p = drawSolarBody(body);
    if (p) labelCandidates.push([body, p]);
  }

  const selected = state.lastBodies.find((body) => body.key === state.selectedId || body.id === state.selectedId);
  if (selected) drawSelected(selected);

  if (state.showLabels) {
    for (const [body, p] of labelCandidates) {
      const label = body.title ? `${body.name}` : body.name;
      drawLabel(label, p.x, p.y - 14, body.color || "#fff");
    }
  }
  drawReticle();

  updateTelemetry();
  if (!state.lastFrame || now - state.lastFrame > 550) {
    updateObjectCard(selected);
    state.lastFrame = now;
  }
  requestAnimationFrame(drawFrame);
}

function updateTelemetry() {
  els.azValue.textContent = `${Math.round(state.centerAz)}°`;
  els.altValue.textContent = `${Math.round(state.centerAlt)}°`;
  els.fovValue.textContent = `${Math.round(state.fov)}°`;
  els.statusChip.textContent = state.status;
  document.body.classList.toggle("camera-active", state.cameraActive && state.mode === "ar");
  document.body.classList.toggle("sensor-active", state.sensorsActive);
  document.body.classList.toggle("astronomy-engine", Boolean(astronomyEngine()?.Equator));
  document.body.classList.toggle("astronomy-active", state.usingAstronomyEngine);
  document.body.classList.toggle("aligned", state.aligned);
}

function updateObjectCard(body) {
  if (!body) {
    els.objectCard.innerHTML = `<h2>Zénith</h2><p>${state.placeLabel} · ${formatDate(state.time)}</p>`;
    return;
  }
  const title = body.title ? `${body.name} · ${body.title}` : body.name;
  els.objectCard.innerHTML = `
    <h2>${title}</h2>
    <p>${body.type}${body.constellation ? ` · ${body.constellation}` : ""}</p>
    <dl>
      <div><dt>Azimut</dt><dd>${body.az.toFixed(1)}°</dd></div>
      <div><dt>Hauteur</dt><dd>${body.alt.toFixed(1)}°</dd></div>
      <div><dt>AD</dt><dd>${formatRa(body.ra)}</dd></div>
      <div><dt>Déc.</dt><dd>${body.dec.toFixed(1)}°</dd></div>
      <div><dt>Mag.</dt><dd>${Number.isFinite(body.mag) ? body.mag.toFixed(1) : "—"}</dd></div>
      <div><dt>Temps</dt><dd>${formatDate(state.time, true)}</dd></div>
    </dl>
  `;
}

function formatRa(ra) {
  const h = Math.floor(normHours(ra));
  const m = Math.floor((normHours(ra) - h) * 60);
  return `${h}h ${String(m).padStart(2, "0")}m`;
}

function formatDate(date, short = false) {
  return new Intl.DateTimeFormat("fr-BE", {
    hour: "2-digit",
    minute: "2-digit",
    ...(short ? {} : { day: "2-digit", month: "short" })
  }).format(date);
}

function searchItems() {
  const solar = SOLAR_SYSTEM_BODIES.map((body) => ({ key: body.id, name: body.name, type: body.type }));
  const stars = STARS.map((star) => ({ key: star.id, name: star.name, type: star.constellation || "Étoile" }));
  const messier = MESSIER.map((object) => ({ key: object.id, name: `${object.name} ${object.title}`, type: object.type }));
  return [...solar, ...stars, ...messier];
}

function updateSearch() {
  const query = els.search.value.trim().toLocaleLowerCase("fr");
  els.catalogPanel?.classList.toggle("has-query", query.length > 0);
  const items = searchItems()
    .filter((item) => !query || item.name.toLocaleLowerCase("fr").includes(query) || item.type.toLocaleLowerCase("fr").includes(query))
    .slice(0, 9);
  els.results.innerHTML = items
    .map((item) => `
      <button class="result-button" type="button" data-key="${item.key}" role="option">
        <span>${item.name}</span>
        <small>${item.type}</small>
      </button>
    `)
    .join("");
}

function selectObject(key) {
  state.selectedId = key;
  state.followId = key;
  state.status = "Cible verrouillée";
  els.catalogPanel?.classList.remove("is-searching", "has-query");
  els.search.blur();
  const body = state.lastBodies.find((item) => item.key === key || item.id === key);
  if (body) {
    state.centerAz = body.az;
    state.centerAlt = clamp(body.alt, -25, 88);
  }
}

function setMode(mode) {
  state.mode = mode;
  state.status = mode === "ar" ? "AR caméra" : mode === "sensor" ? "Carte gyroscope" : "Carte gnomonique";
  document.querySelectorAll("[data-mode]").forEach((button) => {
    const active = button.dataset.mode === mode;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  if (mode === "ar" && !state.cameraActive) startCamera();
  if (mode === "ar" && !state.sensorsActive) enableSensors();
  if (mode === "sensor" && !state.sensorsActive) enableSensors();
}

async function requestLocation() {
  if (!("geolocation" in navigator)) {
    state.status = "Géoloc indisponible";
    return;
  }
  state.status = "Position...";
  navigator.geolocation.getCurrentPosition(
    (position) => {
      state.lat = position.coords.latitude;
      state.lon = position.coords.longitude;
      state.elevation = Number.isFinite(position.coords.altitude) ? position.coords.altitude : 0;
      state.placeLabel = `${state.lat.toFixed(3)}°, ${state.lon.toFixed(3)}°`;
      state.status = "Position synchronisée";
    },
    () => {
      state.status = "Position par défaut";
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
  );
}

async function enableSensors() {
  if (!("DeviceOrientationEvent" in window)) {
    state.status = "Capteurs indisponibles";
    return;
  }
  if (state.sensorsActive) {
    calibrateSensors();
    return;
  }
  try {
    if (typeof DeviceOrientationEvent.requestPermission === "function") {
      const response = await DeviceOrientationEvent.requestPermission();
      if (response !== "granted") {
        state.status = "Capteurs refusés";
        return;
      }
    }
    window.addEventListener("deviceorientationabsolute", onDeviceOrientation, true);
    window.addEventListener("deviceorientation", onDeviceOrientation, true);
    state.sensorsActive = true;
    state.status = "Capteurs synchronisés";
  } catch (error) {
    state.status = "Capteurs bloqués";
  }
}

function quaternionMultiply(a, b) {
  return {
    x: a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,
    y: a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,
    z: a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w,
    w: a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z
  };
}

function quaternionFromEulerYXZ(x, y, z) {
  const c1 = Math.cos(x / 2);
  const c2 = Math.cos(y / 2);
  const c3 = Math.cos(z / 2);
  const s1 = Math.sin(x / 2);
  const s2 = Math.sin(y / 2);
  const s3 = Math.sin(z / 2);
  return {
    x: s1 * c2 * c3 + c1 * s2 * s3,
    y: c1 * s2 * c3 - s1 * c2 * s3,
    z: c1 * c2 * s3 - s1 * s2 * c3,
    w: c1 * c2 * c3 + s1 * s2 * s3
  };
}

function quaternionFromAxisAngle(axis, angle) {
  const half = angle / 2;
  const s = Math.sin(half);
  return { x: axis[0] * s, y: axis[1] * s, z: axis[2] * s, w: Math.cos(half) };
}

function rotateVector(q, vector) {
  const u = [q.x, q.y, q.z];
  const s = q.w;
  const uv = [
    u[1] * vector[2] - u[2] * vector[1],
    u[2] * vector[0] - u[0] * vector[2],
    u[0] * vector[1] - u[1] * vector[0]
  ];
  const uuv = [
    u[1] * uv[2] - u[2] * uv[1],
    u[2] * uv[0] - u[0] * uv[2],
    u[0] * uv[1] - u[1] * uv[0]
  ];
  return [
    vector[0] + 2 * (s * uv[0] + uuv[0]),
    vector[1] + 2 * (s * uv[1] + uuv[1]),
    vector[2] + 2 * (s * uv[2] + uuv[2])
  ];
}

function deviceOrientationToHorizon(event) {
  if (![event.alpha, event.beta, event.gamma].every(Number.isFinite)) return null;
  const screenAngle = (screen.orientation?.angle || window.orientation || 0) * DEG;
  let q = quaternionFromEulerYXZ(event.beta * DEG, event.alpha * DEG, -event.gamma * DEG);
  q = quaternionMultiply(q, quaternionFromAxisAngle([1, 0, 0], -Math.PI / 2));
  q = quaternionMultiply(q, quaternionFromAxisAngle([0, 0, 1], -screenAngle));

  const forward = rotateVector(q, [0, 0, -1]);
  const alt = Math.asin(clamp(forward[1], -1, 1)) * RAD;
  const az = normDeg(Math.atan2(forward[0], -forward[2]) * RAD);
  return { az, alt: clamp(alt, -88, 88) };
}

function calibrateSensors() {
  if (!state.hasSensorReading) {
    state.status = "Vise puis bouge le téléphone";
    return;
  }

  const selected = state.lastBodies.find((body) => body.key === state.selectedId || body.id === state.selectedId);
  const moon = state.lastBodies.find((body) => body.key === "moon" || body.id === "moon");
  const target = selected?.key === "sun" && moon?.alt > -5 ? moon : selected;

  if (target && Number.isFinite(target.az) && Number.isFinite(target.alt)) {
    state.selectedId = target.key || target.id;
    state.followId = null;
    state.sensorOffset = signedDeg(target.az - state.rawSensorAz);
    state.sensorAltOffset = clamp(target.alt - state.rawSensorAlt, -28, 28);
    state.sensorAz = target.az;
    state.sensorAlt = target.alt;
    state.centerAz = target.az;
    state.centerAlt = clamp(target.alt, -35, 88);
    state.aligned = true;
    state.status = `Aligné sur ${target.name}`;
    return;
  }

  state.sensorOffset = signedDeg(state.centerAz - state.rawSensorAz);
  state.sensorAltOffset = clamp(state.centerAlt - state.rawSensorAlt, -28, 28);
  state.aligned = true;
  state.status = "Capteurs recalés";
}

function onDeviceOrientation(event) {
  const reading = deviceOrientationToHorizon(event);
  if (!reading) return;
  state.rawSensorAz = reading.az;
  state.rawSensorAlt = reading.alt;
  state.hasSensorReading = true;

  const heading = normDeg(reading.az + state.sensorOffset);
  const altitude = clamp(reading.alt + state.sensorAltOffset, -88, 88);
  state.sensorAz = lerpAngle(state.sensorAz, heading, 0.18);
  state.sensorAlt += (altitude - state.sensorAlt) * 0.18;
}

async function startCamera() {
  if (!navigator.mediaDevices?.getUserMedia) {
    state.status = "Caméra indisponible";
    return;
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: { ideal: "environment" },
        width: { ideal: 1920 },
        height: { ideal: 1080 }
      }
    });
    state.cameraStream = stream;
    els.video.srcObject = stream;
    state.cameraActive = true;
    state.mode = "ar";
    state.status = "AR caméra";
    document.querySelectorAll("[data-mode]").forEach((button) => {
      const active = button.dataset.mode === "ar";
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  } catch (error) {
    state.cameraActive = false;
    state.status = "Caméra bloquée";
  }
}

function toggleCamera() {
  if (state.cameraActive) {
    state.cameraStream?.getTracks().forEach((track) => track.stop());
    state.cameraStream = null;
    state.cameraActive = false;
    state.status = "Caméra coupée";
    if (state.mode === "ar") setMode("sensor");
  } else {
    startCamera();
  }
}

function nudgeTime(hours) {
  state.live = false;
  state.time = new Date(state.time.getTime() + hours * 3600000);
  els.liveTimeBtn.classList.remove("is-active");
  state.status = hours > 0 ? "+1 heure" : "-1 heure";
}

function wireEvents() {
  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => setMode(button.dataset.mode));
  });
  document.getElementById("locationBtn").addEventListener("click", requestLocation);
  document.getElementById("sensorBtn").addEventListener("click", enableSensors);
  els.alignBtn.addEventListener("click", () => {
    if (!state.sensorsActive) {
      enableSensors();
      state.status = "Active les capteurs puis aligne";
      return;
    }
    calibrateSensors();
  });
  document.getElementById("cameraBtn").addEventListener("click", toggleCamera);
  document.getElementById("backHourBtn").addEventListener("click", () => nudgeTime(-1));
  document.getElementById("nextHourBtn").addEventListener("click", () => nudgeTime(1));
  els.liveTimeBtn.addEventListener("click", () => {
    state.live = true;
    els.liveTimeBtn.classList.add("is-active");
    state.status = "Temps réel";
  });
  els.labelsBtn.addEventListener("click", () => {
    state.showLabels = !state.showLabels;
    els.labelsBtn.classList.toggle("is-active", state.showLabels);
    els.labelsBtn.setAttribute("aria-pressed", String(state.showLabels));
  });
  els.messierBtn.addEventListener("click", () => {
    state.showMessier = !state.showMessier;
    els.messierBtn.classList.toggle("is-active", state.showMessier);
    els.messierBtn.setAttribute("aria-pressed", String(state.showMessier));
  });
  els.search.addEventListener("focus", () => els.catalogPanel?.classList.add("is-searching"));
  els.search.addEventListener("blur", () => {
    if (!els.search.value.trim()) els.catalogPanel?.classList.remove("is-searching", "has-query");
  });
  els.search.addEventListener("input", updateSearch);
  els.search.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      els.search.blur();
      els.catalogPanel?.classList.remove("is-searching", "has-query");
    }
  });
  els.results.addEventListener("click", (event) => {
    const button = event.target.closest("[data-key]");
    if (button) selectObject(button.dataset.key);
  });
  els.canvas.addEventListener("pointerdown", onPointerDown);
  els.canvas.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", () => {
    state.dragging = false;
  });
  els.canvas.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("resize", resizeCanvas);
}

function onPointerDown(event) {
  state.dragging = true;
  state.followId = null;
  state.dragStart = {
    x: event.clientX,
    y: event.clientY,
    az: state.centerAz,
    alt: state.centerAlt
  };
  els.canvas.setPointerCapture?.(event.pointerId);
}

function onPointerMove(event) {
  if (!state.dragging || !state.dragStart) return;
  const minDim = Math.min(els.canvas.clientWidth, els.canvas.clientHeight);
  const dx = event.clientX - state.dragStart.x;
  const dy = event.clientY - state.dragStart.y;
  state.centerAz = normDeg(state.dragStart.az - (dx / minDim) * state.fov * 1.15);
  state.centerAlt = clamp(state.dragStart.alt + (dy / minDim) * state.fov * 1.15, -35, 88);
  state.status = "Carte libre";
}

function onWheel(event) {
  event.preventDefault();
  const factor = event.deltaY > 0 ? 1.06 : 0.94;
  state.fov = clamp(state.fov * factor, 28, 118);
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
}

wireEvents();
updateSearch();
registerServiceWorker();
requestAnimationFrame(drawFrame);
