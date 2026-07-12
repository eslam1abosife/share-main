<template>
  <div class="landing-page">
    <!-- شاشة التحميل -->
    <div v-if="isLoading" class="loading-screen">
      <div class="loader-ring"></div>
      <p class="loading-text">جاري التحميل...</p>
    </div>

    <!-- المحتوى الرئيسي -->
    <div v-else class="main-container">
      <!-- قسم البطل -->
      <section class="hero-section">
        <h1 class="hero-title">
          <span class="gradient-text">استكشف وشاهد الآن</span>
          – استمتع بمحتواك المشترك
        </h1>
        <p class="hero-sub">تفاعل مع الآخرين وشارك إبداعاتك في مجتمع تمكين</p>
      </section>

      <!-- بطاقة المحتوى -->
      <div class="card-container">
        <!-- رأس البطاقة -->
        <div class="card-header">
          <div class="user-info">
            <img 
              class="user-avatar" 
              :src="userAvatar" 
              alt="صورة المستخدم"
            >
            <div class="user-meta">
              <h2>{{ projectTitle }}</h2>
              <span>
                <span class="highlight">{{ contentType }}</span>
                شاركه
                <span class="highlight">{{ ownerName }}</span>
              </span>
            </div>
          </div>
          <button 
            class="share-btn" 
            @click="handleShare"
            aria-label="مشاركة"
          >
            <i class="fas fa-share-alt"></i>
          </button>
        </div>

        <!-- حاوية الوسائط -->
        <div 
          class="media-container" 
          :class="{ 'fullscreen-mode': isFullscreen }"
          ref="mediaWrapper"
        >
          <!-- الفيديو -->
          <video 
            ref="videoPlayer"
            class="main-video"
            :poster="videoPoster"
            controls
            playsinline
            @loadedmetadata="onVideoLoaded"
          >
            <source :src="videoSrc" type="video/mp4">
            <track 
              kind="subtitles" 
              :src="subtitleSrc" 
              srclang="ar" 
              label="العربية" 
              default
            >
            متصفحك لا يدعم تشغيل الفيديو.
          </video>

          <!-- شخصية تمكين -->
          <div class="character-overlay" v-if="showCharacter">
            <img 
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'%3E%3Crect fill='%23068177' width='200' height='300' rx='20'/%3E%3Ctext x='100' y='160' font-size='80' text-anchor='middle' fill='%23fff'%3E🧑‍🦰%3C/text%3E%3Ctext x='100' y='220' font-size='24' text-anchor='middle' fill='%230ab5a8' font-weight='bold'%3Eتمكين%3C/text%3E%3C/svg%3E" 
              alt="شخصية تمكين"
              class="character-image"
            >
          </div>

          <!-- أزرار التحكم -->
          <div class="media-controls">
            <button 
              class="control-btn fullscreen-btn" 
              @click="toggleFullscreen"
              aria-label="ملء الشاشة"
            >
              <i :class="isFullscreen ? 'fas fa-compress' : 'fas fa-expand'"></i>
              <span>{{ isFullscreen ? 'خروج' : 'ملء الشاشة' }}</span>
            </button>

            <button 
              class="control-btn speed-btn" 
              @click="changePlaybackSpeed"
              aria-label="تغيير السرعة"
            >
              <i class="fas fa-gauge-high"></i>
              <span>{{ playbackSpeed }}×</span>
            </button>
          </div>
        </div>
      </div>

      <!-- قسم تمكين -->
      <div class="tamkin-section">
        <div class="tamkin-icon">
          <i class="fas fa-hands"></i>
        </div>
        <p class="tamkin-text">
          تواصل بسهولة — حمل تطبيق <strong>تمكين</strong> الآن واستكشف عالم لغة الإشارة!
        </p>
      </div>

      <!-- روابط التطبيقات -->
      <div class="app-links">
        <a 
          v-for="app in appLinks" 
          :key="app.name"
          :href="app.url" 
          target="_blank" 
          class="app-btn"
          :class="app.class"
        >
          <i :class="app.icon"></i>
          <span class="btn-text">
            <small>{{ app.subtext }}</small>
            <strong>{{ app.name }}</strong>
          </span>
        </a>
      </div>

      <!-- التذييل -->
      <footer class="footer-note">
        <p>© 2026 تمكين — منصة المحتوى التفاعلي</p>
        <div class="social-links">
          <a href="#" class="social-link"><i class="fab fa-facebook"></i></a>
          <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
          <a href="#" class="social-link"><i class="fab fa-youtube"></i></a>
          <a href="#" class="social-link"><i class="fab fa-tiktok"></i></a>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue';

