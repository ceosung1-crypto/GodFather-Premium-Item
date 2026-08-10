<script>
document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       PRODUCT DATA
    ========================================== */

    const products = {

        "Alight Motion": [
            {
                name: "1 Tahun",
                price: 1
            }
        ],

        "CapCut Pro": [
            {
                name: "7 Hari",
                price: 2
            },
            {
                name: "30 Hari",
                price: 7
            },
            {
                name: "6 Bulan",
                price: 35
            }
        ],

        "Spotify Premium": [
            {
                name: "1 Bulan",
                price: 5
            },
            {
                name: "2 Bulan",
                price: 9
            },
            {
                name: "3 Bulan",
                price: 15
            }
        ],

        "YouTube Premium": [
            {
                name: "1 Bulan",
                price: 5
            }
        ],

        "Wink": [
            {
                name: "Private 7 Hari",
                price: 2
            }
        ],

        "Meitu VIP": [
            {
                name: "VIP + Private 1 Bulan",
                price: 8
            }
        ]

    };


    /* ==========================================
       WHATSAPP NUMBER
    ========================================== */

    const whatsappNumber = "60178316939";


    /* ==========================================
       CREATE MODAL
    ========================================== */

    const modalHTML = `
    
    <div class="shop-modal" id="shopModal">

        <div class="shop-modal-overlay"></div>

        <div class="shop-modal-box">

            <button class="shop-modal-close" id="shopModalClose">
                <i class="fa-solid fa-xmark"></i>
            </button>

            <div class="shop-modal-icon">
                <img id="modalProductImage" src="" alt="">
            </div>

            <span class="modal-label">SELECT PACKAGE</span>

            <h2 id="modalProductName">Product</h2>

            <p class="modal-subtitle">
                Pilih paket yang kamu inginkan
            </p>

            <div class="package-list" id="packageList"></div>

            <div class="selected-package" id="selectedPackage">

                <div>
                    <small>Selected Package</small>
                    <strong id="selectedPackageName">
                        Belum dipilih
                    </strong>
                </div>

                <strong id="selectedPackagePrice">
                    RM0
                </strong>

            </div>

            <button class="continue-order" id="continueOrder" disabled>

                <span>Lanjutkan</span>

                <i class="fa-solid fa-arrow-right"></i>

            </button>

        </div>

    </div>


    <div class="checkout-modal" id="checkoutModal">

        <div class="shop-modal-overlay"></div>

        <div class="checkout-box">

            <button class="shop-modal-close" id="checkoutClose">
                <i class="fa-solid fa-xmark"></i>
            </button>

            <span class="modal-label">ORDER SUMMARY</span>

            <h2>Detail Pesanan</h2>

            <div class="order-summary">

                <div class="summary-row">
                    <span>Item</span>
                    <strong id="summaryProduct"></strong>
                </div>

                <div class="summary-row">
                    <span>Paket</span>
                    <strong id="summaryPackage"></strong>
                </div>

                <div class="summary-row total">
                    <span>Total</span>
                    <strong id="summaryPrice"></strong>
                </div>

            </div>

            <div class="payment-note">

                <i class="fa-solid fa-circle-info"></i>

                <p>
                    Setelah selesai melakukan pembayaran,
                    screenshot bukti pembayaran lalu kirim
                    kepada admin melalui WhatsApp.
                </p>

            </div>

            <button class="payment-button" id="paymentButton">

                <i class="fa-solid fa-wallet"></i>

                <span>Lihat Payment</span>

            </button>

        </div>

    </div>


    <div class="payment-modal" id="paymentModal">

        <div class="shop-modal-overlay"></div>

        <div class="payment-box">

            <button class="shop-modal-close" id="paymentClose">
                <i class="fa-solid fa-xmark"></i>
            </button>

            <span class="modal-label">PAYMENT</span>

            <h2>Scan & Pay</h2>

            <p class="payment-product">
                <span id="paymentProduct"></span>
                <strong id="paymentPrice"></strong>
            </p>

            <div class="qr-container">

                <img
                    src="assets/qr.jpg"
                    alt="Payment QR"
                >

            </div>

            <div class="payment-warning">

                <i class="fa-solid fa-camera"></i>

                <span>
                    Setelah bayar, screenshot bukti pembayaran
                    dan kirim ke admin.
                </span>

            </div>

            <a
                href="#"
                id="whatsappPayment"
                class="whatsapp-payment"
                target="_blank"
            >

                <i class="fa-brands fa-whatsapp"></i>

                <span>
                    Kirim Bukti ke WhatsApp
                </span>

            </a>

        </div>

    </div>

    `;


    document.body.insertAdjacentHTML(
        "beforeend",
        modalHTML
    );


    /* ==========================================
       ELEMENTS
    ========================================== */

    const shopModal =
        document.getElementById("shopModal");

    const checkoutModal =
        document.getElementById("checkoutModal");

    const paymentModal =
        document.getElementById("paymentModal");

    const modalProductName =
        document.getElementById("modalProductName");

    const modalProductImage =
        document.getElementById("modalProductImage");

    const packageList =
        document.getElementById("packageList");

    const selectedPackageName =
        document.getElementById("selectedPackageName");

    const selectedPackagePrice =
        document.getElementById("selectedPackagePrice");

    const continueOrder =
        document.getElementById("continueOrder");


    /* ==========================================
       CURRENT ORDER
    ========================================== */

    let currentProduct = "";
    let currentPackage = "";
    let currentPrice = 0;


    /* ==========================================
       PRODUCT IMAGE
    ========================================== */

    const productImages = {

        "Alight Motion":
            "assets/alight-motion.png",

        "CapCut Pro":
            "assets/capcut.png",

        "Spotify Premium":
            "assets/spotify.png",

        "YouTube Premium":
            "assets/youtube.png",

        "Wink":
            "assets/wink.png",

        "Meitu VIP":
            "assets/meitu.png"

    };


    /* ==========================================
       OPEN PACKAGE MODAL
    ========================================== */

    document.querySelectorAll(
        ".choose-product"
    ).forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const product =
                    this.dataset.product;

                if (!products[product]) {
                    return;
                }

                currentProduct = product;
                currentPackage = "";
                currentPrice = 0;

                modalProductName.textContent =
                    product;

                modalProductImage.src =
                    productImages[product] || "";

                selectedPackageName.textContent =
                    "Belum dipilih";

                selectedPackagePrice.textContent =
                    "RM0";

                continueOrder.disabled = true;

                packageList.innerHTML = "";

                products[product].forEach(
                    (pkg, index) => {

                        const packageButton =
                            document.createElement("button");

                        packageButton.className =
                            "package-option";

                        packageButton.innerHTML = `

                            <div class="package-left">

                                <span class="package-radio"></span>

                                <div>

                                    <strong>
                                        ${pkg.name}
                                    </strong>

                                    <small>
                                        ${product}
                                    </small>

                                </div>

                            </div>

                            <strong class="package-price">
                                RM${pkg.price}
                            </strong>

                        `;

                        packageButton.addEventListener(
                            "click",
                            () => {

                                document
                                    .querySelectorAll(
                                        ".package-option"
                                    )
                                    .forEach(
                                        item =>
                                            item.classList.remove(
                                                "active"
                                            )
                                    );

                                packageButton.classList.add(
                                    "active"
                                );

                                currentPackage =
                                    pkg.name;

                                currentPrice =
                                    pkg.price;

                                selectedPackageName.textContent =
                                    pkg.name;

                                selectedPackagePrice.textContent =
                                    "RM" + pkg.price;

                                continueOrder.disabled =
                                    false;

                            }
                        );

                        packageList.appendChild(
                            packageButton
                        );

                    }
                );

                shopModal.classList.add("active");

                document.body.classList.add(
                    "modal-open"
                );

            }
        );

    });


    /* ==========================================
       CLOSE SHOP MODAL
    ========================================== */

    document.getElementById(
        "shopModalClose"
    ).addEventListener(
        "click",
        closeAllModals
    );


    /* ==========================================
       CONTINUE TO CHECKOUT
    ========================================== */

    continueOrder.addEventListener(
        "click",
        () => {

            if (
                !currentProduct ||
                !currentPackage
            ) {
                return;
            }

            document.getElementById(
                "summaryProduct"
            ).textContent =
                currentProduct;

            document.getElementById(
                "summaryPackage"
            ).textContent =
                currentPackage;

            document.getElementById(
                "summaryPrice"
            ).textContent =
                "RM" + currentPrice;

            shopModal.classList.remove(
                "active"
            );

            checkoutModal.classList.add(
                "active"
            );

        }
    );


    /* ==========================================
       CLOSE CHECKOUT
    ========================================== */

    document.getElementById(
        "checkoutClose"
    ).addEventListener(
        "click",
        closeAllModals
    );


    /* ==========================================
       PAYMENT BUTTON
    ========================================== */

    document.getElementById(
        "paymentButton"
    ).addEventListener(
        "click",
        () => {

            document.getElementById(
                "paymentProduct"
            ).textContent =
                currentProduct +
                " • " +
                currentPackage;

            document.getElementById(
                "paymentPrice"
            ).textContent =
                "RM" + currentPrice;


            /*
             * Pesan WhatsApp otomatis
             */

            const message =
                `Bang! Aku sudah bayar untuk beli ${currentProduct} ${currentPackage}. Total RM${currentPrice}. Saya akan kirim screenshot bukti pembayaran.`;

            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(message);


            document.getElementById(
                "whatsappPayment"
            ).href =
                whatsappURL;


            checkoutModal.classList.remove(
                "active"
            );

            paymentModal.classList.add(
                "active"
            );

        }
    );


    /* ==========================================
       CLOSE PAYMENT
    ========================================== */

    document.getElementById(
        "paymentClose"
    ).addEventListener(
        "click",
        closeAllModals
    );


    /* ==========================================
       CLICK OVERLAY TO CLOSE
    ========================================== */

    document.querySelectorAll(
        ".shop-modal-overlay"
    ).forEach(
        overlay => {

            overlay.addEventListener(
                "click",
                closeAllModals
            );

        }
    );


    /* ==========================================
       ESC KEY
    ========================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {
                closeAllModals();
            }

        }
    );


    /* ==========================================
       CLOSE FUNCTION
    ========================================== */

    function closeAllModals() {

        shopModal.classList.remove(
            "active"
        );

        checkoutModal.classList.remove(
            "active"
        );

        paymentModal.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }


    /* ==========================================
       CATEGORY FILTER
    ========================================== */

    const categoryButtons =
        document.querySelectorAll(
            ".category-tab"
        );

    const productCards =
        document.querySelectorAll(
            ".product-card"
        );


    categoryButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                categoryButtons.forEach(
                    btn =>
                        btn.classList.remove(
                            "active"
                        )
                );

                button.classList.add(
                    "active"
                );

                const category =
                    button.dataset.category;

                productCards.forEach(card => {

                    const cardCategory =
                        card.dataset.category;

                    if (
                        category === "all" ||
                        cardCategory === category
                    ) {

                        card.style.display =
                            "";

                        setTimeout(
                            () => {
                                card.classList.add(
                                    "show"
                                );
                            },
                            10
                        );

                    } else {

                        card.classList.remove(
                            "show"
                        );

                        card.style.display =
                            "none";

                    }

                });

            }
        );

    });


    /* ==========================================
       BUTTON RIPPLE
    ========================================== */

    document.querySelectorAll(
        "button"
    ).forEach(button => {

        button.addEventListener(
            "click",
            function(e) {

                const ripple =
                    document.createElement(
                        "span"
                    );

                ripple.className =
                    "button-ripple";

                const rect =
                    this.getBoundingClientRect();

                ripple.style.left =
                    (e.clientX - rect.left) +
                    "px";

                ripple.style.top =
                    (e.clientY - rect.top) +
                    "px";

                this.appendChild(
                    ripple
                );

                setTimeout(
                    () => {
                        ripple.remove();
                    },
                    600
                );

            }
        );

    });


    /* ==========================================
       SMOOTH SCROLL
    ========================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            function(e) {

                const target =
                    document.querySelector(
                        this.getAttribute(
                            "href"
                        )
                    );

                if (!target) return;

                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


});
</script>