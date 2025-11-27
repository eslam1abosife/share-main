<!-- ShareDialog.vue -->
<template>
  <v-dialog
    class="custom-dialog"
    :value="value"
    :max-width="dialogMaxWidth"
    transition="slide-down"
    persistent
    :content-class="dialogContentClass"
    scrim="rgba(0, 0, 0, 0.5)"
    @input="$emit('update:modelValue', $event)"
  >
    <v-card
      class="custom-card card-sml"
      :style="{
        width: '100%',
        height: cardHeight,
        borderRadius: isSmallScreen ? '24px 24px' : '24px',
        padding: '13.97px',
        gap: '8.38px',
        bottom: isSmallScreen ? '0px' : '',
      }"
    >
      <v-card-title class="flex justify-between dialog-title">
        <div class="flex align-center dialog-title-container">
          <div class="text-h6">Share</div>
          <div class="content-large">
            <div class="close-btn-wrapperl">
              <v-btn
                class="close-btn"
                variant="text"
                icon="mdi-close"
                @click="$emit('update:modelValue', false)"
              >
              </v-btn>
            </div>
          </div>
          <div class="content-small" style="margin-top: -71px">
            <div
              style="
                background-color: white;
                stroke-width: 3px;
                stroke: #424445;
                border-radius: 50%;
                width: 46px;
                height: 46px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0px 0px 14.3px 0px rgba(255, 255, 255, 0.04);
              "
            >
              <div style="background: #2dada3; border-radius: 50%">
                <v-btn
                  class="close-btn"
                  variant="text"
                  icon="mdi-close"
                  @click="$emit('update:modelValue', false)"
                >
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </v-card-title>
      <v-card-text class="card-text">
        <div>
          <div class="flex-container position-relative">
            <v-text-field
              :value="projectData.share_link"
              class="custom-text-field"
              solo
              disabled
              hide-details
            ></v-text-field>
            <CopyToClipboardicon
              @click="$emit('copy-to-clipboard', projectData.share_link)"
            />
          </div>

          <v-carousel
            hide-delimiter-background
            :continuous="false"
            :show-arrows="false"
            height="200"
            class="dil-tit"
            indicator-color="black"
            hide-delimiters
          >
            <v-carousel-item>
              <div class="carousel-content">
                <FacebookIcon class="fshol-icon" @click="shareOnFacebook" />
                <InstagramIcon class="fshol-icon" @click="shareOnInstagram" />
                <TikTokIcon class="fshol-icon" @click="shareOnTikTok" />
                <TwitterIcon class="fshol-icon" @click="shareOnTwitter" />
                <WhatsAppIcon class="fshol-icon" @click="shareOnWhatsApp" />
                <YouTubeIcon class="fshol-icon" @click="shareOnYouTube" />
                <TelegramIcon class="fshol-icon" @click="shareOnTelegram" />
                <PinterestIcon class="fshol-icon" @click="shareOnPinterest" />
                <MessengerIcon class="fshol-icon" @click="shareOnMessenger" />
                <SnapchatIcon class="fshol-icon" @click="shareOnSnapchat" />
                <RedditIcon class="fshol-icon" @click="shareOnReddit" />
                <ThreadsIcon class="fshol-icon" @click="shareOnThreads" />
                <LinkedInIcon class="fshol-icon" @click="shareOnLinkedIn" />
                <DiscordIcon class="fshol-icon" @click="shareOnDiscord" />
                <TumblrIcon class="fshol-icon" @click="shareOnTumblr" />
              </div>
            </v-carousel-item>
          </v-carousel>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import FacebookIcon from "@/components/icons/FacebookIcon.vue";
import InstagramIcon from "@/components/icons/InstagramIcon.vue";
import TikTokIcon from "@/components/icons/TikTokIcon.vue";
import TwitterIcon from "@/components/icons/TwitterIcon.vue";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon.vue";
import YouTubeIcon from "@/components/icons/YouTubeIcon.vue";
import TelegramIcon from "@/components/icons/TelegramIcon.vue";
import PinterestIcon from "@/components/icons/PinterestIcon.vue";
import MessengerIcon from "@/components/icons/MessengerIcon.vue";
import SnapchatIcon from "@/components/icons/SnapchatIcon.vue";
import RedditIcon from "@/components/icons/RedditIcon.vue";
import ThreadsIcon from "@/components/icons/ThreadsIcon.vue";
import LinkedInIcon from "@/components/icons/LinkedInIcon.vue";
import DiscordIcon from "@/components/icons/DiscordIcon.vue";
import TumblrIcon from "@/components/icons/TumblrIcon.vue";
import CopyToClipboardicon from "@/components/icons/copyToClipboardicon.vue";
// Import all other icons as in main

interface ProjectData {
  share_link?: string;
}

export default defineComponent({
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    projectData: {
      type: Object as PropType<ProjectData>,
      required: true,
    },
    dialogMaxWidth: String,
    cardHeight: String,
    isSmallScreen: Boolean,
    dialogContentClass: String,
  },
  components: {
    FacebookIcon,
    InstagramIcon,
    TikTokIcon,
    TwitterIcon,
    WhatsAppIcon,
    YouTubeIcon,
    TelegramIcon,
    PinterestIcon,
    MessengerIcon,
    SnapchatIcon,
    RedditIcon,
    ThreadsIcon,
    LinkedInIcon,
    DiscordIcon,
    TumblrIcon,
    // all others
    CopyToClipboardicon,
  },
  methods: {
    shareOnFacebook() {
      const text = encodeURIComponent(this.projectData.share_link || "");
      const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${text}`;
      window.open(fbUrl, "_blank", "width=600,height=400");
    },
    shareOnInstagram() {
      const shareUrl = encodeURIComponent(this.projectData.share_link || "");
      const instagramUrl = `https://www.instagram.com/?url=${shareUrl}`;
      window.open(instagramUrl, "_blank", "width=600,height=400");
    },
    // All other share methods as in original
    shareOnThreads() {
      const linkToShare = this.projectData.share_link || "";
      navigator.clipboard
        .writeText(linkToShare)
        .then(() => {
          alert("تم نسخ الرابط! افتح Threads والصقه للمشاركة.");
        })
        .catch((err) => {
          console.error("فشل نسخ الرابط:", err);
        });
      const threadsUrl = `https://www.threads.net/`;
      window.open(threadsUrl, "_blank");
    },
  },
});
</script>
<style scoped>
.v-card{
  overflow: inherit !important;
}
.content-small {
  margin-top: -64px;
  position: absolute;
  right: 25px;
}
.content-small .v-btn{
  width: 40px !important;
  height: 40px !important;
}
.content-small i {
  color: white !important;
}
.content-large .close-btn-wrapperl{
  display: flex;
  justify-content: center;
  align-items: center;
}
.content-large .close-btn-wrapperl button {
  width: 39px;
  height: 39px;
}
</style>