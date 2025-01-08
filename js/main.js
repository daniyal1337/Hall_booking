jQuery(document).ready(function( $ ) {

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

  // Header fixed on scroll
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Real view height for mobile devices
  if (window.matchMedia("(max-width: 767px)").matches) {
    $('#intro').css({ height: $(window).height() });
  }

  // Initiate the wowjs animation library
  new WOW().init();

  // Initialize Venobox
  $('.venobox').venobox({
    bgcolor: '',
    overlayColor: 'rgba(6, 12, 34, 0.85)',
    closeBackground: '',
    closeColor: '#fff'
  });

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function(e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smooth scroll for the menu and links with .scrollto classes
  $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if( ! $('#header').hasClass('header-fixed') ) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Gallery carousel (uses the Owl Carousel library)
  $(".gallery-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    center:true,
    responsive: { 0: { items: 1 }, 768: { items: 3 }, 992: { items: 4 }, 1200: {items: 5}
    }
  });

  // Buy tickets select the ticket type on click
  $('#buy-ticket-modal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var ticketType = button.data('ticket-type');
    var modal = $(this);
    modal.find('#ticket-type').val(ticketType);
  })

// custom code

});



document.getElementById("downloadButton").addEventListener("click", function() {
  // Get form data
  const formData = {
    name: document.getElementById('name').value,
    mobile: document.getElementById('mobile').value,
    date: document.getElementById('date').value,
    venue: document.getElementById('venue').value,
    capacity: document.getElementById('capacity').value,
    addons: document.getElementById('addons').value,
    address: document.getElementById('address').value,
    message: document.querySelector('textarea[name="message"]').value
  };

  // Choose format: PDF, DOCX, or Excel (You can choose any of these options)
  
  // 1. Generate PDF using jsPDF
  function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Booking Details", 10, 10);
    doc.text(`Name: ${formData.name}`, 10, 20);
    doc.text(`Mobile: ${formData.mobile}`, 10, 30);
    doc.text(`Date of Booking: ${formData.date}`, 10, 40);
    doc.text(`Venue: ${formData.venue}`, 10, 50);
    doc.text(`Capacity: ${formData.capacity}`, 10, 60);
    doc.text(`Addons: ${formData.addons}`, 10, 70);
    doc.text(`Address: ${formData.address}`, 10, 80);
    doc.text(`Message: ${formData.message}`, 10, 90);
    doc.save("booking_details.pdf");
  }
  
  // 2. Generate DOCX using Pizzip and Docxtemplater
  function downloadDOCX() {
    const zip = new Pizzip();
    const doc = new docxtemplater(zip);
    const content = `<h2>Booking Details</h2>
                     <p>Name: ${formData.name}</p>
                     <p>Mobile: ${formData.mobile}</p>
                     <p>Date: ${formData.date}</p>
                     <p>Venue: ${formData.venue}</p>
                     <p>Capacity: ${formData.capacity}</p>
                     <p>Addons: ${formData.addons}</p>
                     <p>Address: ${formData.address}</p>
                     <p>Message: ${formData.message}</p>`;
    
    doc.setData({ content });
    doc.render();
    const out = doc.getZip().generate({ type: "blob" });
    saveAs(out, "booking_details.docx");
  }
  
  // 3. Generate Excel file using SheetJS
  function downloadExcel() {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([formData]);
    XLSX.utils.book_append_sheet(wb, ws, "Booking Details");
    XLSX.writeFile(wb, "booking_details.xlsx");
  }

  // Trigger the chosen format download
  // For now, let's assume we download as PDF
  downloadPDF(); // Replace with downloadDOCX() or downloadExcel() for respective formats
});
