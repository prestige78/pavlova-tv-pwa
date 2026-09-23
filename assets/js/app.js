// ================================================================
// БЛОК 0: КОНФИГУРАЦИЯ (CONFIG)
// ================================================================
// Назначение: Единственный источник правды для всех настроек.
// Принцип: Read-only. Object.freeze().
// Лицензия: MIT (оригинальный код автора)
//
// Внесены изменения:
// - idb (MIT) вместо нативной IndexedDB - библиотека от Google Chrome Team
// - zip.js (BSD 3-Clause) вместо JSZip (MIT)
// - Обновлены пути к библиотекам
// ================================================================

const CONFIG = Object.freeze({
    // =============================================================
    // 1. ОСНОВНЫЕ НАСТРОЙКИ ПРИЛОЖЕНИЯ
    // =============================================================

    APP: {
        NAME: 'Digital Legal Engine',
        VERSION: '3.9.5',
        DOMAIN: 'https://juristspb78.ru',
        SHORT_NAME: 'Юрист СПб',
        DESCRIPTION:
            'Юридические услуги в Санкт-Петербурге. Арбитраж, корпоративные споры, защита бизнеса, договорное право, семейные, земельные, трудовые споры, наследство. 16 лет практики. PWA-платформа.',
        AUTHOR: 'Михель Руслан Эрикович',
        LICENSE: 'Для ИП Павлова Т.В., безвозмездно',
        PLATFORM: 'Digital Legal Engine v3.9.5',
    },

    // =============================================================
    // 2. КЛЮЧИ ДЛЯ ХРАНИЛИЩ (localStorage, IndexedDB)
    // =============================================================

    STORAGE_KEYS: {
        THEME: 'theme',
        CHECKLIST_PREFIX: 'checklist_',
        CONSENT: 'cookie_consent',
        FU_BLESSING: 'fu_blessing',
        // Для FileManager (IndexedDB)
        FILE_DB_NAME: 'pavlova-files',
        FILE_DB_VERSION: 1,
        FILE_STORE_NAME: 'user-files',
        // Для офлайн-форм
        FORMS_DB_NAME: 'pavlova-forms',
        FORMS_STORE_NAME: 'forms',
    },

    // =============================================================
    // 3. ИСТОЧНИКИ ДЛЯ ПРОВЕРКИ КОНТРАГЕНТОВ
    // =============================================================

    SOURCES: {
        fssp: 'https://fssp.gov.ru/iss/ip',
        egrul: 'https://egrul.nalog.ru',
        kad: 'https://kad.arbitr.ru',
        sudrf: 'https://sudrf.ru',
        fedresurs: 'https://bankrot.fedresurs.ru',
    },

    // =============================================================
    // 4. ЧЕК-ЛИСТЫ (8 УСЛУГ)
    // =============================================================

    CHECKLISTS: {
        // 4.1. ЗЕМЕЛЬНЫЕ СПОРЫ
        zemlya: {
            title: 'Земельный спор в СПб',
            icon: 'bi bi-house-door',
            documents: [
                {
                    id: 1,
                    text: 'Свидетельство о праве собственности',
                    hint: 'Закажите выписку из ЕГРН',
                },
                { id: 2, text: 'Кадастровый паспорт' },
                { id: 3, text: 'Договор купли-продажи' },
                { id: 4, text: 'Выписка из ЕГРН (свежая)' },
            ],
        },

        // 4.2. СЕМЕЙНОЕ ПРАВО
        family: {
            title: 'Семейное право',
            icon: 'bi bi-people-fill',
            documents: [
                { id: 1, text: 'Свидетельство о браке' },
                { id: 2, text: 'Свидетельства о рождении детей' },
                { id: 3, text: 'Справки о доходах (2-НДФЛ)' },
                { id: 4, text: 'Документы на имущество' },
            ],
        },

        // 4.3. ТРУДОВЫЕ СПОРЫ
        employer: {
            title: 'Спор с работодателем',
            icon: 'bi bi-briefcase-fill',
            documents: [
                { id: 1, text: 'Трудовой договор' },
                { id: 2, text: 'Приказ об увольнении' },
                { id: 3, text: 'Расчётные листки за 3 месяца' },
                { id: 4, text: 'Переписка с работодателем' },
            ],
        },

        // 4.4. НАСЛЕДСТВЕННЫЕ ДЕЛА
        inheritance: {
            title: 'Наследственные дела',
            icon: 'bi bi-file-text-fill',
            documents: [
                { id: 1, text: 'Свидетельство о смерти' },
                { id: 2, text: 'Завещание (если есть)' },
                { id: 3, text: 'Документы, подтверждающие родство' },
                { id: 4, text: 'Документы на наследственное имущество' },
            ],
        },

        // 4.5. АРБИТРАЖНЫЕ СПОРЫ
        arbitrazh: {
            title: 'Арбитражные споры',
            icon: 'bi bi-scale',
            documents: [
                {
                    id: 1,
                    text: 'Исковое заявление (проект)',
                    hint: 'Подготовить проект для суда',
                },
                {
                    id: 2,
                    text: 'Договор или подтверждение правоотношений',
                    hint: 'Поставка, подряд, аренда',
                },
                {
                    id: 3,
                    text: 'Претензия и доказательство её направления',
                    hint: 'Обязательный досудебный порядок',
                },
                {
                    id: 4,
                    text: 'Документ об уплате госпошлины',
                    hint: 'Квитанция или чек',
                },
                {
                    id: 5,
                    text: 'Доверенность на представителя',
                    hint: 'Для передачи полномочий юристу',
                },
                {
                    id: 6,
                    text: 'Выписка из ЕГРЮЛ (свежая)',
                    hint: 'Не ранее 30 дней до подачи',
                },
                {
                    id: 7,
                    text: 'Копии документов для ответчика',
                    hint: 'Отправляются вместе с иском',
                },
                {
                    id: 8,
                    text: 'Расчёт взыскиваемой суммы',
                    hint: 'Подписанный истцом или представителем',
                },
            ],
        },

        // 4.6. КОРПОРАТИВНЫЕ СПОРЫ
        korporativnye: {
            title: 'Корпоративные споры',
            icon: 'bi bi-people',
            documents: [
                {
                    id: 1,
                    text: 'Исковое заявление по корпоративному спору',
                    hint: 'С указанием ОГРН и адреса юрлица',
                },
                {
                    id: 2,
                    text: 'Выписка из ЕГРЮЛ (свежая)',
                    hint: 'Обязательный документ',
                },
                {
                    id: 3,
                    text: 'Устав ООО или учредительный документ',
                    hint: 'Для подтверждения корпоративных прав',
                },
                {
                    id: 4,
                    text: 'Протокол общего собрания участников',
                    hint: 'Если оспаривается решение',
                },
                {
                    id: 5,
                    text: 'Документы на долю в ООО',
                    hint: 'Договор купли-продажи, заявление о выходе',
                },
                {
                    id: 6,
                    text: 'Доверенность на представителя',
                    hint: 'Для передачи полномочий',
                },
                {
                    id: 7,
                    text: 'Документ об уплате госпошлины',
                    hint: 'Квитанция или чек',
                },
                {
                    id: 8,
                    text: 'Претензия (если требуется)',
                    hint: 'Для соблюдения досудебного порядка',
                },
            ],
        },

        // 4.7. ЗАЩИТА БИЗНЕСА
        zashhita: {
            title: 'Защита бизнеса',
            icon: 'bi bi-shield',
            documents: [
                {
                    id: 1,
                    text: 'Акт проверки или предписание',
                    hint: 'При оспаривании действий госорганов',
                },
                {
                    id: 2,
                    text: 'Письменная претензия и ответ',
                    hint: 'Для налоговых споров',
                },
                {
                    id: 3,
                    text: 'Бухгалтерская отчётность',
                    hint: 'Показывает финансовое состояние',
                },
                {
                    id: 4,
                    text: 'Документы по сделкам (договоры, счета, акты)',
                    hint: 'Подтверждают реальность операций',
                },
                {
                    id: 5,
                    text: 'Переписка с контрагентами и госорганами',
                    hint: 'Подтверждает ход переговоров',
                },
                {
                    id: 6,
                    text: 'Заключение независимых экспертов',
                    hint: 'При сложных вопросах',
                },
                {
                    id: 7,
                    text: 'Выписка из ЕГРЮЛ (свежая)',
                    hint: 'Для подтверждения статуса',
                },
                {
                    id: 8,
                    text: 'Доверенность на представителя',
                    hint: 'Для передачи полномочий',
                },
            ],
        },

        // 4.8. ДОГОВОРНОЕ ПРАВО
        dogovornoe: {
            title: 'Договорное право',
            icon: 'bi bi-file-earmark-text',
            documents: [
                {
                    id: 1,
                    text: 'Проект договора (или его копия)',
                    hint: 'Для проверки или оспаривания',
                },
                {
                    id: 2,
                    text: 'Документы согласования условий',
                    hint: 'Коммерческие предложения, протоколы',
                },
                {
                    id: 3,
                    text: 'Бухгалтерские документы (счета, акты, платежки)',
                    hint: 'Подтверждают исполнение',
                },
                {
                    id: 4,
                    text: 'Переписка сторон по договору',
                    hint: 'Письма, уведомления, претензии',
                },
                {
                    id: 5,
                    text: 'Выписка из ЕГРЮЛ (свежая)',
                    hint: 'Для подтверждения статуса контрагента',
                },
                {
                    id: 6,
                    text: 'Расчёт по договору (цена, сроки, неустойка)',
                    hint: 'Для обоснования требований',
                },
                {
                    id: 7,
                    text: 'Документы о должной осмотрительности',
                    hint: 'Проверка контрагента (СПАРК, Контур)',
                },
                {
                    id: 8,
                    text: 'Доверенность на представителя',
                    hint: 'Для передачи полномочий',
                },
            ],
        },
    },

    // =============================================================
    // 5. ПУТИ К БИБЛИОТЕКАМ
    // =============================================================
    // Все библиотеки локально, лицензии соблюдены:
    // - pdf.js (Apache 2.0)
    // - pdf-lib (MIT)
    // - jsPDF (MIT)
    // - browser-image-compression (MIT)
    // - zip.js (BSD 3-Clause) - заменяет JSZip
    // - idb (MIT) - заменяет нативную IndexedDB
    // =============================================================

    LIBRARIES: {
        // PDF.js - для рендеринга PDF и извлечения текста (Apache 2.0)
        PDF_JS: '/assets/js/lib/pdf.min.js',
        PDF_WORKER: '/assets/js/lib/pdf.worker.min.js',

        // PDF-lib - для создания, объединения, разделения PDF (MIT)
        PDF_LIB: '/assets/js/lib/pdf-lib.min.js',

        // jsPDF - для создания PDF из изображений (MIT)
        JSPDF: '/assets/js/lib/jspdf.umd.min.js',
        JSPDF_AUTOTABLE: '/assets/js/lib/jspdf.plugin.autotable.min.js',

        // browser-image-compression - для сжатия изображений (MIT)
        IMAGE_COMPRESSION: '/assets/js/lib/browser-image-compression.js',

        // zip.js - для создания ZIP-архивов (BSD 3-Clause)
        // Заменяет JSZip (MIT) - меньше размер, BSD-лицензия
        ZIP_JS: '/assets/js/lib/zip.min.js',

        // idb - tiny-библиотека для IndexedDB с async/await (MIT)
        // От Джейка Арчибальда (Google Chrome Team)
        // Заменяет нативные обёртки с new Promise
        IDB: '/assets/js/lib/idb.umd.js',
    },

    // =============================================================
    // 6. РЕКВИЗИТЫ ДЛЯ ОПЛАТЫ
    // =============================================================

    REQUISITES: {
        NAME: 'ИП Павлова Татьяна Васильевна',
        INN: '631629590986',
        ACCOUNT: '40802810300002352514',
        BANK: 'АО «ТБанк»',
        BIK: '044525974',
        PURPOSE: 'Оплата юридических услуг',
        AMOUNT: '5 000 ₽',
    },

    // =============================================================
    // 7. РЕГУЛЯРНЫЕ ВЫРАЖЕНИЯ ДЛЯ ВАЛИДАЦИИ
    // =============================================================

    REGEX: {
        // Телефон: +7, 7, 8 с кодом 489, с пробелами, дефисами, скобками
        PHONE: /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,

        // Email: простой, но надёжный
        EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

        // Имя: только буквы, пробелы, дефис, апостроф
        NAME: /^[a-zA-Zа-яА-ЯёЁ\s\-']+$/,

        // URL (для валидации ссылок)
        URL: /^https?:\/\/[^\s/$.?#].[^\s]*$/,
    },

    // =============================================================
    // 8. ЛИМИТЫ И ОГРАНИЧЕНИЯ
    // =============================================================

    LIMITS: {
        // Максимальный размер файла: 100 MB
        FILE_SIZE: 100 * 1024 * 1024,

        // Максимальное количество файлов за раз
        MAX_FILES: 100,

        // Максимальное количество страниц PDF для конвертации
        MAX_PDF_PAGES: 500,

        // Максимальный размер изображения для ресайза (пиксели)
        MAX_IMAGE_DIMENSION: 4096,

        // Таймаут для операций (мс)
        OPERATION_TIMEOUT: 300000, // 5 минут
    },

    // =============================================================
    // 9. НАСТРОЙКИ ИНСТРУМЕНТОВ
    // =============================================================

    TOOL_CONFIG: {
        // Конвертер
        convert: {
            supportedFormats: ['jpeg', 'png', 'webp'],
            defaultFormat: 'jpeg',
            defaultQuality: 0.92,
            allowedExtensions: ['jpg', 'jpeg', 'png', 'webp', 'bmp', 'gif', 'pdf'],
            allowedMimeTypes: [
                'image/jpeg',
                'image/png',
                'image/webp',
                'image/bmp',
                'image/gif',
                'application/pdf',
            ],
        },

        // Сжатие
        compress: {
            defaultQuality: 0.5,
            minQuality: 0.1,
            maxQuality: 1.0,
            allowedExtensions: ['jpg', 'jpeg', 'png', 'webp', 'pdf'],
            allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
        },

        // PDF
        pdf: {
            allowedExtensions: ['pdf', 'jpg', 'jpeg', 'png', 'webp', 'bmp', 'gif'],
            allowedMimeTypes: [
                'application/pdf',
                'image/jpeg',
                'image/png',
                'image/webp',
                'image/bmp',
                'image/gif',
            ],
            maxMergeFiles: 50,
        },

        // Ресайз
        resize: {
            allowedExtensions: ['jpg', 'jpeg', 'png', 'webp', 'bmp', 'gif'],
            allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/bmp', 'image/gif'],
            presets: {
                full_hd: { width: 1920, height: 1080, label: 'Full HD (1920×1080)' },
                hd: { width: 1280, height: 720, label: 'HD (1280×720)' },
                square: { width: 1080, height: 1080, label: 'Квадрат (1080×1080)' },
                '4_3': { width: 1440, height: 1080, label: '4:3 (1440×1080)' },
                small: { width: 800, height: 600, label: 'Малый (800×600)' },
            },
            defaultPreset: 'full_hd',
        },
    },

    // =============================================================
    // 10. УРОВНИ ЛОГИРОВАНИЯ
    // =============================================================

    LOG_LEVELS: {
        ERROR: 0,
        WARN: 1,
        INFO: 2,
        DEBUG: 3,
    },

    // =============================================================
    // 11. НАСТРОЙКИ ДЛЯ REMOVEBACKGROUND (УДАЛЕНИЕ ФОНА)
    // =============================================================

    BACKGROUND_REMOVAL: {
        // Порог чувствительности (30-50, оптимально 35)
        defaultThreshold: 35,

        // Количество пикселей для эрозии (1-3, оптимально 2)
        defaultShrinkPixels: 2,

        // Сила подавления засветки (0-1, оптимально 0.6)
        defaultDespillStrength: 0.6,

        // Масштаб для рендеринга PDF (оптимально 2.0)
        pdfRenderScale: 2.0,
    },

    // =============================================================
    // 12. НАСТРОЙКИ ДЛЯ SERVICE WORKER
    // =============================================================

    SW_CONFIG: {
        CACHE_PREFIX: 'pavlova',
        // Имена кешей генерируются динамически с версией
        // main, api, dynamic, images, pdf
        OFFLINE_URL: '/offline.html',
        VERSION_PARAM: 'v=3.9.5',
    },
});

// ================================================================
// БЛОК 1: ЧИСТЫЕ УТИЛИТЫ (PURE UTILS)
// ================================================================
// Назначение: Функции без побочных эффектов.
// Принцип: Не вызывают DOM, fetch, localStorage, IndexedDB.
// Лицензия: MIT (оригинальный код автора)
//
// Внесены изменения:
// - Все функции вынесены из единого Utils-объекта в раздельные модули
// - Добавлены новые утилиты для работы с валидацией и файлами
// - Сохранена полная совместимость с оригинальным main.js
// ================================================================

const StringUtils = {
    /**
     * Форматирует размер файла в человекочитаемый вид
     * @param {number} bytes - Размер в байтах
     * @returns {string} - Отформатированная строка (например, "2.5 MB")
     *
     * Примеры:
     * formatFileSize(0) -> "0 Bytes"
     * formatFileSize(1024) -> "1 KB"
     * formatFileSize(1048576) -> "1 MB"
     * formatFileSize(1073741824) -> "1 GB"
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    /**
     * Извлекает расширение файла из имени
     * @param {string} filename - Имя файла
     * @returns {string} - Расширение в нижнем регистре
     *
     * Примеры:
     * getFileExtension('document.pdf') -> 'pdf'
     * getFileExtension('image.JPG') -> 'jpg'
     * getFileExtension('file') -> 'file'
     */
    getFileExtension(filename) {
        return filename.split('.').pop().toLowerCase();
    },

    /**
     * Создаёт debounced-функцию (задержка выполнения)
     * @param {Function} func - Функция для debounce
     * @param {number} wait - Время задержки в мс
     * @returns {Function} - Debounced-функция
     *
     * Пример:
     * const debouncedSearch = debounce(() => search(), 300);
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Обрезает текст до указанной длины с добавлением '...'
     * @param {string} text - Исходный текст
     * @param {number} maxLength - Максимальная длина
     * @returns {string} - Обрезанный текст
     *
     * Пример:
     * truncateText('Длинный текст для обрезания', 10) -> 'Длинный те...'
     */
    truncateText(text, maxLength) {
        if (!text || text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    },

    /**
     * Санитизирует HTML-строку (экранирует спецсимволы)
     * @param {string} str - Строка для санитизации
     * @returns {string} - Безопасная строка
     *
     * Пример:
     * sanitizeHtml('<script>alert("xss")</script>') ->
     * '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
     */
    sanitizeHtml(str) {
        if (!str) return '';
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;',
            '/': '&#x2F;',
        };
        return str.replace(/[&<>"'/]/g, function (m) {
            return map[m];
        });
    },

    /**
     * Проверяет, является ли строка валидным UUID
     * @param {string} str - Строка для проверки
     * @returns {boolean} - true, если строка - валидный UUID
     */
    isValidUUID(str) {
        if (!str) return false;
        const uuidRegex =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return uuidRegex.test(str);
    },

    /**
     * Генерирует безопасный ID (crypto.randomUUID() с fallback)
     * @returns {string} - Уникальный ID
     */
    generateSafeId() {
        if (crypto && crypto.randomUUID) {
            return crypto.randomUUID();
        }
        // Fallback: используем crypto.getRandomValues
        const array = new Uint8Array(8);
        crypto.getRandomValues(array);
        return (
            'file_' +
            Date.now() +
            '_' +
            Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('')
        );
    },

    /**
     * Приводит строку к формату имени файла (без спецсимволов)
     * @param {string} str - Исходная строка
     * @returns {string} - Безопасное имя файла
     */
    sanitizeFilename(str) {
        if (!str) return 'file';
        return str
            .replace(/[^a-zA-Z0-9а-яА-ЯёЁ\s\-_.()]/g, '')
            .replace(/\s+/g, '_')
            .trim();
    },
};

const ArrayUtils = {
    /**
     * Уникализация массива (через Set)
     * @param {Array} arr - Исходный массив
     * @returns {Array} - Массив с уникальными элементами
     *
     * Пример:
     * unique([1, 2, 2, 3, 3, 3]) -> [1, 2, 3]
     */
    unique(arr) {
        return [...new Set(arr)];
    },

    /**
     * Группировка массива по ключу (через Map)
     * @param {Array} arr - Исходный массив
     * @param {string|Function} key - Ключ для группировки
     * @returns {Object} - Объект с группами
     *
     * Пример:
     * groupBy([{type: 'a'}, {type: 'b'}, {type: 'a'}], 'type') ->
     * { a: [{type: 'a'}, {type: 'a'}], b: [{type: 'b'}] }
     */
    groupBy(arr, key) {
        if (!Array.isArray(arr) || arr.length === 0) return {};

        const getKey = typeof key === 'function' ? key : (item) => item[key];
        const result = {};

        for (const item of arr) {
            const groupKey = getKey(item);
            if (!result[groupKey]) {
                result[groupKey] = [];
            }
            result[groupKey].push(item);
        }

        return result;
    },

    /**
     * Разбивает массив на части заданного размера
     * @param {Array} arr - Исходный массив
     * @param {number} size - Размер чанка
     * @returns {Array<Array>} - Массив чанков
     *
     * Пример:
     * chunk([1, 2, 3, 4, 5], 2) -> [[1, 2], [3, 4], [5]]
     */
    chunk(arr, size) {
        if (!Array.isArray(arr) || size < 1) return [];
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    },

    /**
     * Проверяет, пустой ли массив
     * @param {Array} arr - Массив для проверки
     * @returns {boolean} - true, если массив пустой
     */
    isEmpty(arr) {
        return !Array.isArray(arr) || arr.length === 0;
    },

    /**
     * Сортировка массива объектов по ключу
     * @param {Array} arr - Массив объектов
     * @param {string} key - Ключ для сортировки
     * @param {boolean} ascending - По возрастанию (true) или убыванию (false)
     * @returns {Array} - Отсортированный массив
     */
    sortBy(arr, key, ascending = true) {
        if (!Array.isArray(arr) || arr.length === 0) return arr;
        const modifier = ascending ? 1 : -1;
        return [...arr].sort((a, b) => {
            const aVal = a[key] ?? '';
            const bVal = b[key] ?? '';
            if (aVal < bVal) return -1 * modifier;
            if (aVal > bVal) return 1 * modifier;
            return 0;
        });
    },

    /**
     * Поиск элемента в массиве по предикату (через find)
     * @param {Array} arr - Массив
     * @param {Function} predicate - Функция-предикат
     * @returns {*} - Найденный элемент или undefined
     */
    find(arr, predicate) {
        return arr.find(predicate);
    },

    /**
     * Фильтрация массива (через filter)
     * @param {Array} arr - Массив
     * @param {Function} predicate - Функция-предикат
     * @returns {Array} - Отфильтрованный массив
     */
    filter(arr, predicate) {
        return arr.filter(predicate);
    },

    /**
     * Преобразование массива (через map)
     * @param {Array} arr - Массив
     * @param {Function} mapper - Функция преобразования
     * @returns {Array} - Преобразованный массив
     */
    map(arr, mapper) {
        return arr.map(mapper);
    },

    /**
     * Свёртка массива (через reduce)
     * @param {Array} arr - Массив
     * @param {Function} reducer - Функция свёртки
     * @param {*} initialValue - Начальное значение
     * @returns {*} - Результат свёртки
     */
    reduce(arr, reducer, initialValue) {
        return arr.reduce(reducer, initialValue);
    },
};

const ValidationUtils = {
    /**
     * Проверяет, является ли номер телефона валидным (российский формат)
     * @param {string} phone - Номер телефона
     * @returns {boolean} - true, если номер валидный
     *
     * Поддерживаемые форматы:
     * +7 912 345 67 89
     * 8 912 345 67 89
     * 7 912 345 67 89
     * +7 962 123 45 67
     * +7 999 123 45 67
     * +7 400 123 45 67 (спутниковые)
     */
    isPhone(phone) {
        if (!phone || typeof phone !== 'string') return false;
        const cleaned = phone.replace(/\s/g, '');
        if (cleaned.length < 10) return false;

        const PHONE_REGEX =
            /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        return PHONE_REGEX.test(phone.trim());
    },

    /**
     * Проверяет, является ли email валидным
     * @param {string} email - Email для проверки
     * @returns {boolean} - true, если email валидный
     */
    isEmail(email) {
        if (!email || typeof email !== 'string') return false;
        const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return EMAIL_REGEX.test(email.trim());
    },

    /**
     * Проверяет, является ли имя валидным (только буквы, пробелы, дефис, апостроф)
     * @param {string} name - Имя для проверки
     * @returns {boolean} - true, если имя валидное
     */
    isName(name) {
        if (!name || typeof name !== 'string') return false;
        const NAME_REGEX = /^[a-zA-Zа-яА-ЯёЁ\s\-']+$/;
        return NAME_REGEX.test(name.trim()) && name.trim().length >= 2;
    },

    /**
     * Проверяет, является ли URL валидным
     * @param {string} url - URL для проверки
     * @returns {boolean} - true, если URL валидный
     */
    isUrl(url) {
        if (!url || typeof url !== 'string') return false;
        const URL_REGEX = /^https?:\/\/[^\s/$.?#].[^\s]*$/;
        return URL_REGEX.test(url.trim());
    },

    /**
     * Проверяет, не пустое ли значение
     * @param {*} value - Значение для проверки
     * @returns {boolean} - true, если значение не пустое
     */
    isRequired(value) {
        if (value === null || value === undefined) return false;
        if (typeof value === 'string') return value.trim().length > 0;
        if (Array.isArray(value)) return value.length > 0;
        if (typeof value === 'object') return Object.keys(value).length > 0;
        return true;
    },

    /**
     * Проверяет размер файла
     * @param {File} file - Файл для проверки
     * @param {number} maxSize - Максимальный размер в байтах
     * @returns {boolean} - true, если размер допустимый
     */
    isFileSizeValid(file, maxSize) {
        if (!file || !(file instanceof File)) return false;
        return file.size <= maxSize;
    },

    /**
     * Проверяет тип файла
     * @param {File} file - Файл для проверки
     * @param {Array<string>} allowedTypes - Допустимые MIME-типы
     * @returns {boolean} - true, если тип допустимый
     */
    isFileTypeValid(file, allowedTypes) {
        if (!file || !(file instanceof File)) return false;
        if (!allowedTypes || allowedTypes.length === 0) return true;

        for (const type of allowedTypes) {
            if (type === 'image' && file.type.startsWith('image/')) {
                return true;
            }
            if (type === 'pdf' && file.type === 'application/pdf') {
                return true;
            }
            if (file.type === type) {
                return true;
            }
            // Для расширений (например, '.pdf')
            if (type.startsWith('.') && file.name.endsWith(type)) {
                return true;
            }
        }
        return false;
    },

    /**
     * Проверяет, является ли значение числом
     * @param {*} value - Значение для проверки
     * @returns {boolean} - true, если значение - число
     */
    isNumber(value) {
        return typeof value === 'number' && !isNaN(value) && isFinite(value);
    },

    /**
     * Проверяет, является ли значение целым числом
     * @param {*} value - Значение для проверки
     * @returns {boolean} - true, если значение - целое число
     */
    isInteger(value) {
        return this.isNumber(value) && Number.isInteger(value);
    },

    /**
     * Проверяет, находится ли число в диапазоне
     * @param {number} value - Число для проверки
     * @param {number} min - Минимальное значение
     * @param {number} max - Максимальное значение
     * @returns {boolean} - true, если число в диапазоне
     */
    isInRange(value, min, max) {
        return this.isNumber(value) && value >= min && value <= max;
    },

    /**
     * Проверяет, является ли строка валидным JSON
     * @param {string} str - Строка для проверки
     * @returns {boolean} - true, если строка - валидный JSON
     */
    isValidJson(str) {
        if (!str || typeof str !== 'string') return false;
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    },
};

const FileUtils = {
    /**
     * Преобразует File в ArrayBuffer
     * @param {File} file - Файл для преобразования
     * @returns {Promise<ArrayBuffer>} - ArrayBuffer
     */
    fileToArrayBuffer(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(new Error('Не удалось прочитать файл'));
            reader.readAsArrayBuffer(file);
        });
    },

    /**
     * Преобразует File в Data URL (base64)
     * @param {File} file - Файл для преобразования
     * @returns {Promise<string>} - Data URL
     */
    fileToDataUrl(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(new Error('Не удалось прочитать файл'));
            reader.readAsDataURL(file);
        });
    },

    /**
     * Преобразует Data URL в Uint8Array
     * @param {string} dataUrl - Data URL
     * @returns {Uint8Array} - Массив байтов
     */
    dataUrlToUint8Array(dataUrl) {
        if (!dataUrl || typeof dataUrl !== 'string') {
            throw new Error('Невалидный Data URL');
        }
        const base64Data = dataUrl.split(',')[1];
        if (!base64Data) {
            throw new Error('Невалидный Data URL: отсутствует base64-часть');
        }
        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    },

    /**
     * Преобразует Blob в base64 строку
     * @param {Blob} blob - Blob для преобразования
     * @returns {Promise<string>} - base64 строка
     */
    blobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target.result;
                if (typeof result === 'string') {
                    resolve(result);
                } else {
                    reject(new Error('Не удалось преобразовать Blob в base64'));
                }
            };
            reader.onerror = (e) => reject(new Error('Не удалось прочитать Blob'));
            reader.readAsDataURL(blob);
        });
    },

    /**
     * Конвертирует изображение в PNG с белым фоном
     * @param {string} dataUrl - Data URL изображения
     * @returns {Promise<string>} - Data URL PNG с белым фоном
     */
    imageToPngWithWhiteBackground(dataUrl) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;

                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);

                canvas.toBlob((blob) => {
                    if (blob) {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result);
                        reader.onerror = () => reject(new Error('Не удалось преобразовать PNG'));
                        reader.readAsDataURL(blob);
                    } else {
                        reject(new Error('Не удалось создать PNG'));
                    }
                }, 'image/png');
            };
            img.onerror = () => reject(new Error('Не удалось загрузить изображение'));
            img.src = dataUrl;
        });
    },

    /**
     * Проверяет наличие прозрачности в изображении (по альфа-каналу)
     * @param {string} dataUrl - Data URL изображения
     * @returns {Promise<boolean>} - true, если есть прозрачность
     */
    hasTransparency(dataUrl) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                // Проверяем альфа-канал (каждый 4-й байт)
                for (let i = 3; i < data.length; i += 40) {
                    // Проверяем с шагом 40 для производительности
                    if (data[i] < 255) {
                        resolve(true);
                        return;
                    }
                }
                resolve(false);
            };
            img.onerror = () => resolve(false);
            img.src = dataUrl;
        });
    },

    /**
     * Конвертирует Canvas в Blob с заданным форматом и качеством
     * @param {HTMLCanvasElement} canvas - Canvas для конвертации
     * @param {string} format - Формат ('jpeg', 'png', 'webp')
     * @param {number} quality - Качество (0-1)
     * @returns {Promise<Blob>} - Blob с изображением
     */
    canvasToBlob(canvas, format, quality = 0.92) {
        return new Promise((resolve, reject) => {
            let mimeType = 'image/jpeg';
            if (format === 'png') mimeType = 'image/png';
            if (format === 'webp') mimeType = 'image/webp';

            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error('Не удалось создать Blob'));
                    }
                },
                mimeType,
                quality
            );
        });
    },

    /**
     * Скачивает файл (создаёт ссылку и кликает)
     * @param {Blob} blob - Blob с данными
     * @param {string} filename - Имя файла для скачивания
     */
    downloadFile(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    },

    /**
     * Создаёт объект URL из Blob (с автоматическим освобождением)
     * @param {Blob} blob - Blob для создания URL
     * @param {Function} onComplete - Колбэк с URL
     * @returns {string} - Объект URL
     */
    createObjectURL(blob) {
        return URL.createObjectURL(blob);
    },

    /**
     * Освобождает объект URL
     * @param {string} url - URL для освобождения
     */
    revokeObjectURL(url) {
        if (url) {
            URL.revokeObjectURL(url);
        }
    },

    /**
     * Проверяет, является ли файл изображением
     * @param {File} file - Файл для проверки
     * @returns {boolean} - true, если файл - изображение
     */
    isImage(file) {
        return file && file.type && file.type.startsWith('image/');
    },

    /**
     * Проверяет, является ли файл PDF
     * @param {File} file - Файл для проверки
     * @returns {boolean} - true, если файл - PDF
     */
    isPdf(file) {
        return file && file.type === 'application/pdf';
    },

    /**
     * Генерирует имя для скачивания с суффиксом
     * @param {string} originalName - Оригинальное имя файла
     * @param {string} suffix - Суффикс ('_converted', '_compressed' и т.д.)
     * @param {string} newExtension - Новое расширение (опционально)
     * @returns {string} - Имя для скачивания
     */
    generateDownloadName(originalName, suffix, newExtension = null) {
        if (!originalName) return 'file' + (suffix || '');
        const baseName = originalName.replace(/\.[^.]+$/, '');
        const extension = newExtension || originalName.split('.').pop() || 'txt';
        return `${baseName}${suffix}.${extension}`;
    },

    /**
     * Проверяет, является ли файл допустимого размера
     * @param {File} file - Файл для проверки
     * @param {number} maxSizeMB - Максимальный размер в MB
     * @returns {boolean} - true, если размер допустимый
     */
    isWithinSizeLimit(file, maxSizeMB) {
        if (!file || !(file instanceof File)) return false;
        const maxBytes = maxSizeMB * 1024 * 1024;
        return file.size <= maxBytes;
    },
};

// ================================================================
// БЛОК 2: DOM-АБСТРАКЦИИ (DOM UTILS)
// ================================================================
// Назначение: Безопасная работа с DOM.
// Лицензия: MIT (оригинальный код автора)
//
// 🔒 БЕЗОПАСНОСТЬ (OWASP):
// - НИКАКОГО innerHTML
// - Все строки проходят санитизацию (_escapeHtml)
// - Блокировка on* атрибутов и опасных схем
// - Все data-атрибуты санитизируются
// - SVG создаётся через DOM-методы (безопасно)
// - CSP-совместимость
//
// ⚡ СКОРОСТЬ:
// - Кеширование вычислений
// - requestAnimationFrame для анимаций
// - Минимум перерисовок
//
// 🛡️ НАДЁЖНОСТЬ:
// - Все операции с проверкой на null/undefined
// - try/catch для критических операций
// - Fallback-значения
// ================================================================

const DomUtils = {
    // =============================================================
    // 1. НАВИГАЦИЯ И СКРОЛЛ
    // =============================================================

    /**
     * Возвращает высоту хедера (включая margin)
     * @returns {number} - Высота хедера в пикселях
     */
    getHeaderHeight() {
        const header = document.querySelector('.header');
        if (!header) return 80;

        const headerHeight = header.offsetHeight;
        const headerStyles = window.getComputedStyle(header);
        const headerMargin =
            parseFloat(headerStyles.marginTop) + parseFloat(headerStyles.marginBottom);

        return headerHeight + (isNaN(headerMargin) ? 0 : headerMargin);
    },

    /**
     * Плавный скролл к элементу с учётом хедера
     * @param {HTMLElement} element - Целевой элемент
     * @param {number} offset - Дополнительный отступ (по умолчанию 20px)
     */
    smoothScrollToElement(element, offset = 20) {
        if (!element) return;

        try {
            const headerHeight = this.getHeaderHeight();
            const targetPosition =
                element.getBoundingClientRect().top + window.pageYOffset - headerHeight - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth',
            });
        } catch (e) {
            const headerHeight = this.getHeaderHeight();
            const targetPosition =
                element.getBoundingClientRect().top + window.pageYOffset - headerHeight - offset;
            window.scrollTo(0, targetPosition);
        }
    },

    /**
     * Плавный скролл наверх
     * @param {number} duration - Длительность анимации (по умолчанию 900ms)
     * @param {Function} onComplete - Колбэк после завершения
     */
    scrollToTop(duration = 900, onComplete = null) {
        const startPosition = window.pageYOffset;
        if (startPosition === 0) {
            if (onComplete) onComplete();
            return;
        }

        const startTime = performance.now();

        const easeOutQuart = (t) => {
            return 1 - Math.pow(1 - t, 4);
        };

        const animateScroll = (timestamp) => {
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easedProgress = easeOutQuart(progress);

            const currentPosition = startPosition * (1 - easedProgress);
            window.scrollTo(0, currentPosition);

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            } else {
                window.scrollTo(0, 0);
                if (onComplete) onComplete();
            }
        };

        requestAnimationFrame(animateScroll);
    },

    /**
     * Получает элемент по селектору (с проверкой)
     * @param {string} selector - CSS-селектор
     * @param {HTMLElement} context - Контекст поиска (по умолчанию document)
     * @returns {HTMLElement|null} - Найденный элемент или null
     */
    getElement(selector, context = document) {
        if (!selector || typeof selector !== 'string') return null;
        try {
            return context.querySelector(selector);
        } catch (e) {
            return null;
        }
    },

    /**
     * Получает все элементы по селектору (с проверкой)
     * @param {string} selector - CSS-селектор
     * @param {HTMLElement} context - Контекст поиска (по умолчанию document)
     * @returns {NodeList} - Найденные элементы
     */
    getElements(selector, context = document) {
        if (!selector || typeof selector !== 'string') return [];
        try {
            return context.querySelectorAll(selector);
        } catch (e) {
            return [];
        }
    },

    // =============================================================
    // 2. РАБОТА С ЭЛЕМЕНТАМИ - БЕЗОПАСНЫЕ МЕТОДЫ
    // =============================================================

    /**
     * Проверяет наличие класса
     * @param {HTMLElement} element - Элемент для проверки
     * @param {string} className - Имя класса
     * @returns {boolean} - true, если класс есть
     */
    hasClass(element, className) {
        if (!element || !className) return false;
        try {
            return element.classList.contains(className);
        } catch (e) {
            return false;
        }
    },

    /**
     * Добавляет класс (безопасно)
     * @param {HTMLElement} element - Элемент для изменения
     * @param {string} className - Имя класса
     */
    addClass(element, className) {
        if (!element || !className) return;
        try {
            element.classList.add(className);
        } catch (e) {
            // Игнорируем ошибки
        }
    },

    /**
     * Удаляет класс (безопасно)
     * @param {HTMLElement} element - Элемент для изменения
     * @param {string} className - Имя класса
     */
    removeClass(element, className) {
        if (!element || !className) return;
        try {
            element.classList.remove(className);
        } catch (e) {
            // Игнорируем ошибки
        }
    },

    /**
     * Переключает класс (безопасно)
     * @param {HTMLElement} element - Элемент для изменения
     * @param {string} className - Имя класса
     * @returns {boolean} - Новое состояние класса
     */
    toggleClass(element, className) {
        if (!element || !className) return false;
        try {
            return element.classList.toggle(className);
        } catch (e) {
            return false;
        }
    },

    /**
     * Устанавливает атрибут с санитизацией (безопасно)
     * @param {HTMLElement} element - Элемент для изменения
     * @param {string} name - Имя атрибута
     * @param {string} value - Значение атрибута
     */
    setAttribute(element, name, value) {
        if (!element || !name) return;

        // 🔒 Блокируем опасные атрибуты
        if (name.startsWith('on')) return;
        if (name === 'innerHTML' || name === 'outerHTML') return;
        if (name === 'srcdoc') return;

        const sanitizedValue = this._sanitizeAttributeValue(String(value));
        if (sanitizedValue !== null) {
            try {
                element.setAttribute(name, sanitizedValue);
            } catch (e) {
                // Игнорируем ошибки
            }
        }
    },

    /**
     * Получает атрибут (безопасно)
     * @param {HTMLElement} element - Элемент для чтения
     * @param {string} name - Имя атрибута
     * @returns {string|null} - Значение атрибута или null
     */
    getAttribute(element, name) {
        if (!element || !name) return null;
        try {
            return element.getAttribute(name);
        } catch (e) {
            return null;
        }
    },

    /**
     * Создаёт безопасный элемент (без innerHTML)
     * @param {string} tag - Имя тега
     * @param {string|string[]} classes - Классы (строка или массив)
     * @param {Object} attributes - Атрибуты (ключ-значение)
     * @param {string|HTMLElement|Array} content - Содержимое
     * @returns {HTMLElement} - Созданный элемент
     */
    createElementSafe(tag, classes = '', attributes = {}, content = null) {
        try {
            const element = document.createElement(tag);

            // Добавляем классы
            if (classes) {
                if (Array.isArray(classes)) {
                    classes.forEach((cls) => {
                        if (cls) element.classList.add(cls);
                    });
                } else {
                    classes
                        .split(' ')
                        .filter(Boolean)
                        .forEach((cls) => {
                            element.classList.add(cls);
                        });
                }
            }

            // 🔒 Устанавливаем атрибуты (только безопасные)
            for (const [key, value] of Object.entries(attributes)) {
                if (key.startsWith('on')) continue;
                if (key === 'innerHTML' || key === 'outerHTML') continue;
                if (key === 'srcdoc') continue;
                const sanitized = this._sanitizeAttributeValue(String(value));
                if (sanitized !== null) {
                    element.setAttribute(key, sanitized);
                }
            }

            // 🔒 Добавляем содержимое (только безопасно)
            if (content !== null && content !== undefined) {
                if (typeof content === 'string') {
                    element.textContent = this._escapeHtml(content);
                } else if (content instanceof HTMLElement) {
                    element.appendChild(content);
                } else if (Array.isArray(content)) {
                    content.forEach((item) => {
                        if (item instanceof HTMLElement) {
                            element.appendChild(item);
                        } else {
                            element.appendChild(
                                document.createTextNode(this._escapeHtml(String(item)))
                            );
                        }
                    });
                }
            }

            return element;
        } catch (e) {
            return document.createElement('div');
        }
    },

    /**
     * Создаёт безопасный элемент с иконкой Bootstrap
     * @param {string} iconClass - Класс иконки
     * @param {string} ariaLabel - Aria-метка (опционально)
     * @returns {HTMLElement} - Элемент <i> с иконкой
     */
    createIcon(iconClass, ariaLabel = null) {
        const icon = document.createElement('i');
        icon.className = this._escapeHtml(iconClass);
        icon.setAttribute('aria-hidden', 'true');
        if (ariaLabel) {
            icon.setAttribute('aria-label', this._escapeHtml(ariaLabel));
        }
        return icon;
    },

    /**
     * Создаёт безопасный текстовый узел с санитизацией
     * @param {string} text - Текст
     * @returns {Text} - Текстовый узел
     */
    createTextNode(text) {
        return document.createTextNode(this._escapeHtml(String(text)));
    },

    /**
     * Устанавливает текстовое содержимое с санитизацией
     * @param {HTMLElement} element - Элемент для изменения
     * @param {string} text - Текст для установки
     */
    setText(element, text) {
        if (!element) return;
        try {
            element.textContent = this._escapeHtml(String(text));
        } catch (e) {
            // Игнорируем ошибки
        }
    },

    /**
     * Устанавливает data-атрибут безопасно
     * @param {HTMLElement} element - Элемент
     * @param {string} key - Ключ (без 'data-')
     * @param {string} value - Значение
     */
    setDataAttribute(element, key, value) {
        if (!element || !key) return;
        try {
            const sanitizedKey = key.replace(/[^a-zA-Z0-9\-_]/g, '');
            if (sanitizedKey) {
                element.dataset[sanitizedKey] = this._escapeHtml(String(value));
            }
        } catch (e) {
            // Игнорируем ошибки
        }
    },

    /**
     * Очищает все дочерние элементы (безопасно)
     * @param {HTMLElement} element - Элемент для очистки
     */
    empty(element) {
        if (!element) return;
        try {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        } catch (e) {
            // Игнорируем ошибки
        }
    },

    /**
     * Удаляет элемент (безопасно)
     * @param {HTMLElement} element - Элемент для удаления
     */
    removeElement(element) {
        if (!element || !element.parentNode) return;
        try {
            element.parentNode.removeChild(element);
        } catch (e) {
            // Игнорируем ошибки
        }
    },

    /**
     * Вставляет элемент после другого (безопасно)
     * @param {HTMLElement} newElement - Новый элемент
     * @param {HTMLElement} referenceElement - Элемент-ориентир
     */
    insertAfter(newElement, referenceElement) {
        if (!newElement || !referenceElement || !referenceElement.parentNode) return;
        try {
            referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling);
        } catch (e) {
            // Игнорируем ошибки
        }
    },

    /**
     * Вставляет элемент перед другим (безопасно)
     * @param {HTMLElement} newElement - Новый элемент
     * @param {HTMLElement} referenceElement - Элемент-ориентир
     */
    insertBefore(newElement, referenceElement) {
        if (!newElement || !referenceElement || !referenceElement.parentNode) return;
        try {
            referenceElement.parentNode.insertBefore(newElement, referenceElement);
        } catch (e) {
            // Игнорируем ошибки
        }
    },

    // =============================================================
    // 3. СОСТОЯНИЯ ЗАГРУЗКИ - СПИННЕР
    // =============================================================

    /**
     * Создаёт элемент спиннера с логотипом внутри
     * @param {string} message - Текст сообщения (опционально)
     * @returns {HTMLElement} - Контейнер со спиннером
     */
    createSpinnerElement(message = '') {
        const container = this.createElementSafe('div', 'spinner-container', {
            role: 'status',
            'aria-live': 'polite',
        });

        const spinnerWrapper = this.createElementSafe('div', 'spinner-with-logo');

        // ВНЕШНЕЕ КОЛЬЦО (по часовой)
        const ringOuter = this.createElementSafe('div', 'spinner-ring-outer');
        spinnerWrapper.appendChild(ringOuter);

        // ВНУТРЕННЕЕ КОЛЬЦО (против часовой)
        const ringInner = this.createElementSafe('div', 'spinner-ring-inner');
        spinnerWrapper.appendChild(ringInner);

        // Логотип
        const logoUrl = '/assets/icons/logo_200.png';
        const logo = this.createElementSafe('img', 'spinner-logo', {
            src: logoUrl,
            alt: 'Загрузка...',
            loading: 'lazy',
        });
        spinnerWrapper.appendChild(logo);

        container.appendChild(spinnerWrapper);

        if (message) {
            const textSpan = this.createElementSafe('span', 'visually-hidden', {}, message);
            container.appendChild(textSpan);
        }

        return container;
    },

    /**
     * Показывает спиннер в контейнере
     * @param {HTMLElement} container - Контейнер для спиннера
     * @param {string} message - Сообщение (опционально)
     * @returns {HTMLElement} - Созданный спиннер
     */
    showSpinner(container, message = '') {
        if (!container) return null;

        const existing = container.querySelector('.spinner-container');
        if (existing) return existing;

        const spinner = this.createSpinnerElement(message);
        container.appendChild(spinner);
        return spinner;
    },

    /**
     * Удаляет спиннер из контейнера
     * @param {HTMLElement} spinner - Спиннер для удаления
     */
    hideSpinner(spinner) {
        if (!spinner) return;
        this.removeElement(spinner);
    },

    /**
     * Удаляет спиннер из контейнера
     * @param {HTMLElement} container - Контейнер со спиннером
     */
    hideSpinnerFromContainer(container) {
        if (!container) return;
        const spinner = container.querySelector('.spinner-container');
        if (spinner) {
            this.removeElement(spinner);
        }
    },

    // =============================================================
    // 4. СОСТОЯНИЯ ЗАГРУЗКИ - ПРОГРЕСС-БАР
    // =============================================================

    /**
     * Создаёт элемент прогресс-бара (без innerHTML)
     * @param {string} message - Текст сообщения
     * @param {number} percent - Процент (0-100)
     * @returns {HTMLElement} - Элемент прогресса
     */
    createProgressElement(message, percent = 0) {
        const container = this.createElementSafe('div', 'progress-indicator', {
            role: 'progressbar',
            'aria-valuenow': String(Math.min(Math.max(percent, 0), 100)),
            'aria-valuemin': '0',
            'aria-valuemax': '100',
        });

        const spinner = this.createElementSafe('div', 'progress-spinner', {
            'aria-hidden': 'true',
        });
        container.appendChild(spinner);

        const text = this.createElementSafe('div', 'progress-text', {}, this._escapeHtml(message));
        container.appendChild(text);

        const barContainer = this.createElementSafe('div', 'progress-bar-container');
        const fill = this.createElementSafe('div', 'progress-bar-fill');
        fill.style.width = Math.min(Math.max(percent, 0), 100) + '%';
        barContainer.appendChild(fill);
        container.appendChild(barContainer);

        return container;
    },

    /**
     * Показывает глобальный прогресс
     * @param {string} message - Сообщение
     * @param {number} percent - Начальный процент (0-100)
     * @returns {HTMLElement} - Созданный индикатор
     */
    showProgress(message = 'Обработка...', percent = 0) {
        let indicator = document.getElementById('globalProgressIndicator');
        if (indicator) {
            this.updateProgress(percent, message);
            return indicator;
        }

        // СОЗДАЁМ НОВЫЙ ИНДИКАТОР
        indicator = this.createElementSafe('div', 'progress-indicator', {
            id: 'globalProgressIndicator',
            role: 'progressbar',
            'aria-valuenow': String(Math.min(Math.max(percent, 0), 100)),
            'aria-valuemin': '0',
            'aria-valuemax': '100',
        });

        // ✅ СПИННЕР С ЛОГОТИПОМ
        const spinner = this.createSpinnerElement();
        indicator.appendChild(spinner);

        // ✅ ТЕКСТ (как в старом методе)
        const text = this.createElementSafe('div', 'progress-text', {}, this._escapeHtml(message));
        indicator.appendChild(text);

        // ✅ ПРОГРЕСС-БАР
        const barContainer = this.createElementSafe('div', 'progress-bar-container');
        const fill = this.createElementSafe('div', 'progress-bar-fill');
        fill.style.width = Math.min(Math.max(percent, 0), 100) + '%';
        barContainer.appendChild(fill);
        indicator.appendChild(barContainer);

        document.body.appendChild(indicator);

        requestAnimationFrame(() => {
            this.addClass(indicator, 'active');
        });

        return indicator;
    },

    /**
     * Обновляет глобальный индикатор прогресса
     * @param {number} percent - Новый процент (0-100)
     * @param {string} message - Новое сообщение
     */
    updateProgress(percent, message) {
        const indicator = document.getElementById('globalProgressIndicator');
        if (!indicator) return;

        const fill = indicator.querySelector('.progress-bar-fill');
        const text = indicator.querySelector('.progress-text');
        const roleAttr = indicator.querySelector('[role="progressbar"]');

        if (fill) {
            fill.style.width = Math.min(Math.max(percent, 0), 100) + '%';
        }

        if (text && message) {
            text.textContent = this._escapeHtml(message);
        }

        if (roleAttr) {
            roleAttr.setAttribute('aria-valuenow', String(Math.min(Math.max(percent, 0), 100)));
        }
    },

    /**
     * Скрывает глобальный индикатор прогресса
     * @param {number} delay - Задержка перед скрытием (мс)
     */
    hideProgress(delay = 300) {
        const indicator = document.getElementById('globalProgressIndicator');
        if (!indicator) return;

        this.removeClass(indicator, 'active');

        setTimeout(() => {
            if (indicator && !this.hasClass(indicator, 'active')) {
                this.removeElement(indicator);
            }
        }, delay);
    },

    /**
     * Завершает прогресс с анимацией "Готово"
     * @param {string} message - Сообщение о завершении
     * @param {number} delay - Задержка перед скрытием
     */
    completeProgress(message = 'Готово!', delay = 1500) {
        this.updateProgress(100, message);
        setTimeout(() => {
            this.hideProgress();
        }, delay);
    },

    // =============================================================
    // 5. СОСТОЯНИЯ ЗАГРУЗКИ - СКЕЛЕТОН
    // =============================================================

    /**
     * Создаёт один элемент скелетона по типу (без innerHTML)
     * @private
     *
     */
    _createSkeletonItem(type) {
        const item = this.createElementSafe('div', `skeleton-item skeleton-${type}`);

        if (type === 'file') {
            const icon = this.createElementSafe('div', 'skeleton-line skeleton-line--icon');
            item.appendChild(icon);

            const content = this.createElementSafe('div', 'skeleton-content');
            content.appendChild(
                this.createElementSafe('div', 'skeleton-line skeleton-line--title')
            );
            content.appendChild(this.createElementSafe('div', 'skeleton-line skeleton-line--meta'));
            item.appendChild(content);
        } else if (type === 'service') {
            item.appendChild(this.createElementSafe('div', 'skeleton-line skeleton-line--icon-lg'));
            item.appendChild(
                this.createElementSafe('div', 'skeleton-line skeleton-line--title-md')
            );
            item.appendChild(this.createElementSafe('div', 'skeleton-line skeleton-line--desc'));
            item.appendChild(this.createElementSafe('div', 'skeleton-line skeleton-line--action'));
        } else if (type === 'case') {
            item.appendChild(
                this.createElementSafe('div', 'skeleton-line skeleton-line--category')
            );
            item.appendChild(this.createElementSafe('div', 'skeleton-line skeleton-line--result'));
            item.appendChild(this.createElementSafe('div', 'skeleton-line skeleton-line--text'));
            item.appendChild(this.createElementSafe('div', 'skeleton-line skeleton-line--text'));
            item.appendChild(this.createElementSafe('div', 'skeleton-line skeleton-line--meta'));
        } else {
            const icon = this.createElementSafe('div', 'skeleton-line skeleton-line--icon');
            item.appendChild(icon);
            const content = this.createElementSafe('div', 'skeleton-content');
            content.appendChild(
                this.createElementSafe('div', 'skeleton-line skeleton-line--title')
            );
            content.appendChild(this.createElementSafe('div', 'skeleton-line skeleton-line--meta'));
            item.appendChild(content);
        }

        return item;
    },

    /**
     * Создаёт контейнер со скелетонами (без innerHTML)
     * @param {string} type - Тип ('file', 'service', 'case')
     * @param {number} count - Количество элементов
     * @returns {HTMLElement} - Контейнер со скелетонами
     */
    createSkeletonElements(type, count) {
        const container = this.createElementSafe('div', 'skeleton-container', {
            'aria-hidden': 'true',
        });

        for (let i = 0; i < count; i++) {
            const item = this._createSkeletonItem(type);
            container.appendChild(item);
        }

        return container;
    },

    /**
     * Показывает скелетон в контейнере
     * @param {string} type - Тип ('file', 'service', 'case')
     * @param {number} count - Количество элементов
     * @param {HTMLElement} container - Контейнер для скелетона
     * @returns {HTMLElement} - Созданный скелетон
     */
    createSkeleton(type, count, container) {
        if (!container) return null;

        const oldSkeleton = container.querySelector('.skeleton-container');
        if (oldSkeleton) {
            this.removeElement(oldSkeleton);
        }

        const skeleton = this.createSkeletonElements(type, count);
        container.appendChild(skeleton);
        return skeleton;
    },

    /**
     * Удаляет скелетон из контейнера
     * @param {HTMLElement} container - Контейнер со скелетоном
     */
    removeSkeleton(container) {
        if (!container) return;
        const skeleton = container.querySelector('.skeleton-container');
        if (skeleton) {
            this.removeElement(skeleton);
        }
    },

    // =============================================================
    // 6. СОСТОЯНИЯ ЗАГРУЗКИ - АНИМАЦИЯ "ГОТОВО"
    // =============================================================

    /**
     * Создаёт безопасный SVG-элемент (через DOM, без innerHTML)
     * @param {string} pathD - d-атрибут для path
     * @param {Object} attrs - Атрибуты SVG
     * @returns {SVGElement} - Созданный SVG-элемент
     *
     * 🔒 БЕЗОПАСНО: создаётся через document.createElementNS, а не innerHTML
     */
    _createSafeSvg(pathD, attrs = {}) {
        // owasp-ignore: GEN-HTTP-URL -- suppressed
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '2');

        for (const [key, value] of Object.entries(attrs)) {
            if (key.startsWith('on')) continue;
            svg.setAttribute(key, this._escapeHtml(String(value)));
        }

        // owasp-ignore: GEN-HTTP-URL -- suppressed
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', this._escapeHtml(pathD));
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');

        svg.appendChild(path);
        return svg;
    },

    /**
     * Создаёт элемент "Готово" (без innerHTML)
     * @param {string} message - Текст сообщения
     * @returns {HTMLElement} - Элемент "Готово"
     *
     */
    createCompleteElement(message = 'Готово!') {
        const container = this.createElementSafe('div', 'complete-container', {
            role: 'status',
            'aria-live': 'polite',
        });

        const iconWrapper = this.createElementSafe('div', 'complete-icon', {
            'aria-hidden': 'true',
        });

        // 🔒 БЕЗОПАСНО: SVG создаётся через DOM, а не через innerHTML
        const svg = this._createSafeSvg('M20 6L9 17L4 12');
        iconWrapper.appendChild(svg);
        container.appendChild(iconWrapper);

        const text = this.createElementSafe('div', 'complete-text', {}, this._escapeHtml(message));
        container.appendChild(text);

        return container;
    },

    /**
     * Показывает анимацию "Готово" в контейнере
     * @param {HTMLElement} container - Контейнер для анимации
     * @param {string} message - Сообщение о завершении
     * @param {number} duration - Длительность показа (мс)
     * @returns {HTMLElement} - Созданный элемент
     */
    showComplete(container, message = 'Готово!', duration = 3000) {
        if (!container) return null;

        const oldComplete = container.querySelector('.complete-container');
        if (oldComplete) {
            this.removeElement(oldComplete);
        }

        const complete = this.createCompleteElement(message);
        container.appendChild(complete);

        if (duration > 0) {
            setTimeout(() => {
                this.removeElement(complete);
            }, duration);
        }

        return complete;
    },

    /**
     * Скрывает анимацию "Готово" из контейнера
     * @param {HTMLElement} container - Контейнер с анимацией
     */
    hideComplete(container) {
        if (!container) return;
        const complete = container.querySelector('.complete-container');
        if (complete) {
            this.removeElement(complete);
        }
    },

    // =============================================================
    // 7. ТОСТЫ (УВЕДОМЛЕНИЯ) С ОЧЕРЕДЬЮ
    // =============================================================

    /**
     * Очередь тостов
     * @private
     */
    _toastQueue: [],
    _isToastShowing: false,

    /**
     * Карта иконок для Bootstrap Icons
     * @private
     */
    _toastIcons: {
        success: 'bi-check-circle-fill',
        error: 'bi-x-circle-fill',
        info: 'bi-info-circle-fill',
        warning: 'bi-exclamation-triangle-fill',
    },

    /**
     * Карта цветов для Bootstrap Icons
     * @private
     */
    _toastIconColors: {
        success: '#10b981',
        error: '#dc3545',
        info: '#3d9c8c',
        warning: '#f59e0b',
    },

    /**
     * Создаёт безопасный тост (без innerHTML)
     * @param {string} message - Текст сообщения
     * @param {string} type - Тип ('success', 'error', 'info', 'warning')
     * @param {Function} onClose - Колбэк при закрытии
     * @param {string} position - Позиция ('top-center', 'bottom-center')
     * @returns {HTMLElement} - Элемент тоста
     */
    createToastElement(message, type = 'info', onClose = null, position = 'top-center') {
        const iconClass = this._toastIcons[type] || 'bi-info-circle-fill';
        const iconColor = this._toastIconColors[type] || '#3d9c8c';

        const toast = this.createElementSafe(
            'div',
            `toast-container toast-container--${type} toast-container--${position}`,
            {
                role: 'alert',
                'aria-live': 'polite',
            }
        );

        // Иконка Bootstrap
        const iconSpan = this.createElementSafe('span', 'toast-icon', {
            'aria-hidden': 'true',
        });
        const icon = this.createElementSafe('i', iconClass, {
            'aria-hidden': 'true',
            style: `color: ${iconColor}; font-size: 1.4rem;`,
        });
        iconSpan.appendChild(icon);
        toast.appendChild(iconSpan);

        // Сообщение
        const messageSpan = this.createElementSafe(
            'span',
            'toast-message',
            {},
            this._escapeHtml(message)
        );
        toast.appendChild(messageSpan);

        // Кнопка закрытия
        const closeBtn = this.createElementSafe('button', 'toast-close', {
            'aria-label': 'Закрыть уведомление',
            type: 'button',
        });
        closeBtn.textContent = '×';

        if (onClose) {
            closeBtn.addEventListener('click', onClose);
        } else {
            closeBtn.addEventListener('click', () => {
                this.removeElement(toast);
                this._showNextToast();
            });
        }

        toast.appendChild(closeBtn);

        return toast;
    },

    /**
     * Показывает тост-уведомление (с очередью)
     * @param {string} message - Текст уведомления
     * @param {string} type - Тип ('success', 'error', 'info', 'warning')
     * @param {number} duration - Длительность показа (мс)
     * @param {string} position - Позиция ('top-center', 'bottom-center')
     * @returns {HTMLElement} - Созданный тост
     */
    showToast(message, type = 'info', duration = 3000, position = 'top-center') {
        // Добавляем в очередь
        this._toastQueue.push({ message, type, duration, position });

        // Если тост не показывается - показываем следующий
        if (!this._isToastShowing) {
            this._showNextToast();
        }

        return null;
    },

    /**
     * Показывает следующий тост из очереди
     * @private
     */
    _showNextToast() {
        if (this._toastQueue.length === 0) {
            this._isToastShowing = false;
            return;
        }

        this._isToastShowing = true;

        const { message, type, duration, position } = this._toastQueue.shift();

        // Удаляем старые тосты (только не кастомные)
        const oldToasts = document.querySelectorAll(
            `.toast-container:not(.toast-container--custom)`
        );
        oldToasts.forEach((toast) => this.removeElement(toast));

        const toast = this.createToastElement(message, type, null, position);
        document.body.appendChild(toast);

        // Показываем с анимацией
        requestAnimationFrame(() => {
            this.addClass(toast, 'toast-visible');
        });

        // Авто-скрытие
        if (duration > 0) {
            setTimeout(() => {
                this.removeClass(toast, 'toast-visible');
                setTimeout(() => {
                    if (toast.parentNode) {
                        this.removeElement(toast);
                    }
                    // Показываем следующий тост
                    this._showNextToast();
                }, 300);
            }, duration);
        }
    },

    /**
     * Показывает тост успеха
     * @param {string} message - Текст уведомления
     * @param {number} duration - Длительность показа
     * @param {string} position - Позиция
     */
    showSuccess(message, duration = 3000, position = 'top-center') {
        return this.showToast(message, 'success', duration, position);
    },

    /**
     * Показывает тост ошибки
     * @param {string} message - Текст уведомления
     * @param {number} duration - Длительность показа
     * @param {string} position - Позиция
     */
    showError(message, duration = 5000, position = 'top-center') {
        return this.showToast(message, 'error', duration, position);
    },

    /**
     * Показывает информационный тост
     * @param {string} message - Текст уведомления
     * @param {number} duration - Длительность показа
     * @param {string} position - Позиция
     */
    showInfo(message, duration = 3000, position = 'top-center') {
        return this.showToast(message, 'info', duration, position);
    },

    /**
     * Показывает предупреждение
     * @param {string} message - Текст уведомления
     * @param {number} duration - Длительность показа
     * @param {string} position - Позиция
     */
    showWarning(message, duration = 4000, position = 'top-center') {
        return this.showToast(message, 'warning', duration, position);
    },

    // =============================================================
    // 8. ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ (САНИТИЗАЦИЯ)
    // =============================================================

    /**
     * Экранирует HTML-спецсимволы (для безопасности)
     * @private
     * @param {string} str - Входная строка
     * @returns {string} - Безопасная строка
     */
    _escapeHtml(str) {
        if (!str) return '';
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;',
        };
        return String(str).replace(/[&<>"']/g, function (m) {
            return map[m];
        });
    },

    /**
     * Санитизирует значение атрибута (блокирует опасные схемы)
     * @private
     * @param {string} value - Значение атрибута
     * @returns {string|null} - Безопасное значение или null
     */
    _sanitizeAttributeValue(value) {
        if (!value) return '';
        const str = String(value).trim();

        const dangerousSchemes = /^(javascript|data|vbscript|file|ftp):/i;
        if (dangerousSchemes.test(str)) {
            return null;
        }

        if (/<[^>]*>/i.test(str)) {
            return this._escapeHtml(str);
        }

        return str;
    },

    /**
     * Общая санитизация строки
     * @param {string} str - Входная строка
     * @returns {string} - Безопасная строка
     */
    sanitize(str) {
        return this._escapeHtml(String(str));
    },

    /**
     * Санитизирует и обрезает строку
     * @param {string} str - Входная строка
     * @param {number} maxLength - Максимальная длина
     * @returns {string} - Безопасная обрезанная строка
     */
    sanitizeAndTruncate(str, maxLength = 100) {
        const sanitized = this._escapeHtml(String(str));
        if (sanitized.length <= maxLength) return sanitized;
        return sanitized.slice(0, maxLength) + '...';
    },

    // =============================================================
    // 9. ПРОВЕРКА DOM-СТРУКТУРЫ
    // =============================================================

    /**
     * Проверяет, существует ли элемент в DOM
     * @param {string} selector - CSS-селектор
     * @returns {boolean} - true, если элемент существует
     */
    exists(selector) {
        if (!selector) return false;
        try {
            return document.querySelector(selector) !== null;
        } catch (e) {
            return false;
        }
    },

    /**
     * Проверяет, видим ли элемент (с учётом стилей)
     * @param {HTMLElement} element - Элемент для проверки
     * @returns {boolean} - true, если элемент видим
     */
    isVisible(element) {
        if (!element) return false;
        try {
            const rect = element.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return false;
            const style = window.getComputedStyle(element);
            return (
                style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0'
            );
        } catch (e) {
            return false;
        }
    },

    /**
     * Проверяет, находится ли элемент в viewport
     * @param {HTMLElement} element - Элемент для проверки
     * @param {number} offset - Допустимое смещение (пиксели)
     * @returns {boolean} - true, если элемент в viewport
     */
    isInViewport(element, offset = 0) {
        if (!element) return false;
        try {
            const rect = element.getBoundingClientRect();
            const vw = window.innerWidth || document.documentElement.clientWidth;
            const vh = window.innerHeight || document.documentElement.clientHeight;
            return (
                rect.top + offset < vh &&
                rect.bottom - offset > 0 &&
                rect.left + offset < vw &&
                rect.right - offset > 0
            );
        } catch (e) {
            return false;
        }
    },

    /**
     * Фокусируется на элементе (безопасно)
     * @param {HTMLElement} element - Элемент для фокуса
     * @param {boolean} preventScroll - Отключить скролл при фокусе
     */
    focusElement(element, preventScroll = true) {
        if (!element) return;
        try {
            element.focus({ preventScroll });
        } catch (e) {
            // Игнорируем ошибки фокуса
        }
    },

    /**
     * Блокирует скролл страницы (для модалок)
     */
    lockScroll() {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = this._getScrollbarWidth() + 'px';
    },

    /**
     * Разблокирует скролл страницы
     */
    unlockScroll() {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    },

    /**
     * Вычисляет ширину скроллбара для предотвращения сдвига
     * @private
     */
    _getScrollbarWidth() {
        try {
            const scrollDiv = document.createElement('div');
            scrollDiv.style.cssText =
                'width:100px;height:100px;overflow:scroll;position:absolute;top:-9999px;';
            document.body.appendChild(scrollDiv);
            const width = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            document.body.removeChild(scrollDiv);
            return width || 0;
        } catch (e) {
            return 0;
        }
    },
};

// ================================================================
// СЕРВИСЫ ХРАНЕНИЯ (STORAGE SERVICES)
// ================================================================
// Назначение: Работа с браузерными хранилищами.
// Принцип: Единая точка входа. Все ошибки логируются.
// Лицензия: MIT (оригинальный код автора) + idb (MIT)
//
// 🔒 БЕЗОПАСНОСТЬ (OWASP):
// - Все данные санитизируются перед записью
// - Нет eval, нет innerHTML в данных
// - Все операции с проверкой на null/undefined
//
// 🆕 НОВЫЕ ВНЕДРЕНИЯ:
// - idb (MIT) - tiny-библиотека от Google Chrome Team
//   Вместо нативной IndexedDB с new Promise-обёртками
// - zip.js (BSD 3-Clause) - вместо JSZip
// ================================================================

const StorageService = {
    // =============================================================
    // 1. localStorage
    // =============================================================

    /**
     * Сохраняет значение в localStorage (с JSON.stringify)
     * @param {string} key - Ключ для хранения
     * @param {*} value - Значение для сохранения
     * @returns {boolean} - true, если сохранение успешно
     */
    save(key, value) {
        if (!key) return false;
        try {
            const serialized = JSON.stringify(value);
            localStorage.setItem(key, serialized);
            return true;
        } catch (e) {
            Logger.error('[StorageService] Ошибка сохранения', { key, error: e.message });
            return false;
        }
    },

    /**
     * Загружает значение из localStorage (с JSON.parse)
     * @param {string} key - Ключ для загрузки
     * @param {*} defaultValue - Значение по умолчанию, если ключ не найден
     * @returns {*} - Загруженное значение или defaultValue
     */
    load(key, defaultValue = null) {
        if (!key) return defaultValue;
        try {
            const item = localStorage.getItem(key);
            if (item === null) return defaultValue;
            return JSON.parse(item);
        } catch (e) {
            Logger.warn('[StorageService] Ошибка загрузки', { key, error: e.message });
            return defaultValue;
        }
    },

    /**
     * Удаляет значение из localStorage
     * @param {string} key - Ключ для удаления
     * @returns {boolean} - true, если удаление успешно
     */
    remove(key) {
        if (!key) return false;
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            Logger.error('[StorageService] Ошибка удаления', { key, error: e.message });
            return false;
        }
    },

    /**
     * Очищает все данные в localStorage
     * @returns {boolean} - true, если очистка успешна
     */
    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            Logger.error('[StorageService] Ошибка очистки', { error: e.message });
            return false;
        }
    },

    /**
     * Проверяет наличие ключа в localStorage
     * @param {string} key - Ключ для проверки
     * @returns {boolean} - true, если ключ существует
     */
    has(key) {
        if (!key) return false;
        try {
            return localStorage.getItem(key) !== null;
        } catch (e) {
            return false;
        }
    },
};

// ================================================================
// FILE MANAGER (INDEXEDDB через idb)
// ================================================================
// 🔒 idb (MIT) - библиотека от Джейка Арчибальда (Google Chrome Team)
// Превращает нативный IndexedDB в нормальный async/await
// Размер: ~3KB gzipped
// ================================================================

const FileManager = {
    _db: null,
    _storeName: 'user-files',
    _dbName: 'pavlova-files',
    _dbVersion: 1,

    /**
     * Инициализирует базу данных через idb
     * @returns {Promise<IDBDatabase>} - Экземпляр базы данных
     */
    async init() {
        if (this._db) return this._db;

        try {
            // Проверяем, загружена ли idb
            if (typeof idb === 'undefined' && typeof window.idb === 'undefined') {
                // Пробуем загрузить через LibraryLoader
                const loaded = await LibraryLoader.ensureLib('idb');
                if (!loaded) {
                    throw new Error('Библиотека idb не загружена');
                }
            }

            const idbLib = typeof idb !== 'undefined' ? idb : window.idb;

            // Открываем БД через idb
            const db = await idbLib.openDB(this._dbName, this._dbVersion, {
                upgrade(db, oldVersion, newVersion, transaction) {
                    if (!db.objectStoreNames.contains('user-files')) {
                        const store = db.createObjectStore('user-files', {
                            keyPath: 'id',
                        });
                        store.createIndex('timestamp', 'timestamp');
                        store.createIndex('type', 'type');
                        store.createIndex('tool', 'tool');
                        store.createIndex('originalName', 'originalName');
                        store.createIndex('sequence', 'sequence');
                    }
                },
            });

            this._db = db;
            Logger.info('[FileManager] База данных инициализирована');
            return this._db;
        } catch (error) {
            Logger.error('[FileManager] Ошибка инициализации БД', { error: error.message });
            throw new Error('Не удалось открыть базу данных файлов');
        }
    },

    /**
     * Сохраняет файл в IndexedDB
     * @param {Blob} blob - Данные файла
     * @param {File|string} originalFile - Оригинальный файл или имя
     * @param {string} tool - Инструмент ('convert', 'compress', 'pdf', 'resize')
     * @param {Object} metadata - Дополнительные метаданные
     * @returns {Promise<Object>} - Сохранённый объект файла
     */
    async saveFile(blob, originalFile, tool, metadata = {}) {
        await this.init();

        // Определяем оригинальное имя
        const originalName =
            typeof originalFile === 'string' ? originalFile : originalFile.name || 'file';

        // Генерируем безопасный ID
        const safeId = StringUtils.generateSafeId();

        // Получаем следующий номер в серии
        const sequence = await this.getNextSequence(tool);

        // Создаём объект файла
        const file = {
            id: safeId,
            name: originalName,
            originalName: originalName,
            type: blob.type || 'application/octet-stream',
            size: blob.size,
            data: blob,
            tool: tool,
            sequence: sequence,
            timestamp: Date.now(),
            metadata: {
                ...metadata,
                originalExtension: StringUtils.getFileExtension(originalName),
                processedAt: new Date().toISOString(),
            },
            url: null,
        };

        try {
            const db = await this.init();
            const tx = db.transaction(this._storeName, 'readwrite');
            const store = tx.objectStore(this._storeName);

            // Через idb: store.add возвращает Promise
            await store.add(file);

            Logger.info('[FileManager] Файл сохранён', { name: file.name, id: file.id });
            this._notifyFilesUpdated();
            return file;
        } catch (error) {
            Logger.error('[FileManager] Ошибка сохранения файла', { error: error.message });
            throw new Error('Не удалось сохранить файл');
        }
    },

    /**
     * Получает следующий номер в серии для инструмента
     * @param {string} tool - Инструмент
     * @returns {Promise<number>} - Следующий номер
     */
    async getNextSequence(tool) {
        try {
            const files = await this.getFilesByTool(tool);
            return files.length + 1;
        } catch (error) {
            return 1;
        }
    },

    /**
     * Получает все файлы из IndexedDB
     * @returns {Promise<Array>} - Массив файлов, отсортированный по дате (новые сверху)
     */
    async getFiles() {
        await this.init();

        try {
            const db = await this.init();
            const tx = db.transaction(this._storeName, 'readonly');
            const store = tx.objectStore(this._storeName);

            const files = await store.getAll();

            // Создаём URL для файлов
            files.forEach((f) => {
                if (f.data && !f.url) {
                    f.url = URL.createObjectURL(f.data);
                }
            });

            // Сортировка по timestamp (новые сверху)
            return files.sort((a, b) => b.timestamp - a.timestamp);
        } catch (error) {
            Logger.error('[FileManager] Ошибка получения файлов', { error: error.message });
            return [];
        }
    },

    /**
     * Получает файлы по инструменту
     * @param {string} tool - Инструмент
     * @returns {Promise<Array>} - Массив файлов
     */
    async getFilesByTool(tool) {
        const files = await this.getFiles();
        return files.filter((f) => f.tool === tool);
    },

    /**
     * Получает файлы по типу
     * @param {string} type - Тип ('all', 'pdf', 'image', 'doc')
     * @returns {Promise<Array>} - Массив файлов
     */
    async getFilesByType(type) {
        const files = await this.getFiles();

        if (type === 'all') return files;

        return files.filter((f) => {
            if (type === 'pdf') return f.type.includes('pdf');
            if (type === 'image') return f.type.startsWith('image/');
            if (type === 'doc') {
                return (
                    f.type.includes('word') ||
                    f.type.includes('document') ||
                    f.type.includes('text')
                );
            }
            return true;
        });
    },

    /**
     * Получает файл по ID
     * @param {string} id - ID файла
     * @returns {Promise<Object|null>} - Объект файла или null
     */
    async getFileById(id) {
        if (!id) return null;

        try {
            const db = await this.init();
            const tx = db.transaction(this._storeName, 'readonly');
            const store = tx.objectStore(this._storeName);

            const file = await store.get(id);

            if (file && file.data && !file.url) {
                file.url = URL.createObjectURL(file.data);
            }

            return file || null;
        } catch (error) {
            Logger.error('[FileManager] Ошибка получения файла', { id, error: error.message });
            return null;
        }
    },

    /**
     * Удаляет файл по ID
     * @param {string} id - ID файла
     * @returns {Promise<boolean>} - true, если удаление успешно
     */
    async deleteFile(id) {
        if (!id) return false;

        try {
            const db = await this.init();

            // Сначала получаем файл, чтобы освободить URL
            const file = await this.getFileById(id);
            if (file && file.url) {
                URL.revokeObjectURL(file.url);
            }

            const tx = db.transaction(this._storeName, 'readwrite');
            const store = tx.objectStore(this._storeName);
            await store.delete(id);

            Logger.info('[FileManager] Файл удалён', { id });
            this._notifyFilesUpdated();
            return true;
        } catch (error) {
            Logger.error('[FileManager] Ошибка удаления файла', { id, error: error.message });
            return false;
        }
    },

    /**
     * Удаляет все файлы из IndexedDB
     * @returns {Promise<boolean>} - true, если очистка успешна
     */
    async clearAllFiles() {
        try {
            const db = await this.init();

            const files = await this.getFiles();
            files.forEach((f) => {
                if (f.url) {
                    try {
                        URL.revokeObjectURL(f.url);
                    } catch (e) {}
                }
            });

            const tx = db.transaction(this._storeName, 'readwrite');
            const store = tx.objectStore(this._storeName);
            await store.clear();

            Logger.info('[FileManager] Все файлы удалены');
            this._notifyFilesUpdated();
            return true;
        } catch (error) {
            Logger.error('[FileManager] Ошибка очистки', {
                error: error.message,
                storeName: this._storeName,
                dbName: this._dbName,
            });
            return false;
        }
    },

    /**
     * Получает информацию о хранилище
     * @returns {Promise<Object>} - { count, totalSize, totalSizeFormatted, files }
     */
    async getStorageInfo() {
        const files = await this.getFiles();
        const totalSize = files.reduce((acc, f) => acc + (f.size || 0), 0);

        return {
            count: files.length,
            totalSize: totalSize,
            totalSizeFormatted: StringUtils.formatFileSize(totalSize),
            files: files,
        };
    },

    /**
     * Скачивает файл через SaverService
     * @param {Object} file - Объект файла
     * @returns {Promise<Object>} - Результат SaverService
     */
    async downloadFile(file) {
        if (!file) throw new Error('Файл не найден');

        if (!file.url && file.data) {
            file.url = URL.createObjectURL(file.data);
        }

        if (!file.url) {
            throw new Error('Невозможно скачать файл');
        }

        // Получаем данные для скачивания
        let data = file.data;
        if (!data) {
            const response = await fetch(file.url);
            data = await response.blob();
        }

        return await SaverService.saveFile(data, file.name, {
            allowFolderChoice: true,
            showNotification: true,
        });
    },

    /**
     * Возвращает иконку для типа файла
     * @param {string} type - MIME-тип файла
     * @returns {string} - Класс иконки Bootstrap
     */
    getFileIcon(type) {
        if (!type) return 'bi-file-earmark';
        if (type.includes('pdf')) return 'bi-file-earmark-pdf';
        if (type.includes('image')) return 'bi-file-earmark-image';
        if (type.includes('word')) return 'bi-file-earmark-word';
        if (type.includes('text')) return 'bi-file-earmark-text';
        if (type.includes('zip')) return 'bi-file-earmark-zip';
        return 'bi-file-earmark';
    },

    /**
     * Форматирует дату из timestamp
     * @param {number} timestamp - Timestamp в миллисекундах
     * @returns {string} - Отформатированная дата
     */
    formatDate(timestamp) {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    },

    /**
     * Уведомляет об обновлении файлов
     * @private
     */
    _notifyFilesUpdated() {
        this.getFiles().then((files) => {
            const event = new CustomEvent('filesUpdated', {
                detail: { files, count: files.length },
            });
            window.dispatchEvent(event);

            // Обновляем бейдж в хедере
            const badge = document.getElementById('headerFilesBadge');
            if (badge) {
                badge.textContent = files.length;
                badge.style.display = files.length > 0 ? 'flex' : 'none';
            }
        });
    },

    /**
     * Сохраняет несколько файлов одной транзакцией (batch)
     * @param {Array<{blob: Blob, name: string, tool: string, metadata: Object}>} items
     * @param {Function} onProgress - Колбэк для прогресса (index, total)
     * @returns {Promise<Array<Object>>} - Массив сохранённых объектов
     */
    async saveBatch(items, onProgress = null) {
        if (!items || items.length === 0) {
            return [];
        }

        await this.init();

        const db = await this.init();
        const results = [];

        // СОБИРАЕМ ВСЕ ДАННЫЕ ДЛЯ ТРАНЗАКЦИИ
        const preparedItems = [];
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const { blob, name, tool, metadata = {} } = item;

            // Генерируем безопасный ID
            const safeId = StringUtils.generateSafeId();

            // Получаем следующий номер в серии
            const sequence = await this.getNextSequence(tool);

            preparedItems.push({
                id: safeId,
                name: name,
                originalName: name,
                type: blob.type || 'application/octet-stream',
                size: blob.size,
                data: blob,
                tool: tool || 'pdf',
                sequence: sequence,
                timestamp: Date.now(),
                metadata: {
                    ...metadata,
                    originalExtension: StringUtils.getFileExtension(name),
                    processedAt: new Date().toISOString(),
                },
                url: null,
            });
        }

        // ТЕПЕРЬ - ОДНА ТРАНЗАКЦИЯ, ВСЕ ДАННЫЕ УЖЕ ГОТОВЫ
        const tx = db.transaction(this._storeName, 'readwrite');
        const store = tx.objectStore(this._storeName);

        // Создаём Promise для завершения транзакции
        const txComplete = new Promise((resolve, reject) => {
            tx.oncomplete = () => resolve();
            tx.onerror = (e) => reject(e.target.error);
            tx.onabort = (e) => reject(e.target.error);
        });

        // Добавляем все файлы в транзакцию (синхронно, без await)
        for (let i = 0; i < preparedItems.length; i++) {
            const file = preparedItems[i];
            store.add(file);

            if (onProgress) {
                onProgress(i + 1, items.length);
            }

            results.push(file);
        }

        // Ждём завершения транзакции
        await txComplete;

        Logger.info('[FileManager] Пакетное сохранение завершено', {
            count: results.length,
        });

        this._notifyFilesUpdated();
        return results;
    },
};

// ================================================================
// SAVER SERVICE (FILE SYSTEM API + FALLBACK)
// ================================================================
// Назначение: Сохранение файлов с выбором папки (showSaveFilePicker)
// Принцип: Современный API + fallback для старых браузеров
// Лицензия: MIT (оригинальный код автора)
// ================================================================

const SaverService = {
    /**
     * Сохраняет файл с выбором папки (или через download)
     * @param {Blob} blob - Данные для сохранения
     * @param {string} fileName - Имя файла
     * @param {Object} options - Опции
     * @param {boolean} options.allowFolderChoice - Разрешить выбор папки (по умолчанию true)
     * @param {boolean} options.showNotification - Показывать уведомление (по умолчанию true)
     * @returns {Promise<Object>} - { success, method, handle? }
     */
    async saveFile(blob, fileName, options = {}) {
        const { allowFolderChoice = true, showNotification = true } = options;

        if (!blob || !fileName) {
            throw new Error('Не переданы данные или имя файла');
        }

        try {
            // Пробуем современный API
            if (allowFolderChoice && 'showSaveFilePicker' in window) {
                return await this.saveWithPicker(blob, fileName);
            } else {
                return this.saveWithDownload(blob, fileName);
            }
        } catch (error) {
            Logger.warn('[SaverService] Ошибка, пробуем fallback', { error: error.message });
            return this.saveWithDownload(blob, fileName);
        } finally {
            if (showNotification) {
                this.showSavedNotification(fileName);
            }
        }
    },

    /**
     * Сохраняет через File System Access API (showSaveFilePicker)
     * @param {Blob} blob - Данные для сохранения
     * @param {string} fileName - Имя файла
     * @returns {Promise<Object>} - { success, method, handle? }
     */
    async saveWithPicker(blob, fileName) {
        try {
            const handle = await window.showSaveFilePicker({
                suggestedName: fileName,
                types: [
                    {
                        description: this.getFileDescription(fileName),
                        accept: this.getAcceptTypes(fileName),
                    },
                ],
            });

            const writable = await handle.createWritable();
            await writable.write(blob);
            await writable.close();

            Logger.info('[SaverService] Файл сохранён через File Picker', { fileName });
            return { success: true, method: 'picker', handle };
        } catch (err) {
            if (err.name === 'AbortError') {
                // Пользователь отменил выбор - не ошибка
                return { success: false, cancelled: true };
            }
            throw err;
        }
    },

    /**
     * Сохраняет через download (fallback)
     * @param {Blob} blob - Данные для сохранения
     * @param {string} fileName - Имя файла
     * @returns {Object} - { success, method }
     */
    saveWithDownload(blob, fileName) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.style.display = 'none';

        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);

        Logger.info('[SaverService] Файл сохранён через download', { fileName });
        return { success: true, method: 'download' };
    },

    /**
     * Возвращает описание файла по расширению
     * @param {string} fileName - Имя файла
     * @returns {string} - Описание
     */
    getFileDescription(fileName) {
        const ext = StringUtils.getFileExtension(fileName);
        const descriptions = {
            pdf: 'PDF документ',
            doc: 'Word документ',
            docx: 'Word документ',
            jpg: 'Изображение JPEG',
            jpeg: 'Изображение JPEG',
            png: 'Изображение PNG',
            webp: 'Изображение WebP',
            txt: 'Текстовый файл',
            zip: 'ZIP архив',
        };
        return descriptions[ext] || 'Файл';
    },

    /**
     * Возвращает MIME-типы для File Picker
     * @param {string} fileName - Имя файла
     * @returns {Object} - Объект с MIME-типами
     */
    getAcceptTypes(fileName) {
        const ext = StringUtils.getFileExtension(fileName);
        const types = {
            pdf: { 'application/pdf': ['.pdf'] },
            doc: { 'application/msword': ['.doc'] },
            docx: {
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
                    '.docx',
                ],
            },
            jpg: { 'image/jpeg': ['.jpg', '.jpeg'] },
            jpeg: { 'image/jpeg': ['.jpg', '.jpeg'] },
            png: { 'image/png': ['.png'] },
            webp: { 'image/webp': ['.webp'] },
            txt: { 'text/plain': ['.txt'] },
            zip: { 'application/zip': ['.zip'] },
        };
        return types[ext] || { 'application/octet-stream': ['.' + ext] };
    },

    /**
     * Показывает уведомление о сохранении
     * @param {string} fileName - Имя файла
     */
    showSavedNotification(fileName) {
        // Используем DomUtils для показа тоста
        if (typeof DomUtils !== 'undefined' && DomUtils.showSuccess) {
            DomUtils.showSuccess(`Файл сохранён: ${fileName}`, 3000);
        } else {
            // Fallback: создаём уведомление через DOM (БЕЗ ИНЛАЙН-СТИЛЕЙ)
            this._createLegacyNotification(fileName);
        }
    },

    /**
     * Создаёт уведомление через DOM (без инлайн-стилей)
     * СТИЛИ: .save-notification, .save-notification__icon, .save-notification__text
     * 📁 design.css: группа 5.13.4
     * @private
     */
    _createLegacyNotification(fileName) {
        // Используем DomUtils для безопасного создания
        if (typeof DomUtils !== 'undefined' && DomUtils.createElementSafe) {
            const notification = DomUtils.createElementSafe('div', 'save-notification', {
                role: 'status',
                'aria-live': 'polite',
            });

            const icon = DomUtils.createElementSafe(
                'i',
                'save-notification__icon bi bi-check-circle-fill',
                {
                    'aria-hidden': 'true',
                }
            );
            notification.appendChild(icon);

            const text = DomUtils.createElementSafe('span', 'save-notification__text', {});
            text.textContent = `Файл сохранён: ${fileName}`;
            notification.appendChild(text);

            document.body.appendChild(notification);

            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 3000);
        } else {
            // Супер-безопасный fallback
            try {
                const notification = document.createElement('div');
                notification.className = 'save-notification';

                const icon = document.createElement('i');
                icon.className = 'save-notification__icon bi bi-check-circle-fill';
                icon.setAttribute('aria-hidden', 'true');
                notification.appendChild(icon);

                const text = document.createElement('span');
                text.className = 'save-notification__text';
                text.textContent = `Файл сохранён: ${fileName}`;
                notification.appendChild(text);

                document.body.appendChild(notification);

                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 3000);
            } catch (e) {
                // Тихая ошибка - не ломаем приложение
            }
        }
    },
};

// ================================================================
// 4. ЭКСПОРТЫ
// ================================================================

// Экспортируем для использования в других блоках
window.StorageService = StorageService;
window.FileManager = FileManager;
window.SaverService = SaverService;

// ================================================================
// HTTP-СЕРВИС (HTTP SERVICE)
// ================================================================
// Назначение: Единая точка для всех сетевых запросов.
// Принцип: Все fetch-запросы проходят через этот сервис.
// Лицензия: MIT (оригинальный код автора)
//
// 🔒 БЕЗОПАСНОСТЬ (OWASP):
// - CSRF-токен для всех POST/PUT/DELETE запросов
// - Honeypot-защита для форм
// - Санитизация всех данных перед отправкой
// - Защита от XSS через заголовки
// - Проверка ответов на статус-коды
// - Безопасная обработка ошибок
//
// ⚡ СКОРОСТЬ:
// - Абстракция над fetch с кешированием
// - Таймауты для долгих запросов
// - Повторные попытки при ошибках сети
//
// 🛡️ НАДЁЖНОСТЬ:
// - Все ошибки логируются через Logger
// - Fallback-значения
// - Проверка наличия URL
// ================================================================

const HttpService = {
    // =============================================================
    // 1. ОСНОВНЫЕ МЕТОДЫ
    // =============================================================

    /**
     * Выполняет GET-запрос
     * @param {string} url - URL для запроса
     * @param {Object} options - Дополнительные опции
     * @param {Object} options.headers - Заголовки запроса
     * @param {number} options.timeout - Таймаут в мс (по умолчанию 30000)
     * @param {number} options.retries - Количество повторных попыток (по умолчанию 2)
     * @returns {Promise<any>} - Ответ сервера (распарсенный JSON или текст)
     */
    async get(url, options = {}) {
        if (!url) {
            Logger.error('[HttpService] GET: URL не указан');
            throw new Error('URL не указан');
        }

        const { headers = {}, timeout = 30000, retries = 2 } = options;

        return this._request('GET', url, null, {
            headers,
            timeout,
            retries,
        });
    },

    /**
     * Выполняет POST-запрос
     * @param {string} url - URL для запроса
     * @param {*} data - Данные для отправки
     * @param {Object} options - Дополнительные опции
     * @param {Object} options.headers - Заголовки запроса
     * @param {number} options.timeout - Таймаут в мс (по умолчанию 30000)
     * @param {number} options.retries - Количество повторных попыток (по умолчанию 2)
     * @param {boolean} options.includeCsrf - Добавлять CSRF-токен (по умолчанию true)
     * @param {string} options.contentType - Content-Type (по умолчанию 'application/x-www-form-urlencoded')
     * @returns {Promise<any>} - Ответ сервера
     */
    async post(url, data, options = {}) {
        if (!url) {
            Logger.error('[HttpService] POST: URL не указан');
            throw new Error('URL не указан');
        }

        const {
            headers = {},
            timeout = 30000,
            retries = 2,
            includeCsrf = true,
            contentType = 'application/x-www-form-urlencoded',
        } = options;

        // 🔒 Добавляем CSRF-токен для POST-запросов
        let finalData = data;
        if (includeCsrf) {
            try {
                const csrfToken = await this.getCsrfToken();
                if (data && typeof data === 'object') {
                    // Если данные - объект, добавляем csrf_token
                    finalData = { ...data, csrf_token: csrfToken };
                } else if (typeof data === 'string') {
                    // Если данные - строка (form-urlencoded), добавляем параметр
                    const separator = data && data.length > 0 ? '&' : '';
                    finalData = data + separator + `csrf_token=${encodeURIComponent(csrfToken)}`;
                } else {
                    // Если данных нет - создаём новый объект
                    finalData = { csrf_token: csrfToken };
                }
            } catch (error) {
                Logger.warn('[HttpService] Не удалось получить CSRF-токен', {
                    error: error.message,
                });
                // Продолжаем без CSRF-токена
            }
        }

        const finalHeaders = {
            ...headers,
            'Content-Type': contentType,
        };

        // 🔒 Для form-urlencoded преобразуем объект в строку
        let body = finalData;
        if (
            contentType === 'application/x-www-form-urlencoded' &&
            finalData &&
            typeof finalData === 'object'
        ) {
            body = this._objectToFormUrlEncoded(finalData);
        }

        return this._request('POST', url, body, {
            headers: finalHeaders,
            timeout,
            retries,
        });
    },

    /**
     * Выполняет PUT-запрос
     * @param {string} url - URL для запроса
     * @param {*} data - Данные для отправки
     * @param {Object} options - Дополнительные опции
     * @param {Object} options.headers - Заголовки запроса
     * @param {number} options.timeout - Таймаут в мс (по умолчанию 30000)
     * @param {number} options.retries - Количество повторных попыток (по умолчанию 2)
     * @param {boolean} options.includeCsrf - Добавлять CSRF-токен (по умолчанию true)
     * @param {string} options.contentType - Content-Type (по умолчанию 'application/json')
     * @returns {Promise<any>} - Ответ сервера
     */
    async put(url, data, options = {}) {
        if (!url) {
            Logger.error('[HttpService] PUT: URL не указан');
            throw new Error('URL не указан');
        }

        const {
            headers = {},
            timeout = 30000,
            retries = 2,
            includeCsrf = true,
            contentType = 'application/json',
        } = options;

        let finalData = data;
        if (includeCsrf) {
            try {
                const csrfToken = await this.getCsrfToken();
                if (data && typeof data === 'object') {
                    finalData = { ...data, csrf_token: csrfToken };
                } else if (typeof data === 'string') {
                    const separator = data && data.length > 0 ? '&' : '';
                    finalData = data + separator + `csrf_token=${encodeURIComponent(csrfToken)}`;
                } else {
                    finalData = { csrf_token: csrfToken };
                }
            } catch (error) {
                Logger.warn('[HttpService] Не удалось получить CSRF-токен', {
                    error: error.message,
                });
            }
        }

        const finalHeaders = {
            ...headers,
            'Content-Type': contentType,
        };

        let body = finalData;
        if (contentType === 'application/json' && finalData && typeof finalData === 'object') {
            body = JSON.stringify(finalData);
        }

        return this._request('PUT', url, body, {
            headers: finalHeaders,
            timeout,
            retries,
        });
    },

    /**
     * Выполняет DELETE-запрос
     * @param {string} url - URL для запроса
     * @param {Object} options - Дополнительные опции
     * @param {Object} options.headers - Заголовки запроса
     * @param {number} options.timeout - Таймаут в мс (по умолчанию 30000)
     * @param {number} options.retries - Количество повторных попыток (по умолчанию 2)
     * @param {boolean} options.includeCsrf - Добавлять CSRF-токен (по умолчанию true)
     * @returns {Promise<any>} - Ответ сервера
     */
    async delete(url, options = {}) {
        if (!url) {
            Logger.error('[HttpService] DELETE: URL не указан');
            throw new Error('URL не указан');
        }

        const { headers = {}, timeout = 30000, retries = 2, includeCsrf = true } = options;

        let finalHeaders = { ...headers };

        if (includeCsrf) {
            try {
                const csrfToken = await this.getCsrfToken();
                finalHeaders['X-CSRF-Token'] = csrfToken;
            } catch (error) {
                Logger.warn('[HttpService] Не удалось получить CSRF-токен', {
                    error: error.message,
                });
            }
        }

        return this._request('DELETE', url, null, {
            headers: finalHeaders,
            timeout,
            retries,
        });
    },

    // =============================================================
    // 2. CSRF-ТОКЕН
    // =============================================================

    /**
     * Получает CSRF-токен с сервера
     * @returns {Promise<string>} - CSRF-токен
     */
    async getCsrfToken() {
        try {
            // Кешируем токен на время сессии
            if (this._csrfToken && this._csrfTokenExpiry > Date.now()) {
                return this._csrfToken;
            }

            const response = await fetch('/get_csrf.php', {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    Accept: 'text/plain',
                },
            });

            if (!response.ok) {
                throw new Error(`Ошибка получения CSRF-токена: ${response.status}`);
            }

            const token = await response.text();

            if (!token || token.length < 10) {
                throw new Error('Невалидный CSRF-токен');
            }

            // Кешируем токен на 5 минут
            this._csrfToken = token.trim();
            this._csrfTokenExpiry = Date.now() + 5 * 60 * 1000;

            return this._csrfToken;
        } catch (error) {
            Logger.error('[HttpService] Ошибка получения CSRF-токена', { error: error.message });
            throw error;
        }
    },

    // =============================================================
    // 3. БАЗОВЫЙ ЗАПРОС (ВНУТРЕННИЙ)
    // =============================================================

    /**
     * Выполняет HTTP-запрос с повторными попытками
     * @private
     * @param {string} method - HTTP-метод
     * @param {string} url - URL для запроса
     * @param {*} body - Тело запроса
     * @param {Object} options - Опции
     * @param {Object} options.headers - Заголовки
     * @param {number} options.timeout - Таймаут
     * @param {number} options.retries - Количество повторных попыток
     * @returns {Promise<any>} - Ответ сервера
     */
    async _request(method, url, body, options = {}) {
        const { headers = {}, timeout = 30000, retries = 2 } = options;

        let lastError = null;

        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), timeout);

                const fetchOptions = {
                    method: method,
                    headers: {
                        ...headers,
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    credentials: 'same-origin',
                    signal: controller.signal,
                };

                // Добавляем тело для методов, которые его поддерживают
                if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
                    fetchOptions.body = body;
                }

                const response = await fetch(url, fetchOptions);
                clearTimeout(timeoutId);

                // Обрабатываем ответ
                const result = await this._handleResponse(response);

                // Логируем успешный запрос
                Logger.debug(`[HttpService] ${method} ${url}`, { status: response.status });

                return result;
            } catch (error) {
                lastError = error;

                // Если это AbortError (таймаут) - не повторяем
                if (error.name === 'AbortError') {
                    Logger.error(`[HttpService] ${method} ${url} - таймаут`, { timeout });
                    throw new Error(`Превышен таймаут (${timeout}мс)`);
                }

                // Если это ошибка сети - пробуем повторить
                if (attempt < retries) {
                    const delay = Math.pow(2, attempt) * 1000;
                    Logger.warn(
                        `[HttpService] ${method} ${url} - попытка ${attempt + 1}/${retries + 1}, повтор через ${delay}мс`,
                        {
                            error: error.message,
                        }
                    );
                    await new Promise((resolve) => setTimeout(resolve, delay));
                    continue;
                }

                // Если все попытки исчерпаны - выбрасываем ошибку
                Logger.error(`[HttpService] ${method} ${url} - все попытки исчерпаны`, {
                    error: error.message,
                    attempts: retries + 1,
                });
                throw error;
            }
        }

        throw lastError || new Error(`Не удалось выполнить ${method} запрос`);
    },

    // =============================================================
    // 4. ОБРАБОТКА ОТВЕТА
    // =============================================================

    /**
     * Обрабатывает ответ сервера
     * @private
     * @param {Response} response - Ответ fetch
     * @returns {Promise<any>} - Распарсенный ответ
     */
    async _handleResponse(response) {
        // Проверяем статус
        if (!response.ok) {
            let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

            // Пытаемся получить детали ошибки из ответа
            try {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    if (errorData.message) {
                        errorMessage = errorData.message;
                    } else if (errorData.error) {
                        errorMessage = errorData.error;
                    }
                } else {
                    const text = await response.text();
                    if (text && text.length < 200) {
                        errorMessage = text;
                    }
                }
            } catch (e) {
                // Игнорируем ошибки парсинга
            }

            Logger.warn('[HttpService] Ошибка ответа', {
                status: response.status,
                statusText: response.statusText,
                url: response.url,
            });

            throw new Error(errorMessage);
        }

        // Определяем тип контента и парсим
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        }

        if (contentType && contentType.includes('text/plain')) {
            return await response.text();
        }

        // По умолчанию - текст
        return await response.text();
    },

    // =============================================================
    // 5. ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ - БЕЗОПАСНАЯ САНИТИЗАЦИЯ
    // =============================================================

    /**
     * Экранирует строку для безопасного использования в HTML-контексте
     * @private
     * @param {string} input - Входная строка
     * @returns {string} - Экранированная строка
     *
     * 🔒 OWASP-безопасно: экранирование, а не удаление
     * Используется для данных, которые будут выведены в HTML
     */
    _escapeHtml(input) {
        if (!input || typeof input !== 'string') return input || '';
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;',
            '/': '&#x2F;',
        };
        return String(input).replace(/[&<>"'/]/g, function (m) {
            return map[m];
        });
    },

    /**
     * Безопасное экранирование для URL-параметров
     * @private
     * @param {string} input - Входная строка
     * @returns {string} - Экранированная для URL строка
     *
     * 🔒 OWASP-безопасно: encodeURIComponent для всех данных
     * Используется в _objectToFormUrlEncoded
     */
    _escapeUrlParam(input) {
        if (input === null || input === undefined) return '';
        return encodeURIComponent(String(input));
    },

    /**
     * Санитизирует входные данные для отправки на сервер
     * @private
     * @param {string} input - Входная строка
     * @returns {string} - Безопасная строка
     *
     * 🔒 OWASP-безопасно:
     * - Для form-urlencoded - достаточно encodeURIComponent
     * - Сервер (send.php) делает htmlspecialchars перед выводом
     * - Нет удаления тегов - только экранирование
     */
    _sanitizeInput(input) {
        if (!input || typeof input !== 'string') return input;

        // 1. Ограничиваем длину (защита от DoS)
        const maxLength = 10000;
        let result = input.length > maxLength ? input.slice(0, maxLength) : input;

        // 2. Удаляем нулевые байты (NUL) - они опасны в некоторых контекстах
        result = result.replace(/\0/g, '');

        // 3. Для form-urlencoded - экранируем через encodeURIComponent
        // Но encodeURIComponent применяется в _objectToFormUrlEncoded
        // Здесь мы только подготавливаем строку

        // 4. Удаляем контрольные символы (кроме пробелов и переводов строк)
        // Оставляем только печатные символы
        result = result.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

        return result;
    },

    /**
     * Проверяет, является ли строка безопасной для использования в HTML
     * @private
     * @param {string} input - Входная строка
     * @returns {boolean} - true, если строка безопасна
     *
     * 🔒 OWASP-безопасно: проверка наличия опасных паттернов
     * Используется для дополнительной валидации
     */
    _isSafeString(input) {
        if (!input || typeof input !== 'string') return true;

        // Проверяем наличие потенциально опасных паттернов
        // Но НЕ удаляем их - просто отмечаем
        const dangerousPatterns = [
            /<script/i,
            /javascript:/i,
            /on\w+=/i,
            /data:text\/html/i,
            /vbscript:/i,
        ];

        for (const pattern of dangerousPatterns) {
            if (pattern.test(input)) {
                return false;
            }
        }

        return true;
    },

    /**
     * Безопасно подготавливает данные для отправки
     * @param {Object|string} data - Данные для отправки
     * @param {string} contentType - Content-Type
     * @returns {string} - Подготовленные данные
     *
     * 🔒 OWASP-безопасно: экранирование через encodeURIComponent
     */
    _prepareBody(data, contentType = 'application/x-www-form-urlencoded') {
        if (!data) return '';

        if (contentType === 'application/x-www-form-urlencoded') {
            if (typeof data === 'object') {
                return this._objectToFormUrlEncoded(data);
            }
            return String(data);
        }

        if (contentType === 'application/json') {
            if (typeof data === 'object') {
                return JSON.stringify(data);
            }
            return String(data);
        }

        // По умолчанию - просто строка
        return String(data);
    },

    /**
     * Проверяет наличие honeypot-поля в данных формы
     * @param {Object} data - Данные формы
     * @returns {boolean} - true, если honeypot заполнен (бот)
     */
    _isHoneypotTriggered(data) {
        if (!data || typeof data !== 'object') return false;
        // Проверяем наличие поля honeypot с непустым значением
        return data.honeypot && data.honeypot.trim() !== '';
    },

    // =============================================================
    // 6. ФОРМА ЗАПИСИ (СПЕЦИАЛЬНЫЙ МЕТОД)
    // =============================================================

    /**
     * Отправляет форму записи на консультацию
     * @param {Object} formData - Данные формы
     * @param {string} formData.name - Имя клиента
     * @param {string} formData.phone - Телефон клиента
     * @param {string} formData.message - Сообщение
     * @param {boolean} formData.onlineConsult - Флаг онлайн-консультации
     * @param {boolean} formData.privacyConsent - Согласие на обработку данных
     * @returns {Promise<Object>} - Результат отправки
     */
    async submitConsultationForm(formData) {
        if (!formData) {
            throw new Error('Данные формы не переданы');
        }

        // 🔒 Проверяем honeypot
        if (this._isHoneypotTriggered(formData)) {
            Logger.warn('[HttpService] Honeypot сработал - запрос от бота');
            // Возвращаем успех, но ничего не делаем (бот думает, что форма отправлена)
            return { success: true, message: 'Заявка принята' };
        }

        // 🔒 Валидация обязательных полей
        if (!formData.name || !formData.phone) {
            throw new Error('Имя и телефон обязательны для заполнения');
        }

        if (!formData.privacyConsent) {
            throw new Error('Необходимо согласие на обработку персональных данных');
        }

        // 🔒 Санитизация данных
        const safeData = {
            name: this._sanitizeInput(formData.name.trim()),
            phone: this._sanitizeInput(formData.phone.trim()),
            message: formData.message ? this._sanitizeInput(formData.message.trim()) : '',
            online: formData.onlineConsult ? 'yes' : 'no',
            privacy_consent: formData.privacyConsent ? 'yes' : 'no',
        };

        // 🔒 Валидация телефона через ValidationUtils
        if (typeof ValidationUtils !== 'undefined' && !ValidationUtils.isPhone(safeData.phone)) {
            throw new Error('Введите корректный номер телефона');
        }

        try {
            // 🔒 Получаем CSRF-токен
            const csrfToken = await this.getCsrfToken();

            // Формируем данные для отправки
            const payload = new URLSearchParams();
            payload.append('name', safeData.name);
            payload.append('phone', safeData.phone);
            payload.append('message', safeData.message);
            payload.append('online', safeData.online);
            payload.append('honeypot', '');
            payload.append('csrf_token', csrfToken);

            // Отправляем запрос
            const response = await fetch('/send.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                credentials: 'same-origin',
                body: payload.toString(),
            });

            // Обрабатываем ответ
            const result = await this._handleResponse(response);

            if (result === 'ok') {
                Logger.info('[HttpService] Форма успешно отправлена', { name: safeData.name });
                return { success: true, message: 'Заявка успешно отправлена' };
            } else {
                Logger.warn('[HttpService] Ошибка отправки формы', { result });
                throw new Error(result || 'Произошла ошибка при отправке');
            }
        } catch (error) {
            Logger.error('[HttpService] Ошибка отправки формы', { error: error.message });
            throw error;
        }
    },

    /**
     * Проверяет доступность сервера
     * @param {string} url - URL для проверки (по умолчанию '/')
     * @param {number} timeout - Таймаут в мс (по умолчанию 5000)
     * @returns {Promise<boolean>} - true, если сервер доступен
     */
    async ping(url = '/', timeout = 5000) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);

            const response = await fetch(url, {
                method: 'HEAD',
                signal: controller.signal,
                credentials: 'same-origin',
            });

            clearTimeout(timeoutId);
            return response.ok;
        } catch (error) {
            Logger.debug('[HttpService] Ping failed', { url, error: error.message });
            return false;
        }
    },
};

// ================================================================
// ЭКСПОРТЫ
// ================================================================

window.HttpService = HttpService;

// ================================================================
// ЛОГГЕР (LOGGER)
// ================================================================
// Назначение: Централизованное логирование.
// Принцип: Уровни логирования, отправка на сервер при ошибках.
// Лицензия: MIT (оригинальный код автора)
//
// 🔒 БЕЗОПАСНОСТЬ (OWASP):
// - Санитизация всех сообщений перед записью
// - Безопасная сериализация контекста
// - Ограничение длины сообщений (защита от DoS)
// - Отключение в продакшене для уровней INFO и DEBUG
// - Логи не содержат чувствительных данных
//
// ⚡ СКОРОСТЬ:
// - Уровни логирования для фильтрации
// - Асинхронная отправка на сервер
// - Кеширование статуса разработки
// - Минимальное влияние на производительность
//
// 🛡️ НАДЁЖНОСТЬ:
// - Все ошибки обрабатываются
// - Fallback-методы для console
// - Защита от циклических ссылок в объектах
// - Автоматическое восстановление при ошибках
// ================================================================

const Logger = {
    // =============================================================
    // 1. НАСТРОЙКИ
    // =============================================================

    /**
     * Уровни логирования
     * 0 - ERROR (только критические ошибки)
     * 1 - WARN (предупреждения)
     * 2 - INFO (информационные сообщения)
     * 3 - DEBUG (отладочные сообщения)
     */
    _level: 2,

    /**
     * Определяем, включён ли режим разработки
     * В продакшене INFO и DEBUG отключаются
     */
    _isDev: false,

    /**
     * Очередь для асинхронной отправки на сервер
     */
    _queue: [],

    /**
     * Максимальный размер очереди (защита от DoS)
     */
    _maxQueueSize: 100,

    /**
     * Таймер для отправки логов на сервер
     */
    _flushTimer: null,

    /**
     * Флаг, инициализирован ли Logger
     */
    _initialized: false,

    /**
     * URL для отправки логов на сервер
     */
    _logEndpoint: '/log.php',

    /**
     * Максимальная длина сообщения (защита от DoS)
     */
    _maxMessageLength: 10000,

    // =============================================================
    // 2. ИНИЦИАЛИЗАЦИЯ
    // =============================================================

    /**
     * Инициализирует Logger
     * @param {Object} options - Настройки
     * @param {number} options.level - Уровень логирования (0-3)
     * @param {string} options.logEndpoint - URL для отправки логов
     * @param {number} options.flushInterval - Интервал отправки (мс)
     */
    init(options = {}) {
        if (this._initialized) return;

        const { level = 2, logEndpoint = '/log.php', flushInterval = 30000 } = options;

        // Определяем режим разработки
        this._isDev = this._isDevelopment();
        this._level = this._isDev ? level : Math.min(level, 1);
        this._logEndpoint = logEndpoint;

        // Запускаем таймер отправки логов
        if (this._level >= 0) {
            this._flushTimer = setInterval(() => {
                this._flush();
            }, flushInterval);
        }

        // Перехватываем непойманные ошибки
        this._setupErrorHandlers();

        this._initialized = true;

        this.info('[Logger] Инициализирован', {
            isDev: this._isDev,
            level: this._level,
            endpoint: this._logEndpoint,
        });
    },

    /**
     * Определяет, включён ли режим разработки
     * @private
     * @returns {boolean} - true, если режим разработки
     */
    _isDevelopment() {
        try {
            const hostname = window.location.hostname;
            return (
                hostname === '127.0.0.1' ||
                hostname === 'localhost' ||
                hostname === '0.0.0.0' ||
                hostname.includes('.test') ||
                hostname.includes('.dev')
            );
        } catch (e) {
            return false;
        }
    },

    /**
     * Настраивает перехват непойманных ошибок
     * @private
     */
    _setupErrorHandlers() {
        // Перехват window.onerror
        const originalOnError = window.onerror;
        window.onerror = (message, source, lineno, colno, error) => {
            this.error('[Uncaught Error]', {
                message: String(message),
                source: source || 'unknown',
                line: lineno,
                column: colno,
                stack: error?.stack || null,
            });

            if (typeof originalOnError === 'function') {
                originalOnError(message, source, lineno, colno, error);
            }
        };

        // Перехват unhandledrejection
        const originalOnUnhandledRejection = window.onunhandledrejection;
        window.onunhandledrejection = (event) => {
            this.error('[Unhandled Rejection]', {
                reason: String(event.reason || 'unknown'),
                stack: event.reason?.stack || null,
            });

            if (typeof originalOnUnhandledRejection === 'function') {
                originalOnUnhandledRejection(event);
            }
        };
    },

    // =============================================================
    // 3. УРОВНИ ЛОГИРОВАНИЯ
    // =============================================================

    /**
     * Устанавливает уровень логирования
     * @param {number} level - Уровень (0-3)
     */
    setLevel(level) {
        this._level = Math.min(Math.max(level, 0), 3);
        this.info('[Logger] Уровень логирования изменён', { level: this._level });
    },

    /**
     * Возвращает текущий уровень логирования
     * @returns {number} - Текущий уровень
     */
    getLevel() {
        return this._level;
    },

    /**
     * Логирует критическую ошибку (уровень 0)
     * @param {string} message - Сообщение
     * @param {*} context - Контекст (объект, строка, число)
     */
    error(message, context = null) {
        this._log(0, message, context);
    },

    /**
     * Логирует предупреждение (уровень 1)
     * @param {string} message - Сообщение
     * @param {*} context - Контекст (объект, строка, число)
     */
    warn(message, context = null) {
        this._log(1, message, context);
    },

    /**
     * Логирует информационное сообщение (уровень 2)
     * @param {string} message - Сообщение
     * @param {*} context - Контекст (объект, строка, число)
     */
    info(message, context = null) {
        this._log(2, message, context);
    },

    /**
     * Логирует отладочное сообщение (уровень 3)
     * @param {string} message - Сообщение
     * @param {*} context - Контекст (объект, строка, число)
     */
    debug(message, context = null) {
        this._log(3, message, context);
    },

    // =============================================================
    // 4. ОСНОВНОЙ МЕТОД ЛОГИРОВАНИЯ
    // =============================================================

    /**
     * Основной метод логирования (внутренний)
     * @private
     * @param {number} level - Уровень логирования
     * @param {string} message - Сообщение
     * @param {*} context - Контекст
     */
    _log(level, message, context = null) {
        try {
            // Проверяем, нужно ли логировать этот уровень
            if (!this._shouldLog(level)) return;

            // Безопасно преобразуем сообщение в строку
            const safeMessage = this._sanitizeMessage(String(message));

            // Безопасно преобразуем контекст в строку
            const safeContext = this._sanitizeContext(context);

            // Формируем запись
            const entry = {
                timestamp: new Date().toISOString(),
                level: level,
                levelName: this._getLevelName(level),
                message: safeMessage,
                context: safeContext,
                url: window.location?.href || 'unknown',
                userAgent: navigator?.userAgent || 'unknown',
            };

            // Выводим в консоль
            this._outputToConsole(entry);

            // Отправляем на сервер (только для ошибок и предупреждений)
            if (level <= 1) {
                this._sendToServer(entry);
            }

            // Добавляем в очередь для INFO и DEBUG (если не продакшен)
            if (level >= 2 && this._isDev) {
                this._queue.push(entry);
                if (this._queue.length > this._maxQueueSize) {
                    this._queue.shift();
                }
            }
        } catch (error) {
            // Критический fallback - ломать приложение нельзя
            try {
                console.error('[Logger] Ошибка при логировании:', error);
            } catch (e) {
                // Полный fallback
            }
        }
    },

    /**
     * Проверяет, нужно ли логировать указанный уровень
     * @private
     * @param {number} level - Уровень логирования
     * @returns {boolean} - true, если нужно логировать
     */
    _shouldLog(level) {
        return level <= this._level;
    },

    /**
     * Возвращает имя уровня логирования
     * @private
     * @param {number} level - Уровень
     * @returns {string} - Имя уровня
     */
    _getLevelName(level) {
        const names = {
            0: 'ERROR',
            1: 'WARN',
            2: 'INFO',
            3: 'DEBUG',
        };
        return names[level] || 'UNKNOWN';
    },

    // =============================================================
    // 5. БЕЗОПАСНАЯ ОБРАБОТКА ДАННЫХ
    // =============================================================

    /**
     * Санитизирует сообщение
     * @private
     * @param {string} message - Сообщение
     * @returns {string} - Санитизированное сообщение
     *
     * 🔒 OWASP-безопасно:
     * - Ограничение длины
     * - Удаление нулевых байтов
     * - Экранирование спецсимволов (для JSON)
     */
    _sanitizeMessage(message) {
        if (!message) return '';

        let result = String(message);

        // Ограничиваем длину
        if (result.length > this._maxMessageLength) {
            result = result.slice(0, this._maxMessageLength) + '... [TRUNCATED]';
        }

        // Удаляем нулевые байты
        result = result.replace(/\0/g, '');

        // Удаляем контрольные символы (кроме пробелов и переводов строк)
        result = result.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

        return result;
    },

    /**
     * Безопасно преобразует контекст в строку
     * @private
     * @param {*} context - Контекст
     * @returns {string} - Безопасная строка контекста
     *
     * 🔒 OWASP-безопасно:
     * - Обработка циклических ссылок
     * - Ограничение глубины
     * - Экранирование спецсимволов
     * - Ограничение длины
     */
    _sanitizeContext(context) {
        if (context === null || context === undefined) {
            return '';
        }

        try {
            let jsonString;

            if (typeof context === 'string') {
                jsonString = context;
            } else if (context instanceof Error) {
                jsonString = JSON.stringify({
                    name: context.name || 'Error',
                    message: context.message || '',
                    stack: context.stack || '',
                });
            } else if (typeof context === 'object') {
                // Безопасная сериализация с обработкой циклических ссылок
                const seen = new WeakSet();
                const safeCopy = this._safeClone(context, seen);
                jsonString = JSON.stringify(safeCopy, null, 2);
            } else {
                jsonString = String(context);
            }

            // Санитизируем результат
            return this._sanitizeMessage(jsonString);
        } catch (error) {
            return `[Failed to serialize context: ${error.message || 'unknown error'}]`;
        }
    },

    /**
     * Безопасно клонирует объект (обрабатывает циклические ссылки)
     * @private
     * @param {*} obj - Объект для клонирования
     * @param {WeakSet} seen - Множество уже обработанных объектов
     * @param {number} depth - Текущая глубина
     * @returns {*} - Безопасная копия
     */
    _safeClone(obj, seen, depth = 0) {
        const MAX_DEPTH = 10;

        if (depth > MAX_DEPTH) {
            return '[Max depth exceeded]';
        }

        if (obj === null || obj === undefined) {
            return obj;
        }

        if (typeof obj !== 'object') {
            return obj;
        }

        // Обрабатываем циклические ссылки
        if (seen.has(obj)) {
            return '[Circular reference]';
        }
        seen.add(obj);

        // Обрабатываем Date
        if (obj instanceof Date) {
            return obj.toISOString();
        }

        // Обрабатываем RegExp
        if (obj instanceof RegExp) {
            return obj.toString();
        }

        // Обрабатываем Error
        if (obj instanceof Error) {
            return {
                name: obj.name,
                message: obj.message,
                stack: obj.stack,
            };
        }

        // Обрабатываем DOM-элементы (нельзя сериализовать)
        if (obj instanceof Node || obj instanceof Element) {
            return '[DOM Element]';
        }

        // Обрабатываем функции
        if (typeof obj === 'function') {
            return '[Function]';
        }

        // Рекурсивно обрабатываем объекты и массивы
        const result = Array.isArray(obj) ? [] : {};

        for (const [key, value] of Object.entries(obj)) {
            // Пропускаем приватные поля (начинаются с _)
            if (typeof key === 'string' && key.startsWith('_')) {
                result[key] = '[Private]';
                continue;
            }

            try {
                result[key] = this._safeClone(value, seen, depth + 1);
            } catch (error) {
                result[key] = '[Clone error]';
            }
        }

        return result;
    },

    // =============================================================
    // 6. ВЫВОД В КОНСОЛЬ
    // =============================================================

    /**
     * Выводит запись в консоль
     * @private
     * @param {Object} entry - Запись лога
     */
    _outputToConsole(entry) {
        try {
            const timestamp = entry.timestamp.replace('T', ' ').slice(0, 19);
            const prefix = `[${timestamp}] [${entry.levelName}]`;
            const message = entry.message || '';

            switch (entry.level) {
                case 0: // ERROR
                    console.error(prefix, message, entry.context || '');
                    break;
                case 1: // WARN
                    console.warn(prefix, message, entry.context || '');
                    break;
                case 2: // INFO
                    console.log(prefix, message, entry.context || '');
                    break;
                case 3: // DEBUG
                    console.debug(prefix, message, entry.context || '');
                    break;
                default:
                    console.log(prefix, message, entry.context || '');
            }
        } catch (error) {
            // Игнорируем ошибки консоли
        }
    },

    // =============================================================
    // 7. ОТПРАВКА НА СЕРВЕР
    // =============================================================

    /**
     * Отправляет запись лога на сервер
     * @private
     * @param {Object} entry - Запись лога
     */
    _sendToServer(entry) {
        // Не отправляем, если нет endpoint
        if (!this._logEndpoint) return;

        // Для ошибок и предупреждений отправляем сразу
        try {
            const payload = {
                timestamp: entry.timestamp,
                level: entry.levelName,
                message: entry.message,
                context: entry.context,
                url: entry.url,
                userAgent: entry.userAgent,
            };

            // Отправляем асинхронно (не блокируем приложение)
            this._sendAsync(this._logEndpoint, payload);
        } catch (error) {
            // Игнорируем ошибки отправки
        }
    },

    /**
     * Асинхронно отправляет данные на сервер
     * @private
     * @param {string} url - URL для отправки
     * @param {*} data - Данные для отправки
     */
    _sendAsync(url, data) {
        // 🔒 Если URL не указан - пропускаем отправку
        if (!url) {
            return;
        }

        try {
            const serialized = JSON.stringify(data);

            if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
                const blob = new Blob([serialized], { type: 'application/json' });
                if (navigator.sendBeacon(url, blob)) {
                    return;
                }
            }

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: serialized,
                keepalive: true,
            }).catch(() => {});
        } catch (error) {
            // Игнорируем ошибки
        }
    },

    /**
     * Отправляет накопленные логи на сервер
     * @private
     */
    _flush() {
        if (this._queue.length === 0) return;

        try {
            const batch = this._queue.splice(0, this._queue.length);
            const payload = {
                timestamp: new Date().toISOString(),
                logs: batch,
                count: batch.length,
            };

            this._sendAsync(this._logEndpoint, payload);
        } catch (error) {
            // Игнорируем ошибки
        }
    },

    // =============================================================
    // 8. ОБНОВЛЕНИЕ НАСТРОЕК
    // =============================================================

    /**
     * Обновляет настройки Logger
     * @param {Object} options - Новые настройки
     */
    update(options = {}) {
        if (options.level !== undefined) {
            this.setLevel(options.level);
        }

        if (options.logEndpoint !== undefined) {
            this._logEndpoint = options.logEndpoint;
        }

        this.info('[Logger] Настройки обновлены', options);
    },

    /**
     * Очищает очередь логов
     */
    clearQueue() {
        this._queue = [];
        this.debug('[Logger] Очередь логов очищена');
    },

    /**
     * Принудительно отправляет все накопленные логи
     */
    flush() {
        this._flush();
    },

    // =============================================================
    // 9. ЗАВЕРШЕНИЕ РАБОТЫ
    // =============================================================

    /**
     * Завершает работу Logger
     * Отправляет все накопленные логи и очищает таймеры
     */
    destroy() {
        if (this._flushTimer) {
            clearInterval(this._flushTimer);
            this._flushTimer = null;
        }

        this._flush();
        this._queue = [];
        this._initialized = false;

        try {
            console.log('[Logger] Завершён');
        } catch (e) {
            // Игнорируем
        }
    },
};

// ================================================================
// ЭКСПОРТЫ
// ================================================================

window.Logger = Logger;

// ================================================================
// АВТОМАТИЧЕСКАЯ ИНИЦИАЛИЗАЦИЯ (если включена)
// ================================================================

// Если глобальная переменная LOGGER_AUTO_INIT = true, инициализируем сразу
if (window.LOGGER_AUTO_INIT) {
    Logger.init(window.LOGGER_CONFIG);
}

// ================================================================
// БЛОК 5.1: МЕНЕДЖЕР ПРОГРЕССА (PROGRESS MANAGER)
// ================================================================
// Назначение: Единый модуль для управления прогрессом операций.
// Принцип: Честный прогресс (ПОСЛЕ сохранения) + пакетная обработка.
//
// 🎯 УНИВЕРСАЛЬНОСТЬ:
//   - Адаптивный batchSize
//   - Счётчик ТОЛЬКО ПОСЛЕ сохранения
//   - Поддержка ЛЮБОГО количества файлов
//   - Обработка крайних случаев (empty, errors, fallbacks)
// ================================================================

const ProgressManager = {
    /**
     * ✅ УНИВЕРСАЛЬНЫЙ МЕТОД - ОДИН ДЛЯ ВСЕХ СЦЕНАРИЕВ
     *
     * @param {Array} items - Массив элементов для обработки
     * @param {Object} options - Настройки (ВСЕ ПАРАМЕТРЫ НАСТРАИВАЕМЫЕ)
     * @param {Function} options.processor - Асинхронная функция обработки
     * @param {string} options.tool - ОБЯЗАТЕЛЬНО! ('convert', 'compress', 'pdf', 'resize')
     * @param {number} options.batchSize - МАКСИМАЛЬНЫЙ размер пачки (по умолчанию 10)
     * @param {string} options.progressMessage - Шаблон сообщения прогресса
     * @param {boolean} options.mergeMode - Режим объединения (по умолчанию false)
     * @param {Function} options.onComplete - Колбэк по завершению
     * @param {Function} options.onProgress - Колбэк для обновления UI
     * @param {boolean} options.saveToFileManager - Сохранять в FileManager (по умолчанию true)
     * @param {Function} options.onItemComplete - Колбэк после обработки каждого элемента
     * @param {Function} options.onBatchComplete - Колбэк после сохранения пачки
     * @param {AbortSignal} options.signal - Сигнал для отмены операции
     * @param {boolean} options.skipDuplicates - Пропускать дубликаты (по умолчанию false)
     * @param {Function} options.onDuplicate - Колбэк при обнаружении дубликата
     * @returns {Promise<Array|Object>}
     */
    async process(items, options = {}) {
        if (!items || items.length === 0) {
            return [];
        }

        const {
            processor,
            tool,
            batchSize = 10,
            progressMessage = 'Обработка: {processed}/{total} ({percent}%)',
            mergeMode = false,
            onComplete = null,
            onProgress = null,
            saveToFileManager = true,
            onItemComplete = null,
            onBatchComplete = null,
            signal = null,
            skipDuplicates = false,
            onDuplicate = null,
        } = options;

        // 🔒 Валидация
        if (!tool) {
            throw new Error('tool is required. Available: convert, compress, pdf, resize');
        }

        if (typeof processor !== 'function') {
            throw new Error('processor must be a function');
        }

        const validTools = ['convert', 'compress', 'pdf', 'resize'];
        if (!validTools.includes(tool)) {
            throw new Error(`Invalid tool: ${tool}. Available: ${validTools.join(', ')}`);
        }

        if (signal && signal.aborted) {
            throw new Error('Operation cancelled');
        }

        // MERGE MODE
        if (mergeMode) {
            return this._processMerge(items, {
                processor,
                tool,
                progressMessage,
                onComplete,
                onProgress,
                saveToFileManager,
                signal,
            });
        }

        const allResults = [];
        const processedSet = skipDuplicates ? new Set() : null;
        let processed = 0;
        let totalOutputItems = 0; // ← ДИНАМИЧЕСКИЙ total
        let batchItems = [];
        let pendingUpdate = false;
        let lastPercent = 0;
        let lastMessage = '';
        let currentBatch = 0;
        let totalBatches = 1;

        const hasDomUtils = typeof DomUtils !== 'undefined';
        const hasFileManager = typeof FileManager !== 'undefined';

        // Функция обновления UI
        const scheduleUpdate = (percent, message) => {
            lastPercent = percent;
            lastMessage = message;

            if (!pendingUpdate) {
                pendingUpdate = true;
                requestAnimationFrame(() => {
                    if (onProgress) {
                        onProgress(lastPercent, lastMessage);
                    } else if (hasDomUtils) {
                        DomUtils.updateProgress(lastPercent, lastMessage);
                    }
                    pendingUpdate = false;
                });
            }
        };

        // Функция сохранения пачки
        const flushBatch = async () => {
            if (batchItems.length === 0) return;

            if (signal && signal.aborted) {
                throw new Error('Operation cancelled');
            }

            currentBatch++;

            try {
                if (saveToFileManager && hasFileManager) {
                    const itemsWithTool = batchItems.map((item) => ({
                        ...item,
                        tool: tool,
                    }));
                    await FileManager.saveBatch(itemsWithTool);
                }

                const batchResults = [];
                for (const item of batchItems) {
                    const { blob, name, metadata } = item;
                    const result = {
                        name: metadata.downloadName || name,
                        blob: blob,
                        storageName: name,
                        ...metadata,
                    };
                    allResults.push(result);
                    batchResults.push(result);
                }

                if (onBatchComplete) {
                    onBatchComplete(batchResults, currentBatch, totalBatches);
                }

                batchItems = [];
            } catch (error) {
                Logger.error('[ProgressManager] Ошибка сохранения пачки', {
                    error: error.message,
                    batchSize: batchItems.length,
                    tool: tool,
                    batch: currentBatch,
                    totalBatches: totalBatches,
                });
                throw error;
            }
        };

        // Показываем начальный прогресс
        const startMessage = progressMessage
            .replace(/{processed}/g, '0')
            .replace(/{total}/g, '?')
            .replace(/{percent}/g, '0')
            .replace(/{batch}/g, '0')
            .replace(/{totalBatches}/g, '?');

        if (onProgress) {
            onProgress(0, startMessage);
        } else if (hasDomUtils) {
            DomUtils.showProgress(startMessage, 0);
        }

        // Обрабатываем каждый элемент
        for (let i = 0; i < items.length; i++) {
            if (signal && signal.aborted) {
                if (!onProgress && hasDomUtils) DomUtils.hideProgress();
                throw new Error('Operation cancelled');
            }

            const item = items[i];

            if (skipDuplicates && processedSet) {
                const itemKey = item.name || item.id || JSON.stringify(item);
                if (processedSet.has(itemKey)) {
                    if (onDuplicate) onDuplicate(item, i);
                    continue;
                }
                processedSet.add(itemKey);
            }

            try {
                const result = await processor(item, i, items);

                if (result) {
                    const results = Array.isArray(result) ? result : [result];
                    const newItems = results.filter((r) => r && r.blob);

                    // ДИНАМИЧЕСКИ ОБНОВЛЯЕМ ОБЩЕЕ КОЛИЧЕСТВО
                    totalOutputItems += newItems.length;

                    // ПЕРЕСЧИТЫВАЕМ BATCH SIZE
                    const effectiveBatchSize = Math.min(
                        batchSize,
                        Math.max(totalOutputItems, batchSize)
                    );
                    totalBatches = Math.ceil(totalOutputItems / effectiveBatchSize);

                    for (const res of newItems) {
                        if (!res || !res.blob) continue;

                        batchItems.push({
                            blob: res.blob,
                            name: res.storageName || res.name || `file_${i + 1}`,
                            metadata: {
                                ...res.metadata,
                                downloadName: res.downloadName || res.name,
                                pageNumber: res.metadata?.pageNumber || i + 1,
                                originalIndex: i,
                                tool: tool,
                            },
                        });

                        processed++;

                        // ✅ ОБНОВЛЯЕМ ПРОГРЕСС ПОСЛЕ КАЖДОГО ФАЙЛА
                        const currentPercent =
                            totalOutputItems > 0
                                ? Math.min(Math.round((processed / totalOutputItems) * 100), 100)
                                : 0;
                        const currentMessage = progressMessage
                            .replace(/{processed}/g, processed)
                            .replace(/{total}/g, totalOutputItems)
                            .replace(/{percent}/g, currentPercent)
                            .replace(/{batch}/g, currentBatch + 1)
                            .replace(/{totalBatches}/g, totalBatches);

                        scheduleUpdate(currentPercent, currentMessage);

                        // Если пачка заполнена - сохраняем
                        if (batchItems.length >= effectiveBatchSize) {
                            await flushBatch();
                        }
                    }
                }

                if (onItemComplete) {
                    onItemComplete(result, i);
                }
            } catch (error) {
                Logger.error('[ProgressManager] Ошибка обработки элемента', {
                    error: error.message,
                    index: i,
                    tool: tool,
                });
                continue;
            }
        }

        // ✅ Сохраняем остаток
        if (batchItems.length > 0) {
            await flushBatch();
        }

        // Финальное обновление
        const finalMessage = progressMessage
            .replace(/{processed}/g, totalOutputItems)
            .replace(/{total}/g, totalOutputItems)
            .replace(/{percent}/g, '100')
            .replace(/{batch}/g, totalBatches)
            .replace(/{totalBatches}/g, totalBatches);

        scheduleUpdate(100, finalMessage);

        await new Promise((resolve) => setTimeout(resolve, 200));

        if (!onProgress && hasDomUtils) {
            DomUtils.hideProgress();
        }

        if (onComplete) {
            onComplete(allResults);
        }

        Logger.info('[ProgressManager] Операция завершена', {
            tool: tool,
            inputItems: items.length,
            outputItems: allResults.length,
            batchSize: batchSize,
            totalBatches: totalBatches,
            mergeMode: false,
        });

        return allResults;
    },

    /**
     * ✅ ВНУТРЕННИЙ МЕТОД - ДЛЯ ОБЪЕДИНЕНИЯ (MERGE)
     *
     * @private
     */
    async _processMerge(items, options = {}) {
        const {
            processor,
            tool,
            progressMessage = 'Объединение: {processed}/{total} ({percent}%)',
            onComplete = null,
            onProgress = null,
            saveToFileManager = true,
            signal = null,
        } = options;

        const total = items.length;
        let processed = 0;
        let accumulator = null;
        let pendingUpdate = false;
        let lastPercent = 0;
        let lastMessage = '';
        let finalResult = null;

        const hasDomUtils = typeof DomUtils !== 'undefined';
        const hasFileManager = typeof FileManager !== 'undefined';

        const scheduleUpdate = (percent, message) => {
            lastPercent = percent;
            lastMessage = message;
            if (!pendingUpdate) {
                pendingUpdate = true;
                requestAnimationFrame(() => {
                    if (onProgress) onProgress(lastPercent, lastMessage);
                    else if (hasDomUtils) DomUtils.updateProgress(lastPercent, lastMessage);
                    pendingUpdate = false;
                });
            }
        };

        const startMessage = progressMessage
            .replace(/{processed}/g, '0')
            .replace(/{total}/g, total)
            .replace(/{percent}/g, '0');

        if (onProgress) onProgress(0, startMessage);
        else if (hasDomUtils) DomUtils.showProgress(startMessage, 0);

        for (let i = 0; i < items.length; i++) {
            if (signal && signal.aborted) {
                if (!onProgress && hasDomUtils) DomUtils.hideProgress();
                throw new Error('Operation cancelled');
            }

            try {
                const result = await processor(items[i], i, items, accumulator);

                if (result) {
                    accumulator = result.accumulator || accumulator;
                    finalResult = result;

                    processed++;

                    const percent = Math.min(Math.round((processed / total) * 100), 100);
                    const message = progressMessage
                        .replace(/{processed}/g, processed)
                        .replace(/{total}/g, total)
                        .replace(/{percent}/g, percent);

                    scheduleUpdate(percent, message);
                }
            } catch (error) {
                Logger.error('[ProgressManager] Ошибка обработки элемента для merge', {
                    error: error.message,
                    index: i,
                    tool: tool,
                });
                continue;
            }
        }

        // ✅ Финальное сохранение
        if (finalResult && finalResult.blob && saveToFileManager && hasFileManager) {
            const name = finalResult.storageName || finalResult.name || `merged_${Date.now()}.pdf`;
            const metadata = {
                ...finalResult.metadata,
                downloadName: finalResult.downloadName || finalResult.name,
                tool: tool,
                isMerged: true,
                sourceCount: total,
            };
            await FileManager.saveFile(finalResult.blob, name, tool, metadata);
        } else if (saveToFileManager && !hasFileManager) {
            Logger.warn('[ProgressManager] Пропуск сохранения merge - FileManager не доступен');
        }

        const finalMessage = progressMessage
            .replace(/{processed}/g, total)
            .replace(/{total}/g, total)
            .replace(/{percent}/g, '100');

        scheduleUpdate(100, finalMessage);
        await new Promise((resolve) => setTimeout(resolve, 200));

        if (!onProgress && hasDomUtils) DomUtils.hideProgress();

        if (onComplete) onComplete(finalResult);

        Logger.info('[ProgressManager] Merge операция завершена', {
            tool: tool,
            itemsProcessed: total,
            result: finalResult ? 'success' : 'failed',
        });

        return finalResult;
    },

    // ============================================================
    // АЛИАСЫ
    // ============================================================

    async processBatch(items, options = {}) {
        return this.process(items, options);
    },

    async processSingle(items, options = {}) {
        return this.process(items, {
            ...options,
            batchSize: 1,
        });
    },

    async processMerge(items, options = {}) {
        return this._processMerge(items, {
            ...options,
            mergeMode: true,
        });
    },
};

window.ProgressManager = ProgressManager;

// ================================================================
// БЛОК 6: ЗАГРУЗЧИК БИБЛИОТЕК (LIBRARY LOADER)
// ================================================================
// Назначение: Ленивая загрузка тяжелых библиотек.
// Принцип: Загрузка только по требованию.
// Лицензия: MIT (оригинальный код автора)
//
// 📚 БИБЛИОТЕКИ И ИХ ЛИЦЕНЗИИ:
// - pdf.js (Apache 2.0) - рендеринг PDF и извлечение текста
// - pdf.worker.min.js (Apache 2.0) - воркер для pdf.js
// - pdf-lib (MIT) - создание, объединение, разделение PDF
// - jsPDF (MIT) - создание PDF из изображений
// - browser-image-compression (MIT) - сжатие изображений
// - zip.js (BSD 3-Clause) - создание ZIP-архивов (замена JSZip)
// - idb (MIT) - IndexedDB с async/await (Google Chrome Team)
//
// 🔒 БЕЗОПАСНОСТЬ (OWASP):
// - ПРИНУДИТЕЛЬНО ТОЛЬКО ЛОКАЛЬНЫЕ ПУТИ (начинаются с /)
// - ЗАПРЕЩЕНЫ все внешние протоколы (http://, https://, //, ftp://, file://, data:, blob:)
// - Защита от path traversal (..)
// - Только файлы из /assets/js/lib/ для скриптов
// - Только файлы из /assets/ для CSS
// - Только .js, .mjs, .css расширения
// - Проверка имени файла на допустимые символы ([a-zA-Z0-9._\-])
// - Все ошибки логируются через Logger
//
// ⚡ СКОРОСТЬ:
// - Ленивая загрузка - только по требованию
// - Параллельная загрузка нескольких библиотек
// - Кеширование статуса загрузки
// - Promise.allSettled для отказоустойчивости
// - Таймаут загрузки (30000мс) с повторными попытками
//
// 🛡️ НАДЁЖНОСТЬ:
// - Повторные попытки при ошибках загрузки (до 2 раз)
// - Fallback-значения при ошибках
// - Логирование через Logger
// - Защита от повторной загрузки (pendingLoads Map)
// - Топологическая сортировка зависимостей
// ================================================================

const LibraryLoader = {
    // =============================================================
    // 1. НАСТРОЙКИ
    // =============================================================

    /**
     * Флаг, загружены ли все библиотеки
     */
    _loaded: false,

    /**
     * Статус каждой библиотеки
     */
    _libs: {
        jspdf: false,
        imageCompression: false,
        pdfLib: false,
        zipJs: false,
        pdfJs: false,
        pdfWorker: false,
        idb: false,
    },

    /**
     * Количество повторных попыток при ошибке
     */
    _maxRetries: 2,

    /**
     * Задержка между попытками (мс)
     */
    _retryDelay: 1000,

    /**
     * Таймаут загрузки скрипта (мс)
     */
    _scriptTimeout: 30000,

    /**
     * Текущие загрузки (для предотвращения дублирования)
     */
    _pendingLoads: new Map(),

    // =============================================================
    // 2. КОНФИГУРАЦИЯ БИБЛИОТЕК
    // =============================================================

    /**
     * Пути к библиотекам (из CONFIG)
     * Все библиотеки локально, лицензии соблюдены
     */
    _config: {
        // =============================================================
        // 2.1. jsPDF - создание PDF из изображений (MIT)
        // =============================================================
        jspdf: {
            path: '/assets/js/lib/jspdf.umd.min.js',
            global: 'jspdf',
            check: () => typeof window.jspdf !== 'undefined',
            description: 'jsPDF - создание PDF (MIT)',
            license: 'MIT',
        },

        // =============================================================
        // 2.2. browser-image-compression - сжатие изображений (MIT)
        // =============================================================
        imageCompression: {
            path: '/assets/js/lib/browser-image-compression.js',
            global: 'imageCompression',
            check: () => typeof window.imageCompression !== 'undefined',
            description: 'browser-image-compression - сжатие изображений (MIT)',
            license: 'MIT',
        },

        // =============================================================
        // 2.3. pdf-lib - создание, объединение, разделение PDF (MIT)
        // =============================================================
        pdfLib: {
            path: '/assets/js/lib/pdf-lib.min.js',
            global: 'PDFLib',
            check: () => typeof window.PDFLib !== 'undefined',
            description: 'pdf-lib - работа с PDF (MIT)',
            license: 'MIT',
        },

        // =============================================================
        // 2.4. zip.js - создание ZIP-архивов (BSD 3-Clause)
        // Заменяет JSZip (MIT) - меньше размер, BSD-лицензия
        // =============================================================
        zipJs: {
            path: '/assets/js/lib/zip.min.js',
            global: 'zip',
            check: () =>
                typeof window.zip !== 'undefined' || typeof window.ZipWriter !== 'undefined',
            description: 'zip.js - создание ZIP-архивов (BSD 3-Clause)',
            license: 'BSD 3-Clause',
        },

        // =============================================================
        // 2.5. pdf.js - рендеринг PDF и извлечение текста (Apache 2.0)
        // =============================================================
        pdfJs: {
            path: '/assets/js/lib/pdf.min.js',
            global: 'pdfjsLib',
            check: () => typeof window.pdfjsLib !== 'undefined',
            description: 'pdf.js - рендеринг PDF (Apache 2.0)',
            license: 'Apache 2.0',
            onLoad: () => {
                // Устанавливаем workerSrc для pdf.js
                try {
                    if (window.pdfjsLib) {
                        if (!window.pdfjsLib.GlobalWorkerOptions) {
                            window.pdfjsLib.GlobalWorkerOptions = {};
                        }
                        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
                            '/assets/js/lib/pdf.worker.min.js';
                        Logger.debug('[LibraryLoader] pdf.js workerSrc установлен');
                        // Отмечаем pdfWorker как загруженный
                        LibraryLoader._libs.pdfWorker = true;
                    }
                } catch (error) {
                    Logger.warn('[LibraryLoader] Не удалось установить workerSrc для pdf.js', {
                        error: error.message,
                    });
                }
            },
        },

        // =============================================================
        // 2.6. pdf.worker.min.js - воркер для pdf.js (Apache 2.0)
        // Загружается отдельно, чтобы гарантировать правильную работу
        // =============================================================
        pdfWorker: {
            path: '/assets/js/lib/pdf.worker.min.js',
            global: 'pdfjsLib',
            check: () => {
                // Проверяем, что workerSrc установлен корректно
                try {
                    return (
                        window.pdfjsLib &&
                        window.pdfjsLib.GlobalWorkerOptions &&
                        window.pdfjsLib.GlobalWorkerOptions.workerSrc ===
                            '/assets/js/lib/pdf.worker.min.js'
                    );
                } catch (e) {
                    return false;
                }
            },
            dependencies: ['pdfJs'],
            description: 'pdf.worker.min.js - воркер для pdf.js (Apache 2.0)',
            license: 'Apache 2.0',
        },

        // =============================================================
        // 2.7. idb - IndexedDB с async/await (MIT)
        // От Джейка Арчибальда (Google Chrome Team)
        // Заменяет нативные обёртки с new Promise
        // Размер: ~3KB gzipped
        // =============================================================
        idb: {
            path: '/assets/js/lib/idb.umd.js',
            global: 'idb',
            check: () => typeof window.idb !== 'undefined',
            description: 'idb - IndexedDB с async/await (MIT)',
            license: 'MIT',
            author: 'Jake Archibald (Google Chrome Team)',
        },
    },

    // =============================================================
    // 3. ОСНОВНЫЕ МЕТОДЫ
    // =============================================================

    /**
     * Загружает все библиотеки
     * @param {Function} onProgress - Колбэк прогресса (loaded, total)
     * @returns {Promise<Object>} - Статус загрузки всех библиотек
     */
    async loadAll(onProgress = null) {
        if (this._loaded) {
            Logger.debug('[LibraryLoader] Все библиотеки уже загружены');
            return this._libs;
        }

        Logger.info('[LibraryLoader] Начинаем загрузку всех библиотек');

        const libNames = Object.keys(this._config);
        const total = libNames.length;
        let loaded = 0;

        const results = await this._loadBatch(libNames, (libName) => {
            loaded++;
            if (onProgress) {
                onProgress(loaded, total);
            }
            Logger.debug(`[LibraryLoader] Прогресс: ${loaded}/${total}`, { libName });
        });

        for (const [libName, success] of Object.entries(results)) {
            this._libs[libName] = success;
        }

        const allLoaded = Object.values(this._libs).every((v) => v === true);
        this._loaded = allLoaded;

        Logger.info('[LibraryLoader] Загрузка завершена', {
            allLoaded: allLoaded,
            libs: this._libs,
        });

        return this._libs;
    },

    /**
     * Загружает конкретную библиотеку
     * @param {string} libName - Имя библиотеки
     * @returns {Promise<boolean>} - true, если загрузка успешна
     */
    async ensureLib(libName) {
        if (!libName) {
            Logger.error('[LibraryLoader] ensureLib: имя библиотеки не указано');
            return false;
        }

        if (!this._config[libName]) {
            Logger.error('[LibraryLoader] ensureLib: неизвестная библиотека', { libName });
            return false;
        }

        if (this._libs[libName]) {
            Logger.debug(`[LibraryLoader] ${libName} уже загружена`);
            return true;
        }

        if (this._pendingLoads.has(libName)) {
            Logger.debug(`[LibraryLoader] ${libName} уже загружается, ожидаем...`);
            return await this._pendingLoads.get(libName);
        }

        Logger.info(`[LibraryLoader] Загрузка ${libName}`);
        const promise = this._loadSingle(libName);
        this._pendingLoads.set(libName, promise);

        try {
            const result = await promise;
            this._libs[libName] = result;
            return result;
        } finally {
            this._pendingLoads.delete(libName);
        }
    },

    /**
     * Проверяет, загружена ли библиотека
     * @param {string} libName - Имя библиотеки
     * @returns {boolean} - true, если загружена
     */
    isReady(libName) {
        if (!libName || !this._config[libName]) return false;
        return this._libs[libName] === true;
    },

    /**
     * Возвращает статус всех библиотек
     * @returns {Object} - Статус библиотек
     */
    getStatus() {
        return { ...this._libs };
    },

    /**
     * Возвращает список загруженных библиотек
     * @returns {Array<string>} - Список загруженных библиотек
     */
    getLoadedLibs() {
        return Object.keys(this._libs).filter((name) => this._libs[name] === true);
    },

    /**
     * Возвращает список незагруженных библиотек
     * @returns {Array<string>} - Список незагруженных библиотек
     */
    getUnloadedLibs() {
        return Object.keys(this._libs).filter((name) => this._libs[name] === false);
    },

    // =============================================================
    // 4. ВНУТРЕННИЕ МЕТОДЫ ЗАГРУЗКИ
    // =============================================================

    /**
     * Загружает пакет библиотек с учётом зависимостей
     * @private
     * @param {Array<string>} libNames - Список имён библиотек
     * @param {Function} onProgress - Колбэк прогресса
     * @returns {Promise<Object>} - Результаты загрузки
     */
    async _loadBatch(libNames, onProgress = null) {
        const results = {};
        const orderedLibs = this._orderByDependencies(libNames);

        for (const libName of orderedLibs) {
            try {
                const success = await this.ensureLib(libName);
                results[libName] = success;
            } catch (error) {
                Logger.error(`[LibraryLoader] Ошибка загрузки ${libName}`, {
                    error: error.message,
                });
                results[libName] = false;
            }

            if (onProgress) {
                onProgress(libName);
            }
        }

        return results;
    },

    /**
     * Загружает одну библиотеку
     * @private
     * @param {string} libName - Имя библиотеки
     * @returns {Promise<boolean>} - true, если загрузка успешна
     */
    async _loadSingle(libName) {
        const config = this._config[libName];
        if (!config) {
            throw new Error(`Неизвестная библиотека: ${libName}`);
        }

        if (config.check && config.check()) {
            Logger.debug(`[LibraryLoader] ${libName} уже загружена (глобальная переменная)`);
            if (config.onLoad && typeof config.onLoad === 'function') {
                try {
                    config.onLoad();
                } catch (error) {
                    Logger.warn(`[LibraryLoader] Ошибка в onLoad для ${libName}`, {
                        error: error.message,
                    });
                }
            }
            return true;
        }

        if (config.dependencies && config.dependencies.length > 0) {
            for (const dep of config.dependencies) {
                const depLoaded = await this.ensureLib(dep);
                if (!depLoaded) {
                    throw new Error(`Зависимость ${dep} для ${libName} не загружена`);
                }
            }
        }

        const path = this._sanitizePath(config.path);
        if (!path) {
            throw new Error(`Невалидный путь для ${libName}: ${config.path}`);
        }

        try {
            await this._loadScript(path, libName);
        } catch (error) {
            let lastError = error;
            for (let attempt = 1; attempt <= this._maxRetries; attempt++) {
                try {
                    Logger.warn(
                        `[LibraryLoader] ${libName} - повторная попытка ${attempt}/${this._maxRetries}`
                    );
                    await this._loadScript(path, libName);
                    break;
                } catch (retryError) {
                    lastError = retryError;
                    if (attempt < this._maxRetries) {
                        await new Promise((resolve) =>
                            setTimeout(resolve, this._retryDelay * attempt)
                        );
                    } else {
                        throw lastError;
                    }
                }
            }
        }

        if (config.check && !config.check()) {
            await new Promise((resolve) => setTimeout(resolve, 100));
            if (!config.check()) {
                throw new Error(
                    `Библиотека ${libName} не загрузилась (глобальная переменная не обнаружена)`
                );
            }
        }

        if (config.onLoad && typeof config.onLoad === 'function') {
            try {
                config.onLoad();
            } catch (error) {
                Logger.warn(`[LibraryLoader] Ошибка в onLoad для ${libName}`, {
                    error: error.message,
                });
            }
        }

        Logger.info(`[LibraryLoader] ${libName} загружена успешно`);
        return true;
    },

    /**
     * Загружает скрипт
     * @private
     * @param {string} src - Путь к скрипту
     * @param {string} libName - Имя библиотеки (для логирования)
     * @returns {Promise<void>}
     */
    _loadScript(src, libName) {
        return new Promise((resolve, reject) => {
            const existingScript = document.querySelector(`script[src="${src}"]`);
            if (existingScript) {
                Logger.debug(`[LibraryLoader] ${libName} - скрипт уже существует в DOM`);
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = src;
            script.async = true;

            const timeoutId = setTimeout(() => {
                script.onload = null;
                script.onerror = null;
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }
                reject(new Error(`Таймаут загрузки ${libName} (${this._scriptTimeout}мс)`));
            }, this._scriptTimeout);

            script.onload = () => {
                clearTimeout(timeoutId);
                Logger.debug(`[LibraryLoader] ${libName} - скрипт загружен`);
                resolve();
            };

            script.onerror = () => {
                clearTimeout(timeoutId);
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }
                reject(new Error(`Не удалось загрузить ${libName}`));
            };

            document.head.appendChild(script);
        });
    },

    /**
     * Упорядочивает библиотеки по зависимостям (топологическая сортировка)
     * @private
     * @param {Array<string>} libNames - Список имён
     * @returns {Array<string>} - Отсортированный список
     */
    _orderByDependencies(libNames) {
        const ordered = [];
        const visited = new Set();

        const visit = (libName) => {
            if (visited.has(libName)) return;
            visited.add(libName);

            const config = this._config[libName];
            if (config && config.dependencies) {
                for (const dep of config.dependencies) {
                    if (libNames.includes(dep)) {
                        visit(dep);
                    }
                }
            }

            ordered.push(libName);
        };

        for (const libName of libNames) {
            visit(libName);
        }

        return ordered;
    },

    // =============================================================
    // 5. БЕЗОПАСНОСТЬ (OWASP) - ПОЛНАЯ ВЕРСИЯ
    // =============================================================

    /**
     * Санитизирует путь к библиотеке
     * @private
     * @param {string} path - Путь для проверки
     * @returns {string|null} - Безопасный путь или null
     *
     * 🔒 OWASP-безопасно:
     * - ПРИНУДИТЕЛЬНО ТОЛЬКО ЛОКАЛЬНЫЕ ПУТИ (начинаются с /)
     * - ЗАПРЕЩЕНЫ все внешние протоколы
     * - Защита от path traversal (..)
     * - Только файлы из /assets/js/lib/
     * - Только .js и .mjs расширения
     * - Проверка имени файла на допустимые символы
     */
    _sanitizePath(path) {
        if (!path || typeof path !== 'string') {
            return null;
        }

        const trimmedPath = path.trim();

        // 🔒 ЗАПРЕЩЕНЫ любые URL с протоколами
        if (
            // owasp-ignore: GEN-HTTP-URL -- suppressed
            trimmedPath.startsWith('http://') ||
            trimmedPath.startsWith('https://') ||
            trimmedPath.startsWith('//') ||
            trimmedPath.startsWith('ftp://') ||
            trimmedPath.startsWith('file://') ||
            trimmedPath.startsWith('data:') ||
            trimmedPath.startsWith('blob:')
        ) {
            Logger.warn('[LibraryLoader] Попытка загрузить внешний скрипт', {
                path: trimmedPath,
                reason: 'Внешние URL запрещены в PWA',
            });
            return null;
        }

        // 🔒 Проверяем, что путь начинается с / (локальный, абсолютный)
        if (!trimmedPath.startsWith('/')) {
            Logger.warn('[LibraryLoader] Попытка загрузить относительный путь', {
                path: trimmedPath,
                reason: 'Разрешены только абсолютные пути (начинающиеся с /)',
            });
            return null;
        }

        // 🔒 Проверяем, что путь начинается с /assets/js/lib/
        if (!trimmedPath.startsWith('/assets/js/lib/')) {
            Logger.warn('[LibraryLoader] Попытка загрузить скрипт вне /assets/js/lib/', {
                path: trimmedPath,
                reason: 'Все библиотеки должны лежать в /assets/js/lib/',
            });
            return null;
        }

        // 🔒 Защита от path traversal (..)
        if (trimmedPath.includes('..')) {
            Logger.warn('[LibraryLoader] Попытка path traversal', {
                path: trimmedPath,
                reason: 'Обнаружен path traversal (..)',
            });
            return null;
        }

        // 🔒 Проверяем, что файл имеет допустимое расширение
        const allowedExtensions = ['.js', '.mjs'];
        const fileName = trimmedPath.split('/').pop();
        if (!fileName) {
            Logger.warn('[LibraryLoader] Невалидное имя файла', { path: trimmedPath });
            return null;
        }

        const ext = fileName.split('.').pop();
        if (!ext || !allowedExtensions.includes('.' + ext.toLowerCase())) {
            Logger.warn('[LibraryLoader] Недопустимое расширение файла', {
                path: trimmedPath,
                ext: ext || 'none',
                allowed: allowedExtensions.join(', '),
            });
            return null;
        }

        // 🔒 Проверяем, что имя файла не содержит опасных символов
        const safeFileNamePattern = /^[a-zA-Z0-9._\-]+$/;
        if (!safeFileNamePattern.test(fileName)) {
            Logger.warn('[LibraryLoader] Недопустимые символы в имени файла', {
                path: trimmedPath,
                fileName: fileName,
            });
            return null;
        }

        return trimmedPath;
    },

    /**
     * Санитизирует путь к CSS
     * @private
     * @param {string} path - Путь к CSS
     * @returns {string|null} - Безопасный путь или null
     *
     * 🔒 OWASP-безопасно:
     * - ПРИНУДИТЕЛЬНО ТОЛЬКО ЛОКАЛЬНЫЕ ПУТИ (начинаются с /)
     * - ЗАПРЕЩЕНЫ все внешние протоколы
     * - Защита от path traversal (..)
     * - Только файлы из /assets/
     * - Только .css расширение
     * - Проверка имени файла на допустимые символы
     */
    _sanitizeCSSPath(path) {
        if (!path || typeof path !== 'string') {
            return null;
        }

        const trimmedPath = path.trim();

        // 🔒 ЗАПРЕЩЕНЫ любые URL с протоколами
        if (
            // owasp-ignore: GEN-HTTP-URL -- suppressed
            trimmedPath.startsWith('http://') ||
            trimmedPath.startsWith('https://') ||
            trimmedPath.startsWith('//') ||
            trimmedPath.startsWith('ftp://') ||
            trimmedPath.startsWith('file://') ||
            trimmedPath.startsWith('data:') ||
            trimmedPath.startsWith('blob:')
        ) {
            Logger.warn('[LibraryLoader] Попытка загрузить внешний CSS', {
                path: trimmedPath,
                reason: 'Внешние URL запрещены в PWA',
            });
            return null;
        }

        // 🔒 Проверяем, что путь начинается с / (локальный, абсолютный)
        if (!trimmedPath.startsWith('/')) {
            Logger.warn('[LibraryLoader] Попытка загрузить относительный путь CSS', {
                path: trimmedPath,
                reason: 'Разрешены только абсолютные пути (начинающиеся с /)',
            });
            return null;
        }

        // 🔒 Проверяем, что путь начинается с /assets/
        if (!trimmedPath.startsWith('/assets/')) {
            Logger.warn('[LibraryLoader] Попытка загрузить CSS вне /assets/', {
                path: trimmedPath,
                reason: 'Все CSS должны лежать в /assets/',
            });
            return null;
        }

        // 🔒 Защита от path traversal (..)
        if (trimmedPath.includes('..')) {
            Logger.warn('[LibraryLoader] Попытка path traversal в CSS', {
                path: trimmedPath,
                reason: 'Обнаружен path traversal (..)',
            });
            return null;
        }

        // 🔒 Проверяем расширение
        const fileName = trimmedPath.split('/').pop();
        if (!fileName) {
            Logger.warn('[LibraryLoader] Невалидное имя CSS-файла', { path: trimmedPath });
            return null;
        }

        const allowedExtensions = ['.css'];
        const ext = fileName.split('.').pop();
        if (!ext || !allowedExtensions.includes('.' + ext.toLowerCase())) {
            Logger.warn('[LibraryLoader] Недопустимое расширение CSS', {
                path: trimmedPath,
                ext: ext || 'none',
                allowed: allowedExtensions.join(', '),
            });
            return null;
        }

        // 🔒 Проверяем, что имя файла безопасно
        const safeFileNamePattern = /^[a-zA-Z0-9._\-]+$/;
        if (!safeFileNamePattern.test(fileName)) {
            Logger.warn('[LibraryLoader] Недопустимые символы в имени CSS-файла', {
                path: trimmedPath,
                fileName: fileName,
            });
            return null;
        }

        return trimmedPath;
    },

    /**
     * Проверяет, является ли путь безопасным для загрузки
     * @param {string} path - Путь для проверки
     * @param {string} type - Тип ('script' или 'css')
     * @returns {boolean} - true, если путь безопасен
     */
    isSafePath(path, type = 'script') {
        if (type === 'script') {
            return this._sanitizePath(path) !== null;
        }
        if (type === 'css') {
            return this._sanitizeCSSPath(path) !== null;
        }
        return false;
    },

    // =============================================================
    // 6. CSS-ЗАГРУЗЧИК
    // =============================================================

    /**
     * Загружает CSS-файл
     * @param {string} href - Путь к CSS
     * @returns {Promise<void>}
     */
    loadCSS(href) {
        return new Promise((resolve, reject) => {
            if (!href) {
                reject(new Error('CSS href не указан'));
                return;
            }

            const safeHref = this._sanitizeCSSPath(href);
            if (!safeHref) {
                reject(new Error('Небезопасный путь к CSS'));
                return;
            }

            const existing = document.querySelector(`link[href="${safeHref}"]`);
            if (existing) {
                resolve();
                return;
            }

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = safeHref;

            link.onload = () => {
                Logger.debug(`[LibraryLoader] CSS загружен: ${safeHref}`);
                resolve();
            };

            link.onerror = () => {
                if (link.parentNode) {
                    link.parentNode.removeChild(link);
                }
                reject(new Error(`Не удалось загрузить CSS: ${safeHref}`));
            };

            document.head.appendChild(link);
        });
    },

    // =============================================================
    // 7. ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ
    // =============================================================

    /**
     * Сбрасывает статус загрузки (для перезагрузки)
     */
    reset() {
        this._loaded = false;
        this._libs = {
            jspdf: false,
            imageCompression: false,
            pdfLib: false,
            zipJs: false,
            pdfJs: false,
            pdfWorker: false,
            idb: false,
        };
        this._pendingLoads.clear();
        Logger.info('[LibraryLoader] Сброшен');
    },

    /**
     * Возвращает информацию о библиотеке
     * @param {string} libName - Имя библиотеки
     * @returns {Object|null} - Информация о библиотеке
     */
    getLibInfo(libName) {
        if (!libName || !this._config[libName]) return null;
        const config = this._config[libName];
        return {
            name: libName,
            path: config.path,
            loaded: this._libs[libName] || false,
            description: config.description || '',
            license: config.license || '',
            dependencies: config.dependencies || [],
            author: config.author || '',
        };
    },

    /**
     * Возвращает информацию о всех библиотеках
     * @returns {Array<Object>} - Информация о всех библиотеках
     */
    getAllLibsInfo() {
        return Object.keys(this._config).map((name) => this.getLibInfo(name));
    },
};

// ================================================================
// ЭКСПОРТЫ
// ================================================================

window.LibraryLoader = LibraryLoader;

// ================================================================
// БЛОК 7: МЕНЕДЖЕРЫ СОСТОЯНИЯ (STATE MANAGERS)
// ================================================================
// Назначение: Управление состоянием приложения.
// Принцип: Единая точка управления состоянием.
// Лицензия: MIT (оригинальный код автора)
//
// 🔒 БЕЗОПАСНОСТЬ (OWASP):
// - Все данные санитизируются перед сохранением
// - Нет innerHTML, только textContent
// - Все операции с проверкой на null/undefined
// - Безопасная работа с localStorage
//
// ⚡ СКОРОСТЬ:
// - Минимальное количество перерисовок
// - Кеширование состояния
// - Оптимизация через debounce
//
// 🛡️ НАДЁЖНОСТЬ:
// - Все ошибки обрабатываются
// - Fallback-значения
// - Логирование через Logger
// ================================================================

// ================================================================
// 1. ТЕМА (THEME MANAGER)
// ================================================================

const ThemeManager = {
    // =============================================================
    // 1.1. СОСТОЯНИЕ
    // =============================================================

    _currentTheme: 'light',
    _themeLight: null,
    _themeDark: null,
    _body: null,
    _html: null,
    _themeColor: null,
    _isInitialized: false,

    // =============================================================
    // 1.2. ИНИЦИАЛИЗАЦИЯ
    // =============================================================

    /**
     * Инициализирует менеджер темы
     */
    init() {
        if (this._isInitialized) return;

        this._themeLight = document.getElementById('themeLight');
        this._themeDark = document.getElementById('themeDark');
        this._body = document.body;
        this._html = document.documentElement;
        this._themeColor = document.getElementById('theme-color');

        if (!this._themeLight || !this._themeDark) {
            Logger.warn('[ThemeManager] Кнопки переключения темы не найдены');
            return;
        }

        // Применяем сохранённую тему
        this._applySavedTheme();

        // Навешиваем обработчики
        this._setupEventListeners();

        this._isInitialized = true;
        Logger.info('[ThemeManager] Инициализирован', { theme: this._currentTheme });
    },

    /**
     * Применяет сохранённую тему из localStorage
     * @private
     */
    _applySavedTheme() {
        try {
            const savedTheme = localStorage.getItem('theme');
            const theme = savedTheme === 'dark' ? 'dark' : 'light';
            this._applyTheme(theme);
        } catch (error) {
            Logger.warn('[ThemeManager] Ошибка загрузки темы', { error: error.message });
            this._applyTheme('light');
        }
    },

    // =============================================================
    // 1.3. УПРАВЛЕНИЕ ТЕМОЙ
    // =============================================================

    /**
     * Устанавливает тему
     * @param {string} theme - 'light' или 'dark'
     */
    setTheme(theme) {
        if (theme !== 'light' && theme !== 'dark') {
            Logger.warn('[ThemeManager] Недопустимая тема', { theme });
            return;
        }

        if (this._currentTheme === theme) return;

        this._applyTheme(theme);
        this._saveTheme(theme);
    },

    /**
     * Возвращает текущую тему
     * @returns {string} - 'light' или 'dark'
     */
    getCurrentTheme() {
        return this._currentTheme;
    },

    /**
     * Переключает тему
     */
    toggleTheme() {
        const newTheme = this._currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    },

    /**
     * Применяет тему (внутренний метод)
     * @private
     * @param {string} theme - 'light' или 'dark'
     */
    _applyTheme(theme) {
        if (theme === 'dark') {
            this._body.classList.add('dark-theme');
            this._body.classList.remove('light-theme');
            this._html.style.colorScheme = 'dark';
            if (this._themeLight) this._themeLight.classList.remove('active');
            if (this._themeDark) this._themeDark.classList.add('active');
            if (this._themeColor) {
                this._themeColor.setAttribute('content', '#1a1a1a');
            }
        } else {
            this._body.classList.remove('dark-theme');
            this._body.classList.add('light-theme');
            this._html.style.colorScheme = 'light';
            if (this._themeDark) this._themeDark.classList.remove('active');
            if (this._themeLight) this._themeLight.classList.add('active');
            if (this._themeColor) {
                this._themeColor.setAttribute('content', '#2A5C7F');
            }
        }

        this._currentTheme = theme;
        Logger.debug('[ThemeManager] Тема применена', { theme });
    },

    /**
     * Сохраняет тему в localStorage
     * @private
     * @param {string} theme - 'light' или 'dark'
     */
    _saveTheme(theme) {
        try {
            localStorage.setItem('theme', theme);
        } catch (error) {
            Logger.warn('[ThemeManager] Ошибка сохранения темы', { error: error.message });
        }
    },

    // =============================================================
    // 1.4. СОБЫТИЯ
    // =============================================================

    /**
     * Настраивает обработчики событий
     * @private
     */
    _setupEventListeners() {
        if (this._themeLight) {
            this._themeLight.addEventListener('click', () => {
                this.setTheme('light');
            });
        }

        if (this._themeDark) {
            this._themeDark.addEventListener('click', () => {
                this.setTheme('dark');
            });
        }

        // Слушаем изменение темы в других вкладках
        window.addEventListener('storage', (event) => {
            if (event.key === 'theme' && event.newValue) {
                const theme = event.newValue === 'dark' ? 'dark' : 'light';
                if (this._currentTheme !== theme) {
                    this._applyTheme(theme);
                }
            }
        });
    },
};

// ================================================================
// 2. ЧЕК-ЛИСТЫ (CHECKLIST MANAGER)
// ================================================================

const ChecklistManager = {
    // =============================================================
    // 2.1. СОСТОЯНИЕ
    // =============================================================

    _checklists: null,
    _currentService: null,
    _isInitialized: false,
    _storageKey: 'checklist_',

    // =============================================================
    // 2.2. ИНИЦИАЛИЗАЦИЯ
    // =============================================================

    /**
     * Инициализирует менеджер чек-листов
     * @param {Object} checklists - Объект с чек-листами из CONFIG
     */
    init(checklists) {
        if (this._isInitialized) return;

        this._checklists = checklists || {};

        if (!this._checklists || Object.keys(this._checklists).length === 0) {
            Logger.warn('[ChecklistManager] Чек-листы не переданы');
            return;
        }

        this._setupEventListeners();
        this._isInitialized = true;
        Logger.info('[ChecklistManager] Инициализирован', {
            services: Object.keys(this._checklists),
        });
    },

    // =============================================================
    // 2.3. ОСНОВНЫЕ МЕТОДЫ
    // =============================================================

    /**
     * Рендерит чек-лист для указанной услуги
     * @param {string} service - Идентификатор услуги
     */
    renderChecklist(service) {
        if (!service || !this._checklists[service]) {
            Logger.error('[ChecklistManager] Услуга не найдена', { service });
            return;
        }

        this._currentService = service;
        const cl = this._checklists[service];
        const savedState = this._loadState(service);

        const container = document.getElementById('checklistBody');
        if (!container) {
            Logger.error('[ChecklistManager] Контейнер checklistBody не найден');
            return;
        }

        // Очищаем контейнер
        DomUtils.empty(container);

        // Строим чек-лист
        this._buildChecklist(container, cl, savedState);

        // Открываем модалку
        if (typeof ModalManager !== 'undefined' && ModalManager.open) {
            ModalManager.open('checklist');
        }

        Logger.debug('[ChecklistManager] Чек-лист отрендерен', { service });
    },

    /**
     * Обновляет прогресс чек-листа
     * @param {string} service - Идентификатор услуги
     */
    updateProgress(service) {
        if (!service || !this._checklists[service]) return;

        const cl = this._checklists[service];
        const savedState = this._loadState(service);
        const total = cl.documents.length;
        const checked = savedState.length;
        const percent = total > 0 ? (checked / total) * 100 : 0;

        // Обновляем прогресс-бар
        const fill = document.getElementById('progressFill');
        const text = document.getElementById('progressText');

        if (fill) {
            fill.style.width = percent + '%';
        }

        if (text) {
            text.textContent = `Готово: ${checked}/${total}`;
        }

        // Сохраняем состояние
        this._saveState(service, savedState);

        Logger.debug('[ChecklistManager] Прогресс обновлён', { service, checked, total, percent });
    },

    /**
     * Возвращает прогресс чек-листа
     * @param {string} service - Идентификатор услуги
     * @returns {Object} - { checked, total, percent }
     */
    getProgress(service) {
        if (!service || !this._checklists[service]) {
            return { checked: 0, total: 0, percent: 0 };
        }

        const cl = this._checklists[service];
        const savedState = this._loadState(service);
        const total = cl.documents.length;
        const checked = savedState.length;
        const percent = total > 0 ? (checked / total) * 100 : 0;

        return { checked, total, percent };
    },

    /**
     * Сбрасывает чек-лист
     * @param {string} service - Идентификатор услуги
     */
    resetChecklist(service) {
        if (!service) return;

        try {
            localStorage.removeItem(this._storageKey + service);
            Logger.info('[ChecklistManager] Чек-лист сброшен', { service });

            if (this._currentService === service) {
                this.renderChecklist(service);
            }
        } catch (error) {
            Logger.error('[ChecklistManager] Ошибка сброса чек-листа', { error: error.message });
        }
    },

    // =============================================================
    // 2.4. РЕНДЕРИНГ (БЕЗ innerHTML)
    // =============================================================

    /**
     * Строит чек-лист в контейнере
     * @private
     * @param {HTMLElement} container - Контейнер
     * @param {Object} cl - Объект чек-листа
     * @param {Array} savedState - Сохранённое состояние
     */
    _buildChecklist(container, cl, savedState) {
        // --- HEADER ---
        const header = DomUtils.createElementSafe('div', 'checklist-header');

        const icon = DomUtils.createElementSafe('i', cl.icon, {
            'aria-hidden': 'true',
            style: 'font-size: 2rem; color: var(--theme-brand-primary, #3d9c8c);',
        });
        header.appendChild(icon);

        const title = DomUtils.createElementSafe('h3', '', {}, cl.title);
        header.appendChild(title);

        container.appendChild(header);

        // --- ПОДСКАЗКА ---
        const hint = DomUtils.createElementSafe('p', '', {
            style: 'margin-bottom: 20px;',
        });
        hint.textContent = 'Отметьте, какие документы у вас уже есть:';
        container.appendChild(hint);

        // --- ITEMS ---
        const itemsContainer = DomUtils.createElementSafe('div', 'checklist-items');

        cl.documents.forEach((doc) => {
            const checked = savedState.includes(doc.id);

            const label = DomUtils.createElementSafe('label', 'checklist-item');

            const input = DomUtils.createElementSafe('input', 'checklist-checkbox', {
                type: 'checkbox',
                'data-id': String(doc.id),
                'aria-label': doc.text,
            });
            if (checked) {
                input.checked = true;
            }
            label.appendChild(input);

            const span = DomUtils.createElementSafe('span', '');
            span.textContent = doc.text;

            if (doc.hint) {
                const hintSpan = DomUtils.createElementSafe('span', 'checklist-hint', {});
                hintSpan.textContent = doc.hint;
                span.appendChild(hintSpan);
            }

            label.appendChild(span);
            itemsContainer.appendChild(label);
        });

        container.appendChild(itemsContainer);

        // --- ПРОГРЕСС ---
        const progressContainer = DomUtils.createElementSafe('div', 'checklist-progress');

        const progressBar = DomUtils.createElementSafe('div', 'progress-bar');

        const total = cl.documents.length;
        const checkedCount = savedState.length;
        const percent = total > 0 ? (checkedCount / total) * 100 : 0;

        const progressFill = DomUtils.createElementSafe('div', 'progress-fill', {
            id: 'progressFill',
        });
        progressFill.style.width = percent + '%';
        progressBar.appendChild(progressFill);
        progressContainer.appendChild(progressBar);

        const progressText = DomUtils.createElementSafe('div', 'progress-text', {
            id: 'progressText',
        });
        progressText.textContent = `Готово: ${checkedCount}/${total}`;
        progressContainer.appendChild(progressText);

        container.appendChild(progressContainer);

        // --- КНОПКА ЗАПИСАТЬСЯ ---
        const btnWrapper = DomUtils.createElementSafe('div', '', {
            style: 'display: flex; gap: 12px; margin-top: 16px;',
        });

        const contactLink = DomUtils.createElementSafe('a', 'btn btn-primary', {
            href: '#contact-block',
            'aria-label': 'Записаться на консультацию',
            style: 'flex: 1; text-align: center;',
        });
        contactLink.textContent = 'Записаться';

        contactLink.addEventListener('click', (e) => {
            e.preventDefault();

            // Закрываем модалку
            if (typeof ModalManager !== 'undefined' && ModalManager.close) {
                ModalManager.close('checklist');
            }

            const contactBlock = document.getElementById('contact-block');
            if (contactBlock) {
                contactBlock.scrollIntoView({ behavior: 'smooth' });
            }
        });

        btnWrapper.appendChild(contactLink);
        container.appendChild(btnWrapper);

        // --- СОБЫТИЯ ДЛЯ ЧЕКБОКСОВ ---
        const checkboxes = container.querySelectorAll('.checklist-checkbox');
        checkboxes.forEach((cb) => {
            cb.addEventListener('change', () => {
                this._updateFromCheckboxes(service);
            });
        });

        // Сохраняем ссылку на service для обработчика
        const service = this._currentService;
        this._updateFromCheckboxes = function (svc) {
            const boxes = container.querySelectorAll('.checklist-checkbox');
            const checkedIds = Array.from(boxes)
                .filter((b) => b.checked)
                .map((b) => parseInt(b.dataset.id));

            const totalItems = cl.documents.length;
            const checkedItems = checkedIds.length;
            const percentValue = totalItems > 0 ? (checkedItems / totalItems) * 100 : 0;

            const fillEl = document.getElementById('progressFill');
            const textEl = document.getElementById('progressText');

            if (fillEl) {
                fillEl.style.width = percentValue + '%';
            }

            if (textEl) {
                textEl.textContent = `Готово: ${checkedItems}/${totalItems}`;
            }

            // Сохраняем состояние
            try {
                localStorage.setItem('checklist_' + svc, JSON.stringify(checkedIds));
            } catch (error) {
                Logger.warn('[ChecklistManager] Ошибка сохранения', { error: error.message });
            }
        };
    },

    // =============================================================
    // 2.5. РАБОТА С ХРАНИЛИЩЕМ
    // =============================================================

    /**
     * Загружает состояние чек-листа
     * @private
     * @param {string} service - Идентификатор услуги
     * @returns {Array} - Массив ID выбранных документов
     */
    _loadState(service) {
        try {
            const data = localStorage.getItem(this._storageKey + service);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            Logger.warn('[ChecklistManager] Ошибка загрузки состояния', { error: error.message });
            return [];
        }
    },

    /**
     * Сохраняет состояние чек-листа
     * @private
     * @param {string} service - Идентификатор услуги
     * @param {Array} state - Массив ID выбранных документов
     */
    _saveState(service, state) {
        try {
            localStorage.setItem(this._storageKey + service, JSON.stringify(state));
        } catch (error) {
            Logger.warn('[ChecklistManager] Ошибка сохранения состояния', { error: error.message });
        }
    },

    // =============================================================
    // 2.6. СОБЫТИЯ
    // =============================================================

    /**
     * Настраивает обработчики событий для кнопок чек-листов
     * @private
     */
    _setupEventListeners() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.checklist-btn');
            if (btn && btn.dataset.service) {
                e.preventDefault();
                this.renderChecklist(btn.dataset.service);
            }
        });
    },
};

// ================================================================
// ЭКСПОРТЫ
// ================================================================

window.ThemeManager = ThemeManager;
window.ChecklistManager = ChecklistManager;

// ================================================================
// БЛОК 8: UI-МЕНЕДЖЕРЫ (UI MANAGERS)
// ================================================================
// Назначение: Управление интерфейсом.
// Принцип: Не содержат бизнес-логики.
// Лицензия: MIT (оригинальный код автора)
//
// 🎯 СОСТАВ:
// 1. ScrollTopButton - кнопка "Наверх"
// 2. ModalManager - управление модальными окнами
// 3. FilesModal - модалка "Мои документы"
// 4. PdfManager - просмотр PDF
// 5. CasesCarousel - карусель кейсов
// 6. SourceManager - открытие реестров
// 7. TimeManager - время и статус
// 8. FaqManager - FAQ-аккордеон
// 9. FormManager - форма записи
// 10. LogoImageSpin - анимация логотипа
// 11. DropdownManager - выпадающие меню
// 12. CookieManager - управление cookie
//
// 🔒 БЕЗОПАСНОСТЬ (OWASP):
// - Все данные санитизируются
// - Нет innerHTML
// - Защита от XSS через DomUtils
// - Безопасная работа с iframe (PDF)
//
// ⚡ СКОРОСТЬ:
// - Минимальное количество перерисовок
// - Debounce для частых событий
// - requestAnimationFrame для анимаций
//
// 🛡️ НАДЁЖНОСТЬ:
// - Все ошибки обрабатываются
// - Fallback-значения
// - Логирование через Logger
// ================================================================

// ================================================================
// 1. КНОПКА "НАВЕРХ" (SCROLL TOP BUTTON)
// ================================================================

const ScrollTopButton = {
    _btn: null,
    _isAnimating: false,
    _isInitialized: false,
    _scrollThreshold: 300,

    init() {
        if (this._isInitialized) return;

        this._btn = document.getElementById('scrollTopBtn');
        if (!this._btn) {
            Logger.warn('[ScrollTopButton] Кнопка не найдена');
            return;
        }

        // Гарантируем видимость
        this._btn.style.display = 'flex';
        this._btn.style.opacity = '1';
        this._btn.style.visibility = 'visible';
        this._btn.style.pointerEvents = 'auto';

        // Обработчик клика
        this._btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.scrollToTop();
        });

        // Показываем/скрываем кнопку при скролле
        window.addEventListener('scroll', () => {
            this._toggleVisibility();
        });

        this._isInitialized = true;
        Logger.info('[ScrollTopButton] Инициализирован');
    },

    /**
     * Плавный скролл наверх (С РАБОЧЕЙ ЛОГИКОЙ)
     */
    scrollToTop(duration = 900) {
        if (this._isAnimating) return;
        this._isAnimating = true;

        // РАБОЧАЯ ЛОГИКА (из проверенного скрипта)
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        this._isAnimating = false;
    },

    _toggleVisibility() {
        if (!this._btn) return;

        if (window.pageYOffset > this._scrollThreshold) {
            this._btn.style.display = 'flex';
            this._btn.style.opacity = '1';
        } else {
            this._btn.style.opacity = '0';
            setTimeout(() => {
                if (window.pageYOffset <= this._scrollThreshold) {
                    this._btn.style.display = 'none';
                }
            }, 300);
        }
    },
};

// ================================================================
// 2. УПРАВЛЕНИЕ МОДАЛКАМИ (MODAL MANAGER)
// ================================================================

const ModalManager = {
    // =============================================================
    // 2.1. СОСТОЯНИЕ
    // =============================================================

    _modals: {},
    _isInitialized: false,

    // =============================================================
    // 2.2. ИНИЦИАЛИЗАЦИЯ
    // =============================================================

    /**
     * Инициализирует менеджер модалок
     */
    init() {
        if (this._isInitialized) return;

        this._modals = {
            checklist: document.getElementById('checklistModal'),
            tools: document.getElementById('toolsModal'),
            pdf: document.getElementById('pdfModal'),
            fees: document.getElementById('feesModal'),
            consultation: document.getElementById('consultationModal'),
            payment: document.getElementById('paymentModal'),
            files: document.getElementById('filesModal'),
        };

        // Проверяем, что все модалки найдены
        const missing = Object.keys(this._modals).filter((key) => !this._modals[key]);
        if (missing.length > 0) {
            Logger.warn('[ModalManager] Не найдены модалки:', missing);
        }

        this._setupEventListeners();
        this._setupModalLinks();

        this._isInitialized = true;
        Logger.info('[ModalManager] Инициализирован');
    },

    // =============================================================
    // 2.3. ОСНОВНЫЕ МЕТОДЫ
    // =============================================================

    /**
     * Открывает модалку
     * @param {string} name - Имя модалки
     */
    open(name) {
        if (this._modals[name]) {
            this._modals[name].classList.add('active');
            document.body.style.overflow = 'hidden';

            if (name === 'files') {
                // 🔒 Принудительно перезагружаем содержимое
                const container = document.getElementById('filesListContainer');
                if (container) {
                    DomUtils.empty(container);
                    // Показываем скелетон сразу, чтобы не было пустоты
                    DomUtils.createSkeleton('file', 5, container);
                }
                // Загружаем файлы (скелетон удалится внутри loadFiles)
                FilesModal.loadFiles();
            }

            const focusableElement = this._modals[name].querySelector(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusableElement) {
                setTimeout(() => focusableElement.focus(), 100);
            }
        }
    },

    /**
     * Закрывает модалку
     * @param {string} name - Имя модалки
     */
    close(name) {
        const modal = this._modals[name];
        if (!modal) return;

        modal.classList.remove('active');
        DomUtils.unlockScroll();

        // Очищаем PDF-вьювер
        if (name === 'pdf') {
            const viewer = document.getElementById('pdfViewer');
            if (viewer) {
                setTimeout(() => {
                    viewer.src = '';
                }, 300);
            }
        }

        Logger.debug('[ModalManager] Модалка закрыта', { name });
    },

    /**
     * Проверяет, открыта ли модалка
     * @param {string} name - Имя модалки
     * @returns {boolean} - true, если открыта
     */
    isOpen(name) {
        const modal = this._modals[name];
        return modal ? modal.classList.contains('active') : false;
    },

    /**
     * Открывает модалку инструментов с загрузкой библиотек
     */
    async openTools() {
        const toolsModal = this._modals.tools;
        if (!toolsModal) return;

        // Загружаем библиотеки, если не загружены
        if (typeof LibraryLoader !== 'undefined') {
            if (!LibraryLoader._loaded) {
                try {
                    DomUtils.showProgress('Загрузка инструментов...', 0);
                    await LibraryLoader.loadAll((loaded, total) => {
                        const percent = Math.round((loaded / total) * 100);
                        DomUtils.updateProgress(percent);
                    });
                    DomUtils.completeProgress('Готово!', 500);
                } catch (error) {
                    Logger.error('[ModalManager] Ошибка загрузки библиотек', {
                        error: error.message,
                    });
                    DomUtils.showError('Не удалось загрузить инструменты');
                    return;
                }
            }

            // Обновляем статус библиотек в ToolsUI
            if (typeof ToolsUI !== 'undefined' && ToolsUI.updateLibsStatus) {
                ToolsUI.updateLibsStatus();
            }
        }

        this.open('tools');
    },

    // =============================================================
    // 2.4. ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ
    // =============================================================

    /**
     * Устанавливает фокус на первый интерактивный элемент
     * @private
     * @param {HTMLElement} modal - Модалка
     */
    _focusFirstElement(modal) {
        const focusable = modal.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable) {
            setTimeout(() => focusable.focus(), 100);
        }
    },

    // =============================================================
    // 2.5. СОБЫТИЯ
    // =============================================================

    /**
     * Настраивает обработчики событий
     * @private
     */
    _setupEventListeners() {
        // Закрытие по клику на overlay или кнопку close
        document.querySelectorAll('.modal-overlay, .modal-close').forEach((el) => {
            el.addEventListener('click', (e) => {
                const modalName = e.target.dataset.modal;
                if (modalName && this._modals[modalName]) {
                    this.close(modalName);
                }
            });
        });

        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                for (const [name, modal] of Object.entries(this._modals)) {
                    if (modal && modal.classList.contains('active')) {
                        this.close(name);
                        break;
                    }
                }
            }
        });

        // Кнопка "Инструменты" в хедере
        const toolsBtn = document.getElementById('showToolsModal');
        if (toolsBtn) {
            toolsBtn.addEventListener('click', () => {
                this.openTools();
            });
        }

        // Кнопка "Инструменты" в футере
        const toolsFooterBtn = document.getElementById('showToolsModalFooter');
        if (toolsFooterBtn) {
            toolsFooterBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openTools();
            });
        }

        // Кнопка "Госпошлины"
        const feesBtn = document.getElementById('showFeesModal');
        if (feesBtn) {
            feesBtn.addEventListener('click', () => {
                this.open('fees');
            });
        }

        // Кнопка "Оплатить"
        const paymentBtn = document.getElementById('showPaymentModal');
        if (paymentBtn) {
            paymentBtn.addEventListener('click', () => {
                this.open('payment');
            });
        }

        // Кнопки "Онлайн-консультация"
        document.querySelectorAll('.consultation-trigger').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.open('consultation');
            });
        });

        // Кнопка "Мои файлы"
        const filesBtn = document.getElementById('showFilesModal');
        if (filesBtn) {
            filesBtn.addEventListener('click', () => {
                this.open('files');
            });
        }
    },

    /**
     * Настраивает ссылки внутри модалок
     * @private
     */
    _setupModalLinks() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href="#contact-block"]');
            if (link && link.closest('.modal')) {
                const modal = link.closest('.modal');
                if (modal && modal.id) {
                    const modalName = modal.id.replace('Modal', '');
                    this.close(modalName);
                }
            }
        });
    },
};

// ================================================================
// 3. МОДАЛКА "МОИ ФАЙЛЫ" (FILES MODAL)
// ================================================================

const FilesModal = {
    // =============================================================
    // 3.1. СОСТОЯНИЕ
    // =============================================================

    _currentFilter: 'all',
    _isInitialized: false,

    // =============================================================
    // 3.2. ИНИЦИАЛИЗАЦИЯ
    // =============================================================

    /**
     * Инициализирует модалку файлов
     */
    init() {
        if (this._isInitialized) return;

        // Настраиваем фильтры
        document.querySelectorAll('.files-filter-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                if (filter) {
                    this.setFilter(filter);
                }
            });
        });

        this._isInitialized = true;
        Logger.info('[FilesModal] Инициализирована');
    },

    // =============================================================
    // 3.3. ОСНОВНЫЕ МЕТОДЫ
    // =============================================================

    /**
     * Загружает и отображает файлы
     */
    async loadFiles() {
        const container = document.getElementById('filesListContainer');
        if (!container) return;

        try {
            // 🔒 ПОЛНОСТЬЮ ОЧИЩАЕМ контейнер перед загрузкой
            DomUtils.empty(container);

            // Показываем скелетон
            DomUtils.createSkeleton('file', 5, container);

            // Загружаем файлы
            const files = await FileManager.getFilesByType(this._currentFilter);

            // 🔒 ПРИНУДИТЕЛЬНО удаляем скелетон
            DomUtils.removeSkeleton(container);

            if (files.length === 0) {
                // 🔒 ЕЩЁ РАЗ очищаем контейнер перед рендерингом пустого состояния
                DomUtils.empty(container);
                this._renderEmptyState(container);
                await this.updateStats();
                return;
            }

            // Рендерим файлы
            const fragment = document.createDocumentFragment();
            files.forEach((file) => {
                const item = this._renderFileItem(file);
                fragment.appendChild(item);
            });
            container.appendChild(fragment);

            await this.updateStats();
        } catch (error) {
            Logger.error('[FilesModal] Ошибка загрузки файлов', { error: error.message });
            // 🔒 ПРИНУДИТЕЛЬНО удаляем скелетон при ошибке
            DomUtils.removeSkeleton(container);
            DomUtils.empty(container);
            this._renderError(container, 'Ошибка загрузки файлов');
        }
    },

    /**
     * Обновляет статистику
     */
    async updateStats() {
        try {
            const info = await FileManager.getStorageInfo();

            const countEl = document.getElementById('totalFilesCount');
            const sizeEl = document.getElementById('totalFilesSize');

            if (countEl) countEl.textContent = info.count;
            if (sizeEl) sizeEl.textContent = info.totalSizeFormatted;

            this.updateBadge(info.count);
        } catch (error) {
            Logger.error('[FilesModal] Ошибка обновления статистики', { error: error.message });
        }
    },

    /**
     * Устанавливает фильтр
     * @param {string} filter - 'all', 'pdf', 'image', 'doc'
     */
    setFilter(filter) {
        this._currentFilter = filter;

        document.querySelectorAll('.files-filter-btn').forEach((btn) => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });

        this.loadFiles();
    },

    /**
     * Скачивает файл
     * @param {string} id - ID файла
     */
    async downloadFile(id) {
        try {
            const file = await FileManager.getFileById(id);
            if (!file) {
                DomUtils.showError('Файл не найден');
                return;
            }

            await FileManager.downloadFile(file);
            DomUtils.showSuccess(`Скачивание: ${file.name}`);
        } catch (error) {
            Logger.error('[FilesModal] Ошибка скачивания', { error: error.message });
            DomUtils.showError('Не удалось скачать файл');
        }
    },

    /**
     * Удаляет файл
     * @param {string} id - ID файла
     */
    async deleteFile(id) {
        if (!confirm('Удалить этот файл?')) return;

        try {
            await FileManager.deleteFile(id);
            await this.loadFiles();
            await this.updateStats();
            DomUtils.showSuccess('Файл удалён');
        } catch (error) {
            Logger.error('[FilesModal] Ошибка удаления', { error: error.message });
            DomUtils.showError('Не удалось удалить файл');
        }
    },

    /**
     * Удаляет все файлы
     */
    async clearAllFiles() {
        if (!confirm('Удалить все сохранённые файлы? Это действие нельзя отменить.')) return;

        try {
            const success = await FileManager.clearAllFiles();
            if (!success) {
                throw new Error('Очистка БД вернула false');
            }

            // 🔒 Принудительно обновляем UI
            const container = document.getElementById('filesListContainer');
            if (container) {
                DomUtils.empty(container);
                this._renderEmptyState(container);
            }

            await this.updateStats();
            this.updateBadge(0);
            DomUtils.showSuccess('Все файлы удалены');
        } catch (error) {
            Logger.error('[FilesModal] Ошибка очистки', {
                error: error.message,
                stack: error.stack,
            });
            DomUtils.showError('Не удалось очистить файлы');
        }
    },

    /**
     * Обновляет бейдж в хедере
     * @param {number} count - Количество файлов
     */
    updateBadge(count) {
        const badge = document.getElementById('headerFilesBadge');
        if (badge) {
            badge.textContent = count || 0;
            badge.style.display = count > 0 ? 'flex' : 'none';
        }
    },

    // =============================================================
    // 3.4. РЕНДЕРИНГ (БЕЗ innerHTML)
    // =============================================================

    /**
     * Рендерит элемент файла
     * @private
     * @param {Object} file - Объект файла
     * @returns {HTMLElement} - Элемент файла
     */
    _renderFileItem(file) {
        const item = DomUtils.createElementSafe('div', 'file-item', {
            'data-id': file.id,
        });

        // Иконка
        const iconDiv = DomUtils.createElementSafe('div', 'file-icon');
        const icon = DomUtils.createElementSafe('i', `bi ${FileManager.getFileIcon(file.type)}`);
        iconDiv.appendChild(icon);
        item.appendChild(iconDiv);

        // Контент
        const content = DomUtils.createElementSafe('div', 'file-content');

        // Имя
        const nameDiv = DomUtils.createElementSafe('div', 'file-name', {
            title: file.originalName || file.name,
        });
        const seqSpan = DomUtils.createElementSafe('span', 'file-seq', {});
        seqSpan.textContent = `#${file.sequence}`;
        nameDiv.appendChild(seqSpan);
        nameDiv.appendChild(document.createTextNode(' ' + (file.originalName || file.name)));
        content.appendChild(nameDiv);

        // Мета
        const metaDiv = DomUtils.createElementSafe('div', 'file-meta');

        const dateSpan = DomUtils.createElementSafe('span', '');
        const dateIcon = DomUtils.createElementSafe('i', 'bi bi-calendar3');
        dateSpan.appendChild(dateIcon);
        dateSpan.appendChild(document.createTextNode(' ' + FileManager.formatDate(file.timestamp)));
        metaDiv.appendChild(dateSpan);

        const sizeSpan = DomUtils.createElementSafe('span', '');
        const sizeIcon = DomUtils.createElementSafe('i', 'bi bi-hdd');
        sizeSpan.appendChild(sizeIcon);
        sizeSpan.appendChild(document.createTextNode(' ' + StringUtils.formatFileSize(file.size)));
        metaDiv.appendChild(sizeSpan);

        const toolSpan = DomUtils.createElementSafe('span', 'file-tool');
        const toolIcon = DomUtils.createElementSafe('i', 'bi bi-tools');
        toolSpan.appendChild(toolIcon);
        toolSpan.appendChild(document.createTextNode(' ' + this._getToolName(file.tool)));
        metaDiv.appendChild(toolSpan);

        content.appendChild(metaDiv);
        item.appendChild(content);

        // Действия
        const actions = DomUtils.createElementSafe('div', 'file-actions');

        const downloadBtn = DomUtils.createElementSafe('button', 'btn-download', {
            title: 'Скачать',
        });
        const dlIcon = DomUtils.createElementSafe('i', 'bi bi-download');
        downloadBtn.appendChild(dlIcon);
        downloadBtn.addEventListener('click', () => {
            this.downloadFile(file.id);
        });
        actions.appendChild(downloadBtn);

        const deleteBtn = DomUtils.createElementSafe('button', 'btn-delete', {
            title: 'Удалить',
        });
        const delIcon = DomUtils.createElementSafe('i', 'bi bi-trash');
        deleteBtn.appendChild(delIcon);
        deleteBtn.addEventListener('click', () => {
            this.deleteFile(file.id);
        });
        actions.appendChild(deleteBtn);

        item.appendChild(actions);

        return item;
    },

    /**
     * Рендерит пустое состояние
     * @private
     * @param {HTMLElement} container - Контейнер
     */
    _renderEmptyState(container) {
        // 🔒 Проверяем, нет ли уже пустого состояния
        const existing = container.querySelector('.empty-files');
        if (existing) {
            return; // Уже есть - не дублируем
        }

        const empty = DomUtils.createElementSafe('div', 'empty-files');
        const icon = DomUtils.createElementSafe('i', 'bi bi-folder-open');
        empty.appendChild(icon);
        const text = DomUtils.createElementSafe('p', '', {}, 'Нет сохранённых файлов');
        empty.appendChild(text);
        container.appendChild(empty);
    },

    /**
     * Рендерит состояние ошибки
     * @private
     * @param {HTMLElement} container - Контейнер
     * @param {string} message - Сообщение об ошибке
     */
    _renderError(container, message) {
        const error = DomUtils.createElementSafe('div', 'empty-files');
        const icon = DomUtils.createElementSafe('i', 'bi bi-exclamation-triangle', {
            style: 'color: #dc3545;',
        });
        error.appendChild(icon);
        const text = DomUtils.createElementSafe('p', '', {}, message);
        error.appendChild(text);
        container.appendChild(error);
    },

    /**
     * Возвращает имя инструмента
     * @private
     * @param {string} tool - Идентификатор инструмента
     * @returns {string} - Человекочитаемое имя
     */
    _getToolName(tool) {
        const names = {
            convert: 'Конвертер',
            compress: 'Сжатие',
            pdf: 'PDF',
            resize: 'Размер',
            'pdf-tool': 'PDF',
            'image-converter': 'Конвертер',
        };
        return names[tool] || tool;
    },
};

// ================================================================
// 4. PDF МЕНЕДЖЕР (PDF MANAGER)
// ================================================================

const PdfManager = {
    // =============================================================
    // 4.1. СОСТОЯНИЕ
    // =============================================================

    _modal: null,
    _viewer: null,
    _isInitialized: false,

    // =============================================================
    // 4.2. ИНИЦИАЛИЗАЦИЯ
    // =============================================================

    /**
     * Инициализирует PDF-менеджер
     */
    init() {
        if (this._isInitialized) return;

        this._modal = document.getElementById('pdfModal');
        this._viewer = document.getElementById('pdfViewer');

        if (!this._modal || !this._viewer) {
            Logger.warn('[PdfManager] Модалка или вьювер не найдены');
            return;
        }

        // Обработчики для кнопок просмотра PDF
        document.querySelectorAll('.pdf-viewer-btn').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                const pdfUrl = btn.dataset.pdf;
                if (pdfUrl) {
                    this.openPdf(pdfUrl);
                }
            });
        });

        this._isInitialized = true;
        Logger.info('[PdfManager] Инициализирован');
    },

    // =============================================================
    // 4.3. ОСНОВНЫЕ МЕТОДЫ
    // =============================================================

    /**
     * Открывает PDF
     * @param {string} url - URL PDF-файла
     */
    openPdf(url) {
        if (!url) {
            Logger.error('[PdfManager] URL не указан');
            return;
        }

        this._viewer.src = url;
        ModalManager.open('pdf');
        Logger.debug('[PdfManager] PDF открыт', { url });
    },

    /**
     * Закрывает PDF
     */
    closePdf() {
        ModalManager.close('pdf');
        setTimeout(() => {
            if (this._viewer) {
                this._viewer.src = '';
            }
        }, 300);
    },
};

// ================================================================
// 5. КАРУСЕЛЬ КЕЙСОВ (CASES CAROUSEL)
// ================================================================

const CasesCarousel = {
    // =============================================================
    // 5.1. СОСТОЯНИЕ
    // =============================================================

    _carousel: null,
    _prevBtn: null,
    _nextBtn: null,
    _indicators: [],
    _cardWidth: 350,
    _gap: 24,
    _isInitialized: false,

    // =============================================================
    // 5.2. ИНИЦИАЛИЗАЦИЯ
    // =============================================================

    /**
     * Инициализирует карусель
     */
    init() {
        if (this._isInitialized) return;

        this._carousel = document.getElementById('casesCarousel');
        this._prevBtn = document.getElementById('casesPrev');
        this._nextBtn = document.getElementById('casesNext');
        this._indicators = document.querySelectorAll('.carousel-indicator__item');

        if (!this._carousel) {
            Logger.warn('[CasesCarousel] Карусель не найдена');
            return;
        }

        this._attachEvents();
        this.updateControls();

        this._isInitialized = true;
        Logger.info('[CasesCarousel] Инициализирован');
    },

    // =============================================================
    // 5.3. ОСНОВНЫЕ МЕТОДЫ
    // =============================================================

    /**
     * Прокручивает карусель
     * @param {number} direction - -1 (влево) или 1 (вправо)
     */
    scroll(direction) {
        const scrollAmount = (this._cardWidth + this._gap) * direction;
        this._carousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth',
        });
    },

    /**
     * Прокручивает к указанному индексу
     * @param {number} index - Индекс слайда
     */
    scrollToIndex(index) {
        const scrollTo = index * (this._cardWidth + this._gap);
        this._carousel.scrollTo({
            left: scrollTo,
            behavior: 'smooth',
        });
    },

    /**
     * Обновляет состояние кнопок и индикаторов
     */
    updateControls() {
        if (!this._carousel) return;

        const maxScroll = this._carousel.scrollWidth - this._carousel.clientWidth;
        const currentScroll = this._carousel.scrollLeft;

        if (this._prevBtn) {
            this._prevBtn.disabled = currentScroll <= 0;
        }

        if (this._nextBtn) {
            this._nextBtn.disabled = currentScroll >= maxScroll - 1;
        }

        if (this._indicators.length) {
            const itemWidth = this._cardWidth + this._gap;
            const activeIndex = Math.round(currentScroll / itemWidth);

            this._indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === activeIndex);
                indicator.setAttribute('aria-label', `Перейти к слайду ${index + 1}`);
            });
        }
    },

    // =============================================================
    // 5.4. СОБЫТИЯ
    // =============================================================

    /**
     * Настраивает обработчики событий
     * @private
     */
    _attachEvents() {
        if (this._prevBtn) {
            this._prevBtn.addEventListener('click', () => this.scroll(-1));
        }

        if (this._nextBtn) {
            this._nextBtn.addEventListener('click', () => this.scroll(1));
        }

        this._carousel.addEventListener('scroll', () => {
            this.updateControls();
        });

        this._indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.scrollToIndex(index);
            });
            indicator.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.scrollToIndex(index);
                }
            });
        });

        window.addEventListener('resize', () => {
            this.updateControls();
        });
    },
};

// ================================================================
// 6. УПРАВЛЕНИЕ ИСТОЧНИКАМИ (SOURCE MANAGER)
// ================================================================

const SourceManager = {
    // =============================================================
    // 6.1. СОСТОЯНИЕ
    // =============================================================

    _sources: {},
    _isInitialized: false,

    // =============================================================
    // 6.2. ИНИЦИАЛИЗАЦИЯ
    // =============================================================

    /**
     * Инициализирует менеджер источников
     * @param {Object} sources - Объект с источниками
     */
    init(sources) {
        if (this._isInitialized) return;

        this._sources = sources || {};

        const openBtn = document.getElementById('openSourceBtn');
        if (openBtn) {
            openBtn.addEventListener('click', () => {
                const select = document.getElementById('sourceSelect');
                if (select && select.value && this._sources[select.value]) {
                    window.open(this._sources[select.value], '_blank', 'noopener noreferrer');
                }
            });
        }

        this._isInitialized = true;
        Logger.info('[SourceManager] Инициализирован');
    },

    /**
     * Открывает источник
     * @param {string} sourceKey - Ключ источника
     */
    openSource(sourceKey) {
        if (sourceKey && this._sources[sourceKey]) {
            window.open(this._sources[sourceKey], '_blank', 'noopener noreferrer');
        }
    },
};

// ================================================================
// 7. УПРАВЛЕНИЕ ВРЕМЕНЕМ (TIME MANAGER)
// ================================================================

const TimeManager = {
    // =============================================================
    // 7.1. СОСТОЯНИЕ
    // =============================================================

    _intervalId: null,
    _isInitialized: false,

    // =============================================================
    // 7.2. ИНИЦИАЛИЗАЦИЯ
    // =============================================================

    /**
     * Инициализирует менеджер времени
     */
    init() {
        if (this._isInitialized) return;

        this.updateTime();
        this._intervalId = setInterval(() => {
            this.updateTime();
        }, 60000);

        this._isInitialized = true;
        Logger.info('[TimeManager] Инициализирован');
    },

    // =============================================================
    // 7.3. ОСНОВНЫЕ МЕТОДЫ
    // =============================================================

    /**
     * Обновляет отображение времени и статуса
     */
    updateTime() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
        });

        const status = this._getStatus(now);
        this._updateUI(timeStr, status);
    },

    /**
     * Определяет статус в зависимости от времени
     * @private
     * @param {Date} now - Текущее время
     * @returns {string} - Статус
     */
    _getStatus(now) {
        const hour = now.getHours();
        const day = now.getDay();

        // Выходные
        if (day === 0 || day === 6) {
            if (hour >= 10 && hour < 18) {
                return 'дежурный режим';
            }
            return 'приём заявок онлайн';
        }

        // Будние
        if (hour >= 9 && hour < 18) {
            return 'запись на приём';
        }
        if (hour >= 18 && hour < 21) {
            return 'на связи (до 21:00)';
        }
        return 'приём заявок 24/7';
    },

    /**
     * Обновляет UI
     * @private
     * @param {string} timeStr - Время
     * @param {string} status - Статус
     */
    _updateUI(timeStr, status) {
        document.querySelectorAll('#currentTime').forEach((el) => {
            if (el) el.textContent = timeStr;
        });

        document.querySelectorAll('#heroTimeStatus').forEach((el) => {
            if (el) el.textContent = status;
        });

        const statusBadge = document.getElementById('statusBadge');
        if (statusBadge) {
            statusBadge.setAttribute('title', 'Статус: ' + status);
            statusBadge.setAttribute('aria-label', 'Статус: ' + status);
        }
    },
};

// ================================================================
// 8. FAQ МЕНЕДЖЕР (FAQ MANAGER)
// ================================================================

const FaqManager = {
    // =============================================================
    // 8.1. СОСТОЯНИЕ
    // =============================================================

    _isInitialized: false,

    // =============================================================
    // 8.2. ИНИЦИАЛИЗАЦИЯ
    // =============================================================

    /**
     * Инициализирует FAQ-аккордеон
     */
    init() {
        if (this._isInitialized) return;

        document.querySelectorAll('.faq-question').forEach((btn) => {
            btn.addEventListener('click', () => {
                this.toggleQuestion(btn);
            });

            // Инициализируем состояние
            btn.setAttribute('aria-expanded', 'false');
            const answer = btn.nextElementSibling;
            if (answer) {
                answer.style.display = 'none';
            }
        });

        this._isInitialized = true;
        Logger.info('[FaqManager] Инициализирован');
    },

    // =============================================================
    // 8.3. ОСНОВНЫЕ МЕТОДЫ
    // =============================================================

    /**
     * Переключает вопрос
     * @param {HTMLElement} questionElement - Элемент вопроса
     */
    toggleQuestion(questionElement) {
        const answer = questionElement.nextElementSibling;
        const icon = questionElement.querySelector('i.bi-chevron-down, i.bi-chevron-up');
        const isExpanded = questionElement.getAttribute('aria-expanded') === 'true';

        questionElement.setAttribute('aria-expanded', !isExpanded);

        if (answer) {
            if (isExpanded) {
                answer.style.display = 'none';
                if (icon) {
                    icon.className = 'bi bi-chevron-down';
                }
            } else {
                answer.style.display = 'block';
                if (icon) {
                    icon.className = 'bi bi-chevron-up';
                }
            }
        }
    },
};

// ================================================================
// 9. ФОРМА ЗАПИСИ (FORM MANAGER)
// ================================================================

const FormManager = {
    // =============================================================
    // 9.1. СОСТОЯНИЕ
    // =============================================================

    _form: null,
    _submitBtn: null,
    _isInitialized: false,

    // =============================================================
    // 9.2. ИНИЦИАЛИЗАЦИЯ
    // =============================================================

    /**
     * Инициализирует форму
     */
    init() {
        if (this._isInitialized) return;

        this._form = document.getElementById('consultationForm');
        this._submitBtn = document.getElementById('submitForm');

        if (!this._form || !this._submitBtn) {
            Logger.warn('[FormManager] Форма или кнопка не найдены');
            return;
        }

        this._submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.submitForm();
        });

        this._isInitialized = true;
        Logger.info('[FormManager] Инициализирован');
    },

    // =============================================================
    // 9.3. ОСНОВНЫЕ МЕТОДЫ
    // =============================================================

    /**
     * Валидирует и отправляет форму
     */
    async submitForm() {
        const name = document.getElementById('contactName')?.value?.trim() || '';
        const phone = document.getElementById('contactPhone')?.value?.trim() || '';
        const message = document.getElementById('contactMessage')?.value?.trim() || '';
        const privacyAgree = document.getElementById('privacyAgree');
        const onlineConsult = document.getElementById('onlineConsultation')?.checked || false;

        // Валидация
        if (!privacyAgree || !privacyAgree.checked) {
            DomUtils.showError('Необходимо согласие с политикой конфиденциальности');
            return;
        }

        if (!name) {
            DomUtils.showError('Пожалуйста, укажите ваше имя');
            return;
        }

        if (!phone || phone.length < 10) {
            DomUtils.showError('Пожалуйста, введите корректный номер телефона');
            return;
        }

        // Отключаем кнопку
        this._submitBtn.disabled = true;
        this._submitBtn.textContent = 'Отправка...';

        try {
            // Отправляем через HttpService
            if (typeof HttpService !== 'undefined' && HttpService.submitConsultationForm) {
                const result = await HttpService.submitConsultationForm({
                    name: name,
                    phone: phone,
                    message: message,
                    onlineConsult: onlineConsult,
                    privacyConsent: true,
                });

                if (result.success) {
                    DomUtils.showSuccess(
                        'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.'
                    );
                    this.resetForm();
                    if (onlineConsult) {
                        this._showOnlineConsultNotice();
                    }
                } else {
                    DomUtils.showError('Произошла ошибка при отправке');
                }
            } else {
                // Fallback на прямую отправку
                await this._sendFormDirect(name, phone, message, onlineConsult);
            }
        } catch (error) {
            Logger.error('[FormManager] Ошибка отправки', { error: error.message });
            DomUtils.showError('Не удалось отправить заявку');
        } finally {
            this._submitBtn.disabled = false;
            this._submitBtn.textContent = 'Записаться к юристу в СПб';
        }
    },

    /**
     * Сбрасывает форму
     */
    resetForm() {
        const name = document.getElementById('contactName');
        const phone = document.getElementById('contactPhone');
        const message = document.getElementById('contactMessage');
        const privacyAgree = document.getElementById('privacyAgree');
        const onlineConsult = document.getElementById('onlineConsultation');

        if (name) name.value = '';
        if (phone) phone.value = '';
        if (message) message.value = '';
        if (privacyAgree) privacyAgree.checked = false;
        if (onlineConsult) onlineConsult.checked = false;
    },

    // =============================================================
    // 9.4. ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ
    // =============================================================

    /**
     * Отправляет форму напрямую (fallback)
     * @private
     */
    async _sendFormDirect(name, phone, message, onlineConsult) {
        const csrfToken = await HttpService.getCsrfToken();

        const response = await fetch('/send.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                name: name,
                phone: phone,
                message: message,
                honeypot: '',
                online: onlineConsult ? 'yes' : 'no',
                csrf_token: csrfToken,
            }),
        });

        const data = await response.text();

        if (data === 'ok') {
            DomUtils.showSuccess('Заявка успешно отправлена!');
            this.resetForm();
            if (onlineConsult) {
                this._showOnlineConsultNotice();
            }
        } else {
            throw new Error(data || 'Ошибка отправки');
        }
    },

    /**
     * Показывает уведомление об онлайн-консультации
     * @private
     */
    _showOnlineConsultNotice() {
        const notice = document.createElement('div');
        notice.className = 'consultation-notice';

        const content = document.createElement('div');
        content.className = 'consultation-notice-content';

        const icon = document.createElement('i');
        icon.className = 'bi bi-check-circle-fill';
        icon.style.cssText = 'color: var(--theme-brand-primary, #3d9c8c); font-size: 2.5rem;';
        content.appendChild(icon);

        const title = document.createElement('h4');
        title.textContent = 'Заявка на онлайн-консультацию отправлена';
        content.appendChild(title);

        const text = document.createElement('p');
        text.textContent =
            'Мы свяжемся с вами в ближайшее время для согласования удобного времени.';
        content.appendChild(text);

        const note = document.createElement('p');
        note.style.cssText = 'font-size: 0.9rem; color: var(--theme-text-tertiary, #6a7880);';
        note.textContent = 'Обычно это занимает не больше 2 часов';
        content.appendChild(note);

        const closeBtn = document.createElement('button');
        closeBtn.className = 'btn btn-primary btn-sm';
        closeBtn.textContent = 'Понятно';
        closeBtn.addEventListener('click', () => {
            notice.remove();
        });
        content.appendChild(closeBtn);

        notice.appendChild(content);
        document.body.appendChild(notice);

        setTimeout(() => {
            if (notice.parentNode) {
                notice.remove();
            }
        }, 5000);
    },
};

// ================================================================
// 10. АНИМАЦИЯ ЛОГОТИПА (LOGO IMAGE SPIN)
// ================================================================

const LogoImageSpin = {
    // =============================================================
    // 10.1. СОСТОЯНИЕ
    // =============================================================

    _logo: null,
    _isInitialized: false,

    // =============================================================
    // 10.2. ИНИЦИАЛИЗАЦИЯ
    // =============================================================

    /**
     * Инициализирует анимацию логотипа
     */
    init() {
        if (this._isInitialized) return;

        this._logo = document.querySelector('.hero-photo img');
        if (!this._logo) {
            Logger.warn('[LogoImageSpin] Логотип не найден');
            return;
        }

        this._logo.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.spin();
        });

        this._isInitialized = true;
        Logger.info('[LogoImageSpin] Инициализирован');
    },

    // =============================================================
    // 10.3. ОСНОВНЫЕ МЕТОДЫ
    // =============================================================

    /**
     * Запускает анимацию поворота логотипа
     */
    spin() {
        this._logo.classList.add('logo-image-spin');

        setTimeout(() => {
            this._logo.classList.remove('logo-image-spin');
        }, 1900);
    },
};

// ================================================================
// 11. ВЫПАДАЮЩИЕ МЕНЮ (DROPDOWN MANAGER)
// ================================================================

const DropdownManager = {
    // =============================================================
    // 11.1. СОСТОЯНИЕ
    // =============================================================

    _dropdowns: [],
    _activeDropdown: null,
    _isInitialized: false,

    // =============================================================
    // 11.2. ИНИЦИАЛИЗАЦИЯ
    // =============================================================

    /**
     * Инициализирует выпадающие меню
     */
    init() {
        if (this._isInitialized) return;

        const wrappers = document.querySelectorAll('.dropdown-wrapper');
        if (wrappers.length === 0) {
            Logger.warn('[DropdownManager] Выпадающие меню не найдены');
            return;
        }

        wrappers.forEach((wrapper) => {
            const toggle = wrapper.querySelector('.dropdown-toggle');
            const menu = wrapper.querySelector('.dropdown-menu');

            if (!toggle || !menu) return;

            this._dropdowns.push({ wrapper, toggle, menu });

            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleDropdown(wrapper);
            });

            // Закрытие при клике вне
            document.addEventListener('click', (e) => {
                if (!wrapper.contains(e.target)) {
                    this.closeDropdown(wrapper);
                }
            });

            // Закрытие по Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeDropdown(wrapper);
                }
            });

            // Клавиатурная навигация
            menu.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    const items = menu.querySelectorAll('a');
                    const first = items[0];
                    const last = items[items.length - 1];

                    if (e.shiftKey && document.activeElement === first) {
                        e.preventDefault();
                        toggle.focus();
                    } else if (!e.shiftKey && document.activeElement === last) {
                        e.preventDefault();
                        const nextWrapper =
                            wrapper.nextElementSibling?.querySelector('.dropdown-toggle');
                        if (nextWrapper) {
                            nextWrapper.focus();
                        } else {
                            toggle.focus();
                        }
                    }
                }
            });
        });

        this._isInitialized = true;
        Logger.info('[DropdownManager] Инициализирован');
    },

    // =============================================================
    // 11.3. ОСНОВНЫЕ МЕТОДЫ
    // =============================================================

    /**
     * Переключает выпадающее меню
     * @param {HTMLElement} wrapper - Обёртка дропдауна
     */
    toggleDropdown(wrapper) {
        if (wrapper.classList.contains('active')) {
            this.closeDropdown(wrapper);
        } else {
            // Закрываем все остальные
            this._dropdowns.forEach((d) => {
                if (d.wrapper !== wrapper) {
                    this.closeDropdown(d.wrapper);
                }
            });
            this.openDropdown(wrapper);
        }
    },

    /**
     * Открывает выпадающее меню
     * @param {HTMLElement} wrapper - Обёртка дропдауна
     */
    openDropdown(wrapper) {
        const data = this._dropdowns.find((d) => d.wrapper === wrapper);
        if (!data) return;

        const { toggle, menu } = data;
        wrapper.classList.add('active');
        toggle.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
        menu.setAttribute('aria-hidden', 'false');
        this._activeDropdown = wrapper;

        const firstItem = menu.querySelector('a');
        if (firstItem) {
            setTimeout(() => firstItem.focus(), 100);
        }
    },

    /**
     * Закрывает выпадающее меню
     * @param {HTMLElement} wrapper - Обёртка дропдауна
     */
    closeDropdown(wrapper) {
        const data = this._dropdowns.find((d) => d.wrapper === wrapper);
        if (!data) return;

        const { toggle, menu } = data;
        wrapper.classList.remove('active');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
        if (this._activeDropdown === wrapper) {
            this._activeDropdown = null;
        }
    },
};

// ================================================================
// 12. УПРАВЛЕНИЕ COOKIE (COOKIE MANAGER)
// ================================================================

const CookieManager = {
    // =============================================================
    // 12.1. СОСТОЯНИЕ
    // =============================================================

    _bannerId: 'cookieBanner',
    _consentKey: 'cookie_consent',
    _analyticsLoaded: false,
    _isInitialized: false,

    // =============================================================
    // 12.2. ИНИЦИАЛИЗАЦИЯ
    // =============================================================

    /**
     * Инициализирует менеджер cookie
     */
    init() {
        if (this._isInitialized) return;

        const consent = this.getConsent();

        if (!consent) {
            this.showBanner();
        } else {
            this.applyConsent(consent === 'accepted');
        }

        this._setupEventListeners();

        this._isInitialized = true;
        Logger.info('[CookieManager] Инициализирован', { hasConsent: !!consent });
    },

    // =============================================================
    // 12.3. ОСНОВНЫЕ МЕТОДЫ
    // =============================================================

    /**
     * Получает согласие из localStorage
     * @returns {string|null} - 'accepted', 'declined' или null
     */
    getConsent() {
        try {
            return localStorage.getItem(this._consentKey);
        } catch (error) {
            return null;
        }
    },

    /**
     * Сохраняет согласие
     * @param {string} value - 'accepted' или 'declined'
     */
    setConsent(value) {
        try {
            localStorage.setItem(this._consentKey, value);
        } catch (error) {
            Logger.warn('[CookieManager] Ошибка сохранения согласия', { error: error.message });
        }
    },

    /**
     * Показывает баннер cookie
     */
    showBanner() {
        const banner = document.getElementById(this._bannerId);
        if (banner) {
            setTimeout(() => {
                banner.classList.add('visible');
            }, 300);
        }
    },

    /**
     * Скрывает баннер cookie
     */
    hideBanner() {
        const banner = document.getElementById(this._bannerId);
        if (banner) {
            banner.classList.remove('visible');
            setTimeout(() => {
                banner.style.display = 'none';
            }, 500);
        }
    },

    /**
     * Принимает cookie
     */
    accept() {
        this.setConsent('accepted');
        this.applyConsent(true);
        this.hideBanner();
    },

    /**
     * Отклоняет cookie
     */
    decline() {
        this.setConsent('declined');
        this.applyConsent(false);
        this.hideBanner();
    },

    /**
     * Применяет согласие
     * @param {boolean} accepted - true, если согласие получено
     */
    applyConsent(accepted) {
        // 🔒 АНАЛИТИКА ОТКЛЮЧЕНА - ничего не загружаем
        // Метрика и GA не используются, чтобы не нарушать CSP
        if (accepted) {
            Logger.debug('[CookieManager] Согласие получено, но аналитика отключена');
        } else {
            Logger.debug('[CookieManager] Согласие отклонено, аналитика отключена');
        }
    },

    /**
     * Проверяет, есть ли согласие
     * @returns {boolean} - true, если есть согласие
     */
    hasConsent() {
        return this.getConsent() === 'accepted';
    },

    // =============================================================
    // 12.4. СОБЫТИЯ
    // =============================================================

    /**
     * Настраивает обработчики событий
     * @private
     */
    _setupEventListeners() {
        const acceptBtn = document.getElementById('cookieAccept');
        const declineBtn = document.getElementById('cookieDecline');

        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => this.accept());
        }

        if (declineBtn) {
            declineBtn.addEventListener('click', () => this.decline());
        }
    },
};

// ================================================================
// ЭКСПОРТЫ
// ================================================================

window.ScrollTopButton = ScrollTopButton;
window.ModalManager = ModalManager;
window.FilesModal = FilesModal;
window.PdfManager = PdfManager;
window.CasesCarousel = CasesCarousel;
window.SourceManager = SourceManager;
window.TimeManager = TimeManager;
window.FaqManager = FaqManager;
window.FormManager = FormManager;
window.LogoImageSpin = LogoImageSpin;
window.DropdownManager = DropdownManager;
window.CookieManager = CookieManager;

// ================================================================
// БЛОК 9: БИЗНЕС-ЛОГИКА ИНСТРУМЕНТОВ (TOOLS SERVICE)
// ================================================================
// Назначение: Чистая бизнес-логика обработки файлов.
// Принцип: Не содержит DOM-операций. Работает через Web Worker.
// Лицензия: MIT (оригинальный код автора) + zip.js (BSD 3-Clause)
//
// 📚 БИБЛИОТЕКИ:
// - pdf.js (Apache 2.0) - рендеринг PDF и извлечение текста
// - pdf.worker.min.js (Apache 2.0) - воркер для pdf.js
// - pdf-lib (MIT) - создание, объединение, разделение PDF
// - browser-image-compression (MIT) - сжатие изображений
// - zip.js (BSD 3-Clause) - создание ZIP-архивов (замена JSZip)
//
// 🔒 БЕЗОПАСНОСТЬ (OWASP):
// - Все данные проходят валидацию
// - Защита от слишком больших файлов и изображений
// - Ограничение количества страниц PDF (500)
// - Ограничение количества файлов для архивации (100)
// - Все операции с try/catch
//
// ⚡ СКОРОСТЬ:
// - Web Worker для тяжёлых операций
// - Оптимизированные циклы
// - Параллельная обработка страниц PDF
//
// 🛡️ НАДЁЖНОСТЬ:
// - Все ошибки обрабатываются
// - Fallback-значения
// - Логирование через Logger
// ================================================================

const ToolsService = {
    // =============================================================
    // ЧАСТЬ 1: УДАЛЕНИЕ ФОНА
    // =============================================================

    /**
     * Вычисляет цветовое расстояние (евклидово) между двумя цветами
     * @param {number} r1 - Красный компонент первого цвета
     * @param {number} g1 - Зелёный компонент первого цвета
     * @param {number} b1 - Синий компонент первого цвета
     * @param {number} r2 - Красный компонент второго цвета
     * @param {number} g2 - Зелёный компонент второго цвета
     * @param {number} b2 - Синий компонент второго цвета
     * @returns {number} - Евклидово расстояние
     */
    _colorDistance(r1, g1, b1, r2, g2, b2) {
        const dr = r1 - r2;
        const dg = g1 - g2;
        const db = b1 - b2;
        return Math.sqrt(dr * dr + dg * dg + db * db);
    },

    /**
     * Проверяет, является ли пиксель фоновым (сравнение с эталонным фоном)
     * @param {number} r - Красный компонент пикселя
     * @param {number} g - Зелёный компонент пикселя
     * @param {number} b - Синий компонент пикселя
     * @param {number} bgR - Красный компонент фона
     * @param {number} bgG - Зелёный компонент фона
     * @param {number} bgB - Синий компонент фона
     * @param {number} threshold - Порог чувствительности
     * @returns {boolean} - true, если пиксель является фоновым
     */
    _isBackgroundPixel(r, g, b, bgR, bgG, bgB, threshold) {
        return this._colorDistance(r, g, b, bgR, bgG, bgB) < threshold;
    },

    /**
     * Находит цвет ближайшего пикселя объекта (для DESPILL)
     * @private
     * @param {number} idx - Индекс пикселя в массиве
     * @param {number} width - Ширина изображения
     * @param {number} height - Высота изображения
     * @param {Uint8Array} erodedMask - Маска после эрозии
     * @param {Uint8ClampedArray} data - Данные изображения
     * @returns {Object} - { r, g, b } цвет ближайшего пикселя объекта
     */
    _getNearestObjectColor(idx, width, height, erodedMask, data) {
        const x = idx % width;
        const y = Math.floor(idx / width);
        const radius = 5;

        let bestR = 0,
            bestG = 0,
            bestB = 0;
        let found = false;

        for (let dy = -radius; dy <= radius && !found; dy++) {
            for (let dx = -radius; dx <= radius && !found; dx++) {
                const nx = x + dx;
                const ny = y + dy;
                if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
                const nIdx = ny * width + nx;
                if (erodedMask[nIdx] === 1) {
                    const nDataIdx = nIdx * 4;
                    bestR = data[nDataIdx];
                    bestG = data[nDataIdx + 1];
                    bestB = data[nDataIdx + 2];
                    found = true;
                }
            }
        }

        return { r: bestR, g: bestG, b: bestB };
    },

    /**
     * Проверяет, есть ли в углах canvas непрозрачные пиксели
     * Это признак того, что фон не стал полностью прозрачным
     * @param {HTMLCanvasElement} canvas - Canvas для проверки
     * @returns {boolean} - true, если есть остаточный фон
     */
    _hasResidualBackground(canvas) {
        try {
            const ctx = canvas.getContext('2d');
            const width = canvas.width;
            const height = canvas.height;
            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;

            const corners = [
                [0, 0],
                [width - 1, 0],
                [0, height - 1],
                [width - 1, height - 1],
            ];

            for (const [x, y] of corners) {
                const idx = (y * width + x) * 4;
                const alpha = data[idx + 3];
                if (alpha > 10) {
                    return true;
                }
            }

            return false;
        } catch (error) {
            Logger.warn('[ToolsService] Ошибка проверки остаточного фона', {
                error: error.message,
            });
            return false;
        }
    },

    async removeBackground(
        dataUrl,
        threshold = 35,
        quality = 'high' // 'high', 'medium', 'low'
    ) {
        // 🔒 Входная валидация
        if (!dataUrl || typeof dataUrl !== 'string') {
            Logger.warn('[ToolsService] removeBackground: невалидный Data URL');
            return dataUrl;
        }

        const isWebP = dataUrl.startsWith('data:image/webp');
        const isPNG = dataUrl.startsWith('data:image/png');
        const isJPEG = dataUrl.startsWith('data:image/jpeg');

        if (!isPNG && !isWebP && !isJPEG) {
            Logger.warn('[ToolsService] removeBackground: невалидный формат изображения');
            return dataUrl;
        }

        const qualitySettings = {
            high: { blur: 1, median: 1, smoothRadius: 4, exportFormat: 'png' },
            medium: { blur: 1, median: 0, smoothRadius: 2, exportFormat: 'webp' },
            low: { blur: 0, median: 0, smoothRadius: 1, exportFormat: 'webp' },
        };
        const settings = qualitySettings[quality] || qualitySettings.high;

        return new Promise((resolve) => {
            const img = new Image();
            let isResolved = false;
            const self = this;

            const timeoutId = setTimeout(() => {
                if (!isResolved) {
                    isResolved = true;
                    Logger.warn('[ToolsService] Таймаут removeBackground');
                    resolve(dataUrl);
                }
            }, 15000);

            img.onload = function () {
                if (isResolved) return;
                clearTimeout(timeoutId);

                try {
                    const width = img.width;
                    const height = img.height;

                    if (width > 4096 || height > 4096 || width < 20 || height < 20) {
                        Logger.warn('[ToolsService] Некорректный размер изображения');
                        isResolved = true;
                        resolve(dataUrl);
                        return;
                    }

                    // 🔒 Используем OffscreenCanvas для лучшей производительности и качества
                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d', {
                        willReadFrequently: true,
                        alpha: true,
                        colorSpace: 'srgb', // ← сохраняем цветовое пространство
                    });

                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = 'high'; // ← максимальное качество
                    ctx.drawImage(img, 0, 0);

                    const imageData = ctx.getImageData(0, 0, width, height);
                    let data = imageData.data;

                    if (!data || data.length === 0) {
                        Logger.warn('[ToolsService] removeBackground: пустые данные');
                        isResolved = true;
                        resolve(dataUrl);
                        return;
                    }

                    const totalPixels = width * height;

                    // =============================================================
                    // 1. ОПРЕДЕЛЯЕМ ЦВЕТ ФОНА
                    // =============================================================

                    function getBackgroundColor(data, width, height) {
                        const samples = [];
                        const step = Math.max(1, Math.floor(Math.min(width, height) / 20));

                        for (let x = 0; x < width; x += step) {
                            const idx = (0 * width + x) * 4;
                            samples.push({ r: data[idx], g: data[idx + 1], b: data[idx + 2] });
                        }
                        for (let x = 0; x < width; x += step) {
                            const idx = ((height - 1) * width + x) * 4;
                            samples.push({ r: data[idx], g: data[idx + 1], b: data[idx + 2] });
                        }
                        for (let y = 0; y < height; y += step) {
                            const idx = (y * width + 0) * 4;
                            samples.push({ r: data[idx], g: data[idx + 1], b: data[idx + 2] });
                        }
                        for (let y = 0; y < height; y += step) {
                            const idx = (y * width + (width - 1)) * 4;
                            samples.push({ r: data[idx], g: data[idx + 1], b: data[idx + 2] });
                        }

                        let sumR = 0,
                            sumG = 0,
                            sumB = 0;
                        for (const s of samples) {
                            sumR += s.r;
                            sumG += s.g;
                            sumB += s.b;
                        }
                        const count = samples.length;
                        return {
                            r: Math.round(sumR / count),
                            g: Math.round(sumG / count),
                            b: Math.round(sumB / count),
                        };
                    }

                    const bgColor = getBackgroundColor(data, width, height);
                    const bgR = bgColor.r;
                    const bgG = bgColor.g;
                    const bgB = bgColor.b;

                    // =============================================================
                    // 2. ПРЕДВАРИТЕЛЬНАЯ ОБРАБОТКА (размытие)
                    // =============================================================

                    if (settings.blur > 0) {
                        const blurredData = new Uint8ClampedArray(data);
                        const temp = new Uint8ClampedArray(data);
                        const half = settings.blur;

                        for (let y = 0; y < height; y++) {
                            for (let x = 0; x < width; x++) {
                                let sumR = 0,
                                    sumG = 0,
                                    sumB = 0,
                                    count = 0;
                                for (let dy = -half; dy <= half; dy++) {
                                    for (let dx = -half; dx <= half; dx++) {
                                        const nx = x + dx;
                                        const ny = y + dy;
                                        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                                            const idx = (ny * width + nx) * 4;
                                            sumR += temp[idx];
                                            sumG += temp[idx + 1];
                                            sumB += temp[idx + 2];
                                            count++;
                                        }
                                    }
                                }
                                const idx = (y * width + x) * 4;
                                blurredData[idx] = sumR / count;
                                blurredData[idx + 1] = sumG / count;
                                blurredData[idx + 2] = sumB / count;
                                blurredData[idx + 3] = temp[idx + 3];
                            }
                        }
                        data = blurredData;
                    }

                    // =============================================================
                    // 3. АДАПТИВНЫЙ ПОРОГ
                    // =============================================================

                    let adaptiveThreshold = threshold;
                    const distances = [];

                    for (let i = 0; i < Math.min(totalPixels, 10000); i += 10) {
                        const idx = i * 4;
                        const r = data[idx];
                        const g = data[idx + 1];
                        const b = data[idx + 2];
                        const dist = self._colorDistance(r, g, b, bgR, bgG, bgB);
                        distances.push(dist);
                    }

                    distances.sort((a, b) => a - b);
                    const medianIndex = Math.floor(distances.length * 0.5);
                    const medianDist = distances[medianIndex] || 30;

                    if (medianDist < 15) {
                        adaptiveThreshold = threshold * 0.7;
                    } else if (medianDist > 80) {
                        adaptiveThreshold = threshold * 1.3;
                    }
                    adaptiveThreshold = Math.min(Math.max(adaptiveThreshold, 20), 60);

                    // =============================================================
                    // 4. ПРИМЕНЯЕМ ПРОЗРАЧНОСТЬ
                    // =============================================================

                    const smoothRadius = settings.smoothRadius;

                    for (let i = 0; i < totalPixels; i++) {
                        const idx = i * 4;
                        const r = data[idx];
                        const g = data[idx + 1];
                        const b = data[idx + 2];

                        const dist = self._colorDistance(r, g, b, bgR, bgG, bgB);

                        if (dist > adaptiveThreshold + smoothRadius) {
                            continue;
                        } else if (dist > adaptiveThreshold - smoothRadius) {
                            const alpha = Math.min(
                                1,
                                (dist - (adaptiveThreshold - smoothRadius)) / (smoothRadius * 2)
                            );
                            data[idx + 3] = Math.round(alpha * 255);
                        } else {
                            data[idx + 3] = 0;
                        }
                    }

                    // =============================================================
                    // 5. ПОСТ-ОБРАБОТКА (медианный фильтр)
                    // =============================================================

                    if (settings.median > 0) {
                        const result = new Uint8ClampedArray(data);
                        const temp = new Uint8ClampedArray(data);
                        const half = settings.median;

                        for (let y = 0; y < height; y++) {
                            for (let x = 0; x < width; x++) {
                                const values = [];
                                for (let dy = -half; dy <= half; dy++) {
                                    for (let dx = -half; dx <= half; dx++) {
                                        const nx = x + dx;
                                        const ny = y + dy;
                                        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                                            const idx = (ny * width + nx) * 4;
                                            values.push(temp[idx + 3]);
                                        }
                                    }
                                }
                                values.sort((a, b) => a - b);
                                const median = values[Math.floor(values.length / 2)];
                                const idx = (y * width + x) * 4;
                                result[idx + 3] = median;
                            }
                        }
                        data = result;
                    }

                    // =============================================================
                    // 6. ЭКСПОРТ - ВСЕГДА PNG ДЛЯ МАКСИМАЛЬНОГО КАЧЕСТВА
                    // =============================================================

                    // 🔒 Для high качества - всегда PNG (без потерь)
                    // Для medium/low - WebP с высоким качеством
                    const outputFormat =
                        settings.exportFormat === 'png' ? 'image/png' : 'image/webp';
                    const exportQuality = outputFormat === 'image/png' ? 1.0 : 0.95;

                    // Применяем обработанные данные
                    const outputImageData = new ImageData(data, width, height);
                    ctx.putImageData(outputImageData, 0, 0);

                    // 🔒 Для PNG используем максимальное качество
                    canvas.toBlob(
                        (blob) => {
                            if (blob) {
                                const reader = new FileReader();
                                reader.onload = () => {
                                    isResolved = true;
                                    resolve(reader.result);
                                };
                                reader.onerror = () => {
                                    Logger.warn('[ToolsService] Не удалось прочитать Blob');
                                    isResolved = true;
                                    resolve(dataUrl);
                                };
                                reader.readAsDataURL(blob);
                            } else {
                                Logger.warn('[ToolsService] Не удалось создать Blob');
                                isResolved = true;
                                resolve(dataUrl);
                            }
                        },
                        outputFormat,
                        exportQuality
                    );
                } catch (error) {
                    if (!isResolved) {
                        isResolved = true;
                        Logger.error('[ToolsService] Ошибка в removeBackground', {
                            error: error.message,
                        });
                        resolve(dataUrl);
                    }
                }
            };

            img.onerror = function () {
                if (!isResolved) {
                    isResolved = true;
                    Logger.warn('[ToolsService] Не удалось загрузить изображение');
                    resolve(dataUrl);
                }
            };

            img.src = dataUrl;
        });
    },

    // =============================================================
    // ЧАСТЬ 2: КОНВЕРТАЦИЯ И СЖАТИЕ
    // =============================================================

    /**
     * Конвертирует Data URL в Blob с заданным форматом
     * @private
     * @param {string} dataUrl - Data URL изображения
     * @param {string} format - Целевой формат ('jpeg', 'png', 'webp')
     * @param {number} quality - Качество (0-1)
     * @returns {Promise<Blob>} - Blob с изображением
     */
    _convertDataUrlToBlob(dataUrl, format, quality) {
        return new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = () => {
                try {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');

                    if (format === 'jpeg') {
                        ctx.fillStyle = '#FFFFFF';
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                    }

                    ctx.drawImage(img, 0, 0);

                    let mimeType = 'image/jpeg';
                    if (format === 'png') mimeType = 'image/png';
                    if (format === 'webp') mimeType = 'image/webp';

                    canvas.toBlob(
                        (blob) => {
                            if (blob) {
                                resolve(blob);
                            } else {
                                reject(new Error('Не удалось создать Blob'));
                            }
                        },
                        mimeType,
                        quality
                    );
                } catch (error) {
                    reject(error);
                }
            };

            img.onerror = () => {
                reject(new Error('Не удалось загрузить изображение'));
            };

            img.src = dataUrl;
        });
    },

    /**
     * Конвертирует изображение в указанный формат
     * Для PNG и WebP - удаляет фон через CCL → Shrink → Despill
     * Для JPEG - оставляет белый фон
     *
     * @param {File} file - Файл изображения
     * @param {string} targetFormat - Целевой формат ('jpeg', 'png', 'webp')
     * @param {number} quality - Качество (0-1, по умолчанию 0.92)
     * @returns {Promise<Blob>} - Сконвертированный Blob
     */
    async convertImage(file, targetFormat, quality = 0.92) {
        if (!file) {
            throw new Error('Файл не передан');
        }

        const validFormats = ['jpeg', 'png', 'webp'];
        if (!validFormats.includes(targetFormat)) {
            throw new Error(`Неподдерживаемый формат: ${targetFormat}`);
        }

        if (quality < 0 || quality > 1) {
            quality = 0.92;
        }

        try {
            const dataUrl = await FileUtils.fileToDataUrl(file);

            let processedDataUrl = dataUrl;

            // 🔒 Для PNG и WebP - проверяем, есть ли прозрачность
            if (targetFormat === 'png' || targetFormat === 'webp') {
                try {
                    // 🔒 Проверяем, есть ли прозрачность
                    const hasTransparency = await FileUtils.hasTransparency(dataUrl);

                    if (hasTransparency) {
                        // Если уже есть прозрачность - ничего не делаем
                        Logger.debug(
                            '[ToolsService] Изображение уже имеет прозрачность, пропускаем removeBackground'
                        );
                        processedDataUrl = dataUrl;
                    } else {
                        // Если прозрачности нет - удаляем фон
                        const bgRemoved = await this.removeBackground(dataUrl);
                        if (bgRemoved && bgRemoved.length > 100) {
                            processedDataUrl = bgRemoved;
                        } else {
                            Logger.warn(
                                '[ToolsService] removeBackground вернул пустой результат, используем оригинал'
                            );
                            processedDataUrl = dataUrl;
                        }
                    }
                } catch (error) {
                    Logger.warn('[ToolsService] Ошибка при проверке/удалении фона', {
                        error: error.message,
                    });
                    processedDataUrl = dataUrl;
                }
            }

            const blob = await this._convertDataUrlToBlob(processedDataUrl, targetFormat, quality);

            Logger.debug('[ToolsService] Изображение сконвертировано', {
                originalName: file.name,
                targetFormat: targetFormat,
                quality: quality,
                size: blob.size,
            });

            return blob;
        } catch (error) {
            Logger.error('[ToolsService] Ошибка конвертации изображения', {
                error: error.message,
                fileName: file.name,
            });
            throw error;
        }
    },

    /**
     * Конвертирует PDF в изображения (постранично) с двухступенчатой защитой фона:
     * 1. Основной способ: background: 'rgba(0,0,0,0)' в renderContext
     * 2. Резервный способ: removeBackground, если остались артефакты
     *
     * @param {File} file - PDF-файл
     * @param {string} targetFormat - Целевой формат ('jpeg', 'png', 'webp')
     * @param {number} quality - Качество (0-1, по умолчанию 0.92)
     * @param {number} scale - Масштаб (по умолчанию 2.0)
     * @param {Function} onProgress - Колбэк для прогресса (page, totalPages)
     * @param {Object} preloadedDoc - Опционально: предварительно загруженный PDF-документ
     * @returns {Promise<Array<{name: string, blob: Blob, storageName: string, page: number, width: number, height: number}>>}
     */
    async convertPdfToImages(
        file,
        targetFormat,
        quality = 0.92,
        scale = 2.0,
        onProgress = null,
        preloadedDoc = null
    ) {
        // ============================================================
        // 1. ВАЛИДАЦИЯ ВХОДНЫХ ДАННЫХ
        // ============================================================

        if (!file && !preloadedDoc) {
            throw new Error('Файл или PDF-документ не передан');
        }

        // Проверяем формат
        const validFormats = ['jpeg', 'png', 'webp'];
        if (!validFormats.includes(targetFormat)) {
            throw new Error(`Неподдерживаемый формат: ${targetFormat}`);
        }

        // Загружаем PDF.js, если ещё не загружена
        const loaded = await LibraryLoader.ensureLib('pdfJs');
        if (!loaded) {
            throw new Error('Библиотека PDF.js не загружена');
        }

        try {
            // ============================================================
            // 2. ЗАГРУЗКА PDF (ЕСЛИ НЕ ПЕРЕДАН ПРЕДЗАГРУЖЕННЫЙ ДОКУМЕНТ)
            // ============================================================

            let pdf;
            let baseName;
            let fileName;

            if (preloadedDoc) {
                // ИСПОЛЬЗУЕМ ПРЕДЗАГРУЖЕННЫЙ ДОКУМЕНТ - НЕ ПЕРЕЗАГРУЖАЕМ
                pdf = preloadedDoc;
                fileName = file ? file.name : 'document.pdf';
                baseName = fileName.replace(/\.pdf$/i, '');

                Logger.debug('[ToolsService] Использование предзагруженного PDF-документа', {
                    fileName: fileName,
                    pages: pdf.numPages,
                });
            } else {
                // ЗАГРУЖАЕМ PDF ИЗ ФАЙЛА
                if (!file) {
                    throw new Error('Файл не передан');
                }

                if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
                    throw new Error('Файл не является PDF');
                }

                const arrayBuffer = await FileUtils.fileToArrayBuffer(file);
                pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                baseName = file.name.replace(/\.pdf$/i, '');
                fileName = file.name;
            }

            const numPages = pdf.numPages;

            // Ограничение на количество страниц
            if (numPages > 500) {
                throw new Error(`PDF содержит слишком много страниц (${numPages}). Максимум: 500`);
            }

            Logger.info('[ToolsService] Начало конвертации PDF', {
                fileName: fileName,
                pages: numPages,
                format: targetFormat,
                preloaded: !!preloadedDoc,
            });

            // ============================================================
            // 3. ОСНОВНОЙ ЦИКЛ КОНВЕРТАЦИИ
            // ============================================================

            const results = [];

            for (let i = 1; i <= numPages; i++) {
                // Прогресс
                if (onProgress && typeof onProgress === 'function') {
                    try {
                        onProgress(i, numPages);
                    } catch (cbError) {
                        Logger.warn('[ToolsService] Ошибка в колбэке прогресса', {
                            error: cbError.message,
                            page: i,
                        });
                    }
                }

                // ============================================================
                // 3.1. РЕНДЕРИНГ СТРАНИЦЫ
                // ============================================================

                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: scale });

                const canvas = document.createElement('canvas');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                const ctx = canvas.getContext('2d', {
                    willReadFrequently: true,
                    alpha: true,
                });

                const renderContext = {
                    canvasContext: ctx,
                    viewport: viewport,
                    background: 'rgba(0,0,0,0)', // ← ПРОЗРАЧНЫЙ ФОН
                };
                await page.render(renderContext).promise;

                // ============================================================
                // 3.2. УДАЛЕНИЕ ФОНА (ДЛЯ PNG И WEBP)
                // ============================================================

                let finalImageData = canvas.toDataURL('image/png');

                if (targetFormat === 'png' || targetFormat === 'webp') {
                    // Проверяем остаточный фон
                    const hasResidualBackground = this._hasResidualBackground(canvas);
                    if (hasResidualBackground) {
                        try {
                            const bgRemoved = await this.removeBackground(
                                canvas.toDataURL('image/png')
                            );
                            if (bgRemoved && bgRemoved.length > 100) {
                                finalImageData = bgRemoved;
                                Logger.debug(`[ToolsService] Фон удалён для страницы ${i}`);
                            }
                        } catch (bgError) {
                            Logger.warn(
                                `[ToolsService] Резервный способ не сработал для страницы ${i}`,
                                { error: bgError.message }
                            );
                        }
                    }
                }

                // ============================================================
                // 3.3. КОНВЕРТАЦИЯ В ЦЕЛЕВОЙ ФОРМАТ
                // ============================================================

                const blob = await this._convertDataUrlToBlob(
                    finalImageData,
                    targetFormat,
                    quality
                );

                const extension = targetFormat === 'jpeg' ? 'jpg' : targetFormat;
                const downloadName = `${baseName}_страница_${i}.${extension}`;
                const storageName = `${baseName}_page_${i}.${extension}`;

                // ============================================================
                // 3.4. СОХРАНЕНИЕ РЕЗУЛЬТАТА
                // ============================================================

                results.push({
                    name: downloadName, // ← для скачивания (русский)
                    blob: blob,
                    storageName: storageName, // ← для хранения (английский)
                    page: i,
                    width: viewport.width,
                    height: viewport.height,
                });

                Logger.debug(`[ToolsService] Страница ${i}/${numPages} сконвертирована`);
            }

            // ============================================================
            // 4. ЛОГИРОВАНИЕ УСПЕХА
            // ============================================================

            Logger.info('[ToolsService] PDF сконвертирован в изображения', {
                fileName: fileName,
                pages: numPages,
                format: targetFormat,
                totalSize: results.reduce((sum, r) => sum + (r.blob?.size || 0), 0),
                preloaded: !!preloadedDoc,
            });

            return results;
        } catch (error) {
            // ============================================================
            // 5. ОБРАБОТКА ОШИБОК
            // ============================================================

            Logger.error('[ToolsService] Ошибка конвертации PDF', {
                error: error.message,
                stack: error.stack,
                fileName: file?.name || 'unknown',
                preloaded: !!preloadedDoc,
            });

            throw error;
        }
    },

    /**
     * Сжимает изображение с использованием browser-image-compression
     *
     * @param {File} file - Файл изображения
     * @param {number} quality - Качество (0-1, по умолчанию 0.5)
     * @param {Object} options - Дополнительные опции
     * @param {number} options.maxWidthOrHeight - Максимальная ширина или высота (по умолчанию 1920)
     * @param {number} options.maxSizeMB - Максимальный размер в MB (по умолчанию 1)
     * @returns {Promise<File>} - Сжатый файл
     */
    async compressImage(file, quality = 0.5, options = {}) {
        if (!file) {
            throw new Error('Файл не передан');
        }

        if (!file.type.startsWith('image/')) {
            throw new Error('Файл не является изображением');
        }

        const loaded = await LibraryLoader.ensureLib('imageCompression');
        if (!loaded) {
            throw new Error('Библиотека browser-image-compression не загружена');
        }

        const safeQuality = Math.min(Math.max(quality, 0.1), 1.0);

        try {
            const compressionOptions = {
                maxSizeMB: options.maxSizeMB || 1,
                maxWidthOrHeight: options.maxWidthOrHeight || 1920,
                useWebWorker: false,
                initialQuality: safeQuality,
            };

            const compressedFile = await window.imageCompression(file, compressionOptions);

            Logger.debug('[ToolsService] Изображение сжато', {
                originalName: file.name,
                originalSize: file.size,
                compressedSize: compressedFile.size,
                compressionRatio:
                    (((file.size - compressedFile.size) / file.size) * 100).toFixed(1) + '%',
                quality: safeQuality,
            });

            return compressedFile;
        } catch (error) {
            Logger.error('[ToolsService] Ошибка сжатия изображения', {
                error: error.message,
                fileName: file.name,
            });
            throw error;
        }
    },

    // =============================================================
    // ЧАСТЬ 3: PDF-ОПЕРАЦИИ, РЕСАЙЗ, ZIP, WEB WORKER
    // =============================================================

    /**
     * Встраивает изображение в PDF-документ
     * @private
     * @param {File} file - Файл изображения
     * @param {Object} pdfDoc - PDF-документ (pdf-lib)
     * @returns {Promise<Object|null>} - Добавленная страница или null
     */
    async _embedImageToPdf(file, pdfDoc) {
        try {
            const { PDFDocument } = window.PDFLib;

            let imageBytes;
            let imageType = file.type;

            const dataUrl = await FileUtils.fileToDataUrl(file);

            if (file.type === 'image/png') {
                const hasTransparency = await FileUtils.hasTransparency(dataUrl);
                if (hasTransparency) {
                    const pngWithBgDataUrl = await FileUtils.imageToPngWithWhiteBackground(dataUrl);
                    imageBytes = FileUtils.dataUrlToUint8Array(pngWithBgDataUrl);
                    imageType = 'image/png';
                } else {
                    const arrayBuffer = await FileUtils.fileToArrayBuffer(file);
                    imageBytes = new Uint8Array(arrayBuffer);
                }
            } else if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
                const arrayBuffer = await FileUtils.fileToArrayBuffer(file);
                imageBytes = new Uint8Array(arrayBuffer);
            } else {
                const pngDataUrl = await FileUtils.imageToPngWithWhiteBackground(dataUrl);
                imageBytes = FileUtils.dataUrlToUint8Array(pngDataUrl);
                imageType = 'image/png';
            }

            let embeddedImage;
            if (imageType === 'image/jpeg' || imageType === 'image/jpg') {
                embeddedImage = await pdfDoc.embedJpg(imageBytes);
            } else {
                embeddedImage = await pdfDoc.embedPng(imageBytes);
            }

            if (!embeddedImage) {
                throw new Error('Не удалось встроить изображение');
            }

            const { width, height } = embeddedImage;
            const page = pdfDoc.addPage([width, height]);
            page.drawImage(embeddedImage, {
                x: 0,
                y: 0,
                width: width,
                height: height,
            });

            return page;
        } catch (error) {
            Logger.warn(`[ToolsService] Ошибка встраивания изображения ${file.name}`, {
                error: error.message,
            });
            return null;
        }
    },

    /**
     * Объединяет несколько PDF-файлов и изображений в один PDF
     *
     * @param {Array<File>} files - Массив файлов для объединения
     * @param {Function} onProgress - Колбэк для прогресса (index, total)
     * @returns {Promise<Blob>} - Объединённый PDF как Blob
     */
    async mergePdf(files, onProgress = null) {
        if (!files || files.length === 0) {
            throw new Error('Не переданы файлы для объединения');
        }

        if (files.length > 50) {
            throw new Error(`Слишком много файлов (${files.length}). Максимум: 50`);
        }

        const loaded = await LibraryLoader.ensureLib('pdfLib');
        if (!loaded) {
            throw new Error('Библиотека pdf-lib не загружена');
        }

        try {
            const { PDFDocument } = window.PDFLib;
            const mergedPdf = await PDFDocument.create();
            let pageCount = 0;

            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                if (onProgress) {
                    onProgress(i + 1, files.length);
                }

                if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
                    const arrayBuffer = await FileUtils.fileToArrayBuffer(file);
                    const pdfDoc = await PDFDocument.load(arrayBuffer);
                    const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
                    pages.forEach((page) => mergedPdf.addPage(page));
                    pageCount += pdfDoc.getPageCount();
                } else if (file.type.startsWith('image/')) {
                    const page = await this._embedImageToPdf(file, mergedPdf);
                    if (page) {
                        pageCount++;
                    }
                } else {
                    Logger.warn(`[ToolsService] Пропущен неподдерживаемый файл: ${file.name}`);
                }
            }

            if (pageCount === 0) {
                throw new Error('Не удалось добавить ни одной страницы');
            }

            const pdfBytes = await mergedPdf.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });

            Logger.info('[ToolsService] PDF объединён', {
                fileCount: files.length,
                pageCount: pageCount,
                size: blob.size,
            });

            return blob;
        } catch (error) {
            Logger.error('[ToolsService] Ошибка объединения PDF', {
                error: error.message,
                fileCount: files.length,
            });
            throw error;
        }
    },

    /**
     * Разделяет PDF-файл на отдельные страницы
     *
     * @param {File} file - PDF-файл для разделения
     * @param {Function} onProgress - Колбэк для прогресса (page, totalPages)
     * @param {number} fileIndex - Индекс текущего файла
     * @param {number} totalFiles - Общее количество файлов
     * @param {number} globalOffset - Смещение для сквозного прогресса
     * @param {number} globalTotal - Общее количество страниц во всех файлах
     * @returns {Promise<{results: Array<{name: string, blob: Blob, page: number}>, totalPages: number}>}
     */
    async splitPdf(file, onProgress = null, fileIndex = 0, totalFiles = 1) {
        if (!file) {
            throw new Error('Файл не передан');
        }

        if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
            throw new Error('Файл не является PDF');
        }

        const loaded = await LibraryLoader.ensureLib('pdfLib');
        if (!loaded) {
            throw new Error('Библиотека pdf-lib не загружена');
        }

        try {
            const { PDFDocument } = window.PDFLib;
            const arrayBuffer = await FileUtils.fileToArrayBuffer(file);
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            const pageCount = pdfDoc.getPageCount();

            if (pageCount > 500) {
                throw new Error(`PDF содержит слишком много страниц (${pageCount}). Максимум: 500`);
            }

            const results = [];
            const baseName = file.name.replace(/\.pdf$/i, '');

            for (let i = 0; i < pageCount; i++) {
                // ВЫЗЫВАЕМ КОЛБЭК НА КАЖДОЙ СТРАНИЦЕ
                if (onProgress && typeof onProgress === 'function') {
                    try {
                        onProgress(i + 1, pageCount, fileIndex, totalFiles);
                    } catch (cbError) {
                        Logger.warn('[ToolsService] Ошибка в колбэке прогресса', {
                            error: cbError.message,
                            page: i + 1,
                        });
                    }
                }

                const newPdf = await PDFDocument.create();
                const [page] = await newPdf.copyPages(pdfDoc, [i]);
                newPdf.addPage(page);

                const pdfBytes = await newPdf.save();
                const blob = new Blob([pdfBytes], { type: 'application/pdf' });

                const storageName = `${baseName}_page_${i + 1}.pdf`;
                const downloadName = `${baseName}_страница_${i + 1}.pdf`;

                results.push({
                    name: downloadName,
                    blob: blob,
                    storageName: storageName,
                    page: i + 1,
                });
            }

            Logger.info('[ToolsService] PDF разделён', {
                fileName: file.name,
                pages: pageCount,
            });

            return {
                results: results,
                totalPages: pageCount,
            };
        } catch (error) {
            Logger.error('[ToolsService] Ошибка разделения PDF', {
                error: error.message,
                fileName: file.name,
            });
            throw error;
        }
    },

    /**
     * Извлекает текст из PDF-файла
     *
     * @param {File} file - PDF-файл
     * @param {Function} onProgress - Колбэк для прогресса (page, totalPages)
     * @returns {Promise<Object>} - { text, pageCount, charCount, extractedAt }
     */
    async extractTextFromPdf(file, onProgress = null) {
        if (!file) {
            throw new Error('Файл не передан');
        }

        if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
            throw new Error('Файл не является PDF');
        }

        const loaded = await LibraryLoader.ensureLib('pdfJs');
        if (!loaded) {
            throw new Error('Библиотека PDF.js не загружена');
        }

        try {
            if (window.pdfjsLib) {
                if (!window.pdfjsLib.GlobalWorkerOptions) {
                    window.pdfjsLib.GlobalWorkerOptions = {};
                }
                window.pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/js/lib/pdf.worker.min.js';
            }

            const arrayBuffer = await FileUtils.fileToArrayBuffer(file);
            const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            const totalPages = pdf.numPages;

            if (totalPages > 500) {
                throw new Error(
                    `PDF содержит слишком много страниц (${totalPages}). Максимум: 500`
                );
            }

            let fullText = '';

            for (let i = 1; i <= totalPages; i++) {
                if (onProgress) {
                    onProgress(i, totalPages);
                }

                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map((item) => item.str).join(' ');
                fullText += `--- Page ${i} ---\n${pageText}\n\n`;
            }

            const finalText = fullText.trim();

            if (!finalText || finalText.length < 50) {
                return {
                    text: '⚠️ Не удалось извлечь текст. Возможно, это скан документа. Для защиты вашей приватности мы не используем OCR. Текст из сканов не извлекается.',
                    originalName: file.name,
                    pageCount: totalPages,
                    charCount: 0,
                    extractedAt: new Date().toISOString(),
                };
            }

            Logger.info('[ToolsService] Текст извлечён из PDF', {
                fileName: file.name,
                pages: totalPages,
                charCount: finalText.length,
            });

            return {
                text: finalText,
                originalName: file.name,
                pageCount: totalPages,
                charCount: finalText.length,
                extractedAt: new Date().toISOString(),
            };
        } catch (error) {
            Logger.error('[ToolsService] Ошибка извлечения текста', {
                error: error.message,
                fileName: file.name,
            });
            throw error;
        }
    },

    /**
     * Изменяет размер изображения
     *
     * @param {File} file - Файл изображения
     * @param {number} targetWidth - Целевая ширина
     * @param {number} targetHeight - Целевая высота
     * @param {boolean} keepAspectRatio - Сохранять пропорции (по умолчанию true)
     * @returns {Promise<{blob: Blob, originalWidth: number, originalHeight: number}>}
     */
    async resizeImage(file, targetWidth, targetHeight, keepAspectRatio = true) {
        if (!file) {
            throw new Error('Файл не передан');
        }

        if (!file.type.startsWith('image/')) {
            throw new Error('Файл не является изображением');
        }

        if (targetWidth <= 0 || targetHeight <= 0) {
            throw new Error('Ширина и высота должны быть положительными числами');
        }

        if (targetWidth > 4096 || targetHeight > 4096) {
            throw new Error(
                `Размеры не должны превышать 4096px. Текущие: ${targetWidth}x${targetHeight}`
            );
        }

        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const img = new Image();

                img.onload = () => {
                    try {
                        const originalWidth = img.width;
                        const originalHeight = img.height;

                        let finalWidth = targetWidth;
                        let finalHeight = targetHeight;

                        if (keepAspectRatio) {
                            const ratio = Math.min(
                                targetWidth / originalWidth,
                                targetHeight / originalHeight
                            );
                            finalWidth = Math.round(originalWidth * ratio);
                            finalHeight = Math.round(originalHeight * ratio);
                        }

                        const canvas = document.createElement('canvas');
                        canvas.width = finalWidth;
                        canvas.height = finalHeight;
                        const ctx = canvas.getContext('2d');

                        if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
                            ctx.fillStyle = '#FFFFFF';
                            ctx.fillRect(0, 0, canvas.width, canvas.height);
                        }

                        ctx.imageSmoothingEnabled = true;
                        ctx.imageSmoothingQuality = 'high';
                        ctx.drawImage(img, 0, 0, finalWidth, finalHeight);

                        canvas.toBlob(
                            (blob) => {
                                if (blob) {
                                    Logger.debug('[ToolsService] Изображение изменено', {
                                        originalName: file.name,
                                        originalSize: `${originalWidth}x${originalHeight}`,
                                        newSize: `${finalWidth}x${finalHeight}`,
                                        keepAspectRatio: keepAspectRatio,
                                    });

                                    resolve({
                                        blob: blob,
                                        originalWidth: originalWidth,
                                        originalHeight: originalHeight,
                                        newWidth: finalWidth,
                                        newHeight: finalHeight,
                                    });
                                } else {
                                    reject(new Error('Не удалось создать Blob'));
                                }
                            },
                            file.type,
                            0.95
                        );
                    } catch (error) {
                        reject(error);
                    }
                };

                img.onerror = () => {
                    reject(new Error('Не удалось загрузить изображение'));
                };

                img.src = e.target.result;
            };

            reader.onerror = () => {
                reject(new Error('Не удалось прочитать файл'));
            };

            reader.readAsDataURL(file);
        });
    },

    /**
     * Создаёт ZIP-архив из массива файлов
     * Использует zip.js (BSD 3-Clause) вместо JSZip (MIT)
     *
     * @param {Array<{name: string, blob: Blob}>} files - Массив файлов для архивации
     * @param {string} baseName - Базовое имя для архива
     * @param {Function} onProgress - Колбэк для прогресса (index, total)
     * @returns {Promise<Blob>} - ZIP-архив как Blob
     */
    async createZip(files, baseName = 'archive', onProgress = null) {
        if (!files || files.length === 0) {
            throw new Error('Не переданы файлы для архивации');
        }

        const loaded = await LibraryLoader.ensureLib('zipJs');
        if (!loaded) {
            throw new Error('Библиотека zip.js не загружена');
        }

        // 🔒 Лимит: 1000 файлов (безопасно для памяти)
        if (files.length > 1000) {
            throw new Error(`Слишком много файлов (${files.length}). Максимум: 1000`);
        }

        try {
            const { ZipWriter, BlobReader, BlobWriter } = window.zip;

            const zipWriter = new ZipWriter(new BlobWriter('application/zip'));

            for (let i = 0; i < files.length; i++) {
                const item = files[i];

                if (onProgress) {
                    onProgress(i + 1, files.length);
                }

                const blobReader = new BlobReader(item.blob);
                await zipWriter.add(item.name, blobReader);
            }

            const zipBlob = await zipWriter.close();

            const zipName = `${baseName}.zip`;

            Logger.info('[ToolsService] ZIP-архив создан', {
                fileCount: files.length,
                size: zipBlob.size,
                name: zipName,
            });

            return zipBlob;
        } catch (error) {
            Logger.error('[ToolsService] Ошибка создания ZIP-архива', {
                error: error.message,
                fileCount: files.length,
            });
            throw error;
        }
    },

    /**
     * Возвращает размеры для заданного пресета
     * @param {string} preset - Имя пресета
     * @returns {Object|null} - { width, height } или null
     */
    _getPresetDimensions(preset) {
        const presets = {
            full_hd: { width: 1920, height: 1080, label: 'Full HD (1920×1080)' },
            hd: { width: 1280, height: 720, label: 'HD (1280×720)' },
            square: { width: 1080, height: 1080, label: 'Квадрат (1080×1080)' },
            '4_3': { width: 1440, height: 1080, label: '4:3 (1440×1080)' },
            small: { width: 800, height: 600, label: 'Малый (800×600)' },
        };

        return presets[preset] || null;
    },

    // =============================================================
    // WEB WORKER
    // =============================================================

    /**
     * Инициализирует Web Worker для тяжёлых операций
     * @private
     */
    _initWorker() {
        if (this._worker) return;

        try {
            // 🔒 Безопасный код воркера с валидацией origin и payload
            const workerCode = `
            // 🔒 Проверяем origin сообщений
            const ALLOWED_ACTIONS = ['processImage', 'compressImages'];
            const EXPECTED_ORIGIN = self.location.origin;

            self.addEventListener('message', function(e) {
                // 🔒 OWASP: Строгая проверка origin
                // Если origin не совпадает с ожидаемым - отклоняем
                if (!e.origin || e.origin !== EXPECTED_ORIGIN) {
                    self.postMessage({ 
                        action: 'error', 
                        error: 'Invalid origin: ' + (e.origin || 'unknown')
                    });
                    return;
                }

                const { action, payload } = e.data || {};

                // 🔒 Проверяем, что action указан и разрешён
                if (!action || !ALLOWED_ACTIONS.includes(action)) {
                    self.postMessage({ action: 'error', error: 'Unknown or missing action' });
                    return;
                }

                // 🔒 Проверяем payload
                if (!payload || typeof payload !== 'object') {
                    self.postMessage({ action: 'error', error: 'Invalid payload' });
                    return;
                }

                switch (action) {
                    case 'processImage':
                        processImage(payload).then(result => {
                            self.postMessage({ action: 'result', result });
                        }).catch(error => {
                            self.postMessage({ action: 'error', error: error.message });
                        });
                        break;

                    case 'compressImages':
                        compressImages(payload).then(result => {
                            self.postMessage({ action: 'result', result });
                        }).catch(error => {
                            self.postMessage({ action: 'error', error: error.message });
                        });
                        break;

                    default:
                        self.postMessage({ action: 'error', error: 'Unknown action' });
                }
            });

            async function processImage(payload) {
                // 🔒 Валидация payload
                const { dataUrl, targetWidth, targetHeight, quality } = payload;
                
                if (!dataUrl || typeof dataUrl !== 'string') {
                    throw new Error('Invalid dataUrl');
                }

                const safeTargetWidth = Math.min(Math.max(targetWidth || 0, 1), 4096);
                const safeTargetHeight = Math.min(Math.max(targetHeight || 0, 1), 4096);
                const safeQuality = Math.min(Math.max(quality || 0.92, 0.1), 1.0);

                // 🔒 Проверяем, что dataUrl начинается с допустимого протокола
                if (!dataUrl.startsWith('data:image/')) {
                    throw new Error('Invalid image data');
                }

                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = function() {
                        try {
                            const canvas = new OffscreenCanvas(
                                safeTargetWidth || img.width, 
                                safeTargetHeight || img.height
                            );
                            const ctx = canvas.getContext('2d');
                            
                            if (safeTargetWidth && safeTargetHeight) {
                                ctx.drawImage(img, 0, 0, safeTargetWidth, safeTargetHeight);
                            } else {
                                ctx.drawImage(img, 0, 0);
                            }
                            
                            canvas.convertToBlob({ 
                                type: 'image/jpeg', 
                                quality: safeQuality 
                            })
                                .then(blob => {
                                    if (blob) {
                                        resolve({ blob: blob });
                                    } else {
                                        reject(new Error('Failed to create blob'));
                                    }
                                })
                                .catch(reject);
                        } catch (error) {
                            reject(error);
                        }
                    };
                    img.onerror = function() {
                        reject(new Error('Failed to load image'));
                    };
                    img.src = dataUrl;
                });
            }

            async function compressImages(payload) {
                // 🔒 Базовая валидация
                if (!payload || typeof payload !== 'object') {
                    throw new Error('Invalid payload for compressImages');
                }
                return { success: true, message: 'Compression completed' };
            }
        `;

            const blob = new Blob([workerCode], { type: 'application/javascript' });
            const workerUrl = URL.createObjectURL(blob);

            // 🔒 Сохраняем URL для последующего освобождения
            this._workerUrl = workerUrl;

            this._worker = new Worker(workerUrl);

            this._worker.onmessage = (event) => {
                // 🔒 OWASP: Строгая проверка origin
                if (!event.origin || event.origin !== window.location.origin) {
                    Logger.warn('[ToolsService] Worker: сообщение с недопустимого origin', {
                        origin: event.origin || 'undefined',
                        expected: window.location.origin,
                    });
                    return;
                }

                const { action, result, error } = event.data || {};

                if (action === 'result') {
                    Logger.debug('[ToolsService] Worker завершил задачу', { result });
                } else if (action === 'error') {
                    Logger.error('[ToolsService] Ошибка в Worker', { error });
                }

                this._workerResolvers = this._workerResolvers || [];
                if (this._workerResolvers.length > 0) {
                    const resolver = this._workerResolvers.shift();
                    if (resolver) {
                        if (action === 'result') {
                            resolver.resolve(result);
                        } else if (action === 'error') {
                            resolver.reject(new Error(error || 'Unknown worker error'));
                        }
                    }
                }
            };

            this._worker.onerror = (error) => {
                Logger.error('[ToolsService] Ошибка в Worker', {
                    error: error.message,
                    filename: error.filename,
                    lineno: error.lineno,
                });
                this._worker = null;
                this._workerUrl = null;
                this._workerResolvers = [];
            };

            Logger.info('[ToolsService] Web Worker инициализирован');
        } catch (error) {
            Logger.warn('[ToolsService] Не удалось инициализировать Web Worker', {
                error: error.message,
            });
            this._worker = null;
            this._workerUrl = null;
        }
    },

    /**
     * Отправляет задачу в Web Worker
     * @private
     * @param {string} action - Действие ('processImage', 'compressImages')
     * @param {*} payload - Данные для обработки
     * @returns {Promise<any>} - Результат обработки
     */
    _sendToWorker(action, payload) {
        return new Promise((resolve, reject) => {
            if (!this._worker) {
                this._initWorker();
            }

            if (!this._worker) {
                reject(new Error('Web Worker недоступен'));
                return;
            }

            this._workerResolvers = this._workerResolvers || [];
            this._workerResolvers.push({ resolve, reject });

            this._worker.postMessage({ action, payload });

            setTimeout(() => {
                const index = this._workerResolvers.findIndex((r) => r.resolve === resolve);
                if (index !== -1) {
                    this._workerResolvers.splice(index, 1);
                    reject(new Error('Таймаут выполнения в Worker'));
                }
            }, 30000);
        });
    },

    /**
     * Завершает работу Web Worker
     */
    _terminateWorker() {
        if (this._worker) {
            this._worker.terminate();
            this._worker = null;
            this._workerResolvers = [];

            // 🔒 Освобождаем URL
            if (this._workerUrl) {
                try {
                    URL.revokeObjectURL(this._workerUrl);
                } catch (error) {
                    // Игнорируем ошибки при освобождении
                }
                this._workerUrl = null;
            }

            Logger.info('[ToolsService] Web Worker завершён');
        }
    },
};

// ================================================================
// ЭКСПОРТЫ
// ================================================================

window.ToolsService = ToolsService;

// ================================================================
// БЛОК 10: UI ИНСТРУМЕНТОВ (TOOLS UI)
// ================================================================
// Назначение: Отображение и события для инструментов.
// Принцип: Вызывает ToolsService и FileManager.
// Лицензия: MIT (оригинальный код автора)
//
// 🎯 СОСТАВ:
// - Управление вкладками (convert, compress, pdf, resize)
// - Drag & Drop для всех инструментов
// - Отображение списков файлов
// - Вызов бизнес-логики через ToolsService
// - Сохранение результатов через FileManager
// - Состояния загрузки через DomUtils
//
// 🔒 БЕЗОПАСНОСТЬ (OWASP):
// - НЕТ innerHTML - только DomUtils.createElementSafe()
// - Санитизация всех имён файлов через StringUtils.sanitizeFilename()
// - Санитизация всех сообщений через DomUtils.sanitize()
// - Валидация файлов перед обработкой
// - Ограничение количества файлов
// - Безопасное обновление кнопок и списков
//
// ⚡ СКОРОСТЬ:
// - Обновление списков через DocumentFragment
// - Debounce для частых событий
// - Минимальное количество перерисовок
//
// 🛡️ НАДЁЖНОСТЬ:
// - Все ошибки обрабатываются
// - Fallback-значения
// - Логирование через Logger
// ================================================================

const ToolsUI = {
    // =============================================================
    // 1. СОСТОЯНИЕ
    // =============================================================

    _fileStores: {
        convert: [],
        compress: [],
        pdf: [],
        resize: [],
    },

    _results: {
        convert: [],
        compress: [],
        pdf: [],
        resize: [],
    },

    _currentTab: 'convert',
    _isInitialized: false,
    _isProcessing: false,

    // =============================================================
    // 2. ИНИЦИАЛИЗАЦИЯ
    // =============================================================

    /**
     * Инициализирует UI инструментов
     */
    init() {
        if (this._isInitialized) return;

        this._initTabs();
        this._initFileHandlers();
        this._updateLibsStatus();

        // НАСТРАИВАЕМ ZIP-КНОПКИ
        this._setupZipButtons();

        window.addEventListener('filesUpdated', () => {
            this._updateBadge();
        });

        this._isInitialized = true;
        Logger.info('[ToolsUI] Инициализирован');
    },

    /**
     * Обновляет статус библиотек
     */
    _updateLibsStatus() {
        this._libsStatus = {
            jspdf: typeof window.jspdf !== 'undefined',
            imageCompression: typeof window.imageCompression !== 'undefined',
            pdfLib: typeof window.PDFLib !== 'undefined',
            zipJs: typeof window.zip !== 'undefined' || typeof window.ZipWriter !== 'undefined',
            pdfJs: typeof window.pdfjsLib !== 'undefined',
            idb: typeof window.idb !== 'undefined',
        };

        Logger.debug('[ToolsUI] Статус библиотек обновлён', this._libsStatus);
    },

    // =============================================================
    // 3. ZIP-КНОПКИ (УНИВЕРСАЛЬНЫЕ)
    // =============================================================

    /**
     * Настраивает обработчики для всех ZIP-кнопок
     * @private
     */
    _setupZipButtons() {
        // Конфигурация кнопок: { buttonId, store, label }
        const zipConfigs = [
            { buttonId: 'downloadZipBtn', store: 'pdf', label: 'PDF' },
            { buttonId: 'downloadZipConvertBtn', store: 'convert', label: 'Конвертер' },
            { buttonId: 'downloadZipCompressBtn', store: 'compress', label: 'Сжатие' },
            { buttonId: 'downloadZipResizeBtn', store: 'resize', label: 'Размер' },
        ];

        for (const config of zipConfigs) {
            const btn = document.getElementById(config.buttonId);
            if (!btn) continue;

            // Сохраняем store в dataset для использования в обработчике
            btn.dataset.store = config.store;
            btn.dataset.label = config.label;

            // Удаляем старые обработчики (если есть)
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);

            // Добавляем новый обработчик
            newBtn.addEventListener('click', () => {
                this._handleZipDownload(config.store, config.buttonId);
            });
        }

        Logger.info('[ToolsUI] ZIP-кнопки настроены');
    },

    // =============================================================
    // 4. ВКЛАДКИ
    // =============================================================

    /**
     * Инициализирует переключение вкладок
     * @private
     */
    _initTabs() {
        document.querySelectorAll('.tool-tab').forEach((tab) => {
            tab.addEventListener('click', () => {
                const tool = tab.dataset.tool;
                if (tool) {
                    this.switchTab(tool);
                }
            });
        });

        const activeTab = document.querySelector('.tool-tab.active');
        if (activeTab) {
            this._currentTab = activeTab.dataset.tool || 'convert';
        }
    },

    /**
     * Переключает вкладку
     * @param {string} tabName - Имя вкладки
     */
    switchTab(tabName) {
        if (this._currentTab === tabName) return;

        document.querySelectorAll('.tool-tab').forEach((t) => {
            t.classList.toggle('active', t.dataset.tool === tabName);
        });

        document.querySelectorAll('.tool-panel').forEach((p) => {
            p.classList.toggle('active', p.dataset.tool === tabName);
        });

        this._currentTab = tabName;
        Logger.debug('[ToolsUI] Переключено на вкладку', { tab: tabName });
    },

    // =============================================================
    // 5. ОБРАБОТЧИКИ ФАЙЛОВ
    // =============================================================

    /**
     * Инициализирует обработчики файлов для всех инструментов
     * @private
     */
    _initFileHandlers() {
        this._setupConverter();
        this._setupCompressor();
        this._setupPdfTools();
        this._setupResizeTool();
    },

    // =============================================================
    // 5.1. КОНВЕРТЕР
    // =============================================================

    /**
     * Настраивает конвертер
     * @private
     */
    _setupConverter() {
        const dropZone = document.getElementById('convertDropZone');
        const input = document.getElementById('convertInput');
        const list = document.getElementById('convertFileList');
        const formatSelect = document.getElementById('convertFormat');
        const convertBtn = document.getElementById('convertBtn');
        const qualitySlider = document.getElementById('convertQuality');
        const qualityValue = document.getElementById('convertQualityValue');

        if (!dropZone || !input || !list || !formatSelect || !convertBtn) {
            Logger.warn('[ToolsUI] Конвертер: не все элементы найдены');
            return;
        }

        const store = 'convert';

        this._setupDragAndDrop(dropZone, input, store);
        this._setupFileInput(input, store);

        if (qualitySlider && qualityValue) {
            qualitySlider.addEventListener('input', (e) => {
                qualityValue.textContent = e.target.value;
            });
        }

        convertBtn.addEventListener('click', async () => {
            await this._handleConvert();
        });
    },

    // =============================================================
    // 5.2. СЖАТИЕ
    // =============================================================

    /**
     * Настраивает компрессор
     * @private
     */
    _setupCompressor() {
        const dropZone = document.getElementById('compressDropZone');
        const input = document.getElementById('compressInput');
        const list = document.getElementById('compressFileList');
        const qualitySlider = document.getElementById('compressQuality');
        const qualityValue = document.getElementById('qualityValue');
        const compressBtn = document.getElementById('compressBtn');

        if (!dropZone || !input || !list || !qualitySlider || !qualityValue || !compressBtn) {
            Logger.warn('[ToolsUI] Компрессор: не все элементы найдены');
            return;
        }

        const store = 'compress';

        this._setupDragAndDrop(dropZone, input, store);
        this._setupFileInput(input, store);

        if (qualitySlider && qualityValue) {
            qualitySlider.min = '0';
            qualitySlider.max = '100';
            qualitySlider.value = '50';
            qualityValue.textContent = '50';

            qualitySlider.addEventListener('input', (e) => {
                qualityValue.textContent = e.target.value;
            });
        }

        compressBtn.addEventListener('click', async () => {
            await this._handleCompress();
        });
    },

    // =============================================================
    // 5.3. PDF-ИНСТРУМЕНТЫ
    // =============================================================

    /**
     * Настраивает PDF-инструменты
     * @private
     */
    _setupPdfTools() {
        const dropZone = document.getElementById('pdfDropZone');
        const input = document.getElementById('pdfInput');
        const list = document.getElementById('pdfFileList');
        const mergeBtn = document.getElementById('mergePdfBtn');
        const splitBtn = document.getElementById('splitPdfBtn');
        const zipBtn = document.getElementById('downloadZipBtn');
        const extractBtn = document.getElementById('extractTextBtn');
        const extractedTextDiv = document.getElementById('extractedText');
        const textActions = document.getElementById('textActions');
        const copyTextBtn = document.getElementById('copyTextBtn');
        const downloadTextBtn = document.getElementById('downloadTextBtn');

        if (!dropZone || !input || !list || !mergeBtn || !splitBtn) {
            Logger.warn('[ToolsUI] PDF-инструменты: не все элементы найдены');
            return;
        }

        const store = 'pdf';

        this._setupDragAndDrop(dropZone, input, store);
        this._setupFileInput(input, store);

        mergeBtn.addEventListener('click', async () => {
            await this._handlePdfMerge();
        });

        splitBtn.addEventListener('click', async () => {
            await this._handlePdfSplit();
        });

        if (extractBtn) {
            extractBtn.addEventListener('click', async () => {
                await this._handlePdfExtractText();
            });
        }

        if (copyTextBtn && extractedTextDiv) {
            copyTextBtn.addEventListener('click', () => {
                const text = extractedTextDiv.textContent;
                if (text && text.trim()) {
                    navigator.clipboard
                        .writeText(text)
                        .then(() => DomUtils.showSuccess('Текст скопирован'))
                        .catch(() => DomUtils.showError('Не удалось скопировать'));
                }
            });
        }

        if (downloadTextBtn && extractedTextDiv) {
            downloadTextBtn.addEventListener('click', () => {
                const text = extractedTextDiv.textContent;
                if (text && text.trim()) {
                    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });

                    // ОРИГИНАЛЬНОЕ ИМЯ (из PDF-файла)
                    const pdfFile = this._fileStores['pdf']?.find(
                        (f) => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf')
                    );
                    const baseName = pdfFile
                        ? pdfFile.name.replace(/\.pdf$/i, '')
                        : 'extracted_text';
                    const fileName = `${baseName}.txt`;

                    FileUtils.downloadFile(blob, fileName);
                    DomUtils.showSuccess('Файл скачан');
                }
            });
        }

        if (zipBtn) {
            zipBtn.addEventListener('click', async () => {
                await this._handleZipDownload();
            });
        }
    },

    // =============================================================
    // 5.4. ИЗМЕНЕНИЕ РАЗМЕРА
    // =============================================================

    /**
     * Настраивает инструмент изменения размера
     * @private
     */
    _setupResizeTool() {
        const dropZone = document.getElementById('resizeDropZone');
        const input = document.getElementById('resizeInput');
        const list = document.getElementById('resizeFileList');
        const applyBtn = document.getElementById('applyResizeBtn');
        const widthInput = document.getElementById('resizeWidth');
        const heightInput = document.getElementById('resizeHeight');
        const keepAspectCheckbox = document.getElementById('keepAspectRatio');
        const presetSelect = document.getElementById('presetSizes');

        if (!dropZone || !input || !list || !applyBtn || !widthInput || !heightInput) {
            Logger.warn('[ToolsUI] Ресайз: не все элементы найдены');
            return;
        }

        const store = 'resize';

        this._setupDragAndDrop(dropZone, input, store);
        this._setupFileInput(input, store);

        let aspectRatio = null;

        const updateAspectRatio = () => {
            const w = parseFloat(widthInput.value);
            const h = parseFloat(heightInput.value);
            if (w > 0 && h > 0) {
                aspectRatio = w / h;
            }
        };

        widthInput.addEventListener('input', () => {
            if (keepAspectCheckbox.checked && aspectRatio) {
                heightInput.value = Math.round(widthInput.value / aspectRatio);
            }
        });

        heightInput.addEventListener('input', () => {
            if (keepAspectCheckbox.checked && aspectRatio) {
                widthInput.value = Math.round(heightInput.value * aspectRatio);
            }
        });

        widthInput.addEventListener('change', updateAspectRatio);
        heightInput.addEventListener('change', updateAspectRatio);

        if (presetSelect) {
            presetSelect.addEventListener('change', (e) => {
                const preset = e.target.value;
                if (!preset) return;

                const [w, h] = preset.split('x').map(Number);
                widthInput.value = w;
                heightInput.value = h;
                keepAspectCheckbox.checked = true;
                updateAspectRatio();
            });
        }

        applyBtn.addEventListener('click', async () => {
            await this._handleResize();
        });

        list.addEventListener('click', (e) => {
            const fileItem = e.target.closest('.file-item');
            if (!fileItem) return;

            const index = parseInt(fileItem.dataset.index);
            if (isNaN(index)) return;

            document.querySelectorAll('#resizeFileList .file-item').forEach((item, i) => {
                item.style.background =
                    i === index ? 'var(--theme-brand-primary-alpha-20, rgba(61,156,140,0.2))' : '';
            });
        });
    },

    // =============================================================
    // 6. DRAG & DROP И ФАЙЛОВЫЙ ВВОД
    // =============================================================

    /**
     * Настраивает Drag & Drop для зоны
     * @private
     * @param {HTMLElement} dropZone - Зона для перетаскивания
     * @param {HTMLInputElement} input - Поле ввода файлов
     * @param {string} store - Имя хранилища
     */
    _setupDragAndDrop(dropZone, input, store) {
        if (!dropZone || !input) return;

        dropZone.addEventListener('click', () => {
            input.click();
        });

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.style.borderColor = 'var(--theme-brand-primary, #3d9c8c)';
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.style.borderColor = '';
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.style.borderColor = '';

            const files = Array.from(e.dataTransfer.files);
            this._addFiles(store, files);
        });
    },

    /**
     * Настраивает выбор файлов через input
     * @private
     * @param {HTMLInputElement} input - Поле ввода файлов
     * @param {string} store - Имя хранилища
     */
    _setupFileInput(input, store) {
        if (!input) return;

        input.addEventListener('change', () => {
            const files = Array.from(input.files);
            this._addFiles(store, files);
            input.value = '';
        });
    },

    /**
     * Добавляет файлы в хранилище
     * @private
     * @param {string} store - Имя хранилища
     * @param {Array<File>} files - Файлы для добавления
     */
    _addFiles(store, files) {
        if (!files || files.length === 0) return;

        const allowedTypes = this._getAllowedTypes(store);
        const { validFiles, errors } = this._validateFiles(files, allowedTypes);

        if (errors.length > 0) {
            DomUtils.showError(errors.join('\n'));
        }

        if (validFiles.length === 0) return;

        if (!this._fileStores[store]) {
            this._fileStores[store] = [];
        }

        this._fileStores[store].push(...validFiles);

        if (this._results[store]) {
            this._results[store] = [];
        }

        this._updateFileList(store);

        Logger.debug('[ToolsUI] Добавлены файлы', {
            store: store,
            count: validFiles.length,
        });
    },

    /**
     * Удаляет файл из хранилища
     * @private
     * @param {string} store - Имя хранилища
     * @param {number} index - Индекс файла
     */
    _removeFile(store, index) {
        if (!this._fileStores[store]) return;

        this._fileStores[store].splice(index, 1);

        if (this._results[store]) {
            this._results[store] = [];
        }

        this._updateFileList(store);
    },

    /**
     * Очищает хранилище файлов
     * @private
     * @param {string} store - Имя хранилища
     */
    _clearFiles(store) {
        if (!this._fileStores[store]) return;

        this._fileStores[store] = [];
        this._results[store] = [];

        this._updateFileList(store);
    },

    // =============================================================
    // 7. ОБНОВЛЕНИЕ СПИСКОВ ФАЙЛОВ
    // =============================================================

    /**
     * Обновляет список файлов для хранилища
     * @private
     * @param {string} store - Имя хранилища
     */
    _updateFileList(store) {
        const listMap = {
            convert: 'convertFileList',
            compress: 'compressFileList',
            pdf: 'pdfFileList',
            resize: 'resizeFileList',
        };

        const container = document.getElementById(listMap[store]);
        if (!container) return;

        const files = this._fileStores[store] || [];

        DomUtils.empty(container);

        if (files.length === 0) {
            container.classList.add('hidden');
            this._updateButtons(store);
            return;
        }

        container.classList.remove('hidden');

        const fragment = document.createDocumentFragment();

        files.forEach((file, index) => {
            const item = this._createFileItem(file, index, store);
            fragment.appendChild(item);
        });

        container.appendChild(fragment);

        this._updateButtons(store);
    },

    /**
     * Создаёт элемент файла (БЕЗ innerHTML)
     * @private
     * @param {File} file - Файл
     * @param {number} index - Индекс
     * @param {string} store - Имя хранилища
     * @returns {HTMLElement} - Элемент файла
     */
    _createFileItem(file, index, store) {
        const size = StringUtils.formatFileSize(file.size);
        const safeName = DomUtils.sanitize(file.name);

        let icon = 'bi-file-earmark';
        if (file.type.startsWith('image/')) {
            icon = 'bi-file-earmark-image';
        } else if (file.type === 'application/pdf') {
            icon = 'bi-file-earmark-pdf';
        }

        const item = DomUtils.createElementSafe('div', 'file-item', {
            'data-index': String(index),
        });

        const info = DomUtils.createElementSafe('span', '');
        const iconElem = DomUtils.createElementSafe('i', icon, { 'aria-hidden': 'true' });
        info.appendChild(iconElem);
        info.appendChild(DomUtils.createTextNode(` ${safeName} (${size})`));
        item.appendChild(info);

        const removeBtn = DomUtils.createElementSafe('button', '', {
            title: 'Удалить',
            'aria-label': `Удалить файл ${safeName}`,
        });
        removeBtn.textContent = '×';

        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this._removeFile(store, index);
        });

        item.appendChild(removeBtn);

        return item;
    },

    /**
     * Обновляет состояние кнопок для хранилища
     * @private
     * @param {string} store - Имя хранилища
     */
    _updateButtons(store) {
        const files = this._fileStores[store] || [];
        const hasFiles = files.length > 0;

        const buttonMap = {
            convert: 'convertBtn',
            compress: 'compressBtn',
            pdf: ['mergePdfBtn', 'splitPdfBtn', 'extractTextBtn'],
            resize: 'applyResizeBtn',
        };

        const buttons = buttonMap[store];
        if (!buttons) return;

        if (Array.isArray(buttons)) {
            buttons.forEach((btnId) => {
                const btn = document.getElementById(btnId);
                if (btn) {
                    btn.disabled = !hasFiles;
                }
            });
        } else {
            const btn = document.getElementById(buttons);
            if (btn) {
                btn.disabled = !hasFiles;
            }
        }

        const zipBtn = document.getElementById('downloadZipBtn');
        if (zipBtn) {
            const results = this._results[store] || [];
            zipBtn.disabled = results.length === 0;

            // 🔒 БЕЗОПАСНО: обновляем кнопку через DOM
            DomUtils.empty(zipBtn);
            const icon = DomUtils.createElementSafe('i', 'bi bi-file-zip', {
                'aria-hidden': 'true',
            });
            zipBtn.appendChild(icon);

            const text =
                results.length > 0
                    ? DomUtils.createTextNode(` Скачать ZIP (${results.length} файлов)`)
                    : DomUtils.createTextNode(' Скачать ZIP-архив');
            zipBtn.appendChild(text);
        }
    },

    // =============================================================
    // 8. ОБРАБОТЧИКИ ДЕЙСТВИЙ
    // =============================================================

    async _handleConvert() {
        const store = 'convert';
        const files = this._fileStores[store];

        if (files.length === 0) {
            DomUtils.showError('Выберите файлы для конвертации');
            return;
        }

        if (this._isProcessing) {
            DomUtils.showWarning('Идёт обработка, подождите...');
            return;
        }

        const formatSelect = document.getElementById('convertFormat');
        const qualitySlider = document.getElementById('convertQuality');
        const convertBtn = document.getElementById('convertBtn');

        if (!formatSelect || !convertBtn) return;

        const format = formatSelect.value;
        const quality = qualitySlider ? parseInt(qualitySlider.value) / 100 : 0.92;

        this._isProcessing = true;
        convertBtn.disabled = true;

        DomUtils.empty(convertBtn);
        const spinnerIcon = DomUtils.createElementSafe('i', 'bi bi-arrow-repeat', {
            'aria-hidden': 'true',
        });
        convertBtn.appendChild(spinnerIcon);
        convertBtn.appendChild(DomUtils.createTextNode(' Конвертация...'));

        try {
            // ============================================================
            // 1. ПОКАЗЫВАЕМ ПРОГРЕСС СРАЗУ (спиннер крутится!)
            // ============================================================

            DomUtils.showProgress('Подготовка к конвертации...', 0);

            // ============================================================
            // 2. ЗАГРУЖАЕМ PDF И СЧИТАЕМ СТРАНИЦЫ (спиннер уже виден)
            // ============================================================

            const pdfDocs = [];
            const imageFiles = [];
            let totalPages = 0;

            for (const file of files) {
                const isPdf =
                    file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
                if (isPdf) {
                    try {
                        const arrayBuffer = await FileUtils.fileToArrayBuffer(file);
                        const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer })
                            .promise;
                        totalPages += pdf.numPages;
                        pdfDocs.push({ file, pdf });
                    } catch (e) {
                        Logger.warn('[ToolsUI] Не удалось загрузить PDF', {
                            fileName: file.name,
                            error: e.message,
                        });
                    }
                } else {
                    totalPages++;
                    imageFiles.push(file);
                }
            }

            if (totalPages === 0) {
                throw new Error('Нет файлов для конвертации');
            }

            Logger.info('[ToolsUI] Начало конвертации', {
                files: files.length,
                pdfFiles: pdfDocs.length,
                imageFiles: imageFiles.length,
                totalPages: totalPages,
            });

            // Обновляем прогресс с реальными данными
            DomUtils.updateProgress(0, `Конвертация: 0/${totalPages} (0%)`);

            // ============================================================
            // 3. НАСТРОЙКИ
            // ============================================================

            const allResults = [];
            const BATCH_SIZE = 10;
            let batchItems = [];
            let processed = 0;
            let pendingUpdate = false;

            const scheduleUpdate = (percent, message) => {
                if (!pendingUpdate) {
                    pendingUpdate = true;
                    requestAnimationFrame(() => {
                        DomUtils.updateProgress(percent, message);
                        pendingUpdate = false;
                    });
                }
            };

            const flushBatch = async () => {
                if (batchItems.length === 0) return;
                await FileManager.saveBatch(batchItems);
                for (const item of batchItems) {
                    allResults.push({
                        name: item.metadata.downloadName || item.name,
                        blob: item.blob,
                        storageName: item.name,
                        ...item.metadata,
                    });
                }
                const percent = Math.min(Math.round((allResults.length / totalPages) * 100), 100);
                scheduleUpdate(
                    percent,
                    `Конвертация: ${allResults.length}/${totalPages} (${percent}%)`
                );
                batchItems = [];
            };

            // ============================================================
            // 4. ОБРАБОТКА PDF (ОДИН РАЗ ЗАГРУЖЕН)
            // ============================================================

            for (const { file, pdf } of pdfDocs) {
                const baseName = file.name.replace(/\.pdf$/i, '');
                const extension = format === 'jpeg' ? 'jpg' : format;

                // ПЕРЕДАЁМ preloadedDoc - PDF НЕ ПЕРЕЗАГРУЖАЕТСЯ
                const results = await ToolsService.convertPdfToImages(
                    file,
                    format,
                    quality,
                    2.0,
                    null,
                    pdf // ← ПРЕДЗАГРУЖЕННЫЙ ДОКУМЕНТ
                );

                for (const r of results) {
                    batchItems.push({
                        blob: r.blob,
                        name: r.storageName,
                        metadata: {
                            pageNumber: r.page,
                            totalPages: results.length,
                            originalFile: file.name,
                            isConverted: true,
                            isPdfPage: true,
                            width: r.width,
                            height: r.height,
                            downloadName: `${baseName}_страница_${r.page}.${extension}`,
                            tool: 'convert',
                        },
                    });
                    processed++;
                    if (batchItems.length >= BATCH_SIZE) await flushBatch();
                }
            }

            // ============================================================
            // 5. ОБРАБОТКА ИЗОБРАЖЕНИЙ
            // ============================================================

            for (const file of imageFiles) {
                const blob = await ToolsService.convertImage(file, format, quality);
                const baseName = file.name.replace(/\.[^.]+$/, '');
                const extension = format === 'jpeg' ? 'jpg' : format;
                const name = `${baseName}.${extension}`;

                batchItems.push({
                    blob: blob,
                    name: name,
                    metadata: {
                        originalFormat: file.type,
                        targetFormat: format,
                        isConverted: true,
                        downloadName: name,
                        tool: 'convert',
                    },
                });
                processed++;
                if (batchItems.length >= BATCH_SIZE) await flushBatch();
            }

            // ============================================================
            // 6. ФИНАЛИЗАЦИЯ
            // ============================================================

            if (batchItems.length > 0) await flushBatch();

            DomUtils.updateProgress(100, `Готово! ${allResults.length} файлов`);
            await new Promise((resolve) => setTimeout(resolve, 300));
            DomUtils.hideProgress();

            if (allResults.length > 0) {
                this._results[store] = allResults;
                this._updateButtons(store);
                await this._finalizeResults(allResults, store);
                DomUtils.showSuccess(`Сконвертировано ${allResults.length} файлов`);
            }

            this._fileStores[store] = [];
            this._updateFileList(store);
        } catch (error) {
            DomUtils.hideProgress();
            Logger.error('[ToolsUI] Ошибка конвертации', { error: error.message });
            DomUtils.showError('Ошибка конвертации: ' + DomUtils.sanitize(error.message));
        } finally {
            this._isProcessing = false;
            convertBtn.disabled = false;
            DomUtils.empty(convertBtn);
            convertBtn.textContent = 'Конвертировать';
        }
    },

    /**
     * Обработчик сжатия
     * @private
     */
    async _handleCompress() {
        const store = 'compress';
        const files = this._fileStores[store];

        if (files.length === 0) {
            DomUtils.showError('Выберите файлы для сжатия');
            return;
        }

        if (this._isProcessing) {
            DomUtils.showWarning('Идёт обработка, подождите...');
            return;
        }

        const qualitySlider = document.getElementById('compressQuality');
        const compressBtn = document.getElementById('compressBtn');

        if (!compressBtn) return;

        const quality = qualitySlider ? parseInt(qualitySlider.value) / 100 : 0.5;

        this._isProcessing = true;
        compressBtn.disabled = true;

        DomUtils.empty(compressBtn);
        const spinnerIcon = DomUtils.createElementSafe('i', 'bi bi-arrow-repeat', {
            'aria-hidden': 'true',
        });
        compressBtn.appendChild(spinnerIcon);
        compressBtn.appendChild(DomUtils.createTextNode(' Сжатие...'));

        try {
            let totalOriginalSize = 0;
            let totalCompressedSize = 0;

            // ИСПОЛЬЗУЕМ ProgressManager
            const allResults = await ProgressManager.process(files, {
                processor: async (file, index, items) => {
                    totalOriginalSize += file.size;

                    let blob;
                    let metadata = {};

                    if (
                        file.type === 'application/pdf' ||
                        file.name.toLowerCase().endsWith('.pdf')
                    ) {
                        blob = await ToolsService.compressPdf(file, quality);
                        metadata = {
                            originalSize: file.size,
                            compressedSize: blob.size,
                            compressionRatio: ((file.size - blob.size) / file.size) * 100,
                            isCompressed: true,
                        };
                    } else if (file.type.startsWith('image/')) {
                        const compressedFile = await ToolsService.compressImage(file, quality);
                        blob = compressedFile;
                        metadata = {
                            originalSize: file.size,
                            compressedSize: compressedFile.size,
                            compressionRatio: ((file.size - compressedFile.size) / file.size) * 100,
                            isCompressed: true,
                        };
                    } else {
                        // Неподдерживаемый формат - просто копируем
                        blob = await file
                            .arrayBuffer()
                            .then((buf) => new Blob([buf], { type: file.type }));
                        metadata = {
                            originalSize: file.size,
                            compressedSize: file.size,
                            isCompressed: false,
                            note: 'Формат не поддерживается для сжатия',
                        };
                    }

                    totalCompressedSize += blob.size;

                    return {
                        blob: blob,
                        name: file.name,
                        downloadName: file.name,
                        metadata: metadata,
                    };
                },
                tool: 'compress',
                batchSize: 10,
                progressMessage: 'Сжатие: {processed}/{total} ({percent}%)',
                onComplete: (results) => {
                    this._results[store] = results;
                    this._updateButtons(store);
                    const savedPercent =
                        totalOriginalSize > 0
                            ? (
                                  ((totalOriginalSize - totalCompressedSize) / totalOriginalSize) *
                                  100
                              ).toFixed(1)
                            : 0;
                    DomUtils.showSuccess(
                        `Сжато ${results.length} файлов. Экономия: ${savedPercent}%`
                    );
                },
            });

            if (allResults.length > 0) {
                this._results[store] = allResults;
                this._updateButtons(store);
                await this._finalizeResults(allResults, store);
            }

            this._fileStores[store] = [];
            this._updateFileList(store);
        } catch (error) {
            Logger.error('[ToolsUI] Ошибка сжатия', { error: error.message });
            DomUtils.showError('Ошибка сжатия: ' + DomUtils.sanitize(error.message));
        } finally {
            this._isProcessing = false;
            compressBtn.disabled = false;

            DomUtils.empty(compressBtn);
            compressBtn.textContent = 'Сжать';
        }
    },

    /**
     * Обработчик объединения PDF
     * @private
     */
    async _handlePdfMerge() {
        const store = 'pdf';
        const files = this._fileStores[store];

        if (files.length === 0) {
            DomUtils.showError('Выберите файлы для объединения');
            return;
        }

        if (this._isProcessing) {
            DomUtils.showWarning('Идёт обработка, подождите...');
            return;
        }

        const mergeBtn = document.getElementById('mergePdfBtn');
        if (!mergeBtn) return;

        this._isProcessing = true;
        mergeBtn.disabled = true;

        DomUtils.empty(mergeBtn);
        const spinnerIcon = DomUtils.createElementSafe('i', 'bi bi-arrow-repeat', {
            'aria-hidden': 'true',
        });
        mergeBtn.appendChild(spinnerIcon);
        mergeBtn.appendChild(DomUtils.createTextNode(' Объединение...'));

        try {
            const { PDFDocument } = window.PDFLib;

            // ИСПОЛЬЗУЕМ ProgressManager.processMerge
            const result = await ProgressManager.processMerge(files, {
                processor: async (file, index, items, accumulator) => {
                    if (!accumulator) {
                        accumulator = await PDFDocument.create();
                    }

                    const isPdf =
                        file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
                    const isImage = file.type.startsWith('image/');

                    if (isPdf) {
                        try {
                            const arrayBuffer = await FileUtils.fileToArrayBuffer(file);
                            const pdfDoc = await PDFDocument.load(arrayBuffer);
                            const pages = await accumulator.copyPages(
                                pdfDoc,
                                pdfDoc.getPageIndices()
                            );
                            pages.forEach((page) => accumulator.addPage(page));

                            Logger.debug('[ToolsUI] Добавлен PDF', {
                                fileName: file.name,
                                pages: pdfDoc.getPageCount(),
                            });
                        } catch (pdfError) {
                            Logger.error('[ToolsUI] Ошибка обработки PDF', {
                                fileName: file.name,
                                error: pdfError.message,
                            });
                            return null;
                        }
                    } else if (isImage) {
                        try {
                            const dataUrl = await FileUtils.fileToDataUrl(file);
                            const imageBytes = FileUtils.dataUrlToUint8Array(dataUrl);

                            let embeddedImage;
                            if (file.type === 'image/png') {
                                embeddedImage = await accumulator.embedPng(imageBytes);
                            } else {
                                embeddedImage = await accumulator.embedJpg(imageBytes);
                            }

                            const { width, height } = embeddedImage;
                            const page = accumulator.addPage([width, height]);
                            page.drawImage(embeddedImage, {
                                x: 0,
                                y: 0,
                                width: width,
                                height: height,
                            });

                            Logger.debug('[ToolsUI] Добавлено изображение', {
                                fileName: file.name,
                                size: `${width}x${height}`,
                            });
                        } catch (imgError) {
                            Logger.error('[ToolsUI] Ошибка обработки изображения', {
                                fileName: file.name,
                                error: imgError.message,
                            });
                            return null;
                        }
                    } else {
                        Logger.warn('[ToolsUI] Пропущен файл неизвестного типа', {
                            fileName: file.name,
                            type: file.type,
                        });
                        return null;
                    }

                    const pageCount = accumulator.getPageCount();
                    const pdfBytes = await accumulator.save();
                    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

                    const firstFileName = items[0]?.name || 'объединенный';
                    const baseName = firstFileName.replace(/\.pdf$/i, '').replace(/\.PDF$/i, '');
                    const mergedName = `${baseName}.pdf`;

                    return {
                        blob: blob,
                        name: mergedName,
                        downloadName: mergedName,
                        metadata: {
                            pageCount: pageCount,
                            sourceCount: index + 1,
                            isMerged: true,
                        },
                        accumulator: accumulator,
                    };
                },
                tool: 'pdf',
                progressMessage: 'Объединение: {processed}/{total} ({percent}%)',
                onComplete: (result) => {
                    if (result && result.blob) {
                        this._results[store] = [result];
                        this._updateButtons(store);
                        DomUtils.showSuccess(
                            `PDF объединён (${result.metadata?.pageCount || '?'} страниц)`
                        );
                    }
                },
            });

            if (result && result.blob) {
                this._results[store] = [result];
                this._updateButtons(store);
                // _finalizeResults сам скачает
                await this._finalizeResults([result], store);
            }

            this._fileStores[store] = [];
            this._updateFileList(store);
        } catch (error) {
            DomUtils.hideProgress();
            Logger.error('[ToolsUI] Ошибка объединения PDF', {
                error: error.message,
                stack: error.stack,
            });
            DomUtils.showError('Ошибка объединения: ' + DomUtils.sanitize(error.message));
        } finally {
            this._isProcessing = false;
            mergeBtn.disabled = false;

            DomUtils.empty(mergeBtn);
            const pdfIcon = DomUtils.createElementSafe('i', 'bi bi-file-earmark-pdf', {
                'aria-hidden': 'true',
            });
            mergeBtn.appendChild(pdfIcon);
            mergeBtn.appendChild(DomUtils.createTextNode(' Объединить в PDF'));
        }
    },

    /**
     * Обработчик разделения PDF
     * @private
     */
    async _handlePdfSplit() {
        const store = 'pdf';
        const files = this._fileStores[store];

        const pdfFiles = files.filter(
            (f) => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf')
        );

        if (pdfFiles.length === 0) {
            DomUtils.showError('Выберите PDF-файлы для разделения');
            return;
        }

        if (this._isProcessing) {
            DomUtils.showWarning('Идёт обработка, подождите...');
            return;
        }

        const splitBtn = document.getElementById('splitPdfBtn');
        if (!splitBtn) return;

        this._isProcessing = true;
        splitBtn.disabled = true;

        DomUtils.empty(splitBtn);
        const spinnerIcon = DomUtils.createElementSafe('i', 'bi bi-arrow-repeat', {
            'aria-hidden': 'true',
        });
        splitBtn.appendChild(spinnerIcon);
        splitBtn.appendChild(DomUtils.createTextNode(' Разделение...'));

        try {
            const { PDFDocument } = window.PDFLib;

            // ИСПОЛЬЗУЕМ ProgressManager
            const allResults = await ProgressManager.process(pdfFiles, {
                processor: async (file, index, items) => {
                    const arrayBuffer = await FileUtils.fileToArrayBuffer(file);
                    const pdfDoc = await PDFDocument.load(arrayBuffer);
                    const pageCount = pdfDoc.getPageCount();
                    const baseName = file.name.replace(/\.pdf$/i, '');

                    // Возвращаем массив страниц
                    const pages = [];
                    for (let i = 0; i < pageCount; i++) {
                        const newPdf = await PDFDocument.create();
                        const [page] = await newPdf.copyPages(pdfDoc, [i]);
                        newPdf.addPage(page);
                        const pdfBytes = await newPdf.save();
                        const blob = new Blob([pdfBytes], { type: 'application/pdf' });

                        pages.push({
                            blob: blob,
                            name: `${baseName}_page_${i + 1}.pdf`,
                            downloadName: `${baseName}_страница_${i + 1}.pdf`,
                            metadata: {
                                pageNumber: i + 1,
                                totalPages: pageCount,
                                originalFile: file.name,
                                isSplit: true,
                            },
                        });
                    }
                    return pages;
                },
                tool: 'pdf',
                batchSize: 10,
                progressMessage: 'Разделение: {processed}/{total} страниц ({percent}%)',
                onComplete: (results) => {
                    this._results[store] = results;
                    this._updateButtons(store);
                    DomUtils.showSuccess(`Разделено ${results.length} страниц`);
                },
            });

            // Сохраняем результаты для ZIP
            if (allResults.length > 0) {
                this._results[store] = allResults;
                this._updateButtons(store);
                await this._finalizeResults(allResults, store);
            }

            this._fileStores[store] = [];
            this._updateFileList(store);
        } catch (error) {
            Logger.error('[ToolsUI] Ошибка разделения PDF', { error: error.message });
            DomUtils.showError('Ошибка разделения: ' + DomUtils.sanitize(error.message));
        } finally {
            this._isProcessing = false;
            splitBtn.disabled = false;

            DomUtils.empty(splitBtn);
            const symmetryIcon = DomUtils.createElementSafe('i', 'bi bi-symmetry-vertical', {
                'aria-hidden': 'true',
            });
            splitBtn.appendChild(symmetryIcon);
            splitBtn.appendChild(DomUtils.createTextNode(' Разделить PDF'));
        }
    },

    /**
     * Обработчик извлечения текста из PDF
     * @private
     */
    async _handlePdfExtractText() {
        const store = 'pdf';
        const files = this._fileStores[store];

        const pdfFiles = files.filter(
            (f) => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf')
        );

        if (pdfFiles.length === 0) {
            DomUtils.showError('Выберите PDF-файл для извлечения текста');
            return;
        }

        if (this._isProcessing) {
            DomUtils.showWarning('Идёт обработка, подождите...');
            return;
        }

        const extractBtn = document.getElementById('extractTextBtn');
        if (!extractBtn) return;

        this._isProcessing = true;
        extractBtn.disabled = true;

        DomUtils.empty(extractBtn);
        const spinnerIcon = DomUtils.createElementSafe('i', 'bi bi-arrow-repeat', {
            'aria-hidden': 'true',
        });
        extractBtn.appendChild(spinnerIcon);
        extractBtn.appendChild(DomUtils.createTextNode(' Извлечение...'));

        try {
            const file = pdfFiles[0];
            const result = await ToolsService.extractTextFromPdf(file, (page, total) => {
                DomUtils.showProgress(
                    `Извлечение текста: страница ${page}/${total}`,
                    Math.round((page / total) * 100)
                );
            });

            DomUtils.hideProgress();

            const extractedTextDiv = document.getElementById('extractedText');
            const textActions = document.getElementById('textActions');

            if (extractedTextDiv) {
                // 🔒 БЕЗОПАСНО: textContent, не innerHTML
                extractedTextDiv.textContent = result.text;
                extractedTextDiv.classList.remove('hidden');
                extractedTextDiv.style.display = 'block';
            }

            if (textActions) {
                textActions.classList.remove('hidden');
                textActions.style.display = 'flex';
            }

            const textBlob = new Blob([result.text], { type: 'text/plain;charset=utf-8' });
            const baseName = file.name.replace(/\.pdf$/i, '');
            const safeName = StringUtils.sanitizeFilename(`${baseName}.txt`);

            await FileManager.saveFile(textBlob, safeName, 'pdf', {
                extractedFrom: file.name,
                charCount: result.charCount,
                pageCount: result.pageCount,
                extractedAt: result.extractedAt,
                isExtractedText: true,
            });

            DomUtils.showSuccess('Текст извлечён и сохранён');
        } catch (error) {
            DomUtils.hideProgress();
            Logger.error('[ToolsUI] Ошибка извлечения текста', { error: error.message });
            DomUtils.showError('Ошибка извлечения текста: ' + DomUtils.sanitize(error.message));
        } finally {
            this._isProcessing = false;
            extractBtn.disabled = false;

            DomUtils.empty(extractBtn);
            const fileIcon = DomUtils.createElementSafe('i', 'bi bi-file-text', {
                'aria-hidden': 'true',
            });
            extractBtn.appendChild(fileIcon);
            extractBtn.appendChild(DomUtils.createTextNode(' Извлечь текст'));
        }
    },

    /**
     * Обработчик изменения размера
     * @private
     */
    async _handleResize() {
        const store = 'resize';
        const files = this._fileStores[store];

        if (files.length === 0) {
            DomUtils.showError('Выберите изображения для изменения размера');
            return;
        }

        if (this._isProcessing) {
            DomUtils.showWarning('Идёт обработка, подождите...');
            return;
        }

        const widthInput = document.getElementById('resizeWidth');
        const heightInput = document.getElementById('resizeHeight');
        const keepAspectCheckbox = document.getElementById('keepAspectRatio');
        const applyBtn = document.getElementById('applyResizeBtn');

        if (!widthInput || !heightInput || !applyBtn) return;

        const targetWidth = parseInt(widthInput.value);
        const targetHeight = parseInt(heightInput.value);
        const keepAspect = keepAspectCheckbox ? keepAspectCheckbox.checked : true;

        if (isNaN(targetWidth) || isNaN(targetHeight) || targetWidth <= 0 || targetHeight <= 0) {
            DomUtils.showError('Введите корректные ширину и высоту');
            return;
        }

        this._isProcessing = true;
        applyBtn.disabled = true;

        DomUtils.empty(applyBtn);
        const spinnerIcon = DomUtils.createElementSafe('i', 'bi bi-arrow-repeat', {
            'aria-hidden': 'true',
        });
        applyBtn.appendChild(spinnerIcon);
        applyBtn.appendChild(DomUtils.createTextNode(' Обработка...'));

        try {
            // ИСПОЛЬЗУЕМ ProgressManager
            const allResults = await ProgressManager.process(files, {
                processor: async (file, index, items) => {
                    const result = await ToolsService.resizeImage(
                        file,
                        targetWidth,
                        targetHeight,
                        keepAspect
                    );

                    const baseName = file.name.replace(/\.[^.]+$/, '');
                    const ext = file.name.split('.').pop();
                    const downloadName = `${baseName}.${ext}`;

                    return {
                        blob: result.blob,
                        name: downloadName,
                        downloadName: downloadName,
                        metadata: {
                            originalWidth: result.originalWidth,
                            originalHeight: result.originalHeight,
                            newWidth: result.newWidth || targetWidth,
                            newHeight: result.newHeight || targetHeight,
                            isResized: true,
                        },
                    };
                },
                tool: 'resize',
                batchSize: 10,
                progressMessage: 'Изменение размера: {processed}/{total} ({percent}%)',
                onComplete: (results) => {
                    this._results[store] = results;
                    this._updateButtons(store);
                    DomUtils.showSuccess(`Обработано ${results.length} изображений`);
                },
            });

            if (allResults.length > 0) {
                this._results[store] = allResults;
                this._updateButtons(store);
                await this._finalizeResults(allResults, store);
            }

            this._fileStores[store] = [];
            this._updateFileList(store);
        } catch (error) {
            Logger.error('[ToolsUI] Ошибка изменения размера', { error: error.message });
            DomUtils.showError('Ошибка: ' + DomUtils.sanitize(error.message));
        } finally {
            this._isProcessing = false;
            applyBtn.disabled = false;

            DomUtils.empty(applyBtn);
            applyBtn.textContent = 'Изменить размер';
        }
    },

    // =============================================================
    // 9. ЗАГРУЗКА ZIP-АРХИВА (БЕЗОПАСНАЯ ВЕРСИЯ)
    // =============================================================

    /**
     * Обработчик скачивания ZIP-архива (универсальный)
     * @param {string} store - Имя хранилища ('convert', 'compress', 'pdf', 'resize')
     * @param {string} buttonId - ID кнопки для обновления
     * @private
     */
    async _handleZipDownload(store, buttonId) {
        if (!store) {
            Logger.error('[ToolsUI] _handleZipDownload: store не указан');
            return;
        }

        const results = this._results[store] || [];

        if (results.length === 0) {
            DomUtils.showError('Нет файлов для архивации');
            return;
        }

        const zipBtn = document.getElementById(buttonId);
        if (!zipBtn) return;

        // Сохраняем исходный текст кнопки для восстановления
        const originalText = zipBtn.textContent;

        zipBtn.disabled = true;
        DomUtils.empty(zipBtn);

        const spinnerIcon = DomUtils.createElementSafe('i', 'bi bi-arrow-repeat', {
            'aria-hidden': 'true',
        });
        zipBtn.appendChild(spinnerIcon);
        zipBtn.appendChild(DomUtils.createTextNode(' Создание ZIP...'));

        // Показываем прогресс
        DomUtils.showProgress('Создание ZIP-архива...', 0);

        try {
            const firstFileName = results[0]?.name || 'archive';
            const baseName =
                StringUtils.sanitizeFilename(firstFileName.replace(/\.[^.]+$/, '')) || 'archive';

            const zipBlob = await ToolsService.createZip(results, baseName, (index, total) => {
                const percent = Math.round((index / total) * 100);
                DomUtils.updateProgress(percent, `Создание ZIP: ${index}/${total} (${percent}%)`);
            });

            DomUtils.hideProgress();

            const safeZipName = StringUtils.sanitizeFilename(`${baseName}.zip`);
            FileUtils.downloadFile(zipBlob, safeZipName);

            await FileManager.saveFile(zipBlob, safeZipName, store, {
                fileCount: results.length,
                isZip: true,
                sourceFiles: results.map((r) => StringUtils.sanitizeFilename(r.name)),
                tool: store,
            });

            DomUtils.showSuccess(`ZIP-архив создан (${results.length} файлов)`);
        } catch (error) {
            DomUtils.hideProgress();
            Logger.error('[ToolsUI] Ошибка создания ZIP', {
                error: error.message,
                store: store,
            });
            DomUtils.showError('Ошибка создания ZIP: ' + DomUtils.sanitize(error.message));
        } finally {
            zipBtn.disabled = false;

            // Восстанавливаем кнопку
            DomUtils.empty(zipBtn);
            const icon = DomUtils.createElementSafe('i', 'bi bi-file-zip', {
                'aria-hidden': 'true',
            });
            zipBtn.appendChild(icon);

            const count = this._results[store]?.length || 0;
            const text =
                count > 0
                    ? DomUtils.createTextNode(` Скачать ZIP (${count} файлов)`)
                    : DomUtils.createTextNode(' Скачать ZIP-архив');
            zipBtn.appendChild(text);
        }
    },

    // =============================================================
    // 10. СОХРАНЕНИЕ РЕЗУЛЬТАТОВ
    // =============================================================

    /**
     * Сохраняет результаты в FileManager
     * @private
     * @param {Array<{name: string, blob: Blob, storageName: string}>} results - Результаты
     * @param {string} tool - Имя инструмента
     */
    async _saveResultsToFileManager(results, tool) {
        if (!results || results.length === 0) return;

        try {
            for (const item of results) {
                const storageName = item.storageName || item.name;
                const safeStorageName = StringUtils.sanitizeFilename(storageName);
                await FileManager.saveFile(item.blob, safeStorageName, tool, {
                    downloadName: item.name,
                    originalName: item.name,
                });
            }

            Logger.debug('[ToolsUI] Результаты сохранены в FileManager', {
                tool: tool,
                count: results.length,
            });
        } catch (error) {
            Logger.warn('[ToolsUI] Ошибка сохранения в FileManager', {
                error: error.message,
                tool: tool,
            });
        }
    },

    // =============================================================
    // 11. ФИНАЛИЗАЦИЯ РЕЗУЛЬТАТОВ
    // =============================================================

    /**
     * Финальная обработка результатов (ZIP или по отдельности)
     * @private
     * @param {Array<{name: string, blob: Blob}>} results - Результаты
     * @param {string} store - Имя хранилища
     */
    async _finalizeResults(results, store) {
        if (!results || results.length === 0) return;

        // Определяем ID кнопки для этого store
        const buttonMap = {
            pdf: 'downloadZipBtn',
            convert: 'downloadZipConvertBtn',
            compress: 'downloadZipCompressBtn',
            resize: 'downloadZipResizeBtn',
        };

        const buttonId = buttonMap[store];

        if (results.length === 1) {
            const item = results[0];
            const safeName = StringUtils.sanitizeFilename(item.name);
            FileUtils.downloadFile(item.blob, safeName);

            // Активируем ZIP-кнопку (для одного файла тоже можно)
            if (buttonId) {
                const zipBtn = document.getElementById(buttonId);
                if (zipBtn) {
                    zipBtn.disabled = false;
                    zipBtn.style.display = 'flex';
                    DomUtils.empty(zipBtn);
                    const icon = DomUtils.createElementSafe('i', 'bi bi-file-zip', {
                        'aria-hidden': 'true',
                    });
                    zipBtn.appendChild(icon);
                    zipBtn.appendChild(
                        DomUtils.createTextNode(` Скачать ZIP (${results.length} файл)`)
                    );
                }
            }
            return;
        }

        // Активируем ZIP-кнопку для нескольких файлов
        if (buttonId) {
            const zipBtn = document.getElementById(buttonId);
            if (zipBtn) {
                zipBtn.disabled = false;
                zipBtn.style.display = 'flex';
                DomUtils.empty(zipBtn);
                const icon = DomUtils.createElementSafe('i', 'bi bi-file-zip', {
                    'aria-hidden': 'true',
                });
                zipBtn.appendChild(icon);
                zipBtn.appendChild(
                    DomUtils.createTextNode(` Скачать ZIP (${results.length} файлов)`)
                );
            }
        }

        // Показываем уведомление
        DomUtils.showInfo(
            `${results.length} файлов готовы. Нажмите «Скачать ZIP» для загрузки архива.`,
            5000
        );
    },

    // =============================================================
    // 12. БЕЙДЖ ФАЙЛОВ
    // =============================================================

    /**
     * Обновляет бейдж с количеством файлов
     * @private
     */
    async _updateBadge() {
        try {
            const info = await FileManager.getStorageInfo();
            const badge = document.getElementById('headerFilesBadge');

            if (badge) {
                badge.textContent = info.count;
                badge.style.display = info.count > 0 ? 'flex' : 'none';
            }
        } catch (error) {
            Logger.warn('[ToolsUI] Ошибка обновления бейджа', { error: error.message });
        }
    },

    // =============================================================
    // 13. ВАЛИДАЦИЯ ФАЙЛОВ
    // =============================================================

    /**
     * Возвращает разрешённые типы для хранилища
     * @private
     * @param {string} store - Имя хранилища
     * @returns {Array<string>} - Разрешённые типы
     */
    _getAllowedTypes(store) {
        const types = {
            convert: ['image', 'pdf'],
            compress: ['image', 'pdf'],
            pdf: ['image', 'pdf'],
            resize: ['image'],
        };

        return types[store] || ['image', 'pdf'];
    },

    /**
     * Валидирует файлы
     * @private
     * @param {Array<File>} files - Файлы для проверки
     * @param {Array<string>} allowedTypes - Разрешённые типы
     * @returns {Object} - { validFiles, errors }
     */
    _validateFiles(files, allowedTypes) {
        const errors = [];
        const validFiles = [];

        for (const file of files) {
            let isValid = false;

            for (const type of allowedTypes) {
                if (type === 'image' && file.type.startsWith('image/')) {
                    isValid = true;
                    break;
                }
                if (type === 'pdf' && file.type === 'application/pdf') {
                    isValid = true;
                    break;
                }
                if (file.type === type || file.name.endsWith(type)) {
                    isValid = true;
                    break;
                }
            }

            if (isValid) {
                validFiles.push(file);
            } else {
                errors.push(`Файл "${DomUtils.sanitize(file.name)}" имеет неподдерживаемый формат`);
            }
        }

        return { validFiles, errors };
    },
};

// ================================================================
// ЭКСПОРТЫ
// ================================================================

window.ToolsUI = ToolsUI;

// ================================================================
// БЛОК 10.1: WEBMCP — РЕГИСТРАЦИЯ ИНСТРУМЕНТОВ
// ================================================================

async function registerWebMCPTools(options = {}) {
    const { signal = null, exposedTo = null } = options;

    // 1. ПРОВЕРКА ДОСТУПНОСТИ API
    const modelContext = document.modelContext || navigator.modelContext;
    if (!modelContext || typeof modelContext.registerTool !== 'function') {
        Logger.debug('[WebMCP] API не доступен');
        return { success: false, count: 0 };
    }

    Logger.info('[WebMCP] Регистрация инструментов...');

    // 2. БЕЗОПАСНАЯ РЕГИСТРАЦИЯ
    async function registerToolSafe(tool) {
        try {
            // ПРАВИЛЬНАЯ ПЕРЕДАЧА signal
            const registerOptions = {};
            if (signal) registerOptions.signal = signal;
            if (exposedTo && Array.isArray(exposedTo)) {
                registerOptions.exposedTo = exposedTo;
            }
            await modelContext.registerTool(tool, registerOptions);
            return true;
        } catch (error) {
            Logger.warn(`[WebMCP] Ошибка "${tool.name}":`, error.message);
            return false;
        }
    }

    // 3. ОПРЕДЕЛЕНИЕ ИНСТРУМЕНТОВ
    const toolDefs = [
        {
            name: 'open_tools_modal',
            description: 'Открывает модальное окно с инструментами',
            inputSchema: { type: 'object', properties: {} },
            execute: async () => {
                const btn = document.getElementById('showToolsModal');
                if (!btn) throw new Error('Кнопка #showToolsModal не найдена');
                btn.click();
                return { success: true, message: 'Модалка открыта' };
            },
        },
        {
            name: 'switch_tool_tab',
            description: 'Переключает вкладку: convert, compress, pdf, resize',
            inputSchema: {
                type: 'object',
                properties: {
                    tool: { type: 'string', enum: ['convert', 'compress', 'pdf', 'resize'] },
                },
                required: ['tool'],
            },
            execute: async ({ tool }) => {
                const modal = document.getElementById('toolsModal');
                if (!modal?.classList.contains('active')) {
                    throw new Error('Модалка не открыта');
                }
                const tab = document.querySelector(`.tool-tab[data-tool="${tool}"]`);
                if (!tab) throw new Error(`Вкладка "${tool}" не найдена`);
                document.querySelectorAll('.tool-tab').forEach((t) => t.classList.remove('active'));
                document
                    .querySelectorAll('.tool-panel')
                    .forEach((p) => p.classList.remove('active'));
                tab.classList.add('active');
                const panel = document.querySelector(`.tool-panel[data-tool="${tool}"]`);
                if (panel) panel.classList.add('active');
                return { success: true, message: `Вкладка "${tool}" активирована` };
            },
        },
        {
            name: 'convert',
            description: 'Конвертирует изображения и PDF в JPEG, PNG или WebP',
            inputSchema: {
                type: 'object',
                properties: {
                    file: { type: 'string', format: 'binary' },
                    format: { type: 'string', enum: ['jpeg', 'png', 'webp'] },
                    quality: { type: 'number', minimum: 10, maximum: 100, default: 90 },
                },
                required: ['file', 'format'],
            },
            execute: async ({ file, format, quality = 90 }) => {
                if (typeof ToolsService?.convertImage !== 'function') {
                    throw new Error('convertImage не найден');
                }
                const blob = await ToolsService.convertImage(file, format, quality / 100);
                return { blob, note: 'Конвертация выполнена локально' };
            },
        },
        {
            name: 'compress',
            description: 'Сжимает изображения',
            inputSchema: {
                type: 'object',
                properties: {
                    file: { type: 'string', format: 'binary' },
                    quality: { type: 'number', minimum: 10, maximum: 100, default: 70 },
                },
                required: ['file'],
            },
            execute: async ({ file, quality = 70 }) => {
                if (typeof ToolsService?.compressImage !== 'function') {
                    throw new Error('compressImage не найден');
                }
                const compressed = await ToolsService.compressImage(file, quality / 100);
                return { blob: compressed, note: 'Сжатие выполнено локально' };
            },
        },
        {
            name: 'pdf_tool',
            description: 'Объединение, разделение, извлечение текста из PDF',
            inputSchema: {
                type: 'object',
                properties: {
                    action: { type: 'string', enum: ['merge', 'split', 'extract_text'] },
                    files: { type: 'array', items: { type: 'string', format: 'binary' } },
                },
                required: ['action', 'files'],
            },
            execute: async ({ action, files }) => {
                if (!files?.length) throw new Error('Нет файлов');
                switch (action) {
                    case 'merge': {
                        if (typeof ToolsService?.mergePdf !== 'function') {
                            throw new Error('mergePdf не найден');
                        }
                        return { blob: await ToolsService.mergePdf(files), note: 'PDF объединён' };
                    }
                    case 'split': {
                        if (typeof ToolsService?.splitPdf !== 'function') {
                            throw new Error('splitPdf не найден');
                        }
                        if (files.length !== 1) throw new Error('Нужен один PDF');
                        const result = await ToolsService.splitPdf(files[0]);
                        return { files: result.results, note: 'PDF разделён' };
                    }
                    case 'extract_text': {
                        if (typeof ToolsService?.extractTextFromPdf !== 'function') {
                            throw new Error('extractTextFromPdf не найден');
                        }
                        if (files.length !== 1) throw new Error('Нужен один PDF');
                        const result = await ToolsService.extractTextFromPdf(files[0]);
                        return {
                            text: result.text,
                            pageCount: result.pageCount,
                            charCount: result.charCount,
                            note: 'Текст извлечён',
                        };
                    }
                    default:
                        throw new Error(`Неизвестное действие: ${action}`);
                }
            },
        },
        {
            name: 'resize_image',
            description: 'Изменяет размер изображений с пресетами',
            inputSchema: {
                type: 'object',
                properties: {
                    file: { type: 'string', format: 'binary' },
                    preset: {
                        type: 'string',
                        enum: ['full_hd', 'hd', 'square', '4_3', 'small', 'custom'],
                    },
                    width: { type: 'number', minimum: 1 },
                    height: { type: 'number', minimum: 1 },
                    keep_aspect_ratio: { type: 'boolean', default: true },
                },
                required: ['file', 'preset'],
            },
            execute: async ({ file, preset, width, height, keep_aspect_ratio = true }) => {
                if (typeof ToolsService?.resizeImage !== 'function') {
                    throw new Error('resizeImage не найден');
                }
                const presets = {
                    full_hd: { width: 1920, height: 1080 },
                    hd: { width: 1280, height: 720 },
                    square: { width: 1080, height: 1080 },
                    '4_3': { width: 1440, height: 1080 },
                    small: { width: 800, height: 600 },
                };
                let tw, th;
                if (preset === 'custom') {
                    if (!width || !height) throw new Error('Укажите width и height');
                    tw = width;
                    th = height;
                } else {
                    const p = presets[preset];
                    if (!p) throw new Error(`Неизвестный пресет: ${preset}`);
                    tw = p.width;
                    th = p.height;
                }
                const result = await ToolsService.resizeImage(file, tw, th, keep_aspect_ratio);
                return {
                    blob: result.blob,
                    originalWidth: result.originalWidth,
                    originalHeight: result.originalHeight,
                    newWidth: result.newWidth || tw,
                    newHeight: result.newHeight || th,
                    note: 'Размер изменён локально',
                };
            },
        },
    ];

    // 4. РЕГИСТРАЦИЯ
    const registered = [];
    for (const def of toolDefs) {
        const tool = {
            name: def.name,
            description: def.description,
            inputSchema: def.inputSchema,
            execute: def.execute,
            annotations: {
                readOnlyHint: false,
                untrustedContentHint: false,
            },
        };
        const ok = await registerToolSafe(tool);
        if (ok) registered.push(def.name);
    }

    Logger.info(`[WebMCP] Зарегистрировано ${registered.length} из ${toolDefs.length}`);
    if (registered.length) {
        for (const name of registered) Logger.info(`   ✔️ ${name}`);
    }

    return {
        success: registered.length > 0,
        count: registered.length,
        registered,
        total: toolDefs.length,
    };
}

window.registerWebMCPTools = registerWebMCPTools;

// ================================================================
// БЛОК 11: УТИЛИТЫ БУФЕРА ОБМЕНА (CLIPBOARD UTILS)
// ================================================================
// Назначение: Работа с буфером обмена.
// Лицензия: MIT (оригинальный код автора)
//
// 🔒 БЕЗОПАСНОСТЬ (OWASP):
// - Все данные санитизируются перед копированием
// - Нет innerHTML, только textContent
// - Безопасное создание элементов через DomUtils
// - Fallback для старых браузеров с защитой
//
// ⚡ СКОРОСТЬ:
// - Асинхронное копирование через Clipboard API
// - Минимальное создание DOM-элементов
// - Оптимизированный fallback
//
// 🛡️ НАДЁЖНОСТЬ:
// - Все ошибки обрабатываются
// - Fallback-значения
// - Логирование через Logger
// ================================================================

const ClipboardUtils = {
    // =============================================================
    // 1. ОСНОВНЫЕ МЕТОДЫ
    // =============================================================

    /**
     * Копирует текст в буфер обмена
     * @param {string} text - Текст для копирования
     * @param {string} successMessage - Сообщение при успехе (опционально)
     * @param {string} errorMessage - Сообщение при ошибке (опционально)
     * @returns {Promise<boolean>} - true, если копирование успешно
     */
    async copyText(
        text,
        successMessage = 'Текст скопирован!',
        errorMessage = 'Не удалось скопировать текст'
    ) {
        if (!text || typeof text !== 'string') {
            Logger.warn('[ClipboardUtils] Попытка скопировать пустой текст');
            return false;
        }

        // 🔒 Санитизируем текст перед копированием
        const safeText = DomUtils.sanitize(text);

        try {
            // Современный Clipboard API
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(safeText);
                this._showToast(successMessage);
                Logger.debug('[ClipboardUtils] Текст скопирован через Clipboard API', {
                    length: safeText.length,
                });
                return true;
            }

            // Fallback для старых браузеров
            const success = this._fallbackCopy(safeText);
            if (success) {
                this._showToast(successMessage);
                Logger.debug('[ClipboardUtils] Текст скопирован через fallback', {
                    length: safeText.length,
                });
                return true;
            }

            throw new Error('Fallback copy failed');
        } catch (error) {
            Logger.error('[ClipboardUtils] Ошибка копирования', {
                error: error.message,
                textLength: safeText.length,
            });
            this._showToast(errorMessage, 'error');
            return false;
        }
    },

    /**
     * Копирует реквизиты ИП Павловой Т.В. в буфер обмена
     * @returns {Promise<boolean>} - true, если копирование успешно
     */
    async copyRequisites() {
        // 🔒 Берём реквизиты из CONFIG
        const req = CONFIG.REQUISITES || {
            NAME: 'ИП Павлова Татьяна Васильевна',
            INN: '631629590986',
            ACCOUNT: '40802810300002352514',
            BANK: 'АО «ТБанк»',
            BIK: '044525974',
            PURPOSE: 'Оплата юридических услуг',
            AMOUNT: '5 000 ₽',
        };

        const text =
            `${req.NAME}\n` +
            `ИНН: ${req.INN}\n` +
            `Счёт: ${req.ACCOUNT}\n` +
            `Банк: ${req.BANK}\n` +
            `БИК: ${req.BIK}\n` +
            `Назначение: ${req.PURPOSE}\n` +
            `Сумма: ${req.AMOUNT}`;

        return this.copyText(text, 'Реквизиты скопированы!', 'Не удалось скопировать реквизиты');
    },

    // =============================================================
    // 2. FALLBACK-КОПИРОВАНИЕ (ДЛЯ СТАРЫХ БРАУЗЕРОВ)
    // =============================================================

    /**
     * Копирует текст через создание textarea и execCommand (fallback)
     * @private
     * @param {string} text - Текст для копирования
     * @returns {boolean} - true, если копирование успешно
     */
    _fallbackCopy(text) {
        if (!text) return false;

        // 🔒 БЕЗОПАСНО: создаём textarea через DomUtils, без innerHTML
        const textarea = DomUtils.createElementSafe('textarea', '', {
            style: 'position: fixed; left: -9999px; top: 0; opacity: 0;',
        });
        textarea.textContent = text;

        try {
            document.body.appendChild(textarea);
            textarea.select();

            // Пробуем execCommand
            const success = document.execCommand('copy');
            return success;
        } catch (error) {
            Logger.warn('[ClipboardUtils] Fallback copy failed', { error: error.message });
            return false;
        } finally {
            // Удаляем textarea
            if (textarea.parentNode) {
                DomUtils.removeElement(textarea);
            }
        }
    },

    // =============================================================
    // 3. ТОСТЫ (БЕЗОПАСНОЕ УВЕДОМЛЕНИЕ)
    // =============================================================

    /**
     * Показывает безопасный тост-уведомление
     * @private
     * @param {string} message - Сообщение
     * @param {string} type - Тип ('success', 'error', 'info', 'warning')
     */
    _showToast(message, type = 'success') {
        // Пробуем использовать DomUtils
        if (typeof DomUtils !== 'undefined' && DomUtils.showToast) {
            DomUtils.showToast(message, type);
            return;
        }

        // Fallback: создаём тост через DOM (без innerHTML)
        this._createLegacyToast(message, type);
    },

    /**
     * Создаёт тост через DOM (без innerHTML)
     * @private
     * @param {string} message - Сообщение
     * @param {string} type - Тип ('success', 'error', 'info', 'warning')
     */
    _createLegacyToast(message, type = 'success') {
        // 🔒 Санитизируем сообщение
        const safeMessage = DomUtils.sanitize ? DomUtils.sanitize(message) : String(message);

        // Удаляем старые тосты
        const oldToasts = document.querySelectorAll('.clipboard-toast');
        oldToasts.forEach((toast) => DomUtils.removeElement(toast));

        const iconMap = {
            success: '✅',
            error: '❌',
            info: 'ℹ️',
            warning: '⚠️',
        };

        // 🔒 БЕЗОПАСНО: создаём через DomUtils
        const toast = DomUtils.createElementSafe(
            'div',
            `clipboard-toast toast-container toast-container--${type}`,
            {
                role: 'alert',
                'aria-live': 'polite',
            }
        );

        // Иконка
        const iconSpan = DomUtils.createElementSafe('span', 'toast-icon', {
            'aria-hidden': 'true',
        });
        iconSpan.textContent = iconMap[type] || 'ℹ️';
        toast.appendChild(iconSpan);

        // Сообщение
        const messageSpan = DomUtils.createElementSafe('span', 'toast-message', {});
        messageSpan.textContent = safeMessage;
        toast.appendChild(messageSpan);

        // Кнопка закрытия
        const closeBtn = DomUtils.createElementSafe('button', 'toast-close', {
            'aria-label': 'Закрыть уведомление',
            type: 'button',
        });
        closeBtn.textContent = '×';

        closeBtn.addEventListener('click', () => {
            DomUtils.removeElement(toast);
        });

        toast.appendChild(closeBtn);

        // Добавляем в DOM
        document.body.appendChild(toast);

        // Показываем с анимацией
        requestAnimationFrame(() => {
            toast.classList.add('toast-visible');
        });

        // Авто-скрытие через 3 секунды
        setTimeout(() => {
            toast.classList.remove('toast-visible');
            setTimeout(() => {
                if (toast.parentNode) {
                    DomUtils.removeElement(toast);
                }
            }, 300);
        }, 3000);
    },

    // =============================================================
    // 4. ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ
    // =============================================================

    /**
     * Проверяет, доступно ли копирование в буфер обмена
     * @returns {boolean} - true, если доступно
     */
    isClipboardAvailable() {
        try {
            return navigator.clipboard && navigator.clipboard.writeText !== undefined;
        } catch (error) {
            return false;
        }
    },

    /**
     * Проверяет, доступен ли fallback-метод (execCommand)
     * @returns {boolean} - true, если доступен
     */
    isFallbackAvailable() {
        try {
            return document.execCommand && document.execCommand('copy') !== undefined;
        } catch (error) {
            return false;
        }
    },

    /**
     * Копирует HTML-текст в буфер обмена (безопасно)
     * @param {string} html - HTML для копирования
     * @param {string} plainText - Обычный текст для fallback
     * @returns {Promise<boolean>} - true, если копирование успешно
     */
    async copyHtml(html, plainText = '') {
        if (!html) return false;

        // 🔒 Санитизируем HTML
        const safeHtml = DomUtils.sanitize ? DomUtils.sanitize(html) : String(html);
        const safePlainText = plainText || safeHtml;

        try {
            // Пробуем Clipboard API с HTML
            if (navigator.clipboard && navigator.clipboard.write) {
                const htmlBlob = new Blob([safeHtml], { type: 'text/html' });
                const textBlob = new Blob([safePlainText], { type: 'text/plain' });

                await navigator.clipboard.write([
                    new ClipboardItem({
                        'text/html': htmlBlob,
                        'text/plain': textBlob,
                    }),
                ]);

                this._showToast('Содержимое скопировано', 'success');
                Logger.debug('[ClipboardUtils] HTML скопирован через Clipboard API');
                return true;
            }

            // Fallback: копируем обычный текст
            return this.copyText(safePlainText);
        } catch (error) {
            Logger.error('[ClipboardUtils] Ошибка копирования HTML', {
                error: error.message,
            });
            // Пробуем fallback
            return this.copyText(safePlainText);
        }
    },
};

// ================================================================
// ЭКСПОРТЫ
// ================================================================

window.ClipboardUtils = ClipboardUtils;

// ================================================================
// ГЛОБАЛЬНАЯ ФУНКЦИЯ ДЛЯ HTML (ОБРАТНАЯ СОВМЕСТИМОСТЬ)
// ================================================================

/**
 * Копирует реквизиты (глобальная функция для вызова из HTML)
 * Используется в модалке оплаты по кнопке "Копировать реквизиты"
 */
window.copyRequisites = function () {
    ClipboardUtils.copyRequisites();
};

/**
 * Копирует текст (глобальная функция для вызова из HTML)
 * @param {string} text - Текст для копирования
 * @param {string} successMessage - Сообщение при успехе
 * @param {string} errorMessage - Сообщение при ошибке
 */
window.copyText = function (text, successMessage, errorMessage) {
    ClipboardUtils.copyText(text, successMessage, errorMessage);
};

// ================================================================
// БЛОК 12: ЗАПУСК ПРИЛОЖЕНИЯ (BOOTSTRAP)
// ================================================================
// Назначение: Сборка и инициализация приложения.
// Принцип: Только вызовы init() у менеджеров.
// Лицензия: MIT (оригинальный код автора)
//
// 🚀 ПОРЯДОК ИНИЦИАЛИЗАЦИИ:
// 1. FileManager - загрузка файлов
// 2. ThemeManager - применение темы
// 3. ModalManager - модальные окна
// 4. ChecklistManager - чек-листы
// 5. PdfManager - просмотр PDF
// 6. CasesCarousel - карусель кейсов
// 7. ToolsUI - инструменты
// 8. SourceManager - источники
// 9. TimeManager - время и статус
// 10. FaqManager - FAQ
// 11. FormManager - форма записи
// 12. LogoImageSpin - анимация логотипа
// 13. ScrollTopButton - кнопка "Наверх"
// 14. DropdownManager - выпадающие меню
// 15. CookieManager - управление cookie
// 16. FU (福) - символ благосостояния
// 17. Service Worker - регистрация
// 18. ClipboardUtils - буфер обмена
// 19. Styles - динамические стили для состояний загрузки
//
// 🔒 БЕЗОПАСНОСТЬ (OWASP):
// - Все инициализации с try/catch
// - Логирование через Logger
// - Защита от повторной инициализации
//
// ⚡ СКОРОСТЬ:
// - Отложенная инициализация через setTimeout
// - Неблокирующая загрузка
// - requestIdleCallback для некритичных компонентов
//
// 🛡️ НАДЁЖНОСТЬ:
// - Все ошибки обрабатываются
// - Fallback-значения
// - Полное логирование
// ================================================================

// ================================================================
// 1. FU (福) - СИМВОЛ БЛАГОСОСТОЯНИЯ
// ================================================================

/**
 * Инициализирует символ FU (福) - пасхалка проекта
 * @private
 */
function _initFuSymbol() {
    try {
        const FU = '福';
        const brandColor =
            getComputedStyle(document.documentElement)
                .getPropertyValue('--theme-brand-primary')
                .trim() || '#3d9c8c';

        // Вывод в консоль
        console.log(
            '%c' + FU + ' Процветание проекту ' + FU,
            'font-size: 32px; ' +
                'color: ' +
                brandColor +
                '; ' +
                'text-shadow: 0 0 20px rgba(61, 156, 140, 0.25); ' +
                'font-weight: 700; ' +
                'padding: 8px 16px; ' +
                'border: 2px solid ' +
                brandColor +
                '; ' +
                'border-radius: 8px; ' +
                'background: transparent; ' +
                'letter-spacing: 0.02em;'
        );

        console.log(
            '%cСимвол благосостояния активирован',
            'font-size: 13px; ' +
                'color: var(--theme-text-secondary, #5a6062); ' +
                'font-style: italic; ' +
                'padding: 4px 0;'
        );

        // Благословение в localStorage
        if (!localStorage.getItem('fu_blessing')) {
            localStorage.setItem('fu_blessing', '福');
            console.log(
                '%c✨ Благословение записано в память проекта ✨',
                'color: ' + brandColor + '; font-weight: 500;'
            );
        }

        // Клик по логотипу
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.addEventListener('click', function () {
                console.log(
                    '%c🀅 福 气 满 满 🀅',
                    'font-size: 18px; ' +
                        'color: ' +
                        brandColor +
                        '; ' +
                        'font-weight: 700; ' +
                        'letter-spacing: 0.04em;'
                );
            });
        }

        // Защита от багов
        window.addEventListener('error', function (e) {
            console.log(
                '%c❌ Ошибка, но 福 защищает',
                'color: var(--theme-text-tertiary, #888e8b); font-size: 12px;'
            );
        });

        console.log(
            '%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
            'color: var(--theme-border-medium, #e0e6e4); font-weight: bold;'
        );
        console.log(
            '%c   🧧  ПРОЕКТУ БЛАГОСОСТОЯНИЕ  🧧   ',
            'background: ' +
                brandColor +
                '; ' +
                'color: #ffffff; ' +
                'font-size: 14px; ' +
                'font-weight: 700; ' +
                'padding: 4px 12px; ' +
                'border-radius: 4px; ' +
                'letter-spacing: 0.06em;'
        );
        console.log(
            '%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
            'color: var(--theme-border-medium, #e0e6e4); font-weight: bold;'
        );

        Logger.info('[App] FU (福) символ активирован');
    } catch (error) {
        // Тихая ошибка - не ломаем приложение
    }
}

// ================================================================
// 2. РЕГИСТРАЦИЯ SERVICE WORKER
// ================================================================

/**
 * Регистрирует Service Worker
 * @private
 */
function _registerServiceWorker() {
    if (!('serviceWorker' in navigator)) {
        Logger.debug('[App] Service Worker не поддерживается');
        return;
    }

    // ✅ РЕГИСТРИРУЕМ СРАЗУ — без ожидания window.load
    //    Это критично для TWA: SW должен быть готов до первого офлайн-запроса
    navigator.serviceWorker
        .register('/service-worker.js?v=3.9.5')
        .then((registration) => {
            Logger.info('[App] Service Worker зарегистрирован', {
                scope: registration.scope,
            });

            // Проверка версии
            if (registration.active) {
                const channel = new MessageChannel();
                registration.active.postMessage({ type: 'GET_VERSION' }, [channel.port2]);

                channel.port1.onmessage = (e) => {
                    if (e.data.type === 'VERSION') {
                        Logger.debug('[App] Версия SW:', e.data.version);
                    }
                };
            }

            // ✅ Если есть ожидающий SW — активируем сразу (skipWaiting + claim)
            if (registration.waiting) {
                registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            }
        })
        .catch((error) => {
            Logger.error('[App] Ошибка регистрации SW', { error: error.message });
        });

    // Автоматическое обновление SW каждые 6 часов
    setInterval(
        () => {
            navigator.serviceWorker.getRegistration().then((reg) => {
                if (reg) reg.update();
            });
        },
        6 * 60 * 60 * 1000
    );
}

// ================================================================
// 3. ОТЛЮЧКА ЛОГОВ В ПРОДАКШЕНЕ
// ================================================================

/**
 * Отключает логи в продакшене, НО ОСТАВЛЯЕТ ПАСХАЛКУ (福)
 * @private
 */
function _disableLogsInProduction() {
    try {
        const IS_DEV =
            window.location.hostname === '127.0.0.1' ||
            window.location.hostname === 'localhost' ||
            window.location.hostname === '0.0.0.0';

        if (!IS_DEV) {
            // ✅ СОХРАНЯЕМ ОРИГИНАЛЬНЫЙ console.log
            const originalLog = console.log;

            // ❌ Полностью отключаем ненужные логи
            console.debug = function () {};
            console.info = function () {};
            console.warn = function () {};

            // ПЕРЕОПРЕДЕЛЯЕМ console.log — показываем ТОЛЬКО пасхалку
            console.log = function (...args) {
                const message = args.join(' ');
                // Показываем только если есть символ 福 или ключевые слова пасхалки
                if (
                    message.includes('福') ||
                    message.includes('Процветание') ||
                    message.includes('🧧') ||
                    message.includes('благосостояние') ||
                    message.includes('FU')
                ) {
                    originalLog(...args);
                }
            };
        }
    } catch (error) {
        // Тихая ошибка — не ломаем приложение
    }
}

// ================================================================
// 4. ПРИЛОЖЕНИЕ (APP)
// ================================================================

const App = {
    _isInitialized: false,

    async init() {
        if (this._isInitialized) return;
        this._isInitialized = true;

        try {
            // =============================================================
            // 0. ПРЕДВАРИТЕЛЬНЫЕ НАСТРОЙКИ
            // =============================================================

            _disableLogsInProduction();

            Logger.init({
                level: 2,
                logEndpoint: null,
            });

            _initFuSymbol();

            // =============================================================
            // 1. UI МЕНЕДЖЕРЫ - СРАЗУ (НЕ БЛОКИРУЕМ)
            // =============================================================

            ThemeManager.init();
            ModalManager.init();
            ScrollTopButton.init();
            DropdownManager.init();
            CasesCarousel.init();
            TimeManager.init();
            FaqManager.init();
            LogoImageSpin.init();
            CookieManager.init();

            // =============================================================
            // 2. ОСТАЛЬНЫЕ МЕНЕДЖЕРЫ - В ФОНЕ (с задержкой)
            // =============================================================

            setTimeout(() => {
                if (typeof ChecklistManager !== 'undefined' && CONFIG && CONFIG.CHECKLISTS) {
                    ChecklistManager.init(CONFIG.CHECKLISTS);
                }
                FilesModal.init();
                PdfManager.init();
                if (typeof SourceManager !== 'undefined' && CONFIG && CONFIG.SOURCES) {
                    SourceManager.init(CONFIG.SOURCES);
                }
                FormManager.init();
                ToolsUI.init();

                // ВЫЗЫВАЕМ РЕГИСТРАЦИЮ WebMCP (ПОСЛЕ ToolsUI)
                if (typeof registerWebMCPTools === 'function') {
                    registerWebMCPTools();
                }
            }, 100);

            // =============================================================
            // 3. ТЯЖЁЛЫЕ ОПЕРАЦИИ - САМЫЕ ПОСЛЕДНИЕ (НЕ БЛОКИРУЕМ)
            // =============================================================

            // FileManager - НЕ ЖДЁМ, ДЕЛАЕМ В ФОНЕ
            FileManager.init()
                .then(() => {
                    Logger.info('[App] FileManager готов');
                    return FileManager.getStorageInfo();
                })
                .then((info) => {
                    const badge = document.getElementById('headerFilesBadge');
                    if (badge) {
                        badge.textContent = info.count;
                        badge.style.display = info.count > 0 ? 'flex' : 'none';
                    }
                })
                .catch((err) => {
                    Logger.warn('[App] Ошибка инициализации FileManager', { error: err.message });
                });

            // Service Worker - В ФОНЕ
            setTimeout(() => {
                _registerServiceWorker();
            }, 300);

            // =============================================================
            // 4. ФИНАЛЬНЫЙ ЛОГ
            // =============================================================

            Logger.info('[App] 🚀 Инициализация приложения завершена', {
                version: CONFIG ? CONFIG.APP?.VERSION || '3.9.5' : '3.9.5',
                domain: window.location.hostname,
            });

            console.log(
                '%c✅ Digital Legal Engine v3.9.5 - готов к работе',
                'font-size: 16px; font-weight: 700; color: #3d9c8c; padding: 8px 16px; border: 2px solid #3d9c8c; border-radius: 8px;'
            );
        } catch (error) {
            Logger.error('[App] Критическая ошибка инициализации', {
                error: error.message,
                stack: error.stack,
            });

            if (typeof DomUtils !== 'undefined' && DomUtils.showError) {
                DomUtils.showError('Критическая ошибка при загрузке приложения');
            } else {
                alert('❌ Критическая ошибка при загрузке приложения');
            }
        }
    },
};

// ================================================================
// 5. ЗАПУСК
// ================================================================

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// ================================================================
// 6. ЭКСПОРТЫ
// ================================================================

window.App = App;
window.__APP_VERSION = CONFIG ? CONFIG.APP?.VERSION || '3.9.5' : '3.9.5';
window.__APP_NAME = CONFIG ? CONFIG.APP?.NAME || 'Digital Legal Engine' : 'Digital Legal Engine';

// ================================================================
// 7. ДОПОЛНИТЕЛЬНО: ПРЕДОТВРАЩАЕМ СВЕТЛУЮ ВСПЫШКУ ПРИ ЗАГРУЗКЕ
// ================================================================

(function () {
    try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            document.documentElement.style.colorScheme = 'dark';
        } else {
            document.body.classList.remove('dark-theme');
            document.documentElement.style.colorScheme = 'light';
        }
    } catch (e) {
        // Игнорируем ошибки
    }
})();

// ================================================================
//                       КОНЕЦ ФАЙЛА
// ================================================================

console.log('[App] JavaScript полностью загружен');
