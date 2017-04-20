$(function(){
	var oToday = $('.today').clone(true);
	$('.today').remove();
	var oDay = $('.weather').clone();
	$('.weather').remove();
	var str = window.location.href;
	str = str.split('?')[1];
	var city = str.split('=')[1];
//				console.log(decodeURI(city));
	
	$.get('http://wthrcdn.etouch.cn/weather_mini?city=' + city, function(data){
		data = JSON.parse(data);
//					console.log(data);
		$.each(data.data.forecast, function(index, array) {
			if(index == 0){
				setInfo(array, oToday);
				oToday.appendTo('.todaycon');
				$('.city', oToday).html(decodeURI(city));
			}else{
				var item = oDay.clone(true);
				setInfo(array, item);
				item.appendTo('.otherday');
			}
		});
	})
})

function setInfo(array, item){
//				console.log(array);
	$('img', item).prop('src', selectImg(array.type));
	$('.status', item).html(array.type);
	$('.date', item).html(array.date);
	$('.wind', item).html(array.fengli);
	$('#low', item).html(array.low.slice(3,5));
	$('#high', item).html(array.high.slice(3,5));
	item.appendTo('#container');
}

function selectImg(str){
	switch(str){
		case '晴': return 'img/1.png';
		case '多云': return 'img/5.png';
		case '阴': return 'img/3.png';
		defaults: return 'img/10.png';
	}
}