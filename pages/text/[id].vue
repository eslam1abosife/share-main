<template>
  <div class="p-6 cons-tiks">
    <v-container class="con-tik" style="">
      <div v-if="isLoading" class="loading-container">
        <v-progress-circular
          indeterminate
          color="rgb(6, 129, 119)"
          size="64"
          width="6"
        ></v-progress-circular>
      </div>

      <v-row v-else>
        <v-col style="margin: 26px">
          <div class="content-large">
            <h1>
              <span
                style="
                  font-size: 2rem;
                  font-weight: bold;
                  font-family: Poppins;
                  font-size: 20px;
                  font-weight: 700;
                  line-height: 34px;
                  letter-spacing: -0.16500000655651093px;
                  text-align: center;
                  text-underline-position: from-font;
                  text-decoration-skip-ink: none;
                  background: linear-gradient(
                    to right,
                    rgb(6, 129, 119),
                    rgb(14, 174, 161)
                  );
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                  text-fill-color: transparent;
                "
                >Explore and Watch Now</span
              >
              - Enjoy Your Shared
            </h1>
            <h1>Content and Engage with Others</h1>
          </div>

          <div class="content-small">
            <h1>
              <span
                style="
                  font-family: Poppins;
                  font-size: 20px;
                  font-weight: 700;
                  line-height: 34px;
                  letter-spacing: -0.16500000655651093px;
                  text-align: center;
                  text-underline-position: from-font;
                  text-decoration-skip-ink: none;
                  background: linear-gradient(
                    to right,
                    rgb(6, 129, 119),
                    rgb(14, 174, 161)
                  );
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                  text-fill-color: transparent;
                "
                >Enjoy Your Shared Content
              </span>
            </h1>
            <h1>and Engage with Others</h1>
          </div>
        </v-col>
      </v-row>
      <div
        class="bg-white"
        style="
          padding: 22px 17px;
          border-radius: 9px;
          box-shadow: 0px 4px 4px 0px #00000040;
        "
      >
        <v-row>
          <v-col cols="10">
            <div style="display: flex">
              <div>
                <img
                  style="
                    width: 100%;
                    max-width: 50px;
                    height: auto;
                    min-width: 50px;
                    border-radius: 50%;
                  "
                  :src="
                    projectData.user_image
                      ? projectData.user_image
                      : '/image%201.png'
                  "
                />
              </div>
              <div class="ml-3">
                <h2
                  class="h2-tit"
                  style="
                    font-family: Poppins;
                    font-size: 16px;
                    font-weight: 600;
                    line-height: 26px;
                    text-align: left;
                    text-underline-position: from-font;
                    text-decoration-skip-ink: none;
                  "
                >
                  {{ projectData.project_title }}
                </h2>
                <span
                  class="spa-tit"
                  style="
                    font-family: Poppins;
                    font-size: 13px;
                    font-weight: 500;
                    line-height: 26px;
                    text-align: left;
                    text-underline-position: from-font;
                    text-decoration-skip-ink: none;
                    color: rgba(104, 104, 104, 1);
                    display: block;
                  "
                  ><span>{{ projectData.type }}</span> Shared by
                  <span>{{ projectData.owner }}</span></span
                >
              </div>
            </div>
          </v-col>

          <v-col
            cols="2"
            class="flex"
            style="justify-content: end; display: flex"
          >
            <div class="text-end">
              <!-- SVG Button -->
              <div class="content-large">
                <div
                  style="
                    width: 43px;
                    height: 35px;
                    border-radius: 8px;
                    background: #f0f0f0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                  class="svg-hov"
                  @click="showDialog = true"
                >
                  <svg
                    width="34"
                    height="25"
                    viewBox="0 0 34 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <rect
                      x="0.5"
                      width="33"
                      height="25"
                      fill="url(#pattern0_718_273)"
                    />
                    <defs>
                      <pattern
                        id="pattern0_718_273"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                      >
                        <use
                          xlink:href="#image0_718_273"
                          transform="matrix(0.00757576 0 0 0.01 0.121212 0)"
                        />
                      </pattern>
                      <image
                        id="image0_718_273"
                        width="100"
                        height="100"
                        xlink:href="data:image/png;base64,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"
                      />
                    </defs>
                  </svg>
                </div>
              </div>

              <div class="content-small">
                <div
                  style="
                    width: 43px;
                    height: 35px;
                    border-radius: 8px;
                    background: #f0f0f0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                  class="svg-hov"
                  @click="showDialog = true"
                >
                  <svg
                    width="24"
                    height="20"
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <rect
                      x="0.571289"
                      y="0.857178"
                      width="18.8571"
                      height="14.2857"
                      fill="url(#pattern0_714_1917)"
                    />
                    <defs>
                      <pattern
                        id="pattern0_714_1917"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                      >
                        <use
                          xlink:href="#image0_714_1917"
                          transform="matrix(0.00757576 0 0 0.01 0.121212 0)"
                        />
                      </pattern>
                      <image
                        id="image0_714_1917"
                        width="100"
                        height="100"
                        xlink:href="data:image/png;base64,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"
                      />
                    </defs>
                  </svg>
                </div>
              </div>

              <!-- Dialog -->
              <v-dialog
                style="overflow: visible; width: 100%"
                v-model="showDialog"
                :max-width="dialogMaxWidth"
                transition="slide-down"
                class="custom-dialog"
                persistent
                :content-class="dialogContentClass"
                scrim="rgba(0, 0, 0, 0.5)"
              >
                <v-card
                  style="
                    overflow: visible;

                    background: #fff;
                  "
                  :style="{
                    width: '100%',
                    height: cardHeight,
                    borderRadius: isSmallScreen ? '24px 24px' : '24px',
                    padding: '13.97px',
                    gap: '8.38px',
                    bottom: isSmallScreen ? '0px' : '',
                  }"
                  class="custom-card card-sml"
                >
                  <v-card-title
                    class="flex justify-between"
                    style="
                      margin-bottom: -18px;
                      display: flex;
                      justify-content: space-between;
                      overflow: visible;
                    "
                  >
                    <div
                      class="flex align-center"
                      style="
                        display: flex;
                        justify-content: space-between;
                        width: 100%;
                      "
                    >
                      <div
                        style="
                          margin-left: 9px;
                          color: #303030;
                          font-feature-settings: 'liga' off, 'clig' off;
                          font-family: Poppins;
                          font-size: 24px;
                          font-style: normal;
                          font-weight: 600;
                          line-height: 150%;
                        "
                        class="text-h6"
                      >
                        Share
                      </div>
                      <div class="content-large">
                        <div class="close-btn-wrapperl">
                          <v-btn
                            class="close-btn"
                            variant="text"
                            icon="mdi-close"
                            @click="showDialog = false"
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
                            box-shadow: 0px 0px 14.3px 0px
                              rgba(255, 255, 255, 0.04);
                          "
                        >
                          <div style="background: #2dada3; border-radius: 50%">
                            <v-btn
                              class="close-btn"
                              variant="text"
                              icon="mdi-close"
                              @click="showDialog = false"
                            >
                            </v-btn>
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-card-title>
                  <v-card-text style="padding: 16px 24px 0px">
                    <div>
                      <!-- Generated Password -->
                      <div class="flex position-relative" style="display: flex">
                        <v-text-field
                          :value="projectData.share_link"
                          class="custom-text-field"
                          style="
                            width: 580px;
                            font-family: Poppins;
                            font-size: 18px;
                            font-weight: 400;
                            text-align: left;
                            border-radius: 11px;
                            border: 1px solid #555555;
                            color: #626262;
                            opacity: 1;
                            border: 0.466px solid #555;
                            background: rgba(255, 255, 255, 0.88);
                          "
                          solo
                          disabled
                          hide-details
                        ></v-text-field>
                        <svg
                          width="24"
                          height="25"
                          class="svg-inp"
                          viewBox="0 0 24 25"
                          style="
                            z-index: 100;
                            cursor: pointer;
                            position: absolute;
                            opacity: 50%;
                            right: 15px;
                            top: 15px;
                            padding-left: 10px;
                            width: 32px;
                          "
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          @click="copyToClipboard(projectData.share_link)"
                        >
                          <g clip-path="url(#clip0_374_142)">
                            <path
                              d="M20.829 13.7752C21 13.3622 21 12.8372 21 11.7892C21 10.7412 21 10.2162 20.829 9.80325C20.7159 9.53018 20.5502 9.28206 20.3412 9.07307C20.1322 8.86409 19.8841 8.69832 19.611 8.58525C19.198 8.41425 18.673 8.41425 17.625 8.41425H11.1C9.84 8.41425 9.21 8.41425 8.729 8.65925C8.30526 8.87503 7.96078 9.21951 7.745 9.64325C7.5 10.1232 7.5 10.7532 7.5 12.0142V18.5392C7.5 19.5872 7.5 20.1122 7.671 20.5252C7.9 21.0762 8.338 21.5152 8.889 21.7432C9.302 21.9142 9.827 21.9142 10.875 21.9142C11.923 21.9142 12.448 21.9142 12.861 21.7432M20.829 13.7752C20.7159 14.0483 20.5502 14.2964 20.3412 14.5054C20.1322 14.7144 19.8841 14.8802 19.611 14.9932C19.198 15.1642 18.673 15.1642 17.625 15.1642C16.577 15.1642 16.052 15.1642 15.639 15.3352C15.3659 15.4483 15.1178 15.6141 14.9088 15.8231C14.6998 16.0321 14.5341 16.2802 14.421 16.5532C14.25 16.9662 14.25 17.4912 14.25 18.5392C14.25 19.5872 14.25 20.1122 14.079 20.5252C13.9659 20.7983 13.8002 21.0464 13.5912 21.2554C13.3822 21.4644 13.1341 21.6302 12.861 21.7432M20.829 13.7752C20.2912 15.6302 19.3017 17.3229 17.9492 18.7016C16.5967 20.0803 14.9233 21.102 13.079 21.6752L12.861 21.7432M16.5 8.41425V7.51425C16.5 6.25425 16.5 5.62425 16.255 5.14325C16.0395 4.71966 15.6954 4.3752 15.272 4.15925C14.79 3.91425 14.16 3.91425 12.9 3.91425H6.6C5.34 3.91425 4.71 3.91425 4.229 4.15925C3.80526 4.37503 3.46078 4.71951 3.245 5.14325C3 5.62325 3 6.25325 3 7.51425V13.8142C3 15.0742 3 15.7042 3.245 16.1852C3.461 16.6092 3.805 16.9532 4.229 17.1692C4.709 17.4142 5.34 17.4142 6.601 17.4142H7.5"
                              stroke="#000000"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_374_142">
                              <rect
                                width="24"
                                height="24"
                                fill="white"
                                transform="translate(0 0.914246)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
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
                          <div
                            style="
                              gap: 28px;
                              display: flex;
                              flex-wrap: wrap;
                              margin-top: 30px;
                            "
                          >
                            <svg
                              class="fshol-icon"
                              @click="shareOnFacebook"
                              width="46"
                              height="46"
                              viewBox="0 0 46 46"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M45.0717 23.4575C45.0717 34.8429 36.6347 44.2554 25.6743 45.7828C24.6494 45.925 23.6009 45.9992 22.5366 45.9992C21.3081 45.9992 20.1017 45.9013 18.9269 45.7117C8.19543 43.9837 0 34.677 0 23.4575C0 11.0075 10.0903 0.914246 22.5351 0.914246C34.9798 0.914246 45.0717 11.0075 45.0717 23.4575Z"
                                fill="#1877F2"
                              />
                              <path
                                d="M25.6736 19.0143V23.9251H31.7467L30.7851 30.5402H25.6736V45.7813C24.6488 45.9234 23.6003 45.9977 22.536 45.9977C21.3074 45.9977 20.101 45.8997 18.9262 45.7102V30.5402H13.3252V23.9251H18.9262V17.9165C18.9262 14.1888 21.947 11.1655 25.6752 11.1655V11.1687C25.6862 11.1687 25.6957 11.1655 25.7068 11.1655H31.7483V16.8866H27.8006C26.6274 16.8866 25.6752 17.8391 25.6752 19.0127L25.6736 19.0143Z"
                                fill="white"
                              />
                            </svg>
                            <svg
                              @click="shareOnInstagram"
                              class="fshol-icon"
                              width="45.07"
                              height="45.07"
                              viewBox="0 0 29 29"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.0252 0.0327454H14.9614C7.2425 0.0327454 0.985107 6.29197 0.985107 14.0131V14.0769C0.985107 21.7981 7.2425 28.0573 14.9614 28.0573H15.0252C22.744 28.0573 29.0014 21.7981 29.0014 14.0769V14.0131C29.0014 6.29197 22.744 0.0327454 15.0252 0.0327454Z"
                                fill="url(#paint0_linear_334_346)"
                              />
                              <path
                                d="M19.3285 5.73421H10.6595C8.26454 5.73421 6.31616 7.68316 6.31616 10.0788V18.0121C6.31616 20.4078 8.26454 22.3567 10.6595 22.3567H19.3285C21.7235 22.3567 23.6719 20.4078 23.6719 18.0121V10.0788C23.6719 7.68316 21.7235 5.73421 19.3285 5.73421ZM7.84836 10.0788C7.84836 8.52852 9.10965 7.26686 10.6595 7.26686H19.3285C20.8784 7.26686 22.1397 8.52852 22.1397 10.0788V18.0121C22.1397 19.5624 20.8784 20.8241 19.3285 20.8241H10.6595C9.10965 20.8241 7.84836 19.5624 7.84836 18.0121V10.0788Z"
                                fill="white"
                              />
                              <path
                                d="M14.9946 18.0858C17.2218 18.0858 19.0347 16.2733 19.0347 14.0445C19.0347 11.8157 17.2228 10.0033 14.9946 10.0033C12.7665 10.0033 10.9546 11.8157 10.9546 14.0445C10.9546 16.2733 12.7665 18.0858 14.9946 18.0858ZM14.9946 11.5369C16.3776 11.5369 17.5025 12.6621 17.5025 14.0455C17.5025 15.4289 16.3776 16.5541 14.9946 16.5541C13.6116 16.5541 12.4868 15.4289 12.4868 14.0455C12.4868 12.6621 13.6116 11.5369 14.9946 11.5369Z"
                                fill="white"
                              />
                              <path
                                d="M19.4076 10.6562C20.0074 10.6562 20.4962 10.1682 20.4962 9.56732C20.4962 8.96643 20.0083 8.47846 19.4076 8.47846C18.8069 8.47846 18.3191 8.96643 18.3191 9.56732C18.3191 10.1682 18.8069 10.6562 19.4076 10.6562Z"
                                fill="white"
                              />
                              <defs>
                                <linearGradient
                                  id="paint0_linear_334_346"
                                  x1="5.07816"
                                  y1="23.9631"
                                  x2="24.9142"
                                  y2="4.13383"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stop-color="#FAAD4F" />
                                  <stop offset="0.35" stop-color="#DD2A7B" />
                                  <stop offset="0.62" stop-color="#9537B0" />
                                  <stop offset="1" stop-color="#515BD4" />
                                </linearGradient>
                              </defs>
                            </svg>

                            <svg
                              class="fshol-icon"
                              @click="shareOnTikTok"
                              width="46"
                              height="46"
                              viewBox="0 0 46 46"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M22.7307 0.914246H22.6281C10.2102 0.914246 0.143555 10.9839 0.143555 23.4054V23.5081C0.143555 35.9296 10.2102 45.9992 22.6281 45.9992H22.7307C35.1486 45.9992 45.2152 35.9296 45.2152 23.5081V23.4054C45.2152 10.9839 35.1486 0.914246 22.7307 0.914246Z"
                                fill="black"
                              />
                              <path
                                d="M34.1057 18.8199V23.0768C33.3619 23.0042 32.3955 22.8351 31.3265 22.4434C29.9306 21.9316 28.8915 21.2319 28.211 20.6901V29.2939L28.1936 29.2671C28.2046 29.4376 28.211 29.6114 28.211 29.7867C28.211 34.0594 24.7354 37.5376 20.4624 37.5376C16.1894 37.5376 12.7139 34.0594 12.7139 29.7867C12.7139 25.5141 16.1894 22.0343 20.4624 22.0343C20.8809 22.0343 21.2914 22.0675 21.6925 22.1322V26.3275C21.3072 26.1901 20.8935 26.1159 20.4624 26.1159C18.4396 26.1159 16.7926 27.7617 16.7926 29.7867C16.7926 31.8117 18.4396 33.4576 20.4624 33.4576C22.4852 33.4576 24.1322 31.8101 24.1322 29.7867C24.1322 29.7109 24.1306 29.6351 24.1259 29.5593V12.8398H28.3783C28.3941 13.1999 28.4084 13.5632 28.4241 13.9234C28.4526 14.6326 28.7052 15.3134 29.1458 15.8709C29.6621 16.5264 30.4248 17.2878 31.4954 17.8959C32.4982 18.4645 33.4393 18.7078 34.1057 18.8231V18.8199Z"
                                fill="#FF004F"
                              />
                              <path
                                d="M32.6442 15.3639V19.6208C31.9005 19.5481 30.9341 19.3791 29.8651 18.9874C28.4692 18.4756 27.4301 17.7759 26.7495 17.2341V25.8379L26.7322 25.811C26.7432 25.9816 26.7495 26.1554 26.7495 26.3307C26.7495 30.6034 23.274 34.0815 19.001 34.0815C14.728 34.0815 11.2524 30.6034 11.2524 26.3307C11.2524 22.058 14.728 18.5783 19.001 18.5783C19.4194 18.5783 19.83 18.6115 20.2311 18.6762V22.8715C19.8458 22.7341 19.4321 22.6598 19.001 22.6598C16.9782 22.6598 15.3312 24.3057 15.3312 26.3307C15.3312 28.3557 16.9782 30.0016 19.001 30.0016C21.0238 30.0016 22.6708 28.3541 22.6708 26.3307C22.6708 26.2549 22.6692 26.1791 22.6644 26.1032V9.3806H26.9169C26.9327 9.74073 26.9469 10.104 26.9627 10.4642C26.9911 11.1734 27.2438 11.8542 27.6843 12.4117C28.2007 13.0673 28.9634 13.8286 30.034 14.4367C31.0367 15.0038 31.9779 15.2486 32.6442 15.3639Z"
                                fill="#00F7EF"
                              />
                              <path
                                d="M33.5739 17.2247V21.4815C32.8302 21.4089 31.8638 21.2399 30.7947 20.8481C29.3988 20.3364 28.3598 19.6366 27.6792 19.0948V27.6986L27.6619 27.6718C27.6729 27.8424 27.6792 28.0161 27.6792 28.1914C27.6792 32.4641 24.2037 35.9423 19.9307 35.9423C15.6577 35.9423 12.1821 32.4641 12.1821 28.1914C12.1821 23.9188 15.6577 20.439 19.9307 20.439C20.3491 20.439 20.7597 20.4722 21.1608 20.537V24.7322C20.7755 24.5948 20.3618 24.5206 19.9307 24.5206C17.9079 24.5206 16.2609 26.1665 16.2609 28.1914C16.2609 30.2164 17.9079 31.8623 19.9307 31.8623C21.9535 31.8623 23.6005 30.2148 23.6005 28.1914C23.6005 28.1156 23.5989 28.0398 23.5941 27.964V11.2445H27.8466C27.8624 11.6046 27.8766 11.9679 27.8924 12.3281C27.9208 13.0373 28.1735 13.7181 28.614 14.2756C29.1304 14.9312 29.8931 15.6925 30.9637 16.3006C31.9664 16.8677 32.9076 17.1125 33.5739 17.2278V17.2247Z"
                                fill="white"
                              />
                            </svg>

                            <svg
                              @click="shareOnTwitter"
                              class="fshol-icon"
                              width="45.07"
                              height="45.07"
                              viewBox="0 0 29 29"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M28.0332 14.0455C28.0332 21.1226 22.7887 26.9734 15.9758 27.9228C15.3388 28.0112 14.6871 28.0573 14.0255 28.0573C13.2618 28.0573 12.5119 27.9964 11.7817 27.8786C5.11205 26.8045 0.0178223 21.0195 0.0178223 14.0455C0.0178223 6.30668 6.28991 0.0327454 14.0265 0.0327454C21.763 0.0327454 28.0351 6.30668 28.0351 14.0455H28.0332Z"
                                fill="#1C1C1B"
                              />
                              <path
                                d="M5.69943 6.21256L12.16 14.8527L5.65918 21.8778H7.12267L12.8147 15.7275L17.4132 21.8778H22.3926L15.5689 12.7516L21.6201 6.21256H20.1566L14.9152 11.8768L10.6798 6.21256H5.7004H5.69943ZM7.85097 7.29062H10.138L20.2391 20.7997H17.9521L7.85097 7.29062Z"
                                fill="white"
                              />
                            </svg>
                            <svg
                              @click="shareOnWhatsApp"
                              class="fshol-icon"
                              width="46"
                              height="46"
                              viewBox="0 0 46 46"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M22.8753 0.914246H22.7726C10.3548 0.914246 0.288086 10.9839 0.288086 23.4054V23.5081C0.288086 35.9296 10.3548 45.9992 22.7726 45.9992H22.8753C35.2931 45.9992 45.3598 35.9296 45.3598 23.5081V23.4054C45.3598 10.9839 35.2931 0.914246 22.8753 0.914246Z"
                                fill="#00E510"
                              />
                              <path
                                d="M27.2159 30.0505C21.4475 30.0505 16.7545 25.3546 16.7529 19.5845C16.7545 18.1218 17.9451 16.9324 19.4042 16.9324C19.5542 16.9324 19.7026 16.9451 19.8448 16.9703C20.1574 17.0225 20.4543 17.1283 20.7275 17.2878C20.767 17.3115 20.7938 17.3494 20.8001 17.3936L21.4096 21.2367C21.4175 21.2825 21.4033 21.3267 21.3733 21.3599C21.037 21.7327 20.6075 22.0012 20.129 22.1354L19.8985 22.2002L19.9853 22.4229C20.7717 24.4258 22.3729 26.0259 24.3767 26.8156L24.5994 26.9041L24.6641 26.6735C24.7983 26.1949 25.0668 25.7652 25.4395 25.4288C25.4663 25.4035 25.5026 25.3909 25.5389 25.3909C25.5468 25.3909 25.5547 25.3909 25.5642 25.3925L29.4061 26.0022C29.4519 26.0101 29.4898 26.0353 29.5135 26.0748C29.6714 26.3481 29.7772 26.6466 29.8309 26.9594C29.8561 27.0984 29.8672 27.2453 29.8672 27.3985C29.8672 28.8596 28.6781 30.049 27.2159 30.0505Z"
                                fill="#FDFDFD"
                              />
                              <path
                                d="M37.4452 22.1907C37.1341 18.6747 35.5235 15.4129 32.9101 13.0073C30.2809 10.5874 26.8701 9.25427 23.303 9.25427C15.4739 9.25427 9.10388 15.6262 9.10388 23.4575C9.10388 26.0859 9.82866 28.6463 11.2009 30.8767L8.14062 37.6529L17.9388 36.6088C19.6427 37.307 21.446 37.6608 23.3014 37.6608C23.7893 37.6608 24.2899 37.6355 24.792 37.5834C25.2342 37.536 25.6811 37.4665 26.1201 37.3781C32.6764 36.0528 37.4626 30.2322 37.5005 23.5334V23.4575C37.5005 23.0311 37.4815 22.6046 37.4436 22.1907H37.4452ZM18.3162 33.6346L12.8953 34.2127L14.5138 30.6255L14.1901 30.1911C14.1664 30.1596 14.1427 30.128 14.1159 30.0916C12.7105 28.1504 11.9683 25.8569 11.9683 23.4591C11.9683 17.2073 17.053 12.1211 23.303 12.1211C29.1582 12.1211 34.1212 16.6908 34.5997 22.524C34.625 22.8368 34.6392 23.1511 34.6392 23.4607C34.6392 23.5492 34.6376 23.636 34.636 23.7292C34.516 28.9591 30.8636 33.4008 25.7537 34.5317C25.3637 34.6186 24.9641 34.685 24.5662 34.7276C24.1525 34.775 23.7277 34.7987 23.3061 34.7987C21.8044 34.7987 20.3453 34.508 18.9668 33.9331C18.8136 33.8715 18.6636 33.8051 18.5231 33.7372L18.3178 33.6377L18.3162 33.6346Z"
                                fill="#FDFDFD"
                              />
                            </svg>
                            <svg
                              class="fshol-icon"
                              @click="shareOnYouTube"
                              width="46"
                              height="46"
                              viewBox="0 0 46 46"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M45.3036 23.3928C45.3036 10.9782 35.2426 0.914246 22.8318 0.914246C10.4209 0.914246 0.359863 10.9782 0.359863 23.3928C0.359863 35.8073 10.4209 45.8713 22.8318 45.8713C35.2426 45.8713 45.3036 35.8073 45.3036 23.3928Z"
                                fill="#FF0209"
                              />
                              <path
                                d="M32.372 33.3486C31.7025 33.4213 31.0171 33.4339 30.3602 33.4323C25.2361 33.4276 20.112 33.4229 14.9895 33.4197C13.3772 33.4197 11.6213 33.3676 10.3754 32.3425C8.97158 31.1847 8.67946 29.177 8.56577 27.3606C8.40786 24.8712 8.39522 22.3739 8.52471 19.883C8.59577 18.5151 8.72051 17.1141 9.30951 15.8757C9.7327 14.9864 10.4385 14.1872 11.3418 13.767C12.3919 13.2789 13.4909 13.3658 14.6215 13.3642C17.3281 13.3611 20.0346 13.3595 22.7412 13.3563C25.5551 13.3532 28.3706 13.3516 31.1845 13.3484C32.5141 13.3484 33.9416 13.3753 35.0264 14.1445C36.4271 15.1365 36.8076 17.024 36.9829 18.7315C37.3066 21.8764 37.3114 25.0544 36.9955 28.1993C36.8645 29.4961 36.6465 30.8672 35.7923 31.8512C34.9459 32.8274 33.6905 33.2033 32.3736 33.3471L32.372 33.3486Z"
                                fill="white"
                              />
                              <path
                                d="M27.4157 23.3927L19.7793 18.9826V27.8028L27.4157 23.3927Z"
                                fill="#FF0209"
                              />
                            </svg>
                            <svg
                              href="https://telegram.org"
                              class="fshol-icon"
                              target="_blank"
                              xmlns="http://www.w3.org/2000/svg"
                              width="45.07"
                              @click="shareOnTelegram"
                              height="45.07"
                              viewBox="0 0 256 256"
                            >
                              <defs>
                                <linearGradient
                                  id="logosTelegram0"
                                  x1="50%"
                                  x2="50%"
                                  y1="0%"
                                  y2="100%"
                                >
                                  <stop offset="0%" stop-color="#2AABEE" />
                                  <stop offset="100%" stop-color="#229ED9" />
                                </linearGradient>
                              </defs>
                              <path
                                fill="url(#logosTelegram0)"
                                d="M128 0C94.06 0 61.48 13.494 37.5 37.49A128.04 128.04 0 0 0 0 128c0 33.934 13.5 66.514 37.5 90.51C61.48 242.506 94.06 256 128 256s66.52-13.494 90.5-37.49c24-23.996 37.5-56.576 37.5-90.51s-13.5-66.514-37.5-90.51C194.52 13.494 161.94 0 128 0"
                              />
                              <path
                                fill="#FFF"
                                d="M57.94 126.648q55.98-24.384 74.64-32.152c35.56-14.786 42.94-17.354 47.76-17.441c1.06-.017 3.42.245 4.96 1.49c1.28 1.05 1.64 2.47 1.82 3.467c.16.996.38 3.266.2 5.038c-1.92 20.24-10.26 69.356-14.5 92.026c-1.78 9.592-5.32 12.808-8.74 13.122c-7.44.684-13.08-4.912-20.28-9.63c-11.26-7.386-17.62-11.982-28.56-19.188c-12.64-8.328-4.44-12.906 2.76-20.386c1.88-1.958 34.64-31.748 35.26-34.45c.08-.338.16-1.598-.6-2.262c-.74-.666-1.84-.438-2.64-.258c-1.14.256-19.12 12.152-54 35.686c-5.1 3.508-9.72 5.218-13.88 5.128c-4.56-.098-13.36-2.584-19.9-4.708c-8-2.606-14.38-3.984-13.82-8.41c.28-2.304 3.46-4.662 9.52-7.072"
                              />
                            </svg>

                            <svg
                              @click="shareOnPinterest"
                              class="fshol-icon"
                              width="46"
                              height="46"
                              viewBox="0 0 46 46"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M22.9627 0.914246H22.86C10.4422 0.914246 0.375488 10.9839 0.375488 23.4054V23.5081C0.375488 35.9296 10.4422 45.9992 22.86 45.9992H22.9627C35.3805 45.9992 45.4472 35.9296 45.4472 23.5081V23.4054C45.4472 10.9839 35.3805 0.914246 22.9627 0.914246Z"
                                fill="#FF0000"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M20.8541 29.6209C20.8272 29.7141 20.802 29.7931 20.7814 29.8721C19.5892 34.5444 19.4566 35.5822 18.2312 37.7525C17.647 38.7839 16.9885 39.7616 16.2605 40.6967C16.1784 40.8026 16.101 40.9384 15.9368 40.9052C15.7568 40.8673 15.7426 40.7046 15.7236 40.5609C15.5278 39.1409 15.4189 37.7177 15.4662 36.2835C15.5278 34.4164 15.7584 33.7752 18.1649 23.6534C18.1996 23.4986 18.1602 23.3707 18.1096 23.2317C17.5333 21.6774 17.4196 20.0994 17.9233 18.5009C19.0129 15.0481 22.9258 14.7843 23.6096 17.6322C24.0312 19.3934 22.9163 21.6995 22.0605 25.1082C21.3515 27.9198 24.6612 29.9195 27.4894 27.8661C30.098 25.9738 31.1102 21.4373 30.9175 18.2214C30.5386 11.81 23.5101 10.4247 19.0523 12.4892C13.9409 14.8538 12.7787 21.1909 15.0873 24.0878C15.3794 24.4558 15.9305 24.6817 15.8342 25.0545C15.6857 25.6342 15.5547 26.2186 15.3936 26.7951C15.2736 27.2248 14.5899 27.3812 14.1556 27.2042C13.3045 26.8599 12.5955 26.3181 12.0207 25.6042C10.0611 23.1764 9.50048 18.3746 12.0918 14.3088C14.9625 9.80555 20.303 7.98276 25.1792 8.5356C31.0028 9.19743 34.6836 13.1779 35.3721 17.6938C35.6864 19.7504 35.4606 24.8223 32.574 28.4079C29.2532 32.5273 23.8701 32.8006 21.3862 30.2717C21.1951 30.0774 21.042 29.8516 20.8541 29.6194V29.6209Z"
                                fill="white"
                              />
                            </svg>
                            <svg
                              @click="shareOnMessenger"
                              class="fshol-icon"
                              width="46"
                              height="46"
                              viewBox="0 0 46 46"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M22.5872 -0.000793457H22.4845C10.0667 -0.000793457 0 10.0688 0 22.4904V22.593C0 35.0145 10.0667 45.0842 22.4845 45.0842H22.5872C35.005 45.0842 45.0717 35.0145 45.0717 22.593V22.4904C45.0717 10.0688 35.005 -0.000793457 22.5872 -0.000793457Z"
                                fill="url(#paint0_linear_334_284)"
                              />
                              <path
                                d="M35.9541 22.5409V22.6183C35.9178 29.0708 31.3038 34.4618 25.2006 35.697C24.7869 35.7791 24.3684 35.8439 23.9421 35.8897C23.481 35.9371 23.0104 35.9639 22.5367 35.9639C20.6734 35.9639 18.8985 35.5832 17.2847 34.893L11.0584 35.5564C9.99563 35.6701 9.21084 34.585 9.65141 33.612L11.3252 29.9048C9.9309 27.7898 9.11768 25.2578 9.11768 22.5409C9.11768 15.1423 15.1387 9.11954 22.5367 9.11954C29.532 9.11954 35.2941 14.5026 35.9005 21.3452C35.9368 21.7369 35.9541 22.1397 35.9541 22.5409Z"
                                fill="white"
                              />
                              <path
                                d="M28.9864 18.6222C29.5881 18.1293 30.4139 18.867 29.9907 19.5193L27.1736 23.8662L25.683 26.1661C25.3656 26.6557 24.6992 26.7726 24.2334 26.4204L21.7621 24.5455L20.2383 23.3908C20.1151 23.2976 19.943 23.3008 19.823 23.3987L16.0838 26.4504C15.4821 26.9416 14.6579 26.204 15.0811 25.5516L17.7197 21.4827L19.2103 19.1829C19.5277 18.6932 20.1941 18.5764 20.6599 18.9286L23.0585 20.7467L24.5808 21.8997C24.7055 21.9929 24.8777 21.9897 24.9977 21.8918L28.9864 18.6206V18.6222Z"
                                fill="url(#paint1_linear_334_284)"
                              />
                              <defs>
                                <linearGradient
                                  id="paint0_linear_334_284"
                                  x1="6.58476"
                                  y1="38.4975"
                                  x2="38.4947"
                                  y2="6.59689"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stop-color="#0498FA" />
                                  <stop offset="0.34" stop-color="#5C5EFE" />
                                  <stop offset="0.73" stop-color="#F44E90" />
                                  <stop offset="1" stop-color="#FA8679" />
                                </linearGradient>
                                <linearGradient
                                  id="paint1_linear_334_284"
                                  x1="16.9428"
                                  y1="28.1784"
                                  x2="28.1781"
                                  y2="16.9464"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stop-color="#0498FA" />
                                  <stop offset="0.34" stop-color="#5C5EFE" />
                                  <stop offset="0.73" stop-color="#F44E90" />
                                  <stop offset="1" stop-color="#FA8679" />
                                </linearGradient>
                              </defs>
                            </svg>
                            <svg
                              @click="shareOnSnapchat"
                              width="46"
                              height="46"
                              class="fshol-icon"
                              viewBox="0 0 46 46"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M22.5563 -0.000793457H22.6589C35.0689 -0.000793457 45.1435 10.0767 45.1435 22.4904V22.593C45.1435 35.0067 35.0689 45.0842 22.6589 45.0842H22.5563C10.1463 45.0842 0.0717773 35.0067 0.0717773 22.593V22.4904C0.0717773 10.0767 10.1463 -0.000793457 22.5563 -0.000793457Z"
                                fill="#FFFA00"
                              />
                              <path
                                d="M29.6572 18.4167C29.654 18.7184 29.6224 19.0201 29.594 19.3218C29.5845 19.4213 29.5814 19.5224 29.5798 19.6219C29.5766 19.7941 29.714 19.9505 29.8862 19.9394C29.9683 19.9347 30.052 19.9125 30.1309 19.8857C30.3946 19.7925 30.6552 19.693 30.9173 19.5935C31.1541 19.5019 31.3958 19.4197 31.6405 19.3534C31.9074 19.2807 32.1742 19.227 32.4458 19.2713C32.9985 19.3613 33.3586 19.9568 33.1564 20.4796C33.0996 20.6265 33.0127 20.7529 32.9085 20.8698C32.7648 21.0293 32.6022 21.1651 32.4253 21.2852C32.2169 21.4258 32.0069 21.5632 31.7968 21.7022C31.4463 21.9328 31.0957 22.1618 30.7467 22.3956C30.6015 22.4919 30.4609 22.5946 30.3236 22.7004C30.2478 22.7589 30.1767 22.8268 30.112 22.8979C29.9888 23.0353 29.9209 23.2106 29.9319 23.3939C29.943 23.5881 29.9762 23.7777 30.0298 23.9641C30.1956 24.5454 30.4499 25.0856 30.7578 25.6021C31.5837 26.981 32.7538 28.0583 34.1465 28.9381C34.5287 29.1797 34.9376 29.3756 35.3403 29.5825C35.3971 29.6125 35.4524 29.6425 35.5077 29.6757C35.5629 29.7089 35.6119 29.7531 35.6482 29.8068C35.7051 29.8874 35.713 29.9727 35.664 30.0611C35.623 30.1369 35.5629 30.1954 35.4982 30.2491C35.4256 30.3091 35.3466 30.3597 35.2645 30.4055C34.7939 30.6724 34.2886 30.8714 33.766 31.0104C33.5133 31.0784 33.2606 31.1494 33.0096 31.2237C32.8548 31.2695 32.7095 31.3374 32.5659 31.4116C32.3243 31.5364 32.1869 31.737 32.1363 31.9977C32.1079 32.143 32.0905 32.2914 32.0637 32.4368C31.9974 32.8048 31.8647 32.9391 31.5047 33.0022C31.3784 33.0244 31.2489 33.037 31.121 33.0449C30.7989 33.0623 30.4767 33.0717 30.1546 33.0891C30.1451 33.0891 30.1356 33.0891 30.1277 33.0891C28.8408 33.1649 27.5965 33.5772 26.4927 34.2438C26.4343 34.2785 26.3759 34.3148 26.3159 34.3496C25.869 34.6197 25.4142 34.8772 24.9263 35.0667C24.3815 35.2784 23.8193 35.4047 23.2367 35.4569C22.7456 35.5011 22.256 35.4948 21.7681 35.4395C21.037 35.3573 20.3438 35.1441 19.6884 34.8092C19.3837 34.6529 19.09 34.4791 18.7994 34.3006C18.7836 34.2911 18.7678 34.2817 18.7505 34.2706C17.5914 33.5646 16.2729 33.1365 14.9165 33.0812C14.907 33.0812 14.8975 33.0812 14.8881 33.0812C14.6038 33.0702 14.3212 33.0591 14.0369 33.0417C13.8711 33.0323 13.7053 33.0101 13.5427 32.9659C13.3358 32.909 13.1858 32.7274 13.1463 32.5173C13.1242 32.402 13.1068 32.2867 13.0863 32.1714C13.0816 32.1461 13.0816 32.1193 13.0768 32.094C13.0295 31.756 12.8621 31.508 12.5447 31.3643C12.3505 31.2758 12.1515 31.2047 11.9462 31.1479C11.5925 31.0499 11.2356 30.963 10.8898 30.8383C10.5851 30.7293 10.2913 30.5998 10.0087 30.445C9.92342 30.3991 9.8413 30.347 9.76235 30.2933C9.70866 30.257 9.65814 30.2159 9.61392 30.1701C9.47181 30.0216 9.48601 29.8273 9.64708 29.701C9.74024 29.6267 9.84919 29.5778 9.95499 29.5257C10.6924 29.1639 11.392 28.7406 12.0425 28.2383C13.0247 27.4817 13.8569 26.5861 14.487 25.5073C14.7112 25.1203 14.8975 24.7128 15.0507 24.2926C15.1517 24.0146 15.2339 23.7366 15.2544 23.4444C15.2686 23.2296 15.196 23.0163 15.0491 22.86C14.9433 22.7478 14.8201 22.6578 14.6954 22.5678C14.5091 22.4351 14.3212 22.304 14.1317 22.1792C13.7243 21.9107 13.3153 21.6469 12.9079 21.3799C12.7294 21.2631 12.5573 21.1367 12.4026 20.9898C12.2905 20.8824 12.1894 20.7671 12.1089 20.6328C11.9415 20.3517 11.9288 20.0626 12.0536 19.7657C12.1278 19.5887 12.2668 19.4387 12.4405 19.3581C12.6884 19.2444 12.9474 19.2302 13.2079 19.2728C13.489 19.3186 13.759 19.4055 14.0259 19.5019C14.299 19.5998 14.5675 19.7072 14.8391 19.8099C14.9654 19.8573 15.0933 19.9046 15.2275 19.9252C15.2591 19.9299 15.2907 19.9394 15.3223 19.9378C15.4786 19.9331 15.6081 19.8825 15.6065 19.6725C15.6065 19.5714 15.6034 19.4687 15.5986 19.3676C15.575 18.8621 15.5449 18.3567 15.5323 17.8512C15.5039 16.6476 15.5086 15.4393 15.8229 14.2704C16.0155 13.5549 16.3487 12.8899 16.7987 12.2991C17.732 11.0718 18.9636 10.2931 20.4369 9.87769C21.2423 9.65024 22.065 9.576 22.8987 9.60127C23.6867 9.62497 24.4715 9.75923 25.2168 10.0183C26.1011 10.3279 26.9048 10.7765 27.5886 11.413C28.3655 12.1364 28.964 12.9815 29.2893 14.005C29.4361 14.4679 29.5293 14.9417 29.5861 15.4219C29.7046 16.4154 29.6714 17.4153 29.6619 18.4136L29.6572 18.4167Z"
                                fill="white"
                              />
                              <path
                                d="M22.5901 36.1455C22.2932 36.1455 21.9932 36.1281 21.6963 36.095C20.8973 36.0049 20.1204 35.7696 19.3908 35.3952C19.0656 35.2278 18.7498 35.0414 18.4576 34.8629L18.4102 34.8345C17.3175 34.1679 16.1 33.7904 14.892 33.7414H14.8636C14.6126 33.7304 14.3109 33.7177 14.0014 33.7004C13.7693 33.6862 13.5625 33.6546 13.3714 33.6024C12.9308 33.4824 12.5897 33.1049 12.5013 32.6421C12.4839 32.5552 12.4698 32.4667 12.4555 32.3799L12.4398 32.2835C12.435 32.2551 12.4318 32.2235 12.4287 32.1935C12.4082 32.0482 12.3671 32.0087 12.2771 31.9676C12.116 31.895 11.9455 31.8333 11.7718 31.7844C11.6897 31.7607 11.6076 31.7386 11.5239 31.7165C11.246 31.6422 10.9586 31.5632 10.6696 31.4606C10.3285 31.339 10.0001 31.1921 9.69373 31.0262C9.59267 30.9709 9.4916 30.9093 9.39212 30.8414C9.29895 30.7766 9.21369 30.7071 9.13947 30.6297C8.94051 30.4228 8.84102 30.159 8.85839 29.8858C8.87734 29.6125 9.01156 29.3645 9.23579 29.1845C9.37475 29.0739 9.5137 29.0075 9.62582 28.9523L9.66372 28.9333C10.3854 28.5795 11.0486 28.1704 11.6391 27.7155C12.6103 26.9668 13.3556 26.1359 13.9162 25.174C14.1088 24.8439 14.2825 24.4695 14.4294 24.0651C14.532 23.784 14.581 23.585 14.5936 23.4002C14.5952 23.3654 14.5857 23.3322 14.5668 23.3133C14.502 23.2454 14.4089 23.1759 14.3094 23.1064C14.1104 22.9642 13.932 22.841 13.7646 22.732C13.5151 22.5677 13.264 22.405 13.0145 22.2424L12.5424 21.9343C12.3024 21.7764 12.1113 21.6295 11.9439 21.4715C11.775 21.312 11.6423 21.1493 11.5381 20.974C11.2633 20.5159 11.2302 20.0105 11.4418 19.5113C11.5807 19.1812 11.8429 18.9079 12.1603 18.761C12.5061 18.6015 12.8945 18.5557 13.3114 18.6252C13.6619 18.6836 13.9793 18.7895 14.2462 18.8858C14.4294 18.9522 14.6094 19.0217 14.791 19.0912C14.8352 19.1085 14.8794 19.1259 14.9236 19.1417L14.9173 19.0153C14.8984 18.6426 14.8794 18.2556 14.8699 17.8717C14.8415 16.6618 14.8415 15.3745 15.1826 14.103C15.3942 13.3132 15.7606 12.574 16.2706 11.9042C17.2559 10.609 18.5966 9.71497 20.2546 9.24743C21.0789 9.01523 21.9505 8.91731 22.9154 8.94574C23.8012 8.97259 24.6476 9.1258 25.4308 9.40064C26.4478 9.75604 27.3226 10.2726 28.0332 10.9344C28.9569 11.7952 29.5712 12.7366 29.9123 13.8092C30.0623 14.283 30.1681 14.7869 30.236 15.3476C30.3449 16.259 30.3323 17.1657 30.3213 18.0439L30.3165 18.423C30.3134 18.6663 30.2944 18.9016 30.2739 19.1306C30.4113 19.0785 30.5486 19.0264 30.6797 18.9759C30.9655 18.8669 31.2229 18.7816 31.4661 18.7152C31.7772 18.6299 32.1483 18.5525 32.5509 18.6189C33.0167 18.6947 33.4226 18.9774 33.6626 19.3944C33.8979 19.8035 33.9373 20.2853 33.7731 20.7149C33.6926 20.9234 33.571 21.1177 33.4005 21.3073C33.2299 21.4968 33.0325 21.6674 32.7957 21.8285C32.633 21.9391 32.4688 22.0465 32.3046 22.1555L31.8151 22.4777C31.5814 22.6309 31.3461 22.7857 31.114 22.9405C30.9892 23.0242 30.8581 23.1174 30.7271 23.2201C30.686 23.2517 30.6434 23.2912 30.6023 23.337C30.5928 23.348 30.5897 23.3543 30.5897 23.3559C30.5976 23.4949 30.6213 23.6355 30.6639 23.7808C30.8044 24.2689 31.0192 24.7538 31.324 25.2624C32.0456 26.4661 33.0831 27.4864 34.4979 28.3789C34.7727 28.5526 35.0664 28.7011 35.3775 28.8607C35.4659 28.9049 35.5543 28.9507 35.6412 28.9965C35.7091 29.0312 35.7754 29.0692 35.8401 29.1071C35.9775 29.1876 36.0944 29.295 36.1875 29.4277C36.3881 29.7136 36.4086 30.0674 36.2444 30.3738C36.1449 30.5571 36.0107 30.6803 35.9191 30.7561C35.7991 30.8556 35.6807 30.9267 35.5906 30.9772C35.0869 31.2631 34.5311 31.4874 33.9358 31.6454C33.7131 31.7038 33.4778 31.7702 33.1983 31.8539C33.0862 31.8871 32.9694 31.9439 32.8699 31.996C32.8273 32.0182 32.802 32.0355 32.7846 32.124C32.7704 32.1951 32.7609 32.2661 32.7499 32.3388C32.7388 32.4115 32.7278 32.4825 32.7151 32.5536C32.5999 33.1933 32.2525 33.5424 31.6177 33.6514C31.474 33.6767 31.3192 33.6941 31.1582 33.702C30.9987 33.7114 30.8392 33.7177 30.6781 33.7241C30.5155 33.7304 30.3528 33.7367 30.1918 33.7462H30.1744C29.0232 33.8157 27.8705 34.1821 26.8331 34.8092L26.6562 34.915C26.2062 35.1867 25.7135 35.4695 25.164 35.6827C24.5797 35.9102 23.9512 36.0555 23.2959 36.1155C23.0622 36.136 22.8253 36.1471 22.5885 36.1471L22.5901 36.1455ZM13.7867 32.3451C13.872 32.3641 13.9667 32.3751 14.0773 32.3815C14.3757 32.3988 14.6678 32.4115 14.9142 32.4194H14.9442C16.3764 32.4794 17.8118 32.9232 19.0956 33.7051L19.1461 33.7367C19.4556 33.9263 19.7193 34.081 19.9909 34.22C20.5799 34.5217 21.2021 34.7113 21.8432 34.7824C22.29 34.8329 22.7385 34.8376 23.1791 34.7982C23.7191 34.7492 24.2134 34.6355 24.6887 34.4507C25.1434 34.2737 25.5761 34.0258 25.9772 33.7841L26.1541 33.6767C27.3747 32.939 28.7358 32.5078 30.0923 32.4288H30.1191C30.2897 32.4178 30.4586 32.4099 30.6276 32.4036C30.7808 32.3973 30.9355 32.3909 31.0887 32.383C31.1992 32.3767 31.3034 32.3657 31.3982 32.3499C31.4045 32.3499 31.4092 32.3483 31.4155 32.3467C31.4171 32.3388 31.4187 32.3293 31.4219 32.3183C31.4329 32.2582 31.4408 32.1982 31.4503 32.1382C31.4645 32.0482 31.4771 31.9581 31.4945 31.8697C31.5861 31.4006 31.8545 31.0388 32.2683 30.824C32.4135 30.7482 32.6093 30.6534 32.8288 30.5887C33.121 30.5018 33.3673 30.4323 33.6026 30.3707C33.98 30.2712 34.3369 30.1385 34.6669 29.9774C34.3795 29.8305 34.0858 29.6773 33.7984 29.4956C32.2051 28.4895 31.0271 27.3269 30.1965 25.9416C29.8317 25.3335 29.5712 24.7459 29.3991 24.1457C29.3312 23.9072 29.2901 23.6671 29.2775 23.4302C29.2585 23.0732 29.3817 22.7273 29.6265 22.4556C29.7196 22.3513 29.8207 22.2566 29.9249 22.1776C30.0797 22.0575 30.2344 21.947 30.3844 21.8459C30.6197 21.6879 30.8581 21.5316 31.095 21.3768L31.5845 21.0545C31.744 20.9503 31.9019 20.846 32.0598 20.7386C32.2067 20.6391 32.3251 20.538 32.423 20.429C32.4846 20.3595 32.5241 20.3011 32.5462 20.2426C32.5762 20.1637 32.5462 20.0894 32.5241 20.0531C32.483 19.982 32.4167 19.9331 32.3456 19.922C32.1925 19.8967 32.0014 19.9394 31.8182 19.9899C31.6177 20.0452 31.4013 20.1163 31.1566 20.2111C30.9008 20.309 30.6276 20.4132 30.3528 20.5096C30.2028 20.5617 30.0654 20.5917 29.9296 20.5996C29.6707 20.6138 29.4133 20.5206 29.2238 20.339C29.0264 20.1495 28.9175 19.8841 28.9222 19.6108C28.9238 19.5176 28.9269 19.3928 28.9396 19.2633L28.9506 19.137C28.9743 18.8842 28.9964 18.6457 28.9996 18.412L29.0043 18.0281C29.0153 17.1546 29.0264 16.3285 28.9285 15.5056C28.8716 15.0286 28.7832 14.6037 28.6585 14.2104C28.3885 13.359 27.891 12.604 27.1378 11.9011C26.5536 11.3561 25.854 10.947 24.9982 10.6469C24.3428 10.4179 23.6291 10.2884 22.879 10.2662C22.05 10.2394 21.3094 10.3231 20.6162 10.519C19.2203 10.9123 18.1434 11.6278 17.3238 12.7051C16.918 13.2374 16.6275 13.825 16.4601 14.4473C16.1648 15.5482 16.1648 16.7282 16.1916 17.8417C16.1995 18.2082 16.2185 18.5857 16.2374 18.9506L16.2564 19.3423C16.2611 19.4529 16.2643 19.5634 16.2659 19.674C16.269 20.2126 15.8979 20.5854 15.3421 20.6028C15.2442 20.6028 15.17 20.5901 15.1289 20.5822C14.9221 20.5507 14.7468 20.4843 14.6062 20.4322C14.5115 20.3959 14.4167 20.3595 14.322 20.3232C14.1483 20.2569 13.9746 20.1905 13.8009 20.1273C13.5925 20.0515 13.3446 19.9694 13.0998 19.9283C12.8929 19.8951 12.7808 19.9315 12.7145 19.9615C12.6987 19.9694 12.6734 19.9931 12.6592 20.0262C12.6071 20.1495 12.6229 20.2158 12.6719 20.2979C12.7145 20.369 12.7745 20.4401 12.8535 20.5159C12.9624 20.6186 13.0935 20.7197 13.2656 20.8318L13.7346 21.1383C13.9872 21.3025 14.2399 21.4668 14.491 21.6326C14.6726 21.7527 14.8636 21.8838 15.0768 22.0354C15.2237 22.1413 15.3816 22.2566 15.5268 22.4114C15.7969 22.6988 15.9374 23.0921 15.9106 23.4933C15.8837 23.8946 15.7669 24.2547 15.669 24.5232C15.4937 25.0018 15.2884 25.4457 15.0563 25.8437C14.4168 26.9399 13.5388 27.9224 12.4445 28.7659C11.865 29.2129 11.2223 29.6204 10.5322 29.9774C10.717 30.0674 10.9112 30.1496 11.1133 30.2206C11.3533 30.3059 11.6028 30.3738 11.8681 30.4449C11.9534 30.4686 12.0402 30.4907 12.1255 30.5144C12.3624 30.5808 12.5961 30.6645 12.8187 30.7656C13.3351 30.9994 13.6525 31.4274 13.733 32.0039C13.7362 32.0245 13.7378 32.045 13.7393 32.064V32.0608L13.7551 32.1635C13.7646 32.2251 13.7756 32.2867 13.7867 32.3467V32.3451Z"
                                fill="#1D1D1B"
                              />
                            </svg>

                            <svg
                              @click="shareOnReddit"
                              class="fshol-icon"
                              width="46"
                              height="46"
                              viewBox="0 0 46 46"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M22.6281 -0.000793457H22.7307C35.1407 -0.000793457 45.2152 10.0767 45.2152 22.4904V22.593C45.2152 35.0067 35.1407 45.0842 22.7307 45.0842H22.6281C10.2181 45.0842 0.143555 35.0067 0.143555 22.593V22.4904C0.143555 10.0767 10.2181 -0.000793457 22.6281 -0.000793457Z"
                                fill="#FF4500"
                              />
                              <path
                                d="M36.6422 21.977C36.268 20.279 34.7174 19.1781 33.1793 19.5177C32.6551 19.633 32.2034 19.9031 31.8466 20.2727C29.7764 18.769 26.9498 17.7754 23.7933 17.5875L25.3044 11.2945L29.7874 12.3671C29.8617 13.5928 30.877 14.5642 32.1213 14.5642C33.3656 14.5642 34.4615 13.5154 34.4615 12.2233C34.4615 10.9313 33.413 9.88243 32.1213 9.88243C31.1849 9.88243 30.378 10.4337 30.0054 11.2298L25.1418 10.0657C24.7597 9.97405 24.376 10.2094 24.2828 10.5916L22.6105 17.5559C19.0892 17.5748 15.9121 18.5936 13.6319 20.2253C13.5198 20.121 13.3998 20.0247 13.2687 19.9394C11.9407 19.0912 10.1058 19.5919 9.17098 21.0561C8.23616 22.5204 8.55356 24.3969 9.88156 25.2451C9.96052 25.2956 10.0411 25.3399 10.1232 25.3809C10.0695 25.7079 10.0411 26.0412 10.0411 26.3776C10.0411 31.2505 15.7115 35.201 22.7069 35.201C29.7022 35.201 35.3727 31.2505 35.3727 26.3776C35.3727 26.0364 35.3427 25.7 35.2874 25.3699C36.3659 24.7428 36.9533 23.3765 36.6454 21.977H36.6422ZM16.2121 24.3337C16.2121 23.2233 17.1122 22.3229 18.2223 22.3229C19.3324 22.3229 20.2325 23.2233 20.2325 24.3337C20.2325 25.4441 19.3324 26.3445 18.2223 26.3445C17.1122 26.3445 16.2121 25.4441 16.2121 24.3337ZM27.3762 30.6819C26.7588 31.2426 25.0534 32.5505 22.5569 32.5742C22.5348 32.5742 22.511 32.5742 22.4889 32.5742C19.9592 32.5742 18.2317 31.2537 17.6017 30.6819C17.3996 30.4987 17.3854 30.1859 17.5685 29.9853C17.7517 29.7831 18.0644 29.7689 18.2649 29.9521C18.8129 30.4513 20.3272 31.6091 22.5474 31.5885C24.706 31.568 26.1792 30.4386 26.713 29.9537C26.9151 29.7705 27.2262 29.7847 27.4094 29.9869C27.5925 30.1891 27.5783 30.5002 27.3762 30.6835V30.6819ZM27.133 26.3445C26.0229 26.3445 25.1229 25.4441 25.1229 24.3337C25.1229 23.2233 26.0229 22.3229 27.133 22.3229C28.2431 22.3229 29.1432 23.2233 29.1432 24.3337C29.1432 25.4441 28.2431 26.3445 27.133 26.3445Z"
                                fill="white"
                              />
                            </svg>
                            <svg
                              @click="shareOnThreads"
                              class="fshol-icon"
                              width="46"
                              height="46"
                              viewBox="0 0 46 46"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M22.7515 45.0858C35.1981 45.0858 45.2881 34.9928 45.2881 22.5425C45.2881 10.0922 35.1981 -0.000793457 22.7515 -0.000793457C10.3048 -0.000793457 0.214844 10.0922 0.214844 22.5425C0.214844 34.9928 10.3048 45.0858 22.7515 45.0858Z"
                                fill="url(#paint0_linear_334_296)"
                              />
                              <path
                                d="M30.0464 21.2125C34.0872 22.9137 36.0753 26.9858 34.7568 31.2C33.8583 34.0764 31.2986 36.3999 28.5557 37.4503C25.0976 38.7787 20.4535 38.6934 17.0426 37.2781C10.1247 34.4112 8.51088 26.4503 9.19778 19.8273C9.67624 15.1913 11.6059 10.6722 15.8662 8.34872C19.0765 6.59069 23.1853 6.34112 26.7003 7.07719C30.3496 7.84169 33.3119 10.0009 35.1073 13.2706C35.6616 14.2736 36.1101 15.3824 36.4448 16.6161C36.4543 16.6635 36.4353 16.7124 36.388 16.7219L33.8472 17.3916C33.7999 17.4011 33.7509 17.3727 33.7414 17.3348C33.3593 15.8816 32.7576 14.5911 31.9255 13.4649C29.3263 9.92827 24.5591 8.98212 20.4503 9.71819C15.6057 10.5885 12.9307 13.9909 12.1475 18.6632C11.508 22.4572 11.7085 26.8531 13.4566 30.3518C14.9283 33.2961 17.5938 34.9483 20.804 35.4079C22.5331 35.6464 24.2243 35.618 25.8776 35.3116C28.2478 34.8724 30.7885 33.304 31.8197 31.0578C32.4892 29.6047 32.5555 27.7613 31.8197 26.3176C31.3997 25.4963 30.768 24.836 29.9374 24.34C29.8995 24.3116 29.8411 24.3306 29.8222 24.3685C29.8127 24.378 29.8127 24.3874 29.8127 24.3969C29.7164 25.1045 29.5553 25.8011 29.3153 26.4803C28.971 27.4454 28.4752 28.2778 27.8152 28.9555C25.5981 31.2395 21.7389 31.4401 19.1302 29.7958C17.0474 28.4769 16.2642 25.7822 17.2574 23.5645C18.2886 21.271 20.8119 20.2775 23.209 20.1621C24.5654 20.0958 25.8176 20.1527 26.9735 20.3154C27.0209 20.3248 27.0587 20.2869 27.0698 20.2395V20.2111C26.964 19.6851 26.8408 19.2555 26.6877 18.9206C25.8855 17.1531 24.079 16.684 22.2742 16.913C21.1183 17.0568 20.2103 17.6017 19.5313 18.5384C19.5029 18.5763 19.4555 18.5858 19.416 18.5573L17.2574 17.0852C17.2195 17.0568 17.2101 17.0094 17.2385 16.9604C18.3944 15.3351 19.9608 14.3889 21.9489 14.1314C23.5927 13.9119 25.4355 14.1693 26.8693 15.0397C29.0184 16.3586 29.7827 18.7295 29.9738 21.1272C29.9927 21.1746 30.0116 21.2031 30.0401 21.2125H30.0464ZM19.7366 24.9592C19.3071 26.4029 20.3003 27.5402 21.6473 27.883C23.539 28.3616 25.6408 27.9398 26.5393 26.0001C26.893 25.2356 27.103 24.3369 27.1693 23.3149C27.1693 23.2675 27.1409 23.2296 27.103 23.2296C25.6992 22.9532 24.2559 22.8948 22.7842 23.0385C21.5904 23.1633 20.1092 23.7082 19.7366 24.9592Z"
                                fill="white"
                              />
                              <defs>
                                <linearGradient
                                  id="paint0_linear_334_296"
                                  x1="0.214844"
                                  y1="22.5425"
                                  x2="45.2881"
                                  y2="22.5425"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stop-color="#FAAD4F" />
                                  <stop offset="0.35" stop-color="#DD2A7B" />
                                  <stop offset="0.62" stop-color="#9537B0" />
                                  <stop offset="1" stop-color="#515BD4" />
                                </linearGradient>
                              </defs>
                            </svg>
                            <svg
                              @click="shareOnLinkedIn"
                              class="fshol-icon"
                              width="46"
                              height="45"
                              viewBox="0 0 46 45"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M22.8393 -0.000793457H22.7369C10.3388 -0.000793457 0.288086 10.0499 0.288086 22.448V22.5504C0.288086 34.9486 10.3388 44.9992 22.7369 44.9992H22.8393C35.2374 44.9992 45.2881 34.9486 45.2881 22.5504V22.448C45.2881 10.0499 35.2374 -0.000793457 22.8393 -0.000793457Z"
                                fill="#007EBB"
                              />
                              <path
                                d="M11.0194 14.9576C10.4266 14.4074 10.1318 13.7263 10.1318 12.916C10.1318 12.1056 10.4282 11.3946 11.0194 10.8428C11.6122 10.2926 12.3753 10.0167 13.3102 10.0167C14.2451 10.0167 14.9782 10.2926 15.5694 10.8428C16.1622 11.393 16.457 12.0851 16.457 12.916C16.457 13.7468 16.1606 14.4074 15.5694 14.9576C14.9766 15.5079 14.2246 15.7838 13.3102 15.7838C12.3958 15.7838 11.6122 15.5079 11.0194 14.9576ZM15.9588 18.1139V34.9832H10.6284V18.1139H15.9588Z"
                                fill="#FEFFFC"
                              />
                              <path
                                d="M33.704 19.7803C34.8659 21.0416 35.4461 22.7726 35.4461 24.9767V34.6852H30.3837V25.6609C30.3837 24.5494 30.0952 23.6855 29.5198 23.0706C28.9443 22.4558 28.1687 22.1467 27.1975 22.1467C26.2263 22.1467 25.4506 22.4542 24.8752 23.0706C24.2997 23.6855 24.0112 24.5494 24.0112 25.6609V34.6852H18.9189V18.0666H24.0112V20.2706C24.5268 19.5359 25.2221 18.9558 26.0955 18.5285C26.9689 18.1013 27.9511 17.8884 29.0437 17.8884C30.9891 17.8884 32.5436 18.5191 33.704 19.7803Z"
                                fill="#FEFFFC"
                              />
                            </svg>
                            <svg
                              @click="shareOnDiscord"
                              class="fshol-icon"
                              width="46"
                              height="45"
                              viewBox="0 0 46 45"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M22.8393 -0.000793457H22.7368C10.3387 -0.000793457 0.288086 10.0499 0.288086 22.448V22.5504C0.288086 34.9486 10.3387 44.9992 22.7368 44.9992H22.8393C35.2374 44.9992 45.2881 34.9486 45.2881 22.5504V22.448C45.2881 10.0499 35.2374 -0.000793457 22.8393 -0.000793457Z"
                                fill="#5865F2"
                              />
                              <path
                                d="M34.0486 12.1688C31.977 11.2181 29.7572 10.5181 27.4349 10.1177C27.3924 10.1098 27.3498 10.1287 27.3293 10.1681C27.0439 10.6758 26.727 11.3395 26.5063 11.8598C24.009 11.4861 21.5244 11.4861 19.0775 11.8598C18.8552 11.3269 18.5273 10.6758 18.2404 10.1681C18.2183 10.1303 18.1757 10.1114 18.1348 10.1177C15.814 10.5181 13.5927 11.2181 11.5211 12.1688C11.5037 12.1767 11.4879 12.1893 11.4769 12.2066C7.26431 18.5003 6.11023 24.6395 6.67622 30.7029C6.67937 30.7329 6.69514 30.7613 6.71879 30.7786C9.49828 32.8203 12.1911 34.0595 14.8334 34.8808C14.876 34.8935 14.9201 34.8777 14.9469 34.843C15.5713 33.9901 16.1294 33.0899 16.6071 32.1423C16.6354 32.0872 16.607 32.021 16.5503 31.9989C15.6658 31.6631 14.8255 31.2547 14.0152 30.7912C13.9505 30.7534 13.9458 30.6619 14.0041 30.6178C14.1744 30.4901 14.3447 30.3577 14.5071 30.2237C14.537 30.1984 14.578 30.1937 14.6127 30.2095C19.9304 32.6374 25.6881 32.6374 30.9428 30.2095C30.9775 30.1921 31.0185 30.1984 31.0484 30.2221C31.2108 30.3561 31.3811 30.4901 31.5529 30.6178C31.6112 30.6619 31.6081 30.7534 31.5435 30.7912C30.7347 31.2642 29.8928 31.6646 29.0068 31.9989C28.9484 32.021 28.9232 32.0872 28.9516 32.1439C29.4403 33.0883 29.9968 33.9885 30.6101 34.843C30.6353 34.8793 30.6811 34.895 30.7236 34.8824C33.3786 34.061 36.0714 32.8218 38.8509 30.7802C38.8745 30.7628 38.8903 30.7345 38.8934 30.7061C39.5714 23.6967 37.7583 17.608 34.0896 12.2098C34.0802 12.1924 34.066 12.1783 34.0471 12.1704L34.0486 12.1688ZM17.3985 27.0106C15.7967 27.0106 14.4787 25.5413 14.4787 23.7361C14.4787 21.9309 15.773 20.4615 17.3985 20.4615C19.0239 20.4615 20.3451 21.9451 20.3183 23.7361C20.3183 25.5413 19.0239 27.0106 17.3985 27.0106ZM28.1964 27.0106C26.5946 27.0106 25.2766 25.5413 25.2766 23.7361C25.2766 21.9309 26.5709 20.4615 28.1964 20.4615C29.8218 20.4615 31.143 21.9451 31.1162 23.7361C31.1162 25.5413 29.836 27.0106 28.1964 27.0106Z"
                                fill="white"
                              />
                            </svg>
                            <svg
                              @click="shareOnTwitch"
                              class="fshol-icon"
                              width="46"
                              height="45"
                              viewBox="0 0 46 45"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M22.8393 -0.000793457H22.7368C10.3387 -0.000793457 0.288086 10.0499 0.288086 22.448V22.5504C0.288086 34.9486 10.3387 44.9992 22.7368 44.9992H22.8393C35.2374 44.9992 45.2881 34.9486 45.2881 22.5504V22.448C45.2881 10.0499 35.2374 -0.000793457 22.8393 -0.000793457Z"
                                fill="#A544FF"
                              />
                              <path
                                d="M15.7736 10.78L10.7617 15.7919V33.8326H16.7748V38.8445L21.7867 33.8326H25.7959L34.817 24.8114V10.78H15.7736ZM32.8116 23.8087L28.8024 27.8179H24.7932L21.2853 31.3258V27.8179H16.7748V12.7838H32.8116V23.8087Z"
                                fill="white"
                              />
                              <path
                                d="M29.8036 16.2932H27.7998V22.3063H29.8036V16.2932Z"
                                fill="white"
                              />
                              <path
                                d="M24.2919 16.2932H22.2881V22.3063H24.2919V16.2932Z"
                                fill="white"
                              />
                            </svg>
                            <svg
                              @click="shareOnTumblr"
                              class="fshol-icon"
                              width="46"
                              height="45"
                              viewBox="0 0 46 45"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M22.8393 -0.000793457H22.7368C10.3387 -0.000793457 0.288086 10.0499 0.288086 22.448V22.5504C0.288086 34.9486 10.3387 44.9992 22.7368 44.9992H22.8393C35.2374 44.9992 45.2881 34.9486 45.2881 22.5504V22.448C45.2881 10.0499 35.2374 -0.000793457 22.8393 -0.000793457Z"
                                fill="black"
                              />
                              <path
                                d="M30.2013 37.2645H25.2698C20.8286 37.2645 17.5194 34.9801 17.5194 29.5141V20.761H13.4834V16.0218C17.9246 14.8694 19.7818 11.0462 19.9962 7.73697H24.6077V15.2525H29.9885V20.761H24.6077V28.3837C24.6077 30.6682 25.7601 31.458 27.5969 31.458H30.2013V37.2661V37.2645Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                        </v-carousel-item>

                        <v-carousel-indicators
                          :length="4"
                          slot="bottom"
                          color="black"
                          active-color="black"
                          :show-arrows="false"
                        />
                      </v-carousel>
                    </div>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div
              style="
                background: rgba(243, 243, 243, 1);
                border-radius: 12px;
                padding: 10px 10px 0px 10px;
              "
            >
              <div v-if="!isCharacterLoaded" id="loading-container"></div>
              <svg
                v-else
                ref="svgElement"
                id="svgElement"
                @click="triggerAdAnimation"
                width="40"
                height="35"
                viewBox="0 0 40 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3.51042"
                  y="0.510417"
                  width="33.9792"
                  height="33.9792"
                  rx="7.44413"
                  fill="white"
                />
                <rect
                  x="3.51042"
                  y="0.510417"
                  width="33.9792"
                  height="33.9792"
                  rx="7.44413"
                  stroke="#BBBBBB"
                  stroke-width="1.02083"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M18.2085 9.05575C19.9292 8.58851 21.7517 8.65815 23.4318 9.25534C25.1119 9.85254 26.5695 10.9488 27.6094 12.3973V10.6636C27.6094 10.4461 27.6958 10.2374 27.8496 10.0836C28.0035 9.92972 28.2121 9.84329 28.4297 9.84329C28.6472 9.84329 28.8559 9.92972 29.0097 10.0836C29.1636 10.2374 29.25 10.4461 29.25 10.6636V15.3123H24.6015C24.3839 15.3123 24.1753 15.2258 24.0215 15.072C23.8676 14.9182 23.7812 14.7095 23.7812 14.4919C23.7812 14.2744 23.8676 14.0657 24.0215 13.9119C24.1753 13.758 24.3839 13.6716 24.6015 13.6716H26.4904C25.6337 12.3311 24.3521 11.3168 22.8507 10.7908C21.3493 10.2648 19.7149 10.2576 18.2089 10.7703C16.703 11.283 15.4125 12.286 14.5439 13.6188C13.6753 14.9517 13.2788 16.5373 13.4179 18.1221C13.557 19.707 14.2235 21.1993 15.311 22.3605C16.3984 23.5217 17.8439 24.2846 19.4161 24.5272C20.9884 24.7698 22.5965 24.478 23.9834 23.6985C25.3702 22.9191 26.4555 21.697 27.0658 20.2278C27.1054 20.1259 27.1649 20.033 27.241 19.9545C27.317 19.876 27.4079 19.8135 27.5084 19.7706C27.609 19.7277 27.717 19.7053 27.8263 19.7048C27.9356 19.7043 28.0439 19.7256 28.1448 19.7675C28.2458 19.8094 28.3373 19.8711 28.4141 19.9488C28.4909 20.0266 28.5513 20.1189 28.5919 20.2204C28.6325 20.3219 28.6524 20.4304 28.6505 20.5397C28.6486 20.649 28.6248 20.7568 28.5806 20.8567C28.0106 22.2289 27.1005 23.4334 25.9361 24.3565C24.7718 25.2796 23.3915 25.891 21.9255 26.1331C20.4595 26.3752 18.956 26.2399 17.5567 25.7401C16.1574 25.2402 14.9085 24.3923 13.9276 23.2762C12.9467 22.1601 12.2662 20.8125 11.9502 19.3606C11.6342 17.9087 11.6931 16.4002 12.1214 14.9773C12.5497 13.5545 13.3332 12.2642 14.3982 11.228C15.4632 10.1917 16.7745 9.44491 18.2085 9.05575Z"
                  fill="#757575"
                />
              </svg>

              <div>
                <tamkin-sdk-character
                  ref="tamkinCharacter"
                  :charWidth="charWidth"
                  :charHeight="charHeight"
                  :character="projectData.character"
                  style="margin-bottom: -341px"
                >
                </tamkin-sdk-character>
                
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div
              class="di-tit"
              style="
                padding: 10px 8px 10px 8px;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 20px;
                border-radius: 11px;
                border: 1px;
                border: 1px solid rgba(232, 232, 232, 1);
              "
            >
              <div>
                <svg
                  width="39"
                  height="42"
                  viewBox="0 0 39 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <rect
                    y="0.5"
                    width="39"
                    height="41"
                    fill="url(#pattern0_334_199)"
                  />
                  <defs>
                    <pattern
                      id="pattern0_334_199"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use
                        xlink:href="#image0_334_199"
                        transform="matrix(0.00485343 0 0 0.00364152 -0.107208 -0.190626)"
                      />
                    </pattern>
                    <image
                      id="image0_334_199"
                      width="645"
                      height="327"
                      xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoUAAAFHCAYAAADX4Tb2AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA8GVYSWZNTQAqAAAACAAHARIAAwAAAAEAAQAAARoABQAAAAEAAABiARsABQAAAAEAAABqASgAAwAAAAEAAgAAATEAAgAAAB8AAAByATIAAgAAABQAAACSh2kABAAAAAEAAACmAAAAAAAAAlgAAAABAAACWAAAAAFBZG9iZSBQaG90b3Nob3AgMjEuMSAoV2luZG93cykAADIwMjM6MTA6MzEgMjI6MTc6NDAAAASQBAACAAAAFAAAANygAQADAAAAAQABAACgAgAEAAAAAQAAAoWgAwAEAAAAAQAAAUcAAAAAMjAyMzoxMDoxOCAwMTozNDozOAC37qdwAAAACXBIWXMAAFxGAABcRgEUlENBAAATkmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiCiAgICAgICAgICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyI+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIDIxLjEgKFdpbmRvd3MpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMjMtMTAtMzFUMjI6MTc6NDArMDI6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDIzLTEwLTE4VDAxOjM0OjM4PC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMjMtMTAtMzFUMjI6MTc6NDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj42MDAvMTwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NjAwLzE8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4zNjA8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjE8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjY1NTwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCAyMS4xIChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAyMy0xMC0xOFQwMTozNDozOCswMzowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo5YTQ0NDg4Yi02MWQ2LWI4NDYtYWYxYS0xZGU2OWUyNWE4ZDg8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCAyMS4xIChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAyMy0xMC0xOFQwMTo0MjoxNSswMzowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDozNWY2OWVmZi1jNTE1LTg5NDYtOGIwYi1iOGI2MjhhOTVlNTE8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgMjEuMSAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMjMtMTAtMzFUMjI6MTc6NDArMDI6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6YTU2NjQ5NzAtMjQ3OS1kYjQ2LTk3MmQtODVhMzZhZTUzN2Y1PC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jb252ZXJ0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+ZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZzwvc3RFdnQ6cGFyYW1ldGVycz4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmRlcml2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+Y29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmc8L3N0RXZ0OnBhcmFtZXRlcnM+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIDIxLjEgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDIzLTEwLTMxVDIyOjE3OjQwKzAyOjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjg0MWZlODg2LWEyMWMtOWI0Mi1iOWVlLTg1ZDhhNDE3MjNiOTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6U2VxPgogICAgICAgICA8L3htcE1NOkhpc3Rvcnk+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDo5YTQ0NDg4Yi02MWQ2LWI4NDYtYWYxYS0xZGU2OWUyNWE4ZDg8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkRlcml2ZWRGcm9tIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgPHN0UmVmOmluc3RhbmNlSUQ+eG1wLmlpZDphNTY2NDk3MC0yNDc5LWRiNDYtOTcyZC04NWEzNmFlNTM3ZjU8L3N0UmVmOmluc3RhbmNlSUQ+CiAgICAgICAgICAgIDxzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDo5YTQ0NDg4Yi02MWQ2LWI4NDYtYWYxYS0xZGU2OWUyNWE4ZDg8L3N0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgICAgPHN0UmVmOmRvY3VtZW50SUQ+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmUzYmE5Y2ZmLWI2OGItOTM0OS1hNGRiLWRhOTJjOTkzOWQ1ODwvc3RSZWY6ZG9jdW1lbnRJRD4KICAgICAgICAgPC94bXBNTTpEZXJpdmVkRnJvbT4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDo4NDFmZTg4Ni1hMjFjLTliNDItYjllZS04NWQ4YTQxNzIzYjk8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyZGU4YWM2YS1lZGNkLTIwNDEtODM4ZS03MTRiN2FjMTJjOWU8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+CiAgICAgICAgICAgIDxyZGY6QmFnPgogICAgICAgICAgICAgICA8cmRmOmxpPnhtcC5kaWQ6MDYwRDk1QjlGRDJGRTcxMTlBRUFFOUEyNDJDNjU1QjY8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaT54bXAuZGlkOjA5NjNBOEVDREI0RUU3MTFBQkQ3QzA5N0Q3MTZDMEJDPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+eG1wLmRpZDo3NzY4RTFDNDkwODhFNTExQUY5Q0UwMUQ0MUM1OTBFQzwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpPnhtcC5kaWQ6QjJEQUMyQUFERjJGRTcxMTlBRUFFOUEyNDJDNjU1QjY8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaT54bXAuZGlkOkM4RDc1MUZDRkQzMEU3MTFBQTQwQzY2MzZCNDhGNjNGPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOkJhZz4KICAgICAgICAgPC9waG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDxwaG90b3Nob3A6SUNDUHJvZmlsZT5zUkdCIElFQzYxOTY2LTIuMTwvcGhvdG9zaG9wOklDQ1Byb2ZpbGU+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpJS/9rAABAAElEQVR4AeydCXwb1bX/7x1JtrOSAGFfAgRIYtkBUuClhRKWB5Q9ia1sXuLAIy30QUtpafu6hC60tNAW+lpIC/GakCh2gNIHFEoT/mUp0EDihSSsYV8SAiGLLVua+/9d2bIlWcus0kg684mjmTvnnnvud0aaM3c5lzHaiAARIAJEgAgQASJABIgAESACRIAIEAEiQASIABEgAkSACBABIkAEiAARIAJEgAgQASJABIgAESACRIAIEAEiQASIABEgAkSACBABIkAEiAARIAJEgAgQASJABIgAESACRIAIEAEiQASIABEgAkSACBABIkAEiAARIAJEgAgQASJABIgAESACRIAIEAEiQASIABEgAkSACBABIkAEiAARIAJEgAgQASJABIgAESACRIAIEAEiQASIABEgAkSACBABIkAEiAARIAJEgAgQASJABIgAESACRIAIEAEiQASIABEgAkSACBABIkAEiAARIAJEgAgQASJABIgAESACRIAIEAEiQASIABEgAkSACBABIkAEiAARIAJEgAgQASJABIgAESACRIAIEAEiQASIABEgAkSACBABIkAEiAARIAJEgAgQASJABIgAESACRIAIEAEiQASIABEgAkSACBABIkAEiAARIAJEgAgQASJABIgAESACRIAIEAEiQASIABEgAkSACBABIkAEiAARIAJEgAgQASJABIgAESACRIAIEAEiQASIABEgAkSACBABIkAEiAARIAJEgAgQASJABIgAESACRIAIEAEiQASIABEgAkSACBABIkAEiAARIAJEgAgQASJABIgAESACRIAIEAEiQASIABEgAkSACBABIkAEiAARIAJEgAgQASJABIgAESACRIAIEAEiQASIABEgAkSACBABIkAEiAARIAJEgAgQASJABIgAESACRIAIEAEiQASIABEgAkSACBABIkAEiAARIAJEgAgQASJABIgAESACRIAIEAEiQASIABEgAkSACBABIkAEiAARIAJEgAgQASJABIgAESACRIAIEAEiQASIABEgAkSACBABIkAEiAARIAJEgAgQASJABIgAESACRIAIEAEiQASIABEgAkSACBABIkAEiAARIAJEgAgQASJABIgAESACRIAIEAEiQASIABEgAkSACBABIkAEiAARIAJEgAgQASJABIgAESACRIAIEAEiQASIABEgAkSACBABIkAEiAARIAJEgAgQASJABIgAESACRIAIEAEiQASIABEgAkSACBABIkAEiAARIAJEgAgQASJABIgAESACRIAIEAEiQASIABEgAkSACBABIkAEiAARIAJEgAgQASJABIgAESACRIAIEAEiQASIABEgAkSACBABIkAEiAARIAJEgAgQASJABIgAESACRIAIEAEiQASIABEgAkSACBABIkAEiAARIAJEgAgQASJABIgAESACRIAIEAEiQASIABEgAkSACBABIkAEiAARIAJEgAgQASJABIgAESACRIAIEAEiQASIABEgAkSACBABIkAEiAARIAJEgAiYIsBN5c6zzN4HVx7MetVpzKVO5iqfyBg/lnFxCKp5QPhPsP3wqeAvzSbSnDd52qR6wUwqkOZboCI1BU0FfAodn8KWHYzzd5mqvsMV5TUeEptdLrX9Jd/i7anLoLNEgAgQASJABIhAhEDBOoWVfr9ri7v7NKa6zuJM/ZLg/DRAOSgCZtinJh8lkkuXcCST9k+T6vPIKexnlpzHO7jBn8O1fUqowfVdcxe3w3lMLq39CpAkESACRIAIEIG8I1BQTmGp3z+aK4GLGGezUPELcDXHa76iulwJXcKaTRgUNKm+gJzCQWRyB9f8faB7WHDRVvJp7xMblizpixGgAyJABIgAESACBUwg/51CIXh564pzhCLqcJ1n42+EoeutyxHTJazfHJPqC9UpjAONrmdxnyLEve3zFr8Yd44OiQARIAJEgAgUHIG8dQrDrYKu3jrOxNdxVU8wfWV1OWK6hPWbZlI9OYXDkL+ATuU7VGXkmi6fr3fYWUogAkSACBABIlAABPLOKTzp/vpxQdV9PSr237h+coKINZsuR0yXsH77TKonpzAp8neA9taxfOTyZ32+7qRSdIIIEAEiQASIQB4SyBuncGJ9fcno/dxfR4vP93GdtI8V1HpRdTliuoS1WjAkZ1I9OYVDKJPsvYcBiD+ewkY2rPH5QklkKJkIEAEiQASIQF4RyAunsGxt4+VMuH6HMWITbbs6uhwxXcL6TTapnpxCjcg5a+dMua7DV/OkxhwkRgSIABEgAkQgZwnktFM4zd94eMil3IVKXGr7FdDliOkS1m+6SfXkFOpG3hT08Bu2zK79RHdOykAEiAARIAJEIEcI5KxTWN7aUosZxXcicPHYjLDW5YjpEtZvvkn15BTqR44cHwnOru7y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tz7PFsE8tBhNAiRAAiRAAmOEAEVhhZ9oY/JpIbU7UI2zc1TlFZEQgqorGl6+NUc6RpEACZAACZAACYxRAhSFFXrijUEk8WDw2xB7S1CFTOeRQrBCzy3dJgESIAESIIFyEMgkJsrhB8u0SWD2+vWTBqti1yP5lfirSsn2Wxx3oU9hV9/8Zb0pcTwkARIgARIgARIggawEKAqzovFXRH0kMkGT+69CH8Cvoz/gRJN3CSEoMKF0NLw0agrnLgmQAAmQAAmQAAnYJkBRaBtVeRLOXrWqaujI2r9XUn4THkwZ9mIbhGEPhWB5zglLJQESIAESIIHRSICi0K9nVSkZ6ulslkLdAhdPwF+fUCoiMI9gdH7bb/zqNv0iARIgARIgARKoTAIUhT48bw09a/5WCO02iMAaCkEfniC6RAIkQAIkQAKjkABFoY9O6sndq+t1pbViRPFetgj66MTQFRIgARIgARIgARIgARIgARIgARIgARIgARIgARIgAegMQqsAAAAuSURBVBIgARIgARIgARIgARIgARIgARIgARIgARIgARIgARIgARIgARIYIwT+H/E+xh7yP51RAAAAAElFTkSuQmCC"
                    />
                  </defs>
                </svg>
              </div>
              <div class="content-large" style="width: 529px; height: 56px">
                <h2
                  class="cou-tit"
                  style="
                    font-family: Poppins;
                    font-size: 15px;
                    font-weight: 400;
                    line-height: 28px;
                    text-align: left;
                  "
                >
                  communicate effortlessly—download
                  <span
                    style="
                      font-family: Poppins;
                      font-size: 15px;
                      font-weight: 600;
                      line-height: 28px;
                      text-align: left;
                      text-underline-position: from-font;
                      text-decoration-skip-ink: none;
                    "
                    >Tamkin</span
                  >
                  now and explore the world of sign language!
                </h2>
              </div>
              <div class="content-small">
                <h2
                  class="cou-tit"
                  style="
                    font-family: Poppins;
                    font-size: 12px;
                    font-weight: 400;
                    line-height: 18.42px;
                    text-align: left;
                    text-underline-position: from-font;
                    text-decoration-skip-ink: none;
                  "
                >
                  communicate effortlessly—download
                  <span
                    style="
                      font-family: Poppins;
                      font-size: 12px;
                      font-weight: 600;
                      line-height: 18.42px;
                      text-align: left;
                      text-underline-position: from-font;
                      text-decoration-skip-ink: none;
                    "
                    >Tamkin</span
                  >
                  now and explore the world of sign language!
                </h2>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="content-large">
              <div
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                <div>
                  <a :href="appLinks.google_play" target="_blank">
                    <svg
                      class="cursor-pointer"
                      width="123"
                      height="37"
                      viewBox="0 0 123 37"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.811965"
                        y="0.468215"
                        width="121.626"
                        height="36.0636"
                        rx="4.21394"
                        fill="black"
                      />
                      <rect
                        x="0.811965"
                        y="0.468215"
                        width="121.626"
                        height="36.0636"
                        rx="4.21394"
                        stroke="#A6A6A6"
                        stroke-width="0.936431"
                      />
                      <path
                        d="M97.4263 27.75H99.1204V16.186H97.4263V27.75ZM112.685 20.3518L110.743 25.3652H110.685L108.669 20.3518H106.845L109.868 27.3587L108.144 31.2567H109.91L114.569 20.3518H112.685ZM103.077 26.4366C102.523 26.4366 101.749 26.1536 101.749 25.4545C101.749 24.562 102.713 24.2198 103.544 24.2198C104.289 24.2198 104.64 24.3832 105.092 24.6065C104.961 25.6778 104.056 26.4366 103.077 26.4366ZM103.282 20.0989C102.056 20.0989 100.785 20.6495 100.26 21.8694L101.763 22.5089C102.085 21.8694 102.683 21.6613 103.311 21.6613C104.187 21.6613 105.078 22.1964 105.092 23.1489V23.2677C104.785 23.0892 104.128 22.8215 103.326 22.8215C101.704 22.8215 100.055 23.7287 100.055 25.4248C100.055 26.9721 101.384 27.969 102.873 27.969C104.011 27.969 104.64 27.4483 105.033 26.838H105.092V27.7312H106.728V23.2973C106.728 21.2443 105.223 20.0989 103.282 20.0989ZM92.8125 21.7595H90.403V17.7958H92.8125C94.079 17.7958 94.798 18.8639 94.798 19.7776C94.798 20.6737 94.079 21.7595 92.8125 21.7595ZM92.7689 16.186H88.7096V27.75H90.403V23.3689H92.7689C94.6464 23.3689 96.4921 21.9843 96.4921 19.7776C96.4921 17.5714 94.6464 16.186 92.7689 16.186ZM70.6338 26.4387C69.4634 26.4387 68.4839 25.44 68.4839 24.0695C68.4839 22.6831 69.4634 21.6702 70.6338 21.6702C71.7892 21.6702 72.696 22.6831 72.696 24.0695C72.696 25.44 71.7892 26.4387 70.6338 26.4387ZM72.579 20.9993H72.5204C72.1403 20.5375 71.4086 20.1202 70.4877 20.1202C68.5567 20.1202 66.787 21.8491 66.787 24.0695C66.787 26.2747 68.5567 27.9885 70.4877 27.9885C71.4086 27.9885 72.1403 27.5711 72.5204 27.0945H72.579V27.6604C72.579 29.166 71.7892 29.9704 70.5167 29.9704C69.4787 29.9704 68.8351 29.2105 68.5715 28.5698L67.0945 29.1957C67.5183 30.2385 68.6443 31.5204 70.5167 31.5204C72.5062 31.5204 74.1883 30.3281 74.1883 27.4219V20.3587H72.579V20.9993ZM75.3586 27.75H77.0545V16.186H75.3586V27.75ZM79.5558 23.9351C79.5121 22.415 80.7119 21.6403 81.5743 21.6403C82.2474 21.6403 82.8173 21.9832 83.0081 22.4746L79.5558 23.9351ZM84.8211 22.6235C84.4994 21.7447 83.5195 20.1202 81.5158 20.1202C79.5263 20.1202 77.8737 21.7147 77.8737 24.0543C77.8737 26.2599 79.5121 27.9885 81.7055 27.9885C83.4751 27.9885 84.4994 26.886 84.9238 26.245L83.6074 25.3507C83.1685 26.0065 82.5691 26.4387 81.7055 26.4387C80.843 26.4387 80.2285 26.0362 79.8341 25.2464L84.9965 23.0708L84.8211 22.6235ZM43.6874 21.3273V22.9963H47.6072C47.4902 23.9351 47.183 24.6205 46.7149 25.0975C46.1443 25.6785 45.2521 26.3195 43.6874 26.3195C41.2741 26.3195 39.3874 24.3376 39.3874 21.8787C39.3874 19.4199 41.2741 17.4377 43.6874 17.4377C44.9892 17.4377 45.9397 17.9594 46.6418 18.63L47.7977 17.4525C46.8174 16.4989 45.5159 15.7687 43.6874 15.7687C40.3814 15.7687 37.6025 18.5108 37.6025 21.8787C37.6025 25.2464 40.3814 27.9885 43.6874 27.9885C45.4716 27.9885 46.8174 27.3923 47.8704 26.2747C48.9527 25.1719 49.2893 23.6222 49.2893 22.3702C49.2893 21.9832 49.2598 21.6255 49.2013 21.3273H43.6874ZM53.7457 26.4387C52.5753 26.4387 51.566 25.4552 51.566 24.0543C51.566 22.6386 52.5753 21.6702 53.7457 21.6702C54.9155 21.6702 55.9248 22.6386 55.9248 24.0543C55.9248 25.4552 54.9155 26.4387 53.7457 26.4387ZM53.7457 20.1202C51.6096 20.1202 49.8694 21.7743 49.8694 24.0543C49.8694 26.3195 51.6096 27.9885 53.7457 27.9885C55.8809 27.9885 57.6214 26.3195 57.6214 24.0543C57.6214 21.7743 55.8809 20.1202 53.7457 20.1202ZM62.2005 26.4387C61.0309 26.4387 60.0213 25.4552 60.0213 24.0543C60.0213 22.6386 61.0309 21.6702 62.2005 21.6702C63.3708 21.6702 64.3797 22.6386 64.3797 24.0543C64.3797 25.4552 63.3708 26.4387 62.2005 26.4387ZM62.2005 20.1202C60.0652 20.1202 58.325 21.7743 58.325 24.0543C58.325 26.3195 60.0652 27.9885 62.2005 27.9885C64.3365 27.9885 66.0767 26.3195 66.0767 24.0543C66.0767 21.7743 64.3365 20.1202 62.2005 20.1202Z"
                        fill="white"
                      />
                      <path
                        d="M40.7232 12.2418C39.9093 12.2418 39.2092 11.95 38.6447 11.375C38.08 10.7996 37.7939 10.0791 37.7939 9.24132C37.7939 8.40355 38.0801 7.68436 38.6447 7.10767C39.2092 6.53255 39.9093 6.24085 40.7232 6.24085C41.1379 6.24085 41.5249 6.31382 41.8948 6.46577C42.2648 6.61774 42.5675 6.82871 42.8059 7.10478L42.8621 7.17L42.2271 7.81678L42.1636 7.73729C42.0055 7.53939 41.8045 7.38564 41.5497 7.27388C41.2959 7.16241 41.0179 7.11093 40.7232 7.11093C40.1499 7.11093 39.6743 7.30929 39.277 7.71254C39.2769 7.71263 39.2768 7.71262 39.2767 7.71272C38.8885 8.12411 38.6933 8.62498 38.6933 9.24132C38.6933 9.85814 38.8887 10.3591 39.2774 10.7706C39.6746 11.1737 40.1503 11.3732 40.7232 11.3732C41.248 11.3732 41.6821 11.2239 42.0233 10.9284H42.0235C42.3412 10.6533 42.5318 10.2817 42.5993 9.80788H40.6325V8.95515H43.4493L43.4614 9.0332C43.4845 9.18309 43.5008 9.3278 43.5008 9.46679C43.5008 10.2625 43.2627 10.9119 42.7956 11.3898C42.2683 11.9593 41.5748 12.2418 40.7232 12.2418L40.7232 12.2418ZM65.1829 12.2418C64.3677 12.2418 63.6758 11.9498 63.1186 11.375C63.1185 11.3749 63.1185 11.3749 63.1184 11.3748C63.1183 11.3747 63.1183 11.3747 63.1182 11.3746C62.5602 10.8059 62.2834 10.0853 62.2834 9.24131C62.2834 8.39735 62.5602 7.67671 63.1182 7.10803C63.1183 7.10796 63.1183 7.10794 63.1184 7.10784L63.1186 7.10766C63.6758 6.53268 64.3677 6.24083 65.1829 6.24083C65.9965 6.24083 66.6886 6.53275 67.2458 7.11633C67.804 7.68493 68.081 8.40419 68.081 9.2413C68.081 10.0853 67.8041 10.8059 67.2462 11.3746L67.246 11.3748C66.6885 11.9501 65.9899 12.2418 65.1829 12.2418L65.1829 12.2418ZM44.3069 12.1175V6.36514H44.3976H47.6787V7.23522H45.1906V8.81495H47.4347V9.66768H45.1906V11.2489H47.6787V12.1175H44.3069ZM49.7424 12.1175V7.23522H48.216V6.36514H52.1525V7.23522H52.0617H50.6261V12.1175H49.7424ZM54.6683 12.1175V6.36514H55.552V6.45764V12.1175H54.6683ZM57.7767 12.1175V7.23522H56.2503V6.36514H60.1868V7.23522H60.096H58.6604V12.1175H57.7767ZM68.8654 12.1175V6.36514H69.862L72.3982 10.502L72.3764 9.71664V6.36514H73.2601V12.1175H72.3856L69.7274 7.77161L69.7492 8.55642V8.55768V12.1175H68.8654ZM65.1829 11.3732C65.7562 11.3732 66.2242 11.1739 66.6057 10.7714L66.6062 10.7706L66.6068 10.7701C66.9937 10.3757 67.1831 9.86809 67.1831 9.24129C67.1831 8.61601 66.9937 8.10666 66.6068 7.71251L66.6062 7.71195L66.6057 7.7114C66.2243 7.3089 65.7563 7.11087 65.1829 7.11087C64.6085 7.11087 64.1406 7.30856 63.7519 7.71104L63.7516 7.71141C63.3718 8.11513 63.1827 8.61618 63.1827 9.24127C63.1827 9.86788 63.3717 10.3673 63.7516 10.7711L63.7519 10.7715C64.1407 11.1741 64.6086 11.3731 65.1829 11.3731V11.3732Z"
                        fill="white"
                      />
                      <path
                        d="M19.1505 17.9665L9.48486 28.419C9.48523 28.4212 9.48595 28.423 9.48632 28.4252C9.78274 29.5601 10.8002 30.3958 12.0077 30.3958C12.4905 30.3958 12.9437 30.2629 13.3323 30.0295L13.3632 30.011L24.2431 23.6145L19.1505 17.9665Z"
                        fill="#EA4335"
                      />
                      <path
                        d="M28.9289 16.1866L28.9197 16.1802L24.2225 13.4058L18.9307 18.2036L24.241 23.6134L28.9133 20.8666C29.7325 20.416 30.2886 19.5362 30.2886 18.5215C30.2886 17.5142 29.74 16.6387 28.9289 16.1866Z"
                        fill="#FBBC04"
                      />
                      <path
                        d="M9.48415 8.58064C9.42605 8.79894 9.39551 9.0276 9.39551 9.26504V27.7351C9.39551 27.9721 9.42569 28.2015 9.48452 28.419L19.4828 18.2339L9.48415 8.58064Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M19.2216 18.4999L24.2246 13.4041L13.357 6.9844C12.962 6.74334 12.501 6.60422 12.0076 6.60422C10.8001 6.60422 9.78125 7.44144 9.48474 8.5778C9.48437 8.57891 9.48438 8.57965 9.48438 8.58067L19.2216 18.4999Z"
                        fill="#34A853"
                      />
                    </svg>
                  </a>
                </div>
                <div class="ml-3">
                  <a :href="appLinks.app_store" target="_blank">
                    <svg
                      class="cursor-pointer"
                      width="123"
                      height="37"
                      viewBox="0 0 123 37"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.561965"
                        y="0.468215"
                        width="121.626"
                        height="36.0636"
                        rx="6.0868"
                        fill="#0C0D10"
                      />
                      <rect
                        x="0.561965"
                        y="0.468215"
                        width="121.626"
                        height="36.0636"
                        rx="6.0868"
                        stroke="#A6A6A6"
                        stroke-width="0.936431"
                      />
                      <path
                        d="M83.3605 17.7609V19.8801H81.8938V21.2698H83.3605V25.9919C83.3605 27.6043 84.1659 28.2493 86.1922 28.2493C86.5482 28.2493 86.8873 28.2109 87.1841 28.1649V26.7905C86.9297 26.8135 86.7687 26.8288 86.4889 26.8288C85.5817 26.8288 85.1833 26.4449 85.1833 25.5696V21.2698H87.1841V19.8801H85.1833V17.7609H83.3605Z"
                        fill="white"
                      />
                      <path
                        d="M92.3458 28.3645C95.0419 28.3645 96.6951 26.729 96.6951 24.0186C96.6951 21.3236 95.0334 19.6804 92.3458 19.6804C89.6498 19.6804 87.9881 21.3236 87.9881 24.0186C87.9881 26.729 89.6414 28.3645 92.3458 28.3645ZM92.3458 26.8979C90.7605 26.8979 89.8703 25.846 89.8703 24.0186C89.8703 22.2066 90.7605 21.147 92.3458 21.147C93.9228 21.147 94.8214 22.2066 94.8214 24.0186C94.8214 25.8384 93.9228 26.8979 92.3458 26.8979Z"
                        fill="white"
                      />
                      <path
                        d="M98.1096 28.2032H99.9323V23.2661C99.9323 22.0914 100.907 21.3005 102.289 21.3005C102.611 21.3005 103.154 21.3543 103.307 21.4003V19.7726C103.112 19.7265 102.764 19.7035 102.493 19.7035C101.289 19.7035 100.263 20.3024 100 21.1239H99.8645V19.8417H98.1096V28.2032Z"
                        fill="white"
                      />
                      <path
                        d="M107.833 21.0855C109.181 21.0855 110.062 21.9378 110.105 23.2508H105.442C105.543 21.9455 106.484 21.0855 107.833 21.0855ZM110.096 25.9458C109.757 26.5985 109.002 26.9594 107.9 26.9594C106.442 26.9594 105.501 26.0303 105.442 24.5638V24.4716H111.961V23.8958C111.961 21.2698 110.41 19.6804 107.841 19.6804C105.238 19.6804 103.585 21.3773 103.585 24.0493C103.585 26.7213 105.204 28.3645 107.849 28.3645C109.96 28.3645 111.436 27.4431 111.851 25.9458H110.096Z"
                        fill="white"
                      />
                      <path
                        d="M71.407 25.1154C71.5476 27.1687 73.4368 28.4818 76.2487 28.4818C79.254 28.4818 81.1345 27.105 81.1345 24.9085C81.1345 23.1816 80.0624 22.2266 77.4614 21.6775L76.0642 21.3671C74.4122 21.0169 73.7444 20.5474 73.7444 19.7277C73.7444 18.6931 74.7813 18.0167 76.3366 18.0167C77.8129 18.0167 78.8322 18.6772 79.0167 19.7357H80.9323C80.8181 17.8018 78.9376 16.4409 76.363 16.4409C73.595 16.4409 71.7497 17.8018 71.7497 19.8471C71.7497 21.5342 72.7954 22.537 75.0888 23.0224L76.7233 23.3805C78.4016 23.7387 79.1397 24.2639 79.1397 25.1393C79.1397 26.158 77.9798 26.8981 76.3981 26.8981C74.7022 26.8981 73.5247 26.2057 73.3577 25.1154H71.407Z"
                        fill="white"
                      />
                      <path
                        d="M52.5249 19.7035C51.2701 19.7035 50.1849 20.2716 49.6254 21.2237H49.4897V19.8417H47.7348V30.9828H49.5576V26.9363H49.7017C50.1849 27.8193 51.2277 28.3415 52.5418 28.3415C54.8733 28.3415 56.3569 26.6753 56.3569 24.0186C56.3569 21.3619 54.8733 19.7035 52.5249 19.7035ZM52.0077 26.8596C50.4817 26.8596 49.5236 25.7692 49.5236 24.0263C49.5236 22.2757 50.4817 21.1854 52.0162 21.1854C53.5592 21.1854 54.4833 22.2526 54.4833 24.0186C54.4833 25.7923 53.5592 26.8596 52.0077 26.8596Z"
                        fill="white"
                      />
                      <path
                        d="M62.7351 19.7035C61.4804 19.7035 60.3952 20.2716 59.8356 21.2237H59.7V19.8417H57.945V30.9828H59.7678V26.9363H59.912C60.3952 27.8193 61.438 28.3415 62.7521 28.3415C65.0836 28.3415 66.5672 26.6753 66.5672 24.0186C66.5672 21.3619 65.0836 19.7035 62.7351 19.7035ZM62.218 26.8596C60.6919 26.8596 59.7339 25.7692 59.7339 24.0263C59.7339 22.2757 60.6919 21.1854 62.2265 21.1854C63.7695 21.1854 64.6936 22.2526 64.6936 24.0186C64.6936 25.7923 63.7695 26.8596 62.218 26.8596Z"
                        fill="white"
                      />
                      <path
                        d="M44.4644 28.2032H46.5558L41.9776 16.7195H39.8599L35.2817 28.2032H37.3028L38.4715 25.1552H43.3045L44.4644 28.2032ZM40.8177 18.8045H40.9671L42.8036 23.6591H38.9724L40.8177 18.8045Z"
                        fill="white"
                      />
                      <path
                        d="M36.5063 8.05764V13.5975H38.7149C40.5377 13.5975 41.5932 12.5801 41.5932 10.8103C41.5932 9.06733 40.5292 8.05764 38.7149 8.05764H36.5063ZM37.4559 8.84082H38.6089C39.8764 8.84082 40.6267 9.57025 40.6267 10.8218C40.6267 12.0925 39.8891 12.8143 38.6089 12.8143H37.4559V8.84082Z"
                        fill="white"
                      />
                      <path
                        d="M44.8258 13.6781C46.1739 13.6781 47.0005 12.8604 47.0005 11.5052C47.0005 10.1576 46.1696 9.33607 44.8258 9.33607C43.4778 9.33607 42.647 10.1576 42.647 11.5052C42.647 12.8604 43.4736 13.6781 44.8258 13.6781ZM44.8258 12.9448C44.0331 12.9448 43.5881 12.4189 43.5881 11.5052C43.5881 10.5991 44.0331 10.0693 44.8258 10.0693C45.6143 10.0693 46.0636 10.5991 46.0636 11.5052C46.0636 12.415 45.6143 12.9448 44.8258 12.9448Z"
                        fill="white"
                      />
                      <path
                        d="M54.0398 9.41669H53.1284L52.306 12.607H52.234L51.2844 9.41669H50.4112L49.4616 12.607H49.3938L48.5672 9.41669H47.6431L48.9148 13.5975H49.8516L50.8012 10.5185H50.8732L51.827 13.5975H52.7723L54.0398 9.41669Z"
                        fill="white"
                      />
                      <path
                        d="M55.0894 13.5975H56.0007V11.152C56.0007 10.4993 56.4289 10.0924 57.1029 10.0924C57.7769 10.0924 58.0991 10.4264 58.0991 11.0982V13.5975H59.0104V10.8909C59.0104 9.89658 58.4424 9.33607 57.4123 9.33607C56.7171 9.33607 56.2593 9.61632 56.0347 10.0809H55.9668V9.41669H55.0894V13.5975Z"
                        fill="white"
                      />
                      <path
                        d="M60.4458 13.5975H61.3572V7.78506H60.4458V13.5975Z"
                        fill="white"
                      />
                      <path
                        d="M64.7848 13.6781C66.1328 13.6781 66.9595 12.8604 66.9595 11.5052C66.9595 10.1576 66.1286 9.33607 64.7848 9.33607C63.4368 9.33607 62.606 10.1576 62.606 11.5052C62.606 12.8604 63.4326 13.6781 64.7848 13.6781ZM64.7848 12.9448C63.9921 12.9448 63.547 12.4189 63.547 11.5052C63.547 10.5991 63.9921 10.0693 64.7848 10.0693C65.5733 10.0693 66.0226 10.5991 66.0226 11.5052C66.0226 12.415 65.5733 12.9448 64.7848 12.9448Z"
                        fill="white"
                      />
                      <path
                        d="M69.675 12.9717C69.179 12.9717 68.8187 12.7529 68.8187 12.3766C68.8187 12.0081 69.1069 11.8123 69.7428 11.7739L70.8704 11.7086V12.058C70.8704 12.5763 70.3617 12.9717 69.675 12.9717ZM69.4418 13.6666C70.048 13.6666 70.5524 13.4286 70.828 13.0101H70.9V13.5975H71.7775V10.7412C71.7775 9.85818 71.1247 9.33607 69.9675 9.33607C68.9204 9.33607 68.1744 9.79676 68.0811 10.5147H68.9628C69.0646 10.2191 69.4164 10.0501 69.9251 10.0501C70.5482 10.0501 70.8704 10.2997 70.8704 10.7412V11.1021L69.6199 11.1673C68.522 11.2287 67.9031 11.6626 67.9031 12.415C67.9031 13.179 68.5516 13.6666 69.4418 13.6666Z"
                        fill="white"
                      />
                      <path
                        d="M74.8703 13.6666C75.5062 13.6666 76.0445 13.394 76.3201 12.9372H76.3921V13.5975H77.2654V7.78506H76.354V10.0809H76.2861C76.036 9.62016 75.5019 9.34758 74.8703 9.34758C73.7046 9.34758 72.9543 10.1845 72.9543 11.5052C72.9543 12.8297 73.6961 13.6666 74.8703 13.6666ZM75.1289 10.0885C75.8919 10.0885 76.3709 10.6375 76.3709 11.509C76.3709 12.3843 75.8962 12.9256 75.1289 12.9256C74.3574 12.9256 73.8953 12.392 73.8953 11.5052C73.8953 10.626 74.3616 10.0885 75.1289 10.0885Z"
                        fill="white"
                      />
                      <path
                        d="M83.1754 13.6781C84.5234 13.6781 85.35 12.8604 85.35 11.5052C85.35 10.1576 84.5192 9.33607 83.1754 9.33607C81.8274 9.33607 80.9965 10.1576 80.9965 11.5052C80.9965 12.8604 81.8231 13.6781 83.1754 13.6781ZM83.1754 12.9448C82.3827 12.9448 81.9376 12.4189 81.9376 11.5052C81.9376 10.5991 82.3827 10.0693 83.1754 10.0693C83.9639 10.0693 84.4132 10.5991 84.4132 11.5052C84.4132 12.415 83.9639 12.9448 83.1754 12.9448Z"
                        fill="white"
                      />
                      <path
                        d="M86.5564 13.5975H87.4678V11.152C87.4678 10.4993 87.896 10.0924 88.57 10.0924C89.244 10.0924 89.5661 10.4264 89.5661 11.0982V13.5975H90.4775V10.8909C90.4775 9.89658 89.9095 9.33607 88.8794 9.33607C88.1842 9.33607 87.7264 9.61632 87.5017 10.0809H87.4339V9.41669H86.5564V13.5975Z"
                        fill="white"
                      />
                      <path
                        d="M94.675 8.37629V9.43588H93.9417V10.1308H94.675V12.4918C94.675 13.298 95.0777 13.6205 96.0908 13.6205C96.2689 13.6205 96.4384 13.6013 96.5868 13.5783V12.8911C96.4596 12.9026 96.3791 12.9103 96.2392 12.9103C95.7856 12.9103 95.5864 12.7183 95.5864 12.2807V10.1308H96.5868V9.43588H95.5864V8.37629H94.675Z"
                        fill="white"
                      />
                      <path
                        d="M97.8102 13.5975H98.7216V11.1558C98.7216 10.5224 99.137 10.0962 99.8831 10.0962C100.527 10.0962 100.871 10.4341 100.871 11.1021V13.5975H101.782V10.8986C101.782 9.90425 101.176 9.3399 100.193 9.3399C99.4973 9.3399 99.0098 9.62016 98.7852 10.0885H98.7131V7.78506H97.8102V13.5975Z"
                        fill="white"
                      />
                      <path
                        d="M105.07 10.0386C105.744 10.0386 106.185 10.4648 106.206 11.1213H103.875C103.925 10.4686 104.396 10.0386 105.07 10.0386ZM106.202 12.4688C106.032 12.7951 105.655 12.9755 105.104 12.9755C104.375 12.9755 103.904 12.511 103.875 11.7777V11.7317H107.134V11.4437C107.134 10.1308 106.359 9.33607 105.074 9.33607C103.773 9.33607 102.946 10.1845 102.946 11.5205C102.946 12.8565 103.756 13.6781 105.078 13.6781C106.134 13.6781 106.872 13.2174 107.079 12.4688H106.202Z"
                        fill="white"
                      />
                      <path
                        d="M25.3916 18.7783C25.4137 17.2233 26.3358 15.752 27.7985 14.9376C26.8757 13.7441 25.3301 12.9873 23.7221 12.9418C22.007 12.7787 20.3443 13.8712 19.4703 13.8712C18.5794 13.8712 17.2338 12.9579 15.7848 12.9849C13.896 13.0402 12.1352 14.0127 11.2163 15.5082C9.24103 18.6055 10.7144 23.1575 12.6066 25.6611C13.5533 26.887 14.6597 28.2565 16.1074 28.2079C17.5241 28.1547 18.0532 27.3898 19.7633 27.3898C21.4574 27.3898 21.9538 28.2079 23.4309 28.177C24.9511 28.1547 25.9089 26.9456 26.8224 25.7081C27.5025 24.8345 28.026 23.8691 28.3732 22.8475C26.5867 22.1632 25.3937 20.535 25.3916 18.7783Z"
                        fill="white"
                      />
                      <path
                        d="M22.6016 11.2953C23.4305 10.3941 23.8388 9.23585 23.7399 8.06644C22.4736 8.18689 21.3039 8.73501 20.4639 9.60158C19.6424 10.4483 19.2149 11.5861 19.2957 12.7109C20.5625 12.7227 21.8078 12.1894 22.6016 11.2953Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div class="content-small">
              <div
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                <div>
                  <a :href="appLinks.google_play" target="_blank">
                    <svg
                      class="cursor-pointer"
                      width="106"
                      height="32"
                      viewBox="0 0 106 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.404943"
                        y="0.404943"
                        width="105.19"
                        height="31.1901"
                        rx="3.64449"
                        fill="black"
                      />
                      <rect
                        x="0.404943"
                        y="0.404943"
                        width="105.19"
                        height="31.1901"
                        rx="3.64449"
                        stroke="#A6A6A6"
                        stroke-width="0.809886"
                      />
                      <path
                        d="M83.9636 24H85.4287V13.9987H83.9636V24ZM97.1602 17.6016L95.4807 21.9375H95.4304L93.6873 17.6016H92.1091L94.7238 23.6616L93.2327 27.0328H94.7607L98.7895 17.6016H97.1602ZM88.8506 22.8641C88.3716 22.8641 87.7018 22.6194 87.7018 22.0147C87.7018 21.2428 88.5357 20.9469 89.2549 20.9469C89.8988 20.9469 90.2027 21.0882 90.5937 21.2813C90.4798 22.2078 89.697 22.8641 88.8506 22.8641ZM89.028 17.3828C87.9672 17.3828 86.8688 17.859 86.4141 18.9141L87.7144 19.4672C87.9924 18.9141 88.5098 18.7341 89.0532 18.7341C89.8109 18.7341 90.5811 19.1969 90.5937 20.0206V20.1234C90.3283 19.969 89.7598 19.7375 89.0657 19.7375C87.6634 19.7375 86.2367 20.5222 86.2367 21.989C86.2367 23.3272 87.3862 24.1894 88.6739 24.1894C89.6585 24.1894 90.2027 23.739 90.5427 23.2113H90.5937V23.9838H92.0086V20.149C92.0086 18.3734 90.7068 17.3828 89.028 17.3828ZM79.9733 18.819H77.8894V15.391H79.9733C81.0686 15.391 81.6905 16.3147 81.6905 17.105C81.6905 17.88 81.0686 18.819 79.9733 18.819ZM79.9356 13.9987H76.4249V24H77.8894V20.211H79.9356C81.5593 20.211 83.1556 19.0134 83.1556 17.105C83.1556 15.1969 81.5593 13.9987 79.9356 13.9987ZM60.7917 22.8659C59.7795 22.8659 58.9324 22.0022 58.9324 20.8169C58.9324 19.6178 59.7795 18.7418 60.7917 18.7418C61.791 18.7418 62.5752 19.6178 62.5752 20.8169C62.5752 22.0022 61.791 22.8659 60.7917 22.8659ZM62.474 18.1616H62.4234C62.0946 17.7622 61.4618 17.4013 60.6653 17.4013C58.9952 17.4013 57.4648 18.8966 57.4648 20.8169C57.4648 22.7241 58.9952 24.2063 60.6653 24.2063C61.4618 24.2063 62.0946 23.8453 62.4234 23.4331H62.474V23.9225C62.474 25.2247 61.791 25.9203 60.6905 25.9203C59.7927 25.9203 59.2361 25.2631 59.0081 24.7091L57.7307 25.2503C58.0972 26.1522 59.071 27.2609 60.6905 27.2609C62.4111 27.2609 63.8658 26.2297 63.8658 23.7162V17.6075H62.474V18.1616ZM64.878 24H66.3447V13.9987H64.878V24ZM68.508 20.7006C68.4702 19.3859 69.5079 18.7159 70.2538 18.7159C70.8359 18.7159 71.3288 19.0125 71.4938 19.4375L68.508 20.7006ZM73.0618 19.5662C72.7836 18.8062 71.9361 17.4013 70.2031 17.4013C68.4825 17.4013 67.0532 18.7803 67.0532 20.8038C67.0532 22.7113 68.4702 24.2063 70.3672 24.2063C71.8977 24.2063 72.7836 23.2528 73.1506 22.6984L72.0121 21.925C71.6325 22.4922 71.1141 22.8659 70.3672 22.8659C69.6213 22.8659 69.0898 22.5178 68.7487 21.8347L73.2135 19.9531L73.0618 19.5662ZM37.4867 18.4453V19.8887H40.8768C40.7756 20.7006 40.5099 21.2934 40.1051 21.7059C39.6116 22.2084 38.8399 22.7628 37.4867 22.7628C35.3995 22.7628 33.7678 21.0487 33.7678 18.9222C33.7678 16.7956 35.3995 15.0813 37.4867 15.0813C38.6126 15.0813 39.4346 15.5325 40.0419 16.1125L41.0415 15.0941C40.1938 14.2694 39.0681 13.6378 37.4867 13.6378C34.6275 13.6378 32.2241 16.0094 32.2241 18.9222C32.2241 21.8347 34.6275 24.2063 37.4867 24.2063C39.0298 24.2063 40.1938 23.6906 41.1044 22.7241C42.0405 21.7703 42.3316 20.43 42.3316 19.3472C42.3316 19.0125 42.3061 18.7031 42.2555 18.4453H37.4867ZM46.1857 22.8659C45.1736 22.8659 44.3007 22.0153 44.3007 20.8038C44.3007 19.5794 45.1736 18.7418 46.1857 18.7418C47.1975 18.7418 48.0704 19.5794 48.0704 20.8038C48.0704 22.0153 47.1975 22.8659 46.1857 22.8659ZM46.1857 17.4013C44.3383 17.4013 42.8333 18.8318 42.8333 20.8038C42.8333 22.7628 44.3383 24.2063 46.1857 24.2063C48.0324 24.2063 49.5378 22.7628 49.5378 20.8038C49.5378 18.8318 48.0324 17.4013 46.1857 17.4013ZM53.498 22.8659C52.4865 22.8659 51.6133 22.0153 51.6133 20.8038C51.6133 19.5794 52.4865 18.7418 53.498 18.7418C54.5102 18.7418 55.3828 19.5794 55.3828 20.8038C55.3828 22.0153 54.5102 22.8659 53.498 22.8659ZM53.498 17.4013C51.6513 17.4013 50.1463 18.8318 50.1463 20.8038C50.1463 22.7628 51.6513 24.2063 53.498 24.2063C55.3454 24.2063 56.8504 22.7628 56.8504 20.8038C56.8504 18.8318 55.3454 17.4013 53.498 17.4013Z"
                        fill="white"
                      />
                      <path
                        d="M34.9229 10.5875C34.2189 10.5875 33.6134 10.3351 33.1252 9.8378C32.6368 9.34015 32.3894 8.71704 32.3894 7.99249C32.3894 7.26794 32.6369 6.64593 33.1252 6.14718C33.6134 5.64977 34.2189 5.39749 34.9229 5.39749C35.2815 5.39749 35.6162 5.4606 35.9361 5.59202C36.2561 5.72345 36.5179 5.90591 36.724 6.14468L36.7726 6.20108L36.2235 6.76046L36.1686 6.69171C36.0319 6.52055 35.858 6.38758 35.6376 6.29093C35.4181 6.19451 35.1777 6.14999 34.9229 6.14999C34.427 6.14999 34.0156 6.32154 33.6721 6.6703C33.672 6.67038 33.6718 6.67038 33.6718 6.67046C33.336 7.02626 33.1672 7.45944 33.1672 7.99249C33.1672 8.52595 33.3362 8.95923 33.6724 9.31515C34.0159 9.66375 34.4273 9.83624 34.9228 9.83624C35.3767 9.83624 35.7521 9.70715 36.0473 9.45156H36.0474C36.3222 9.21369 36.487 8.89225 36.5454 8.48249H34.8443V7.74499H37.2806L37.291 7.81249C37.3109 7.94214 37.325 8.06728 37.325 8.18749C37.325 8.87563 37.1191 9.43736 36.7151 9.85062C36.2591 10.3432 35.6593 10.5875 34.9229 10.5875L34.9229 10.5875ZM56.0772 10.5875C55.3721 10.5875 54.7737 10.335 54.2918 9.8378C54.2917 9.83775 54.2917 9.83772 54.2916 9.83764C54.2916 9.83759 54.2915 9.83756 54.2915 9.83748C53.8089 9.34564 53.5695 8.72239 53.5695 7.99248C53.5695 7.26257 53.8089 6.63932 54.2915 6.14748C54.2915 6.14743 54.2915 6.1474 54.2916 6.14732L54.2918 6.14716C54.7737 5.64988 55.3721 5.39747 56.0772 5.39747C56.7808 5.39747 57.3794 5.64994 57.8613 6.15466C58.344 6.64642 58.5836 7.26849 58.5836 7.99247C58.5836 8.72238 58.3442 9.34564 57.8616 9.83747L57.8614 9.83764C57.3793 10.3352 56.7751 10.5875 56.0771 10.5875L56.0772 10.5875ZM38.0222 10.48V5.50499H38.1007H40.9384V6.25749H38.7865V7.62374H40.7274V8.36124H38.7865V9.72874H40.9384V10.48H38.0222ZM42.7232 10.48V6.25749H41.4031V5.50499H44.8076V6.25749H44.7291H43.4875V10.48H42.7232ZM46.9834 10.48V5.50499H47.7477V5.58499V10.48H46.9834ZM49.6718 10.48V6.25749H48.3517V5.50499H51.7562V6.25749H51.6777H50.4361V10.48H49.6718ZM59.2621 10.48V5.50499H60.1239L62.3174 9.0828L62.2985 8.40358V5.50499H63.0628V10.48H62.3065L60.0075 6.7214L60.0264 7.40015V7.40124V10.48H59.2621ZM56.0772 9.83624C56.573 9.83624 56.9777 9.66394 57.3077 9.31577L57.3082 9.31513L57.3086 9.31465C57.6433 8.97361 57.807 8.53457 57.807 7.99246C57.807 7.45168 57.6432 7.01117 57.3086 6.67028L57.3082 6.6698L57.3077 6.66931C56.9778 6.32121 56.5731 6.14994 56.0772 6.14994C55.5804 6.14994 55.1757 6.32091 54.8396 6.669L54.8393 6.66932C54.5108 7.01849 54.3473 7.45183 54.3473 7.99245C54.3473 8.53438 54.5107 8.96634 54.8393 9.31557L54.8396 9.31589C55.1758 9.66405 55.5805 9.8362 56.0772 9.8362V9.83624Z"
                        fill="white"
                      />
                      <path
                        d="M16.2647 15.5386L7.90527 24.5786C7.90559 24.5805 7.90622 24.582 7.90653 24.5839C8.16289 25.5655 9.04285 26.2883 10.0872 26.2883C10.5047 26.2883 10.8967 26.1733 11.2328 25.9714L11.2595 25.9555L20.6692 20.4233L16.2647 15.5386Z"
                        fill="#EA4335"
                      />
                      <path
                        d="M24.7221 13.9992L24.7141 13.9936L20.6517 11.5942L16.075 15.7436L20.6677 20.4224L24.7086 18.0468C25.4171 17.6571 25.898 16.8961 25.898 16.0186C25.898 15.1474 25.4235 14.3902 24.7221 13.9992Z"
                        fill="#FBBC04"
                      />
                      <path
                        d="M7.90503 7.42109C7.85478 7.60989 7.82837 7.80765 7.82837 8.01301V23.9871C7.82837 24.1921 7.85447 24.3905 7.90535 24.5786L16.5525 15.7699L7.90503 7.42109Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M16.3262 15.9999L20.6531 11.5927L11.2541 6.04056C10.9124 5.83208 10.5137 5.71176 10.0871 5.71176C9.04268 5.71176 8.16154 6.43584 7.9051 7.41864C7.90478 7.4196 7.90479 7.42025 7.90479 7.42113L16.3262 15.9999Z"
                        fill="#34A853"
                      />
                    </svg>
                  </a>
                </div>
                <div class="ml-3">
                  <a :href="appLinks.app_store" target="_blank">
                    <svg
                      width="106"
                      height="32"
                      viewBox="0 0 106 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.404943"
                        y="0.404943"
                        width="105.19"
                        height="31.1901"
                        rx="5.26426"
                        fill="#0C0D10"
                      />
                      <rect
                        x="0.404943"
                        y="0.404943"
                        width="105.19"
                        height="31.1901"
                        rx="5.26426"
                        stroke="#A6A6A6"
                        stroke-width="0.809886"
                      />
                      <path
                        d="M72.0145 15.3607V17.1936H70.746V18.3955H72.0145V22.4795C72.0145 23.874 72.7111 24.4318 74.4635 24.4318C74.7715 24.4318 75.0647 24.3986 75.3214 24.3588V23.1701C75.1014 23.19 74.9621 23.2033 74.7201 23.2033C73.9356 23.2033 73.5909 22.8713 73.5909 22.1143V18.3955H75.3214V17.1936H73.5909V15.3607H72.0145Z"
                        fill="white"
                      />
                      <path
                        d="M79.7856 24.5314C82.1173 24.5314 83.5471 23.117 83.5471 20.7728C83.5471 18.442 82.11 17.0209 79.7856 17.0209C77.4539 17.0209 76.0168 18.442 76.0168 20.7728C76.0168 23.117 77.4466 24.5314 79.7856 24.5314ZM79.7856 23.2631C78.4145 23.2631 77.6446 22.3533 77.6446 20.7728C77.6446 19.2057 78.4145 18.2893 79.7856 18.2893C81.1494 18.2893 81.9267 19.2057 81.9267 20.7728C81.9267 22.3467 81.1494 23.2631 79.7856 23.2631Z"
                        fill="white"
                      />
                      <path
                        d="M84.7704 24.392H86.3469V20.1221C86.3469 19.1061 87.1901 18.4221 88.3853 18.4221C88.6639 18.4221 89.1332 18.4686 89.2652 18.5084V17.1006C89.0965 17.0607 88.7959 17.0408 88.5613 17.0408C87.5201 17.0408 86.6329 17.5588 86.4056 18.2693H86.2882V17.1603H84.7704V24.392Z"
                        fill="white"
                      />
                      <path
                        d="M93.1795 18.2361C94.3453 18.2361 95.1079 18.9732 95.1445 20.1088H91.1118C91.1997 18.9799 92.0136 18.2361 93.1795 18.2361ZM95.1372 22.4396C94.8439 23.0041 94.1913 23.3162 93.2381 23.3162C91.977 23.3162 91.1631 22.5127 91.1118 21.2443V21.1646H96.7503V20.6666C96.7503 18.3955 95.4085 17.0209 93.1868 17.0209C90.9358 17.0209 89.506 18.4885 89.506 20.7994C89.506 23.1103 90.9064 24.5314 93.1941 24.5314C95.0199 24.5314 96.2957 23.7346 96.655 22.4396H95.1372Z"
                        fill="white"
                      />
                      <path
                        d="M61.6763 21.7215C61.7979 23.4972 63.4319 24.6329 65.8638 24.6329C68.4629 24.6329 70.0893 23.4422 70.0893 21.5425C70.0893 20.0489 69.1621 19.223 66.9126 18.7481L65.7042 18.4797C64.2754 18.1768 63.6979 17.7707 63.6979 17.0618C63.6979 16.167 64.5946 15.582 65.9398 15.582C67.2166 15.582 68.0981 16.1533 68.2577 17.0687H69.9145C69.8157 15.3962 68.1893 14.2192 65.9626 14.2192C63.5687 14.2192 61.9727 15.3962 61.9727 17.165C61.9727 18.6242 62.8771 19.4914 64.8606 19.9113L66.2742 20.221C67.7257 20.5307 68.3641 20.985 68.3641 21.7421C68.3641 22.6231 67.3609 23.2632 65.993 23.2632C64.5262 23.2632 63.5079 22.6644 63.3635 21.7215H61.6763Z"
                        fill="white"
                      />
                      <path
                        d="M45.3458 17.0408C44.2607 17.0408 43.3221 17.5322 42.8382 18.3557H42.7209V17.1603H41.2031V26.7959H42.7795V23.2963H42.9042C43.3221 24.06 44.224 24.5115 45.3605 24.5115C47.3769 24.5115 48.6601 23.0705 48.6601 20.7728C48.6601 18.4752 47.3769 17.0408 45.3458 17.0408ZM44.8986 23.2299C43.5787 23.2299 42.7502 22.2869 42.7502 20.7795C42.7502 19.2654 43.5787 18.3225 44.9059 18.3225C46.2404 18.3225 47.0396 19.2455 47.0396 20.7728C47.0396 22.3068 46.2404 23.2299 44.8986 23.2299Z"
                        fill="white"
                      />
                      <path
                        d="M54.1763 17.0408C53.0912 17.0408 52.1526 17.5322 51.6687 18.3557H51.5514V17.1603H50.0336V26.7959H51.61V23.2963H51.7347C52.1526 24.06 53.0545 24.5115 54.191 24.5115C56.2074 24.5115 57.4906 23.0705 57.4906 20.7728C57.4906 18.4752 56.2074 17.0408 54.1763 17.0408ZM53.7291 23.2299C52.4092 23.2299 51.5807 22.2869 51.5807 20.7795C51.5807 19.2654 52.4092 18.3225 53.7364 18.3225C55.0709 18.3225 55.8701 19.2455 55.8701 20.7728C55.8701 22.3068 55.0709 23.2299 53.7291 23.2299Z"
                        fill="white"
                      />
                      <path
                        d="M38.3746 24.392H40.1834L36.2239 14.4601H34.3923L30.4329 24.392H32.1808L33.1916 21.7559H37.3715L38.3746 24.392ZM35.2207 16.2634H35.3499L36.9383 20.4619H33.6248L35.2207 16.2634Z"
                        fill="white"
                      />
                      <path
                        d="M31.4919 6.96874V11.76H33.402C34.9785 11.76 35.8914 10.8801 35.8914 9.34941C35.8914 7.84199 34.9711 6.96874 33.402 6.96874H31.4919ZM32.3132 7.64609H33.3104C34.4066 7.64609 35.0555 8.27695 35.0555 9.35937C35.0555 10.4584 34.4176 11.0826 33.3104 11.0826H32.3132V7.64609Z"
                        fill="white"
                      />
                      <path
                        d="M38.6872 11.8297C39.853 11.8297 40.5679 11.1225 40.5679 9.95038C40.5679 8.78495 39.8494 8.07441 38.6872 8.07441C37.5213 8.07441 36.8028 8.78495 36.8028 9.95038C36.8028 11.1225 37.5177 11.8297 38.6872 11.8297ZM38.6872 11.1955C38.0016 11.1955 37.6167 10.7406 37.6167 9.95038C37.6167 9.16679 38.0016 8.70859 38.6872 8.70859C39.3691 8.70859 39.7577 9.16679 39.7577 9.95038C39.7577 10.7373 39.3691 11.1955 38.6872 11.1955Z"
                        fill="white"
                      />
                      <path
                        d="M46.656 8.14413H45.8678L45.1565 10.9033H45.0942L44.273 8.14413H43.5177L42.6965 10.9033H42.6379L41.923 8.14413H41.1237L42.2236 11.76H43.0338L43.855 9.09706H43.9174L44.7422 11.76H45.5598L46.656 8.14413Z"
                        fill="white"
                      />
                      <path
                        d="M47.5637 11.76H48.352V9.64492C48.352 9.08046 48.7222 8.72851 49.3052 8.72851C49.8881 8.72851 50.1667 9.01738 50.1667 9.59843V11.76H50.9549V9.41913C50.9549 8.55917 50.4637 8.07441 49.5728 8.07441C48.9715 8.07441 48.5756 8.31679 48.3813 8.71855H48.3226V8.14413H47.5637V11.76Z"
                        fill="white"
                      />
                      <path
                        d="M52.1963 11.76H52.9845V6.733H52.1963V11.76Z"
                        fill="white"
                      />
                      <path
                        d="M55.949 11.8297C57.1149 11.8297 57.8298 11.1225 57.8298 9.95038C57.8298 8.78495 57.1112 8.07441 55.949 8.07441C54.7832 8.07441 54.0646 8.78495 54.0646 9.95038C54.0646 11.1225 54.7795 11.8297 55.949 11.8297ZM55.949 11.1955C55.2634 11.1955 54.8785 10.7406 54.8785 9.95038C54.8785 9.16679 55.2634 8.70859 55.949 8.70859C56.6309 8.70859 57.0195 9.16679 57.0195 9.95038C57.0195 10.7373 56.6309 11.1955 55.949 11.1955Z"
                        fill="white"
                      />
                      <path
                        d="M60.1783 11.2187C59.7494 11.2187 59.4378 11.0295 59.4378 10.7041C59.4378 10.3853 59.6871 10.216 60.237 10.1828L61.2122 10.1264V10.4285C61.2122 10.8768 60.7722 11.2187 60.1783 11.2187ZM59.9767 11.8197C60.5009 11.8197 60.9372 11.6139 61.1755 11.2519H61.2378V11.76H61.9967V9.28964C61.9967 8.52597 61.4322 8.07441 60.4313 8.07441C59.5257 8.07441 58.8805 8.47285 58.7998 9.09374H59.5624C59.6504 8.83808 59.9547 8.69199 60.3946 8.69199C60.9336 8.69199 61.2122 8.90781 61.2122 9.28964V9.60175L60.1307 9.6582C59.1811 9.71132 58.6459 10.0865 58.6459 10.7373C58.6459 11.398 59.2068 11.8197 59.9767 11.8197Z"
                        fill="white"
                      />
                      <path
                        d="M64.6716 11.8197C65.2215 11.8197 65.6871 11.584 65.9254 11.1889H65.9877V11.76H66.743V6.733H65.9548V8.71855H65.8961C65.6798 8.32011 65.2178 8.08437 64.6716 8.08437C63.6634 8.08437 63.0145 8.8082 63.0145 9.95038C63.0145 11.0959 63.6561 11.8197 64.6716 11.8197ZM64.8952 8.72519C65.5551 8.72519 65.9694 9.19999 65.9694 9.9537C65.9694 10.7107 65.5588 11.1789 64.8952 11.1789C64.228 11.1789 63.8284 10.7174 63.8284 9.95038C63.8284 9.19003 64.2316 8.72519 64.8952 8.72519Z"
                        fill="white"
                      />
                      <path
                        d="M71.8544 11.8297C73.0202 11.8297 73.7351 11.1225 73.7351 9.95038C73.7351 8.78495 73.0165 8.07441 71.8544 8.07441C70.6885 8.07441 69.97 8.78495 69.97 9.95038C69.97 11.1225 70.6849 11.8297 71.8544 11.8297ZM71.8544 11.1955C71.1688 11.1955 70.7838 10.7406 70.7838 9.95038C70.7838 9.16679 71.1688 8.70859 71.8544 8.70859C72.5363 8.70859 72.9249 9.16679 72.9249 9.95038C72.9249 10.7373 72.5363 11.1955 71.8544 11.1955Z"
                        fill="white"
                      />
                      <path
                        d="M74.7785 11.76H75.5667V9.64492C75.5667 9.08046 75.937 8.72851 76.5199 8.72851C77.1029 8.72851 77.3815 9.01738 77.3815 9.59843V11.76H78.1697V9.41913C78.1697 8.55917 77.6785 8.07441 76.7876 8.07441C76.1863 8.07441 75.7904 8.31679 75.5961 8.71855H75.5374V8.14413H74.7785V11.76Z"
                        fill="white"
                      />
                      <path
                        d="M81.8 7.24433V8.16074H81.1657V8.76171H81.8V10.8037C81.8 11.501 82.1483 11.7799 83.0245 11.7799C83.1785 11.7799 83.3251 11.7633 83.4534 11.7434V11.149C83.3434 11.159 83.2738 11.1656 83.1528 11.1656C82.7605 11.1656 82.5882 10.9996 82.5882 10.6211V8.76171H83.4534V8.16074H82.5882V7.24433H81.8Z"
                        fill="white"
                      />
                      <path
                        d="M84.5115 11.76H85.2997V9.64824C85.2997 9.10038 85.659 8.73183 86.3042 8.73183C86.8615 8.73183 87.1585 9.02402 87.1585 9.60175V11.76H87.9467V9.42578C87.9467 8.56581 87.4224 8.07773 86.5719 8.07773C85.9706 8.07773 85.549 8.32011 85.3547 8.72519H85.2924V6.733H84.5115V11.76Z"
                        fill="white"
                      />
                      <path
                        d="M90.7902 8.68203C91.3731 8.68203 91.7544 9.05058 91.7727 9.61835H89.7563C89.8003 9.0539 90.2073 8.68203 90.7902 8.68203ZM91.769 10.7838C91.6224 11.066 91.2961 11.2221 90.8195 11.2221C90.1889 11.2221 89.782 10.8203 89.7563 10.1861V10.1463H92.5756V9.89726C92.5756 8.76171 91.9047 8.07441 90.7938 8.07441C89.6683 8.07441 88.9534 8.8082 88.9534 9.96367C88.9534 11.1191 89.6537 11.8297 90.7975 11.8297C91.7104 11.8297 92.3483 11.4312 92.5279 10.7838H91.769Z"
                        fill="white"
                      />
                      <path
                        d="M21.8793 16.2407C21.8984 14.8959 22.6959 13.6234 23.9609 12.919C23.1629 11.8867 21.8261 11.2323 20.4354 11.1929C18.9521 11.0519 17.5141 11.9967 16.7582 11.9967C15.9877 11.9967 14.8239 11.2069 13.5707 11.2302C11.9372 11.278 10.4143 12.1191 9.6196 13.4125C7.91123 16.0912 9.18552 20.0281 10.822 22.1934C11.6408 23.2537 12.5976 24.438 13.8497 24.396C15.075 24.35 15.5326 23.6884 17.0115 23.6884C18.4768 23.6884 18.9061 24.396 20.1836 24.3693C21.4983 24.35 22.3267 23.3043 23.1167 22.234C23.705 21.4785 24.1577 20.6435 24.458 19.76C22.9129 19.1682 21.8811 17.76 21.8793 16.2407Z"
                        fill="white"
                      />
                      <path
                        d="M19.4663 9.76886C20.1832 8.98949 20.5364 7.98775 20.4508 6.97636C19.3556 7.08054 18.344 7.55459 17.6175 8.30405C16.907 9.03632 16.5373 10.0204 16.6072 10.9932C17.7028 11.0034 18.7798 10.5422 19.4663 9.76886Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>
