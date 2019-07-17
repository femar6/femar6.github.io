//TOP scroll bottons
$("#lia_1_1").click(function (e) {
	e.preventDefault();
	$('.sidebar-wrapper').animate({
		scrollTop: ($('#a_1_1').offset().top - 40)
	}, 1000);
});

$("#lia_1_2").click(function (e) {
	e.preventDefault();
	$('.sidebar-wrapper').animate({
		scrollTop: ($('#a_1_2').offset().top - 40)
	}, 1000);
});
$("#lia_2_1").click(function (e) {
	e.preventDefault();
	$('.sidebar-wrapper').animate({
		scrollTop: ($('#a_2_1').offset().top - 40)
	}, 1000);
});
$("#lia_2_2").click(function (e) {
	e.preventDefault();
	$('.sidebar-wrapper').animate({
		scrollTop: ($('#a_2_2').offset().top - 40)
	}, 1000);
});
$("#lia_2_3").click(function (e) {
	e.preventDefault();
	$('.sidebar-wrapper').animate({
		scrollTop: ($('#a_2_3').offset().top - 40)
	}, 1000);
});
$("#lia_2_4").click(function (e) {
	e.preventDefault();
	$('.sidebar-wrapper').animate({
		scrollTop: ($('#a_2_4').offset().top - 40)
	}, 1000);
});

$("#lia_2_5").click(function (e) {
	e.preventDefault();
	$('.sidebar-wrapper').animate({
		scrollTop: ($('#a_2_5').offset().top - 40)
	}, 1000);
});
$("#lia_2_6").click(function (e) {
	e.preventDefault();
	$('.sidebar-wrapper').animate({
		scrollTop: ($('#a_2_6').offset().top - 40)
	}, 1000);
});
$("#lia_2_7").click(function (e) {
	e.preventDefault();
	$('.sidebar-wrapper').animate({
		scrollTop: ($('#a_2_7').offset().top - 40)
	}, 1000);
});
$("#lia_2_8").click(function (e) {
	e.preventDefault();
	$('.sidebar-wrapper').animate({
		scrollTop: ($('#a_2_8').offset().top - 40)
	}, 1000);
});
$("#lia_2_9").click(function (e) {
	e.preventDefault();
	$('.sidebar-wrapper').animate({
		scrollTop: ($('#a_2_9').offset().top - 40)
	}, 1000);
});
$("#lia_3_1").click(function (e) {
	e.preventDefault();
	$('.sidebar-wrapper').animate({
		scrollTop: ($('#a_3_1').offset().top - 40)
	}, 1000);
});
$("#lia_3_2").click(function (e) {
	e.preventDefault();
	$('.sidebar-wrapper').animate({
		scrollTop: ($('#a_3_2').offset().top - 40)
	}, 1000);
});
$("#lia_3_3").click(function (e) {
	e.preventDefault();
	$('.sidebar-wrapper').animate({
		scrollTop: ($('#a_3_3').offset().top - 40)
	}, 1000);
});
$("#lia_3_4").click(function (e) {
	e.preventDefault();
	$('.sidebar-wrapper').animate({
		scrollTop: ($('#a_3_4').offset().top - 40)
	}, 1000);
});
$("#lia_4_1").click(function (e) {
	e.preventDefault();
	$('.sidebar-wrapper').animate({
		scrollTop: ($('#a_4_1').offset().top - 40)
	}, 1000);
});
$("#lia_4_2").click(function (e) {
	e.preventDefault();
	$('.sidebar-wrapper').animate({
		scrollTop: ($('#a_4_2').offset().top - 40)
	}, 1000);
});
$("#lia_4_3").click(function (e) {
	e.preventDefault();
	$('.sidebar-wrapper').animate({
		scrollTop: ($('#a_4_3').offset().top - 40)
	}, 1000);
});
$("#lia_4_4").click(function (e) {
	e.preventDefault();
	$('.sidebar-wrapper').animate({
		scrollTop: ($('#a_4_4').offset().top - 40)
	}, 1000);
});
$("#lia_4_5").click(function (e) {
	e.preventDefault();
	$('.sidebar-wrapper').animate({
		scrollTop: ($('#a_4_5').offset().top - 40)
	}, 1000);
});
$("#lia_5_1").click(function (e) {
	e.preventDefault();
	$('.sidebar-wrapper').animate({
		scrollTop: ($('#a_5_1').offset().top - 40)
	}, 1000);
});
$("#lia_6_1").click(function (e) {
	e.preventDefault();
	$('.sidebar-wrapper').animate({
		scrollTop: ($('#a_6_1').offset().top - 40)
	}, 1000);
});


