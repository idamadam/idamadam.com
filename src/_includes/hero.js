const Phone = ({ src, alt }) => (
  `<div class="hero-phone"><img style="box-shadow: none; width: 100%; border-radius: 0.5em" src="${src}" alt="${alt}" /></div>`
);

const ThreeImageHero = (images) => {
  const threeImages = images.map((image) => (
    Phone({ src: image.image, alt: image.alt })
  )).join('');
  
  return `<div class="three-image-hero">${threeImages}</div>`;
}

function Hero(images) {
  if (images.length === 3) {
    return ThreeImageHero(images);
  }

  return (
    `<div class="hero">
      <img src=${images[0].image} alt=${String(images[0].alt)} class="hero-image"/>
    </div>`
  )
}

module.exports = Hero(images)