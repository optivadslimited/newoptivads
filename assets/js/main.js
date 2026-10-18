/* Optivads site scripts — no dependencies */
(function () {
  'use strict';

  // Sticky header state
  var header = document.querySelector('.site-header');
  var onScroll = function () {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile navigation
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active nav link
  var path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href') || '';
    if (href === path) a.classList.add('active');
  });

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // Animated counters: <span data-count="12" data-prefix="" data-suffix="M+" data-decimals="0">
  var counters = document.querySelectorAll('[data-count]');
  var animate = function (el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1400, start = null;
    var step = function (ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (counters.length && 'IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animate(en.target); cio.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { cio.observe(c); });
  } else {
    counters.forEach(animate);
  }

  // Marquee: duplicate items so the loop is seamless
  document.querySelectorAll('.marquee-track').forEach(function (track) {
    track.innerHTML += track.innerHTML;
  });

  // Footer year
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Contact form: two-level interest picker + prefilled email (until a backend/form service is connected)
  var form = document.getElementById('contact-form');
  if (form) {
    var interest = document.getElementById('interest');
    var interestError = document.getElementById('interest-error');
    var pillars = form.querySelectorAll('input[name="pillar"]');
    pillars.forEach(function (p) {
      var card = p.closest('.pillar');
      var panel = document.getElementById(p.getAttribute('data-channels'));
      var sync = function () {
        if (card) card.classList.toggle('on', p.checked);
        if (panel) {
          panel.hidden = !p.checked;
          if (!p.checked) panel.querySelectorAll('input').forEach(function (c) { c.checked = false; });
        }
        if (p.checked && interest) {
          interest.classList.remove('invalid');
          if (interestError) interestError.classList.remove('show');
        }
      };
      p.addEventListener('change', sync);
      sync();
    });

    var status = document.getElementById('form-status');
    var setStatus = function (msg, kind) {
      if (!status) return;
      status.textContent = msg;
      status.className = 'form-status show' + (kind ? ' ' + kind : '');
    };
    var describeInterests = function (chosen, fd) {
      return chosen.map(function (p) {
        var key = p.getAttribute('data-channels') === 'ch-performance' ? 'performance' : 'creator';
        var ch = fd.getAll(key);
        return p.value + (ch.length ? ' (' + ch.join(', ') + ')' : ' (channels to be discussed)');
      });
    };
    // Fallback when the lead endpoint is unavailable: open the visitor's email client prefilled.
    var mailtoFallback = function (fd, interests) {
      var lines = [
        'Name: ' + fd.get('name'),
        'Company: ' + fd.get('company'),
        'Work email: ' + fd.get('email'),
        'App / website: ' + fd.get('app'),
        'Monthly media budget: ' + fd.get('budget'),
        'Interested in:',
        interests.map(function (i) { return '  - ' + i; }).join('\n'),
        '',
        'Goals:',
        fd.get('message') || '-'
      ];
      var to = form.getAttribute('data-to') || 'partnership@optivads.com';
      var subject = 'New enquiry from ' + (fd.get('company') || fd.get('name'));
      setStatus('Opening your email client with the details prefilled. If nothing happens, email us directly at ' + to + '.');
      window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var chosen = Array.prototype.slice.call(form.querySelectorAll('input[name="pillar"]:checked'));
      if (!chosen.length) {
        if (interest) { interest.classList.add('invalid'); interest.scrollIntoView({ block: 'center' }); }
        if (interestError) interestError.classList.add('show');
        if (pillars[0]) pillars[0].focus();
        return;
      }
      var fd = new FormData(form);
      var interests = describeInterests(chosen, fd);
      var endpoint = form.getAttribute('data-endpoint');
      if (!endpoint || !window.fetch) { mailtoFallback(fd, interests); return; }

      var button = form.querySelector('button[type="submit"]');
      if (button) button.disabled = true;
      setStatus('Sending your enquiry…');
      var payload = {
        name: fd.get('name'),
        company: fd.get('company'),
        email: fd.get('email'),
        app: fd.get('app'),
        budget: fd.get('budget'),
        interests: chosen.map(function (p) { return p.value; }),
        channels: fd.getAll('performance').concat(fd.getAll('creator')),
        message: fd.get('message') || '',
        website: fd.get('website') || '',
        page: location.href
      };
      fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        .then(function (r) { return r.json().then(function (j) { return r.ok && j && j.ok; }); })
        .then(function (ok) {
          if (!ok) throw new Error('Lead endpoint rejected the submission');
          form.reset();
          pillars.forEach(function (p) { p.dispatchEvent(new Event('change')); });
          setStatus('Thanks! Your enquiry is in. A senior member of the team will get back to you within one business day.', 'ok');
        })
        .catch(function () { mailtoFallback(fd, interests); })
        .then(function () { if (button) button.disabled = false; });
    });
  }
})();
