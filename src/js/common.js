$(function () {
    /**Popup c параметрами**/
    var
        $btnReviews = $('.reviews__item--btn'),
        $btnHeader = $('.header__menu--button'),
        $reviewsModal = $('.reviews__modal'),
        $reviewsOverlay = $('.reviews__overlay'),
        $burgersModal = $('.burgers__modal'),
        $burgersOverlay = $('.burgers__overlay'),
        popRev = new Popup({
            modal: $reviewsModal,
            overlay: $reviewsOverlay
        }),
        popBur = new Popup({
            modal: $burgersModal,
            overlay: $burgersOverlay
        });

    $btnReviews.on('click', function () {
        popRev.open('Отзыв');
    });
    $reviewsOverlay.on('click', function () {
        popRev.close();
    });
    $btnHeader.on('click', function () {
        popBur.open('Бургер');
    });
    $burgersOverlay.on('click', function () {
        popBur.close();
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
        }

        this.close = function () {
            overlay.removeClass('open');
            modal.removeClass('open');
        }
    }

    /**ПЛАВНАЯ ПРОКРУТКА ДО ЯКОРЯ**/
    $('.header__menu--link, .points__link, .first__arrow--link').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this)
                .attr('href'))
                .offset().top
        }, 700, 'linear');
    });
});