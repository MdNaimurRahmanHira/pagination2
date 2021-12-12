function getPageList(totalPages, page, maxLength) {
    function range(start, end) {
        return Array.from(Array(end - start + 1), (_, i) => i + start);
    }

    var sideWidth = maxLength < 9 ? 1 : 2;
    var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
    var rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;

    if (totalPages <= maxLength) {
        return range(1, totalPages);
    }

    if (page <= maxLength - sideWidth - 1 - rightWidth) {
        return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages));
    }

    if (page >= totalPages - sideWidth - 1 - rightWidth) {
        return range(1, sideWidth).concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
    }

    return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages));
}
window.onload = function () {
    $(function () {
        var numberOfItems = $(".python-files .accordion-file").length;
        var limitPerPage = 10; //How many card items visible per a page
        var totalPages = Math.ceil(numberOfItems / limitPerPage);
        var paginationSize = 7; //How many page elements visible in the pagination
        var currentPage;

        function showPage(whichPage) {
            if (whichPage < 1 || whichPage > totalPages) return false;

            currentPage = whichPage;

            $(".python-files .accordion-file").hide().slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage).show();

            $(".python-files .pagination li").slice(1, -1).remove();

            getPageList(totalPages, currentPage, paginationSize).forEach(item => {
                $("<li>").addClass("page-item").addClass(item ? "current-page" : "dots")
                    .toggleClass("active", item === currentPage).append($("<a>").addClass("page-link")
                        .attr({
                            href: "javascript:void(0)"
                        }).text(item || "...")).insertBefore(".next-page");
            });

            $(".python-files .previous-page").toggleClass("disable", currentPage === 1);
            $(".python-files .next-page").toggleClass("disable", currentPage === totalPages);
            return true;
        }

        $(".python-files .pagination").append(
            $("<li>").addClass("page-item").addClass("previous-page").append($("<a>").addClass("page-link").attr({
                href: "javascript:void(0)"
            }).text("Prev")),
            $("<li>").addClass("page-item").addClass("next-page").append($("<a>").addClass("page-link").attr({
                href: "javascript:void(0)"
            }).text("Next"))
        );

        $(".python-files").show();
        showPage(1);

        $(document).on("click", ".python-files .pagination li.current-page:not(.active)", function () {
            return showPage(+$(this).text());
        });

        $(".python-files .next-page").on("click", function () {
            return showPage(currentPage + 1);
        });

        $(".python-files .previous-page").on("click", function () {
            return showPage(currentPage - 1);
        });
    });
}