// ═══════════════════════════════════════════════════════════════════════
//  PWA INSTALL BANNER - Digital Legal Engine
// ═══════════════════════════════════════════════════════════════════════
//
//  Версия:    3.9.5
//  Автор:     Михель Руслан
//  Лицензия:  Безвозмездная (ИП Павлова Т.В.)
//
//  Описание:  Кастомный баннер установки PWA
//             ✅ Универсальный - работает во всех браузерах
//             ✅ По центру снизу
//             ✅ Самодостаточные стили (без привязки к design.css)
//
// ═══════════════════════════════════════════════════════════════════════

(function () {
    'use strict';

    // ─── 1. КОНСТАНТЫ ────────────────────────────────────────────────

    const STORAGE = {
        CLOSED: 'pwa_banner_closed',
        LAST_SHOW: 'pwa_banner_last_show',
        VISIT_COUNT: 'pwa_visit_count',
        INSTALLED: 'pwa_installed',
        LAST_VISIT_DATE: 'pwa_last_visit_date',
    };

    const CONFIG = {
        MIN_VISITS: 2,
        MIN_TIME_ON_PAGE: 30000, // 30 секунд
        COOLDOWN_DAYS: 7,
        DEBUG: false,
        BANNER_ID: 'pwaInstallBanner',
        INSTALL_BTN_ID: 'pwaInstallBtn',
        CLOSE_BTN_ID: 'pwaCloseBanner',
    };

    // ─── 2. СОСТОЯНИЕ ────────────────────────────────────────────────

    let deferredPrompt = null;
    let banner = null;
    let timeCheckPassed = false;

    // ─── 3. СТИЛИ (жёсткие значения, дублирующие design.css) ──────

    const styles = `
        .pwa-install-banner {
            position: fixed;
            bottom: 32px;
            left: 50%;
            transform: translateX(-50%) translateY(20px);
            z-index: 500;
            max-width: 420px;
            width: calc(100% - 32px);
            background: #ffffff;
            border-radius: 16px;
            border: 1px solid #e0e6e4;
            box-shadow: 0 32px 72px -16px rgba(26, 34, 40, 0.24);
            padding: 24px 32px 16px;
            box-sizing: border-box;
            opacity: 0;
            pointer-events: none;
            transition: all 500ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pwa-install-banner.visible {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
            pointer-events: auto;
        }

        body.dark-theme .pwa-install-banner {
            background: #182228;
            border-color: #283238;
            box-shadow: 0 32px 72px -16px rgba(0, 0, 0, 0.5);
        }

        .pwa-install-content {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .pwa-install-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
        }

        .pwa-install-text {
            flex: 1;
            text-align: left;
        }

        .pwa-install-text strong {
            display: block;
            font-size: 20px;
            font-weight: 700;
            color: #1a2228;
            letter-spacing: -0.02em;
            line-height: 1.1;
        }

        body.dark-theme .pwa-install-text strong {
            color: #eef0ef;
        }

        .pwa-install-text p {
            margin: 4px 0 0;
            font-size: 14px;
            color: #5a6062;
            line-height: 1.5;
        }

        body.dark-theme .pwa-install-text p {
            color: #b0b8b6;
        }

        .pwa-install-close {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            min-width: 44px;
            min-height: 44px;
            border-radius: 10px;
            background: transparent;
            border: none;
            cursor: pointer;
            color: #888e8b;
            transition: all 150ms cubic-bezier(0.33, 1, 0.68, 1);
            padding: 0;
            flex-shrink: 0;
        }

        .pwa-install-close:hover {
            background: rgba(61, 156, 140, 0.1);
            color: #3d9c8c;
            transform: scale(1.05);
        }

        .pwa-install-close:active {
            transform: scale(0.95);
        }

        .pwa-install-close:focus-visible {
            outline: 3px solid #3d9c8c;
            outline-offset: 3px;
            border-radius: 4px;
        }

        body.dark-theme .pwa-install-close {
            color: #707a78;
        }

        body.dark-theme .pwa-install-close:hover {
            background: rgba(61, 156, 140, 0.1);
            color: #3d9c8c;
        }

        .pwa-install-close i {
            font-size: 20px;
            line-height: 1;
        }

        .pwa-install-content .btn-primary {
            width: 100%;
            padding: 12px 24px;
            font-size: 16px;
            font-weight: 600;
            border-radius: 10px;
            background: linear-gradient(135deg, #3d9c8c, #2d8c7c);
            color: #ffffff;
            border: none;
            cursor: pointer;
            transition: all 250ms cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 2px 8px -2px rgba(26, 34, 40, 0.06), 0 0 40px rgba(61, 156, 140, 0.18);
            text-align: center;
            font-family: inherit;
            line-height: 1.2;
            position: relative;
            overflow: hidden;
            isolation: isolate;
        }

        .pwa-install-content .btn-primary::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            translate: -100% 0;
            transition: translate 500ms cubic-bezier(0.16, 1, 0.3, 1);
            pointer-events: none;
            z-index: -1;
        }

        .pwa-install-content .btn-primary:hover::before {
            translate: 100% 0;
        }

        .pwa-install-content .btn-primary:hover {
            background: linear-gradient(135deg, #4dac9c, #3d9c8c);
            transform: translateY(-2px);
            box-shadow: 0 8px 24px -6px rgba(26, 34, 40, 0.1), 0 0 40px rgba(61, 156, 140, 0.18);
        }

        .pwa-install-content .btn-primary:active {
            transform: translateY(0) scale(0.98);
        }

        .pwa-install-content .btn-primary:focus-visible {
            outline: 3px solid #3d9c8c;
            outline-offset: 3px;
            border-radius: 10px;
        }

        body.dark-theme .pwa-install-content .btn-primary {
            box-shadow: 0 8px 24px -6px rgba(0, 0, 0, 0.6), 0 0 20px rgba(61, 156, 140, 0.2);
        }

        body.dark-theme .pwa-install-content .btn-primary:hover {
            box-shadow: 0 16px 40px -8px rgba(0, 0, 0, 0.7), 0 0 30px rgba(61, 156, 140, 0.25);
        }

        @keyframes pwaSlideUp {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(30px) scale(0.96);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0) scale(1);
            }
        }

        .pwa-install-banner.visible {
            animation: pwaSlideUp 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @media (prefers-reduced-motion: reduce) {
            .pwa-install-banner.visible {
                animation: none !important;
                transition: none !important;
            }
        }

        @media (max-width: 767px) {
            .pwa-install-banner {
                bottom: 12px;
                max-width: 100%;
                width: calc(100% - 12px);
                padding: 12px 16px 8px;
                border-radius: 16px;
            }

            .pwa-install-text strong {
                font-size: 18px;
            }

            .pwa-install-text p {
                font-size: 12px;
            }

            .pwa-install-content .btn-primary {
                font-size: 14px;
                padding: 8px 12px;
            }

            .pwa-install-close {
                width: 36px;
                height: 36px;
                min-width: 36px;
                min-height: 36px;
            }

            .pwa-install-close i {
                font-size: 18px;
            }
        }

        @media (max-width: 479px) {
            .pwa-install-banner {
                padding: 8px 12px 6px;
                width: calc(100% - 8px);
                bottom: 8px;
            }

            .pwa-install-text strong {
                font-size: 16px;
            }
        }

        @media (max-width: 359px) {
            .pwa-install-banner {
                padding: 6px 8px 4px;
            }

            .pwa-install-text strong {
                font-size: 14px;
            }
        }

        @media print {
            .pwa-install-banner {
                display: none !important;
            }
        }
    `;

    // ─── 4. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ────────────────────────────────

    function isInstalled() {
        return (
            window.matchMedia('(display-mode: standalone)').matches ||
            localStorage.getItem(STORAGE.INSTALLED) === 'true'
        );
    }

    function updateVisitCount() {
        const today = new Date().toDateString();
        const lastVisit = localStorage.getItem(STORAGE.LAST_VISIT_DATE);
        let visits = parseInt(localStorage.getItem(STORAGE.VISIT_COUNT) || '0');

        if (lastVisit !== today) {
            visits += 1;
            localStorage.setItem(STORAGE.VISIT_COUNT, String(visits));
            localStorage.setItem(STORAGE.LAST_VISIT_DATE, today);
        }

        if (CONFIG.DEBUG) console.log('[PWA] Визит #' + visits);
    }

    function shouldShowBanner() {
        if (localStorage.getItem(STORAGE.CLOSED) === 'true') {
            if (CONFIG.DEBUG) console.log('[PWA] Закрыто навсегда');
            return false;
        }

        const visits = parseInt(localStorage.getItem(STORAGE.VISIT_COUNT) || '0');
        if (visits < CONFIG.MIN_VISITS) {
            if (CONFIG.DEBUG)
                console.log('[PWA] Мало визитов (' + visits + ' < ' + CONFIG.MIN_VISITS + ')');
            return false;
        }

        const lastShow = localStorage.getItem(STORAGE.LAST_SHOW);
        if (lastShow) {
            const daysSinceLastShow = (Date.now() - parseInt(lastShow)) / (1000 * 60 * 60 * 24);
            if (daysSinceLastShow < CONFIG.COOLDOWN_DAYS) {
                if (CONFIG.DEBUG) {
                    console.log('[PWA] Кулдаун: прошло ' + daysSinceLastShow.toFixed(1) + ' дней');
                }
                return false;
            }
        }

        return true;
    }

    // ─── 5. ВНЕДРЕНИЕ СТИЛЕЙ ────────────────────────────────────────

    function injectStyles() {
        const styleId = 'pwa-install-styles';
        if (document.getElementById(styleId)) return;

        const styleTag = document.createElement('style');
        styleTag.id = styleId;
        styleTag.textContent = styles;
        document.head.appendChild(styleTag);

        if (CONFIG.DEBUG) console.log('[PWA] Стили внедрены');
    }

    // ─── 6. СОЗДАНИЕ БАННЕРА ────────────────────────────────────────

    function createBanner() {
        if (document.getElementById(CONFIG.BANNER_ID)) {
            banner = document.getElementById(CONFIG.BANNER_ID);
            return;
        }

        banner = document.createElement('div');
        banner.id = CONFIG.BANNER_ID;
        banner.className = 'pwa-install-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Установка приложения');
        banner.setAttribute('aria-hidden', 'true');

        const content = document.createElement('div');
        content.className = 'pwa-install-content';

        // ── Хедер ──
        const header = document.createElement('div');
        header.className = 'pwa-install-header';

        const textBlock = document.createElement('div');
        textBlock.className = 'pwa-install-text';

        const strong = document.createElement('strong');
        strong.textContent = 'Установите приложение';

        const paragraph = document.createElement('p');
        paragraph.textContent = 'Быстрый доступ с главного экрана';

        textBlock.appendChild(strong);
        textBlock.appendChild(paragraph);
        header.appendChild(textBlock);

        // Кнопка закрытия
        const closeBtn = document.createElement('button');
        closeBtn.id = CONFIG.CLOSE_BTN_ID;
        closeBtn.className = 'pwa-install-close';
        closeBtn.setAttribute('aria-label', 'Закрыть баннер');
        closeBtn.setAttribute('type', 'button');

        const closeIcon = document.createElement('i');
        closeIcon.className = 'bi bi-x-lg';
        closeIcon.setAttribute('aria-hidden', 'true');
        closeBtn.appendChild(closeIcon);

        closeBtn.addEventListener('click', handleClose);
        closeBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClose();
            }
        });

        header.appendChild(closeBtn);
        content.appendChild(header);

        // ── Кнопка установки ──
        const installBtn = document.createElement('button');
        installBtn.id = CONFIG.INSTALL_BTN_ID;
        installBtn.className = 'btn btn-primary btn-block';
        installBtn.setAttribute('aria-label', 'Установить приложение');
        installBtn.setAttribute('type', 'button');
        installBtn.textContent = 'Установить';

        installBtn.addEventListener('click', handleInstall);
        installBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleInstall();
            }
        });

        content.appendChild(installBtn);

        banner.appendChild(content);
        document.body.appendChild(banner);

        if (CONFIG.DEBUG) console.log('[PWA] Баннер создан');
    }

    // ─── 7. ОСНОВНЫЕ ОБРАБОТЧИКИ ────────────────────────────────────

    function showBanner() {
        if (!banner) return;
        if (!deferredPrompt) {
            if (CONFIG.DEBUG) console.log('[PWA] beforeinstallprompt ещё не сработал');
            return;
        }
        if (!timeCheckPassed) {
            if (CONFIG.DEBUG) console.log('[PWA] 30 секунд ещё не прошло');
            return;
        }

        banner.classList.add('visible');
        banner.setAttribute('aria-hidden', 'false');
        localStorage.setItem(STORAGE.LAST_SHOW, String(Date.now()));

        if (CONFIG.DEBUG) console.log('[PWA] Баннер показан');
    }

    function handleBeforeInstallPrompt(event) {
        event.preventDefault();
        deferredPrompt = event;
        if (CONFIG.DEBUG) console.log('[PWA] beforeinstallprompt получен');

        if (timeCheckPassed) {
            showBanner();
        }
    }

    async function handleInstall() {
        if (!deferredPrompt) {
            if (CONFIG.DEBUG) console.log('[PWA] deferredPrompt отсутствует');
            return;
        }

        deferredPrompt.prompt();
        const result = await deferredPrompt.userChoice;

        if (result.outcome === 'accepted') {
            console.log('[PWA] ✅ Приложение установлено');
            localStorage.setItem(STORAGE.INSTALLED, 'true');
        } else {
            console.log('[PWA] ❌ Пользователь отменил установку');
        }

        deferredPrompt = null;

        if (banner) {
            banner.classList.remove('visible');
            banner.setAttribute('aria-hidden', 'true');
        }
    }

    function handleClose() {
        if (banner) {
            banner.classList.remove('visible');
            banner.setAttribute('aria-hidden', 'true');
        }
        localStorage.setItem(STORAGE.CLOSED, 'true');
        console.log('[PWA] Баннер закрыт навсегда');
    }

    function handleAppInstalled() {
        console.log('[PWA] ✅ Приложение установлено (событие appinstalled)');
        localStorage.setItem(STORAGE.INSTALLED, 'true');

        if (banner) {
            banner.classList.remove('visible');
            banner.setAttribute('aria-hidden', 'true');
        }
    }

    // ─── 8. ИНИЦИАЛИЗАЦИЯ ────────────────────────────────────────────

    function init() {
        injectStyles();

        // ✅ УБИРАЕМ ПРОВЕРКУ НА CHROMIUM - баннер универсальный

        if (isInstalled()) {
            if (CONFIG.DEBUG) console.log('[PWA] Уже установлено');
            return;
        }

        updateVisitCount();

        if (!shouldShowBanner()) {
            if (CONFIG.DEBUG) console.log('[PWA] Баннер не будет показан');
            return;
        }

        createBanner();

        setTimeout(() => {
            timeCheckPassed = true;
            if (CONFIG.DEBUG) console.log('[PWA] 30 секунд прошло');
            showBanner();
        }, CONFIG.MIN_TIME_ON_PAGE);

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);

        // ✅ ДОПОЛНИТЕЛЬНО: Safari и Firefox могут не иметь beforeinstallprompt
        // Но если событие не сработает - баннер просто не покажется

        if (CONFIG.DEBUG) console.log('[PWA] Модуль инициализирован (универсальный)');
    }

    // ─── 9. ЗАПУСК ────────────────────────────────────────────────────

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ─── 10. ЭКСПОРТ (для отладки) ──────────────────────────────────

    window.__PWA_BANNER = {
        show: showBanner,
        hide: () => {
            if (banner) {
                banner.classList.remove('visible');
                banner.setAttribute('aria-hidden', 'true');
            }
        },
        isVisible: () => (banner ? banner.classList.contains('visible') : false),
        config: CONFIG,
        storage: STORAGE,
        debug: (enabled) => {
            CONFIG.DEBUG = Boolean(enabled);
        },
    };

    if (CONFIG.DEBUG) {
        console.log('[PWA] Для отладки: window.__PWA_BANNER');
    }
})();
