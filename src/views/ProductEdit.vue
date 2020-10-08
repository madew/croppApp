<template>
  <div class="page-wrap">
    <div class="product-header">
      <h1>{{ product.name }}</h1>
      <p class="product-width">
        Width:
        <input type="number" v-model="ratioX" />
      </p>
      <p class="product-height">
        Height:
        <input type="number" v-model="ratioY" />
      </p>
      <div class="actions">
        <a href="#" role="button" @click.prevent="setAspectRatio">Set Aspect Ratio</a>
      </div>
    </div>

    <input ref="input" type="file" name="image" accept="image/*" @change="setImage" />

    <div class="content">
      <section class="action-area">
        <div class="btn-group">
          <ActionButton
            iconName="rotate-right"
            :action="() => rotate(1)"
            toolTip="Rotate Right 1&deg"
          />
          <ActionButton
            iconName="rotate-left"
            :action="() => rotate(-1)"
            toolTip="Rotate Left 1&deg"
          />
          <ActionButton
            iconName="rotate-right"
            :action="() => rotate(90)"
            toolTip="Rotate Right 90&deg"
          />
          <ActionButton
            iconName="rotate-left"
            :action="() => rotate(-90)"
            toolTip="Rotate Left 90&deg"
          />
        </div>
        <div class="btn-group">
          <ActionButton
            optionalRef="flipX"
            iconName="move-horizontal"
            :action="flipX"
            toolTip="Flip X Axis"
          />
          <ActionButton ref="flipY" iconName="move-vertical" :action="flipY" toolTip="Flip Y Axis" />
        </div>

        <div class="btn-group">
          <ActionButton iconName="x" :action="reset" toolTip="Reset" />
        </div>
        <div class="btn-group">
          <ActionButton
            optionalClass="btn--green"
            iconName="check"
            :action="cropImage"
            toolTip="Crop"
          />
        </div>
      </section>
      <section class="cropper-area">
        <div class="img-cropper">
          <box-icon v-if="isImageSrc" color="#ccc" size="md" name="image"></box-icon>
          <vue-cropper
            ref="cropper"
            :aspect-ratio="ratioX / ratioY"
            :src="imgSrc"
            preview=".preview"
            :zoomOnWheel="false"
            :zoomOnTouch="false"
          />
        </div>
        <div class="actions">
          <a href="#" role="button" @click.prevent="showFileChooser">Upload Image</a>
        </div>
      </section>
      <section class="preview-area">
        <div class="preview-wrap">
          <p>Preview</p>
          <div class="preview" />

          <!-- <p>Cropped Image</p>
        <div class="cropped-image">
          <img v-if="cropImg" :src="cropImg" alt="Cropped Image" />
          <div v-else class="crop-placeholder" />
          </div>-->
        </div>
        <div v-if="product.image" class="cropped-image">
          <p>Current Image</p>
          <div class="cropped-image-wrap">
            <img v-if="product.image" :src="encodeImageBase64()" alt="Current Image" />
          </div>
        </div>

        <div class="btn-center btn-wrap">
          <button
            class="btn btn--green btn-send-image"
            role="button"
            @click="sendImageToDB"
            :disabled="btnSendImageIsDisabled"
          >Send Image</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import ProductsService from '../services/ProductsService';
import ActionButton from '../components/ActionButton';

