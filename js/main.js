// ========================
// ハンバーガーメニュー
// ========================
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.main-nav');
let isNavOpen = false;

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

// ========================
// HOMEページ: メイン画像の遅延表示
// ========================
document.addEventListener('DOMContentLoaded', () => {
  const mainImage = document.querySelector('.main-img img');
  if (mainImage) {
    mainImage.style.animationDelay = '0.6s';
  }
});

// ========================
// DRAWINGページ: 拡大モーション付きライトボックス（精密一致版）
// ========================
document.addEventListener('DOMContentLoaded', () => {
  const drawingImages = document.querySelectorAll('.drawing-gallery img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  let currentIndex = 0;

  drawingImages.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentIndex = index;
      const title = img.getAttribute('data-title') || '';
      const rect = img.getBoundingClientRect();

      // 事前にlightboxの画像を非表示でセット（srcセットだけ）
      lightboxImage.src = img.src;
      lightboxTitle.textContent = title;
      lightbox.classList.remove('hidden');

      // 一時的なクローン作成
      const clone = img.cloneNode();
      clone.style.position = 'fixed';
      clone.style.top = `${rect.top}px`;
      clone.style.left = `${rect.left}px`;
      clone.style.width = `${rect.width}px`;
      clone.style.height = `${rect.height}px`;
      clone.style.margin = '0';
      clone.style.zIndex = '10001';
      clone.style.objectFit = 'contain';
      clone.style.transition = 'all 0.4s ease';

      document.body.appendChild(clone);

      // lightboxImageの最終位置を取得して正確に一致させる
      requestAnimationFrame(() => {
        const targetRect = lightboxImage.getBoundingClientRect();
        clone.style.top = `${targetRect.top}px`;
        clone.style.left = `${targetRect.left}px`;
        clone.style.width = `${targetRect.width}px`;
        clone.style.height = `${targetRect.height}px`;
      });

      clone.addEventListener('transitionend', () => {
        clone.remove();
        lightboxImage.style.opacity = '1';
      });

      lightboxImage.style.opacity = '0'; // アニメ中は非表示にしておく
    });
  });

  closeBtn.addEventListener('click', () => {
    lightbox.classList.add('hidden');
    lightboxImage.src = '';
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + drawingImages.length) % drawingImages.length;
    const img = drawingImages[currentIndex];
    lightboxImage.src = img.src;
    lightboxTitle.textContent = img.getAttribute('data-title') || '';
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % drawingImages.length;
    const img = drawingImages[currentIndex];
    lightboxImage.src = img.src;
    lightboxTitle.textContent = img.getAttribute('data-title') || '';
  });
});

// ========================
// FLASHページ: 拡大モーション付きライトボックス（精密一致版）
// ========================
const flashImages = document.querySelectorAll('.flash-gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const closeBtn = document.getElementById('lightbox-close');
const prevBtn = document.getElementById('lightbox-prev');
const nextBtn = document.getElementById('lightbox-next');
let currentIndex = 0;

flashImages.forEach((img, index) => {
  img.style.animationDelay = `${index * 0.3}s`;
  img.addEventListener('click', () => {
    currentIndex = index;
    const title = img.getAttribute('data-title') || '';
    const rect = img.getBoundingClientRect();

    // Lightbox事前セット
    lightboxImage.src = img.src;
    lightboxTitle.textContent = title;
    lightbox.classList.remove('hidden');

    // 一時的なクローンでアニメーション
    const clone = img.cloneNode();
    clone.style.position = 'fixed';
    clone.style.top = `${rect.top}px`;
    clone.style.left = `${rect.left}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.margin = '0';
    clone.style.zIndex = '10001';
    clone.style.objectFit = 'contain';
    clone.style.transition = 'all 0.4s ease';

    document.body.appendChild(clone);

    // モーションの終了位置取得（lightbox内の画像位置）
    requestAnimationFrame(() => {
      const targetRect = lightboxImage.getBoundingClientRect();
      clone.style.top = `${targetRect.top}px`;
      clone.style.left = `${targetRect.left}px`;
      clone.style.width = `${targetRect.width}px`;
      clone.style.height = `${targetRect.height}px`;
    });

    clone.addEventListener('transitionend', () => {
      clone.remove();
      lightboxImage.style.opacity = '1';
    });

    lightboxImage.style.opacity = '0'; // ラグ防止用に非表示
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.classList.add('hidden');
  lightboxImage.src = '';
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + flashImages.length) % flashImages.length;
  const img = flashImages[currentIndex];
  lightboxImage.src = img.src;
  lightboxTitle.textContent = img.getAttribute('data-title') || '';
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % flashImages.length;
  const img = flashImages[currentIndex];
  lightboxImage.src = img.src;
  lightboxTitle.textContent = img.getAttribute('data-title') || '';
});

// ========================
// PHOTOGRAPHYページ: 拡大モーション付きライトボックス（精密一致版）
// ========================
document.addEventListener('DOMContentLoaded', () => {
  const photoImages = document.querySelectorAll('.photography-gallery img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  let currentIndex = 0;

  photoImages.forEach((img, index) => {
    img.style.animationDelay = `${index * 0.6}s`;
    img.addEventListener('click', () => {
      currentIndex = index;
      const title = img.getAttribute('data-title') || '';
      const rect = img.getBoundingClientRect();

      // Lightbox事前セット
      lightboxImage.src = img.src;
      lightboxTitle.textContent = title;
      lightbox.classList.remove('hidden');

      // クローン画像でアニメーション
      const clone = img.cloneNode();
      clone.style.position = 'fixed';
      clone.style.top = `${rect.top}px`;
      clone.style.left = `${rect.left}px`;
      clone.style.width = `${rect.width}px`;
      clone.style.height = `${rect.height}px`;
      clone.style.margin = '0';
      clone.style.zIndex = '10001';
      clone.style.objectFit = 'contain';
      clone.style.transition = 'all 0.4s ease';

      document.body.appendChild(clone);

      // ライトボックス画像の位置取得
      requestAnimationFrame(() => {
        const targetRect = lightboxImage.getBoundingClientRect();
        clone.style.top = `${targetRect.top}px`;
        clone.style.left = `${targetRect.left}px`;
        clone.style.width = `${targetRect.width}px`;
        clone.style.height = `${targetRect.height}px`;
      });

      clone.addEventListener('transitionend', () => {
        clone.remove();
        lightboxImage.style.opacity = '1';
      });

      lightboxImage.style.opacity = '0'; // ラグ防止用に非表示
    });
  });

  closeBtn.addEventListener('click', () => {
    lightbox.classList.add('hidden');
    lightboxImage.src = '';
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + photoImages.length) % photoImages.length;
    const img = photoImages[currentIndex];
    lightboxImage.src = img.src;
    lightboxTitle.textContent = img.getAttribute('data-title') || '';
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % photoImages.length;
    const img = photoImages[currentIndex];
    lightboxImage.src = img.src;
    lightboxTitle.textContent = img.getAttribute('data-title') || '';
  });
});



// ========================
// ABOUTページ: 遅延フェードイン
// ========================
document.addEventListener('DOMContentLoaded', () => {
  const aboutImage = document.querySelector('.img-about img');
  const aboutText = document.querySelector('.text-about');
  if (aboutImage) {
    aboutImage.style.animationDelay = '0.3s';
  }
  if (aboutText) {
    aboutText.style.animationDelay = '0.6s';
  }
});
