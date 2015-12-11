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
        return false
    })


    $('.top-nav__submenu').mouseleave(function(){
        $('.top-nav__submenu').fadeOut(300);
        $('.top-nav__item--submenu').removeClass('active');
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
    console.log(slPosit);


    $("#clock-today .events-wrapper").mThumbnailScroller({
        axis:"x",
        setLeft: 0,
        type:"click-20",
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
                console.log('timeSC - ' + timeSC + ' timeMax - ' + timeMax );
                if(timeMax > timeSC) {
                    $('.mTSAutoContainer').css({'left' : timeMax});
                } else {
                    if(timeSC < 0) {
                        $('.mTSAutoContainer').css({'left' : timeSC});
                    } else {
                        $('.mTSAutoContainer').css({'left' : 0});
                    }
                }
                
            };
            
            sec = d.getSeconds();
            clockReset = h+''+m+''+sec;
            console.log(clockReset);
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
            if(centerTime < dragRight) { $('#time-tab1 .mTSAutoContainer').animate({'left' : dragRight + 'px'}) } 
                else {
                $('#time-tab1 .mTSAutoContainer').animate({'left' : centerTime + 'px'})
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
            console.log('dragLeft ' + dragLeft + ' dragRight ' + dragRight);
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
    $('select').selectik({
        minScrollHeight: 20
    });
    

    // Выбор аваторки
    $('.ava-default-list a').click(function(){
        $('.ava-default-list a').removeClass('active');
        $(this).addClass('active');
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
        $(this).parents('.balance-bank').find('li').removeClass('active');
        $(this).parent('li').addClass('active');
        $(this).parents('.tab-balance').find('.balance-form-tab').hide();
        var hisTag = $(this).attr('href');
        $(hisTag).show();
        return false;
    });
    $('.balance-form-close').click(function(){
        $('.tab-balance').hide();
        $('.balance-btn li').removeClass('active');
        return false;
    });


    $('.balance-btn a').click(function(){
        $(this).parents('.balance-btn').find('li').removeClass('active');
        $(this).parent('li').addClass('active');
        $('.tab-balance').hide();
        var hisTag = $(this).attr('href');
        $(hisTag).show();
        return false;
    });

    // Работа с купоном
    $('.kupon-min-tab').find('.kupon-item:first').addClass('active');
    $('.lnk-reset').click(function(){
        $(this).parents('.kupon-content').find('i').removeClass('act');
        $('.kupon-item.active').find('i').removeClass('act');
        return false;
    });
    var randomClick = function() {
        randomInteger(1, 36);
        return false;
    };
    $('.lnk-random').bind('click', randomClick);

    var tiragPlus = function() {
        var tiragN = $(this).parents('.kupon-tirag-namber').find('.tirag-select-namber a').text();
        tiragN = ++tiragN;
        $(this).parents('.kupon-tirag-namber').find('.tirag-select-namber a').text(tiragN);
        return false;
    };
    $('.tirag-plus').bind('click', tiragPlus);
    var tiragMinus = function() {
        var tiragN = $(this).parents('.kupon-tirag-namber').find('.tirag-select-namber a').text();
        if(tiragN == 1) {tiragN = 1} else {tiragN = --tiragN};
        $(this).parents('.kupon-tirag-namber').find('.tirag-select-namber a').text(tiragN);
        return false;
    };
    $('.tirag-minus').bind('click', tiragMinus);

    var kuponForm = function() {
        var namberClick = $(this).index();
        var kuponNamber = $(this).parents('.kupon-content').index();
        if($(this).hasClass('act')) {
            $(this).removeClass('act');
            $('.kupon-item').eq(kuponNamber).find('i').eq(namberClick).removeClass('act');
        } else {
            $(this).addClass('act');
            $('.kupon-item').eq(kuponNamber).find('i').eq(namberClick).addClass('act');
        };

        $('.lnk-reset').click(function(){
            $(this).parents('.kupon-content').find('i').removeClass('act');
            $('.kupon-item.active').find('i').removeClass('act');
            return false;
        });
    };
    $('.kupon-form-cont i').bind('click', kuponForm);

    var kuponFormAdd = function() {
        var kuponMinLength = $('.kupon-min-tab').find('.kupon-item').length + 1;
        $('.kupon-min-hide').find('.kupon-header span').text(kuponMinLength);
        var kuponMinCont = $('.kupon-min-hide').html();
        $('.kupon-min-tab').append(kuponMinCont);

        $('.kupon-tab-hide').find('.kupon-form-name span').text(kuponMinLength);
        $('.kupon-tab').find('.kupon-content').hide();
        var kuponCont = $('.kupon-tab-hide').html();
        $('.kupon-tab').append(kuponCont);
        $('.kupon-item').click(function(){
            var kuponOpen = $(this).index();
            $('.kupon-tab').find('.kupon-content').hide();
            $('.kupon-tab').find('.kupon-content').eq(kuponOpen).show();
            $('.kupon-min-tab').find('.kupon-item').removeClass('active');
            $(this).addClass('active');
        });

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

        var kuponMinHeight = $('.kupon-min-tab').height() + 130;
        $('.kupon-in').css({'min-height' : kuponMinHeight});
        return false;
    };
    $('.kupon-plus, .kupon-form-add a').bind('click', kuponFormAdd);

    var kuponMinHeight = $('.kupon-min-tab').height() + 130;
    $('.kupon-in').css({'min-height' : kuponMinHeight});


 

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

function randomInteger(min, max) {
  var rand = min + Math.random() * (max - min)
  rand = Math.round(rand);
  var randIndex = $('.kupon-item.active').index();
  $(this).parents('.kupon-content').find('i').eq(randIndex).click();
  if($('.kupon-content').eq(randIndex).find('i').eq(rand).hasClass('act')) {
    randomInteger(1, 36)
  } else {
    $('.kupon-content').eq(randIndex).find('i').eq(rand).click();
  };
  return rand;
}




function functNewDay(){
    alert('New day');
};

