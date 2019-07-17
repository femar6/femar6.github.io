
document.getElementById("lndcoverbtn").style.background="white";
document.getElementById("lndcoverbtn").style.color="#1f3864";
$("#lndcoverbtn").click(function (event) {
if (map.hasLayer(lndcvrLayer)) {
map.removeLayer(lndcvrLayer);
document.getElementById("lndcoverbtn").style.background="white";
document.getElementById("lndcoverbtn").style.color="#1f3864";
} else {
map.addLayer(lndcvrLayer);
map.removeLayer(fld_freqLayer);
map.removeLayer(drainageLayer);
map.removeLayer(hydrogrpLayer);
map.removeLayer(hydricLayer);
map.removeLayer(geologyLayer);
map.removeLayer(sfhaLayer);

map.removeLayer(waterbodiesLayer);
map.removeLayer(soviLayer);
document.getElementById("lndcoverbtn").style.background="#1f3864";
document.getElementById("lndcoverbtn").style.color="white";

document.getElementById("sovibtn").style.background="white";
document.getElementById("sovibtn").style.color="#1f3864";

document.getElementById("fldFreqClassbtn").style.background="white";
document.getElementById("fldFreqClassbtn").style.color="#1f3864";

document.getElementById("fldFreqClassbtn").style.background="white";
document.getElementById("fldFreqClassbtn").style.color="#1f3864";

document.getElementById("drainClassbtn").style.background="white";
document.getElementById("drainClassbtn").style.color="#1f3864";

document.getElementById("hydrogrpbtn").style.background="white";
document.getElementById("hydrogrpbtn").style.color="#1f3864";

document.getElementById("hydricbtn").style.background="white";
document.getElementById("hydricbtn").style.color="#1f3864";

document.getElementById("geologybtn").style.background="white";
document.getElementById("geologybtn").style.color="#1f3864";

document.getElementById("sfhabtn").style.background="white";
document.getElementById("sfhabtn").style.color="#1f3864";

}
});
// document.getElementById("elevbtn").style.background="white";
// document.getElementById("elevbtn").style.color="#1f3864";
// $("#elevbtn").click(function (event) {
// if (map.hasLayer(elevLayer)) {
// map.removeLayer(elevLayer);
// document.getElementById("elevbtn").style.background="white";
// document.getElementById("elevbtn").style.color="#1f3864";
// } else {
// map.addLayer(elevLayer);
// document.getElementById("elevbtn").style.background="#1f3864";
// document.getElementById("elevbtn").style.color="white";
//
// document.getElementById("lndcoverbtn").style.background="white";
// document.getElementById("lndcoverbtn").style.color="#1f3864";
//
// document.getElementById("sovibtn").style.background="white";
// document.getElementById("sovibtn").style.color="#1f3864";
//
// document.getElementById("fldFreqClassbtn").style.background="white";
// document.getElementById("fldFreqClassbtn").style.color="#1f3864";
//
// document.getElementById("fldFreqClassbtn").style.background="white";
// document.getElementById("fldFreqClassbtn").style.color="#1f3864";
//
// document.getElementById("drainClassbtn").style.background="white";
// document.getElementById("drainClassbtn").style.color="#1f3864";
//
// document.getElementById("hydrogrpbtn").style.background="white";
// document.getElementById("hydrogrpbtn").style.color="#1f3864";
//
// document.getElementById("hydricbtn").style.background="white";
// document.getElementById("hydricbtn").style.color="#1f3864";
//
// document.getElementById("geologybtn").style.background="white";
// document.getElementById("geologybtn").style.color="#1f3864";
//
// document.getElementById("sfhabtn").style.background="white";
// document.getElementById("sfhabtn").style.color="#1f3864";
//
// }
// });
document.getElementById("noaaImgbtn").style.background="white";
document.getElementById("noaaImgbtn").style.color="#1f3864";
$("#noaaImgbtn").click(function (event) {
if (map.hasLayer(noaaImagery)) {
map.removeLayer(noaaImagery);
document.getElementById("noaaImgbtn").style.background="white";
document.getElementById("noaaImgbtn").style.color="#1f3864";
} else {
map.addLayer(noaaImagery);
document.getElementById("noaaImgbtn").style.background="#1f3864";
document.getElementById("noaaImgbtn").style.color="white";
}
});
document.getElementById("pop1kmbtn").style.background="white";
document.getElementById("pop1kmbtn").style.color="#1f3864";
$("#pop1kmbtn").click(function (event) {
if (map.hasLayer(popLayer)) {
map.removeLayer(popLayer);
document.getElementById("pop1kmbtn").style.background="white";
document.getElementById("pop1kmbtn").style.color="#1f3864";
} else {
map.addLayer(popLayer);
document.getElementById("pop1kmbtn").style.background="#1f3864";
document.getElementById("pop1kmbtn").style.color="white";
}
});
document.getElementById("harvey_fldbtn").style.background="white";
document.getElementById("harvey_fldbtn").style.color="#1f3864";
$("#harvey_fldbtn").click(function (event) {
if (map.hasLayer(harvey_fldLayer)) {
map.removeLayer(harvey_fldLayer);
document.getElementById("harvey_fldbtn").style.background="white";
document.getElementById("harvey_fldbtn").style.color="#1f3864";
} else {
map.addLayer(harvey_fldLayer);
document.getElementById("harvey_fldbtn").style.background="#1f3864";
document.getElementById("harvey_fldbtn").style.color="white";
}
});
document.getElementById("iaAppbtn").style.background="white";
document.getElementById("iaAppbtn").style.color="#1f3864";
$("#iaAppbtn").click(function (event) {
if (map.hasLayer(iaAppLayer)) {
map.removeLayer(iaAppLayer);
document.getElementById("iaAppbtn").style.background="white";
document.getElementById("iaAppbtn").style.color="#1f3864";
} else {
map.addLayer(iaAppLayer);
map.removeLayer(nfip_claimsLayer);
document.getElementById("iaAppbtn").style.background="#1f3864";
document.getElementById("iaAppbtn").style.color="white";
document.getElementById("nfip_claimsbtn").style.background="white";
document.getElementById("nfip_claimsbtn").style.color="#1f3864";
}
});
document.getElementById("nfip_claimsbtn").style.background="white";
document.getElementById("nfip_claimsbtn").style.color="#1f3864";
$("#nfip_claimsbtn").click(function (event) {
if (map.hasLayer(nfip_claimsLayer)) {
map.removeLayer(nfip_claimsLayer);
document.getElementById("nfip_claimsbtn").style.background="white";
document.getElementById("nfip_claimsbtn").style.color="#1f3864";
} else {
map.addLayer(nfip_claimsLayer);
map.removeLayer(iaAppLayer);
document.getElementById("nfip_claimsbtn").style.background="#1f3864";
document.getElementById("nfip_claimsbtn").style.color="white";
document.getElementById("iaAppbtn").style.background="white";
document.getElementById("iaAppbtn").style.color="#1f3864";
}
});
document.getElementById("sovibtn").style.background="white";
document.getElementById("sovibtn").style.color="#1f3864";
$("#sovibtn").click(function (event) {
if (map.hasLayer(soviLayer)) {
map.removeLayer(soviLayer);
document.getElementById("sovibtn").style.background="white";
document.getElementById("sovibtn").style.color="#1f3864";
} else {
map.addLayer(soviLayer);
map.removeLayer(fld_freqLayer);
map.removeLayer(drainageLayer);
map.removeLayer(hydrogrpLayer);
map.removeLayer(hydricLayer);
map.removeLayer(geologyLayer);
map.removeLayer(sfhaLayer);

map.removeLayer(waterbodiesLayer);
map.removeLayer(lndcvrLayer);
document.getElementById("sovibtn").style.background="#1f3864";
document.getElementById("sovibtn").style.color="white";

document.getElementById("lndcoverbtn").style.background="white";
document.getElementById("lndcoverbtn").style.color="#1f3864";

document.getElementById("fldFreqClassbtn").style.background="white";
document.getElementById("fldFreqClassbtn").style.color="#1f3864";

document.getElementById("fldFreqClassbtn").style.background="white";
document.getElementById("fldFreqClassbtn").style.color="#1f3864";

document.getElementById("drainClassbtn").style.background="white";
document.getElementById("drainClassbtn").style.color="#1f3864";

document.getElementById("hydrogrpbtn").style.background="white";
document.getElementById("hydrogrpbtn").style.color="#1f3864";

document.getElementById("hydricbtn").style.background="white";
document.getElementById("hydricbtn").style.color="#1f3864";

document.getElementById("geologybtn").style.background="white";
document.getElementById("geologybtn").style.color="#1f3864";

document.getElementById("sfhabtn").style.background="white";
document.getElementById("sfhabtn").style.color="#1f3864";

}
});
document.getElementById("fldFreqClassbtn").style.background="white";
document.getElementById("fldFreqClassbtn").style.color="#1f3864";
$("#fldFreqClassbtn").click(function (event) {
if (map.hasLayer(fld_freqLayer)) {
map.removeLayer(fld_freqLayer);
document.getElementById("fldFreqClassbtn").style.background="white";
document.getElementById("fldFreqClassbtn").style.color="#1f3864";
} else {
map.addLayer(fld_freqLayer);
map.removeLayer(drainageLayer);
map.removeLayer(hydrogrpLayer);
map.removeLayer(hydricLayer);
map.removeLayer(geologyLayer);
map.removeLayer(soviLayer);
map.removeLayer(sfhaLayer);

map.removeLayer(waterbodiesLayer);
map.removeLayer(lndcvrLayer);
document.getElementById("fldFreqClassbtn").style.background="#1f3864";
document.getElementById("fldFreqClassbtn").style.color="white";

document.getElementById("lndcoverbtn").style.background="white";
document.getElementById("lndcoverbtn").style.color="#1f3864";

document.getElementById("sovibtn").style.background="white";
document.getElementById("sovibtn").style.color="#1f3864";

document.getElementById("drainClassbtn").style.background="white";
document.getElementById("drainClassbtn").style.color="#1f3864";

document.getElementById("hydrogrpbtn").style.background="white";
document.getElementById("hydrogrpbtn").style.color="#1f3864";

document.getElementById("hydricbtn").style.background="white";
document.getElementById("hydricbtn").style.color="#1f3864";

document.getElementById("geologybtn").style.background="white";
document.getElementById("geologybtn").style.color="#1f3864";

document.getElementById("sfhabtn").style.background="white";
document.getElementById("sfhabtn").style.color="#1f3864";


}
});
document.getElementById("drainClassbtn").style.background="white";
document.getElementById("drainClassbtn").style.color="#1f3864";
$("#drainClassbtn").click(function (event) {
if (map.hasLayer(drainageLayer)) {
map.removeLayer(drainageLayer);
document.getElementById("drainClassbtn").style.background="white";
document.getElementById("drainClassbtn").style.color="#1f3864";
} else {
map.addLayer(drainageLayer);
map.removeLayer(fld_freqLayer);
map.removeLayer(hydrogrpLayer);
map.removeLayer(hydricLayer);
map.removeLayer(geologyLayer);
map.removeLayer(soviLayer);
map.removeLayer(sfhaLayer);

map.removeLayer(waterbodiesLayer);
map.removeLayer(lndcvrLayer);
document.getElementById("drainClassbtn").style.background="#1f3864";
document.getElementById("drainClassbtn").style.color="white";

document.getElementById("lndcoverbtn").style.background="white";
document.getElementById("lndcoverbtn").style.color="#1f3864";

document.getElementById("sovibtn").style.background="white";
document.getElementById("sovibtn").style.color="#1f3864";

document.getElementById("fldFreqClassbtn").style.background="white";
document.getElementById("fldFreqClassbtn").style.color="#1f3864";

document.getElementById("hydrogrpbtn").style.background="white";
document.getElementById("hydrogrpbtn").style.color="#1f3864";

document.getElementById("hydricbtn").style.background="white";
document.getElementById("hydricbtn").style.color="#1f3864";

document.getElementById("geologybtn").style.background="white";
document.getElementById("geologybtn").style.color="#1f3864";

document.getElementById("sfhabtn").style.background="white";
document.getElementById("sfhabtn").style.color="#1f3864";
}
});
document.getElementById("hydrogrpbtn").style.background="white";
document.getElementById("hydrogrpbtn").style.color="#1f3864";
$("#hydrogrpbtn").click(function (event) {
if (map.hasLayer(hydrogrpLayer)) {
map.removeLayer(hydrogrpLayer);
document.getElementById("hydrogrpbtn").style.background="white";
document.getElementById("hydrogrpbtn").style.color="#1f3864";
} else {
map.addLayer(hydrogrpLayer);
map.removeLayer(drainageLayer);
map.removeLayer(fld_freqLayer);
map.removeLayer(hydricLayer);
map.removeLayer(geologyLayer);
map.removeLayer(soviLayer);
map.removeLayer(sfhaLayer);

map.removeLayer(waterbodiesLayer);
map.removeLayer(lndcvrLayer);
document.getElementById("hydrogrpbtn").style.background="#1f3864";
document.getElementById("hydrogrpbtn").style.color="white";

document.getElementById("lndcoverbtn").style.background="white";
document.getElementById("lndcoverbtn").style.color="#1f3864";

document.getElementById("sovibtn").style.background="white";
document.getElementById("sovibtn").style.color="#1f3864";

document.getElementById("fldFreqClassbtn").style.background="white";
document.getElementById("fldFreqClassbtn").style.color="#1f3864";

document.getElementById("fldFreqClassbtn").style.background="white";
document.getElementById("fldFreqClassbtn").style.color="#1f3864";

document.getElementById("drainClassbtn").style.background="white";
document.getElementById("drainClassbtn").style.color="#1f3864";

document.getElementById("geologybtn").style.background="white";
document.getElementById("geologybtn").style.color="#1f3864";

document.getElementById("sfhabtn").style.background="white";
document.getElementById("sfhabtn").style.color="#1f3864";

document.getElementById("hydricbtn").style.background="white";
document.getElementById("hydricbtn").style.color="#1f3864";
}
});
document.getElementById("hydricbtn").style.background="white";
document.getElementById("hydricbtn").style.color="#1f3864";
$("#hydricbtn").click(function (event) {
if (map.hasLayer(hydricLayer)) {
map.removeLayer(hydricLayer);
document.getElementById("hydricbtn").style.background="white";
document.getElementById("hydricbtn").style.color="#1f3864";
} else {
map.addLayer(hydricLayer);
map.removeLayer(drainageLayer);
map.removeLayer(fld_freqLayer);
map.removeLayer(hydrogrpLayer);
map.removeLayer(geologyLayer);
map.removeLayer(soviLayer);
map.removeLayer(sfhaLayer);

map.removeLayer(waterbodiesLayer);
map.removeLayer(lndcvrLayer);
document.getElementById("hydricbtn").style.background="#1f3864";
document.getElementById("hydricbtn").style.color="white";

document.getElementById("lndcoverbtn").style.background="white";
document.getElementById("lndcoverbtn").style.color="#1f3864";

document.getElementById("sovibtn").style.background="white";
document.getElementById("sovibtn").style.color="#1f3864";

document.getElementById("fldFreqClassbtn").style.background="white";
document.getElementById("fldFreqClassbtn").style.color="#1f3864";

document.getElementById("fldFreqClassbtn").style.background="white";
document.getElementById("fldFreqClassbtn").style.color="#1f3864";

document.getElementById("drainClassbtn").style.background="white";
document.getElementById("drainClassbtn").style.color="#1f3864";

document.getElementById("hydrogrpbtn").style.background="white";
document.getElementById("hydrogrpbtn").style.color="#1f3864";

document.getElementById("geologybtn").style.background="white";
document.getElementById("geologybtn").style.color="#1f3864";

document.getElementById("sfhabtn").style.background="white";
document.getElementById("sfhabtn").style.color="#1f3864";

}
});
$("#geologybtn").click(function (event) {
if (map.hasLayer(geologyLayer)) {
map.removeLayer(geologyLayer);
document.getElementById("geologybtn").style.background="white";
document.getElementById("geologybtn").style.color="#1f3864";
} else {
map.addLayer(geologyLayer);
map.removeLayer(drainageLayer);
map.removeLayer(fld_freqLayer);
map.removeLayer(hydrogrpLayer);
map.removeLayer(soviLayer);
map.removeLayer(sfhaLayer);

map.removeLayer(waterbodiesLayer);
map.removeLayer(fld_freqLayer);
map.removeLayer(hydricLayer);
map.removeLayer(lndcvrLayer);
document.getElementById("geologybtn").style.background="#1f3864";
document.getElementById("geologybtn").style.color="white";

document.getElementById("lndcoverbtn").style.background="white";
document.getElementById("lndcoverbtn").style.color="#1f3864";

document.getElementById("sovibtn").style.background="white";
document.getElementById("sovibtn").style.color="#1f3864";

document.getElementById("fldFreqClassbtn").style.background="white";
document.getElementById("fldFreqClassbtn").style.color="#1f3864";

document.getElementById("fldFreqClassbtn").style.background="white";
document.getElementById("fldFreqClassbtn").style.color="#1f3864";

document.getElementById("drainClassbtn").style.background="white";
document.getElementById("drainClassbtn").style.color="#1f3864";

document.getElementById("hydrogrpbtn").style.background="white";
document.getElementById("hydrogrpbtn").style.color="#1f3864";

document.getElementById("hydricbtn").style.background="white";
document.getElementById("hydricbtn").style.color="#1f3864";

document.getElementById("sfhabtn").style.background="white";
document.getElementById("sfhabtn").style.color="#1f3864";
}
});
document.getElementById("waterShedbtn").style.background="#1f3864";
document.getElementById("waterShedbtn").style.color="white";
$("#waterShedbtn").click(function (event) {
if (map.hasLayer(huc12Layer)) {
map.removeLayer(huc12Layer);
document.getElementById("waterShedbtn").style.background="white";
document.getElementById("waterShedbtn").style.color="#1f3864";
} else {
map.addLayer(huc12Layer);
document.getElementById("waterShedbtn").style.background="#1f3864";
document.getElementById("waterShedbtn").style.color="white";
}
});
document.getElementById("sfhabtn").style.background="white";
document.getElementById("sfhabtn").style.color="#1f3864";
$("#sfhabtn").click(function (event) {
if (map.hasLayer(sfhaLayer)) {
map.removeLayer(sfhaLayer);

document.getElementById("sfhabtn").style.background="white";
document.getElementById("sfhabtn").style.color="#1f3864";
} else {
map.addLayer(sfhaLayer);
map.removeLayer(fld_freqLayer);
map.removeLayer(drainageLayer);
map.removeLayer(hydrogrpLayer);
map.removeLayer(hydricLayer);
map.removeLayer(geologyLayer);
map.removeLayer(soviLayer);

map.removeLayer(waterbodiesLayer);
map.removeLayer(lndcvrLayer);
document.getElementById("sfhabtn").style.background="#1f3864";
document.getElementById("sfhabtn").style.color="white";

document.getElementById("lndcoverbtn").style.background="white";
document.getElementById("lndcoverbtn").style.color="#1f3864";

document.getElementById("sovibtn").style.background="white";
document.getElementById("sovibtn").style.color="#1f3864";

document.getElementById("fldFreqClassbtn").style.background="white";
document.getElementById("fldFreqClassbtn").style.color="#1f3864";

document.getElementById("fldFreqClassbtn").style.background="white";
document.getElementById("fldFreqClassbtn").style.color="#1f3864";

document.getElementById("drainClassbtn").style.background="white";
document.getElementById("drainClassbtn").style.color="#1f3864";

document.getElementById("hydrogrpbtn").style.background="white";
document.getElementById("hydrogrpbtn").style.color="#1f3864";

document.getElementById("hydricbtn").style.background="white";
document.getElementById("hydricbtn").style.color="#1f3864";

document.getElementById("geologybtn").style.background="white";
document.getElementById("geologybtn").style.color="#1f3864";

}
});
// document.getElementById("wetlandsbtn").style.background="white";
// document.getElementById("wetlandsbtn").style.color="#1f3864";
// $("#wetlandsbtn").click(function (event) {
// if (map.hasLayer(wetlandsLayer)) {
//
// document.getElementById("wetlandsbtn").style.background="white";
// document.getElementById("wetlandsbtn").style.color="#1f3864";
// } else {
//
// map.removeLayer(waterbodiesLayer);
// map.removeLayer(fld_freqLayer);
// map.removeLayer(drainageLayer);
// map.removeLayer(hydrogrpLayer);
// map.removeLayer(hydricLayer);
// map.removeLayer(geologyLayer);
// map.removeLayer(sfhaLayer);
// map.removeLayer(lndcvrLayer);
// document.getElementById("wetlandsbtn").style.background="#1f3864";
// document.getElementById("wetlandsbtn").style.color="white";
// }
// });
// document.getElementById("waterbodybtn").style.background="white";
// document.getElementById("waterbodybtn").style.color="#1f3864";
// $("#waterbodybtn").click(function (event) {
// if (map.hasLayer(waterbodiesLayer)) {
// map.removeLayer(waterbodiesLayer);
// document.getElementById("waterbodybtn").style.background="white";
// document.getElementById("waterbodybtn").style.color="#1f3864";
// } else {
// map.addLayer(waterbodiesLayer);
//
// map.removeLayer(fld_freqLayer);
// map.removeLayer(drainageLayer);
// map.removeLayer(hydrogrpLayer);
// map.removeLayer(hydricLayer);
// map.removeLayer(geologyLayer);
// map.removeLayer(sfhaLayer);
// document.getElementById("waterbodybtn").style.background="#1f3864";
// document.getElementById("waterbodybtn").style.color="white";
// }
// });
document.getElementById("elecGroup1").style.background="white";
document.getElementById("elecGroup1").style.color="#1f3864";
$("#elecGroup1").click(function (event) {
if (map.hasLayer(subStations)) {
map.removeLayer(subStations);
document.getElementById("elecGroup1").style.background="white";
document.getElementById("elecGroup1").style.color="#1f3864";
} else {
map.addLayer(subStations);
document.getElementById("elecGroup1").style.background="#1f3864";
document.getElementById("elecGroup1").style.color="white";
}
});

