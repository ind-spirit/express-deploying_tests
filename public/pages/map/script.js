window.onload = function() {

    //DARK THEME
    const toggle = document.querySelector('.toggle-btn');

    toggle.addEventListener('click', function() {
        const head = document.querySelector('head');

        if (toggle.checked) {
            const dark_theme = document.createElement('link');
            dark_theme.rel = 'stylesheet';
            dark_theme.href = 'dark-theme.css';
            dark_theme.classList.add('dark-theme');
            head.appendChild(dark_theme);
        } else {
            const dark_theme = document.querySelector('.dark-theme');
            head.removeChild(dark_theme);
        }
    });


    //GALLERY



    const main = document.querySelector('.main');
    const wrapper = main.querySelector('.wrapper');
    const wrapper_width = parseFloat(getComputedStyle(wrapper).width);
    const gallery = main.querySelector('.items');
    const items = gallery.querySelectorAll('.gallery_item');
    let array = Array.from(items);
    const left_btn = gallery.previousElementSibling;
    const right_btn = gallery.nextElementSibling;
    const gap = parseFloat(getComputedStyle(gallery.firstElementChild).marginRight);




    //HEIGHT FIX
    gallery.style.height = (document.querySelector('.chosen_item').offsetHeight + 30) + 'px';

    //calculating margins to move a gallery item
    let margin = 0;
    const width = gallery.querySelector('.gallery_item').offsetWidth + gap * 2;

    

    const gallery_width = gallery.offsetWidth;
    //GALLERY WIDTH
    window.addEventListener('resize', () => {
        const width = gallery.querySelector('.gallery_item').offsetWidth + gap * 2;
        const wrapper_width = parseFloat(getComputedStyle(wrapper).width);
        gallery.style.width = ((Math.floor((wrapper_width - 50) / width) * width) + gap * 2) + 'px';
    })

    //VISIBILITY AND ITEMS MOVING
    //visible class
    const visible = (Math.floor((wrapper_width - 40) / width));
    console.log(visible);
    let array_visible = [];
    for (let i = 0; i < visible; i++) {
        array[i].classList.add('visible');
        array_visible[i] = array[i];
    }

    //GALLERY WIDTH
    console.log(gallery.offsetWidth);
    console.log(wrapper_width, width);
    gallery.style.width = (visible * width) + 'px';
    console.log(gallery.offsetWidth);

    function visibility(target) {
        if (!target.classList.contains('visible')) {
            const current_margin = parseFloat(getComputedStyle(gallery.firstElementChild).marginLeft);
            //left
            if ((array.indexOf(target) - array.indexOf(document.querySelector('.chosen_item'))) < 0) {
                target.classList.add('visible');
                array_visible.unshift(target);
                array_visible[array_visible.length - 1].classList.remove('visible');
                array_visible.pop();
                margin = current_margin + width;
                gallery.firstElementChild.style.marginLeft = margin + 'px';
            } else {
                //right
                target.classList.add('visible');
                array_visible.push(target);
                array_visible[0].classList.remove('visible');
                array_visible.shift();
                margin = current_margin - width;
                gallery.firstElementChild.style.marginLeft = margin + 'px';
            }

        }
        document.querySelector('.chosen_item').classList.remove('chosen_item');
        target.classList.add('chosen_item');
    }
    //MOUSE CLICK
    gallery.addEventListener('click', (el) => {
        const target = el.target.closest('.gallery_item');
        if (target !== null) {
            document.querySelector('.chosen_item').classList.remove('chosen_item');
            target.classList.add('chosen_item');
            cntrlUpd(array.indexOf(target) + 1);
            markerUpd();
        }
    })

    //BUTTONS
    left_btn.addEventListener('click', (el) => {
        let chosen_item = gallery.querySelector('.chosen_item');
        let target = chosen_item.previousElementSibling;
        if (target === null) {
            gallery.firstElementChild.style.marginLeft = (-width * (array.length - visible)) + gap + 'px';
            for (let i = 0; i < array_visible.length; i++) {
                array[array.length - i - 1].classList.add('visible');
                array_visible[array_visible.length - i - 1].classList.remove('visible')
                array_visible[array_visible.length - i - 1] = array[array.length - i - 1];
            }
            document.querySelector('.chosen_item').classList.remove('chosen_item');
            array[array.length - 1].classList.add('chosen_item');
            cntrlUpd(array.length);
            markerUpd();
        } else {
            visibility(target);
            cntrlUpd(array.indexOf(target) + 1);
            markerUpd();
        }

    })

    right_btn.addEventListener('click', (el) => {
        let chosen_item = gallery.querySelector('.chosen_item');
        let target = chosen_item.nextElementSibling;
        if (target === null) {
            gallery.firstElementChild.style.marginLeft = gap + 'px';
            for (let i = 0; i < array_visible.length; i++) {
                array_visible[i].classList.remove('visible');
                array[i].classList.add('visible');
                array_visible[i] = array[i];
            }
            document.querySelector('.chosen_item').classList.remove('chosen_item');
            array[0].classList.add('chosen_item');
            cntrlUpd(1);
            markerUpd();
        } else {
            visibility(target);
            cntrlUpd(array.indexOf(target) + 1);
            markerUpd();
        }
    })

    //CONTROL
    const input = main.querySelector('input');

    function cntrlUpd(value) {
        const current_value = main.querySelector('.current_counter');

        current_value.innerText = '0' + value;
        input.value = value;
    }

    input.oninput = function() {
        visibility(array[input.value - 1]);
        cntrlUpd(input.value);
        markerUpd();
    }

    //MARKERS
    function markerUpd() {
        switch (array.indexOf(document.querySelector('.chosen_item')) + 1) {
            case 1:
                main.querySelector('.active_marker').classList.remove('active_marker');
                main.querySelector('.gorilla_marker').classList.add('active_marker');
                break;
            case 2:
                main.querySelector('.active_marker').classList.remove('active_marker');
                main.querySelector('.panda_marker').classList.add('active_marker');
                break;
            case 3:
                main.querySelector('.active_marker').classList.remove('active_marker');
                main.querySelector('.alligator_marker').classList.add('active_marker');
                break;
            case 4:
                main.querySelector('.active_marker').classList.remove('active_marker');
                main.querySelector('.eagle_marker').classList.add('active_marker');
                break;
            default:
                break;
        }
    }
    

}