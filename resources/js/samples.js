// The select tag in html
let select = document.querySelector('#language-select');
//when select value changes
select.onchange = function () {
    // child divs of all file wrapper
    let childOfallFileWrapper = document.querySelector('.all-file-wrapper').children;

    //converting childOfallFileWrapper to array
    let allFileToArray = Array.from(childOfallFileWrapper);

    // the index number that are selected
    let slctdIndex = select.selectedIndex;

    //Hiding all element of allFileToArray
    allFileToArray.map(e => {
        e.style.display = 'none';
    });

    // showing the file that has same index number of selected option
    if (childOfallFileWrapper[slctdIndex].style.display === 'none') {
        childOfallFileWrapper[slctdIndex].style.display = 'block';
    };

} //closing of onchange function


// form validation check
let sendtBtn = document.querySelector('.send-btn');
sendtBtn.addEventListener('click', function () {
    let nameInput = document.querySelector('.name input');
    let companyInput = document.querySelector('.company input');
    let messageInput = document.querySelector('.message textarea');

    if (nameInput.value.length < 3) { //if name inputs value is less then 3 character
        // then show the error text
        nameInput.nextElementSibling.style.display = 'block'

    } else if (nameInput.value.length > 3) { //if name inputs value is greater then 3 character
        nameInput.nextElementSibling.style.display = 'none' // then hide the error text
    }
    if (companyInput.value.length < 3) { //if company inputs value is less then 3 character
        companyInput.nextElementSibling.style.display = 'block' // then show the error text

    } else if (companyInput.value.length > 3) { //if Company inputs value is greater then 3 character
        companyInput.nextElementSibling.style.display = 'none' // then hide the error text
    }
    if (messageInput.value.length < 10) { //if message inputs value is less then 3 character
        messageInput.nextElementSibling.style.display = 'block' // then show the error text

    } else if (messageInput.value.length > 10) { //if Company inputs value is greater then 3 character
        messageInput.nextElementSibling.style.display = 'none' // then hide the error text
    }

})


// reading the python csv file and iserting data from the csv to html.
fetch("./python.csv").then(res => {
    return res.text()
}).then(data => {
    let result = data.split(/\r?\n|\r/).map(e => {
        return e.split(",")
    });
    result.map((item) => {
        let htmls = `<div class="accordion-file">
                        <button class="accordion-btn ">${item[0]}<img src="${item[2].includes('True')?'resources/images/locked.png':'resources/images/unlocked.png'}"
                            alt=""></button>
                        <div class="accordion-content">
                            <p>${item[4]}</p>
                            <div class="btn-wrapper">
                                <button class="btn btn-primary me-4 ${item[2].includes('True')?'disabled':''}">View</button>
                                <button class="btn btn-success ${item[2].includes('True')?'disabled':''}">Download</button>
                            </div>
                        </div>
                     </div>`;
        let rNav = document.querySelector('.python-files nav');
        rNav.insertAdjacentHTML('beforebegin', htmls);
    });

});



// reading the r csv file and iserting data from the csv to html.
fetch("./r.csv").then(res => {
    return res.text()
}).then(data => {
    let result = data.split(/\r?\n|\r/).map(e => {
        return e.split(",")
    });
    result.map((item) => {
        let htmls = `<div class="accordion-file">
                        <button class="accordion-btn ">${item[0]}<img src="${item[2].includes('True')?'resources/images/locked.png':'resources/images/unlocked.png'}"
                            alt=""></button>
                        <div class="accordion-content">
                            <p>${item[4]}</p>
                            <div class="btn-wrapper">
                                <button class="btn btn-primary me-4 ${item[2].includes('True')?'disabled':''}">View</button>
                                <button class="btn btn-success ${item[2].includes('True')?'disabled':''}">Download</button>
                            </div>
                        </div>
                     </div>`;
        let rNav = document.querySelector('.r-files nav');
        rNav.insertAdjacentHTML('beforebegin', htmls);
    });

});


