// manaolapule メインJavaScript

// DOM読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function() {
  
  // AOSアニメーション初期化
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }

  // モバイルメニュー制御
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
  
  if (mobileMenuClose && mobileMenu) {
    mobileMenuClose.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  
  // モバイルメニューのリンククリックで閉じる
  const mobileLinks = document.querySelectorAll('#mobile-menu a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // スムーススクロール
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ヘッダーのスクロール制御
  const header = document.querySelector('header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // スクロール時の背景追加
    if (currentScroll > 50) {
      header?.classList.add('bg-white', 'shadow-md');
    } else {
      header?.classList.remove('bg-white', 'shadow-md');
    }
    
    lastScroll = currentScroll;
  });

  // FAQアコーディオン
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const answer = this.nextElementSibling;
      const icon = this.querySelector('.faq-icon');
      
      // 他のFAQを閉じる
      faqQuestions.forEach(otherQuestion => {
        if (otherQuestion !== this) {
          const otherAnswer = otherQuestion.nextElementSibling;
          const otherIcon = otherQuestion.querySelector('.faq-icon');
          if (otherAnswer) otherAnswer.classList.remove('active');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      });
      
      // 現在のFAQをトグル
      if (answer) {
        answer.classList.toggle('active');
        if (icon) {
          icon.style.transform = answer.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      }
    });
  });

  // フォームバリデーション
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // 基本的なバリデーション
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('border-red-500');
          
          // エラーメッセージ表示
          let errorMsg = field.nextElementSibling;
          if (!errorMsg || !errorMsg.classList.contains('error-msg')) {
            errorMsg = document.createElement('span');
            errorMsg.classList.add('error-msg', 'text-red-500', 'text-sm', 'mt-1', 'block');
            errorMsg.textContent = 'この項目は必須です';
            field.parentNode.insertBefore(errorMsg, field.nextSibling);
          }
        } else {
          field.classList.remove('border-red-500');
          const errorMsg = field.nextElementSibling;
          if (errorMsg && errorMsg.classList.contains('error-msg')) {
            errorMsg.remove();
          }
        }
      });
      
      // メールアドレスのバリデーション
      const emailFields = form.querySelectorAll('input[type="email"]');
      emailFields.forEach(field => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (field.value && !emailRegex.test(field.value)) {
          isValid = false;
          field.classList.add('border-red-500');
          
          let errorMsg = field.nextElementSibling;
          if (!errorMsg || !errorMsg.classList.contains('error-msg')) {
            errorMsg = document.createElement('span');
            errorMsg.classList.add('error-msg', 'text-red-500', 'text-sm', 'mt-1', 'block');
            errorMsg.textContent = '有効なメールアドレスを入力してください';
            field.parentNode.insertBefore(errorMsg, field.nextSibling);
          }
        }
      });
      
      if (isValid) {
        // フォーム送信成功メッセージ
        const successMsg = document.createElement('div');
        successMsg.classList.add('fixed', 'top-4', 'right-4', 'bg-green-500', 'text-white', 'px-6', 'py-3', 'rounded-lg', 'shadow-lg', 'z-50');
        successMsg.textContent = 'お問い合わせありがとうございます。後日ご連絡させていただきます。';
        document.body.appendChild(successMsg);
        
        // フォームリセット
        form.reset();
        
        // 3秒後にメッセージを削除
        setTimeout(() => {
          successMsg.remove();
        }, 3000);
      }
    });
  });

  // セミナーカードのホバー効果
  const seminarCards = document.querySelectorAll('.seminar-card');
  seminarCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // カウントアップアニメーション
  const countElements = document.querySelectorAll('.count-up');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const target = parseInt(element.getAttribute('data-target'));
        let count = 0;
        const increment = target / 100;
        
        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            element.textContent = target;
            clearInterval(timer);
          } else {
            element.textContent = Math.floor(count);
          }
        }, 20);
        
        countObserver.unobserve(element);
      }
    });
  });
  
  countElements.forEach(element => {
    countObserver.observe(element);
  });

  // 画像の遅延読み込み
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => {
    imageObserver.observe(img);
  });

  // タブ切り替え機能
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');
      
      // すべてのタブボタンとコンテンツを非アクティブに
      tabButtons.forEach(btn => btn.classList.remove('active', 'border-b-2', 'border-blue-600'));
      tabContents.forEach(content => content.classList.add('hidden'));
      
      // クリックされたタブをアクティブに
      button.classList.add('active', 'border-b-2', 'border-blue-600');
      const targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.classList.remove('hidden');
      }
    });
  });

  // セミナー日程カレンダー
  const calendarDates = document.querySelectorAll('.calendar-date');
  calendarDates.forEach(date => {
    date.addEventListener('click', function() {
      // 他の日付の選択を解除
      calendarDates.forEach(d => d.classList.remove('bg-blue-600', 'text-white'));
      
      // クリックされた日付を選択
      this.classList.add('bg-blue-600', 'text-white');
      
      // 選択された日付を表示
      const selectedDate = this.getAttribute('data-date');
      const dateDisplay = document.getElementById('selected-date');
      if (dateDisplay) {
        dateDisplay.textContent = selectedDate;
      }
    });
  });

  // パララックス効果
  const parallaxElements = document.querySelectorAll('.parallax');
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-speed') || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });

  // コピーライトの年を自動更新
  const copyrightYear = document.getElementById('copyright-year');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }

  // フォーム入力時のリアルタイムバリデーション
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (this.hasAttribute('required') && !this.value.trim()) {
        this.classList.add('border-red-500');
      } else {
        this.classList.remove('border-red-500');
      }
    });
    
    input.addEventListener('input', function() {
      if (this.value.trim()) {
        this.classList.remove('border-red-500');
        const errorMsg = this.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('error-msg')) {
          errorMsg.remove();
        }
      }
    });
  });

  // ページトップへ戻るボタン
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTop.classList.remove('hidden');
      } else {
        backToTop.classList.add('hidden');
      }
    });
    
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 初期化完了ログ
  console.log('manaolapule website initialized successfully');
});