export default {
  name: 'LandingPage',
  
  setup() {
    // ===================== الحالة =====================
    const isLoading = ref(true);
    const isFullscreen = ref(false);
    const showCharacter = ref(true);
    const playbackSpeed = ref(1);
    
    const videoPlayer = ref(null);
    const mediaWrapper = ref(null);
    
    // بيانات المشروع
    const projectTitle = ref('مشروع تمكين التفاعلي');
    const contentType = ref('فيديو');
    const ownerName = ref('أحمد');
    const userAvatar = ref('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23068177" width="100" height="100"/%3E%3Ctext x="50" y="60" font-size="40" text-anchor="middle" fill="%23fff" font-family="Cairo"%3E👤%3C/text%3E%3C/svg%3E');
    
    // روابط التطبيقات
    const appLinks = ref([
      {
        name: 'Google Play',
        subtext: 'GET IT ON',
        icon: 'fab fa-google-play',
        url: '#',
        class: 'google-play'
      },
      {
        name: 'App Store',
        subtext: 'Download on the',
        icon: 'fab fa-apple',
        url: '#',
        class: 'app-store'
      }
    ]);

    // ===================== دوال =====================
    
    // تحميل البيانات (محاكاة API)
    const loadProjectData = async () => {
      try {
        // محاكاة طلب API
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // يمكن جلب البيانات من API هنا
        // const response = await fetch('https://api.tamkin.app/v1/api/mobile/shareproject/123');
        // const data = await response.json();
        // projectTitle.value = data.title;
        // ownerName.value = data.owner;
        // etc.
        
        isLoading.value = false;
      } catch (error) {
        console.error('خطأ في تحميل البيانات:', error);
        isLoading.value = false;
      }
    };

    // الترجمة
    const subtitleSrc = ref('');
    const generateSubtitles = () => {
      const vtt = `WEBVTT

00:00:00.000 --> 00:00:05.000
مرحباً بك في تمكين

00:00:05.000 --> 00:00:10.000
منصة المحتوى التفاعلي

00:00:10.000 --> 00:00:15.000
استمتع بالمشاهدة

00:00:15.000 --> 00:00:20.000
شارك إبداعاتك مع الآخرين`;
      
      const blob = new Blob([vtt], { type: 'text/vtt' });
      subtitleSrc.value = URL.createObjectURL(blob);
    };

    // مصدر الفيديو
    const videoSrc = ref('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
    const videoPoster = ref('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720"%3E%3Crect fill="%231a1a1a" width="1280" height="720"/%3E%3Ctext x="640" y="360" font-size="48" text-anchor="middle" fill="%23445566" font-family="Cairo"%3E🎬 فيديو تفاعلي%3C/text%3E%3C/svg%3E');

    // التحكم في ملء الشاشة
    const toggleFullscreen = () => {
      isFullscreen.value = !isFullscreen.value;
      
      nextTick(() => {
        if (mediaWrapper.value) {
          if (isFullscreen.value) {
            mediaWrapper.value.style.position = 'fixed';
            mediaWrapper.value.style.top = '0';
            mediaWrapper.value.style.left = '0';
            mediaWrapper.value.style.width = '100vw';
            mediaWrapper.value.style.height = '100vh';
            mediaWrapper.value.style.zIndex = '9999';
            mediaWrapper.value.style.borderRadius = '0';
            mediaWrapper.value.style.background = '#000';
            document.body.style.overflow = 'hidden';
            
            // تشغيل الفيديو تلقائياً
            if (videoPlayer.value) {
              videoPlayer.value.play().catch(() => {});
            }
          } else {
            mediaWrapper.value.style.position = 'relative';
            mediaWrapper.value.style.top = 'auto';
            mediaWrapper.value.style.left = 'auto';
            mediaWrapper.value.style.width = '100%';
            mediaWrapper.value.style.height = 'auto';
            mediaWrapper.value.style.zIndex = 'auto';
            mediaWrapper.value.style.borderRadius = '16px';
            mediaWrapper.value.style.background = '#0d0d0d';
            document.body.style.overflow = '';
          }
        }
      });
    };

    // تغيير سرعة التشغيل
    const changePlaybackSpeed = () => {
      const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
      const currentIndex = speeds.indexOf(playbackSpeed.value);
      const nextIndex = (currentIndex + 1) % speeds.length;
      playbackSpeed.value = speeds[nextIndex];
      
      if (videoPlayer.value) {
        videoPlayer.value.playbackRate = playbackSpeed.value;
      }
    };

    // مشاركة
    const handleShare = () => {
      if (navigator.share) {
        navigator.share({
          title: 'تمكين - محتوى تفاعلي',
          text: 'شاهد هذا المشروع على تمكين!',
          url: window.location.href,
        }).catch(() => {});
      } else {
        // نسخ الرابط
        navigator.clipboard?.writeText(window.location.href)
          .then(() => alert('تم نسخ الرابط!'))
          .catch(() => alert('انسخ الرابط: ' + window.location.href));
      }
    };

    // عند تحميل الفيديو
    const onVideoLoaded = () => {
      if (videoPlayer.value) {
        videoPlayer.value.playbackRate = playbackSpeed.value;
      }
    };

    // ===================== دورة الحياة =====================
    
    onMounted(async () => {
      await loadProjectData();
      generateSubtitles();
      
      // الاستماع لمفتاح ESC للخروج من ملء الشاشة
      const handleEsc = (e) => {
        if (e.key === 'Escape' && isFullscreen.value) {
          toggleFullscreen();
        }
      };
      document.addEventListener('keydown', handleEsc);
      
      // تنظيف عند إزالة المكون
      onBeforeUnmount(() => {
        document.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = '';
      });
    });

    // ===================== القيم المحسوبة =====================
    
    const videoControls = computed(() => ({
      isFullscreen: isFullscreen.value,
      playbackSpeed: playbackSpeed.value,
    }));

    return {
      // الحالة
      isLoading,
      isFullscreen,
      showCharacter,
      playbackSpeed,
      videoPlayer,
      mediaWrapper,
      projectTitle,
      contentType,
      ownerName,
      userAvatar,
      appLinks,
      subtitleSrc,
      videoSrc,
      videoPoster,
      
      // الدوال
      toggleFullscreen,
      changePlaybackSpeed,
      handleShare,
      onVideoLoaded,
      
      // القيم المحسوبة
      videoControls,
    };
  }
};
</script>

<style scoped>
/* ============================================================
   Reset & Global Styles
   ============================================================ */
.landing-page {
  font-family: 'Cairo', sans-serif;
  background: #0a0a0a;
  color: #ffffff;
  min-height: 100vh;
  overflow-x: hidden;
}

/* ============================================================
   Loading Screen
   ============================================================ */
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #0a0a0a;
  z-index: 9999;
}

