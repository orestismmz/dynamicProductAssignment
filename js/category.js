//fetch the content
fetch("https://kea-alt-del.dk/t7/api/brands")
  .then((res) => res.json())
  .then(goThroughEach);

//foreach
function goThroughEach(data) {
  //   console.log(data);
  data.forEach(showBrand);
}

//that function
function showBrand(oneBrand) {
  //1.find the first letter
  const firstLetter = oneBrand.brandname.charAt(0).toLowerCase();
  console.log(
    `I'm ${oneBrand.brandname} and my first letter is ${firstLetter} and my selector would be #letter_${firstLetter}`
  );

  //2.do the usual stuff

  //grab the template
  const template = document.querySelector("template").content;

  //clone it
  const myCopy = template.cloneNode(true);

  //change some content
  myCopy.querySelector("a").textContent = oneBrand.brandname;
  myCopy.querySelector("a").href = `productlist.html?brandname=${oneBrand.brandname}`;

  //3.find the correct parent

  //   //find the parent
  const parent = document.querySelector(`#letter_${firstLetter}`);
  // and since your html doesn't have sections for all the letters in the alphabet
  if (parent) {
    //append it
    parent.appendChild(myCopy);
  }
}