// reading the jupyter csv file and iserting data from the csv to html.
fetch("./jupyter.csv").then(res => {
    return res.text()
}).then(data => {
    let result = data.split(/\r?\n|\r/).map(e => {
        return e.split(",")
    });
    result.map((item) => {
        let htmls = `<div class="accordion-file">
                        <button class="accordion-btn ">${item[0]}<img src="${item[2].includes('True')?'resources/images/locked.png':'resources/images/unlocked.png'}"
                            alt=""></button>
                        <div class="accordion-content">
                            <p>${item[4]}</p>
                            <div class="btn-wrapper">
                                <button class="btn btn-primary me-4 ${item[2].includes('True')?'disabled':''}">View</button>
                                <button class="btn btn-success ${item[2].includes('True')?'disabled':''}">Download</button>
                            </div>
                        </div>
                     </div>`;
        let rNav = document.querySelector('.jupyter-files nav');
        rNav.insertAdjacentHTML('beforebegin', htmls);
    });

});




//accordion
window.addEventListener("load", function () {
    ///this is the accordion button  
    let accbtn = document.getElementsByClassName("accordion-btn");
    for (let i = 0; i < accbtn.length; i++) {
        //when one of the buttons are clicked run this function
        accbtn[i].onclick = function () {
            //letiables
            let panel = this.nextElementSibling;
            let accContent = document.getElementsByClassName("accordion-content");
            let accActive = document.getElementsByClassName("accordion-btn active");
            /*if pannel is already open - minimize*/
            if (panel.style.maxHeight) {
                //minifies current pannel if already open
                panel.style.maxHeight = null;
                //removes the 'active' class as toggle didnt work on browsers minus chrome
                this.classList.remove("active");
            } else { //pannel isnt open...
                //goes through the buttons and removes the 'active' css (+ and -)
                for (let ii = 0; ii < accActive.length; ii++) {
                    accActive[ii].classList.remove("active");
                }
                //Goes through and removes 'activ' from the css, also minifies any 'panels' that might be open
                for (let iii = 0; iii < accContent.length; iii++) {
                    this.classList.remove("active");
                    accContent[iii].style.maxHeight = null;
                }
                //opens the specified pannel
                panel.style.maxHeight = panel.scrollHeight + "px";
                //adds the 'active' addition to the css.
                this.classList.add("active");
            }
        } //closing to the acc onclick function
    } //closing to the for loop.
});









// //Pagination JS for python files
// window.addEventListener("load", function () {
//     $(document).ready(function () {
//         //how much items per page to show
//         let show_per_page = 10;
//         //getting the amount of elements inside pagingBox div
//         let number_of_items = $('.python-files').children('.accordion-file').length;
//         //calculate the number of pages we are going to have
//         let number_of_pages = Math.ceil(number_of_items / show_per_page);

//         //set the value of our hidden input fields
//         $('.python-files #current_page').val(0);
//         $('.python-files #show_per_page').val(show_per_page);
//         //now when we got all we need for the navigation let's make it '

//         // what are we going to have in the navigation?
//         //     - link to previous page
//         //     - links to specific pages
//         //     - link to next page

//         let navigation_html = '<a class="previous_link"href="javascript:python_previous();">Prev</a>';
//         let current_link = 0;
//         while (number_of_pages > current_link) {
//             navigation_html += '<a class="page-link " href="javascript:python_go_to_page(' + current_link + ')" longdesc="' + current_link + '">' + (current_link + 1) + '</a>';
//             current_link++;
//         }
//         navigation_html += '<a class="next_link" href="javascript:python_next();">Next</a>';

//         $('.python-files .pagination').html(navigation_html);

//         //add active_page class to the first page link
//         $('.python-files .pagination .page-link:first').addClass('active');

//         //hide all the elements inside pagingBox div
//         $('.python-files').children('.accordion-file').css('display', 'none');

