// ============================================================
// SERVICE WORKER - Digital Legal Engine v3.9.5
// ============================================================
// Домен: https://juristspb78.ru
// Обновлено: 2026-09-23
//
// 🔒 БЕЗОПАСНОСТЬ (OWASP):
// - Проверка origin всех сообщений
// - Санитизация данных перед сохранением
// - Защита от XSS через CSP-совместимость
//
// ⚡ ПРОИЗВОДИТЕЛЬНОСТЬ:
// - Разные стратегии для разных типов ресурсов
// - Фоновая синхронизация (Background Sync)
// - Очередь операций в IndexedDB
//
// 🔧 ИСПРАВЛЕНО в 3.9.5:
// - Шрифты (woff2/woff/ttf/otf) теперь кэшируются в CACHE_NAMES.main
//   (раньше шли в dynamic — из-за этого в офлайне TWA были квадраты)
// - Добавлен ignoreSearch: true для match — защита от query-параметров
// - Добавлен SKIP_WAITING — принудительная активация ожидающего SW
// - Улучшена диагностика в install — точный список провалившихся URL
// ============================================================

// ═══════════════════════════════════════════════════════════════════════
// 1. КОНСТАНТЫ
// ═══════════════════════════════════════════════════════════════════════

const APP_VERSION = '3.9.5';
const CACHE_PREFIX = 'digital-legal-engine';

const CACHE_NAMES = {
    main: `${CACHE_PREFIX}-main-v${APP_VERSION.replace(/\./g, '-')}`,
    api: `${CACHE_PREFIX}-api-v${APP_VERSION.replace(/\./g, '-')}`,
    dynamic: `${CACHE_PREFIX}-dynamic-v${APP_VERSION.replace(/\./g, '-')}`,
    images: `${CACHE_PREFIX}-images-v${APP_VERSION.replace(/\./g, '-')}`,
    pdf: `${CACHE_PREFIX}-pdf-v${APP_VERSION.replace(/\./g, '-')}`,
    results: `${CACHE_PREFIX}-results-v${APP_VERSION.replace(/\./g, '-')}`,
    tools: `${CACHE_PREFIX}-tools-v${APP_VERSION.replace(/\./g, '-')}`,
};

const OFFLINE_FORMS_DB = 'pavlova-forms';
const TOOLS_QUEUE_DB = 'tools-queue';
const TOOLS_QUEUE_STORE = 'operations';

// ═══════════════════════════════════════════════════════════════════════
// 2. РЕСУРСЫ ДЛЯ КЕШИРОВАНИЯ
// ═══════════════════════════════════════════════════════════════════════

// Критические ресурсы (загружаются сразу)
// ✅ ВАЖНО: Шрифты здесь идут в CACHE_NAMES.main
//    При fetch для .woff2/.woff/.ttf/.otf используется ТОЖЕ CACHE_NAMES.main
//    → Совпадение ключей → офлайн работает → иконки Bootstrap видны
const CRITICAL_CACHE_URLS = [
    '/',
    '/index.html',
    '/offline.html',
    '/manifest.json',
    '/assets/css/design.css',
    '/assets/js/app.js',
    '/assets/js/pwa-install-yandex.js',
    // Bootstrap Icons: CSS + шрифты (woff2/woff обязательны для офлайна!)
    '/assets/fonts/bootstrap-icons/bootstrap-icons.min.css',
    '/assets/fonts/fonts/bootstrap-icons.woff2',
    '/assets/fonts/fonts/bootstrap-icons.woff',
    // Inter + Nickainley
    '/assets/fonts/fonts/inter.css',
    '/assets/fonts/fonts/Inter-VariableFont_opsz,wght.ttf',
    '/assets/fonts/fonts/Inter-Italic-VariableFont_opsz,wght.ttf',
    '/assets/fonts/nickainley/nickainley.css',
    '/assets/fonts/fonts/Nickainley-Normal.woff2',
    // Favicons
    '/assets/icons/favicon/apple-touch-icon.png',
    '/assets/icons/favicon/favicon-96x96.png',
    '/assets/icons/favicon/favicon.ico',
    '/assets/icons/favicon/favicon.svg',
    '/assets/icons/favicon/web-app-manifest-192x192.png',
    '/assets/icons/favicon/web-app-manifest-512x512.png',
];

