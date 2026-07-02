/**
 * Маппинг: калькулятор → нужное оборудование
 * 
 * Партнёрские ссылки Яндекс.Маркета (реферальная программа).
 * Формат: https://market.yandex.ru/cc/{code} (партнёрские ссылки)
 */

interface EquipmentItem {
  name: string
  desc: string
  price: string
  url: string
  icon: string
}

export const CALC_EQUIPMENT: Record<string, EquipmentItem[]> = {
  // Абсолютный спирт
  'kalkulyator-absolyutnogo-spirta': [
    {
      name: 'Ареометр АСП-3 (комплект)',
      desc: 'Набор из 3 ареометров для точного измерения крепости дистиллята',
      price: 'от 450 ₽',
      url: 'https://market.yandex.ru/cc/9xL3s8',
      icon: '📏'
    },
    {
      name: 'Мерный цилиндр 250 мл',
      desc: 'Стеклянный цилиндр для замеров ареометром. С носиком.',
      price: 'от 250 ₽',
      url: 'https://market.yandex.ru/cc/9xKpPY',
      icon: '🧪'
    },
    {
      name: 'Спиртометр бытовой 0–96%',
      desc: 'Простой спиртометр для домашнего использования',
      price: 'от 200 ₽',
      url: 'https://market.yandex.ru/cc/9xL2Ey',
      icon: '🌡️'
    }
  ],

  // Дробная перегонка
  'kalkulyator-drobnoj-peregonki': [
    {
      name: 'Термометр электронный со щупом',
      desc: 'Цифровой термометр для контроля температуры в колонне',
      price: 'от 500 ₽',
      url: 'https://market.yandex.ru/cc/9xKogi',
      icon: '🌡️'
    },
    {
      name: 'Дефлегматор (укрепляющая колонна)',
      desc: 'Повышает крепость и чистоту продукта при второй перегонке',
      price: 'от 2 500 ₽',
      url: 'https://market.yandex.ru/cc/9xKyrG',
      icon: '⚗️'
    },
    {
      name: 'Приёмные ёмкости с делениями',
      desc: 'Мерные стаканы для разделения фракций по объёму',
      price: 'от 300 ₽',
      url: 'https://market.yandex.ru/cc/9xKdJA',
      icon: '🫗'
    }
  ],

  // Отбор голов
  'kalkulyator-otbor-golov': [
    {
      name: 'Ареометр АСП-3 (комплект)',
      desc: 'Для точного измерения крепости перед расчётом голов',
      price: 'от 450 ₽',
      url: 'https://market.yandex.ru/cc/9xL2Ey',
      icon: '📏'
    },
    {
      name: 'Мерный цилиндр',
      desc: 'Для замеров крепости ареометром',
      price: 'от 250 ₽',
      url: 'https://market.yandex.ru/cc/9xKpPY',
      icon: '🧪'
    }
  ],

  // Разбавление самогона водой
  'kalkulyator-razbavleniya-samogona-vodoj': [
    {
      name: 'Спиртометр бытовой 0–96%',
      desc: 'Для контроля крепости до и после разбавления',
      price: 'от 200 ₽',
      url: 'https://market.yandex.ru/cc/9xL2Ey',
      icon: '🌡️'
    },
    {
      name: 'Стеклянная бутыль 20 л',
      desc: 'Для хранения и настаивания разбавленного продукта',
      price: 'от 800 ₽',
      url: 'https://market.yandex.ru/cc/9xL3CR',
      icon: '🍾'
    },
    {
      name: 'Воронка с фильтром',
      desc: 'Для удобного перелива и фильтрации',
      price: 'от 300 ₽',
      url: 'https://market.yandex.ru/cc/9xKfPd',
      icon: '🔽'
    }
  ],

  // Сахарная брага
  'kalkulyator-saharnoj-bragi': [
    {
      name: 'Дрожжи спиртовые турбо',
      desc: 'Сбраживают до 18–20% за 3–5 дней. Пачка на 25 л.',
      price: 'от 250 ₽',
      url: 'https://market.yandex.ru/cc/9xKmau',
      icon: '🦠'
    },
    {
      name: 'Ёмкость для брожения 30 л',
      desc: 'Пищевой пластик с гидрозатвором',
      price: 'от 1 200 ₽',
      url: 'https://market.yandex.ru/cc/9xKrTw',
      icon: '🪣'
    },
    {
      name: 'Гидрозатвор',
      desc: 'Классический или сухой — обязателен для брожения',
      price: 'от 100 ₽',
      url: 'https://market.yandex.ru/cc/9xKg39',
      icon: '💧'
    }
  ],

  // Себестоимость
  'kalkulyator-sebestoimosti-samogona': [
    {
      name: 'Самогонный аппарат «эконом»',
      desc: 'Базовый дистиллятор с сухопарником на 12–20 л',
      price: 'от 5 000 ₽',
      url: 'https://market.yandex.ru/cc/9xKxYG',
      icon: '🔧'
    },
    {
      name: 'Наборный самогонный аппарат',
      desc: 'С царгой и дефлегматором — для чистого продукта',
      price: 'от 12 000 ₽',
      url: 'https://market.yandex.ru/cc/9xKtWf',
      icon: '⚙️'
    }
  ],

  // Смешивание спиртов
  'kalkulyator-smeshivaniya-spirtov': [
    {
      name: 'Спиртометр АСП-3',
      desc: 'Точное измерение крепости для корректного смешивания',
      price: 'от 450 ₽',
      url: 'https://market.yandex.ru/cc/9xL2Ey',
      icon: '📏'
    },
    {
      name: 'Стеклянные бутыли с пробкой',
      desc: 'Для хранения смешанных спиртов',
      price: 'от 600 ₽',
      url: 'https://market.yandex.ru/cc/9xKqUP',
      icon: '🍾'
    }
  ],

  // Температура
  'kalkulyator-spirta-ot-temperatury': [
    {
      name: 'Электронный термометр-щуп',
      desc: 'Мгновенное измерение температуры дистиллята',
      price: 'от 500 ₽',
      url: 'https://market.yandex.ru/cc/9xKogi',
      icon: '🌡️'
    },
    {
      name: 'Инфракрасный термометр',
      desc: 'Бесконтактное измерение — не нужно опускать в жидкость',
      price: 'от 800 ₽',
      url: 'https://market.yandex.ru/cc/9xKogi',
      icon: '🔫'
    }
  ],

  // Водка из спирта
  'kalkulyator-vodki-iz-spirta': [
    {
      name: 'Спиртометр 0–96%',
      desc: 'Для точного соблюдения пропорций',
      price: 'от 200 ₽',
      url: 'https://market.yandex.ru/cc/9xL2Ey',
      icon: '🌡️'
    },
    {
      name: 'Уголь кокосовый активированный',
      desc: 'Для очистки водки от сивушных масел',
      price: 'от 350 ₽',
      url: 'https://market.yandex.ru/cc/9xKho4',
      icon: '🪨'
    },
    {
      name: 'Графин стеклянный с пробкой',
      desc: 'Красивая подача домашней водки',
      price: 'от 600 ₽',
      url: 'https://market.yandex.ru/cc/9xKqUP',
      icon: '🍶'
    }
  ],

  // Замена сахара декстрозой
  'kalkulyator-zameny-sahara-glyukozoj': [
    {
      name: 'Декстроза (глюкоза) пищевая',
      desc: 'Сбраживается чище сахара. Мягче вкус готового продукта.',
      price: 'от 200 ₽/кг',
      url: 'https://market.yandex.ru/cc/9xKih4',
      icon: '🍬'
    },
    {
      name: 'Дрожжи для фруктовых браг',
      desc: 'Специальные штаммы для декстрозных и фруктовых браг',
      price: 'от 300 ₽',
      url: 'https://market.yandex.ru/cc/9xKkW4',
      icon: '🦠'
    }
  ],

  // Разбавление после первого перегона
  'razbavlenie-samogona-vodoj-posle-pervoj-peregonki': [
    {
      name: 'Спиртометр АСП-3',
      desc: 'Измерение крепости спирта-сырца перед разбавлением',
      price: 'от 450 ₽',
      url: 'https://market.yandex.ru/cc/9xL2Ey',
      icon: '📏'
    },
    {
      name: 'Мерный цилиндр 500 мл',
      desc: 'Для точных замеров крепости',
      price: 'от 350 ₽',
      url: 'https://market.yandex.ru/cc/9xKpPY',
      icon: '🧪'
    },
    {
      name: 'Бентонит для осветления',
      desc: 'Очистка спирта-сырца перед второй перегонкой',
      price: 'от 150 ₽',
      url: 'https://market.yandex.ru/cc/9xKgpc',
      icon: '🪨'
    }
  ],

  // Примерная стоимость
  'primernaya-stoimost-samogona': [
    {
      name: 'Самогонный аппарат на 20 л',
      desc: 'Оптимальный объём для домашнего использования',
      price: 'от 8 000 ₽',
      url: 'https://market.yandex.ru/cc/9xL3s8',
      icon: '🔧'
    },
    {
      name: 'Индукционная плитка',
      desc: 'Безопасный нагрев без открытого огня. Экономия электричества.',
      price: 'от 2 500 ₽',
      url: 'https://market.yandex.ru/cc/9xKcRC',
      icon: '🔥'
    }
  ]
}
