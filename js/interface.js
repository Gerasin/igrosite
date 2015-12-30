$(document).ready(function() {

	$('a[href=#]').click(function(e) {
		e.preventDefault();
	});

	// detect touch device
	if (isTouchDevice() === true) {
		$('body').addClass('touch');
	} else {
		$('body').addClass('no-touch');
	}


    $('.top-nav__item--submenu').bind( "click", function(){
        $(this).addClass('active');
        $('.top-nav__submenu').fadeIn(300);
        $('.edition, .main-games, .loto-cont, .inner-header, .crubs, .menu-hor, .profile, .kupon, .text, .loto_sto').addClass('blur');
        return false
    })


    $('.top-nav__submenu').mouseleave(function(){
        $('.top-nav__submenu').fadeOut(300);
        $('.top-nav__item--submenu').removeClass('active');
        $('.edition, .main-games, .loto-cont, .inner-header, .crubs, .menu-hor, .profile, .kupon, .text, .loto_sto').removeClass('blur');
    });





    $('.main-result__kind-anchor').bind( "click", function(){
        $(this).addClass('active');
        $('.main-result__kind-list').fadeIn(300);
        return false
    })

    $('.main-result__kind-list').mouseleave(function(){
        $('.main-result__kind-list').fadeOut(300);
        $('.main-result__kind-anchor').removeClass('active');
    });




    // setTimeout($('.time-tab_content').css('opacity','1'), 2000);

    var actSl;

    //TIMESCALE-TODAY
    if ($('#clock-today').length>0) {
        for (var i = 0; i < 24; i++){
            if (i != 0){
                $("#numbers-today").append("<span id="+i+" class=\'number-box\'><div class=\'line\'></div></span>");
            }
            else{
                $("#numbers-today").append("<span id="+'00'+" class=\'number-box\'><div class=\'line\'></div></span>");
            }
        }

        // Display time bars
        var d, ms, s, m, h;
        var clock = $("#clock-today");
        var secondBar = $("#seconds-today");
        var SPM = 60;

        var seconds = setInterval(function(){
            d = new Date();
            ms = d.getMilliseconds();
            s = (d.getSeconds() + (ms / 1000));

            sWidth = (s / 60) * 100;

        }, 200)

        var minutes = setInterval(function(){
            m = d.getMinutes();
            mWidth = ((m + (sWidth / 100)) / 60) * 100;

        }, 500)

        var hours = setInterval(function(){
            h = d.getHours();
            // alert(h);
            hWidth = ((h + (mWidth / 100)) / 24) * 100;
            $("#hours-today").width(hWidth+'%');
        }, 1000)


        $('.time-item-today').each(function(indx, element){
            var hours = $(this).data('hours');
            var minutes = $(this).data('minutes');
            h = hours % 24;
            mWidth = (minutes / 60) * 100; 
            var hposition = ((h + (mWidth / 100)) / 24) * 100;
            $(element).css('left', hposition + '%');
            if(minutes == 00) {
                $(this).addClass('time-item-one');
            }
        });

        
    };

    da = new Date();
    ha = da.getHours() ;
    
    var slPosit = $('#clock-today').width() * (ha / 24) * -1;
    slPosit = slPosit + 'px';

    $("#clock-today .events-wrapper").mThumbnailScroller({
        axis:"x",
        setLeft: 0,
        type:"click-20",
        scrollToPercentY : 100,
        contentTouchScroll: true,
        advanced:{
            updateOnContentResize: true
        }
    });

    

    //TIMESCALE-TOMORROW
    var timeSC;
    var clickL = 0;
    if ($('#clock-tomorrow').length>0) {
        for (var i = 0; i < 24; i++){
            if (i != 0){
                $("#numbers-tomorrow").append("<span id="+i+" class=\'number-box\'><div class=\'line\'></div></span>");
            }
            else{
                $("#numbers-tomorrow").append("<span id="+'00'+" class=\'number-box\'><div class=\'line\'></div></span>");
            }
        }

        // Display time bars
        var d, ms, s, m, h;
        var clock = $("#clock-tomorrow");
        var secondBar = $("#seconds-tomorrow");
        var SPM = 60;

        var seconds = setInterval(function(){
            d = new Date();
            ms = d.getMilliseconds();
            s = (d.getSeconds() + (ms / 1000));

            sWidth = (s / 60) * 100;

        }, 200)

        var minutes = setInterval(function(){
            m = d.getMinutes();
            mWidth = ((m + (sWidth / 100)) / 60) * 100;

        }, 500)


        var hours = setInterval(function(){
            h = d.getHours();
            // alert(h);
            hWidth = ((h + (mWidth / 100)) / 24) * 100;
            $("#hours-tomorrow").width(hWidth+'%');

            $('.mTS_horizontal .mTSContainer, .time-btn a, .time-tabs li, .time-tabs li a').mousedown(function(){clickL = 1});
            if(clickL == 0) {
                var timeSC = (hWidth / 100 * $('.mTSAutoContainer').width() * -1) + $('.mTSWrapper').width() / 2;
                var timeMax = ($('.mTSAutoContainer').width() - $('.mTSWrapper').width()) * -1;
                if(timeMax > timeSC) {
                    $('.mTSAutoContainer').css({'left' : timeMax});
                } else {
                    if(timeSC < 0) {
                        $('.mTSAutoContainer').css({'left' : timeSC});
                    } else {
                        $('.mTSAutoContainer').css({'left' : 0});
                    }
                };

                console.log(h);

                if(h < 2) {
                    $('.time_bar-message').addClass('left');
                    $('.time_bar-message').removeClass('right');
                } else {
                    if(h < 23) {
                        $('.time_bar-message').removeClass('left');
                        $('.time_bar-message').removeClass('right');
                    } else {
                        $('.time_bar-message').addClass('right');
                        $('.time_bar-message').removeClass('left');
                    }
                }
                
            };
            
            sec = d.getSeconds();
            clockReset = h+''+m+''+sec;
            if(clockReset == '000') {
                functNewDay();
            };

        }, 1000)


        $('.time-item-tomorrow').each(function(indx, element){
            var hours = $(this).data('hours');
            var minutes = $(this).data('minutes');
            h = hours % 24;
            mWidth = (minutes / 60) * 100; 
            var hposition = ((h + (mWidth / 100)) / 24) * 100;
            $(element).css('left', hposition + '%');
        });
    };

    $("#clock-tomorrow .events-wrapper").mThumbnailScroller({
        axis:"x",
        setLeft: "-2000px",
        type:"click-20",
        contentTouchScroll: true,
        advanced:{
            updateOnContentResize: true
        }, 
    });


    //TIME-TABS
    $(".time-tab_content").css({'visibility':'hidden', 'position':'absolute'});
    $("ul.js-time-tabs li:first").addClass("active");
    $(".time-tab_content:first").css({'visibility':'visible', 'position':'static'});

    $("ul.js-time-tabs li").click(function() {
        $("#clock-today .events-wrapper").mThumbnailScroller("update");
        $("#clock-tomorrow .events-wrapper").mThumbnailScroller("update");
        $("ul.js-time-tabs li").removeClass("active");
        $(this).addClass("active");
        $(".time-tab_content").css({'visibility':'hidden', 'position':'absolute'});
        var activeTab = $(this).find("a").attr("href");
        $(activeTab).css({'visibility':'visible', 'position':'static'});
        clickIndex = $(this).index();
        centerTime = ($('#hours-today').width() - $('.time-tab_container').width() / 2) * -1;
        if(clickIndex == 1) {
            $('#time-tab2 .mTSAutoContainer').animate({'left' : 0 + 'px'})
        } else {
            dragRight = $('#time-tab1 .mTSAutoContainer').parent().width() - $('#time-tab1 .mTSAutoContainer').width();
            dragLeft = 0;
            if(centerTime < dragRight) { 
                $('#time-tab1 .mTSAutoContainer').animate({'left' : dragRight + 'px'})
            } else {
                if(centerTime > dragLeft) {
                    $('#time-tab1 .mTSAutoContainer').animate({'left' : 0 + 'px'})
                } else {
                    $('#time-tab1 .mTSAutoContainer').animate({'left' : centerTime + 'px'})
                }
            };
        };
        return false;
    });




    //PROGRESSBAR
    if ($('.meter').length>0) {
        var bar = $('.meter span');
        var width = bar.attr('style');
        width = width.replace("width:", "");
        width = width.substr(0, width.length-1);
        var interval;
        var start = 0; 
        var end = parseInt(width);
        var current = start;
        var countUp = function() {
        if (current === end) {
            clearInterval(interval);
        }
        };
        interval = setInterval(countUp, (1000 / (end + 1)));
    };


    //preloader settings
    var opts = {
        lines: 12,
        length: 7,
        width: 2,
        radius: 5,
        corners: 1,
        rotate: 0,
        direction: 1,
        color: '#893160',
        speed: 1,
        trail: 60,
        shadow: false,
        hwaccel: false,
        className: 'spinner',
        zIndex: 100,
        top: '50%',
        left: '50%',
    };


    if ($('.bonus-slider').length>0) {
        $('.bonus-slider').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: true,
            dots: false,
        });

        var target = document.getElementById('loader-bonus');
        var spinner = new Spinner(opts).spin(target);

        $('#loader-bonus').fadeOut(500, function(){
            $('.bonus-slider').animate({'opacity':'1'},900);
        });
    };

    $('.time-btn-next').click(function(){
        $('.mTSButtonRight').click();
        return false;
    });
    $('.time-btn-prev').click(function(){
        $('.mTSButtonLeft').click();
        return false;
    });

    $('.top-nav__submenu-list__item-link a').click(function(){
        var navText = $(this).find('.txt').text();
        var navIco = $(this).attr('rel');
        $('.main-result__kind-anchor span').text(navText);
        $('.main-result__kind-anchor i img').attr('src', navIco);
        return false;
    });


    $('#container').mixItUp();

    
    $( ".mTSAutoContainer" ).draggable({  
        axis: "x",
        stop: function( event, ui ) {
            dragLeft = $(this).css('left');
            dragLeft = parseFloat(dragLeft, 10);
            dragRight = $(this).parent().width() - $(this).width();
            if(dragLeft > 0) { $('.mTSAutoContainer').animate({'left' : 0}) };
            if((dragLeft) < dragRight) { $('.mTSAutoContainer').animate({'left' : dragRight + 'px'}) };
        }
    });



    // Попап
    var popupOpen;
    $(".popup_open").click(function(){
        $('.popup:visible').fadeOut(200);
        popupStatus = 0;
        popupOpen = $(this).attr('rel');
        loadPopup(popupOpen);
        var popupTop = $(window).scrollTop() + 70;
        $(popupOpen).css({'top' : popupTop + 'px'});
        return false;
    });
    $(".popup_close, .popup-close, .popup_bg, .close").click(function(){
        disablePopup();
        return false;
    });
    $(document).keypress(function(e){
        if(e.keyCode==27 && popupStatus==1){
            disablePopup();
        }
    });

    
    // Показываем пароль
    $('.pass-btn').click(function(){
        var passBtnWr = $(this).parents('.form-cont');
        if($(this).hasClass('active')) {
            $(this).removeClass('active');
            passBtnWr.find('.inp-pass-txt').hide();
            passBtnWr.find('.inp-pass').show();
        } else {
            $(this).addClass('active');
            passBtnWr.find('.inp-pass-txt').show();
            passBtnWr.find('.inp-pass').hide();
        };
        return false;
    });
    $('.inp-pass').keyup(function(){
        inpTxt = $(this).val();
        $(this).parent().find('.inp-pass-txt').val(inpTxt);
    });
    $('.inp-pass-txt').keyup(function(){
        inpTxt = $(this).val();
        $(this).parent().find('.inp-pass').val(inpTxt);
    });


    // select style
    if($('select').length) {
        $('select').selectik({
            minScrollHeight: 20,
            maxItems: 5
        })
    };
    

    // Выбор аваторки
    $('.ava-default-list a').click(function(){
        $('.ava-default-list a').removeClass('active');
        $(this).addClass('active');
        var avaRel = $(this).attr('rel');
        $('.ava-img img').attr('src', avaRel);
        return false;
    });


    // Подсказка
    $('.form-tooltip img').hover(function(){
        $(this).next('span').stop().fadeIn();
    }, function(){
        $(this).next('span').stop().fadeOut();
    });

    // Табы платежей
    $('.balance-bank a').click(function(){
        var indexBank = $(this).parent('li').index();
        $('.balance-bank').find('li').removeClass('active');
        $('.balance-form-tab').hide();
        $('.tab-balance').each(function(){
            $(this).find('li').eq(indexBank).addClass('active');
            $(this).find('.balance-form-tab').eq(indexBank).show();
        });
        return false;
    });
    $('.balance-form-close').click(function(){
        $('.tab-balance').slideUp();
        $('.balance-btn li').removeClass('active');
        return false;
    });


    $('.balance-btn a').click(function(){
        $(this).parents('.balance-btn').find('li').removeClass('active');
        $(this).parent('li').addClass('active');
        $('.tab-balance').slideUp();
        var hisTag = $(this).attr('href');
        $(hisTag).slideDown();
        return false;
    });

    // Работа с купоном
    $('.kupon-min-tab').find('.kupon-item:first').addClass('active');
    $('.lnk-reset').click(function(){
        var kuponIndex = $(this).parents('.kupon-content').index();
        $('.kupon-item').removeClass('active');
        $('.kupon-item').eq(kuponIndex).addClass('active');
        $(this).parents('.kupon-content').find('i').removeClass('act');
        $('.kupon-item').eq(kuponIndex).find('i').removeClass('act');
        $(this).parents('.kupon-content').find('.kupon-form-info span').text('0');
        $(this).parents('.kupon-form').find('.kupon-form-info em').text(0);
        return false;
    });
    var randomClick = function() {
        var max = $(this).parents('.kupon-form').attr('max');
        var min = $(this).parents('.kupon-form').attr('min');
        var n = $(this).parents('.kupon-form').attr('auto');
        var kuponIndex = $(this).parents('.kupon-content').index();
        $('.kupon-item').removeClass('active');
        $('.kupon-item').eq(kuponIndex).addClass('active');
        $(this).parents('.kupon-content').find('i').removeClass('act');
        $('.kupon-item.active').find('i').removeClass('act');
        randomInteger(n, min, max);
        resultPay();
        return false;
    };
    $('.lnk-random').bind('click', randomClick);

    var tiragPlus = function() {
        var tiragN = $(this).parents('.kupon-tirag-namber').find('.tirag-select-namber a').text();
        tiragN = ++tiragN;
        if(tiragN >= 10) {tiragN = 10}
        $(this).parents('.kupon-tirag-namber').find('.tirag-select-namber a').text(tiragN);
        tiragCount = tiragN;
        resultPay();
        return false;
    };
    $('.tirag-plus').bind('click', tiragPlus);
    var tiragMinus = function() {
        var tiragN = $(this).parents('.kupon-tirag-namber').find('.tirag-select-namber a').text();
        if(tiragN == 1) {tiragN = 1} else {tiragN = --tiragN};
        $(this).parents('.kupon-tirag-namber').find('.tirag-select-namber a').text(tiragN);
        tiragCount = tiragN;
        resultPay();
        return false;
    };
    $('.tirag-minus').bind('click', tiragMinus);

    var kuponForm = function() {
        var namberClick = $(this).index();
        var kuponNamber = $(this).parents('.kupon-content').index();
        var iAct = $(this).parents('.kupon-form-cont').find('i.act').length;
        var kuponIndex = $(this).parents('.kupon-content').index();
        $('.kupon-item').removeClass('active');
        $('.kupon-item').eq(kuponIndex).addClass('active');
        if($(this).hasClass('act')) {
            $(this).removeClass('act');
            $('.kupon-item').eq(kuponNamber).find('i').eq(namberClick).removeClass('act');
        } else {
            var iRel = $(this).parents('.kupon-form').attr('rel');
            if(iAct < iRel) {
                $(this).addClass('act');
                $('.kupon-item').eq(kuponNamber).find('i').eq(namberClick).addClass('act');
            }
        };
        var datAct = $(this).parents('.kupon-form-cont').find('i.act').length;
        $(this).parents('.kupon-form').find('.kupon-form-info span').text(datAct);
        resultPay();

        $('.lnk-reset').click(function(){
            var datAct = $(this).parents('.kupon-form-cont').find('i.act').length;
            var kuponIndex = $(this).parents('.kupon-content').index();
            $('.kupon-item').removeClass('active');
            $('.kupon-item').eq(kuponIndex).addClass('active');
            $(this).parents('.kupon-content').find('i').removeClass('act');
            $('.kupon-item').eq(kuponIndex).find('i').removeClass('act');
            $(this).parents('.kupon-content').find('.kupon-form-info span').text('0');
            resultPay();
            return false;
        });
        
    };
    $('.kupon-form-cont i').bind('click', kuponForm);

    var kuponClose = function() {
        var indexClose = $(this).parents('.kupon-item').index();
        $(this).parents('.kupon-item').remove();
        $('.kupon-content').eq(indexClose).remove();
        var kuponIndexNew = 1;
        $('.kupon-item').each(function(){
            $(this).find('.kupon-header span').text(kuponIndexNew);
            var kuponEq = kuponIndexNew + 1;
            $('.kupon-form').eq(kuponIndexNew).find('.kupon-form-name span').text(kuponEq);
            kuponIndexNew = ++kuponIndexNew;
        });

        $('.kupon-in').css({'min-height' : 10 + 'px'});
        var kuponMinHeight = $('.kupon-min-tab').height() + 130;
        $('.kupon-in').css({'min-height' : kuponMinHeight});

        var kuponMinLength = $('.kupon-min-tab').find('.kupon-item').length;
        $('.kuponMinLength').text(kuponMinLength);


        var kupolLeng = $('.kupon-min-tab').find('.kupon-item').length;
        if(kupolLeng < 3) {
            var element = $('.kupon-min-left-sc').jScrollPane();
            var api = element.data('jsp');
            api.destroy();
        };

        resultPay();

        $('.kupon-plus, .kupon-form-add a').unbind('click', kuponFormAdd);
        $('.kupon-plus, .kupon-form-add a').bind('click', kuponFormAdd);
        return false;
    };
    $('.kupon-close').bind('click', kuponClose);

    var kuponFormAdd = function() {
        var kuponMinLength = $('.kupon-min-tab').find('.kupon-item').length + 1;
        $('.kupon-min-hide').find('.kupon-header span').text(kuponMinLength);
        var kuponMinCont = $('.kupon-min-hide').html();
        $('.kupon-min-tab').append(kuponMinCont);

        $('.kupon-tab-hide').find('.kupon-form-name span').text(kuponMinLength);
        var kuponCont = $('.kupon-tab-hide').html();
        $('.kupon-tab').append(kuponCont);
        $('.kupon-item').click(function(){
            var kuponOpen = $(this).index();
            $('.kupon-min-tab').find('.kupon-item').removeClass('active');
            $(this).addClass('active');
            var scrollItem = $('.kupon-content').eq(kuponOpen).offset().top;
            $('html, body').animate({'scrollTop' : scrollItem});
        });


        var kuponMinHeight = $('.kupon-min-tab').height() + 130;
        $('.kupon-in').css({'min-height' : kuponMinHeight});

        var scrollTop = $(window).scrollTop() + $('.kupon-item-first').height() + 20;
        $('html, body').animate({'scrollTop' : scrollTop});

        $('.kuponMinLength').text(kuponMinLength);

        $('.kupon-min-tab').find('.kupon-item').removeClass('active');
        $('.kupon-min-tab').find('.kupon-item:last').addClass('active');

        $('.kupon-form-cont i').unbind('click', kuponForm);
        $('.kupon-form-cont i').bind('click', kuponForm);

        $('.kupon-plus, .kupon-form-add a').unbind('click', kuponFormAdd);
        $('.kupon-plus, .kupon-form-add a').bind('click', kuponFormAdd);

        $('.lnk-random').unbind('click', randomClick);
        $('.lnk-random').bind('click', randomClick);

        $('.tirag-plus').unbind('click', tiragPlus);
        $('.tirag-minus').unbind('click', tiragMinus);
        $('.tirag-plus').bind('click', tiragPlus);
        $('.tirag-minus').bind('click', tiragMinus);

        $('.kupon-close').unbind('click', kuponClose);
        $('.kupon-close').bind('click', kuponClose);

        var kupolLeng = $('.kupon-min-tab').find('.kupon-item').length;
        if(kupolLeng > 2) {
            var element = $('.kupon-min-left-sc').jScrollPane({maintainPosition : true, stickToBottom : true, autoReinitialise : true, autoReinitialiseDelay : 500 });
            var api = element.data('jsp');
            api.scrollToY(5000);
        };
        return false;
    };
    $('.kupon-plus, .kupon-form-add a').bind('click', kuponFormAdd);

    var kuponMinHeight = $('.kupon-min-tab').height() + 130;
    $('.kupon-in').css({'min-height' : kuponMinHeight});

    $('.mask-shablon').each(function(){
        var placeholder = $(this).attr('placeholder');
        var mask = $(this).attr('mask');
        $(this).mask(mask, {placeholder: placeholder});
    })
    if($('.mask-shablon').length) {
        $('.mask-shablon').mask('+7 000 000 00 00');
    };


    $('.ava-down').click(function(){
        $('#uploader').click();
        return false;
    });

    $("#uploader").on('change', function(event) {
      var file = event.target.files[0];
    });
    


    // Количество терожей
    $('.tirag-select-namber a').click(function(){
        $(this).parent().next().fadeIn();
        return false;
    });
    $('.tirag-select-opt li').click(function(){
        var clickNamber = $(this).find('a').text();
        tiragCount = clickNamber;
        $(this).parents('.tirag-select-opt').fadeOut();
        $(this).parents('.tirag-select').find('.tirag-select-namber a').text(clickNamber);
        tiragCount = clickNamber;
        resultPay();
        return false;
    });

    
    $('.tirag-btn a').click(function(){
        $('.kupon-tab').find('.kupon-form').each(function(){
            var i = 0;
            var namberAct = [];
            $(this).find('i.act').each(function(){
                namberAct[i] = $(this).text();
                i = ++i
            });
            console.log(namberAct);
        });
        return false;
    });


    // Выбор таба выйгровших
    $('.user-ac a').click(function(){
        var indexTab = $(this).parents('.user-ac').index();
        $('.user-ac').removeClass('active');
        $(this).parents('.user-ac').addClass('active');
        if($(this).parents('.user-list').next('.user-gift:visible').length) {} else {
            $('.user-gift').slideUp();
        };
        $(this).parents('.user-list').next('.user-gift').find('.user-gift-item').hide();
        $(this).parents('.user-list').next('.user-gift').find('.user-gift-item').eq(indexTab).show();
        $(this).parents('.user-list').next('.user-gift').slideDown();

        return false;
    });
    $('.close-user-gift').click(function(){
        $('.user-gift').slideUp();
        $('.user-ac').removeClass('active');
        return false;
    });
    $('.loto-tab-cont-i:not(:first)').hide();
    $('.loto-tab a').click(function(){
        var tabInd = $(this).index();
        $('.loto-tab a').removeClass('active');
        $(this).addClass('active');
        $('.loto-tab-cont-i').hide();
        $('.loto-tab-cont-i').eq(tabInd).show();
        return false;
    });

    // datepicker
    $( ".datepicker" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      dateFormat: "dd.mm.yy",
      numberOfMonths: 2,

      // закрытие
      onClose: function (dateText, inst) {
        if ($.isFunction(opts.callback)) {
          opts.callback.apply(this, arguments);
        }
      },
      // выбор даты
      onSelect: function (dateText, inst) {
        var textStart;
          if (!inst.rangeStart) {
            inst.inline = true;
            inst.rangeStart = dateText;
          } else {
            inst.inline = false;
            textStart = inst.rangeStart;
            if (textStart !== dateText) {
              $(this).val(textStart + " - " + dateText);
              inst.rangeStart = null;
            }
          }
      }

    });
    
    // Выбор поиска
    $('.lnk-date').click(function(){
        $(this).addClass('active');
        $('.lnk-tirag').removeClass('active');
        $('.inp-box-date').show();
        $('.inp-box-tirag').hide();
        return false;
    });
    $('.lnk-tirag').click(function(){
        $(this).addClass('active');
        $('.lnk-date').removeClass('active');
        $('.inp-box-tirag').show();
        $('.inp-box-date').hide();
        return false;
    });

    // jScrollPane
    $('.bell').click(function(){
        $('.popup-message').fadeIn();
        $('.popup-message').jScrollPane();
    })
    


    $('.input-reset').click(function(){
        $('.arhive-form-inp input').val(' ');
        return false;
    });

    $('.form-namber-btn a').click(function(){
        $('.number-sp').removeClass('active');
        $('.form-namber-inp input').each(function(){
            namberInp = $(this).val();
            if(namberInp.length == 1) {
                namberInp = '0' + namberInp;
            }
            namberAct = '.num-' + namberInp;
            $(namberAct).addClass('active');
        });
        return false;
    });
    $(".form-namber-inp input").keydown(function(event) {
        if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || 
            (event.keyCode == 65 && event.ctrlKey === true) || 
            (event.keyCode >= 35 && event.keyCode <= 39) ) {
                 return;
        }
        else {
            if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                event.preventDefault(); 
            }   
        }
    });
    $('.form-namber-reset').click(function(){
        $('.number-sp').removeClass('active');
        $('.form-namber-inp input').each(function(){
            $(this).val('');
        });
        return false;
    });

    $('.loto_sto-i .popup_open').click(function(){
        var idSlick = $(this).attr('rel');
        $(idSlick).find('.popup-loto-sl ul').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true
        })
    });

    $('.loto_sto-i').each(function(){
        var SlMax = $(this).find('.loto_sto-sl-act').attr('max');
        $(this).find(".loto_sto-sl-act").slider({
          range: "min",
          min: 0,
          max: SlMax,
          value: 0,
          slide: function( event, ui ) {
            $(this).parents('.loto_sto-i').find( ".loto_sto-act-namber span" ).text( ui.value );
            $(this).parents('.loto_sto-i').find( ".ui-slider-handle" ).text( ui.value );

            //-----------
            var lotoName = $(this).parents('.loto_sto-i').find('h2 a').text();
            var lotoId = $(this).parents('.loto_sto-i').find('.btn--pink').attr('rel');
            var lotoNamber = $('.sel_tickets-sel').find('.sel_tickets-i').length;
            var lotoZakaz = $(this).parents('.loto_sto-i').find('.loto_sto-act-namber span').text();
            var lotoNamberId = $(this).parents('.loto_sto-i').index();
            lotoNamber = ++lotoNamber + '.';
            var blockNew = $('.sel_tickets-hide');
            var lotoPrice = $(this).parents('.loto_sto-i').find('.price em').text() * lotoZakaz;

            if($('.sel_tickets-sel').find('#' + lotoId).length) {
                $('#' + lotoId).find('em').text(lotoZakaz);
                $('#' + lotoId).attr('price', lotoPrice);
            } else {
                blockNew.find('i').text(lotoNamber);
                blockNew.find('.sel_tickets-i').attr('id', lotoId);
                blockNew.find('.sel_tickets-i').attr('price', lotoPrice);
                blockNew.find('.sel_tickets-i').attr('namber', lotoNamberId)
                blockNew.find('.sel_tickets-name span').text(lotoName);
                blockNew.find('em').text(lotoZakaz);
                var lotoNew = blockNew.html();
                $('.sel_tickets-sel').append(lotoNew);
            };
            $('.sel_tickets-close').unbind('click', lotoClose);
            $('.sel_tickets-close').bind('click', lotoClose);
            var priceSum = 0;
            $('.sel_tickets-sel').find('.sel_tickets-i').each(function(){
                priceLoto = $(this).attr('price');
                priceLoto = +priceLoto;
                priceSum = priceSum + priceLoto;
            });
            $('.sel_tickets-total strong').text(priceSum);
            //-----------
            if(ui.value > 0) {
                $(this).parents('.loto_sto-i').addClass('active')
            } else {
                $(this).parents('.loto_sto-i').removeClass('active');
                $('#' + lotoId).find('.sel_tickets-close').click();
            };

          }
        });
        $(this).find(".loto_sto-act-namber span").text( $(this).find( ".loto_sto-sl-act" ).slider( "value" ) );
        $(this).find(".ui-slider-handle").text( $(this).find( ".loto_sto-sl-act" ).slider( "value" ) );
    });


    // Добовление билетов
    $('.loto_sto-i .btn--pink').click(function(){
        sliderNext = $(this).parents('.loto_sto-i').find(".ui-slider-handle").text();
        sliderNext = ++sliderNext;
        $(this).parents('.loto_sto-i').find(".loto_sto-sl-act").slider({
            value : sliderNext
        });

        $(this).parents('.loto_sto-i').find( ".loto_sto-act-namber span" ).text( sliderNext );
        $(this).parents('.loto_sto-i').find( ".ui-slider-handle" ).text( sliderNext );

        //-----------
        var lotoName = $(this).parents('.loto_sto-i').find('h2 a').text();
        var lotoId = $(this).parents('.loto_sto-i').find('.btn--pink').attr('rel');
        var lotoNamber = $('.sel_tickets-sel').find('.sel_tickets-i').length;
        var lotoZakaz = $(this).parents('.loto_sto-i').find('.loto_sto-act-namber span').text();
        var lotoNamberId = $(this).parents('.loto_sto-i').index();
        lotoNamber = ++lotoNamber + '.';
        var blockNew = $('.sel_tickets-hide');
        var lotoPrice = $(this).parents('.loto_sto-i').find('.price em').text() * lotoZakaz;

        if($('.sel_tickets-sel').find('#' + lotoId).length) {
            $('#' + lotoId).find('em').text(lotoZakaz);
            $('#' + lotoId).attr('price', lotoPrice);
        } else {
            blockNew.find('i').text(lotoNamber);
            blockNew.find('.sel_tickets-i').attr('id', lotoId);
            blockNew.find('.sel_tickets-i').attr('price', lotoPrice);
            blockNew.find('.sel_tickets-i').attr('namber', lotoNamberId)
            blockNew.find('.sel_tickets-name span').text(lotoName);
            blockNew.find('em').text(lotoZakaz);
            var lotoNew = blockNew.html();
            $('.sel_tickets-sel').append(lotoNew);
        };
        $('.sel_tickets-close').unbind('click', lotoClose);
        $('.sel_tickets-close').bind('click', lotoClose);
        var priceSum = 0;
        $('.sel_tickets-sel').find('.sel_tickets-i').each(function(){
            priceLoto = $(this).attr('price');
            priceLoto = +priceLoto;
            priceSum = priceSum + priceLoto;
        });
        $('.sel_tickets-total strong').text(priceSum);
        $(this).parents('.loto_sto-i').addClass('active')

        return false;
    });
    var lotoClose = function() {
        $(this).parents('.sel_tickets-i').remove();
        var lotoNewNamber = 0;
        $('.sel_tickets-sel').find('.sel_tickets-i').each(function(){
            lotoNewNamber = ++lotoNewNamber;
            $(this).find('i').text(lotoNewNamber);
        });
        var priceSum = 0;
        $('.sel_tickets-sel').find('.sel_tickets-i').each(function(){
            priceLoto = $(this).attr('price');
            priceLoto = +priceLoto;
            priceSum = priceSum + priceLoto;
        });
        $('.sel_tickets-total strong').text(priceSum);
        var namberClose = $(this).parents('.sel_tickets-i').attr('namber');
        console.log(namberClose);
        $('.loto_sto-list').find('.loto_sto-i').eq(namberClose).find(".loto_sto-sl-act").slider({
            value : 0
        });
        $('.loto_sto-list').find('.loto_sto-i').eq(namberClose).removeClass('active');
        $('.loto_sto-list').find('.loto_sto-i').eq(namberClose).find('.ui-slider-handle').text(0);
        return false;
    };
    // Отправка данных о покупке лото
    $('.sel_tickets-items .tirag-btn .btn-st').click(function(){
        var arr = [];
        var i = 0;
        var priceTotal = $('.sel_tickets-total strong').text();
        $('.sel_tickets-sel').find('.sel_tickets-i').each(function(){
            lotoId = $(this).attr('id');
            lotoBilet = $(this).find('em').text();
            lotoPrice = $(this).attr('price');
            arr[i] = 'Лото ID - ' + lotoId + '; Билетов - ' + lotoBilet + '; Цена - ' + lotoPrice;
            i = ++i;
        });
        console.log(arr);
        console.log('Общая сумма - ' + priceTotal);
    });

    $('.loto_sto-slider').each(function(){
        var widthPolzun = 200;

        var allTicket = $(this).attr('max');
        var buyTicket = $(this).attr('price');

        var proc = (buyTicket / allTicket) * 100;
        var poz = Math.round((proc * widthPolzun) / 100);

        var r,g,b;

        if(proc < 38) {r=(199/38)*proc+56; g=(45/38)*proc+210; b=0;}
        if(proc >= 38 && proc <= 62) {r=255; g=234; b=0;}
        if(proc > 62) {r=-(27/38)*proc+5682/19; g=-(181/38)*proc+10057/19; b=(55/19)*proc-3410/19;}

        r = Math.round(r);
        g = Math.round(g);
        b = Math.round(b);

        $(this).find('span').css('background', 'rgb('+r+','+g+','+b+')');
        $(this).parents('.loto_sto-i').find('.loto_sto-info').css('color', 'rgb('+r+','+g+','+b+')');
        $(this).find('span').width(poz);
    });

    $('.balance-info-lnk a').click(function(){
        $('.balance-refill').slideDown();
        $('.balance-info').addClass('active');
        return false;
    });
    $('.long-username a').click(function(){
        $('.username-menu').slideDown();
        $('.long-username-box').addClass('active');
        return false;
    });


    


});