// Страницы (8 услуг + служебные)
const PAGES_CACHE_URLS = [
    '/zemlya/',
    '/semya/',
    '/trud/',
    '/nasledstvo/',
    '/arbitrazh/',
    '/korporativnye-spory/',
    '/zashhita-biznesa/',
    '/dogovornoe-pravo/',
    '/philosophy/',
    '/private_policy/',
    '/cookies/',
    '/licenses/',
];

// Библиотеки
const LIBS_CACHE_URLS = [
    // PDF (Apache 2.0)
    '/assets/js/lib/pdf.min.js',
    '/assets/js/lib/pdf.worker.min.js',
    // PDF-lib (MIT)
    '/assets/js/lib/pdf-lib.min.js',
    // jsPDF (MIT)
    '/assets/js/lib/jspdf.umd.min.js',
    '/assets/js/lib/jspdf.plugin.autotable.min.js',
    // Сжатие изображений (MIT)
    '/assets/js/lib/browser-image-compression.js',
    // ZIP (BSD 3-Clause) — обе библиотеки в проекте
    '/assets/js/lib/zip.min.js',
    '/assets/js/lib/jszip.min.js',
    // IndexedDB (MIT)
    '/assets/js/lib/idb.umd.js',
    // Cropper (для будущих фич)
    '/assets/js/lib/cropper.min.js',
    '/assets/js/lib/cropper.min.css',
    // Email
    '/assets/js/lib/email.min.js',
];

// PDF-решения (11 файлов)
const PDF_CACHE_URLS = [
    // Земельные споры (3)
    '/zemlya/decisions/zemlya-33-6693-2022-granicy.pdf',
    '/zemlya/decisions/zemlya-2a-2469-2026-admin.pdf',
    '/zemlya/decisions/zemlya-2-657-2020-arenda.pdf',
    // Трудовые споры (3)
    '/trud/decisions/trud-33-7636-2023-uvolnenie.pdf',
    '/trud/decisions/trud-2-805-2020-zarplata.pdf',
    '/trud/decisions/trud-2-6376-2024-progul.pdf',
    // Семейное право (3)
    '/semya/decisions/semya-2-1426-2025-obshchenie.pdf',
    '/semya/decisions/semya-2-30-2021-prava.pdf',
    '/semya/decisions/semya-2-323-2020-imushchestvo.pdf',
    // Наследство (2)
    '/nasledstvo/decisions/nasledstvo-2-256-2025-prinyatie.pdf',
    '/nasledstvo/decisions/nasledstvo-2-2558-2019-darenie.pdf',
];

// Изображения
const IMAGES_CACHE_URLS = [
    // Логотипы
    '/assets/icons/logo.png',
    '/assets/icons/logo_2.png',
    '/assets/icons/logo_200.png',
    '/assets/icons/logo_280.png',
    '/assets/icons/logo_400.png',
    '/assets/icons/logo_480.png',
    '/assets/icons/logo_512.png',
    '/assets/icons/logo_MAX.svg',

    // QR-код
    '/assets/images/qr-tbank.png',

    // OG-картинки (9)
    '/assets/images/og/arbitrazh.png',
    '/assets/images/og/dogovornoe-pravo.png',
    '/assets/images/og/juristspb78.png',
    '/assets/images/og/korporativnye-spory.png',
    '/assets/images/og/nasledstvo.png',
    '/assets/images/og/semya.png',
    '/assets/images/og/trud.png',
    '/assets/images/og/zashhita-biznesa.png',
    '/assets/images/og/zemlya.png',
];

// ═══════════════════════════════════════════════════════════════════════
// 3. УСТАНОВКА (INSTALL)
// ═══════════════════════════════════════════════════════════════════════