document.getElementById("elecGroup2").style.background="white";
document.getElementById("elecGroup2").style.color="#1f3864";
$("#elecGroup2").click(function (event) {
if (map.hasLayer(genUnits)) {
map.removeLayer(genUnits);
document.getElementById("elecGroup2").style.background="white";
document.getElementById("elecGroup2").style.color="#1f3864";
} else {
map.addLayer(genUnits);
document.getElementById("elecGroup2").style.background="#1f3864";
document.getElementById("elecGroup2").style.color="white";
}
});

document.getElementById("elecGroup3").style.background="white";
document.getElementById("elecGroup3").style.color="#1f3864";
$("#elecGroup3").click(function (event) {
if (map.hasLayer(p_plant)) {
map.removeLayer(p_plant);
document.getElementById("elecGroup3").style.background="#1f3864";
document.getElementById("elecGroup3").style.color="white";
} else {
map.addLayer(p_plant);
document.getElementById("elecGroup3").style.background="white";
document.getElementById("elecGroup3").style.color="#1f3864";
}
});

document.getElementById("chemGroup1").style.background="white";
document.getElementById("chemGroup1").style.color="#1f3864";
$("#chemGroup1").click(function (event) {
if (map.hasLayer(tsca)) {
  document.getElementById("chemGroup1").style.background="white";
  document.getElementById("chemGroup1").style.color="#1f3864";
map.removeLayer(tsca);
} else {
  document.getElementById("chemGroup1").style.background="#1f3864";
  document.getElementById("chemGroup1").style.color="white";
map.addLayer(tsca);
}
});
document.getElementById("emGroup1").style.background="white";
document.getElementById("emGroup1").style.color="#1f3864";
$("#emGroup1").click(function (event) {
if (map.hasLayer(localEoc)) {
map.removeLayer(localEoc);
document.getElementById("emGroup1").style.background="white";
document.getElementById("emGroup1").style.color="#1f3864";
} else {
map.addLayer(localEoc);
document.getElementById("emGroup1").style.background="#1f3864";
document.getElementById("emGroup1").style.color="white";
}
});

