$(document).ready(function () {
  //scroll
    $('.navigation a').click(function() {
      var href=$(this).attr("href");
      $("html, body").animate({
      scrollTop: $(href).offset().top - 0
      }, 1000);

      return false;
    });
  //Всплывашки
  $('.house .item').hover(
  function(){
    var th = $(this);
    var text = th.attr('data-text');
    th.append("<p>"+text+"</p>");
  },
  function(){
    $('.house .item p').remove();
  });
  //Галереи проектов
  $('.project-gellery').slick({
    arrows : true,
    prevArrow : '<div class="slick-arrow slick-prev"></div>',
    nextArrow : '<div class="slick-arrow slick-next"></div>',
    speed : 1000
  });

  //ПопАп
  $('.popUp').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
    midClick: true,
    mainClass: 'my-mfp-zoom-in'
	});
  //Чекбокс
    $('.checkbox').click(function() {
      var th=$(this);

      if(th.children('input').prop("checked"))
      {
        th.children('.box').html('').parent().children('input').prop("checked",false);
      }
      else{
        th.children('.box').html('<div class="active"></div>').parent().children('input').prop("checked",true);
      }
    });

  //ПопАп ФОрма
  $('a[href="#dialog"]').magnificPopup({
  		type: 'inline',

  		fixedContentPos: false,
  		fixedBgPos: true,

  		overflowY: 'auto',

  		closeBtnInside: true,
  		preloader: false,

  		midClick: true,
  		removalDelay: 300,
  		mainClass: 'my-mfp-zoom-in'
	});


  //Калькулятор
  $('#showResult').click(function(e) {
    e.preventDefault();
    $('.result').fadeIn("slow");
  });

  //СЛайдер построенные дома
  $('.sect-6 .slider').slick({
    arrows : true,
    prevArrow : '<div class="slick-arrow slick-prev"></div>',
    nextArrow : '<div class="slick-arrow slick-next"></div>',
    speed : 1000,
    dots: true,
    dotsClass: 'slick-dots',
    adaptiveHeight : true
  });
  //СЛайдер сканы
  $('.sect-8 .slider').slick({
    arrows : true,
    prevArrow : '<div class="slick-arrow slick-prev"></div>',
    nextArrow : '<div class="slick-arrow slick-next"></div>',
    speed : 1000,
    dots: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    dotsClass: 'slick-dots',
    adaptiveHeight : true
  });

  //Маски
  $("input[name=phone]").mask("+9 (999) 999-99-99", {placeholder: "+7 (000) 000-00-00" });

  $('#downloadfile').click(function(){
    var th= $(this);

    if(th.children('input[name="name"]').val()=="" || th.children('input[name="email"]').val()=="")
    {
      return;
    }
    else{
      window.location.href="13_OShIBOK_pri_vybore_doma_v_Ufe.ppt";
    }

  });
  //Форма отправка
  $('form button').click(function (e) {
    e.preventDefault();
    var th=this;
    jQuery.ajax({
    url:     '/send.php',
    type:     "POST",
    data: jQuery(th).parent().serialize(),
    success: function(response) {
      alert(response);
    },
    error: function(response) {
      alert("Ошибка. Попробуйте позже.");
    }
    });
  });




});

function calc() {
    //получаем ссылку на элемент Select (Тип дизайна)
    var type_design = document.getElementById("Fund");
    var type_design = document.getElementById("Crow");
    var type_design = document.getElementById("Season");
    var type_design = document.getElementById("Otdel");
    //получаем ссылку на чекбокс (Требуется верстка?)

    //получаем ссылку на элемент input (Кол-во вариантов)
    var count = document.getElementById("Metr");
    //получаем ссылку на элемент span, в него будем писать стоимость дизайна
    var result = document.getElementById("result");

    var price = 0;
    price += 14500 + parseInt(Fund.options[Fund.selectedIndex].value) + parseInt(Crow.options[Crow.selectedIndex].value) + parseInt(Season.options[Season.selectedIndex].value) + parseInt(Otdel.options[Otdel.selectedIndex].value);

    price = parseInt(Metr.value) * price;

    result.innerHTML = price;
}
