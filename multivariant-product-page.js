class CheckboxHandler {
  constructor() {
    this.selectedCheckboxOptions = [];
    this.checkedInputElements = [];
    this.allProductVariants = [];
    this.allProductVariantsImages = [];
    this.matchedVariants = [];
    this.checkboxOptions = document.querySelectorAll('[data-option-type="Covers"] input[type="checkbox"]');
    this.checkboxOptions.forEach(option => option.addEventListener("click", () => this.handleCheckboxClick(option)));
    this.fetchAllVariantsData();
  }

  async fetchAllVariantsData() {
    try {
      const productName = this.getProductName();
      const productContents = await this.fetchProductData(productName);
      this.allProductVariants = productContents.product.variants;
      this.allProductVariantsImages = productContents.product.images;
    } catch (error) {
      console.error("Error fetching all variants data:", error);
    }
  }

  async fetchProductData(productName) {
    const response = await fetch(window.Shopify.routes.root + `products/${productName}.json`);
    return response.json();
  }

  getProductName() {
    const url = window.location.href;
    const parts = url.split("/");
    const productNameWithVariant = parts[parts.length - 1];
    return productNameWithVariant.split("?")[0];
  }

  handleCheckboxClick(checkedInput) {
    if (checkedInput.checked) {
      this.checkedInputElements.push(checkedInput);
    } else {
      this.removeUncheckedInput(checkedInput);
    }
    const updatedDataVariant = this.updateDataVariantTitle();
    this.updateMatchedVariants();
    if (checkedInput.checked) {
      checkedInput.setAttribute("data-id",updatedDataVariant);
    }
  }

  removeUncheckedInput(checkedInput) {
    const index = this.checkedInputElements.indexOf(checkedInput);
    if (index !== -1) {
      this.checkedInputElements.splice(index, 1);
      this.removePreviewBlock(checkedInput);
    }
  }

  removePreviewBlock(checkedInput) {
    const removedElement = checkedInput.nextElementSibling.querySelector('img').getAttribute('data-variant-title').split("/")[1];
    document.querySelectorAll('.preview-order-block').forEach(preview => {
      const previewProductTitle = preview.querySelector('.preview-product-title');
      if (previewProductTitle && previewProductTitle.textContent === removedElement) {
        preview.remove();
      }
    });
  }

  updateDataVariantTitle() {
    this.selectedCheckboxOptions = [];
    let returnedVariantTitle = " ";
    this.checkedInputElements.forEach(checkedInput => {
      returnedVariantTitle = this.extractVariantTitles(checkedInput);
    });
    return returnedVariantTitle;
  }

  extractVariantTitles(checkedInput) {
    const inlineBlockImageOptions = checkedInput.nextElementSibling.querySelectorAll(".options-image-wrapper");
    let variantTitle = " ";
    inlineBlockImageOptions.forEach(div => {
       variantTitle = div.querySelector("img").getAttribute("data-variant-title");
      this.selectedCheckboxOptions.push(variantTitle);
    });
    return variantTitle;
  }

  updateMatchedVariants() {
    document.querySelector("#previewBlocks-wrapper").innerHTML = "";
    this.matchedVariants = this.allProductVariants.filter(variant => this.selectedCheckboxOptions.includes(variant.title));
    this.updatePreviewLabel();
    this.showVariantPreview();
  }

  updatePreviewLabel() {
    const previewLabelWrapper = document.querySelector('.preview-order-label-wrapper');
    previewLabelWrapper.classList.toggle('preview-label-inactive', this.matchedVariants.length < 1);
  }

  showVariantPreview() {
    const processedTitles = new Set();

    this.matchedVariants.forEach(variant => {
      const title = variant.option2;
      if (!processedTitles.has(title)) {
        processedTitles.add(variant);
      }
    });
    processedTitles.forEach(variant => {
      this.renderVariantPreview(variant);
    });
  }

  renderVariantPreview(variant) {
    const foundImage = this.allProductVariantsImages.find(image => image.variant_ids.includes(variant.id));
    const imageSrc = foundImage ? foundImage.src : "";
    const previewSnippet = this.previewSnippet();
    this.updatePreviewContent(previewSnippet, variant, imageSrc);
    this.createPreviewBlock(previewSnippet);
  }

  updatePreviewContent(previewSnippet, variant, imageSrc) {
    previewSnippet.querySelector(".preview-product-title").textContent = variant.option2;

    const colorMap = {'Dark Grey': '#494A4A','Light Grey': '#CCCCCC','Jade White': '#DCEFDC','Coffee': '#6F4E37','Lake Blue': '#008c96','Orange': '#FFA500','Mustard Yellow': '#FFDB58','Cypress Green': '#567256','Metal Grey': '#BEC1BD','Yellow': '#FFFF00'};
    const style = colorMap[variant.option1] ? `background-color: ${colorMap[variant.option1]};` : 'background-color: #ffffff;';
    previewSnippet.setAttribute('data-variant-id', variant.id);
    previewSnippet.setAttribute('data-variant-quantity', 1);
    previewSnippet.querySelector('.preview-close').setAttribute('data-id',variant.title);

    const colorElement = previewSnippet.querySelector(".preview-product-color");
    if (colorElement) colorElement.setAttribute('style', style);

    const ColorName = previewSnippet.querySelector(".preview-product-color-name");
    if (ColorName) ColorName.textContent = variant.option1;

    const priceElement = previewSnippet.querySelector(".preview-product-price-wrapper");
    if (priceElement) priceElement.textContent = variant.price;

    const imageElement = previewSnippet.querySelector("#preview_order_product_image");
    if (imageElement) imageElement.setAttribute("src", imageSrc);
  }

  previewSnippet() {
    const previewOrderBlock = document.createElement("div");
    previewOrderBlock.innerHTML = `<div class="preview-order-block">
                  <button class="preview-close" data-id="">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.55246 6.00001L10.8856 1.66686C11.0382 1.5143 11.0382 1.26696 10.8856 1.11442C10.733 0.96188 10.4857 0.96186 10.3332 1.11442L6 5.44757L1.66686 1.11442C1.5143 0.96186 1.26696 0.96186 1.11442 1.11442C0.96188 1.26698 0.96186 1.51432 1.11442 1.66686L5.44756 6L1.11442 10.3332C0.96186 10.4857 0.96186 10.7331 1.11442 10.8856C1.19069 10.9619 1.29067 11 1.39065 11C1.49063 11 1.59059 10.9619 1.66688 10.8856L6 6.55245L10.3331 10.8856C10.4094 10.9619 10.5094 11 10.6094 11C10.7093 11 10.8093 10.9619 10.8856 10.8856C11.0382 10.733 11.0382 10.4857 10.8856 10.3332L6.55246 6.00001Z" fill="black" stroke="black"></path></svg>
                  </button>
                  <div class="preview-order-inner">
                    <div class="preview-order-content-wrapper">
                      <div class="preview-order-content">
                        <div class="preview-order-product">
                          <div class="preview-product-image-wrapper">
                            <img src="" width="80" height="65px" alt="preview-order-product-image" id="preview_order_product_image">
                          </div>
                          <div class="preview-product-info-wrapper">
                            <span class="preview-product-title">Seat Cover</span>
                            <div class="preview-product-color-wrapper">
                              <span class="preview-product-color-label">
                                Color:
                                <div class="preview-product-color"></div>
                                <span class="preview-product-color-name"></span>
                              </span>
                            </div>
                            <div class="preview-product-quantity-and-price-wrapper">
                              <span id="preview-product-quantity-count">1</span>
                              <span class="preview-product-multiply-sign">X</span>
                              <span class="preview-product-price-wrapper">$ 18.99</span>
                            </div>
                          </div>
                        </div>
                        <div class="preview-order-quantity-wrapper">
                          <div id="preview-order-quantity" class="quantity-box">
                            <div class="preview-order-minus">
                              <svg width="11" height="2" viewBox="0 0 11 2" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_249_697)"><path d="M10.1632 0.999994C10.1632 1.13813 10.0626 1.2706 9.88356 1.36828C9.70449 1.46595 9.46162 1.52083 9.20837 1.52083H1.56949C1.31624 1.52083 1.07337 1.46595 0.894297 1.36828C0.715226 1.2706 0.614624 1.13813 0.614624 0.999994C0.614624 0.86186 0.715226 0.729384 0.894297 0.631709C1.07337 0.534034 1.31624 0.47916 1.56949 0.47916H9.20837C9.46162 0.47916 9.70449 0.534034 9.88356 0.631709C10.0626 0.729384 10.1632 0.86186 10.1632 0.999994Z" fill="black"></path></g><defs><clipPath id="clip0_249_697"><rect width="11" height="2" rx="1" fill="white"></rect></clipPath></defs></svg>
                            </div>
                            <span class="preview-order-quantity"> 1 </span>
                            <div class="preview-order-plus">
                              <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_249_695)"><path d="M4.77782 0.929844V7.0702V0.929844ZM7.84799 4.00002H1.70764H7.84799Z" fill="black"></path><path d="M4.77782 0.929844V7.0702M7.84799 4.00002H1.70764" stroke="black" stroke-width="1.52778" stroke-linecap="round" stroke-linejoin="round"></path></g><defs><clipPath id="clip0_249_695"><rect width="9" height="8" rx="4" fill="white"></rect></clipPath></defs></svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`;
    return previewOrderBlock.firstChild;
  }

  createPreviewBlock(htmlContent) {
    const mainContainer = document.querySelector("#previewBlocks-wrapper");
    mainContainer.appendChild(htmlContent);
  }

  initializePreviewBlock() {
    const previewSnippet = this.previewSnippet();
    this.createPreviewBlock(previewSnippet);
  }
}