document.getElementById("emGroup2").style.background="white";
document.getElementById("emGroup2").style.color="#1f3864";
$("#emGroup2").click(function (event) {
if (map.hasLayer(policeStations)) {
map.removeLayer(policeStations);
document.getElementById("emGroup2").style.background="white";
document.getElementById("emGroup2").style.color="#1f3864";
} else {
map.addLayer(policeStations);
document.getElementById("emGroup2").style.background="#1f3864";
document.getElementById("emGroup2").style.color="white";
}
});

document.getElementById("emGroup3").style.background="white";
document.getElementById("emGroup3").style.color="#1f3864";
$("#emGroup3").click(function (event) {
if (map.hasLayer(fireStations)) {
map.removeLayer(fireStations);
document.getElementById("emGroup3").style.background="white";
document.getElementById("emGroup3").style.color="#1f3864";
} else {
map.addLayer(fireStations);
document.getElementById("emGroup3").style.background="#1f3864";
document.getElementById("emGroup3").style.color="white";
}
});

document.getElementById("emGroup4").style.background="white";
document.getElementById("emGroup4").style.color="#1f3864";
$("#emGroup4").click(function (event) {
if (map.hasLayer(emsStations)) {
map.removeLayer(emsStations);
document.getElementById("emGroup4").style.background="white";
document.getElementById("emGroup4").style.color="#1f3864";
} else {
map.addLayer(emsStations);
document.getElementById("emGroup4").style.background="#1f3864";
document.getElementById("emGroup4").style.color="white";
}
});