// datepicker

jQuery(function($){
    $.datepicker.regional['ru'] = {
        monthNames: ['Яварь', 'Февраль', 'Март', 'Апрель',
        'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь',
        'Октябрь', 'Ноябрь', 'Декабрь'],
        dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
        firstDay: 1,
    };
    $.datepicker.setDefaults($.datepicker.regional['ru']);
});



var ArrSoc = []; 
ArrSoc[0] = [1]; 
ArrSoc[1] = [1,1]; 
ArrSoc[2] = [1,2,1]; 
ArrSoc[3] = [1,3,3,1]; 
ArrSoc[4] = [1,4,6,4,1]; 
ArrSoc[5] = [1,5,10,10,5,1]; 
ArrSoc[6] = [1,6,15,20,15,6,1]; 
ArrSoc[7] = [1,7,21,35,35,21,7,1]; 
ArrSoc[8] = [1,8,28,56,70,56,28,8,1]; 
ArrSoc[9] = [1,9,36,84,126,126,84,36,9,1]; 
ArrSoc[10] = [1,10,45,120,210,252,210,120,45,10,1]; 
ArrSoc[11] = [1,11,55,165,330,462,462,330,165,55,11,1]; 
ArrSoc[12] = [1,12,66,220,495,792,924,792,495,220,66,12,1]; 
ArrSoc[13] = [1,13,78,286,715,1287,1716,1716,1287,715,286,78,13,1]; 
ArrSoc[14] = [1,14,91,364,1001,2002,3003,3432,3003,2002,1001,364,91,14,1]; 
ArrSoc[15] = [1,15,105,455,1365,3003,5005,6435,6435,5005,3003,1365,455,105,15,1]; 
ArrSoc[16] = [1,16,120,560,1820,4368,8008,11440,12870,11440,8008,4368,1820,560,120,16,1]; 
ArrSoc[17] = [1,17,136,680,2380,6188,12376,19448,24310,24310,19448,12376,6188,2380,680,136,17,1]; 
ArrSoc[18] = [1,18,153,816,3060,8568,18564,31824,43758,48620,43758,31824,18564,8568,3060,816,153,18,1]; 
ArrSoc[19] = [1,19,171,969,3876,11628,27132,50388,75582,92378,92378,75582,50388,27132,11628,3876,969,171,19,1]; 
ArrSoc[20] = [1,20,190,1140,4845,15504,38760,77520,125970,167960,184756,167960,125970,77520,38760,15504,4845,1140,190,20,1]; 


