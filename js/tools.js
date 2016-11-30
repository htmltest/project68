var sliderPeriod    = 5000;
var sliderTimer     = null;

$(document).ready(function() {

    $('.slider').each(function() {
        var curSlider = $(this);
        curSlider.data('curIndex', 0);
        curSlider.data('disableAnimation', true);
        if (curSlider.find('.slider-item').length > 1) {
            var curHTML = '';
            curSlider.find('.slider-item').each(function() {
                curHTML += '<a href="#"><span></span></a>';
            });
            $('.slider-ctrl').html(curHTML);
            $('.slider-ctrl a:first').addClass('active');
            sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
            curSlider.find('.slider-ctrl a:first').find('span').animate({'width': '100%'}, sliderPeriod, 'linear');
        }
    });

    function sliderNext() {
        var curSlider = $('.slider');

        if (curSlider.data('disableAnimation')) {
            var curIndex = curSlider.data('curIndex');
            var newIndex = curIndex + 1;
            if (newIndex >= curSlider.find('.slider-item').length) {
                newIndex = 0;
            }

            curSlider.data('curIndex', newIndex);
            curSlider.data('disableAnimation', false);

            curSlider.find('.slider-item').eq(curIndex).css({'z-index': 2});
            curSlider.find('.slider-item').eq(newIndex).css({'z-index': 1}).show();

            curSlider.find('.slider-ctrl a.active').removeClass('active');
            curSlider.find('.slider-ctrl a').eq(newIndex).addClass('active');
            curSlider.find('.slider-ctrl a span').stop(true, true).css({'width': 0});

            curSlider.find('.slider-item').eq(curIndex).fadeOut(function() {
                curSlider.find('.slider-ctrl a').eq(newIndex).find('span').animate({'width': '100%'}, sliderPeriod, 'linear');
                curSlider.data('disableAnimation', true);
                sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
            });
        }
    }

    $('.slider-next').click(function(e) {
        var curSlider = $('.slider');

        if (curSlider.data('disableAnimation')) {
            window.clearTimeout(sliderTimer);
            sliderTimer = null;

            sliderNext();
        }

        e.preventDefault();
    });

    $('.slider-prev').click(function(e) {
        var curSlider = $('.slider');

        if (curSlider.data('disableAnimation')) {
            window.clearTimeout(sliderTimer);
            sliderTimer = null;

            var curIndex = curSlider.data('curIndex');
            var newIndex = curIndex - 1;
            if (newIndex < 0) {
                newIndex = curSlider.find('.slider-item').length - 1;
            }

            curSlider.data('curIndex', newIndex);
            curSlider.data('disableAnimation', false);

            curSlider.find('.slider-item').eq(curIndex).css({'z-index': 2});
            curSlider.find('.slider-item').eq(newIndex).css({'z-index': 1}).show();

            curSlider.find('.slider-ctrl a.active').removeClass('active');
            curSlider.find('.slider-ctrl a').eq(newIndex).addClass('active');
            curSlider.find('.slider-ctrl a span').stop(true, true).css({'width': 0});

            curSlider.find('.slider-item').eq(curIndex).fadeOut(function() {
                curSlider.find('.slider-ctrl a').eq(newIndex).find('span').animate({'width': '100%'}, sliderPeriod, 'linear');
                curSlider.data('disableAnimation', true);
                sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
            });
        }

        e.preventDefault();
    });

    $('.slider').on('click', '.slider-ctrl a', function(e) {
        if (!$(this).hasClass('active')) {
            window.clearTimeout(sliderTimer);
            sliderTimer = null;

            var curSlider = $('.slider');
            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                var newIndex = $('.slider-ctrl a').index($(this));

                curSlider.data('curIndex', newIndex);
                curSlider.data('disableAnimation', false);

                curSlider.find('.slider-item').eq(curIndex).css({'z-index': 2});
                curSlider.find('.slider-item').eq(newIndex).css({'z-index': 1}).show();

                curSlider.find('.slider-ctrl a.active').removeClass('active');
                curSlider.find('.slider-ctrl a').eq(newIndex).addClass('active');
                curSlider.find('.slider-ctrl a span').stop(true, true).css({'width': 0});

                curSlider.find('.slider-item').eq(curIndex).fadeOut(function() {
                    curSlider.find('.slider-ctrl a').eq(newIndex).find('span').animate({'width': '100%'}, sliderPeriod, 'linear');
                    curSlider.data('disableAnimation', true);
                    sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
                });
            }
        }

        e.preventDefault();
    });

    $('form').each(function() {
        initForm($(this));
    });

    $('.basket-count input').on('spinstop', function(event, ui) {
        recalcCart();
    });

    $('.basket-delete a').click(function(e) {
        $(this).parent().parent().remove();
        recalcCart();
        e.preventDefault();
    });

    $('.header-search-link').click(function(e) {
        $('.header-search').toggleClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.header-search').length == 0) {
            $('.header-search').removeClass('open');
        }
    });

    $('.tabs-menu li a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            var curIndex = $('.tabs-menu li').index(curLi);
            $('.tabs-menu li.active').removeClass('active');
            curLi.addClass('active');
            $('.tabs-content.active').removeClass('active');
            $('.tabs-content').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.product-photo-preview ul li a').click(function(e) {
        var curLink = $(this);
        var curLi = curLink.parent();
        if (!curLink.parent().hasClass('active')) {
            $('.product-photo-preview ul li.active').removeClass('active');
            curLi.addClass('active');
            $('.product-photo-big img').attr('src', curLink.attr('href'));
        }
        e.preventDefault();
    });

    $('body').on('click', '.window-link', function(e) {
        $.ajax({
            type: 'POST',
            url: $(this).attr('href'),
            dataType: 'html',
            cache: false
        }).done(function(html) {
            if ($('.window').length > 0) {
                windowClose();
            }
            windowOpen(html);
        });
        e.preventDefault();
    });

    $('.nav-sub li').hover(
        function() {
            var curLi = $(this);
            var curSub = curLi.parent().parent();
            var curIndex = curSub.find('ul li').index(curLi);
            curSub.find('.nav-sub-photo-sub').eq(curIndex).addClass('hover');
        },

        function() {
            $('.nav-sub-photo-sub.hover').removeClass('hover');
        }
    );

});

