var theWindow = $(window).width();




$(document).ready(function() {

	if(theWindow < 1024) {
		// Menu celular
		$('.open-menu').on('click', function(){

			$('body').toggleClass('menu-aberto');
		});

		$('.open-sub').on('click', function(){

			if($(this).next('ul').is(':hidden')) {
				$(this).next('ul').css({
					'-webkit-transform' : 'translateX(0)',
					'-moz-transform' 	: 'translateX(0)',
					'-ms-transform' 	: 'translateX(0)',
					'transform' 		: 'translateX(0)',
					'display' 			: 'block'
				});
			} else {
				$(this).next('ul').css({
					'-webkit-transform' : 'translateX(-280px)',
					'-moz-transform' 	: 'translateX(-280px)',
					'-ms-transform' 	: 'translateX(-280px)',
					'transform' 		: 'translateX(-280px)',
					'display' 			: 'none'
				});
			}
		});

		$('.close-sub').on('click', function(){

			$('.dropdown').css({
				'-webkit-transform' : 'translateX(-280px)',
				'-moz-transform' 	: 'translateX(-280px)',
				'-ms-transform' 	: 'translateX(-280px)',
				'transform' 		: 'translateX(-280px)',
				'display' 			: 'none'
			});
		});
	}

	
		$('.fancy').fancybox({
			helpers : {
				title : {
					type : 'inside'
				},
				overlay : {
					locked : false
				}
			},
			afterShow: function() {
				$(':text').setMask();
			}
		});
	

	 $('[data-menu]').each(function(){
         var menu = $(this).data('menu');
         if ($('body').is('.'+menu)) {
             $(this).find('a:eq(0)').addClass('actv');
         }
    });

    $(window).on('scroll load', function() {
    	var scrollTop = axysY();
    	if(scrollTop > 0) {
    		$('.mobile-menu').addClass('menu-scroled');
    	} else {
    		$('.mobile-menu').removeClass('menu-scroled');
    	}
    });

	//Retorna top
	function axysY() {
		return $(window).scrollTop();
	}

	/**
	* Mark-up do component de adicionar ou remover itens
	*<div class="add-quantidade" data-max="15">
	*	<div class="row flex align-center collapse">
	*		<div class="small-12 columns">
	*			<form class="row flex align-center collapse">
	*				<div class="small-3 text-center columns">
	*					<a href="javascript:void(0);" class="add-btn effect" data-action="remove">-</a>
	*				</div>
	*				<div class="small-6 columns">
	*					<input type="text" value="1" name="quantidade" class="add-target">
	*				</div>
	*				<div class="small-3 text-center columns">
	*					<a href="javascript:void(0);" class="add-btn effect" data-action="add">+</a>
	*				</div>
	*			</form>
	*		</div>
	*	</div>
	*</div>
	*/
	$('.add-quantidade .add-btn').on('click', function(){

		var selfComponent = $(this).closest('.add-quantidade');
		var maxQuantidade = selfComponent.data('max');
		var qtd = selfComponent.find(':text').val();

		if($(this).data('action') == 'add') {
			qtd++;
		}

		if($(this).data('action') == 'remove') {
			qtd--;
		}

		if (qtd < 1) qtd = 1;
		if (qtd > maxQuantidade && maxQuantidade != 0) qtd = maxQuantidade;

		selfComponent.find(':text').val(qtd);
	});

	
	var loadLargeImage = function($self) {
		var large_image = $self.data('large_image'); 
		
		var matches = /(\d+)x(\d+)/.exec(large_image);
		if (matches) {
			var w = matches[1];
			var h = matches[2];

			var size = matches[0];

			max_width = window.screen.width*1.5;
			max_height = window.screen.height*1.5;
			if (max_height > max_width) max_width = max_height;
			max_width = Math.round(max_width);
			if (w > max_width) {
				var alpha = w / max_width;
				w = Math.round(max_width);
				h = Math.round(h * alpha);
			}

			large_image = large_image.replace(size,w+'x'+h);
		}




		(function(src, $el){
			
			var img = new Image();
			img.onload = function() {
				$el.css('transition','background-image 0.5s');
				$el.css('background-image','url('+src+')');
			};
			img.src = src;
		}(large_image, $self));
	};

	var $cardBanner = $('.card-banner');
	if ($cardBanner.length != 0) {		
		//loadScript('https://cdn.jsdelivr.net/combine/npm/slick-carousel@1.6.0').then(function() {
			$('.carousel').slick({
				arrows: false,
				dots: true,
				slidesToShow: 1,
		        autoplay: true,
		        lazyLoad: 'ondemand'
			});
			$('.carousel').on('beforeChange', function(event, slick, currentSlide, nextSlide) {			
				var $el = $('.carousel [data-slick-index="'+nextSlide+'"]');	
				(function($el){
					loadLargeImage($el);		
				}($el));
			})
			
			
			$cardBanner.css({display:'block'});
		//});
	}
		
	
	
	$('.close-bar').click(function(){
		$('.wrap-top-bar').slideUp('slow, 1000');
	});

	$('.about-images li').slice(0, 4).show();
	$('.about-images .button').click(function(){
		$('.about-images li:hidden').slice(0,4).slideDown();
		if ($('.about-images li:hidden').length == 0) {
			$('.about-images .button').hide();
		}		
	});

	$('.scroll-top').click(function(){ 
        $('html,body').animate({ scrollTop: 0 }, 'slow');
        return false; 
    });
	
});