// число сочетаний из userN по (userN - min) 
// min - обязательное минимальное кол-во цифр для выбора (5х36 = 5, 6х45 = 6, 7х49 = 7) 
// userN - кол-во чисел, выбранных игроком 
function sochet(min, userN)  { 
    var diff = userN - min; 

    if(diff < 0) return 0; 
    if(!diff) return 1; 

    return ArrSoc[userN][diff]; 
} 

// "Кол-во тиражей" - выбирается игроком от 1 до 10: 
var tiragCount = 1;  

// Необходима ещё цена за один купон 
var priceOneTicket = 40; 

function resultPay() {
    combinacia = 0;
    $('.kupon-content').find('.kupon-form').each(function(){
        min = $(this).attr('auto');
        userN = $(this).find('i.act').length;
        var combinationsOneTicket = sochet(min, userN);
        var resultPriceOneTicket = priceOneTicket * combinationsOneTicket; 
        $(this).find('.kupon-form-info em').text(resultPriceOneTicket);
        combinacia = combinacia + combinationsOneTicket;
    });
    resultPrice = 0;
    $('.kupon-form-info em').each(function(){
        resultPriceThis = $(this).text() * 1;
        resultPrice = resultPrice + resultPriceThis * tiragCount;
    });
    $('.tirag-table-total em span').text(resultPrice);
    $('.combinacia').text(combinacia);

};







