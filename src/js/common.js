$(function () {
    /**Popup c параметрами**/
    const
        bodyDoc = document.body,
        btnReviews = document.querySelectorAll(".reviews__button"),
        overlayReviews = document.querySelector(".reviews__overlay"),
        reviewsClose = document.querySelector(".reviews__close"),
        revievsModal = document.querySelector(".reviews__modal"),
        revievsText = document.querySelector(".reviews__content-text"),
        revievsTitle = document.querySelector(".reviews__content-title"),
        popReviews = new Popup({
            overlay: overlayReviews,
            modal: revievsModal,
            // text: revievsText,
            body: bodyDoc
        }),
        overlayForm = document.querySelector(".delivery__overlay"),
        formClose = document.querySelector(".delivery__button"),
        modalForm = document.querySelector(".delivery__modal"),
        modalText = document.querySelector(".delivery__text"),
        popupForm = new Popup({
            overlay: overlayForm,
            modal: modalForm,
            text: modalText,
            body: bodyDoc
        });

    /* ОБРЕЗАТЬ ОТЗЫВ ДО НЕОБХОДИМОГО КОЛ-ВА БУКВ*/
    function sliceReviews(switcher) {
        var
            size = 225,
            reviewsText = $('.reviews__text'),
            sliceText = reviewsText.text();
        if (switcher) {
            if (sliceText.length > size) {
                reviewsText.text(sliceText.slice(0, size));
            }
        }
        else {
            console.log("ok");
        }
    };
    sliceReviews(true);

    for (let i = 0; i < btnReviews.length; i++) {
        const btn = btnReviews[i];
        btn.addEventListener("click", function () {
            var
                $this = this,
                thisParent = $this.parentNode;
            const
                title = thisParent.querySelector(".reviews__title"),
                content = thisParent.querySelector(".reviews__text");
            revievsTitle.textContent = title.textContent;
            revievsText.textContent = content.textContent;
            // console.log(sliceReviews(false));
            // sliceReviews(false);
            popReviews.open();
        });
    }
    reviewsClose.addEventListener("click", function () {
        popReviews.close();
    });

    function Popup(obj) {
        var
            overlay = obj.overlay,
            modal = obj.modal,
            $this = this,
            body = obj.body,
            text = obj.text;
        $this.open = function (content) {
            $this.content = content;
            overlay.classList.add("open");
            modal.classList.add("open");
            bodyDoc.classList.add("blocked-scroll");
            if (text) {
                text.textContent = content;
            }
        }

        $this.close = function () {
            overlay.classList.remove("open");
            modal.classList.remove("open");
            bodyDoc.classList.remove("blocked-scroll");
        }
    }

    /*Валидация и обработка данных*/
    const
        form = document.querySelector("#form"),
        submit = document.querySelector("#submit"),
        action = document.getElementById("form").attributes["action"].value,
        method = document.getElementById("form").attributes["method"].value;


    submit.addEventListener("click", function (e) {
        e.preventDefault();
        if (validateForm(form)) {
            const data = {
                name: form.elements.name.value,
                phone: form.elements.phone.value,
                // street: form.elements.street.value,
                // house: form.elements.house.value,
                // corps: form.elements.corps.value,
                // flat: form.elements.flat.value,
                // flour: form.elements.flour.value,
                comment: form.elements.comment.value,
                // pay: form.elements.pay.value,
                // change: form.elements.change.value,
                to: "karasev.dev@gmail.com"
            };

            const xhr = new XMLHttpRequest();
            xhr.responseType = "json";
            xhr.open(method, action);
            xhr.send(JSON.stringify(data));
            xhr.addEventListener("load", function () {
                if (xhr.status < 400) {
                    popupForm.open("Сообщение отправлено");
                    formClose.addEventListener("click", function () {
                        popupForm.close()
                    });
                } else {
                    popupForm.open("Сообщение не отправлено");
                    formClose.addEventListener("click", function () {
                        popupForm.close()
                    });
                }
            })

        }
    });
    function validateForm(form) {
        let valid = true;
        if (!validateField(form.elements.name)) {
            valid = false;
        }
        if (!validateField(form.elements.phone)) {
            valid = false;
        }
        return valid;
    };
    function validateField(field) {
        field.nextElementSibling.textContent = field.validationMessage;
        return field.checkValidity();
    };

    // /**ПЛАВНАЯ ПРОКРУТКА ДО ЯКОРЯ**/
    // $(".click-link").on("click", function (e) {
    //     e.preventDefault();
    //     console.log($(this)
    //         .attr("href"));
    //     $("html, body").animate({
    //         scrollTop: $($(this)
    //             .attr("href"))
    //             .offset().top
    //     }, 700, "linear");
    //     $fixedMenu.removeClass("fixed-menu--open")
    // });

    // OPEM/CLOSE MOBILE MENU
    var $hamburger = $(".hamburger-menu__link"),
        $fixedMenu = $(".fixed-menu"),
        $closeMenu = $(".fixed-menu__close, .fixed-menu__link");
    $hamburger.on("click", function (e) {
        e.preventDefault();
        $fixedMenu.fadeIn().addClass("fixed-menu--open");
        $('body').addClass("blocked-scroll");
    });
    $closeMenu.on("click", function () {
        $fixedMenu.fadeOut().removeClass("fixed-menu--open")
        $('body').removeClass("blocked-scroll");
    });

    /**АККОРДЕОН**/
    // TEAM SECTION
    var $teamItem = $(".team__item"),
        $burgerItem = $(".burgermenu__item"),
        $burgerLeft = $(".burgermenu__left"),
        $burgerRight = $(".burgermenu__right"),
        $burgerContent = $(".burgermenu__content");

    $teamItem.on("click", function () {
        var item = $(this);
        item.toggleClass("team__item--active")
            .siblings()
            .removeClass("team__item--active")
    })
    // BURGERMENU SECTION
    $burgerItem.on("click", function (e) {
        var
            item = $(this),
            scrWidth = window.innerWidth,
            thisContent = item.children('.burgermenu__content'),
            bodyWidth = $("body").width(),
            itemWidth = item.width();

        item.toggleClass("burgermenu__item--active")
            .siblings()
            .removeClass("burgermenu__item--active");
        if (scrWidth > 769) {
            if (item.hasClass("burgermenu__item--active")) {
                thisContent.css('width', (bodyWidth / 2 - (itemWidth)) + "px");
                item.siblings().children('.burgermenu__content').css('width', 0)
            } else {
                thisContent.css('width', 0);
                $burgerLeft.removeClass("burgermenu__left--hide");
                $burgerRight.removeClass("burgermenu__right--show");
            }
        } else if (scrWidth < 769 && scrWidth > 481) {
            if (item.hasClass("burgermenu__item--active")) {
                thisContent.css('width', (bodyWidth - itemWidth * 3) + "px");
                item.siblings().children('.burgermenu__content').css('width', 0)
                $burgerLeft.addClass("burgermenu__left--hide");
                $burgerRight.addClass("burgermenu__right--show");
            } else {
                thisContent.css('width', 0);
                $burgerLeft.removeClass("burgermenu__left--hide");
                $burgerRight.removeClass("burgermenu__right--show");
            }

        }
        else if (scrWidth < 480) {
            thisContent.css('width', (bodyWidth - itemWidth) + "px");
            $burgerLeft.toggleClass("burgermenu__left--hide");
            $burgerRight.toggleClass("burgermenu__right--show");
            item.siblings().animate({ width: 'toggle' });
        }
        else {
            $burgerLeft.removeClass("burgermenu__left--hide");
            $burgerRight.removeClass("burgermenu__right--show");
        }
    })

    var $reviewsButton = $(".reviews__button");
    $(window).on("resize load", function () {
        var scrWidth = window.innerWidth;
        if (scrWidth < 480) {
            $reviewsButton.html("Читать отзыв")
        } else {
            $reviewsButton.html("Подробнее")
        }
    })

    /* СЛАЙДЕР*/
    var slider = new Slider({
        slide: ".burgers__center",
        classPrev: ".burgers__left .burgers__prev",
        classNext: ".burgers__right .burgers__next",
        auto: false
    });

    function Slider(obj) {
        this.obj = obj;
        var slideArray = document.querySelectorAll(obj.slide);
        var btnPrev = document.querySelector(obj.classPrev);
        var btnNext = document.querySelector(obj.classNext);
        var auto = obj.auto;
        var time = obj.time || 5000;
        var i = 0;

        var prev = function () {
            slideArray[i].classList.remove("burgers__center--showed");
            i--;

            if (i < 0) {
                i = slideArray.length - 1;
            }

            slideArray[i].classList.add("burgers__center--showed");
        };
        btnPrev.onclick = function () {
            prev();
        }

        var next = function () {
            slideArray[i].classList.remove("burgers__center--showed");
            i++;

            if (i >= slideArray.length) {
                i = 0;
            }

            slideArray[i].classList.add("burgers__center--showed");
        };
        btnNext.onclick = function () {
            next();
        }
        if (auto) {
            setInterval(function () {
                next()
            }, time);
        }
    }

    /* Яндекс карты*/
    ymaps.ready(init);

    var placemarks = [
        {
            latitude: 59.97,
            longitude: 30.31,
            hintContent: '<div class="map__hint">ул. Литераторов, д. 19</div>',
            balloonContent: [
                '<div class="map__balloon">',
                '<svg class="map__balloon-img">',
                '<use xlink:href="img/icons/sprite.svg#logo"></use>',
                '</svg>',
                '<div class="map__balloon-content">',
                '<div class="map__balloon-title">',
                'Бургеры на Литераторов',
                '</div>',
                '<div class="map__balloon-text">',
                'Самые вкусные бургеры у нас! Заходите по адресу: ул. Литераторов, д. 19',
                '</div>',
                '</div>',
                '</div>'
            ]
        },
        {
            latitude: 59.89623482,
            longitude: 30.42444512,
            hintContent: '<div class="map__hint">ул. Бабушкина, д.12/1</div>',
            balloonContent: [
                '<div class="map__balloon">',
                '<svg class="map__balloon-img">',
                '<use xlink:href="img/icons/sprite.svg#logo"></use>',
                '</svg>',
                '<div class="map__balloon-content">',
                '<div class="map__balloon-title">',
                'Бургеры на Бабушкина',
                '</div>',
                '<div class="map__balloon-text">',
                'Самые вкусные бургеры у нас! Заходите по адресу: ул. Бабушкина, д.12/1',
                '</div>',
                '</div>',
                '</div>'
            ]
        },
        {
            latitude: 59.94672149,
            longitude: 30.38588377,
            hintContent: '<div class="map__hint">ул. Тверская, д.15</div>',
            balloonContent: [
                '<div class="map__balloon">',
                '<svg class="map__balloon-img">',
                '<use xlink:href="img/icons/sprite.svg#logo"></use>',
                '</svg>',
                '<div class="map__balloon-content">',
                '<div class="map__balloon-title">',
                'Бургеры на Тверской',
                '</div>',
                '<div class="map__balloon-text">',
                'Самые вкусные бургеры у нас! Заходите по адресу: ул. Тверская, д.15',
                '</div>',
                '</div>',
                '</div>'
            ]
        },
        {
            latitude: 59.89103892,
            longitude: 30.31873528,
            hintContent: '<div class="map__hint">Московский пр., д.105</div>',
            balloonContent: [
                '<div class="map__balloon">',
                '<svg class="map__balloon-img">',
                '<use xlink:href="img/icons/sprite.svg#logo"></use>',
                '</svg>',
                '<div class="map__balloon-content">',
                '<div class="map__balloon-title">',
                'Бургеры на Московской',
                '</div>',
                '<div class="map__balloon-text">',
                'Самые вкусные бургеры у нас! Заходите по адресу: Московский пр., д.105',
                '</div>',
                '</div>',
                '</div>'
            ]
        }
    ],
        geoObjects = [];

    function init() {
        var map = new ymaps.Map("map", {
            center: [59.93, 30.36],
            zoom: 12,
            controls: ['zoomControl'],
            behaviors: ['drag']
        });

        for (var i = 0; i < placemarks.length; i++) {
            geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude],
                {
                    hintContent: placemarks[i].hintContent,
                    balloonContent: placemarks[i].balloonContent.join('')
                },
                {
                    iconLayout: 'default#image',
                    iconImageHref: 'img/icons/map-marker.svg',
                    iconImageSize: [46, 57],
                    iconImageOffset: [-23, -57],
                    iconImageClipRect: [[415, 0], [461, 57]]
                });
        };
        var
            MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div class="map__geoobjects"><div class="map__geoobjects-length">{{ properties.geoObjects.length }}</div></div>'),
            clusterer = new ymaps.Clusterer({
                clusterIcons: [
                    {
                        href: 'img/icons/map-marker.svg',
                        size: [69, 85],
                        offset: [-50, -50]
                    }
                ],
                clusterIconContentLayout: MyIconContentLayout
            });

        map.geoObjects.add(clusterer);
        clusterer.add(geoObjects);

    }

    // Постраничная навигация
    const
        sections = $(".section"),
        display = $(".content"),
        overlay = $(".reviews__overlay, .delivery__overlay");
    let inScroll = false;

    const md = new MobileDetect(window.navigator.userAgent);
    const isMobile = md.mobile();

    const performTransition = sectionEq => {
        sectionEq = parseInt(sectionEq);
        const
            position = (sectionEq * -100) + "%",
            positionOverlay = (sectionEq * 100) + "%";

        if (inScroll) return;

        inScroll = true;

        sections
            .eq(sectionEq)
            .addClass("active")
            .siblings()
            .removeClass("active");
        display.css({
            "transform": `translateY(${position})`,
            "-webkit-transform": `translateY(${position})`
        });
        overlay.css({
            "transform": `translateY(${positionOverlay})`,
            "-webkit-transform": `translateY(${positionOverlay})`
        });
        if (sections.hasClass("active")) {
            const pointsItem = $(".points__item");
            pointsItem.eq(sectionEq).addClass("points__item--current").siblings().removeClass("points__item--current");
        }

        setTimeout(() => {
            inScroll = false;
            // setActiveMenuItem(sectionEq);
        }, 1300);

    };
    const defineSections = sections => {
        const activeSection = sections.filter(".active");

        return {
            activeSection: activeSection,
            nextSection: activeSection.next(),
            prevSection: activeSection.prev()
        }
    }
    const scrollToSection = direction => {
        const section = defineSections(sections);

        if (direction === "up" && section.prevSection.length) {
            performTransition(section.prevSection.index());
        }

        if (direction === "down" && section.nextSection.length) {
            performTransition(section.nextSection.index());
        }
    };

    $(document).on({
        wheel: e => {
            const deltaY = e.originalEvent.deltaY;
            const direction = deltaY > 0 ? "down" : "up";

            scrollToSection(direction);
        },
        keydown: e => {
            switch (e.keyCode) {
                case 40:
                    scrollToSection("down");
                    break;

                case 38:
                    scrollToSection("up");
                    break;
            }
        },
        touchmove: e => {
            e.preventDefault(); 
            e.stopPropagation()
        }
    });
    $('[data-scroll-to]').on('click', e => {
        e.preventDefault();

        const target = parseInt($(e.currentTarget).attr('data-scroll-to'));
        performTransition(target);
    });
    if (isMobile) {
        $(window).swipe({
            swipe: function (event, direction) {
                const scrollDirection = direction === 'down' ? 'up' : 'down';
                scrollToSection(scrollDirection);
            }
        });
    }

});