.loader-ring {
  width: 80px;
  height: 80px;
  border: 6px solid rgba(6, 129, 119, 0.15);
  border-top-color: #068177;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  margin-top: 20px;
  color: #8899aa;
  font-size: 1.1rem;
  font-weight: 300;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ============================================================
   Main Container
   ============================================================ */
.main-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 30px 24px 60px;
  animation: fadeUp 0.8s ease forwards;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ============================================================
   Hero Section
   ============================================================ */
.hero-section {
  margin-bottom: 40px;
}

.hero-title {
  font-size: 3rem;
  font-weight: 900;
  line-height: 1.2;
}

.gradient-text {
  background: linear-gradient(135deg, #068177, #0ab5a8, #068177);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.hero-sub {
  font-size: 1.1rem;
  color: #8899aa;
  margin-top: 12px;
  font-weight: 300;
}

/* ============================================================
   Card Container
   ============================================================ */
.card-container {
  background: linear-gradient(145deg, #141414, #1a1a1a);
  border-radius: 24px;
  padding: 24px 28px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
  margin-bottom: 40px;
  transition: transform 0.3s ease;
}

.card-container:hover {
  transform: translateY(-2px);
}

/* ============================================================
   Card Header
   ============================================================ */
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 14px;
}

.user-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(6, 129, 119, 0.4);
  flex-shrink: 0;
}

.user-meta h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
}

.user-meta span {
  font-size: 0.9rem;
  color: #8899aa;
}

.highlight {
  color: #0ab5a8;
  font-weight: 600;
}

.share-btn {
  background: rgba(6, 129, 119, 0.15);
  border: 1px solid rgba(6, 129, 119, 0.25);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #0ab5a8;
  font-size: 1.3rem;
}

.share-btn:hover {
  background: rgba(6, 129, 119, 0.3);
  transform: scale(1.05);
  border-color: #068177;
}

/* ============================================================
   Media Container
   ============================================================ */
.media-container {
  position: relative;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: #0d0d0d;
  aspect-ratio: 16 / 9;
  min-height: 400px;
  transition: all 0.3s ease;
}

.media-container.fullscreen-mode {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 9999 !important;
  border-radius: 0 !important;
  background: #000 !important;
}

.main-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  background: #0d0d0d;
}

/* ============================================================
   Character Overlay
   ============================================================ */
.character-overlay {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 28%;
  max-width: 220px;
  z-index: 10;
  pointer-events: none;
  transition: all 0.3s ease;
}

