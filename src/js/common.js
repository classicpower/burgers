$(function () {
    /**Popup c параметрами**/
    var
        $btnReviews = $('.reviews__button'),
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
    $('.menu--link, .button, .points__link, .arrow__link').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this)
                .attr('href'))
                .offset().top
        }, 700, 'linear');
    });

    /**АККОРДЕОН**/
    var $teamItem = $(".team__item"),
        $burgerItem = $('.burgermenu__item');
    // $teamName = $(".team__content--item .team__content--item-name"),
    // $teamContent = $(".team__content--item .team__content--item-figure");

    $teamItem.on('click', function () {
        var item = $(this);
        item.toggleClass("team__item--active")
            .siblings()
            .removeClass("team__item--active")
    })
    $burgerItem.on('click', function () {
        var item = $(this);
        item.toggleClass("burgermenu__item--active")
            .siblings()
            .removeClass("burgermenu__item--active")
    })
});