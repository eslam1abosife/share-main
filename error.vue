<template>
  <div
    style="
      background: #311b92;
      width: 100%;
      height: 100vh;
      color: white;
      background: #ffffff;
    "
  >
    <!-- عنصر الصورة الثانية -->
    <div style="width: 100%">
      <img src="/GradientMesh_Light.png" width="100%" alt="" />
    </div>
    <!-- العنصر المركزي -->
    <v-container
      class="md-cong"
      style="align-items: center; position: absolute; left: 25%; top: 25%"
    >
      <v-row>
        <v-col :cols="12" :md="2">
          <!-- صورة الروبوت -->
          <div>
            <img src="/public/Robot.png" alt="" /></div
        ></v-col>
        <v-col :cols="8" :md="10"
          ><!-- الكتابة -->
          <div>
            <svg
              class="mb-4"
              width="173"
              height="62"
              viewBox="0 0 173 62"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.732939 48.994V38.2182L26.9624 1.71416H44.0867L18.6091 38.2182L10.7569 35.8793H56.4497V48.994H0.732939ZM31.6403 60.1875V48.994L32.1415 35.8793V25.9388H47.7622V60.1875H31.6403ZM85.6191 61.357C80.6071 61.357 76.152 60.1597 72.2538 57.765C68.4113 55.3704 65.3762 51.9177 63.1487 47.4069C60.9211 42.8961 59.8073 37.4107 59.8073 30.9508C59.8073 24.4909 60.9211 19.0056 63.1487 14.4948C65.3762 9.98396 68.4113 6.53125 72.2538 4.13663C76.152 1.74201 80.6071 0.544696 85.6191 0.544696C90.5754 0.544696 94.9749 1.74201 98.8174 4.13663C102.716 6.53125 105.778 9.98396 108.006 14.4948C110.234 19.0056 111.347 24.4909 111.347 30.9508C111.347 37.4107 110.234 42.8961 108.006 47.4069C105.778 51.9177 102.716 55.3704 98.8174 57.765C94.9749 60.1597 90.5754 61.357 85.6191 61.357ZM85.6191 47.8246C87.4012 47.8246 88.9605 47.2677 90.297 46.1539C91.6892 45.0401 92.7751 43.2581 93.5548 40.8078C94.3344 38.3018 94.7243 35.0161 94.7243 30.9508C94.7243 26.8299 94.3344 23.5442 93.5548 21.0939C92.7751 18.6436 91.6892 16.8615 90.297 15.7478C88.9605 14.634 87.4012 14.0771 85.6191 14.0771C83.8371 14.0771 82.2499 14.634 80.8577 15.7478C79.5212 16.8615 78.4353 18.6436 77.5999 21.0939C76.8203 23.5442 76.4305 26.8299 76.4305 30.9508C76.4305 35.0161 76.8203 38.3018 77.5999 40.8078C78.4353 43.2581 79.5212 45.0401 80.8577 46.1539C82.2499 47.2677 83.8371 47.8246 85.6191 47.8246ZM116.407 48.994V38.2182L142.636 1.71416H159.761L134.283 38.2182L126.431 35.8793H172.124V48.994H116.407ZM147.314 60.1875V48.994L147.816 35.8793V25.9388H163.436V60.1875H147.314Z"
                fill="url(#paint0_linear_406_791)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_406_791"
                  x1="-89.2206"
                  y1="18.9635"
                  x2="-52.7958"
                  y2="136.808"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#B2EBF2" />
                  <stop offset="0.653477" stop-color="#D1C4E9" />
                  <stop offset="1" stop-color="#F8BBD0" />
                </linearGradient>
              </defs>
            </svg>
            <h2
              class="ftext-mid"
              style="
                font-family: Montserrat;
                font-size: 26.85px;
                font-weight: 500;
                line-height: 32.73px;
                color: black;
                text-align: left;
              "
            >
              This page could not be found
            </h2>
            <p
              class="ftext-mid"
              style="
                font-family: Montserrat;
                font-size: 17.9px;
                font-weight: 500;
                line-height: 26.85px;
                margin-top: 26px;
                text-align: left;
                color: black;
              "
            >
              You can either stay and chill here, or go back to the beginning.
            </p>
            <!-- زر العودة -->
            <v-btn
              style="
                width: 152px;
                height: 35px;
                margin-top: 40px;
                border-radius: 10px;
                font-family: Poppins;
                font-size: 15px;
                font-weight: 600;
                color: #ffffff;
                background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);
              "
            >
              GO Back
            </v-btn>
          </div></v-col
        >
      </v-row>
    </v-container>
  </div>
</template>
<style>
@media (max-width: 600px) {
  .ftext-mid {
    font-size: 16px !important;
    line-height: 25px !important;
  }
  .md-cong {
    top: 20px !important;
    left: 50px !important;
  }
}
</style>