//         //and show the first n (show_per_page) elements
//         $('.python-files').children('.accordion-file').slice(0, show_per_page).css('display', 'block');
//         console.log( $('.python-files').children('.accordion-file'))
        
//     });

// });

// //Pagination functions for python 
// function python_previous() {
//     new_page = parseInt($('.python-files #current_page').val()) - 1;
//     //if there is an item before the current active link run the function
//     if ($('.python-files .pagination .active').prev('.page-link').length == true) {
//         python_go_to_page(new_page);
//     }
// }

// function python_next() {
//     new_page = parseInt($('.python-files #current_page').val()) + 1;
//     //if there is an item before the current active link run the function
//     if ($('.python-files .pagination .active').next('.page-link').length == true) {
//         python_go_to_page(new_page);
//     }
// }

// function python_go_to_page(page_num) {
//     //get the number of items shown per page
//     let show_per_page = parseInt($('.python-files #show_per_page').val());

//     //get the element number where to start the slice from
//     start_from = page_num * show_per_page;

//     //get the element number where to end the slice
//     end_on = start_from + show_per_page;

//     //hide all children elements of pagingBox div, get specific items and show them
//     $('.python-files').children('.accordion-file').css('display', 'none').slice(start_from, end_on).css('display', 'block');

//     /*get the page link that has longdesc attribute of the current page and add active_page class to it
//     and remove that class from previously active page link*/
//     $('.python-files .page-link[longdesc=' + page_num + ']').addClass('active').siblings('.active').removeClass('active');

//     //update the current page input field
//     $('.python-files #current_page').val(page_num);
// }





// //Pagination JS for r files
// window.addEventListener("load", function () {
//     $(document).ready(function () {

//         //how much items per page to show
//         let show_per_page = 10;
//         //getting the amount of elements inside pagingBox div
//         let number_of_items = $('.r-files').children('.accordion-file').length;
//         //calculate the number of pages we are going to have
//         let number_of_pages = Math.ceil(number_of_items / show_per_page);

//         //set the value of our hidden input fields
//         $('.r-files #current_page').val(0);
//         $('.r-files #show_per_page').val(show_per_page);
//         //now when we got all we need for the navigation let's make it '

//         // what are we going to have in the navigation?
//         //     - link to previous page
//         //     - links to specific pages
//         //     - link to next page

//         let navigation_html = '<a class="previous_link"href="javascript:r_previous();">Prev</a>';
//         let current_link = 0;
//         while (number_of_pages > current_link) {
//             navigation_html += '<a class="page-link " href="javascript:r_go_to_page(' + current_link + ')" longdesc="' + current_link + '">' + (current_link + 1) + '</a>';
//             current_link++;
//         }
//         navigation_html += '<a class="next_link" href="javascript:r_next();">Next</a>';

//         $('.r-files .pagination').html(navigation_html);

//         //add active_page class to the first page link
//         $('.r-files .pagination .page-link:first').addClass('active');

//         //hide all the elements inside pagingBox div
//         $('.r-files').children('.accordion-file').css('display', 'none');

//         //and show the first n (show_per_page) elements
//         $('.r-files').children('.accordion-file').slice(0, show_per_page).css('display', 'block');

//     });

// });

// //Pagination functions for r 
// function r_previous() {
//     new_page = parseInt($('.r-files #current_page').val()) - 1;
//     //if there is an item before the current active link run the function
//     if ($('.r-files .pagination .active').prev('.page-link').length == true) {
//         r_go_to_page(new_page);
//     }
// }

// function r_next() {
//     new_page = parseInt($('.r-files #current_page').val()) + 1;
//     //if there is an item before the current active link run the function
//     if ($('.r-files .pagination .active').next('.page-link').length == true) {
//         r_go_to_page(new_page);
//     }
// }

// function r_go_to_page(page_num) {
//     //get the number of items shown per page
//     let show_per_page = parseInt($('.r-files #show_per_page').val());