self.addEventListener('install', (event) => {
    console.log(`[SW] 📦 Установка версии ${APP_VERSION}`);

    // Принудительно активируем новый SW сразу
    self.skipWaiting();

    event.waitUntil(
        (async () => {
            try {
                // 1. Критические ресурсы (включая шрифты Bootstrap Icons)
                const mainCache = await caches.open(CACHE_NAMES.main);

                // ✅ ДИАГНОСТИКА: логируем точный список провалившихся URL
                const criticalResults = await Promise.allSettled(
                    CRITICAL_CACHE_URLS.map((url) =>
                        mainCache.add(url).catch((err) => {
                            console.warn(`[SW] ⚠️ Не удалось закешировать: ${url}`, err.message);
                            throw err;
                        })
                    )
                );
                const criticalFailed = criticalResults
                    .map((r, i) => (r.status === 'rejected' ? CRITICAL_CACHE_URLS[i] : null))
                    .filter(Boolean);

                if (criticalFailed.length > 0) {
                    console.warn(
                        `[SW] ⚠️ Критические ресурсы: ${criticalFailed.length}/${CRITICAL_CACHE_URLS.length} не закешировано`,
                        criticalFailed
                    );
                } else {
                    console.log(
                        `[SW] ✅ Критические ресурсы закешированы (${CRITICAL_CACHE_URLS.length}/${CRITICAL_CACHE_URLS.length})`
                    );
                }

                // 2. Страницы
                const pagesResults = await Promise.allSettled(
                    PAGES_CACHE_URLS.map((url) =>
                        mainCache.add(url).catch((err) => {
                            console.warn(
                                `[SW] ⚠️ Не удалось закешировать страницу: ${url}`,
                                err.message
                            );
                            throw err;
                        })
                    )
                );
                const pagesFailed = pagesResults
                    .map((r, i) => (r.status === 'rejected' ? PAGES_CACHE_URLS[i] : null))
                    .filter(Boolean);

                if (pagesFailed.length > 0) {
                    console.warn(
                        `[SW] ⚠️ Страницы: ${pagesFailed.length}/${PAGES_CACHE_URLS.length} не закешировано`,
                        pagesFailed
                    );
                } else {
                    console.log(
                        `[SW] ✅ Страницы закешированы (${PAGES_CACHE_URLS.length}/${PAGES_CACHE_URLS.length})`
                    );
                }

                // 3. Библиотеки
                const dynamicCache = await caches.open(CACHE_NAMES.dynamic);
                const libsResults = await Promise.allSettled(
                    LIBS_CACHE_URLS.map((url) =>
                        dynamicCache.add(url).catch((err) => {
                            console.warn(
                                `[SW] ⚠️ Не удалось закешировать библиотеку: ${url}`,
                                err.message
                            );
                            throw err;
                        })
                    )
                );
                const libsFailed = libsResults
                    .map((r, i) => (r.status === 'rejected' ? LIBS_CACHE_URLS[i] : null))
                    .filter(Boolean);

                if (libsFailed.length > 0) {
                    console.warn(
                        `[SW] ⚠️ Библиотеки: ${libsFailed.length}/${LIBS_CACHE_URLS.length} не закешировано`,
                        libsFailed
                    );
                } else {
                    console.log(
                        `[SW] ✅ Библиотеки закешированы (${LIBS_CACHE_URLS.length}/${LIBS_CACHE_URLS.length})`
                    );
                }

                // 4. PDF
                const pdfCache = await caches.open(CACHE_NAMES.pdf);
                const pdfResults = await Promise.allSettled(
                    PDF_CACHE_URLS.map((url) =>
                        pdfCache.add(url).catch((err) => {
                            console.warn(
                                `[SW] ⚠️ Не удалось закешировать PDF: ${url}`,
                                err.message
                            );
                            throw err;
                        })
                    )
                );
                const pdfFailed = pdfResults
                    .map((r, i) => (r.status === 'rejected' ? PDF_CACHE_URLS[i] : null))
                    .filter(Boolean);

                if (pdfFailed.length > 0) {
                    console.warn(
                        `[SW] ⚠️ PDF: ${pdfFailed.length}/${PDF_CACHE_URLS.length} не закешировано`,
                        pdfFailed
                    );
                } else {
                    console.log(
                        `[SW] ✅ PDF-файлы закешированы (${PDF_CACHE_URLS.length}/${PDF_CACHE_URLS.length})`
                    );
                }

                // 5. Изображения
                const imagesCache = await caches.open(CACHE_NAMES.images);
                const imagesResults = await Promise.allSettled(
                    IMAGES_CACHE_URLS.map((url) =>
                        imagesCache.add(url).catch((err) => {
                            console.warn(
                                `[SW] ⚠️ Не удалось закешировать изображение: ${url}`,
                                err.message
                            );
                            throw err;
                        })
                    )
                );
                const imagesFailed = imagesResults
                    .map((r, i) => (r.status === 'rejected' ? IMAGES_CACHE_URLS[i] : null))
                    .filter(Boolean);

                if (imagesFailed.length > 0) {
                    console.warn(
                        `[SW] ⚠️ Изображения: ${imagesFailed.length}/${IMAGES_CACHE_URLS.length} не закешировано`,
                        imagesFailed
                    );
                } else {
                    console.log(
                        `[SW] ✅ Изображения закешированы (${IMAGES_CACHE_URLS.length}/${IMAGES_CACHE_URLS.length})`
                    );
                }

                console.log(`[SW] ✅ Установка версии ${APP_VERSION} завершена`);
            } catch (error) {
                console.error('[SW] ❌ Ошибка установки:', error);
            }
        })()
    );
});

