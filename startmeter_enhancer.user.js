// ==UserScript==
// @name           STARmeter enhancer
// @namespace      http://www.coldmochi.com/
// @require        http://code.jquery.com/jquery-latest.min.js
// @include        http://pro.imdb.com/people/*
// ==/UserScript==
// This script adds the birthday information for each actor and actresses under the STARMeter table for IMDBPro
$body = $('body > div:eq(1) > table > tbody > tr > td:eq(1) > table:eq(2) > tbody');
$rows = $body.find('tr:gt(0)');
$body.find('tr:eq(0) td:eq(6)').after('<td>Birthday</td>');
$rows.find('td:eq(6) a').each( function(i) {
	href = $(this).attr('href'); 
	$td = $(this).parent();
	GM_xmlhttpRequest({
		method: 'GET',
		url: href,
		onload: (function($td) {
			return function(response) {
				$res = response.responseText;
				birthday = /Born[\s\S]*\(age/gm.exec($res)[0];
				birthday = birthday.substring(33).replace(/,[\s\S]*/, '');
				$td.after("<td>"+birthday+"</td>");
			};
		})($td)
	});	
});