var language = 'br';
var Modelo = {
	
	init : function(){
		
		language = $('meta[name=language]').attr('content');
		
		Modelo.ajaxForm('[name=formNewsletter],[name=formContato],[name=formOrcamento]');
		
	
		
		$('input[alt=phone]').each(function(){
			$(this).click(function () {
				$.mask.masks.phone.mask = '(99) 9999-99999';
				$(':text').setMask();
			});
			$(this).blur(function () {
				var phone, element;
				element = $(this);
				phone = element.val().replace(/\D/g, '');
				if(phone.length > 10) {
					element.setMask("(99) 99999-9999?9");
					} else {
					element.setMask("(99) 9999-9999?9");
				}
			});
		});
		
		
		$('body').on('submit','[name=formTrabalheConosco]',function(){
			var $self = $(this);
			
			if ($self.data('enviando')) return false;
			if (!$self.find('.required').validate()) return false;
			
			$self.data('enviando',true);
			$.fancybox.showLoading();
			
			var callback = function(resp) {
				if (resp.redirect_url != undefined) {
					location.href = resp.redirect_url;
					return;
				}
				
				$.fancybox.hideLoading();
				$self.data('enviando',false);
				if (resp.popup_url != undefined) {
					
					$.fancybox.open([{
						href: resp.popup_url,
						type: ajax
					}]);
					
				}
				alert(resp.msg);
				if (resp.success) {
					$self[0].reset();
					$self.find('.btn-upload').val('Selecionar');
					$self.find('[name*=curriculo]').remove();
				}
			};
			
			$.ajax({
				url: $self.attr('action')+'?t='+Date.now(),
				method: 'post',
				dataType: 'json',
				data: $self.serializeArray(),
				success: callback,
				error: function() {
					callback({success:false,msg:"Não foi possível enviar o formulário."});
				}
			});
			
			return false;
		});
		
		
	},
	
	ajaxForm: function(selector,cb) {
		$('body').on('submit',selector,function(){
			var $self = $(this);
			if ($self.data('enviando')) return false;
			if (!$self.find('.required').validate()) return false;
			
			$self.data('enviando',true);
			$.fancybox.showLoading();
			
			var callback = function(resp) {
				$self.data('enviando',false);
				$.fancybox.hideLoading();
				
				if (cb) return cb(resp,$self);
				alert(resp.msg);
				if (resp.success) {
					$self[0].reset();
					$self.find('[alt=phone]').val('');
				}
			}
			
			$.ajax({
				url: $self.attr('action')+'?t='+Date.now(),
				type: 'post',
				dataType: 'json',
				data: $self.serializeArray(),
				success: callback,
				error: function() {
					callback({success:false,msg:"Não foi possível enviar o formulário."});
				}
			});
			return false;
		});
	},
	
	
}

$(Modelo.init);
$(document).load(function(){

	$(function(){
		window.setTimeout(function() {

		},0);
	});
});
$('.loader').addClass('hide');

/**
	* MEDIAS
*/
// > 1024 pixels
//if($(window).width() > 1024) {

//Habilita Máscara apenas para desktops
$(function(){
	$.mask.masks.phone.mask = '(99) 9999-99999';
	$(':text').setMask();
});
//}

$(function(){
		$('iframe[data-src]').each(function(){
			$(this).attr('src',$(this).data('src'));
		});
	
		var $img = $('#flyer img');
		if ($img.length==0) return;
		var flyer = new Image();
		flyer.onload = function() {
			$.fancybox({
				href:'#flyer',
				autoResize : false,
				autoCenter : false,
				autoSize : true
			});
		}
		flyer.src = $('#flyer img').attr('src');

});								