<script>
import { VTamkinPlayer } from "../../tamkin-video-player/tamkin-video-player.mjs";
import "@/tamkin-library/src/index.css";
import lottie from "lottie-web";
import animationData from "@/pages/handload[1].json"; // مسار ملف JSON للأنيميشن
export default {
  components: {
    VTamkinPlayer,
  },
  data() {
    return {
      videoUrl: "http://api.tamkin.app/videos/qgndjdvvp2/tamgh1qh7PlDa.mp4",
      bigpicMode: true,
      textAlign: "center",
      color: "#ffff",
      fontStyle: "normal",
      fontCap: "none",
      lineHeight: 25,
      letterSpacing: 3,
      fontName: "Roboto",
      size: "16px",
      lines: "2",
      underline: "normal",
      fontWeight: "normal",
      bg: "#00000",
      showpdf: false,
      showDialog: false,
      appLinks: {},
      isLoading: true,
      copySuccess: false,
      screenWidth: typeof window !== "undefined" ? window.innerWidth : 0,
      charHeight: 338,
      charWidth: 249,
      projectText: "",
      projectData: {},
      projectCharacter: "",
      projectId: this.$route.params.id,
      apiResponse: null,
      isCharacterReady: false,
      user_image: null,
      isCharacterLoaded: false,
      lottieInstance: null,
    };
  },
  methods: {
    triggerAdAnimation3() {
      if (this.projectData.type === "image") {
        // تحقق إذا كانت `type` هي "image"
        if (typeof window !== "undefined" && window.getAdAnimate) {
          window.getAdAnimate(this.projectData.text, 1); // تنفيذ الأنيميشن إذا تم توفر الشرط
        } else {
          console.warn("window.getAdAnimate is not available.");
        }
      }
    },
    triggerAdAnimation() {
      if (typeof window !== "undefined" && window.getAdAnimate) {
        // معالجة النص لإزالة التوقيتات والأرقام
        let cleanedText = this.projectData.text
          .replace(/^\d+\s*$/gm, "") // إزالة الأرقام على الأسطر المنفصلة
          .replace(/\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}/g, "") // إزالة التوقيتات
          .replace(/\n{2,}/g, "\n") // إزالة الأسطر الفارغة الإضافية
          .trim(); // تنظيف النص من الفراغات

        // تقسيم النص إلى أسطر
        const lines = cleanedText
          .split("\n")
          .filter((line) => line.trim() !== "");

        // دالة لتمرير كل سطر على حدة
        const sendLine = (index) => {
          if (index < lines.length) {
            console.log(`Sending line ${index + 1}: ${lines[index]}`);
            window.getAdAnimate(lines[index], 2);

            // استدعاء السطر التالي بعد 2 ثانية
            setTimeout(() => sendLine(index + 1), 29000);
          }
        };

        // بدء الإرسال من أول سطر
        sendLine(0);
      } else {
        console.warn("window.getAdAnimate is not available.");
      }
    },
    async fetchProjectData() {
      try {
        const response = await fetch(
          `https://api.tamkin.app/v1/api/mobile/shareproject/${this.projectId}`
        );
        const result = await response.json();

        if (result.statusCode === 200 && result.succeeded) {
          this.projectData = result.data;
          this.loadfares();
          console.log(this.projectData.type);
          if (this.projectData.type !== "Text") {
            this.$router.push({ name: "notFound2" });
          }
        } else {
          this.$router.push({ name: "notFound2" });
          console.error("Error fetching project data:", result.message);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async loadfares() {
      try {
        await Promise.all([
          this.loadScript("https://cdn.tamkin.app/runtime.js"),
          this.loadScript("https://cdn.tamkin.app/app.js"),
          this.loadCSS("https://cdn.tamkin.app/app.css"),
        ]);
        console.log("All assets loaded successfully");
        this.setDimensions();
      } catch (error) {
        console.error("Error loading assets:", error);
      }
    },
    loadCSS(href) {
      return new Promise((resolve, reject) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        link.onload = () => resolve();
        link.onerror = () => reject(new Error(`Failed to load CSS: ${href}`));
        document.head.appendChild(link);
      });
    },
    loadScript(src) {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () =>
          reject(new Error(`Failed to load script: ${src}`));
        document.body.appendChild(script);
      });
    },
    setDimensions() {
      if (process.client && window.adjustCameraBasedOnCharacter) {
        window.adjustCameraBasedOnCharacter(1, this.charWidth, this.charHeight);
      }
    },
    async loadCharacter() {
      await this.fetchProjectData();
      await this.loadfares();
    },
    displayCharacterExplanation(text) {
      const tamkinCharacter = document.querySelector(
        "tamkin-sdk-web-character"
      );
      if (tamkinCharacter) {
        tamkinCharacter.say(text);
      } else {
        console.error("Tamkin character element not found to say the text");
      }
    },
    updateDimensions(newHeight) {
      this.charHeight = newHeight;
      this.setDimensions();
    },
    async fetchAppLinks() {
      try {
        const response = await fetch(
          "https://api.tamkin.app/v1/api/Mobile/shareProjectLinks"
        );
        const result = await response.json();
        if (result.statusCode === 200 && result.succeeded) {
          this.appLinks = result.data;
        } else {
          console.error("Error fetching app links:", result.message);
        }
      } catch (error) {
        console.error("Failed to fetch app links:", error);
      }
    },
    copyToClipboard(text) {
      if (text) {
        navigator.clipboard
          .writeText(text)
          .then(() => {
            console.log("تم النسخ بنجاح!");
          })
          .catch((err) => {
            console.error("فشل النسخ:", err);
          });
      } else {
        alert("لا يوجد نص لنسخه!");
      }
    },
    checkCharacterLoaded() {
      const interval = setInterval(() => {
        if ( window.loaded) {
          this.isCharacterLoaded = true;
          clearInterval(interval);
          this.lottieInstance.destroy();
        }
      }, 100);
    },
    // مشاركة الرابط على فيسبوك
    shareOnFacebook() {
      const text = encodeURIComponent(this.projectData.share_link); // النص الموجود في input
      const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${text}`; // تضمين النص في الرابط
      window.open(fbUrl, "_blank", "width=600,height=400"); // فتح الرابط في نافذة جديدة
    },

    // مشاركة الرابط على تويتر
    shareOnTwitter() {
      const shareUrl = encodeURIComponent(this.projectData.share_link);
      const twitterUrl = `https://twitter.com/intent/tweet?url=${shareUrl}`;
      window.open(twitterUrl, "_blank", "width=600,height=400");
    },

    // مشاركة الرابط على لينكيدإن
    shareOnLinkedIn() {
      const shareUrl = encodeURIComponent(this.projectData.share_link);
      const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
      window.open(linkedinUrl, "_blank", "width=600,height=400");
    },
    shareOnTikTok() {
      const shareUrl = encodeURIComponent(this.projectData.share_link);
      const tiktokUrl = `https://www.tiktok.com/upload?url=${shareUrl}`;
      window.open(tiktokUrl, "_blank", "width=600,height=400");
    },
    // مشاركة الرابط على تيليجرام
    shareOnTelegram() {
      const shareUrl = encodeURIComponent(this.projectData.share_link);
      const telegramUrl = `https://t.me/share/url?url=${shareUrl}`;
      window.open(telegramUrl, "_blank", "width=600,height=400");
    },

    // مشاركة الرابط على واتساب
    shareOnWhatsApp() {
      const shareUrl = encodeURIComponent(this.projectData.share_link);
      const whatsappUrl = `https://wa.me/?text=${shareUrl}`;
      window.open(whatsappUrl, "_blank", "width=600,height=400");
    },
    shareOnSnapchat() {
      const linkToShare = encodeURIComponent(this.projectData.share_link); // ترميز الرابط
      const snapchatUrl = `https://snapchat.com/`; // الرابط لمشاركة الموقع على سناب شات
      window.open(snapchatUrl, "_blank", "width=600,height=400");
    },
    shareOnYouTube() {
      const shareUrl = encodeURIComponent(this.projectData.share_link);
      const youtubeUrl = `https://www.youtube.com/upload`;
      window.open(youtubeUrl, "_blank", "width=600,height=400");
    },
    // مشاركة الرابط على ريديت
    shareOnReddit() {
      const shareUrl = encodeURIComponent(this.projectData.share_link);
      const redditUrl = `https://reddit.com/submit?url=${shareUrl}`;
      window.open(redditUrl, "_blank", "width=600,height=400");
    },

    // مشاركة الرابط على بينترست
    shareOnPinterest() {
      const shareUrl = encodeURIComponent(this.projectData.share_link);
      const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${shareUrl}`;
      window.open(pinterestUrl, "_blank", "width=600,height=400");
    },
    shareOnGitHub() {
      const shareUrl = encodeURIComponent(this.projectData.share_link);
      const githubUrl = `https://github.com/${shareUrl}`; // ضع اسم المستودع أو الرابط الذي تريد مشاركته
      window.open(githubUrl, "_blank", "width=600,height=400");
    },
    shareOnMessenger() {
      const linkToShare = encodeURIComponent(this.projectData.share_link); // ترميز الرابط
      const messengerUrl = `https://m.me?link=${linkToShare}`;
      window.open(messengerUrl, "_blank", "width=600,height=400");
    },
    // مشاركة الرابط على تمبلر
    shareOnTumblr() {
      const shareUrl = encodeURIComponent(this.projectData.share_link);
      const tumblrUrl = `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${shareUrl}`;
      window.open(tumblrUrl, "_blank", "width=600,height=400");
    },
    shareOnReddit() {
      const linkToShare = encodeURIComponent(this.projectData.share_link); // ترميز الرابط
      const redditUrl = `https://www.reddit.com/submit?url=${linkToShare}`; // رابط المشاركة في Reddit
      window.open(redditUrl, "_blank", "width=600,height=400");
    },
    shareOnDiscord() {
      const linkToShare = encodeURIComponent(this.projectData.share_link); // ترميز الرابط
      const discordUrl = `https://discord.com/channels/@me`; // يفتح تطبيق Discord مباشرة
      window.open(discordUrl, "_blank", "width=600,height=400");
    },
    shareOnTwitch() {
      const linkToShare = encodeURIComponent(this.projectData.share_link); // ترميز الرابط
      const twitchUrl = `https://www.twitch.tv/`; // توجيه المستخدم الى موقع تويتش
      window.open(twitchUrl, "_blank", "width=600,height=400");
    },
    shareOnInstagram() {
      const shareUrl = encodeURIComponent(this.projectData.share_link); // الربط الذي تريد نشره
      const instagramUrl = `https://www.instagram.com/?url=${shareUrl}`; // يمكن ربطه بأي صفحة في إنستغرام أو رابط خارجي
      window.open(instagramUrl, "_blank", "width=600,height=400"); // فتح الرابط في نافذة جديدة
    },
    shareOnThreads() {
      const linkToShare = this.projectData.share_link; // الرابط
      // نسخ الرابط إلى الحافظة
      navigator.clipboard
        .writeText(linkToShare)
        .then(() => {
          alert("تم نسخ الرابط! افتح Threads والصقه للمشاركة.");
        })
        .catch((err) => {
          console.error("فشل نسخ الرابط:", err);
        });

      // قد ترغب في فتح صفحة Threads للإشارة إلى المستخدم
      const threadsUrl = `https://www.threads.net/`;
      window.open(threadsUrl, "_blank");
    },

    simulateClick() {
      // محاكاة حدث النقر على الـ SVG بعد أن يصبح العنصر جاهز
      const event = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      });
      const button = document.querySelector("#svgElement");

      if (button) {
        button.dispatchEvent(event); // محاكاة النقر على الزر
      }
    },
  },
  computed: {
    isSmallScreen() {
      return this.screenWidth <= 768;
    },
    cardWidth() {
      return this.isSmallScreen
        ? "100%"
        : this.screenWidth > 1024
        ? "640px"
        : "100%";
    },
    cardHeight() {
      return this.isSmallScreen
        ? "auto"
        : this.screenWidth > 1024
        ? "374px"
        : "300px";
    },
    dialogMaxWidth() {
      return this.isSmallScreen
        ? "100%"
        : this.screenWidth > 1024
        ? "640px"
        : "640px";
    },
    dialogTransition() {
      return this.isSmallScreen
        ? "slide-y-reverse-transition"
        : "scale-transition";
    },
    dialogContentClass() {
      return this.isSmallScreen ? "dialog-small-screen" : "";
    },
  },

  mounted() {
    this.lottieInstance = lottie.loadAnimation({
      container: document.getElementById("loading-container"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData,
    });

    this.checkCharacterLoaded();
    this.fetchProjectData();
    window.addEventListener("resize", this.updateScreenWidth);
    this.projectId = this.$route.params.id;
    this.fetchAppLinks();
    this.setDimensions();

    const checkInterval = setInterval(() => {
      if (this.isCharacterLoaded) {
        clearInterval(checkInterval);

        this.simulateClick();
      }
    }, 1000);

    const tamkinCharacter = this.$refs.tamkinCharacter;
    if (tamkinCharacter && tamkinCharacter.adjustCameraBasedOnCharacter) {
      tamkinCharacter.adjustCameraBasedOnCharacter(
        1,
        this.charWidth,
        this.charHeight
      );
    }

    this.setDimensions();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateScreenWidth);
  },
};
</script>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
h1 {
  font-family: Poppins;
  font-size: 20px;
  font-weight: 700;
  line-height: 34px;
  letter-spacing: -0.16500000655651093px;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}