.character-image {
  width: 100%;
  height: auto;
  display: block;
  filter: drop-shadow(0 8px 30px rgba(0, 0, 0, 0.6));
}

/* ============================================================
   Media Controls
   ============================================================ */
.media-controls {
  position: absolute;
  bottom: 16px;
  left: 16px;
  display: flex;
  gap: 10px;
  z-index: 20;
}

.control-btn {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 10px 14px;
  color: #fff;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Cairo', sans-serif;
}

.control-btn:hover {
  background: rgba(6, 129, 119, 0.7);
  transform: scale(1.04);
}

.control-btn i {
  font-size: 1.1rem;
}

.speed-btn {
  background: rgba(0, 0, 0, 0.5);
}

/* ============================================================
   Tamkin Section
   ============================================================ */
.tamkin-section {
  display: flex;
  align-items: center;
  gap: 18px;
  background: rgba(6, 129, 119, 0.06);
  border-radius: 16px;
  padding: 18px 24px;
  border: 1px solid rgba(6, 129, 119, 0.1);
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.tamkin-icon {
  font-size: 2.8rem;
  color: #0ab5a8;
  flex-shrink: 0;
}

.tamkin-text {
  font-size: 1.15rem;
  font-weight: 300;
  color: #ccddee;
}

.tamkin-text strong {
  color: #0ab5a8;
  font-weight: 700;
}

/* ============================================================
   App Links
   ============================================================ */
.app-links {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.app-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 10px 22px 10px 18px;
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;
}

.app-btn:hover {
  background: rgba(6, 129, 119, 0.15);
  border-color: #068177;
  transform: scale(1.03);
}

.app-btn i {
  font-size: 1.8rem;
  color: #0ab5a8;
}

.btn-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.btn-text small {
  font-size: 0.65rem;
  color: #8899aa;
  font-weight: 300;
}

.btn-text strong {
  font-size: 1rem;
  font-weight: 700;
}

/* ============================================================
   Footer
   ============================================================ */
.footer-note {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  color: #445566;
  font-size: 0.85rem;
  margin-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  padding-top: 28px;
}

.social-links {
  display: flex;
  gap: 16px;
}

.social-link {
  color: #445566;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.social-link:hover {
  color: #0ab5a8;
  transform: translateY(-2px);
}

/* ============================================================
   Responsive Design
   ============================================================ */
@media (max-width: 992px) {
  .hero-title {
    font-size: 2.4rem;
  }
  .card-container {
    padding: 18px 20px;
  }
  .character-overlay {
    width: 32%;
    max-width: 180px;
  }
}

@media (max-width: 768px) {
  .main-container {
    padding: 16px 12px 40px;
  }
  .hero-title {
    font-size: 1.8rem;
  }
  .hero-sub {
    font-size: 0.95rem;
  }
  .card-header {
    flex-direction: row;
    align-items: center;
  }
  .user-avatar {
    width: 44px;
    height: 44px;
  }
  .user-meta h2 {
    font-size: 1rem;
  }
  .user-meta span {
    font-size: 0.8rem;
  }
  .media-container {
    aspect-ratio: 16 / 9;
    min-height: 240px;
  }
  .character-overlay {
    width: 30%;
    max-width: 130px;
    bottom: 10px;
    right: 10px;
  }
  .tamkin-section {
    padding: 14px 16px;
    flex-direction: row;
  }
  .tamkin-text {
    font-size: 0.95rem;
  }
  .app-btn {
    padding: 8px 14px 8px 12px;
  }
  .app-btn i {
    font-size: 1.4rem;
  }
  .app-btn .btn-text strong {
    font-size: 0.85rem;
  }
  .control-btn {
    padding: 6px 12px;
    font-size: 0.75rem;
  }
  .share-btn {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
  .footer-note {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.5rem;
  }
  .card-container {
    padding: 14px 12px;
    border-radius: 16px;
  }
  .character-overlay {
    width: 35%;
    max-width: 100px;
    bottom: 6px;
    right: 6px;
  }
  .tamkin-text {
    font-size: 0.85rem;
  }
  .app-links {
    gap: 10px;
  }
  .app-btn {
    padding: 6px 10px 6px 8px;
    border-radius: 10px;
  }
  .app-btn i {
    font-size: 1.2rem;
  }
  .app-btn .btn-text strong {
    font-size: 0.75rem;
  }
  .app-btn .btn-text small {
    font-size: 0.55rem;
  }
  .media-controls {
    bottom: 10px;
    left: 10px;
    gap: 6px;
  }
  .control-btn {
    padding: 4px 8px;
    font-size: 0.65rem;
  }
  .control-btn i {
    font-size: 0.8rem;
  }
}
</style>