document.getElementById("emGroup5").style.background="white";
document.getElementById("emGroup5").style.color="#1f3864";
$("#emGroup5").click(function (event) {
if (map.hasLayer(hospitalsLayer)) {
map.removeLayer(hospitalsLayer);
document.getElementById("emGroup5").style.background="white";
document.getElementById("emGroup5").style.color="#1f3864";
} else {
map.addLayer(hospitalsLayer);
document.getElementById("emGroup5").style.background="#1f3864";
document.getElementById("emGroup5").style.color="white";
}
});

document.getElementById("emGroup6").style.background="white";
document.getElementById("emGroup6").style.color="#1f3864";
$("#emGroup6").click(function (event) {
if (map.hasLayer(shelters)) {
map.removeLayer(shelters);
document.getElementById("emGroup6").style.background="white";
document.getElementById("emGroup6").style.color="#1f3864";
} else {
map.addLayer(shelters);
document.getElementById("emGroup6").style.background="#1f3864";
document.getElementById("emGroup6").style.color="white";
}
});
document.getElementById("emGroup7").style.background="white";
document.getElementById("emGroup7").style.color="#1f3864";
$("#emGroup7").click(function (event) {
if (map.hasLayer(hurrevac)) {
map.removeLayer(hurrevac);
document.getElementById("emGroup7").style.background="white";
document.getElementById("emGroup7").style.color="#1f3864";
} else {
map.addLayer(hurrevac);
document.getElementById("emGroup7").style.background="#1f3864";
document.getElementById("emGroup7").style.color="white";
}
});
// document.getElementById("emGroup").style.background="white";
// document.getElementById("emGroup").style.color="#1f3864";
// $("#emGroup8").click(function (event) {
// if (map.hasLayer(emGroup)) {
// map.removeLayer(emGroup);
// document.getElementById("emGroup").style.background="white";
// document.getElementById("emGroup").style.color="#1f3864";
// } else {
// map.addLayer(emGroup);
// document.getElementById("emGroup").style.background="#1f3864";
// document.getElementById("emGroup").style.color="white";
// }
// });
// document.getElementById("transGroup1").style.background="white";
// document.getElementById("transGroup1").style.color="#1f3864";
// $("#transGroup1").click(function (event) {
// if (map.hasLayer(fld_roadpt)) {
// map.removeLayer(fld_roadpt);
// ocument.getElementById("transGroup1").style.background="white";
// document.getElementById("transGroup1").style.color="#1f3864";
// } else {
// map.addLayer(fld_roadpt);
// document.getElementById("transGroup1").style.background="#1f3864";
// document.getElementById("transGroup1").style.color="white";
// }
// });



