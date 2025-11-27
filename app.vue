<template>
  <NuxtLayout />
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  font-family: "Poppins", sans-serif;
}
/* إخفاء السكرول بشكل افتراضي */
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

body {
  overflow-y: auto;
}

/* في حالة الشاشات الصغيرة مثل الجوال */

/* في حالة الشاشات الأكبر مثل الكمبيوتر */
@media (min-width: 601px) {
  body {
    overflow-y: auto !important; /* إظهار السكول فقط عندما يكون ضروريًا */
  }
}
.v-field__field {
  width: 80% !important;
}
.v-overlay__scrim {
  background: rgba(0, 0, 0, 0.99) !important; /* أسود مع شفافية 50% */
  opacity: var(--v-overlay-opacity, 0.84);
}

.v-carousel__controls__item {
  margin: 0px !important;
}
.dialog-small-screen {
  position: fixed !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  margin: 0 !important;
  transform: none !important;
}
@media (max-width: 767px) {
  .v-dialog__content {
    animation: slide-down 0.8s ease-out; /* Apply the sliding effect on small screens */
  }
}
.v-dialog > .v-overlay__content {
  width: 100% !important;
}
.v-btn--icon.v-btn--density-default {
  width: calc(var(--v-btn-height) + 0px);
  height: calc(var(--v-btn-height) + 12px);
}
.v-field__field {
  color: #626262;
  font-feature-settings: "liga" off, "clig" off;

  font-family: Poppins;
  font-size: 15px;
  font-style: normal;
  font-weight: 412;
  line-height: 150%; /* 27px */
}
@media (max-width: 600px) {
  .v-field__field {
    color: #626262;
    font-feature-settings: "liga" off, "clig" off;
    font-family: Poppins;
    font-size: 13px;
    font-style: normal;
    font-weight: 412;
    line-height: 150%; /* 15px */
  }
}
.tamkin-three-container {
  display: flex !important;
  justify-content: center !important;
}
.tamkin-character {
  visibility: hidden; /* اختياريًا */
  transition: visibility 0s linear 0s; /* أو تاخير الانتقال */
}

.tamkin-character.show {
  visibility: visible;
  opacity: 1;
}
.pdf-container .v-field__field {
  width: 80% !important;
}
</style>
