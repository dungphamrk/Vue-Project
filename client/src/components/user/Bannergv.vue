<template>
  <div>
    <section class="attend-banner">
      <h1 class="attend-title text-center bg-blue-400 text-black font-bold rounded-lg py-4 mb-6">
        Hãy đăng kí khóa học cùng chúng tôi
      </h1>
      <div
        id="carouselExampleCaptions"
        class="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000"  
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="https://hocmai.vn/media/images/home/desktop/ban-sao-cua-122banner-webhuyendvt-1.png"
              class="d-block w-full"
              alt="..."
              style="height: 600px;"
            />
   
          </div>
          <div class="carousel-item">
            <img
              src="https://hocmai.vn/media/images/home/desktop/ban-sao-cua-121banner-webphuongpa-1.png"
              class="d-block w-full"
              alt="..."
              style="height: 600px;"
            />
        
          </div>
          <div class="carousel-item">
            <img
              src="https://hocmai.vn/media/images/home/desktop/222banner-webannpb-l-715-x-400-1.png"
              class="d-block w-full"
              alt="..."
              style="height: 600px;"
            />
       
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
</script>

<style scoped>
</style>
