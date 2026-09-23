// ======================================
// MENU MOBILE
// ======================================

const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");

menuButton.addEventListener("click", () => {
    nav.classList.toggle("active");
});


// Fecha o menu quando clicar em um link

document.querySelectorAll(".nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

    });

});


// ======================================
// HEADER AO ROLAR
// ======================================

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


// ======================================
// TEMA DARK / LIGHT
// ======================================

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", () => {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {

        themeButton.textContent = "☾";

    } else {

        themeButton.textContent = "☼";

    }

});


// ======================================
// ANIMAÇÕES AO ROLAR
// ======================================

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


document.querySelectorAll(".reveal").forEach(element => {

    observer.observe(element);

});


// ======================================
// FILTRO DOS PRODUTOS
// ======================================

const filters = document.querySelectorAll(".filter");
const products = document.querySelectorAll(".product-card");

filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(button => {

            button.classList.remove("active");

        });

        filter.classList.add("active");

        const category = filter.dataset.filter;

        products.forEach(product => {

            if (
                category === "all" ||
                product.dataset.category === category
            ) {

                product.classList.remove("hide");

            } else {

                product.classList.add("hide");

            }

        });

    });

});


// ======================================
// MODAL LOGIN / CADASTRO
// ======================================

const loginModal = document.getElementById("loginModal");
const openLogin = document.getElementById("openLogin");
const footerLogin = document.getElementById("footerLogin");

function openModal(modal) {

    modal.classList.add("active");

    document.body.style.overflow = "hidden";

}

function closeModal(modal) {

    modal.classList.remove("active");

    document.body.style.overflow = "";

}


openLogin.addEventListener("click", () => {

    openModal(loginModal);

});


footerLogin.addEventListener("click", event => {

    event.preventDefault();

    openModal(loginModal);

});


// Fecha modal

document.querySelectorAll(".close-modal").forEach(button => {

    button.addEventListener("click", () => {

        const modal = button.closest(".modal");

        closeModal(modal);

    });

});


// Clicar fora

document.querySelectorAll(".modal-background").forEach(background => {

    background.addEventListener("click", () => {

        const modal = background.closest(".modal");

        closeModal(modal);

    });

});


// ESC

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        document.querySelectorAll(".modal").forEach(modal => {

            closeModal(modal);

        });

    }

});


// ======================================
// LOGIN / CADASTRO
// ======================================

const authTabs = document.querySelectorAll(".auth-tab");

const authTitle = document.getElementById("authTitle");

const authDescription =
    document.getElementById("authDescription");

const registerField =
    document.querySelector(".register-field");

const authForm =
    document.getElementById("authForm");


let authMode = "login";


authTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        authTabs.forEach(button => {

            button.classList.remove("active");

        });

        tab.classList.add("active");

        authMode = tab.dataset.mode;


        if (authMode === "register") {

            registerField.classList.remove("hidden");

            authTitle.textContent =
                "Crie sua conta.";

            authDescription.textContent =
                "Cadastre-se para ter uma experiência personalizada.";

        } else {

            registerField.classList.add("hidden");

            authTitle.textContent =
                "Bem-vindo de volta.";

            authDescription.textContent =
                "Entre para acompanhar seus pedidos e salvar seus favoritos.";

        }

    });

});


authForm.addEventListener("submit", event => {

    event.preventDefault();

    if (authMode === "register") {

        showToast("Conta criada com sucesso ✓");

    } else {

        showToast("Login realizado com sucesso ✓");

    }

    closeModal(loginModal);

    authForm.reset();

});


// ======================================
// STORY MODAL
// ======================================

const storyButton =
    document.getElementById("experienceButton");

const storyModal =
    document.getElementById("storyModal");


storyButton.addEventListener("click", () => {

    openModal(storyModal);

});


// ======================================
// CARRINHO
// ======================================

const cartButton =
    document.getElementById("cartButton");

const cart =
    document.getElementById("cart");

const closeCartButton =
    document.getElementById("closeCart");

const cartOverlay =
    document.getElementById("cartOverlay");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const checkout =
    document.getElementById("checkout");


let shoppingCart =
    JSON.parse(
        localStorage.getItem("appleStoreCart")
    ) || [];


// Abre carrinho

cartButton.addEventListener("click", () => {

    cart.classList.add("active");

    cartOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

});


// Fecha carrinho

function closeCart() {

    cart.classList.remove("active");

    cartOverlay.classList.remove("active");

    document.body.style.overflow = "";

}


closeCartButton.addEventListener("click", closeCart);

cartOverlay.addEventListener("click", closeCart);


// ======================================
// FORMATAÇÃO DE PREÇO
// ======================================