// document.getElementById("transGroup2").style.background="white";
// document.getElementById("transGroup2").style.color="#1f3864";
// $("#transGroup2").click(function (event) {
// if (map.hasLayer(fld_roadline)) {
// map.removeLayer(fld_roadline);
// document.getElementById("transGroup2").style.background="white";
// document.getElementById("transGroup2").style.color="#1f3864";
// } else {
// map.addLayer(fld_roadline);
// document.getElementById("transGroup2").style.background="#1f3864";
// document.getElementById("transGroup2").style.color="white";
// }
// });
//
//
//
// document.getElementById("transGroup3").style.background="white";
// document.getElementById("transGroup3").style.color="#1f3864";
// $("#transGroup3").click(function (event) {
// if (map.hasLayer(interState)) {
// map.removeLayer(interState);
// document.getElementById("transGroup3").style.background="white";
// document.getElementById("transGroup3").style.color="#1f3864";
// } else {
// map.addLayer(interState);
// document.getElementById("transGroup3").style.background="#1f3864";
// document.getElementById("transGroup3").style.color="white";
// }
// });



document.getElementById("transGroup4").style.background="white";
document.getElementById("transGroup4").style.color="#1f3864";
$("#transGroup4").click(function (event) {
if (map.hasLayer(airportpt)) {
map.removeLayer(airportpt);
document.getElementById("transGroup4").style.background="white";
document.getElementById("transGroup4").style.color="#1f3864";
} else {
map.addLayer(airportpt);
document.getElementById("transGroup4").style.background="#1f3864";
document.getElementById("transGroup4").style.color="white";
}
});
document.getElementById("transGroup5").style.background="white";
document.getElementById("transGroup5").style.color="#1f3864";
$("#transGroup5").click(function (event) {
if (map.hasLayer(ferry)) {
map.removeLayer(ferry);
document.getElementById("transGroup5").style.background="white";
document.getElementById("transGroup5").style.color="#1f3864";
} else {
map.addLayer(ferry);
document.getElementById("transGroup5").style.background="#1f3864";
document.getElementById("transGroup5").style.color="white";
}
});
document.getElementById("transGroup6").style.background="white";
document.getElementById("transGroup6").style.color="#1f3864";
$("#transGroup6").click(function (event) {
if (map.hasLayer(s_bridge)) {
map.removeLayer(s_bridge);
document.getElementById("transGroup6").style.background="white";
document.getElementById("transGroup6").style.color="#1f3864";
} else {
map.addLayer(s_bridge);
document.getElementById("transGroup6").style.background="#1f3864";
document.getElementById("transGroup6").style.color="white";
}
});
document.getElementById("transGroup7").style.background="white";
document.getElementById("transGroup7").style.color="#1f3864";
$("#transGroup7").click(function (event) {
if (map.hasLayer(heliP)) {
map.removeLayer(heliP);
document.getElementById("transGroup7").style.background="white";
document.getElementById("transGroup7").style.color="#1f3864";
} else {
map.addLayer(heliP);
document.getElementById("transGroup7").style.background="#1f3864";
document.getElementById("transGroup7").style.color="white";
}
});
document.getElementById("transGroup8").style.background="white";
document.getElementById("transGroup8").style.color="#1f3864";
$("#transGroup8").click(function (event) {
if (map.hasLayer(majPort)) {
map.removeLayer(majPort);
document.getElementById("transGroup8").style.background="white";
document.getElementById("transGroup8").style.color="#1f3864";
} else {
map.addLayer(majPort);
document.getElementById("transGroup8").style.background="#1f3864";
document.getElementById("transGroup8").style.color="white";
}
});
document.getElementById("transGroup9").style.background="white";
document.getElementById("transGroup9").style.color="#1f3864";
$("#transGroup9").click(function (event) {
if (map.hasLayer(p_bridges)) {
map.removeLayer(p_bridges);
document.getElementById("transGroup9").style.background="white";
document.getElementById("transGroup9").style.color="#1f3864";
} else {
map.addLayer(p_bridges);
document.getElementById("transGroup9").style.background="#1f3864";
document.getElementById("transGroup9").style.color="white";
}
});