//     //get the element number where to start the slice from
//     start_from = page_num * show_per_page;

//     //get the element number where to end the slice
//     end_on = start_from + show_per_page;

//     //hide all children elements of pagingBox div, get specific items and show them
//     $('.r-files').children('.accordion-file').css('display', 'none').slice(start_from, end_on).css('display', 'block');

//     /*get the page link that has longdesc attribute of the current page and add active_page class to it
//     and remove that class from previously active page link*/
//     $('.r-files .page-link[longdesc=' + page_num + ']').addClass('active').siblings('.active').removeClass('active');

//     //update the current page input field
//     $('.r-files #current_page').val(page_num);
// }




// //Pagination JS for jupyter files
// window.addEventListener("load", function () {
//     $(document).ready(function () {

//         //how much items per page to show
//         let show_per_page = 10;
//         //getting the amount of elements inside pagingBox div
//         let number_of_items = $('.jupyter-files').children('.accordion-file').length;
//         //calculate the number of pages we are going to have
//         let number_of_pages = Math.ceil(number_of_items / show_per_page);

//         //set the value of our hidden input fields
//         $('.jupyter-files #current_page').val(0);
//         $('.jupyter-files #show_per_page').val(show_per_page);
//         //now when we got all we need for the navigation let's make it '

//         // what are we going to have in the navigation?
//         //     - link to previous page
//         //     - links to specific pages
//         //     - link to next page

//         let navigation_html = '<a class="previous_link"href="javascript:jupyter_previous();">Prev</a>';
//         let current_link = 0;
//         while (number_of_pages > current_link) {
//             navigation_html += '<a class="page-link " href="javascript:jupyter_go_to_page(' + current_link + ')" longdesc="' + current_link + '">' + (current_link + 1) + '</a>';
//             current_link++;
//         }
//         navigation_html += '<a class="next_link" href="javascript:jupyter_next();">Next</a>';

//         $('.jupyter-files .pagination').html(navigation_html);

//         //add active_page class to the first page link
//         $('.jupyter-files .pagination .page-link:first').addClass('active');

//         //hide all the elements inside pagingBox div
//         $('.jupyter-files').children('.accordion-file').css('display', 'none');

//         //and show the first n (show_per_page) elements
//         $('.jupyter-files').children('.accordion-file').slice(0, show_per_page).css('display', 'block');

//     });

// });

// //Pagination functions for jupyter 
// function jupyter_previous() {
//     new_page = parseInt($('.jupyter-files #current_page').val()) - 1;
//     //if there is an item before the current active link run the function
//     if ($('.jupyter-files .pagination .active').prev('.page-link').length == true) {
//         jupyter_go_to_page(new_page);
//     }
// }

// function jupyter_next() {
//     new_page = parseInt($('.jupyter-files #current_page').val()) + 1;
//     //if there is an item before the current active link run the function
//     if ($('.jupyter-files .pagination .active').next('.page-link').length == true) {
//         jupyter_go_to_page(new_page);
//     }
// }

// function jupyter_go_to_page(page_num) {
//     //get the number of items shown per page
//     let show_per_page = parseInt($('.jupyter-files #show_per_page').val());

//     //get the element number where to start the slice from
//     start_from = page_num * show_per_page;

//     //get the element number where to end the slice
//     end_on = start_from + show_per_page;

//     //hide all children elements of pagingBox div, get specific items and show them
//     $('.jupyter-files').children('.accordion-file').css('display', 'none').slice(start_from, end_on).css('display', 'block');

//     /*get the page link that has longdesc attribute of the current page and add active_page class to it
//     and remove that class from previously active page link*/
//     $('.jupyter-files .page-link[longdesc=' + page_num + ']').addClass('active').siblings('.active').removeClass('active');

//     //update the current page input field
//     $('.jupyter-files #current_page').val(page_num);
// }





