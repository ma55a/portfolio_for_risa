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
// DRAWINGページ: 拡大モーション付きライトボックス（スワイプ対応）
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

      // lightboxを表示する準備
      lightboxImage.src = img.src;
      lightboxTitle.textContent = title;
      lightbox.classList.remove('hidden');

      // アニメ用クローン画像を作成
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

      // アニメーションで目的位置まで移動
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

      lightboxImage.style.opacity = '0';
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

  // ==== スワイプ操作の追加 ====
  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    if (swipeDistance > 50) {
      // 右スワイプ → 前の画像
      currentIndex = (currentIndex - 1 + drawingImages.length) % drawingImages.length;
    } else if (swipeDistance < -50) {
      // 左スワイプ → 次の画像
      currentIndex = (currentIndex + 1) % drawingImages.length;
    } else {
      return; // 無効なスワイプ
    }
    const img = drawingImages[currentIndex];
    lightboxImage.src = img.src;
    lightboxTitle.textContent = img.getAttribute('data-title') || '';
  }
});


// ========================
// FLASHページ: 拡大モーション付きライトボックス（精密一致版 + スワイプ機能付き）
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

// ==== スワイプ操作の追加（FLASH用） ====
let flashTouchStartX = 0;
let flashTouchEndX = 0;

lightbox.addEventListener('touchstart', (e) => {
  flashTouchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener('touchend', (e) => {
  flashTouchEndX = e.changedTouches[0].screenX;
  handleFlashSwipe();
});

function handleFlashSwipe() {
  const swipeDistance = flashTouchEndX - flashTouchStartX;
  if (swipeDistance > 50) {
    // 右スワイプ → 前の画像
    currentIndex = (currentIndex - 1 + flashImages.length) % flashImages.length;
  } else if (swipeDistance < -50) {
    // 左スワイプ → 次の画像
    currentIndex = (currentIndex + 1) % flashImages.length;
  } else {
    return; // スワイプ距離が小さすぎる場合は無視
  }
  const img = flashImages[currentIndex];
  lightboxImage.src = img.src;
  lightboxTitle.textContent = img.getAttribute('data-title') || '';
}

// ========================
// PHOTOGRAPHYページ: 拡大モーション付きライトボックス（精密一致版 + スワイプ機能付き）
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

  // ==== スワイプ操作の追加（PHOTOGRAPHY用） ====
  let photoTouchStartX = 0;
  let photoTouchEndX = 0;

  lightbox.addEventListener('touchstart', (e) => {
    photoTouchStartX = e.changedTouches[0].screenX;
  });

  lightbox.addEventListener('touchend', (e) => {
    photoTouchEndX = e.changedTouches[0].screenX;
    handlePhotoSwipe();
  });

  function handlePhotoSwipe() {
    const swipeDistance = photoTouchEndX - photoTouchStartX;
    if (swipeDistance > 50) {
      // 右スワイプ → 前の画像
      currentIndex = (currentIndex - 1 + photoImages.length) % photoImages.length;
    } else if (swipeDistance < -50) {
      // 左スワイプ → 次の画像
      currentIndex = (currentIndex + 1) % photoImages.length;
    } else {
      return; // スワイプ距離が小さすぎる場合は無視
    }
    const img = photoImages[currentIndex];
    lightboxImage.src = img.src;
    lightboxTitle.textContent = img.getAttribute('data-title') || '';
  }
});

// ========================
// WORKページ: ライトボックス（アニメーション付き + スワイプ）
// ========================
document.addEventListener('DOMContentLoaded', () => {
  const workImages = document.querySelectorAll('.work-gallery img');
  const workTitle = document.querySelector('.name-work');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  let currentIndex = 0;

  // フェードインのアニメーションディレイを順番に設定
  workImages.forEach((img, index) => {
    img.style.animationDelay = `${index * 0.4}s`;
  });

  // タイトルにもフェードイン遅延をかける（必要に応じて）
  if (workTitle) {
    workTitle.style.opacity = 0;
    workTitle.style.animation = 'workFadeIn 1s ease-out forwards';
    workTitle.style.animationDelay = '0.2s';
  }

  // ライトボックス画像クリック時
  workImages.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentIndex = index;
      const title = img.getAttribute('data-title') || '';
      const rect = img.getBoundingClientRect();

      lightboxImage.src = img.src;
      lightboxTitle.textContent = title;
      lightbox.classList.remove('hidden');

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

      lightboxImage.style.opacity = '0';
    });
  });

  // ライトボックス閉じる
  closeBtn.addEventListener('click', () => {
    lightbox.classList.add('hidden');
    lightboxImage.src = '';
  });

  // 前の画像
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + workImages.length) % workImages.length;
    const img = workImages[currentIndex];
    lightboxImage.src = img.src;
    lightboxTitle.textContent = img.getAttribute('data-title') || '';
  });

  // 次の画像
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % workImages.length;
    const img = workImages[currentIndex];
    lightboxImage.src = img.src;
    lightboxTitle.textContent = img.getAttribute('data-title') || '';
  });

  // スワイプ対応
  let startX = 0;
  let endX = 0;

  lightbox.addEventListener('touchstart', (e) => {
    startX = e.changedTouches[0].screenX;
  });

  lightbox.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].screenX;
    const delta = endX - startX;
    if (delta > 50) {
      currentIndex = (currentIndex - 1 + workImages.length) % workImages.length;
    } else if (delta < -50) {
      currentIndex = (currentIndex + 1) % workImages.length;
    } else {
      return;
    }
    const img = workImages[currentIndex];
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
