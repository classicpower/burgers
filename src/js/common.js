$(function () {
    /**Popup c параметрами**/
    var
        $btnReviews = $('.reviews__button'),
        $reviewsModal = $('.reviews__modal'),
        $reviewsOverlay = $('.reviews__overlay, .reviews__close'),
        popRev = new Popup({
            modal: $reviewsModal,
            overlay: $reviewsOverlay
        });


    $btnReviews.on('click', function () {
        popRev.open();
    });
    $reviewsOverlay.on('click', function () {
        popRev.close();
    });

    function Popup(obj) {
        var modal = obj.modal;
        var overlay = obj.overlay;
        var popup = this;
        this.open = function (content) {
            popup.content = content;
            overlay.addClass('open');
            modal.addClass('open');
            modal.html(content);
            $('body').addClass('blocked-scroll');
        }

        this.close = function () {
            overlay.removeClass('open');
            modal.removeClass('open');
            $('body').removeClass('blocked-scroll');
        }
    }

    /**ПЛАВНАЯ ПРОКРУТКА ДО ЯКОРЯ**/
    $('.click-link').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this)
                .attr('href'))
                .offset().top
        }, 700, 'linear');
        $fixedMenu.removeClass('fixed-menu--open')
    });

    // OPEM/CLOSE MOBILE MENU
    var $hamburger = $('.hamburger-menu__link'),
        $fixedMenu = $('.fixed-menu'),
        $closeMenu = $('.fixed-menu__close, .fixed-menu__link');
    $hamburger.on('click', function (e) {
        e.preventDefault();
        $fixedMenu.fadeIn().addClass('fixed-menu--open');
        $('body').addClass('blocked-scroll');
    });
    $closeMenu.on('click', function () {
        $fixedMenu.fadeOut().removeClass('fixed-menu--open')
        $('body').removeClass('blocked-scroll');
    });

    /**АККОРДЕОН**/
    // TEAM SECTION
    var $teamItem = $(".team__item"),
        $burgerItem = $('.burgermenu__item'),
        $burgerLeft = $('.burgermenu__left'),
        $burgerRight = $('.burgermenu__right');

    $teamItem.on('click', function () {
        var item = $(this);
        item.toggleClass('team__item--active')
            .siblings()
            .removeClass('team__item--active')
    })
    // BURGERMENU SECTION
    
    $burgerItem.on('click', function () {
        var scrWidth = window.innerWidth;
        var item = $(this);
        item.toggleClass('burgermenu__item--active')
            .siblings()
            .removeClass('burgermenu__item--active');
        if (scrWidth < 769 &&
            scrWidth > 481 &&
            item.hasClass('burgermenu__item--active')) {
            $burgerLeft.addClass('burgermenu__left--hide');
            $burgerRight.addClass('burgermenu__right--show');
        }
        if (scrWidth < 480 ) {
            $burgerLeft.addClass('burgermenu__left--hide');
            $burgerRight.addClass('burgermenu__right--show');
            item.siblings().toggle();
        }
        else {
            $burgerLeft.removeClass('burgermenu__left--hide');
            $burgerRight.removeClass('burgermenu__right--show');
        }
    })

    var $reviewsButton = $('.reviews__button');
    console.log($reviewsButton);
    $(window).on('resize load',function () {
        var scrWidth = window.innerWidth;
        console.log(scrWidth);
        if (scrWidth < 480) {
            $reviewsButton.html('Читать отзыв')
        }else{
            $reviewsButton.html('Подробнее')
        }
    })
});