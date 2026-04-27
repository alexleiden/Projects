// script.js

// Очікуємо завантаження DOM
document.addEventListener("DOMContentLoaded", function () {
  // Отримуємо всі елементи правил
  const rules = document.querySelectorAll(".rule");
  const emergencySection = document.getElementById("emergency-section");
  const toggleAnimationBtn = document.getElementById("toggle-animation");
  const poster = document.querySelector(".poster");

  // Змінні для контролю анімацій
  let animationsEnabled = true;

  // Функція для підсвічування правил при кліку
  function highlightRule(rule) {
    // Прибираємо підсвічування з усіх правил
    rules.forEach((r) => r.classList.remove("highlighted"));

    // Додаємо підсвічування до поточного правила
    rule.classList.add("highlighted");

    // Прибираємо підсвічування через 3 секунди
    setTimeout(() => {
      rule.classList.remove("highlighted");
    }, 3000);

    // Додаємо ефект тремтіння до іконки
    const icon = rule.querySelector(".icon");
    icon.style.animation = "shake 0.5s ease-in-out";

    setTimeout(() => {
      icon.style.animation = "";
    }, 500);
  }

  // Додаємо обробники подій для кожного правила
  rules.forEach((rule, index) => {
    rule.addEventListener("click", () => {
      highlightRule(rule);

      // Виводимо повідомлення в консоль для налагодження
      console.log(`Правило ${index + 1} було обране`);

      // Можна додати звуковий ефект або вібрацію (якщо підтримується)
      if ("vibrate" in navigator) {
        navigator.vibrate(100);
      }
    });

    // Додаємо обробник для ховера з затримкою
    let hoverTimeout;
    rule.addEventListener("mouseenter", () => {
      hoverTimeout = setTimeout(() => {
        if (animationsEnabled) {
          rule.style.transform = "translateX(15px) scale(1.02)";
        }
      }, 200);
    });

    rule.addEventListener("mouseleave", () => {
      clearTimeout(hoverTimeout);
      rule.style.transform = "";
    });
  });

  // Обробник для екстреної секції
  emergencySection.addEventListener("click", () => {
    // Миготіння екстреної секції
    emergencySection.style.animation = "none";
    setTimeout(() => {
      emergencySection.style.animation = "glow 1s ease-in-out 3";
    }, 10);

    // Показуємо модальне вікно з додатковою інформацією
    showEmergencyInfo();
  });

  // Функція для показу екстреної інформації
  function showEmergencyInfo() {
    const emergencyInfo = `
            🚨 ЕКСТРЕНА СИТУАЦІЯ 🚨
            
            101 - Служба порятунку
            102 - Поліція  
            103 - Швидка допомога
            
            ПАМ'ЯТАЙ:
            • Зберігай спокій
            • Чітко опиши ситуацію
            • Назви точну адресу
            • Не кладь слухавку першим
        `;

    alert(emergencyInfo);
  }

  // Обробник для перемикання анімацій
  toggleAnimationBtn.addEventListener("click", () => {
    animationsEnabled = !animationsEnabled;

    if (animationsEnabled) {
      poster.classList.remove("no-animations");
      toggleAnimationBtn.textContent = "Вимкнути анімації";
    } else {
      poster.classList.add("no-animations");
      toggleAnimationBtn.textContent = "Увімкнути анімації";
    }

    // Зберігаємо стан в локальному сховищі браузера
    localStorage.setItem("animationsEnabled", animationsEnabled);
  });

  // Завантажуємо збережені налаштування анімацій
  const savedAnimationState = localStorage.getItem("animationsEnabled");
  if (savedAnimationState !== null) {
    animationsEnabled = savedAnimationState === "true";
    if (!animationsEnabled) {
      poster.classList.add("no-animations");
      toggleAnimationBtn.textContent = "Увімкнути анімації";
    }
  }

  // Додаємо CSS для анімації тремтіння
  const style = document.createElement("style");
  style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px) rotate(-5deg); }
            75% { transform: translateX(5px) rotate(5deg); }
        }
        
        .rule-text strong {
            transition: color 0.3s ease;
        }
        
        .highlighted .rule-text strong {
            color: #e67e22;
        }
    `;
  document.head.appendChild(style);

  // Додаємо обробник для кольорових зразків
  const colorBoxes = document.querySelectorAll(".color-box");
  colorBoxes.forEach((box) => {
    box.addEventListener("click", () => {
      const colorName = box.querySelector("span").textContent;
      const colorSample = box.querySelector(".color-sample");

      // Тимчасово змінюємо розмір та додаємо ефект
      colorSample.style.transform = "scale(1.5) rotate(720deg)";

      setTimeout(() => {
        colorSample.style.transform = "";
        alert(
          `Колір: ${colorName}\n\nЦей колір використовується для позначення відповідних зон та обладнання в майстерні.`
        );
      }, 600);
    });
  });

  // Додаємо плавну прокрутку для великих екранів
  if (window.innerHeight < poster.offsetHeight) {
    let isScrolling = false;

    function autoScroll() {
      if (!isScrolling && animationsEnabled) {
        isScrolling = true;
        window.scrollTo({
          top: poster.offsetHeight,
          behavior: "smooth",
        });

        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });

          setTimeout(() => {
            isScrolling = false;
          }, 2000);
        }, 8000);
      }
    }

    // Запускаємо автопрокрутку через 10 секунд після завантаження
    setTimeout(autoScroll, 10000);
  }

  // Додаємо обробник для зміни розміру вікна
  window.addEventListener("resize", () => {
    // Пересчитуємо розміри при зміні орієнтації на мобільних пристроях
    if (window.innerWidth <= 768) {
      poster.style.margin = "10px";
    } else {
      poster.style.margin = "0 auto";
    }
  });

  // Функція для виведення статистики взаємодії
  function logInteraction(action, element) {
    const timestamp = new Date().toLocaleString("uk-UA");
    console.log(`[${timestamp}] Дія: ${action}, Елемент: ${element}`);
  }

  // Додаємо лічильники взаємодії
  let clickCounter = 0;
  let hoverCounter = 0;

  document.addEventListener("click", (e) => {
    clickCounter++;
    logInteraction("клік", e.target.className || e.target.tagName);

    if (clickCounter % 10 === 0) {
      console.log(`Загальна кількість кліків: ${clickCounter}`);
    }
  });

  document.addEventListener("mouseover", (e) => {
    if (
      e.target.classList.contains("rule") ||
      e.target.classList.contains("color-box")
    ) {
      hoverCounter++;

      if (hoverCounter % 20 === 0) {
        console.log(`Загальна кількість ховерів: ${hoverCounter}`);
      }
    }
  });

  console.log("🛡️ Плакат безпечної роботи в майстерні завантажено успішно!");
  console.log("💡 Клікайте на правила для їх підсвічування");
  console.log(
    "🎨 Наводьте курсор на кольорові зразки для додаткової інформації"
  );
});