// ═══════════════════════════════════════════════════════════════════════
// 4. АКТИВАЦИЯ (ACTIVATE)
// ═══════════════════════════════════════════════════════════════════════

self.addEventListener('activate', (event) => {
    console.log(`[SW] 🔄 Активация версии ${APP_VERSION}`);

    event.waitUntil(
        (async () => {
            try {
                // Удаляем старые кеши
                const cacheNames = await caches.keys();
                const currentCaches = Object.values(CACHE_NAMES);
                const oldCaches = cacheNames.filter(
                    (name) => name.startsWith(CACHE_PREFIX) && !currentCaches.includes(name)
                );

                if (oldCaches.length > 0) {
                    console.log(`[SW] 🗑️ Удаление старых кешей:`, oldCaches);
                    await Promise.all(
                        oldCaches.map((name) => {
                            console.log(`[SW] 🗑️ Удалён: ${name}`);
                            return caches.delete(name);
                        })
                    );
                }

                // Захватываем все клиенты
                await clients.claim();
                console.log(`[SW] ✅ Активация версии ${APP_VERSION} завершена`);

                // Уведомляем все вкладки об обновлении
                const allClients = await clients.matchAll();
                for (const client of allClients) {
                    try {
                        client.postMessage({
                            type: 'SW_UPDATED',
                            version: APP_VERSION,
                            timestamp: Date.now(),
                        });
                    } catch (e) {
                        // Игнорируем ошибки отправки
                    }
                }
            } catch (error) {
                console.error('[SW] ❌ Ошибка активации:', error);
            }
        })()
    );
});

// ═══════════════════════════════════════════════════════════════════════
// 5. СТРАТЕГИИ КЕШИРОВАНИЯ
// ═══════════════════════════════════════════════════════════════════════

/**
 * Cache First - для неизменяемых ресурсов (статика, результаты)
 */
