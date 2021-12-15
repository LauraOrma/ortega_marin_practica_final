const regexEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/
const regexPhone = /(\+34|0034|34)?[ -]*([67])[ -]*([0-9][ -]*){8}/

const validarCampos = (target) => {
    let error = false
    switch (target.id) {
        case 'name':
            if (target.value === '') {
                error = true
                $('#name').css('border-color', 'red')
                $('#name').css('box-shadow', '2px 2px 5px red')
            } else {
                $('#name').css('border-color', '#0019ff')
            }
            break
        case 'email':
            if (regexEmail.test(target.value)) {
                error = false
                $('#email').css('border-color', '#0019ff')
            } else {
                $('#email').css('border-color', 'red')
                $('#email').css('box-shadow', '2px 2px 5px red')
            }
            break
        case 'phone':
            if (regexPhone.test(target.value)) {
                error = false
                $('#phone').css('border-color', '#0019ff')
            } else {
                $('#phone').css('border-color', 'red')
                $('#phone').css('box-shadow', '2px 2px 5px red')
            }
            break
        case 'message':
            if (target.value === '') {
                error = true
                $('#message').css('border-color', 'red')
                $('#message').css('box-shadow', '2px 2px 5px red')
            } else {
                $('#message').css('border-color', '#0019ff')
            }
            break
    }
    return error
}
const validarFormulario = () => {
    let error = false
    $('.form-control').map(elemento => {
        if (!error) {
            error = validarCampos(elemento)
        }
    })
    return error
}

jQuery(function () {
    'use strict'
    // COLOR MODE
    $('.color-mode').on('click', function (e) {
        $('#color-mode-icon').toggleClass('ico-moon ico-sun')
        $('#color-mode-icon-mobile').toggleClass('ico-moon ico-sun')
        $('body').toggleClass('dark-mode')
    })

    //NAVBAR TOGGLE ICON
    $('.menu-icon').on('click', function (e) {
        $('#icon-toggle').toggleClass('icon-menu icon-close')
    })

    // FIELD FOCUS
    $('.form-control').on('focus', function () {
        $(this).prev('label').addClass('is-focused')
        $(this).css('border-color', '#0019ff')
    })

    // FIELD BLUR
    $('.form-control').on('blur', (e) => validarCampos(e.target))
    $('#formulario').on('submit', (e) => {
        e.preventDefault()
        let errorValidacion = validarFormulario()
        //Mostrar mensaje cuando no hay ningun check seleccionado al enviar el formulario
        if (!errorValidacion && $('#legal')[0].checked) {
            console.log('Enviando...')
            alert('Enviado sin recargar')
            // document.getElementById('form').submit()
        } else {
            document.getElementById('errorMessageCheck').textContent = 'Debes aceptar los términos legales para enviar el formulario'
        }
    })

})