$(window).scroll(function(){
    if($('.kupon-tirag').length) {
        var kuponTirag = $('.kupon-tirag').offset().top;
        var scrollWind = $(window).scrollTop();
        var bottomMin = $('.layout').height() - $(window).height() - 250;
        if(scrollWind > kuponTirag) {
            $('.kupon-tirag-in').addClass('active');
        } else {
            $('.kupon-tirag-in').removeClass('active');
        };
        if(scrollWind > bottomMin) {
            $('.kupon-tirag-in').addClass('bottom');
        } else {
            $('.kupon-tirag-in').removeClass('bottom');
        };
        
        if(scrollWind > kuponTirag) {
            $('.kupon-tirag-in, .kupon-min-scroll').addClass('active');
        } else {
            $('.kupon-tirag-in, .kupon-min-scroll').removeClass('active');
        };
        if(scrollWind > bottomMin) {
            $('.kupon-tirag-in, .kupon-min-scroll').addClass('bottom');
        } else {
            $('.kupon-tirag-in, .kupon-min-scroll').removeClass('bottom');
        };
    };
 });


// functions
function isTouchDevice() {
	return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
}



// Попап
var popupStatus = 0;

function loadPopup(popupOpen){
    if(popupStatus==0){
        $(".popup_bg").css({
            "opacity": "0.6"
        });
        $(".popup_bg").fadeIn(200);
        $(popupOpen).fadeIn(200);
        popupStatus = 1;
    }
}