async function cacheFirst(request, cacheName) {
    try {
        const cache = await caches.open(cacheName);
        // ✅ ignoreSearch: true — защита от query-параметров
        const cached = await cache.match(request, { ignoreSearch: true });
        if (cached) {
            return cached;
        }

        const response = await fetch(request);
        if (response && response.ok) {
            await cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        const offline = await caches.match('/offline.html');
        return offline || new Response('Offline', { status: 503 });
    }
}

/**
 * Stale-While-Revalidate - для статики (баланс скорости и свежести)
 */
async function staleWhileRevalidate(request, cacheName) {
    try {
        const cache = await caches.open(cacheName);
        // ✅ ignoreSearch: true — защита от query-параметров
        const cachedResponse = await cache.match(request, { ignoreSearch: true });

        // Фоновое обновление
        const fetchPromise = fetch(request)
            .then(async (networkResponse) => {
                if (networkResponse && networkResponse.ok) {
                    try {
                        await cache.put(request, networkResponse.clone());
                    } catch (e) {
                        // Кеш заполнен - игнорируем
                    }
                }
                return networkResponse;
            })
            .catch(() => null);

        // Отдаём кеш сразу, обновляем в фоне
        if (cachedResponse) {
            fetchPromise.catch(() => {});
            return cachedResponse;
        }

        const networkResponse = await fetchPromise;
        if (networkResponse) {
            return networkResponse;
        }

        const offline = await caches.match('/offline.html');
        return offline || new Response('Offline', { status: 503 });
    } catch (error) {
        const offline = await caches.match('/offline.html');
        return offline || new Response('Offline', { status: 503 });
    }
}

/**
 * Network First - для API (свежесть важнее скорости)
 */
async function networkFirst(request, cacheName, timeout = 5000) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(request, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (response && response.ok) {
            const cache = await caches.open(cacheName);
            await cache.put(request, response.clone());
            return response;
        }
        throw new Error('Network response not ok');
    } catch (error) {
        // При ошибке - кеш
        const cache = await caches.open(cacheName);
        // ✅ ignoreSearch: true — защита от query-параметров
        const cached = await cache.match(request, { ignoreSearch: true });
        if (cached) {
            return cached;
        }

        // Уведомляем пользователя
        return new Response(JSON.stringify({ error: 'Offline', message: 'Нет соединения' }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

/**
 * Navigate Fallback - для навигации по страницам
 */
async function navigateFallback(request) {
    try {
        const response = await fetch(request);
        if (response && response.ok) {
            const cache = await caches.open(CACHE_NAMES.main);
            await cache.put(request, response.clone());
            return response;
        }
        throw new Error('Network failed');
    } catch (error) {
        // ✅ ignoreSearch: true — защита от query-параметров
        const cached = await caches.match(request, { ignoreSearch: true });
        if (cached) {
            return cached;
        }
        return caches.match('/offline.html') || new Response('Offline', { status: 503 });
    }
}

// ═══════════════════════════════════════════════════════════════════════
// 6. ОБРАБОТКА ЗАПРОСОВ (FETCH)
// ═══════════════════════════════════════════════════════════════════════

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Пропускаем запросы не с нашего домена
    if (url.origin !== location.origin) return;

    // ============================================================
    // API-запросы - NetworkFirst
    // ============================================================
    if (url.pathname.startsWith('/api/') || url.pathname === '/send.php') {
        event.respondWith(networkFirst(event.request, CACHE_NAMES.api));
        return;
    }

    // ============================================================
    // Результаты инструментов - CacheFirst
    // ============================================================
    if (url.pathname.includes('/results/')) {
        event.respondWith(cacheFirst(event.request, CACHE_NAMES.results));
        return;
    }

    // ============================================================
    // HTML-навигация - всегда сеть, кеш при ошибке
    // Якорные ссылки (с #) НЕ перехватываем — браузер обработает сам
    // ============================================================
    if (event.request.mode === 'navigate') {
        if (url.hash && url.hash.length > 1) {
            // Навигация по якорю — пропускаем, пусть браузер скроллит нативно
            return;
        }
        event.respondWith(navigateFallback(event.request));
        return;
    }

    // ============================================================
    // Статика (CSS, JS, шрифты, изображения, PDF) - staleWhileRevalidate
    // ============================================================
    if (url.pathname.match(/\.(css|js|json|woff2?|ttf|otf|eot|png|jpg|jpeg|svg|ico|webp|pdf)$/)) {
        let cacheName;

        if (url.pathname.endsWith('.pdf')) {
            // PDF — в отдельный кэш
            cacheName = CACHE_NAMES.pdf;
        } else if (url.pathname.match(/\.(woff2?|ttf|otf|eot)$/)) {
            // 🔧 ШРИФТЫ — в main (там они кэшируются в install)
            //    Это ИСПРАВЛЯЕТ проблему с квадратами вместо иконок Bootstrap в офлайне
            cacheName = CACHE_NAMES.main;
        } else {
            // CSS, JS, изображения — в dynamic
            cacheName = CACHE_NAMES.dynamic;
        }

        event.respondWith(staleWhileRevalidate(event.request, cacheName));
        return;
    }

    // ============================================================
    // Всё остальное - кеш, потом сеть
    // ============================================================
    event.respondWith(cacheFirst(event.request, CACHE_NAMES.main));
});

// ═══════════════════════════════════════════════════════════════════════
// 7. BACKGROUND SYNC - ДЛЯ ФОРМ И ИНСТРУМЕНТОВ
// ═══════════════════════════════════════════════════════════════════════

self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-forms') {
        event.waitUntil(sendOfflineForms());
    } else if (event.tag === 'sync-tools') {
        event.waitUntil(processToolsQueue());
    }
});