function formatMoney(value) {

    return value.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


// ======================================
// SALVAR CARRINHO
// ======================================

function saveCart() {

    localStorage.setItem(
        "appleStoreCart",
        JSON.stringify(shoppingCart)
    );

}


// ======================================
// RENDERIZAR CARRINHO
// ======================================

function renderCart() {

    if (shoppingCart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <strong>
                    Seu carrinho está vazio.
                </strong>

                <span>
                    Adicione um produto para começar.
                </span>

            </div>

        `;

    } else {

        cartItems.innerHTML =
            shoppingCart.map((item,index) => {

                return `

                    <div class="cart-item">

                        <div>

                            <strong>
                                ${item.name}
                            </strong>

                            <small>
                                ${item.quantity} ×
                                ${formatMoney(item.price)}
                            </small>

                        </div>

                        <div>

                            <strong>
                                ${formatMoney(
                                    item.price *
                                    item.quantity
                                )}
                            </strong>

                            <button
                                class="remove"
                                data-index="${index}">
                                Remover
                            </button>

                        </div>

                    </div>

                `;

            }).join("");


        document.querySelectorAll(".remove")
            .forEach(button => {

                button.addEventListener("click", () => {

                    const index =
                        Number(button.dataset.index);

                    shoppingCart.splice(index,1);

                    saveCart();

                    renderCart();

                });

            });

    }


    const totalItems =
        shoppingCart.reduce(
            (total,item) =>
                total + item.quantity,
            0
        );


    const totalPrice =
        shoppingCart.reduce(
            (total,item) =>
                total +
                item.price *
                item.quantity,
            0
        );


    cartCount.textContent = totalItems;

    cartCount.style.display =
        totalItems > 0 ? "grid" : "none";

    cartTotal.textContent =
        formatMoney(totalPrice);

}


// ======================================
// ADICIONAR PRODUTO
// ======================================

document.querySelectorAll(".add-cart")
    .forEach(button => {

        button.addEventListener("click", () => {

            const name =
                button.dataset.name;

            const price =
                Number(button.dataset.price);


            const existing =
                shoppingCart.find(
                    item =>
                        item.name === name
                );


            if (existing) {

                existing.quantity++;

            } else {

                shoppingCart.push({

                    name: name,

                    price: price,

                    quantity: 1

                });

            }


            saveCart();

            renderCart();

            showToast(
                `${name} adicionado ao carrinho ✓`
            );


            button.animate(

                [
                    {
                        transform: "scale(1)"
                    },

                    {
                        transform: "scale(.9)"
                    },

                    {
                        transform: "scale(1)"
                    }
                ],

                {
                    duration: 250
                }

            );

        });

    });


// ======================================
// FINALIZAR COMPRA
// ======================================

checkout.addEventListener("click", () => {

    if (shoppingCart.length === 0) {

        showToast(
            "Adicione um produto primeiro."
        );

        return;

    }


    showToast(
        "Checkout demonstrativo iniciado ✓"
    );

});


// Render inicial

renderCart();


// ======================================
// TOAST
// ======================================

const toast =
    document.getElementById("toast");

let toastTimer;


function showToast(message) {

    toast.textContent = message;

    toast.classList.add("active");

    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(() => {

            toast.classList.remove("active");

        },2500);

}


// ======================================
// EFEITO DO MOUSE
// ======================================

document.addEventListener(
    "mousemove",
    event => {

        const x =
            (event.clientX /
                window.innerWidth -
                .5) * 10;

        const y =
            (event.clientY /
                window.innerHeight -
                .5) * 10;


        const phone =
            document.querySelector(".phone");


        if (phone) {

            phone.style.transform =
                `rotate(9deg)
                 translate(${x}px,${y}px)`;

        }

        /* =========================================
   GSAP + SCROLLTRIGGER
========================================= */

if (typeof gsap !== "undefined") {

    gsap.registerPlugin(ScrollTrigger);

    /* =====================================
       HERO — ENTRADA CINEMATOGRÁFICA
    ===================================== */

    const heroTimeline = gsap.timeline({
        defaults: {
            ease: "power4.out"
        }
    });

    heroTimeline
        .from(".hero-content", {
            opacity: 0,
            y: 40,
            duration: 1
        })
        .from(".hero h1", {
            opacity: 0,
            y: 80,
            scale: .95,
            duration: 1.1
        }, "-=.7")
        .from(".hero p", {
            opacity: 0,
            y: 30,
            duration: .8
        }, "-=.65")
        .from(".hero-buttons .btn", {
            opacity: 0,
            y: 25,
            scale: .9,
            stagger: .12,
            duration: .7
        }, "-=.5")
        .from(".stats .stat", {
            opacity: 0,
            y: 20,
            stagger: .12,
            duration: .6
        }, "-=.4")
        .from(".phone-wrapper", {
            opacity: 0,
            x: 100,
            rotationY: -25,
            scale: .8,
            duration: 1.3
        }, "-=1");


    /* =====================================
       HERO — PARALLAX NO CELULAR
    ===================================== */

    if (document.querySelector(".phone-wrapper")) {

        gsap.to(".phone-wrapper", {
            y: -80,
            rotation: 3,
            ease: "none",

            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: 1.5
            }
        });

    }


    /* =====================================
       HERO — FLOATING CARDS
    ===================================== */

    gsap.to(".float-card.one", {
        y: -20,
        x: 8,
        rotation: -3,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".float-card.two", {
        y: 20,
        x: -8,
        rotation: 3,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });


    /* =====================================
       MARQUEE
    ===================================== */

    gsap.to(".marquee-track", {
        xPercent: -50,
        duration: 25,
        repeat: -1,
        ease: "none"
    });


    /* =====================================
       TÍTULOS DAS SEÇÕES
    ===================================== */

    gsap.utils.toArray(".section-header").forEach(header => {

        gsap.from(header, {

            opacity: 0,
            y: 80,

            duration: 1,

            scrollTrigger: {
                trigger: header,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }

        });

    });


    /* =====================================
       PRODUTOS — ENTRADA EM CASCATA
    ===================================== */

    gsap.utils.toArray(".product-card").forEach((card, index) => {

        gsap.from(card, {

            opacity: 0,
            y: 100,
            scale: .85,
            rotationX: 15,

            duration: .9,

            delay: index * .08,

            ease: "power3.out",

            scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none reverse"
            }

        });

    });


    /* =====================================
       PRODUTOS — PARALLAX INTERNO
    ===================================== */

    gsap.utils.toArray(".product-image").forEach(image => {

        gsap.to(image, {

            y: -20,

            ease: "none",

            scrollTrigger: {
                trigger: image,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }

        });

    });


    /* =====================================
       EXPERIÊNCIA
    ===================================== */

    const experience = document.querySelector(".experience");

    if (experience) {

        const experienceTimeline =
            gsap.timeline({

                scrollTrigger: {
                    trigger: experience,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }

            });

        experienceTimeline
            .from(".experience-content", {
                opacity: 0,
                x: -100,
                duration: 1
            })
            .from(".experience-visual", {
                opacity: 0,
                x: 100,
                scale: .85,
                duration: 1
            }, "-=.8")
            .from(".experience-orb", {
                scale: 0,
                rotation: 180,
                duration: 1.2,
                ease: "back.out(1.7)"
            }, "-=.6");

    }


    /* =====================================
       ORB FLUTUANDO
    ===================================== */

    gsap.to(".experience-orb", {

        y: -25,
        scale: 1.08,

        duration: 2.5,

        repeat: -1,
        yoyo: true,

        ease: "sine.inOut"

    });


    /* =====================================
       BANNER
    ===================================== */

    const banner = document.querySelector(".banner");

    if (banner) {

        gsap.from(".banner", {

            opacity: 0,
            scale: .85,
            y: 80,

            duration: 1.2,

            scrollTrigger: {
                trigger: ".banner",
                start: "top 80%",
                toggleActions: "play none none reverse"
            }

        });

        gsap.from(".banner h2", {

            opacity: 0,
            y: 60,

            duration: 1,

            scrollTrigger: {
                trigger: ".banner",
                start: "top 75%"
            }

        });

    }


    /* =====================================
       DEPOIMENTOS
    ===================================== */

    gsap.utils.toArray(".testimonial").forEach((card, index) => {

        gsap.from(card, {

            opacity: 0,
            y: 70,
            rotationY: index % 2 === 0 ? -8 : 8,

            duration: .9,

            scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none reverse"
            }

        });

    });


    /* =====================================
       FOOTER
    ===================================== */

    gsap.from("footer", {

        opacity: 0,
        y: 50,

        duration: 1,

        scrollTrigger: {
            trigger: "footer",
            start: "top 90%"
        }

    });


    /* =====================================
       NÚMEROS DOS STATS
    ===================================== */

    document.querySelectorAll(".stat strong").forEach(stat => {

        const original = stat.innerText;

        const numberMatch =
            original.match(/[\d,.]+/);

        if (!numberMatch) return;

        const number =
            parseFloat(
                numberMatch[0]
                    .replace(",", ".")
            );

        const prefix =
            original.split(numberMatch[0])[0];

        const suffix =
            original.split(numberMatch[0])[1] || "";

        const counter = {
            value: 0
        };

        gsap.to(counter, {

            value: number,

            duration: 2,

            ease: "power2.out",

            scrollTrigger: {
                trigger: stat,
                start: "top 90%",
                once: true
            },

            onUpdate: () => {

                stat.innerText =
                    prefix +
                    Math.floor(counter.value) +
                    suffix;

            }

        });

    });


    /* =====================================
       EFEITO DE PROFUNDIDADE NAS SEÇÕES
    ===================================== */

    gsap.utils.toArray(".section").forEach(section => {

        gsap.to(section, {

            backgroundPosition: "50% 20%",

            ease: "none",

            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 2
            }

        });

    });


    /* =====================================
       REFRESH
    ===================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            ScrollTrigger.refresh();

        }, 500);

    });

}

    }
);