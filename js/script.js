// день 4 видео 1 время 1:01:31
const API_URL = "";

const swiperThumb = new Swiper(".gift__swiper_thumb", {
  slidesPerView: "auto",
  spaceBetween: 12,
  freeMode: true,
  breakpoints: {
    320: {
      spaceBetween: 12,
    },
    1141: {
      spaceBetween: 16,
    },
  },
});

const swiperMain = new Swiper(".gift__swiper_card", {
  spaceBetween: 16,
  thumbs: {
    swiper: swiperThumb,
  },
});

const form = document.querySelector(".form");
const submitButton = form.querySelector(".form__button");
const phoneInputs = form.querySelectorAll(".form__field_phone");
const cardInput = form.querySelector(".form__card");

const updateCardInput = () => {
  const activeSide = document.querySelector(
    ".gift__swiper_card .swiper-slide-active"
  );

  const cardData = activeSide.querySelector(".gift__card-image").dataset.card;
  cardInput.value = cardData;
};

swiperMain.on("slideChangeTransitionEnd", updateCardInput);

for (let i = 0; i < phoneInputs.length; i++) {
  const element = phoneInputs[i];
  IMask(element, {
    mask: "+{7}(000)000-00-00",
  });
}

const updateSubmitButton = () => {
  let isFormField = true;
  for (const field of form.elements) {
    if (field.classList.contains("form__field")) {
      if (!field.value.trim()) {
        isFormField = false;
        break;
      }
    }
  }

  submitButton.disabled = !isFormField;
};

const phoneValidateOption = {
  // presence: {
  //   message: "Поле обязательно для заполнения",
  // },
  format: {
    pattern: "\\+7\\(\\d{3}\\)\\d{3}-\\d{2}-\\d{2}",
    message:
      '"Номер телефона должен соответствовать формату: "+7(XXX)XXX-XX-XX"',
  },
};

form.addEventListener("input", updateSubmitButton);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const errors = validate(form, {
    sender_phone: phoneValidateOption,
    receiver_phone: phoneValidateOption,
  });

  if (errors) {
    for (const key in errors) {
      const errorString = errors[key];
      alert(errorString);
    }
    return;
  }

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  form.reset();
});