$(window).on('resize', function() {
    $('.form-select select').chosen('destroy');
    $('.form-select select').chosen({disable_search: true, placeholder_text_multiple: ' ', no_results_text: 'Нет результатов'});
});

function initForm(curForm) {
    curForm.find('.form-input input, .form-input textarea').each(function() {
        if ($(this).val() == '') {
            $(this).parent().find('.form-label').css({'display': 'block'});
        }
    });

    curForm.find('.form-input input, .form-input textarea').focus(function() {
        $(this).parent().find('.form-label').css({'display': 'none'});
    });

    curForm.find('.form-input input, .form-input textarea').blur(function() {
        if ($(this).val() == '') {
            $(this).parent().find('.form-label').css({'display': 'block'});
        }
    });

    curForm.find('input.maskPhone').mask('+7 (999) 999-99-99');

    $.validator.addMethod('maskPhone',
        function(value, element) {
            return /^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/.test(value);
        },
        'не соответствует формату'
    );

    curForm.find('.form-select select').chosen({disable_search: true, no_results_text: 'Нет результатов'});

    curForm.find('input[type="number"]').each(function() {
        var curBlock = $(this).parent();
        var curHTML = curBlock.html();
        curBlock.html(curHTML.replace(/type=\"number\"/g, 'type="text"'));
        curBlock.find('input').spinner();
        curBlock.find('input').keypress(function(evt) {
            var charCode = (evt.which) ? evt.which : evt.keyCode
            if (charCode > 31 && (charCode < 43 || charCode > 57)) {
                return false;
            }
            return true;
        });
    });

    curForm.validate({
        ignore: '',
        invalidHandler: function(form, validatorcalc) {
            validatorcalc.showErrors();
            checkErrors();
        }
    });
}

function checkErrors() {
    $('.form-checkbox, .form-input').each(function() {
        var curField = $(this);
        if (curField.find('input.error').length > 0 || curField.find('textarea.error').length > 0) {
            curField.addClass('error');
        } else {
            curField.removeClass('error');
        }
        if (curField.find('input.valid').length > 0 || curField.find('textarea.valid').length > 0) {
            curField.addClass('valid');
        } else {
            curField.removeClass('valid');
        }
    });
}

function recalcCart() {
    var curSumm = 0;
    $('.basket tbody tr').each(function() {
        var curRow = $(this);
        curSumm += Number(curRow.find('.basket-count input').val()) * Number(curRow.find('.basket-price span').html());
    });

    $('.basket-summ span').html(curSumm);
}

$(window).on('load resize', function() {

    $('.catalogue').each(function() {
        var curList = $(this);
        curList.find('.catalogue-item-photo').css({'min-height': 0 + 'px'});

        curList.find('.catalogue-item-photo').each(function() {
            var curBlock = $(this);
            var curHeight = curBlock.height();
            var curTop = curBlock.offset().top;

            curList.find('.catalogue-item-photo').each(function() {
                var otherBlock = $(this);
                if (otherBlock.offset().top == curTop) {
                    var newHeight = otherBlock.height();
                    if (newHeight > curHeight) {
                        curBlock.css({'min-height': newHeight + 'px'});
                    } else {
                        otherBlock.css({'min-height': curHeight + 'px'});
                    }
                }
            });
        });

        curList.find('.catalogue-item-title').css({'min-height': 0 + 'px'});

        curList.find('.catalogue-item-title').each(function() {
            var curBlock = $(this);
            var curHeight = curBlock.height();
            var curTop = curBlock.offset().top;

            curList.find('.catalogue-item-title').each(function() {
                var otherBlock = $(this);
                if (otherBlock.offset().top == curTop) {
                    var newHeight = otherBlock.height();
                    if (newHeight > curHeight) {
                        curBlock.css({'min-height': newHeight + 'px'});
                    } else {
                        otherBlock.css({'min-height': curHeight + 'px'});
                    }
                }
            });
        });
    });

    $('.news').each(function() {
        var curList = $(this);
        curList.find('.news-item-photo').css({'min-height': 0 + 'px'});

        curList.find('.news-item-photo').each(function() {
            var curBlock = $(this);
            var curHeight = curBlock.height();
            var curTop = curBlock.offset().top;

            curList.find('.news-item-photo').each(function() {
                var otherBlock = $(this);
                if (otherBlock.offset().top == curTop) {
                    var newHeight = otherBlock.height();
                    if (newHeight > curHeight) {
                        curBlock.css({'min-height': newHeight + 'px'});
                    } else {
                        otherBlock.css({'min-height': curHeight + 'px'});
                    }
                }
            });
        });

        curList.find('.news-item-title').css({'min-height': 0 + 'px'});

        curList.find('.news-item-title').each(function() {
            var curBlock = $(this);
            var curHeight = curBlock.height();
            var curTop = curBlock.offset().top;

            curList.find('.news-item-title').each(function() {
                var otherBlock = $(this);
                if (otherBlock.offset().top == curTop) {
                    var newHeight = otherBlock.height();
                    if (newHeight > curHeight) {
                        curBlock.css({'min-height': newHeight + 'px'});
                    } else {
                        otherBlock.css({'min-height': curHeight + 'px'});
                    }
                }
            });
        });

        curList.find('.news-item-anonce').css({'min-height': 0 + 'px'});

        curList.find('.news-item-anonce').each(function() {
            var curBlock = $(this);
            var curHeight = curBlock.height();
            var curTop = curBlock.offset().top;

            curList.find('.news-item-anonce').each(function() {
                var otherBlock = $(this);
                if (otherBlock.offset().top == curTop) {
                    var newHeight = otherBlock.height();
                    if (newHeight > curHeight) {
                        curBlock.css({'min-height': newHeight + 'px'});
                    } else {
                        otherBlock.css({'min-height': curHeight + 'px'});
                    }
                }
            });
        });
    });

});

function windowOpen(contentWindow) {
    var windowWidth     = $(window).width();
    var windowHeight    = $(window).height();
    var curScrollTop    = $(window).scrollTop();
    var curScrollLeft   = $(window).scrollLeft();

    var bodyWidth = $('body').width();
    $('body').css({'height': windowHeight, 'overflow': 'hidden'});
    var scrollWidth =  $('body').width() - bodyWidth;
    $('body').css({'padding-right': scrollWidth + 'px'});
    $(window).scrollTop(0);
    $(window).scrollLeft(0);
    $('body').css({'margin-top': -curScrollTop});
    $('body').data('scrollTop', curScrollTop);
    $('body').css({'margin-left': -curScrollLeft});
    $('body').data('scrollLeft', curScrollLeft);

    $('body').append('<div class="window"><div class="window-overlay"></div><div class="window-loading"></div><div class="window-container window-container-load"><div class="window-content">' + contentWindow + '<a href="#" class="window-close"></a></div></div></div>')

    if ($('.window-container img').length > 0) {
        $('.window-container img').each(function() {
            $(this).attr('src', $(this).attr('src'));
        });
        $('.window-container').data('curImg', 0);
        $('.window-container img').load(function() {
            var curImg = $('.window-container').data('curImg');
            curImg++;
            $('.window-container').data('curImg', curImg);
            if ($('.window-container img').length == curImg) {
                $('.window-loading').remove();
                $('.window-container').removeClass('window-container-load');
                windowPosition();
            }
        });
    } else {
        $('.window-loading').remove();
        $('.window-container').removeClass('window-container-load');
        windowPosition();
    }

    $('.window-close').click(function(e) {
        windowClose();
        e.preventDefault();
    });

    $('body').bind('keyup', keyUpBody);

    $('.window form').each(function() {
        initForm($(this));
    });

}

function windowPosition() {
    var dpr = 1;
    if (window.devicePixelRatio !== undefined) {
        dpr = window.devicePixelRatio;
    }

    var windowWidth     = $(window).width() * dpr;
    var windowHeight    = $(window).height() * dpr;

    if ($('.window-container').width() > windowWidth - 40) {
        $('.window-container').css({'left': 20, 'margin-left': 0});
        $('.window-overlay').width($('.window-container').width() + 40);
    } else {
        $('.window-container').css({'left': '50%', 'margin-left': -$('.window-container').width() / 2});
        $('.window-overlay').width('100%');
    }

    if ($('.window-container').height() > windowHeight - 40) {
        $('.window-overlay').height($('.window-container').height() + 40);
        $('.window-container').css({'top': 20, 'margin-top': 0});
    } else {
        $('.window-container').css({'top': '50%', 'margin-top': -$('.window-container').height() / 2});
        $('.window-overlay').height('100%');
    }
}

function keyUpBody(e) {
    if (e.keyCode == 27) {
        windowClose();
    }
}

function windowClose() {
    $('body').unbind('keyup', keyUpBody);
    $('.window').remove();
    $('body').css({'height': '100%', 'overflow': 'visible', 'padding-right': 0, 'margin': 0});
    $(window).scrollTop($('body').data('scrollTop'));
    $(window).scrollLeft($('body').data('scrollLeft'));
}

$(window).resize(function() {
    if ($('.window').length > 0) {
        var windowWidth     = $(window).width();
        var windowHeight    = $(window).height();
        var curScrollTop    = $(window).scrollTop();
        var curScrollLeft   = $(window).scrollLeft();

        $('body').css({'height': '100%', 'overflow': 'visible', 'padding-right': 0, 'margin': 0});
        var bodyWidth = $('body').width();
        $('body').css({'height': windowHeight, 'overflow': 'hidden'});
        var scrollWidth =  $('body').width() - bodyWidth;
        $('body').css({'padding-right': scrollWidth + 'px'});
        $(window).scrollTop(0);
        $(window).scrollLeft(0);
        $('body').data('scrollTop', 0);
        $('body').data('scrollLeft', 0);

        windowPosition();
    }
});