export default {
  components: {
    VueCropper,
    ActionButton
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      imgSrc: '',
      cropImg: '',
      data: null,
      ratioX: this.product.width,
      ratioY: this.product.height
    };
  },
  computed: {
    btnSendImageIsDisabled() {
      return !this.cropImg ? true : false;
    },
    setRatioX() {
      return this.$refs.cropper.setAspectRatio(this.ratioX / this.ratioY);
    },
    isImageSrc() {
      return !this.imgSrc;
    }
  },
  methods: {
    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper
        .getCroppedCanvas({
          imageSmoothingEnabled: false,
          imageSmoothingQuality: 'low'
        })
        .toDataURL('image/jpeg', 0.5);
    },
    encodeImageBase64() {
      const buffer = new Buffer(this.product.image.data);
      const bufferBase64 = buffer.toString();
      // const header = 'data:image/jpg;base64,';
      return bufferBase64;
    },
    flipX() {
      const dom = this.$refs.flipX;
      let scale = dom.getAttribute('data-scale');
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleX(scale);
      dom.setAttribute('data-scale', scale);
    },
    flipY() {
      const dom = this.$refs.flipY;
      let scale = dom.getAttribute('data-scale');
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleY(scale);
      dom.setAttribute('data-scale', scale);
    },
    reset() {
      this.$refs.cropper.reset();
    },
    rotate(deg) {
      this.$refs.cropper.rotate(deg);
    },

    setImage(e) {
      const file = e.target.files[0];
      if (file.type.indexOf('image/') === -1) {
        alert('Please select an image file');
        return;
      }
      if (typeof FileReader === 'function') {
        const reader = new FileReader();
        reader.onload = event => {
          this.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Sorry, FileReader API not supported');
      }
    },
    showFileChooser() {
      this.$refs.input.click();
    },
    setAspectRatio() {
      this.$refs.cropper.setAspectRatio(this.ratioX / this.ratioY);
    },
    sendImageToDB() {
      if (this.product.id && this.cropImg) {
        const product = {
          id: this.product.id,
          image: this.cropImg,
          width: parseInt(this.ratioX, 10),
          height: parseInt(this.ratioY, 10)
        };
        ProductsService.updateProductImage(product)
          .then(response => {
            if (response.status === 200);
            const notification = {
              type: 'success',
              message: 'Product sended successfully.'
            };
            this.$store.dispatch('addNotification', notification);
          })
          .catch(error => {
            const notification = {
              type: 'error',
              message: 'There was a problem sending product: ' + error.message
            };
            this.$store.dispatch('addNotification', notification);
          });
      }
    }
  }
};
</script>

<style scoped>
.page-wrap {
  background: #0e1822;
  display: flex;
  flex-direction: column;
  flex: 1;
}

input[type='file'] {
  display: none;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 5px 0;
}
.header h2 {
  margin: 0;
}
.header a {
  text-decoration: none;
  color: black;
}
.content {
  display: flex;
  justify-content: space-between;
  flex: 1;
}
.cropper-area {
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border: 3px dotted #424b54;
  margin: 1rem;
}
.cropper-area .actions a {
  margin-top: 1rem;
}
.actions a {
  display: inline-block;
  padding: 5px 15px;
  background: #424b54;
  color: white;
  text-decoration: none;
}
textarea {
  width: 100%;
  height: 100px;
}
.preview-area {
  width: 300px;
  display: flex;
  flex-direction: column;
  background: #24292e;
}
.preview-area p {
  font-size: 0.8rem;
  background: #424b54;
  width: 100%;
  padding: 0.35rem 0;
  margin: 0;
}

.preview-wrap {
  margin-bottom: 10px;
  background: #5e6872;
}

.preview {
  width: 100%;
  height: calc(372px * (9 / 16));
  overflow: hidden;
  /* padding: 0.5rem; */
  margin: 10px auto;
}
.crop-placeholder {
  width: 100%;
  height: 200px;
  background: #ccc;
}
.cropped-image img {
  object-fit: contain;
  width: 100%;
  background: #5e6872;
  height: calc(372px * (9 / 16));
  padding: 0.5rem;
  box-sizing: border-box;
}

.product-header {
  display: flex;
  align-items: center;
  background: #161e26;
  padding: 0 50px;
  border-top: 2px solid #0e1822;
}

.product-header .actions {
  margin-left: 25px;
}

.product-width > input,
.product-height input {
  font-weight: 300;
  border: none;
  font-size: 1rem;
  width: 100px;
  padding: 3px 0 3px 5px;
}

.product-width {
  margin-left: auto;
}

.product-height {
  margin-left: 10px;
}

.action-area {
  display: flex;
  flex-direction: column;
  background: #24292e;
}

.btn-group {
  margin-bottom: 10px;
}

.btn-wrap {
  margin-top: auto;
  padding: 10px 0;
  background-color: #424b54;
}

.btn-send-image {
  background-color: #424b54;
  border: none;
  padding: 0.5rem;
  display: block;
  cursor: pointer;
  font-size: 1rem;
  color: #fff;
  font-weight: bold;
  display: inline-block;
}

.btn-send-image:disabled {
  cursor: not-allowed;
  background-color: #bbb;
}
</style>