document.getElementById("govGroup1").style.background="white";
document.getElementById("govGroup1").style.color="#1f3864";
$("#govGroup1").click(function (event) {
if (map.hasLayer(publicSchool)) {
map.removeLayer(publicSchool);
document.getElementById("govGroup1").style.background="white";
document.getElementById("govGroup1").style.color="#1f3864";
} else {
map.addLayer(publicSchool);
document.getElementById("govGroup1").style.background="#1f3864";
document.getElementById("govGroup1").style.color="white";
}
});
document.getElementById("govGroup2").style.background="white";
document.getElementById("govGroup2").style.color="#1f3864";
$("#govGroup2").click(function (event) {
if (map.hasLayer(privateSchool)) {
map.removeLayer(privateSchool);
document.getElementById("govGroup2").style.background="white";
document.getElementById("govGroup2").style.color="#1f3864";
} else {
map.addLayer(privateSchool);
document.getElementById("govGroup2").style.background="#1f3864";
document.getElementById("govGroup2").style.color="white";
}
});
document.getElementById("govGroup3").style.background="white";
document.getElementById("govGroup3").style.color="#1f3864";
$("#govGroup3").click(function (event) {
if (map.hasLayer(govBldg)) {
map.removeLayer(govBldg);
} else {
map.addLayer(govBldg);
document.getElementById("govGroup3").style.background="#1f3864";
document.getElementById("govGroup3").style.color="white";
}
});
document.getElementById("govGroup4").style.background="white";
document.getElementById("govGroup4").style.color="#1f3864";
$("#govGroup4").click(function (event) {
if (map.hasLayer(supCollege)) {
map.removeLayer(supCollege);
document.getElementById("govGroup4").style.background="white";
document.getElementById("govGroup4").style.color="#1f3864";
} else {
map.addLayer(supCollege);
document.getElementById("govGroup4").style.background="#1f3864";
document.getElementById("govGroup4").style.color="white";
}
});
// document.getElementById("govGroup5").style.background="white";
// document.getElementById("govGroup5").style.color="#1f3864";
// $("#govGroup5").click(function (event) {
// if (map.hasLayer(govSect)) {
// map.removeLayer(govSect);
// document.getElementById("govGroup5").style.background="white";
// document.getElementById("govGroup5").style.color="#1f3864";
// } else {
//  map.addLayer(govSect);
//  document.getElementById("govGroup5").style.background="#1f3864";
//  document.getElementById("govGroup5").style.color="white";
// }
// });
document.getElementById("comGroup1").style.background="white";
document.getElementById("comGroup1").style.color="#1f3864";
$("#comGroup1").click(function (event) {
if (map.hasLayer(cell)) {
map.removeLayer(cell);
document.getElementById("comGroup1").style.background="white";
document.getElementById("comGroup1").style.color="#1f3864";
} else {
map.addLayer(cell);
document.getElementById("comGroup1").style.background="#1f3864";
document.getElementById("comGroup1").style.color="white";
}
});
document.getElementById("comGroup2").style.background="white";
document.getElementById("comGroup2").style.color="#1f3864";
$("#comGroup2").click(function (event) {
if (map.hasLayer(amTower)) {
map.removeLayer(amTower);
document.getElementById("comGroup2").style.background="white";
document.getElementById("comGroup2").style.color="#1f3864";
} else {
map.addLayer(amTower);
document.getElementById("comGroup2").style.background="#1f3864";
document.getElementById("comGroup2").style.color="white";
}
});
document.getElementById("comGroup3").style.background="white";
document.getElementById("comGroup3").style.color="#1f3864";
$("#comGroup3").click(function (event) {
if (map.hasLayer(fmTower)) {
map.removeLayer(fmTower);
document.getElementById("comGroup3").style.background="white";
document.getElementById("comGroup3").style.color="#1f3864";
} else {
map.addLayer(fmTower);
document.getElementById("comGroup3").style.background="#1f3864";
document.getElementById("comGroup3").style.color="white";
}
});
document.getElementById("comGroup4").style.background="white";
document.getElementById("comGroup4").style.color="#1f3864";
$("#comGroup4").click(function (event) {
if (map.hasLayer(antenna)) {
map.removeLayer(antenna);
document.getElementById("comGroup4").style.background="white";
document.getElementById("comGroup4").style.color="#1f3864";
} else {
map.addLayer(antenna);
document.getElementById("comGroup4").style.background="#1f3864";
document.getElementById("comGroup4").style.color="white";
}
});
document.getElementById("wastGroup1").style.background="white";
document.getElementById("wastGroup1").style.color="#1f3864";
$("#wastGroup1").click(function (event) {
if (map.hasLayer(wWater)) {
map.removeLayer(wWater);
document.getElementById("wastGroup1").style.background="white";
document.getElementById("wastGroup1").style.color="#1f3864";
} else {
map.addLayer(wWater);
document.getElementById("wastGroup1").style.background="#1f3864";
document.getElementById("wastGroup1").style.color="white";
}
});
document.getElementById("wastGroup2").style.background="white";
document.getElementById("wastGroup2").style.color="#1f3864";
$("#wastGroup2").click(function (event) {
if (map.hasLayer(landfills)) {
map.removeLayer(landfills);
document.getElementById("wastGroup2").style.background="white";
document.getElementById("wastGroup2").style.color="#1f3864";
} else {
map.addLayer(landfills);
document.getElementById("wastGroup2").style.background="#1f3864";
document.getElementById("wastGroup2").style.color="white";
}
});