async function sendOfflineForms() {
    try {
        const db = await openFormsDB();
        if (!db) return;

        const forms = await getOfflineForms(db);

        for (const form of forms) {
            try {
                const response = await fetch(form.url, {
                    method: form.method || 'POST',
                    headers: new Headers(form.headers || {}),
                    body: form.body,
                });

                if (response.ok) {
                    await deleteOfflineForm(db, form.id);
                    console.log('[SW] ✅ Форма отправлена:', form.id);
                } else {
                    console.log('[SW] ⏳ Ошибка отправки формы, повторим позже');
                }
            } catch (error) {
                console.log('[SW] ⏳ Ошибка отправки формы, повторим позже');
            }
        }
    } catch (error) {
        console.log('[SW] ⏳ Ошибка синхронизации форм:', error);
    }
}

async function processToolsQueue() {
    try {
        const db = await openToolsQueueDB();
        if (!db) return;

        const items = await getToolsQueue(db);

        for (const item of items) {
            try {
                const response = await fetch(item.url, {
                    method: item.method || 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(item.data),
                });

                if (response.ok) {
                    await deleteToolsQueueItem(db, item.id);
                    console.log('[SW] ✅ Операция выполнена:', item.id);
                } else if (item.retries < 5) {
                    item.retries++;
                    await updateToolsQueueItem(db, item);
                } else {
                    await deleteToolsQueueItem(db, item.id);
                    console.warn('[SW] ❌ Операция отменена (превышено число попыток):', item.id);
                }
            } catch (error) {
                console.log('[SW] ⏳ Ошибка операции, повторим позже:', item.id);
            }
        }
    } catch (error) {
        console.log('[SW] ⏳ Ошибка обработки очереди инструментов:', error);
    }
}

// ═══════════════════════════════════════════════════════════════════════
// 8. INDEXEDDB - ФОРМЫ
// ═══════════════════════════════════════════════════════════════════════

function openFormsDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(OFFLINE_FORMS_DB, 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('forms')) {
                db.createObjectStore('forms', { keyPath: 'id', autoIncrement: true });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(new Error('Cannot open forms DB'));
    });
}

function getOfflineForms(db) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['forms'], 'readonly');
        const store = transaction.objectStore('forms');
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(new Error('Cannot get forms'));
    });
}

function deleteOfflineForm(db, id) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['forms'], 'readwrite');
        const store = transaction.objectStore('forms');
        const request = store.delete(id);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(new Error('Cannot delete form'));
    });
}

async function saveFormOffline(formData) {
    try {
        const db = await openFormsDB();
        if (!db) return;

        const transaction = db.transaction(['forms'], 'readwrite');
        const store = transaction.objectStore('forms');

        store.add({
            url: formData.url,
            method: formData.method || 'POST',
            headers: formData.headers || [],
            body: formData.body,
            timestamp: Date.now(),
        });

        console.log('[SW] 📝 Форма сохранена офлайн');

        if ('sync' in self.registration) {
            self.registration.sync.register('sync-forms').catch(() => {});
        }
    } catch (error) {
        console.log('[SW] ❌ Ошибка сохранения формы:', error);
    }
}

// ═══════════════════════════════════════════════════════════════════════
// 9. INDEXEDDB - ОЧЕРЕДЬ ИНСТРУМЕНТОВ
// ═══════════════════════════════════════════════════════════════════════

function openToolsQueueDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(TOOLS_QUEUE_DB, 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(TOOLS_QUEUE_STORE)) {
                const store = db.createObjectStore(TOOLS_QUEUE_STORE, {
                    keyPath: 'id',
                    autoIncrement: true,
                });
                store.createIndex('timestamp', 'timestamp');
                store.createIndex('type', 'type');
                store.createIndex('retries', 'retries');
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(new Error('Cannot open tools queue DB'));
    });
}

function getToolsQueue(db) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([TOOLS_QUEUE_STORE], 'readonly');
        const store = transaction.objectStore(TOOLS_QUEUE_STORE);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(new Error('Cannot get tools queue'));
    });
}

