function SetTheme(new_color) {
    $sidebar = $('.sidebar');
    $navbar = $('.navbar');
    $main_panel = $('.main-panel');

    $full_page = $('.full-page');

    let $buttons = $('.btn');
    
    if($buttons){
      let new_btn = '';
      switch(new_color){
        case 'blue':
        case 'info':
          new_btn = 'btn-info';
          break;
        case 'green':
        case 'success':
          new_btn = 'btn-success';
          break;
        case 'red':
        case 'primary':
          new_btn = 'btn-primary';
          break;
      }
      $buttons.removeClass('btn-primary').removeClass('btn-info').removeClass('btn-success');
      $buttons.addClass(new_btn);              
    }

    $sidebar_responsive = $('body > .navbar-collapse');

    if ($sidebar.length != 0) {
      $sidebar.attr('data', new_color);
    }

    if ($main_panel.length != 0) {
      $main_panel.attr('data', new_color);
    }

    if ($full_page.length != 0) {
      $full_page.attr('filter-color', new_color);
    }

    if ($sidebar_responsive.length != 0) {
      $sidebar_responsive.attr('data', new_color);
    }
}

async function Confirm(title, text, confirmButtonText, cancelButtonText){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  let result = await swalWithBootstrapButtons.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      reverseButtons: true
    });

    return result;
}

function showSwal(type) {
  console.log('showSwal called');
  if(type == 'basic') {
    Swal.fire({
      title: 'Here is a message!',
      customClass: {
        confirmButton: 'btn btn-info'
      },
      buttonsStyling: false
    })
  } else if(type == 'title-and-text') {
    Swal.fire({
      title: 'The Internet?',
      text: 'That thing is still around?',
      type: 'question',
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false,
    })
  } else if(type == 'success-message'){
    Swal.fire({
      position: 'center',
      type: 'success',
      title: 'Good job!',
      showConfirmButton: false,
      timer: 1500
    })
  } else if(type == 'warning-message-and-confirmation'){
    console.log('showSwal warning-message-and-confirmation called');
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  } else if(type == 'warning-message-and-cancel'){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      console.log(result);
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    }).catch(error => {
      console.log(error);
    })
  } else if(type == 'custom-html'){
    Swal.fire({
      title: '<strong>HTML <u>example</u></strong>',
      type: 'info',
      html:
        'You can use <b>bold text</b>, ' +
        '<a href="//sweetalert2.github.io">links</a> ' +
        'and other HTML tags',
      showCloseButton: true,
      showCancelButton: true,
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
        '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'Thumbs down'
    })
  } else if(type == 'auto-close'){
    let timerInterval
    Swal.fire({
      title: 'Auto close alert!',
      html: 'I will close in <strong></strong> milliseconds.',
      timer: 2000,
      onBeforeOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          Swal.getContent().querySelector('strong')
            .textContent = Swal.getTimerLeft()
        }, 100)
      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.timer
      ) {
        console.log('I was closed by the timer')
      }
    })
  } else if(type == 'input-field'){
    Swal.fire({
      title: 'Submit your Github username',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Look up',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-default'
      },
      buttonsStyling: false,
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return fetch(`//api.github.com/users/${login}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url
        })
      }
    })
  }
}