const checkboxHandler = new CheckboxHandler();
function countElements(array) {
    var counts = {};
    
    for (var i = 0; i < array.length; i++) {
      var element = array[i];
      
      // If the element is already a key in the counts object, increment its count
      if (counts[element]) {
        counts[element]++;
      } else {
        // Otherwise, initialize its count to 1
        counts[element] = 1;
      }
    }
    
    return counts;
  }
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('product-form__submit')) {
    event.preventDefault();

    const variants = [];
    const quantities = {};
    document.querySelectorAll('.preview-order-block').forEach(function(element) {
      variants.push(element.dataset.variantId);
      quantities[element.dataset.variantId] = parseInt(element.querySelector('.preview-order-quantity').textContent);
    });
    console.log(variants);
    console.log(quantities);

    var elementCounts = countElements(variants);

    var uniqueArray = variants.filter(function(value, index, self) {
      return self.indexOf(value) === index;
    });
    console.log(uniqueArray);
    console.log(elementCounts);

    var lineItems = uniqueArray.map(function(variantID) {
      return {
        id: variantID,
        quantity: quantities[variantID]
      };
    });
    console.log(lineItems);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/cart/add.js', false);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          console.log(response);
          window.location.href = "/cart";
        } else {
          console.log(xhr.statusText);
          // Handle error here
        }
      }
    };

    var data = JSON.stringify({ items: lineItems });
    xhr.send(data);
  }
});

function countElements(array) {
  var counts = {};
  array.forEach(function(element) {
    counts[element] = (counts[element] || 0) + 1;
  });
  return counts;
}

$(document).on('click','.preview-order-plus',function () {
  var qty=parseInt($(this).parents('.quantity-box').find('.preview-order-quantity').text());
  $(this).parents('.quantity-box').find('.preview-order-quantity').text(qty+1);
});
$(document).on('click','.preview-order-minus',function () {
  
  var qty=parseInt($(this).parents('.quantity-box').find('.preview-order-quantity').text());
  if(qty > 0){
  $(this).parents('.quantity-box').find('.preview-order-quantity').text(qty-1);
  }
});
$(document).on('click','.preview-close',function () {
  var option=$(this).parents('.preview-order-block').find('.preview-product-title').text();
  $(this).parents('.preview-order-block').remove();
  $('input[data-id="'+$(this).data("id")+'"]').trigger('click');
});
  

