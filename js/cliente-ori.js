$(function(){


	$('body').on('click','.add-endereco',function() {
		var $last= $('.div-endereco:last');
		var $clone = $last.clone();
		$clone.find(':text,select,select option').removeAttr('readonly').removeAttr('disabled');
		$clone.find(':text,select').val('');

		next = $last.find(':text:first').attr('name').replace(/\D/igm,'')|0;
		next++;
		$clone.find(':text,select,[type=hidden]').each(function() {
			var $el = $(this);
			var name = $el.attr('name').replace(/\d+/,next);
			$el.attr('name',name);				

		});
		$clone.find('[name=padrao]').removeAttr('checked');

		$clone.insertBefore($('.target'));
		$clone.find(':text').setMask();
		
		
	});

	$('body').on('click','.del-endereco',function() {
		if ($('.div-endereco').length<=1) return;
		
		var $self = $(this);
		var $divEndereco = $self.closest('.div-endereco');
		$divEndereco.remove();

		if ($('.div-endereco [name=padrao]:checked').length==0) {
			$('.div-endereco [name=padrao]:first').attr('checked','checked');
		}
		//var $last = $('.div-endereco:last');
		


	});

	if ($('.div-endereco [name=padrao]:checked').length==0) {
		$('.div-endereco [name=padrao]:first').attr('checked','checked');
	}
	$('body').on('keyup','.div-endereco [alt=cep]',function() {
		var $self = $(this);
		var $divEndereco = $self.closest('.div-endereco');

		var cep = $self.val().replace(/\D/igm,'');
		if (cep.length!=8) return;

		$.fancybox.showLoading();
		$divEndereco.find(':text:not([name*=titulo]),select').val('');
		$divEndereco.find(':text,select,select option').removeAttr('readonly').removeAttr('disabled');

		SGT.location.getLogradouro(cep,function(resp){
			$.each(resp,function(i,val){
				if (val!='') {
					var $el = $divEndereco.find('[name*='+i+']');						
					$el.val(val);
					if (i!='cep') {							
						if ($el.is('select')) {
							$el.find('option:not(:selected)').attr('disabled','disabled');
						} else {
							$el.attr('readonly','readonly');													
						}
					}
				}
			});
			$.fancybox.hideLoading();
		});
	});
	$('body').on('submit','[name=formCadastro]',function() {
		var $self = $(this);
		if ($self.data('enviando')) return false;
		if (!$self.find('.required').validate()) return false;

		var $email = $self.find('[name=email]');
		var $email2 = $self.find('[name=email2]');

		if ($email.val() != $email2.val()) {
			alert("Confirme o e-mail corretamente.");
			$email2.focus();
			return;
		}

		var $senha = $self.find('[name=senha]');
		var $senha2 = $self.find('[name=senha2]');

		if ($senha.val() != $senha2.val()) {
			alert("Confirme a senha corretamente.");
			$senha2.focus();
			return false;
		}

		$self.data('enviando',true);
		$.fancybox.showLoading();

		var callback = function(resp) {
			if (resp.redirect_url != undefined) {
				location.href = resp.redirect_url;
				return;
			}

			alert(resp.msg);
			if (resp.success) {
				location.reload(true);
				return;
			}

			$.fancybox.hideLoading();
			$self.data('enviando',false);
		};

		$.ajax({
			url: $self.attr('action'),
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
	$('body').on('submit','[name=formLogin]',function() {
		var $self = $(this);
		if ($self.data('enviando')) return false;
		if (!$self.find('.required').validate()) return false;

		$.fancybox.showLoading();
		$self.data('enviando',true);

		var callback = function(resp) {
			if (resp.redirect_url != undefined) {
				location.href = resp.redirect_url;
				return;
			}

			if (resp.success) {
				location.reload(true);
				return;
			}

			alert(resp.msg);
			$self.data('enviando',false);
			$.fancybox.hideLoading();
		}

		$.ajax({
			url: $self.attr('action'),
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
	$('body').on('submit','[name=formEsqueciMinhaSenha]',function() {
		var $self = $(this);
		if ($self.data('enviando')) return false;
		if (!$self.find('.required').validate()) return false;

		$.fancybox.showLoading();
		$self.data('enviando',true);

		var callback = function(resp) {
			if (resp.redirect_url != undefined) {
				location.href = resp.redirect_url;
				return;
			}

			$.fancybox.hideLoading();
			alert(resp.msg);
			if (resp.success) {
				$.fancybox.close();
				return;
			}

			$self.data('enviando',false);
		}

		$.ajax({
			url: $self.attr('action'),
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

});