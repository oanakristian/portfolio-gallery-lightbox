/*
 GALLERY FUNCTIONALITY - FILTER IMAGES
 */
$('.portfolio-categories a').on('click', filterImages);

function filterImages(e){
	e.preventDefault();
	var filter = $(this).data('filter');

	// transfer clasa active la noul link
	$('.active').removeClass('active');
	$(this).addClass('active');

	if(filter.length > 0){
		// ascund imaginile in functie de filtru
		$('.portfolio-list li:not([data-type="' + filter + '"])').hide();
		$('.portfolio-list li[data-type="' + filter + '"]').show();
	} else {
		//afisez toate imaginile
		$('.portfolio-list li').show();
	}
}

$('.portfolio-block-hover').on('click', displayImage);

function displayImage(e) {
	e.preventDefault(); //dezactivam functionaliate default a href
	var container = $('<div>'); // cream un element de tip div
	container.addClass('overlay'); // ii adaugam o clasa "overlay"
	$('body').prepend(container); // adaugam elementul imediat dupa body
	container.show(); // afisam containerul

	// preluam link-ul pozei de pe atributul a href
	var src = $(this).children('a').attr('href');
	var projectSrc = $(this).children('a').data('project');
	var img = $('<img>'); //creez elementul imagine
	var projectLink = $('<a>'); //creez elementul a href

	img.addClass('ceva');
	img.attr('src', src);
	projectLink.addClass('project-link');
	projectLink.attr('src', projectSrc);
	projectLink.text('View Live Project');

	// astept ca imaginea sa se incarce complet
	img.on('load', function(){
		//adaug in container a href pentru proiect
		container.prepend(projectLink);
		//extrag dimensiunile imaginii
		container.prepend(img);
		var w = img.width();
		var h = img.height();

		// redimensionam imaginea in functie de rezolutia ecranului
		var maxW = 0.6 * $(window).width();
		var maxH = 0.6 * $(window).height();

		if(w > maxW) {
			h = h * maxW / w;
			w = maxW;
		}
		if(h > maxH){
			w = w * maxH / h;
			h = maxH;
		}
		//deplasm imaginea in centrul ecranului
		var mLeft = -1 * (w / 2);
		var mTop = -1 * (h / 2);
		img.css({
			'margin-left': mLeft + 'px',
			'margin-top': mTop + 'px',
			'width': w + 'px',
			'height': (h + 50) + 'px'
		});
		var linkTop = h/2;
		var linkleft = mLeft + 13;
		projectLink.css({
			'margin-left': linkleft + 'px',
			'margin-top': linkTop + 'px'
		});
	});
}

$(document).on('click','.overlay', removeOverlay);

function removeOverlay(e){
	$(this).remove();
}

$(document).on('click', '.overlay img', function(e){
	e.stopPropagation();
});