.mdi-circle {
  color: #444444;
}

@media (max-width: 767px) {
  .close-btn-wrapperl {
    position: static;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    transform: 0px !important;
    background: none !important;
    z-index: 300;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

/* Define the slide-out animation */
@keyframes slideOutTop {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-50px); /* يمكنك تعديل المسافة هنا حسب رغبتك */
  }
}
@keyframes custom-slide-up {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 767px) {
  .v-dialog__content {
    animation: custom-slide-up 0.5s ease-out; /* تطبيق الحركة للديالوج عند فتحه */
  }
}
/* زر الإغلاق (شكل الزر نفسه) */
.close-btn {
  width: 36px; /* حجم الزر */
  height: 36px;
  border-radius: 50%; /* زر دائري */
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* على الشاشات الكبيرة يكون الزر في الأعلى يسار */
@media (min-width: 768px) {
  .close-btn-wrapperl {
    position: absolute;
    top: -23px;
    left: 632px;
    animate: Smart animate;
    animation-timing-function: linear;
    animation-duration: 300ms;
    box-shadow: 0px 4px 24px 8px #51459f14;
    background: #424445;
    stroke-width: 3px;
    stroke: #424445;
    border-radius: 50%;
    width: 36px;
    height: 36px;
  }
  .close-btn {
    color: white !important;
  }
}

.con-tik {
  width: 100%; /* تعيين العرض بنسبة 100% */
  max-width: 720px; /* تعيين أقصى عرض ليكون 720px */
  margin: 0 auto; /* لجعل العنصر يتوسط الصفحة */
}

@media (max-width: 768px) {
  .con-tik {
    width: 90%; /* العرض في الشاشات الصغيرة (حتى 768px) سيكون 90% من العرض */
  }
}

@media (max-width: 480px) {
  .con-tik {
    width: 100%; /* العرض في الشاشات الأصغر (مثل الهواتف) سيكون 100% من العرض */
    padding: 0 15px; /* إضافة بعض المسافة ليميل الحواف بشكل أفضل على الهواتف */
  }
  .h2-tit {
    font-size: 11.34px !important;
    font-weight: 600 !important;
    line-height: 18.42px !important;
    display: inline !important;
  }
  .spa-tit {
    font-size: 9.21px !important;
    font-weight: 500 !important;
    line-height: 18.42px !important;
  }
  .di-tit {
    gap: 10px !important;
  }
  .cou-tit {
    font-size: 12px !important;
    font-weight: 400 !important;
    line-height: 18.42px !important;
  }
  .cou-tit > span {
    font-size: 12px !important;
    font-weight: 600 !important;
    line-height: 18.42px !important;
  }

  /* لجعل الكلمة تظهر بجانب الزر على الشاشات الصغيرة */
  .v-card-title {
    display: flex;
    align-items: center;
  }
  .dil-tit {
    height: 200px !important;
  }
}
.social-icons {
  display: flex;
  justify-content: space-around;
}
.social-icons {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 31px !important;
  margin-top: 20px;
  flex-wrap: wrap;
  padding: 30px;
}
v-icon {
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}
v-icon:hover {
  transform: scale(1.2);
}

/* إظهار المحتوى الكبير فقط على الشاشات الكبيرة */
.content-large {
  display: block;
}
svg {
  cursor: pointer;
}
.content-small {
  display: none;
}
/* إظهار المحتوى الصغير فقط على الشاشات الصغيرة */
@media (max-width: 768px) {
  .content-large {
    display: none;
  }

  .content-small {
    display: block;
  }
  .card-sml {
    bottom: -267px;
  }
}
.v-carousel__controls {
  color: black !important;
}
.mdi-circle {
  color: white;
  border: 1px solid #444444;
  border-radius: 50%;
}
.mdi-circle:hover,
.v-carousel__controls__item.v-btn--active .mdi-circle {
  color: #444444 !important;
  border: none;
}
.fshol-icon {
  width: 45.07px;
  height: 45.07px;
}

@media (max-width: 750px) {
  .fshol-icon {
    width: 28.02px; /* عرض أصغر للشاشات الصغيرة */
    height: 28.02px; /* ارتفاع أصغر للشاشات الصغيرة */
  }
}
.v-carousel__controls {
  height: 20px !important;
}
.v-carousel__controls {
  color: black !important;
}
.mdi-circle {
  color: white;
  border: 1px solid #444444;
  border-radius: 50%;
  fill: #444;
}
.mdi-circle:hover,
.v-carousel__controls__item.v-btn--active .mdi-circle {
  color: #444444 !important;
  border: none;
  fill: #444;
}
.dialog-small-screen {
  position: fixed !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  margin: 0 !important;
  transform: none !important;
  width: 100% !important;
  box-sizing: border-box;
}
.v-overlay__scrim {
  background: rgba(0, 0, 0, 0.99) !important; /* أسود مع شفافية 50% */
  opacity: var(--v-overlay-opacity, 0.9);
}
@keyframes slide-down {
  0% {
    opacity: 0;
    transform: translateY(-30%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 767px) {
  .v-dialog__content {
    animation: slide-down 0.5s ease-out; /* Apply the sliding effect on small screens */
  }
}
.custom-text-field {
  position: relative; /* ليكون الحقل قاعدة للمؤثرات */
  overflow: hidden; /* لمنع المحتوى من الخروج عن الحدود */
  pointer-events: auto; /* للسماح بالتحويم حتى مع الحقل المعطل */
}

.custom-text-field:hover {
  border-color: transparent !important;
}

.custom-text-field:hover::before {
  content: "";
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border-radius: 11px;
  border: 2px solid rgb(18, 199, 190);
}
.v-field__field {
  color: #626262 !important;
  font-family: Poppins;
  font-size: 17px !important;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 15px */
}

.tamkin-three-container {
  display: flex !important;
  justify-content: center !important;
}
.cons-tiks {
  position: relative; /* لضمان أن تكون الصورة خلف العناصر */
  background-image: url("../public/GradientMesh_Light.png"); /* مسار الصورة */
  background-size: cover; /* لتعبئة الخلفية بالمحتوى */
  background-position: center; /* لضبط الصورة في المنتصف */
  background-repeat: no-repeat; /* لمنع تكرار الصورة */
}

.cons-tiks::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.2;
  background-image: url("../public/GradientMesh_Light.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1; /* وضعها خلف العناصر */
}
/* إضافة التأثير الخاص بالتقاط حركة التمرير */
.tamkin-three-container > canvas {
  display: block !important;
  width: 507px !important;
  height: 480px !important;
  touch-action: none !important;
  margin-top: 61px !important;
}
</style>