$('.sidebar-wrapper').scroll(function () {
	if ($(this).scrollTop() > 300) {
		$('#scrollToTop').fadeIn();
	} else {
		$('#scrollToTop').fadeOut();
	}
});

//Click event to scroll to top
$('#scrollToTop').click(function () {
	$('.sidebar-wrapper').animate({
		scrollTop: 0
	}, 500);
	return false;
});
//UP SCROLL ARROW TO TOP
$('.sidebar-wrapper').scroll(function () {
	if ($(this).scrollTop() > 300) {
		$('#scrollToTop').fadeIn();
	} else {
		$('#scrollToTop').fadeOut();
	}
});
// STORY MAP FADE
$('.sidebar-wrapper').scroll(function () {
	var windscroll_1_0 = $('#a_1_0').scrollTop();
	if (windscroll_1_0 >= 0) {
		$('#a_1_0').each(function (i) {
			if ($(this).position().top <= windscroll_1_0 + 300) {
//				$('#mapOpen').addClass("hideElement");
//				$('#map').addClass("hideElement");	
				map.removeLayer(wetlandsLayer);
				map.removeLayer(transGroup);	
				map.removeLayer(nfip_claimsLayer);
				map.removeLayer(iaAppLayer);	
				map.removeLayer(geologyLayer);							
				map.addLayer(huc12Layer);
				$('#a_1_0').removeClass("outFocus");
				$('#a_1_1').addClass("outFocus");
			}
		});
	}
	var windscroll_1_1 = $('#a_1_1').scrollTop();
	if (windscroll_1_1 >= 0) {
		$('#a_1_1').each(function (i) {
			if ($(this).position().top <= windscroll_1_1 + 300) {			
				map.removeLayer(wetlandsLayer);	
	
				map.removeLayer(harvey_fldLayer);
				map.removeLayer(nfip_claimsLayer);
				map.removeLayer(iaAppLayer);
				map.removeLayer(geologyLayer);
				map.addLayer(huc12Layer);
				map.removeLayer(transGroup);
				$('#a_1_0').addClass("outFocus");
				$('#a_1_1').removeClass("outFocus");
				$('#a_1_2').addClass("outFocus");
				$('#a_2_1').addClass("outFocus");
//				$('#map').removeClass("hideElement");
//				$('#mapReplace').addClass("hideElement");
			}
		});
	}
	var windscroll_1_2 = $('#a_1_2').scrollTop();
	if (windscroll_1_2 >= 0) {
		$('#a_1_2').each(function (i) {
			if ($(this).position().top <= windscroll_1_2 + 300) {
				map.addLayer(wetlandsLayer);
				map.removeLayer(harvey_fldLayer);
				map.removeLayer(nfip_claimsLayer);
				map.removeLayer(iaAppLayer);
				map.removeLayer(geologyLayer);				
				map.removeLayer(huc12Layer);
				map.removeLayer(transGroup);				
				$('#a_1_1').addClass("outFocus");
				$('#a_1_2').removeClass("outFocus");
				$('#a_2_0').addClass("outFocus");
				// $("#test").remove();				
			}
		});
	}
	var windscroll_2_0 = $('#a_2_0').scrollTop();
	if (windscroll_2_0 >= 0) {
		$('#a_2_0').each(function (i) {
			if ($(this).position().top <= windscroll_2_0 + 300) {
				map.addLayer(huc12Layer);
				map.removeLayer(iaAppLayer);				
				map.removeLayer(wetlandsLayer);
				map.removeLayer(sfhaLayer);	
				map.removeLayer(harvey_fldLayer);
				map.removeLayer(nfip_claimsLayer);								
				map.removeLayer(drainageLayer);
				map.removeLayer(geologyLayer);				
				map.removeLayer(transGroup);								
				$('#a_1_2').addClass("outFocus");
				$('#a_2_0').removeClass("outFocus");
				$('#a_2_1').addClass("outFocus");
				$('#a_2_2').addClass("outFocus");
							
			}
		});
	}
	var windscroll_2_1 = $('#a_2_1').scrollTop();
	if (windscroll_2_1 >= 0) {
		$('#a_2_1').each(function (i) {
			if ($(this).position().top <= windscroll_2_1 + 300) {
				map.addLayer(harvey_fldLayer);
				map.addLayer(nfip_claimsLayer);
				map.addLayer(iaAppLayer);
				map.removeLayer(huc12Layer);
				map.removeLayer(geologyLayer);
				map.removeLayer(wetlandsLayer);
				map.removeLayer(sfhaLayer);	
				map.removeLayer(drainageLayer);
				map.removeLayer(transGroup);								
				$('#a_2_0').addClass("outFocus");
				$('#a_2_1').removeClass("outFocus");
				$('#a_2_2').addClass("outFocus");							
			}
		});
	}
	var windscroll_2_2 = $('#a_2_2').scrollTop();
	if (windscroll_2_2 >= 0) {
		$('#a_2_2').each(function (i) {
			if ($(this).position().top <= windscroll_2_2 + 300) {
				map.removeLayer(drainageLayer);
				map.addLayer(geologyLayer);
				map.removeLayer(sfhaLayer);	
				map.removeLayer(harvey_fldLayer);
				map.removeLayer(nfip_claimsLayer);
				map.removeLayer(iaAppLayer);
				map.removeLayer(huc12Layer);
				map.removeLayer(transGroup);
				$('#a_2_1').addClass("outFocus");
				$('#a_2_2').removeClass("outFocus");
				$('#a_2_3').addClass("outFocus");
//				$('#map').removeClass("hideElement");					
			}
		});
	}
	var windscroll_2_3 = $('#a_2_3').scrollTop();
	if (windscroll_2_3 >= 0) {
		$('#a_2_3').each(function (i) {
			if ($(this).position().top <= windscroll_2_3 + 300) {
				map.addLayer(drainageLayer);
				map.removeLayer(geologyLayer);
				map.removeLayer(sfhaLayer);	
				map.removeLayer(harvey_fldLayer);	
				map.removeLayer(nfip_claimsLayer);
				map.removeLayer(iaAppLayer);
				map.removeLayer(huc12Layer);
				map.removeLayer(transGroup);
				$('#a_2_2').addClass("outFocus");
				$('#a_2_3').removeClass("outFocus");
				$('#a_2_4').addClass("outFocus");
//				$('#map').removeClass("hideElement");					
			}
		});
	}
	var windscroll_2_4 = $('#a_2_4').scrollTop();
	if (windscroll_2_4 >= 0) {
		$('#a_2_4').each(function (i) {
			if ($(this).position().top <= windscroll_2_4 + 300) {
				map.removeLayer(soviLayer);
				map.removeLayer(sfhaLayer);
				map.removeLayer(drainageLayer);
				map.removeLayer(geologyLayer);
				map.removeLayer(harvey_fldLayer);
				map.removeLayer(nfip_claimsLayer);
				map.removeLayer(iaAppLayer);
				map.removeLayer(huc12Layer);
				map.removeLayer(transGroup);				
				$('#a_2_3').addClass("outFocus");
				$('#a_2_4').removeClass("outFocus");
				$('#a_2_5').addClass("outFocus");
			}
		});
	}

	var windscroll_2_5 = $('#a_2_5').scrollTop();
	if (windscroll_2_5 >= 0) {
		$('#a_2_5').each(function (i) {
			if ($(this).position().top <= windscroll_2_5 + 300) {
				map.removeLayer(soviLayer);
				map.addLayer(sfhaLayer);
				map.removeLayer(wWater);				
				map.removeLayer(geologyLayer);
				map.removeLayer(drainageLayer);
				map.removeLayer(lndcvrLayer);
				map.removeLayer(huc12Layer);
				map.removeLayer(transGroup);												
				$('#a_2_4').addClass("outFocus");
				$('#a_2_5').removeClass("outFocus");
				$('#a_2_6').addClass("outFocus");
			}
		});
	}
	var windscroll_2_6 = $('#a_2_6').scrollTop();
	if (windscroll_2_6 >= 0) {
		$('#a_2_6').each(function (i) {
			if ($(this).position().top <= windscroll_2_6 + 300) {
				map.removeLayer(soviLayer);
				map.removeLayer(sfhaLayer);
				map.removeLayer(geologyLayer);
				map.removeLayer(wWater);
				map.removeLayer(drainageLayer);	
				map.removeLayer(lndcvrLayer);
				map.addLayer(huc12Layer);	
				map.removeLayer(transGroup);
				map.removeLayer(geologyLayer);															
				$('#a_2_5').addClass("outFocus");
				$('#a_2_6').removeClass("outFocus");
				$('#a_2_7').addClass("outFocus");
				$('#a_2_8').addClass("outFocus");
				$('#a_2_9').addClass("outFocus");
			}
		});
	}
	var windscroll_2_7 = $('#a_2_7').scrollTop();
	if (windscroll_2_7 >= 0) {
		$('#a_2_7').each(function (i) {
			if ($(this).position().top <= windscroll_2_7 + 300) {
				map.removeLayer(soviLayer);
				map.removeLayer(popLayer);
				map.removeLayer(lndcvrLayer);
				map.removeLayer(huc12Layer);
				map.removeLayer(sfhaLayer);
				map.removeLayer(geologyLayer);
				map.removeLayer(landfills);
				map.addLayer(wWater);	

				$('#a_2_6').addClass("outFocus");
				$('#a_2_7').removeClass("outFocus");
				$('#a_2_8').addClass("outFocus");
				$('#a_2_9').addClass("outFocus");
			}
		});
	}
	var windscroll_2_8 = $('#a_2_8').scrollTop();
	if (windscroll_2_8 >= 0) {
		$('#a_2_8').each(function (i) {
			if ($(this).position().top <= windscroll_2_8 + 300) {
				map.removeLayer(soviLayer);
				map.removeLayer(popLayer);
				map.removeLayer(lndcvrLayer);
				map.addLayer(landfills);
				map.removeLayer(wWater);
				map.removeLayer(huc12Layer);
				map.removeLayer(geologyLayer);												
				$('#a_2_7').addClass("outFocus");
				$('#a_2_8').removeClass("outFocus");
				$('#a_2_9').addClass("outFocus");
			}
		});
	}
	var windscroll_2_9 = $('#a_2_9').scrollTop();
	if (windscroll_2_9 >= 0) {
		$('#a_2_9').each(function (i) {
			if ($(this).position().top <= windscroll_2_9 + 300) {
				map.removeLayer(soviLayer);
				map.removeLayer(popLayer);
				map.removeLayer(lndcvrLayer);
				map.addLayer(huc12Layer);
				map.removeLayer(landfills);
				map.removeLayer(wWater);
				map.removeLayer(geologyLayer);								
				$('#a_2_8').addClass("outFocus");
				$('#a_2_9').removeClass("outFocus");
				$('#a_3_1').addClass("outFocus");
				$('#a_3_2').addClass("outFocus");
			}
		});
	}
	var windscroll_3_1 = $('#a_3_1').scrollTop();
	if (windscroll_3_1 >= 0) {
		$('#a_3_1').each(function (i) {
			if ($(this).position().top <= windscroll_3_1 + 300) {
				map.removeLayer(soviLayer);
				map.removeLayer(popLayer);
				map.addLayer(lndcvrLayer);
				map.removeLayer(huc12Layer);
				map.removeLayer(geologyLayer);								
				$('#a_2_9').addClass("outFocus");
				$('#a_3_1').removeClass("outFocus");
				$('#a_3_2').addClass("outFocus");
				$('#a_3_3').addClass("outFocus");
			}
		});
	}
	var windscroll_3_2 = $('#a_3_2').scrollTop();
	if (windscroll_3_2 >= 0) {
		$('#a_3_2').each(function (i) {
			if ($(this).position().top <= windscroll_3_2 + 300) {
				map.removeLayer(soviLayer);
				map.addLayer(popLayer);
				map.removeLayer(lndcvrLayer);
				map.removeLayer(huc12Layer);
				map.removeLayer(geologyLayer);


				$('#a_3_1').addClass("outFocus");
				$('#a_3_2').removeClass("outFocus");
				$('#a_3_3').addClass("outFocus");
				$('#a_3_4').addClass("outFocus");
				$('#a_4_0').addClass("outFocus");
				$('#a_4_1').addClass("outFocus");
//				$('#map').removeClass("hideElement");					
			}
		});
	}
	var windscroll_3_3 = $('#a_3_3').scrollTop();
	if (windscroll_3_3 >= 0) {
		$('#a_3_3').each(function (i) {
			if ($(this).position().top <= windscroll_3_3 + 300) {
				map.removeLayer(emGroup);
				map.addLayer(soviLayer);
				map.removeLayer(popLayer);
				map.removeLayer(lndcvrLayer);
				map.removeLayer(geologyLayer);
				$('#a_3_2').addClass("outFocus");
				$('#a_3_3').removeClass("outFocus");
				$('#a_3_4').addClass("outFocus");
				$('#a_4_0').addClass("outFocus");
//				$('#map').removeClass("hideElement");					
			}
		});
	}
	var windscroll_3_4 = $('#a_3_4').scrollTop();
	if (windscroll_3_4 >= 0) {
		$('#a_3_4').each(function (i) {
			if ($(this).position().top <= windscroll_3_4 + 300) {
				map.removeLayer(emGroup);
				map.removeLayer(soviLayer);
				map.removeLayer(popLayer);
				map.removeLayer(lndcvrLayer);

				$('#a_3_3').addClass("outFocus");
				$('#a_3_4').removeClass("outFocus");
				$('#a_4_0').addClass("outFocus");
				$('#a_4_1').addClass("outFocus");
//				$('#map').addClass("hideElement");				
			}
		});
	}
	var windscroll_4_0 = $('#a_4_0').scrollTop();
	if (windscroll_4_0 >= 0) {
		$('#a_4_0').each(function (i) {
			if ($(this).position().top - 40 <= windscroll_4_0 + 300) {
				map.removeLayer(commSec);
				map.removeLayer(emGroup);
				map.removeLayer(subStations);
				map.removeLayer(popLayer);


				$('#a_3_4').addClass("outFocus");
				$('#a_4_0').removeClass("outFocus");
				$('#a_4_1').addClass("outFocus");
				$('#a_4_2').addClass("outFocus");
//				$('#map').addClass("hideElement");
			}
		});
	}
	var windscroll_4_1 = $('#a_4_1').scrollTop();
	if (windscroll_4_1 >= 0) {
		$('#a_4_1').each(function (i) {
			if ($(this).position().top - 40 <= windscroll_4_1 + 300) {
				map.addLayer(emGroup);
				map.removeLayer(energyGroup);
				map.removeLayer(commSec);
				$('#a_3_3').addClass("outFocus");
				$('#a_4_0').addClass("outFocus");
				$('#a_4_1').removeClass("outFocus");
				$('#a_4_2').addClass("outFocus");
				$('#a_4_3').addClass("outFocus");
//				$('#map').removeClass("hideElement");				
			}
		});
	}
	var windscroll_4_2 = $('#a_4_2').scrollTop();
	if (windscroll_4_2 >= 0) {
		$('#a_4_2').each(function (i) {
			if ($(this).position().top - 40 <= windscroll_4_2 + 300) {
				map.removeLayer(emGroup);
				map.removeLayer(transGroup);
				map.addLayer(energyGroup);
				$('#a_4_1').addClass("outFocus");
				$('#a_4_2').removeClass("outFocus");
				$('#a_4_3').addClass("outFocus");
				$('#a_4_4').addClass("outFocus");
//				$('#map').removeClass("hideElement");					
			}
		});
	}
	var windscroll_4_3 = $('#a_4_3').scrollTop();
	if (windscroll_4_3 >= 0) {
		$('#a_4_3').each(function (i) {
			if ($(this).position().top - 40 <= windscroll_4_3 + 300) {
				map.addLayer(transGroup);
				map.removeLayer(energyGroup);
				map.removeLayer(commSec);
				map.removeLayer(govSect);					
				$('#a_4_2').addClass("outFocus");
				$('#a_4_3').removeClass("outFocus");
				$('#a_4_4').addClass("outFocus");
				$('#a_4_5').addClass("outFocus");
			}
		});
	}
	var windscroll_4_4 = $('#a_4_4').scrollTop();
	if (windscroll_4_4 >= 0) {
		$('#a_4_4').each(function (i) {
			if ($(this).position().top - 40 <= windscroll_4_4 + 300) {
				map.removeLayer(transGroup);
				map.removeLayer(tsca);
				map.removeLayer(govSect);
				map.addLayer(commSec);
				map.removeLayer(energyGroup);				
				$('#a_4_2').addClass("outFocus");
				$('#a_4_3').addClass("outFocus");
				$('#a_4_4').removeClass("outFocus");
				$('#a_4_5').addClass("outFocus");
				$('#a_5_1').addClass("outFocus");
			}
		});
	}
	var windscroll_4_5 = $('#a_4_5').scrollTop();
	if (windscroll_4_5 >= 0) {
		$('#a_4_5').each(function (i) {
			if ($(this).position().top - 40 <= windscroll_4_5 + 300) {
				map.removeLayer(transGroup);
				map.removeLayer(tsca);
				map.addLayer(govSect);
				map.removeLayer(energyGroup);				
				map.removeLayer(commSec);
				$('#a_4_3').addClass("outFocus");
				$('#a_4_4').addClass("outFocus");
				$('#a_4_5').removeClass("outFocus");
				$('#a_5_1').addClass("outFocus");

			}
		});
	}
	var windscroll_5_1 = $('#a_5_1').scrollTop();
	if (windscroll_5_1 >= 0) {
		$('#a_5_1').each(function (i) {
			if ($(this).position().top - 40 <= windscroll_5_1 + 300) {
				map.removeLayer(commSec);
				map.removeLayer(govSect);				
				map.removeLayer(transGroup);
				map.removeLayer(tsca);
				$('#a_4_4').addClass("outFocus");
				$('#a_4_5').addClass("outFocus");
				$('#a_5_1').removeClass("outFocus");
				$('#a_6_1').addClass("outFocus");

			}
		});
	}
	var windscroll_6_1 = $('#a_5_1').scrollTop();
	if (windscroll_6_1 >= 0) {
		$('#a_6_1').each(function (i) {
			if ($(this).position().top - 40 <= windscroll_6_1 + 300) {
				$('#a_4_4').addClass("outFocus");
				$('#a_4_5').addClass("outFocus");
				$('#a_5_1').addClass("outFocus");
				$('#a_6_1').removeClass("outFocus");
			}
		});
	}
}).scroll();