$(window).resize(function () {sizeLayerControl();
});


// ABOUT
$("#about-btn").click(function () {
$("#aboutModal").modal("show");
$(".navbar-collapse.in").collapse("hide");
return false;
});
// FULL EXTENT
$("#full-extent-btn").click(function () {map.flyTo([28.2, -97.03],10);
$(".navbar-collapse.in").collapse("hide");
return false;
});
// LEGEND
$("#legend-btn").click(function () {
$("#legendModal").modal("show");
$(".navbar-collapse.in").collapse("hide");
return false;
});
// LOGIN
$("#login-btn").click(function () {
$("#loginModal").modal("show");
$(".navbar-collapse.in").collapse("hide");
return false;
});


$("#nav-btn").click(function () {
$(".navbar-collapse").collapse("toggle");
return false;
});
// HIDE BUTTON
$("#sidebar-toggle-btn").click(function () {

              animateSidebar();

              return false;
});
// HIDE BUTTON
// $("#sidebar-hide-btn").click(function () {
// animateSidebar();
// return false;
// });
$("#list-btn").click(function () {

              animateSidebar();

              return false;

});
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});
$("#section1").removeClass('not_selectedBtn');
$("#section1").click(function(event) {
event.preventDefault();
    $("#waterShed").removeClass('not_selected');
    $("#soils").addClass('not_selected');
    $("#demo").addClass('not_selected');
    $("#ci_sectors").addClass('not_selected');
    $("#section1").removeClass('not_selectedBtn');
    $("#section2").addClass('not_selectedBtn');
    $("#section3").addClass('not_selectedBtn');
    $("#section4").addClass('not_selectedBtn');
   });
