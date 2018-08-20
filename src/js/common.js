$(function () {
    /**Popup c параметрами**/
    const
        body = document.body,
        /*POPUP REVIEWS */
        btnReviews = document.querySelectorAll(".reviews__button"),
        overlayOpen = document.querySelector(".overlay"),
        reviewsClose = document.querySelector(".reviews__close"),
        revievsModal = document.querySelector(".reviews__modal"),
        revievsText = document.querySelector(".reviews__content-text"),
        popReviews = new Popup({
            overlay: overlayOpen,
            modal: revievsModal,
            // text: revievsText,
            body: body
        }),
        /*POPUP FORM */
        formClose = document.querySelector(".delivery__button"),
        modalForm = document.querySelector(".delivery__modal"),
        modalText = document.querySelector(".delivery__text"),
        popupForm = new Popup({
            overlay: overlayOpen,
            modal: modalForm,
            text: modalText,
            body: body
        });


    for (let i = 0; i < btnReviews.length; i++) {
        const btn = btnReviews[i];
        btn.addEventListener("click", function () {
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
            text = obj.text;
        $this.open = function (content) {
            $this.content = content;
            overlay.classList.add("open");
            modal.classList.add("open");
            body.classList.add("blocked-scroll");
            if (text) {
                text.textContent = content;
            }
        }

        $this.close = function () {
            overlay.classList.remove("open");
            modal.classList.remove("open");
            body.classList.remove("blocked-scroll");
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
                    popupForm.open("Доставлено");
                    formClose.addEventListener("click", function () {
                        popupForm.close()
                    });
                } else {
                    popupForm.open("Не доставлено");
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
    }

    /**ПЛАВНАЯ ПРОКРУТКА ДО ЯКОРЯ**/
    $(".click-link").on("click", function (e) {
        e.preventDefault();
        $("html, body").animate({
            scrollTop: $($(this)
                .attr("href"))
                .offset().top
        }, 700, "linear");
        $fixedMenu.removeClass("fixed-menu--open")
    });

    // OPEM/CLOSE MOBILE MENU
    var $hamburger = $(".hamburger-menu__link"),
        $fixedMenu = $(".fixed-menu"),
        $closeMenu = $(".fixed-menu__close, .fixed-menu__link");
    $hamburger.on("click", function (e) {
        e.preventDefault();
        $fixedMenu.fadeIn().addClass("fixed-menu--open");
        $body.addClass("blocked-scroll");
    });
    $closeMenu.on("click", function () {
        $fixedMenu.fadeOut().removeClass("fixed-menu--open")
        $body.removeClass("blocked-scroll");
    });

    /**АККОРДЕОН**/
    // TEAM SECTION
    var $teamItem = $(".team__item"),
        $burgerItem = $(".burgermenu__item"),
        $burgerLeft = $(".burgermenu__left"),
        $burgerRight = $(".burgermenu__right");

    $teamItem.on("click", function () {
        var item = $(this);
        item.toggleClass("team__item--active")
            .siblings()
            .removeClass("team__item--active")
    })
    // BURGERMENU SECTION

    $burgerItem.on("click", function () {
        var scrWidth = window.innerWidth;
        var item = $(this);
        item.toggleClass("burgermenu__item--active")
            .siblings()
            .removeClass("burgermenu__item--active");
        if (scrWidth < 769 &&
            scrWidth > 481 &&
            item.hasClass("burgermenu__item--active")) {
            $burgerLeft.addClass("burgermenu__left--hide");
            $burgerRight.addClass("burgermenu__right--show");
        }
        if (scrWidth < 480) {
            $burgerLeft.addClass("burgermenu__left--hide");
            $burgerRight.addClass("burgermenu__right--show");
            item.siblings().toggle();
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
});