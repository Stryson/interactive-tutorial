document.addEventListener("DOMContentLoaded", function () {

    $(document).ready(function () {

        // ПОЛЗУНОК
        $('#myRange').on("change", function () {
            const slideRange = document.getElementById("myRange"),
                slideInfo = document.getElementById("slide-info"),
                value = slideRange.value;

            slideInfo.innerText = "Масса гирь: " + value + " грамм";
        });

        // ПЛАВНЫЕ СКРОЛЛ ПО ССЫЛКЕ
        $(".about").on("click", "a", function (event) {
            event.preventDefault();

            const id = $(this).attr('href'),
                top = $(id).offset().top;

            $('body, html').animate({ scrollTop: top }, 1500);
        });

        $(".conclusion").on("click", "a", function (event) {
            event.preventDefault();

            const id = $(this).attr('href'),
                top = $(id).offset().top;

            $('body, html').animate({ scrollTop: top }, 2000);
        });

        // ВЫБОР ГЛАВЫ
        $("#chapters").on("click", "a", function (event) {
            event.preventDefault();

            const chapterOne = $("#chapterOne"),
                chapterTwo = $("#chapterTwo")

            $(this).addClass('active');

            if ($(this).hasClass('active') === chapterOne.hasClass('active')) {
                $(".chapterOne").removeClass('hidden');
                $(".chapterOne").addClass('show');
                $(".chapterTwo").addClass('hidden');
                $(".chapterTwo").removeClass('show');

                chapterTwo.removeClass('active');
                chapterOne.addClass('active');
            }

            if ($(this).hasClass('active') === chapterTwo.hasClass('active')) {
                $(".chapterTwo").removeClass('hidden');
                $(".chapterTwo").addClass('show');
                $(".chapterOne").addClass('hidden');
                $(".chapterOne").removeClass('show');

                chapterOne.removeClass('active');
                chapterTwo.addClass('active');
            }
        });
    });

});
