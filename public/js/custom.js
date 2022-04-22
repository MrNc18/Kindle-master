$(document).ready(function() {
  /*Payment Radio Button*/
  $('input[type="radio"]').click(function() {
    var inputValue = $(this).attr("value");
    var targetBox = $("." + inputValue);
    $(".selectt").not(targetBox).hide();
    $(targetBox).show();
    //alert("Radio button " + inputValue + " is selected");
  });
  /*Payment Radio Button*/

  /*Shipping Address Same*/
  var form = $('#myForm'),
  checkbox = $('#changeShip'),
  chShipBlock = $('#changeShipInputs');

  chShipBlock.hide();

  checkbox.on('click', function() {
    if($(this).is(':checked')) {
      chShipBlock.show();
      chShipBlock.find('input').attr('required', true);
    } else {
      chShipBlock.hide();
      chShipBlock.find('input').attr('required', false);
    }
  })
  /*Shipping Address Same*/
});


$(document).ready(function(){
  $('.best_slider').slick({
      dots: false,
      // infinite: false,
      // speed: 300,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
  });

  $('.store_slider').slick({
    dots: false,
    // infinite: false,
    // speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
});

  $('.cbook_slider').slick({
    dots: false,
    // infinite: false,
    // speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
});

$('.cbook_slider_md').slick({
  dots: false,
  // infinite: false,
  // speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});

  // Top authors slider
  $('.topauth_slider').slick({
    dots: false,
    // infinite: false,
    // speed: 300,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
});

/* Cart qty counter */
$('body').on('click', '.plus', function(){
  var el = $(this).closest(".qty_counter");
  var qty = el.find(".input-qty");
  qty.val(parseInt(qty.val())+1);
});

$('body').on('click', '.minus', function(){
  var el = $(this).closest(".qty_counter");
  var qty = el.find(".input-qty");
  if(parseInt(qty.val()) > 1) {
    qty.val(parseInt(qty.val())-1);
  }
});
/* Cart qty counter */

$('body').on('click', '.addcart_btn', function(){
  $('.cart_added').show();
});

// $('body').on('click', '.card-header', function(){
//   console.log($(this).attr("aria-expanded"));
//   var el = $(this).closest(".accordion_box");
//   if($(this).attr("aria-expanded")) {
//     el.css("border-color", "#e2e2e2");
//   } else {
//     el.css("border-color", "#00BF78");
//   }
  
// });
});

/* Newsletter popup */
// $(window).on('load',function() {
//   setTimeout(function() {
//     $('#newsletterModal').modal('show')
//   },5000);
// });
/* Newsletter popup */


/* Multi-dropdown header menu start*/
// Prevent closing from click inside dropdown
$(document).on('click', '.dropdown-menu', function (e) {
e.stopPropagation();
});

// make it as accordion for smaller screens
if ($(window).width() < 992) {
$('.dropdown-menu a').click(function(e){
  e.preventDefault();
    if($(this).next('.submenu').length){
      $(this).next('.submenu').toggle();
    }
    $('.dropdown').on('hide.bs.dropdown', function () {
   $(this).find('.submenu').hide();
})
});
}
/* Multi-dropdown header menu end*/