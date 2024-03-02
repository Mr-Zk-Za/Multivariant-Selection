document.querySelectorAll(".product-form__input input[type='radio'][name='Color']").forEach(radio => {
  radio.addEventListener('change', (event) => {
    let targetedElementValue = event.target.value;
    document.querySelectorAll("[data-option-type='Covers'] img").forEach(image => {
      if (image.getAttribute('data-variant') == (`${targetedElementValue}`)) {
        image.parentElement.parentElement.parentElement.style.display = 'inline-block';
      } else {
        image.parentElement.parentElement.parentElement.style.display = 'none';
      }

    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".product-form__input input[name='Color']:checked").forEach(color => {
    document.querySelectorAll(".options-image-wrapper img").forEach(img => {
      if (color.value !== img.getAttribute("data-variant")) {
        img.parentElement.parentElement.parentElement.style.display = 'none';
      } else {
        img.parentElement.parentElement.parentElement.style.display = 'inline-block';
      }
    });
  });

});
/**/
/* Preview Product Quantity*/
const previewButtonCount = document.querySelector("#preview-order-quantity > span");
const actualQuantityPlusButton = document.querySelectorAll(".quantity .quantity__button[name=plus]")[1];
const actualQuantityMinusButton = document.querySelectorAll(".quantity .quantity__button[name=minus]")[1];
const previewButtonPlus = document.querySelector("#preview-order-quantity > div.preview-order-plus");
const previewButtonMinus = document.querySelector("#preview-order-quantity > div.preview-order-minus");

if (previewButtonPlus) {
  previewButtonPlus.addEventListener("click", (event) => {
    const actualInputValue = Number(document.querySelectorAll(".quantity .quantity__input")[0].value);
    let count = Number(previewButtonCount.textContent);
    if (actualInputValue != count) {
      previewButtonCount.textContent = actualInputValue;
      count = actualInputValue;
    }
    if (count >= 1) {
      count = count + 1;
      actualQuantityPlusButton.click();
      previewButtonCount.textContent = count;
    }
  });
}
if (previewButtonMinus) {
  previewButtonMinus.addEventListener("click", () => {
    const actualInputValue = Number(document.querySelectorAll(".quantity .quantity__input")[0].value);
    let count = Number(previewButtonCount.textContent);
    if (actualInputValue != count) {
      previewButtonCount.textContent = actualInputValue;
      count = actualInputValue;
    }
    if (count > 1) {
      count = count - 1;
      actualQuantityMinusButton.click();
      previewButtonCount.textContent = count;
    }
  });
}

document.querySelectorAll(".quantity .quantity__input")[0].addEventListener('change', () => {
  if (previewButtonCount) {
    previewButtonCount.textContent = document.querySelectorAll(".quantity .quantity__input")[0].value;
  }
})

// Measurement Modal Functionality
const measureHeightModalButton = document.querySelector(".measure-height-modal-button");
const measureHeightModalContent = document.querySelector("#measure-height-modal-content");
const measureCloseButton = document.querySelector("#measure-close");

const sizeGuideModalButton = document.querySelector(".size-guide-height-modal-button");
const sizeGuideModalContent = document.querySelector("#size-guide-modal-content");
const sizeGuideCloseButton = document.querySelector("#size-guide-close");
const body = document.querySelector("body");

function toggleMeasureHeightModal(display) {
  measureHeightModalContent.style.display = display;
  body.style.height = display === "block" ? "auto" : "unset";
  body.style.overflow = display === "block" ? "hidden" : "visible";
}

function toggleSizeGuideHeightModal(display) {
  sizeGuideModalContent.style.display = display;
  body.style.height = display === "block" ? "auto" : "unset";
  body.style.overflow = display === "block" ? "hidden" : "visible";
}

if (measureHeightModalButton) {
  measureHeightModalButton.addEventListener("click", () => {
    // debugger;
    let seatCoverMeasurementLength = measureHeightModalButton.getAttribute("data-size-seat-cover-l-size");
    let seatCoverMeasurementWidth = measureHeightModalButton.getAttribute("data-size-seat-cover-h-size");
    let seatCoverMeasurementHeight = measureHeightModalButton.getAttribute("data-size-seat-cover-w-size");
    let seatCoverMeasurementImage = measureHeightModalButton.getAttribute("data-size-seat-cover-image");

    const seatCoverMeasurement = document.getElementById("measureSeatCover");
    seatCoverMeasurement.querySelector(".length").textContent = seatCoverMeasurementLength;
    seatCoverMeasurement.querySelector(".width").textContent = seatCoverMeasurementWidth;
    seatCoverMeasurement.querySelector(".height").textContent = seatCoverMeasurementHeight;
    seatCoverMeasurement.querySelector("img").setAttribute("src", seatCoverMeasurementImage);

    let backCoverMeasurementLength = measureHeightModalButton.getAttribute("data-size-back-cover-l-size");
    let backCoverMeasurementWidth = measureHeightModalButton.getAttribute("data-size-back-cover-h-size");
    let backCoverMeasurementHeight = measureHeightModalButton.getAttribute("data-size-back-cover-w-size");
    let backCoverMeasurementImage = measureHeightModalButton.getAttribute("data-size-back-cover-image");

    const backCoverMeasurement = document.getElementById("measureBackCover");
    backCoverMeasurement.querySelector(".length").textContent = backCoverMeasurementLength;
    backCoverMeasurement.querySelector(".width").textContent = backCoverMeasurementWidth;
    backCoverMeasurement.querySelector(".height").textContent = backCoverMeasurementHeight;
    backCoverMeasurement.querySelector("img").setAttribute("src", backCoverMeasurementImage);

    let chaiseCoverMeasurementLength = measureHeightModalButton.getAttribute("data-size-chaise-cover-l-size");
    let chaiseCoverMeasurementWidth = measureHeightModalButton.getAttribute("data-size-chaise-cover-w-size");
    let chaiseCoverMeasurementHeight = measureHeightModalButton.getAttribute("data-size-chaise-cover-h-size");
    let chaiseCoverMeasurementImage = measureHeightModalButton.getAttribute("data-size-chaise-cover-image");

    const chaiseCoverMeasurement = document.getElementById("measureChaiseCover");
    chaiseCoverMeasurement.querySelector(".length").textContent = chaiseCoverMeasurementLength;
    chaiseCoverMeasurement.querySelector(".width").textContent = chaiseCoverMeasurementWidth;
    chaiseCoverMeasurement.querySelector(".height").textContent = chaiseCoverMeasurementHeight;
    chaiseCoverMeasurement.querySelector("img").setAttribute("src", chaiseCoverMeasurementImage);

    toggleMeasureHeightModal("block");
  });
}
if (sizeGuideModalButton) {
  sizeGuideModalButton.addEventListener("click", () => {
    toggleSizeGuideHeightModal("block");
  });
}

if (measureCloseButton) {
  measureCloseButton.addEventListener("click", () => {
    toggleMeasureHeightModal("none");
  });
}
if (sizeGuideCloseButton) {
  sizeGuideCloseButton.addEventListener("click", () => {
    toggleSizeGuideHeightModal("none");
  });

}

document.querySelector("#measure-height-modal-content").addEventListener("click", (event) => {
  document.querySelector("#measure-height-modal-content").style.display = "none";
  document.querySelector("body").style.height = "unset";
  document.querySelector("body").style.overflow = "visible";
})

document.querySelector("#size-guide-modal-content").addEventListener("click", (event) => {
  document.querySelector("#size-guide-modal-content").style.display = "none";
  document.querySelector("body").style.height = "unset";
  document.querySelector("body").style.overflow = "visible";
})


// Add on Metafiled Products Slider JS

$(document).ready(function () {
  $(".recommended-product-container").slick({
    infinite: false,
    autoplay: false,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    speed: 700,
    swipe: true,
    lazyLoad: 'ondemand',
    prevArrow: '<button class="slide-arrow prev-arrow"><svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.725126 7.54742L7.69138 0.909924C7.80761 0.799118 7.96204 0.737304 8.12263 0.737304C8.28321 0.737304 8.43764 0.799118 8.55387 0.909924L8.56138 0.917424C8.61792 0.97114 8.66294 1.0358 8.69371 1.10746C8.72448 1.17913 8.74034 1.25631 8.74034 1.3343C8.74034 1.41229 8.72448 1.48947 8.69371 1.56113C8.66294 1.6328 8.61792 1.69746 8.56138 1.75117L2.00138 8.00117L8.56138 14.2487C8.61792 14.3024 8.66294 14.367 8.69371 14.4387C8.72448 14.5104 8.74035 14.5876 8.74035 14.6655C8.74035 14.7435 8.72448 14.8207 8.69371 14.8924C8.66294 14.964 8.61792 15.0287 8.56138 15.0824L8.55388 15.0899C8.43764 15.2007 8.28321 15.2625 8.12263 15.2625C7.96204 15.2625 7.80761 15.2007 7.69138 15.0899L0.725126 8.45243C0.66386 8.39405 0.615086 8.32385 0.58176 8.24607C0.548435 8.16828 0.53125 8.08455 0.53125 7.99992C0.53125 7.9153 0.548435 7.83156 0.58176 7.75378C0.615086 7.676 0.66386 7.6058 0.725126 7.54742Z" fill="black"/></svg></button>',
    nextArrow: '<button class="slide-arrow next-arrow"><svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.27487 7.54742L1.30862 0.909924C1.19239 0.799118 1.03796 0.737304 0.877374 0.737304C0.716786 0.737304 0.56236 0.799118 0.446125 0.909924L0.438624 0.917424C0.382081 0.97114 0.337056 1.0358 0.306289 1.10746C0.275522 1.17913 0.259656 1.25631 0.259656 1.3343C0.259656 1.41229 0.275522 1.48947 0.306289 1.56113C0.337056 1.6328 0.382081 1.69746 0.438624 1.75117L6.99862 8.00117L0.438624 14.2487C0.38208 14.3024 0.337056 14.367 0.306288 14.4387C0.275522 14.5104 0.259655 14.5876 0.259655 14.6655C0.259655 14.7435 0.275522 14.8207 0.306288 14.8924C0.337056 14.964 0.38208 15.0287 0.438624 15.0824L0.446124 15.0899C0.56236 15.2007 0.716785 15.2625 0.877374 15.2625C1.03796 15.2625 1.19239 15.2007 1.30862 15.0899L8.27487 8.45242C8.33614 8.39405 8.38491 8.32385 8.41824 8.24607C8.45157 8.16828 8.46875 8.08455 8.46875 7.99992C8.46875 7.9153 8.45157 7.83156 8.41824 7.75378C8.38491 7.676 8.33614 7.6058 8.27487 7.54742Z" fill="black"/></svg></button>',
    responsive: [],
  });
});


// Custom Collapsible Accordions Js

$(document).ready(function () {
  $('.custom-collaislbe_row_item').on('click', function () {
    const accordionItem = $(this);
    const accordionContent = accordionItem.find('.c_collapsible_content');
    const svgIcon = accordionItem.find('svg');

    accordionContent.slideToggle();

    $('.custom-collaislbe_row_item .c_collapsible_content').not(accordionContent).slideUp();
    $('.custom-collaislbe_row_item').not(accordionItem).find('svg').removeClass('rotate-icon');

    svgIcon.toggleClass('rotate-icon');
  });

  $('.custom-collaislbe_row_item.active .c_collapsible_content').slideDown();
  $('.custom-collaislbe_row_item.active svg').addClass('rotate-icon');
});


// SHipping Date
document.addEventListener('DOMContentLoaded', function () {
  let setShippingDate = document.getElementById('ship-by');

  const today = new Date();

  const shippingDate = new Date(today);

  shippingDate.setDate(shippingDate.getDate() + 5);

  const options = {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  };

  const formattedToday = today.toLocaleDateString('en-US', options);

  const formattedShippingDate = shippingDate.toLocaleDateString('en-US', options);

  if (setShippingDate) {
    setShippingDate.textContent = `Ship By ${formattedShippingDate}`;
  }
});