// BUTTONS
$(".container1").click(function (event) {
	if (map.hasLayer(localEoc)) {
		map.removeLayer(localEoc);
	} else {
		map.addLayer(localEoc);
	}
});
$(".container2").click(function (event) {
	if (map.hasLayer(policeStations)) {
		map.removeLayer(policeStations);
	} else {
		map.addLayer(policeStations);
	}
});
$(".container3").click(function (event) {
	if (map.hasLayer(fireStations)) {
		map.removeLayer(fireStations);
	} else {
		map.addLayer(fireStations);
	}
});
$(".container4").click(function (event) {
	if (map.hasLayer(emsStations)) {
		map.removeLayer(emsStations);

	} else {
		map.addLayer(emsStations);
	}
});
$(".container5").click(function (event) {
	if (map.hasLayer(hospitalsLayer)) {
		map.removeLayer(hospitalsLayer);
	} else {
		map.addLayer(hospitalsLayer);
	}
});
$(".container6").click(function (event) {
	if (map.hasLayer(shelter)) {
		map.removeLayer(shelter);
	} else {
		map.addLayer(shelter);
	}
});
$(".container7").click(function (event) {
	if (map.hasLayer(hurrevac)) {
		map.removeLayer(hurrevac);
	} else {
		map.addLayer(hurrevac);
	}
});
$(window).resize(function () {
	sizeLayerControl();
});
//////////////////////TOOLS/////////////////////////////
$("#about-btn").click(function () {
	$("#aboutModal").modal("show");
	$(".navbar-collapse.in").collapse("hide");
	return false;
});
$("#full-extent-btn").click(function () {
	map.flyTo([36.1, -96.1], 5);
	$(".navbar-collapse.in").collapse("hide");
	return false;
});

$("#legend-btn").click(function () {
	$("#legendModal").modal("show");
	$(".navbar-collapse.in").collapse("hide");
	return false;
});

$("#login-btn").click(function () {
	$("#loginModal").modal("show");
	$(".navbar-collapse.in").collapse("hide");
	return false;
});
/////////////////////////////////////////////////////////
$("#list-btn").click(function () {
	animateSidebar();
	return false;
});

$("#nav-btn").click(function () {
	$(".navbar-collapse").collapse("toggle");
	return false;
});

$("#sidebar-toggle-btn").click(function () {
	animateSidebar();
	return false;
});

$("#sidebar-hide-btn").click(function () {
	animateSidebar();
	return false;
});