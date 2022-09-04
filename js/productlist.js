const urlParams = new URLSearchParams(window.location.search);
const brandname = urlParams.get("brandname");
console.log(brandname);

const url = `https://kea-alt-del.dk/t7/api/products?limit=100&brandname=${brandname}`;

fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    handleProductList(data);
  });
function handleProductList(data) {
  //   console.log(data);
  data.forEach(showProduct);
}

function showProduct(product) {
  console.log(product);
  // grab the template
  const template = document.querySelector("#smallProductTemplate").content;
  //clone it
  const copy = template.cloneNode(true);

  //to change content
  copy.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/1000/${product.id}.webp`;
  copy.querySelector(".subtle").textContent = `${product.articletype} ${product.brandname}`;
  copy.querySelector("h3").textContent = product.productdisplayname;
  copy.querySelector(".price").textContent = `DKK ${product.price}`;

  copy.querySelector("a").href = `product.html?id=${product.id}`;

  if (product.soldout) {
    copy.querySelector("article").classList.add("soldOut");
  }
  if (product.discount) {
    copy.querySelector("article").classList.add("onSale");
    copy.querySelector(".price").textContent = `Previous DKK ${product.price}`;
  }
  copy.querySelector(".discounted p").textContent = `New DKK ${Math.floor(
    product.price - (product.price * product.discount) / 100
  )}`;
  copy.querySelector(".discounted p:last-child").textContent = `-${product.discount}%`;

  //grab parent
  const parent = document.querySelector("main");
  //append
  parent.appendChild(copy);
}

/* <template id="smallProductTemplate">
        <article class="smallProduct">
          <img
            src="https://kea-alt-del.dk/t7/images/webp/640/1163.webp"
            alt="Sahara Team India Fanwear Round Neck Jersey"
          />
          <h3>Sahara Team India Fanwear Round Neck Jersey</h3>
          <p class="subtle">Tshirts | Nike</p>
          <p class="price"><span>Prev.</span> DKK 1595,-</p>
          <div class="discounted">
            <p>Now DKK 1560,-</p>
            <p>-34%</p>
          </div>
          <a href="product.html">Read More</a>
        </article>
      </template> */
