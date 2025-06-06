document.addEventListener('DOMContentLoaded', () => {
  // ========== ハンバーガーメニュー ==========
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.main-nav');
  let isNavOpen = false;

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      this.classList.toggle('opacity');
      if (!isNavOpen) {
        nav.classList.remove('fade-out');
        nav.classList.add('fade-in');
        nav.style.display = 'flex';
        isNavOpen = true;
      } else {
        nav.classList.remove('fade-in');
        nav.classList.add('fade-out');
        nav.addEventListener('animationend', function handler() {
          nav.style.display = 'none';
          nav.removeEventListener('animationend', handler);
        });
        isNavOpen = false;
      }
    });
  }

  // ========== HOME：画像遅延フェード ==========
  const mainImage = document.querySelector('.main-img img');
  if (mainImage) {
    mainImage.style.animationDelay = '0.6s';
  }

  // ========== 共通ライトボックス処理 ==========
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const workLightboxImage = document.getElementById('work-lightbox-image');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  function setupLightbox(images, customImage = null, customTitleId = null) {
    if (!images.length || !lightbox) return;
    const imgEl = customImage || lightboxImage;
    const titleEl = customTitleId
      ? document.getElementById(customTitleId)
      : document.getElementById('lightbox-title');

    if (!imgEl || !titleEl) return;

    let currentIndex = 0;

    function show(index) {
      const img = images[index];
      imgEl.src = img.src;
      titleEl.textContent = img.getAttribute('data-title') || '';
    }

    images.forEach((img, i) => {
      img.addEventListener('click', () => {
        currentIndex = i;
        const rect = img.getBoundingClientRect();
        show(i);
        lightbox.classList.remove('hidden');

        const clone = img.cloneNode();
        Object.assign(clone.style, {
          position: 'fixed',
          top: `${rect.top}px`,
          left: `${rect.left}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`,
          margin: '0',
          zIndex: '10001',
          objectFit: 'contain',
          transition: 'all 0.4s ease',
        });

        document.body.appendChild(clone);

        requestAnimationFrame(() => {
          const target = imgEl.getBoundingClientRect();
          clone.style.top = `${target.top}px`;
          clone.style.left = `${target.left}px`;
          clone.style.width = `${target.width}px`;
          clone.style.height = `${target.height}px`;
        });

        clone.addEventListener('transitionend', () => {
          clone.remove();
          imgEl.style.opacity = '1';
        });

        imgEl.style.opacity = '0';
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        lightbox.classList.add('hidden');
        imgEl.src = '';
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        show(currentIndex);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        show(currentIndex);
      });
    }

    // スワイプ対応
    let startX = 0;
    lightbox.addEventListener('touchstart', (e) => startX = e.changedTouches[0].screenX);
    lightbox.addEventListener('touchend', (e) => {
      const delta = e.changedTouches[0].screenX - startX;
      if (delta > 50) {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
      } else if (delta < -50) {
        currentIndex = (currentIndex + 1) % images.length;
      }
      show(currentIndex);
    });
  }

  // ========== DRAWING ==========
  const drawingImages = document.querySelectorAll('.drawing-gallery img');
  if (drawingImages.length > 0) {
    drawingImages.forEach((img, index) => {
      img.style.animationDelay = `${index * 0.3}s`;
    });
    setupLightbox(
      drawingImages,
      document.getElementById('drawing-lightbox-image'),
      'drawing-lightbox-title'
    );
  }

  // ========== FLASH ==========
  const flashImages = document.querySelectorAll('.flash-gallery img');
  if (flashImages.length > 0) {
    flashImages.forEach((img, index) => {
      img.style.animationDelay = `${index * 0.3}s`;
    });
    setupLightbox(
      flashImages,
      document.getElementById('flash-lightbox-image'),
      'flash-lightbox-title'
    );
  }

  // ========== PHOTOGRAPHY ==========
  const photoImages = document.querySelectorAll('.photography-gallery img');
  if (photoImages.length > 0) {
    photoImages.forEach((img, index) => {
      img.style.animationDelay = `${index * 0.6}s`;
    });
    setupLightbox(
      photoImages,
      document.getElementById('photography-lightbox-image'),
      'photography-lightbox-title'
    );
  }

  // ========== WORK ==========
  const workImages = document.querySelectorAll('.work-gallery img');
  const workTitle = document.querySelector('.name-work');

  if (workImages.length > 0 && workLightboxImage) {
    workImages.forEach((img, index) => {
      img.style.animationDelay = `${index * 0.4}s`;
    });

    if (workTitle) {
      workTitle.style.opacity = 0;
      workTitle.style.animation = 'workFadeIn 1s ease-out forwards';
      workTitle.style.animationDelay = '0.2s';
    }

    setupLightbox(workImages, workLightboxImage, 'work-lightbox-title');
  }
});