function disablePopup(){
    if(popupStatus==1){
        $(".popup_bg").fadeOut(200);
        $(".popup").fadeOut(200);
        popupStatus = 0;
    }
}

function randomInteger(n, min, max) {
    var values = [], m = max;
    while(m >= min) values.push(m--);

    var i = values.length;
    var c = 0;

    var randIndex = $('.kupon-item.active').index();


    while(--i) {
        var j = Math.floor(Math.random() * ( i + 1 ));
        var tempi = values[i];
        var tempj = values[j];
        values[i] = tempj;
        values[j] = tempi;
        c++;

        $('.kupon-content').eq(randIndex).find('i').eq(values[i]-1).click();

        if(c == n) {return values.slice(-n);}
    }
}




function functNewDay(){
    alert('New day');
};



$(document).mouseup(function(e){
    var container = $(".tirag-select"); 
        if (!container.is(e.target) && container.has(e.target).length === 0){
        $('.tirag-select-opt').fadeOut();
    };

    var container2 = $(".bell, .popup-message"); 
        if (!container2.is(e.target) && container2.has(e.target).length === 0){
        $('.popup-message').fadeOut();
    };

    var container3 = $(".balance-info-lnk a, .balance-info"); 
        if (!container3.is(e.target) && container3.has(e.target).length === 0){
        $('.balance-refill').slideUp();
        $('.balance-info').removeClass('active');
    };

    var container4 = $(".long-username a, .long-username-box"); 
        if (!container4.is(e.target) && container4.has(e.target).length === 0){
        $('.username-menu').slideUp();
        $('.long-username-box').removeClass('active');
    };

});




