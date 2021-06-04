window.onload = function() {

    // DARK THEME
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

    // FIRST SCREEN GALLERY


    const FS_gallery = document.querySelector('.first_screen_gallery');
    const images = FS_gallery.querySelector('.images');
    const FS_items = images.children;
    images.style.height = document.querySelector('.chosen_item').offsetHeight + 'px';
    let width = images.querySelector('.gallery_item').offsetWidth;

    // SVG Line Circles
    const svg = FS_gallery.querySelector('svg');
    let itemsArray = Array.from(FS_items);


    itemsArray.forEach((el) => {
        let x = el.offsetLeft + (el.offsetWidth / 2);
        let circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle1.setAttribute('cx', x);
        circle1.setAttribute('cy', '6.5');
        circle1.setAttribute('r', '6');
        circle1.setAttribute('stroke', '#FEFEFE');
        svg.append(circle1);

        let circle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle2.setAttribute('cx', x);
        circle2.setAttribute('cy', '6.5');
        circle2.setAttribute('r', '2.5');
        circle2.setAttribute('fill', '#FEFEFE');
        svg.append(circle2);
    })
    window.addEventListener('resize', () => {
        let circles = Array.from(svg.children);
        circles.splice(0, 3);
        itemsArray.forEach((el, index) => {
            let x = el.offsetLeft + (el.offsetWidth / 2);
            circles[index * 2].setAttribute('cx', x);
            circles[index * 2 + 1].setAttribute('cx', x);
        })

    });


    // Gallery Click Repsonse
    let margin = 0;

    function chosenItemUpd(target) {
        let indexDif = itemsArray.indexOf(target) - itemsArray.indexOf(document.querySelector('.chosen_item'));

        margin += (-(indexDif * (width + 45)));
        images.firstElementChild.style.marginLeft = margin + 'px';

        document.querySelector('.chosen_item').classList.remove('chosen_item');
        target.classList.add('chosen_item');
    }

    images.addEventListener('click', (el) => {
        const target = el.target.closest('.gallery_item');
        if (target !== null) {

            chosenItemUpd(target);
            controlUpd();
        }
    });

    // Gallery Control


    function controlUpd() {
        const control = FS_gallery.querySelector('.control');
        const current = control.querySelector('.current_counter');
        const input = control.querySelector('input');
        const index = itemsArray.indexOf(document.querySelector('.chosen_item')) + 1;

        current.innerText = '0' + index;
        input.value = index;
    }

    // Input Gallery Control
    const FS_input = FS_gallery.querySelector('input');
    FS_input.oninput = function() {

        chosenItemUpd(itemsArray[FS_input.value - 1]);
        controlUpd();
    }


    // Pets Screen Gallery

    const pets_screen = document.querySelector('.pets_screen');
    const pets_gallery = pets_screen.querySelector('.gallery');
    const pets_items = pets_gallery.querySelectorAll('.item');
    let pets_array = Array.from(pets_items);
    const left_btn = pets_gallery.previousElementSibling;
    const right_btn = pets_gallery.nextElementSibling;
    const gap = parseFloat(getComputedStyle(pets_gallery.firstElementChild).marginRight);
    

    //calculating margins to move a gallery item
    let margin1 = 0;
    const width1 = pets_gallery.querySelector('.item').offsetWidth + gap;
    const gallery_width = pets_gallery.offsetWidth;

    //VISIBILITY AND ITEMS MOVING
    //visible class
    const visible = Math.floor(gallery_width / (width1 - gap));
    let array_visible = [];
    for (let i = 0; i < visible; i++) {
        pets_array[i].classList.add('visible');
        array_visible[i] = pets_array[i];
    }

    function visibility(target) {
        if (!target.classList.contains('visible')) {
            const current_margin = parseFloat(getComputedStyle(pets_gallery.firstElementChild).marginLeft);
            //left
            if ((pets_array.indexOf(target) - pets_array.indexOf(document.querySelector('.active'))) < 0) {
                target.classList.add('visible');
                array_visible.unshift(target);
                array_visible[array_visible.length - 1].classList.remove('visible');
                array_visible.pop();
                margin1 = current_margin + width1;
                pets_gallery.firstElementChild.style.marginLeft = margin1 + 'px';
            } else {
                //right
                target.classList.add('visible');
                array_visible.push(target);
                array_visible[0].classList.remove('visible');
                array_visible.shift();
                margin1 = current_margin - width1;
                pets_gallery.firstElementChild.style.marginLeft = margin1 + 'px';
            }

        }
        document.querySelector('.active').classList.remove('active');
        target.classList.add('active');
    }
    //MOUSE CLICK
    pets_gallery.addEventListener('click', (el) => {
            const target = el.target.closest('.item');
            if (target !== null) {
                document.querySelector('.active').classList.remove('active');
                target.classList.add('active');
                petsCntrlUpd(pets_array.indexOf(target) + 1);
            }
        })
        //BUTTONS
    left_btn.addEventListener('click', (el) => {
        let active = pets_gallery.querySelector('.active');
        let target = active.previousElementSibling;
        if (target === null) {
            pets_gallery.firstElementChild.style.marginLeft = -width1*(pets_array.length-visible) + 'px';
            for (let i = 0; i < array_visible.length; i++) {
                pets_array[pets_array.length - i - 1].classList.add('visible');
                array_visible[array_visible.length - i - 1].classList.remove('visible')
                array_visible[array_visible.length - i - 1] = pets_array[pets_array.length - i - 1];
            }
            document.querySelector('.active').classList.remove('active');
            pets_array[pets_array.length - 1].classList.add('active');
            petsCntrlUpd(pets_array.length);
        } else {
            visibility(target);
            petsCntrlUpd(pets_array.indexOf(target) + 1);
        }

    })

    right_btn.addEventListener('click', (el) => {
        let active = pets_gallery.querySelector('.active');
        let target = active.nextElementSibling;
        if (target === null) {
            pets_gallery.firstElementChild.style.marginLeft = 0 + 'px';
            for (let i = 0; i < array_visible.length; i++) {
                array_visible[i].classList.remove('visible');
                pets_array[i].classList.add('visible');
                array_visible[i] = pets_array[i];
            }
            document.querySelector('.active').classList.remove('active');
            pets_array[0].classList.add('active');
            petsCntrlUpd(1);
        } else {
            visibility(target);
            petsCntrlUpd(pets_array.indexOf(target) + 1);
        }
    })

    //CONTROL
    const pets_input = pets_screen.querySelector('input');

    function petsCntrlUpd(value) {
        const current_value = pets_screen.querySelector('.current_counter');

        current_value.innerText = '0' + value;
        pets_input.value = value;
    }

    pets_input.oninput = function() {
        visibility(pets_array[pets_input.value - 1]);
        petsCntrlUpd(pets_input.value);
    }
}