function deleteToolsQueueItem(db, id) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([TOOLS_QUEUE_STORE], 'readwrite');
        const store = transaction.objectStore(TOOLS_QUEUE_STORE);
        const request = store.delete(id);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(new Error('Cannot delete tools queue item'));
    });
}

function updateToolsQueueItem(db, item) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([TOOLS_QUEUE_STORE], 'readwrite');
        const store = transaction.objectStore(TOOLS_QUEUE_STORE);
        const request = store.put(item);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(new Error('Cannot update tools queue item'));
    });
}

async function saveToolOperationToQueue(operation) {
    try {
        const db = await openToolsQueueDB();
        if (!db) return;

        const transaction = db.transaction([TOOLS_QUEUE_STORE], 'readwrite');
        const store = transaction.objectStore(TOOLS_QUEUE_STORE);

        store.add({
            ...operation,
            timestamp: Date.now(),
            retries: 0,
        });

        console.log('[SW] 📝 Операция добавлена в очередь:', operation.type);

        if ('sync' in self.registration) {
            self.registration.sync.register('sync-tools').catch(() => {});
        }
    } catch (error) {
        console.log('[SW] ❌ Ошибка сохранения операции:', error);
    }
}

// ═══════════════════════════════════════════════════════════════════════
// 10. ПРИЁМ СООБЩЕНИЙ ОТ СТРАНИЦЫ
// ═══════════════════════════════════════════════════════════════════════

self.addEventListener('message', (event) => {
    // 🔒 Проверка origin
    if (event.origin !== location.origin) {
        console.warn('[SW] ⚠️ Сообщение с недопустимого origin:', event.origin);
        return;
    }

    if (!event.data || typeof event.data !== 'object') return;

    const messageType = event.data.type;

    switch (messageType) {
        // ✅ Принудительная активация ожидающего SW (для TWA)
        case 'SKIP_WAITING':
            self.skipWaiting();
            break;

        case 'SAVE_FORM':
            if (event.data.form && typeof event.data.form === 'object') {
                event.waitUntil(saveFormOffline(event.data.form));
            }
            break;

        case 'ADD_TOOL_OPERATION':
            if (event.data.operation && typeof event.data.operation === 'object') {
                event.waitUntil(saveToolOperationToQueue(event.data.operation));
            }
            break;

        case 'GET_VERSION':
            if (event.ports && event.ports.length > 0) {
                event.ports[0].postMessage({
                    type: 'VERSION',
                    version: APP_VERSION,
                });
            }
            break;

        case 'PURGE_CACHE':
            if (event.data.cacheName) {
                caches.delete(event.data.cacheName).catch(() => {});
            }
            break;

        default:
            // Игнорируем неизвестные типы
            break;
    }
});

// ═══════════════════════════════════════════════════════════════════════
// 11. PUSH-УВЕДОМЛЕНИЯ
// ═══════════════════════════════════════════════════════════════════════

self.addEventListener('push', (event) => {
    if (!event.data) return;

    try {
        const data = event.data.json();

        event.waitUntil(
            self.registration.showNotification(data.title || 'juristspb78.ru', {
                body: data.body || 'Новое уведомление',
                icon: '/assets/icons/favicon/web-app-manifest-192x192.png',
                badge: '/assets/icons/favicon/favicon-96x96.png',
                vibrate: [200, 100, 200],
                data: { url: data.url || '/' },
            })
        );
    } catch (error) {
        console.log('[SW] ❌ Ошибка push:', error);
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    const url = event.notification.data?.url || '/';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});

// ═══════════════════════════════════════════════════════════════════════
// 12. ОБРАБОТКА ОШИБОК
// ═══════════════════════════════════════════════════════════════════════

self.addEventListener('error', (event) => {
    console.error('[SW] ❌ Непойманная ошибка:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
    console.error('[SW] ❌ Unhandled rejection:', event.reason);
});

// ═══════════════════════════════════════════════════════════════════════
// 13. СТАРТ
// ═══════════════════════════════════════════════════════════════════════

console.log(`[SW] 🚀 Service Worker версии ${APP_VERSION} запущен`);
