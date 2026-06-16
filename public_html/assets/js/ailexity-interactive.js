/*!
 * Ailexity — Interactive micro-interactions
 * Lightweight, dependency-free. Auto-applies based on existing classes.
 * Respects prefers-reduced-motion and skips pointer-driven effects on touch.
 */
(function () {
    'use strict';

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var fine = window.matchMedia('(pointer: fine)').matches;

    function ready(fn) {
        if (document.readyState !== 'loading') { fn(); }
        else { document.addEventListener('DOMContentLoaded', fn); }
    }

    function clamp(v, min, max) { return v < min ? min : (v > max ? max : v); }

    /* ---------- Reading-progress bar ---------- */
    function scrollProgress() {
        var bar = document.createElement('div');
        bar.className = 'scroll-progress';
        document.body.appendChild(bar);
        var ticking = false;
        function update() {
            var d = document.documentElement;
            var max = d.scrollHeight - d.clientHeight;
            var pct = max > 0 ? (d.scrollTop || document.body.scrollTop) / max * 100 : 0;
            bar.style.width = pct + '%';
            ticking = false;
        }
        window.addEventListener('scroll', function () {
            if (!ticking) { requestAnimationFrame(update); ticking = true; }
        }, { passive: true });
        window.addEventListener('resize', update);
        update();
    }

    /* ---------- Subtle 3D tilt on cards ---------- */
    function tilt() {
        var cards = document.querySelectorAll(
            '.service-card, .product-card-upcoming, .industry-card, .theme-card,' +
            ' .blog-card, .blog-grid-card, .value-card, .stat-card, .position-card, .team-card-wrap'
        );
        var MAX = 5; // degrees
        Array.prototype.forEach.call(cards, function (card) {
            card.classList.add('has-tilt');
            var raf = null, rect = null;
            card.addEventListener('mouseenter', function () {
                rect = card.getBoundingClientRect();
                card.classList.add('tilting');
            });
            card.addEventListener('mousemove', function (e) {
                if (!rect) { rect = card.getBoundingClientRect(); }
                var px = (e.clientX - rect.left) / rect.width - 0.5;
                var py = (e.clientY - rect.top) / rect.height - 0.5;
                if (raf) { return; }
                raf = requestAnimationFrame(function () {
                    card.style.transform =
                        'perspective(900px) rotateX(' + (-py * MAX).toFixed(2) + 'deg)' +
                        ' rotateY(' + (px * MAX).toFixed(2) + 'deg) translateY(-4px)';
                    raf = null;
                });
            });
            card.addEventListener('mouseleave', function () {
                rect = null;
                card.classList.remove('tilting');
                card.style.transform = '';
            });
        });
    }

    /* ---------- Magnetic buttons ---------- */
    function magnetic() {
        var btns = document.querySelectorAll(
            '.btn-dark-pill, .btn-accent-pill, .btn-ghost-pill,' +
            ' .btn-product-cta, .btn-upcoming-cta, .btn-send'
        );
        Array.prototype.forEach.call(btns, function (b) {
            b.classList.add('magnetic');
            var raf = null, rect = null;
            b.addEventListener('mouseenter', function () {
                rect = b.getBoundingClientRect();
                b.style.transition = 'transform 0.15s ease-out';
            });
            b.addEventListener('mousemove', function (e) {
                if (!rect) { rect = b.getBoundingClientRect(); }
                var x = clamp((e.clientX - rect.left - rect.width / 2) * 0.3, -10, 10);
                var y = clamp((e.clientY - rect.top - rect.height / 2) * 0.4, -8, 8);
                if (raf) { return; }
                raf = requestAnimationFrame(function () {
                    b.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
                    raf = null;
                });
            });
            b.addEventListener('mouseleave', function () {
                rect = null;
                b.style.transition = '';
                b.style.transform = '';
            });
        });
    }

    /* ---------- Cursor spotlight on dark surfaces ---------- */
    function spotlight() {
        var els = document.querySelectorAll(
            '.product-card-live, .cta-dark, .testimonial-card, .contact-section'
        );
        Array.prototype.forEach.call(els, function (el) {
            var glow = document.createElement('div');
            glow.className = 'spot-glow';
            el.insertBefore(glow, el.firstChild);
            var raf = null, rect = null;
            el.addEventListener('mouseenter', function () {
                rect = el.getBoundingClientRect();
                glow.style.opacity = '1';
            });
            el.addEventListener('mousemove', function (e) {
                if (!rect) { rect = el.getBoundingClientRect(); }
                var x = e.clientX - rect.left, y = e.clientY - rect.top;
                if (raf) { return; }
                raf = requestAnimationFrame(function () {
                    glow.style.background =
                        'radial-gradient(circle at ' + x + 'px ' + y + 'px,' +
                        ' rgba(255,110,66,0.18) 0%, transparent 38%)';
                    raf = null;
                });
            });
            el.addEventListener('mouseleave', function () {
                rect = null;
                glow.style.opacity = '0';
            });
        });
    }

    /* ---------- Hero aurora + parallax ---------- */
    function hero() {
        var heroes = document.querySelectorAll('.hero-section, .page-hero');
        Array.prototype.forEach.call(heroes, function (h) {
            var bg = h.querySelector('.hero-bg, .page-hero-bg');
            var aura = document.createElement('div');
            aura.className = 'hero-aurora';
            h.appendChild(aura);
            var raf = null, rect = null;
            h.addEventListener('mouseenter', function () {
                rect = h.getBoundingClientRect();
                aura.style.opacity = '1';
            });
            h.addEventListener('mousemove', function (e) {
                if (!rect) { rect = h.getBoundingClientRect(); }
                var lx = e.clientX - rect.left, ly = e.clientY - rect.top;
                var nx = (lx / rect.width - 0.5), ny = (ly / rect.height - 0.5);
                if (raf) { return; }
                raf = requestAnimationFrame(function () {
                    aura.style.transform = 'translate(' + lx + 'px,' + ly + 'px)';
                    if (bg) {
                        bg.style.transform = 'translate(' + (nx * -18).toFixed(1) + 'px,' +
                            (ny * -18).toFixed(1) + 'px)';
                    }
                    raf = null;
                });
            });
            h.addEventListener('mouseleave', function () {
                rect = null;
                aura.style.opacity = '0';
                if (bg) { bg.style.transform = ''; }
            });
        });
    }

    /* ---------- Mobile nav overlay ---------- */
    function mobileNav() {
        var overlay = document.getElementById('mobileNavOverlay');
        var closeBtn = document.getElementById('mobileNavClose');
        var toggler = document.getElementById('mobileNavToggler');
        if (!overlay) { return; }
        function open() {
            overlay.classList.add('open');
            overlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
        function close() {
            overlay.classList.remove('open');
            overlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
        if (toggler) { toggler.addEventListener('click', open); }
        if (closeBtn) { closeBtn.addEventListener('click', close); }
        overlay.addEventListener('click', function (e) { if (e.target === overlay) { close(); } });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && overlay.classList.contains('open')) { close(); }
        });
        // Close overlay on nav link click; same-page anchors scroll after fade-out
        var navLinks = overlay.querySelectorAll('.mob-nav-link');
        Array.prototype.forEach.call(navLinks, function (link) {
            link.addEventListener('click', function (e) {
                var href = link.getAttribute('href') || '';
                var hashIdx = href.indexOf('#');
                if (hashIdx !== -1) {
                    var hash = href.slice(hashIdx);
                    var pagePart = href.slice(0, hashIdx);
                    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
                    var targetPage = pagePart.split('/').pop() || 'index.html';
                    if (!pagePart || targetPage === currentPage) {
                        e.preventDefault();
                        close();
                        // Wait for overlay fade-out (250ms) before scrolling
                        setTimeout(function () {
                            var target = document.querySelector(hash);
                            if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
                        }, 270);
                        return;
                    }
                }
                close();
            });
        });
    }

    /* ---------- Navbar search overlay ---------- */
    function navSearch() {
        var btn = document.getElementById('navSearchBtn');
        var overlay = document.getElementById('navSearchOverlay');
        if (!btn || !overlay) { return; }
        var input = document.getElementById('navSearchInput');
        var close = document.getElementById('navSearchClose');
        var links = overlay.querySelectorAll('.nav-search-link');
        var empty = overlay.querySelector('.nav-search-empty');

        function open() {
            overlay.classList.add('open');
            overlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            setTimeout(function () { if (input) { input.focus(); } }, 120);
        }
        function shut() {
            overlay.classList.remove('open');
            overlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            if (input) { input.value = ''; }
            filter('');
        }
        function filter(q) {
            q = q.trim().toLowerCase();
            var shown = 0;
            Array.prototype.forEach.call(links, function (a) {
                var match = a.textContent.toLowerCase().indexOf(q) !== -1;
                a.classList.toggle('is-hidden', !match);
                if (match) { shown++; }
            });
            if (empty) { empty.style.display = shown === 0 ? 'block' : 'none'; }
        }

        btn.addEventListener('click', open);
        if (close) { close.addEventListener('click', shut); }
        if (input) { input.addEventListener('input', function () { filter(input.value); }); }
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) { shut(); }
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && overlay.classList.contains('open')) { shut(); }
        });
    }

    ready(function () {
        scrollProgress();
        mobileNav();
        navSearch();
        if (!reduce && fine) {
            // Pages flagged `.minimal` (e.g. the landing page) keep a calmer,
            // more professional feel: skip pointer-led motion and spotlight effects.
            var minimal = document.body.classList.contains('minimal');
            if (!minimal) {
                tilt();
                hero();
                magnetic();
                spotlight();
            }
        }
    });
})();