$("#section2").click(function(event) {
event.preventDefault();
    $("#waterShed").addClass('not_selected');
    $("#soils").removeClass('not_selected');
    $("#demo").addClass('not_selected');
    $("#ci_sectors").addClass('not_selected');
    $("#section2").removeClass('not_selectedBtn');
    $("#section1").addClass('not_selectedBtn');
    $("#section3").addClass('not_selectedBtn');
    $("#section4").addClass('not_selectedBtn');
   });
$("#section3").click(function(event) {
event.preventDefault();
    $("#waterShed").addClass('not_selected');
    $("#soils").addClass('not_selected');
    $("#demo").removeClass('not_selected');
    $("#ci_sectors").addClass('not_selected');
    $("#section3").removeClass('not_selectedBtn');
    $("#section2").addClass('not_selectedBtn');
    $("#section1").addClass('not_selectedBtn');
    $("#section4").addClass('not_selectedBtn');
  });
$("#section4").click(function(event) {
      event.preventDefault();
    $("#waterShed").addClass('not_selected');
    $("#soils").addClass('not_selected');
    $("#demo").addClass('not_selected');
    $("#ci_sectors").removeClass('not_selected');
    $("#section4").removeClass('not_selectedBtn');
    $("#section2").addClass('not_selectedBtn');
    $("#section3").addClass('not_selectedBtn');
    $("#section1").addClass('not_selectedBtn');
  });
