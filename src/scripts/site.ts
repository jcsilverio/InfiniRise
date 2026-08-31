import { canEmbedUrl, hostnameLabel } from '../lib/embed';

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function initSiteMotion(): void {
  const header = document.querySelector('header');
  const hero = document.querySelector('.hero');
  const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav-links a'));
  const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));

  if (header && hero) {
    const stickyObserver = new IntersectionObserver(
      ([entry]) => {
        header.classList.toggle('is-sticky', !entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '-1px 0px 0px 0px' },
    );
    stickyObserver.observe(hero);
  }

  if (navLinks.length && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
          });
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    );
    sections.forEach((section) => sectionObserver.observe(section));
  }

  const reduced = prefersReducedMotion();
  const revealTargets = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
  revealTargets.forEach((el, index) => {
    if (!reduced) {
      el.style.transitionDelay = `${index * 60}ms`;
    }
    const revealObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          revealObserver.unobserve(el);
        }
      },
      { threshold: 0.12 },
    );
    revealObserver.observe(el);
  });
}

export function initPreviewModal(): void {
  const dialog = document.querySelector<HTMLDialogElement>('#preview-modal');
  const body = dialog?.querySelector<HTMLElement>('.preview-modal__body');
  const titleEl = dialog?.querySelector<HTMLElement>('.preview-modal__title');
  const closeBtn = dialog?.querySelector<HTMLButtonElement>('.preview-modal__close');
  const external = dialog?.querySelector<HTMLAnchorElement>('.preview-modal__external');
  if (!dialog || !body || !titleEl || !closeBtn || !external) return;

  function unload(): void {
    body.replaceChildren();
    dialog.classList.remove('preview-modal--video', 'preview-modal--page');
    external.removeAttribute('href');
  }

  function youtubeIframe(id: string, title: string): HTMLIFrameElement {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
    iframe.title = `${title} trailer`;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    return iframe;
  }

  function pageIframe(url: string, title: string): HTMLIFrameElement {
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.title = title;
    iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
    return iframe;
  }

  function fallback(url: string): HTMLElement {
    const wrap = document.createElement('div');
    wrap.className = 'preview-modal__fallback';
    const note = document.createElement('p');
    note.textContent = `${hostnameLabel(url)} does not allow this page to be shown here.`;
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'Open in new tab';
    wrap.append(note, link);
    return wrap;
  }

  function openPreview(link: HTMLAnchorElement): void {
    const href = link.href;
    const title =
      link.dataset.trailerTitle ||
      link.dataset.previewTitle ||
      link.textContent?.trim() ||
      'Preview';
    const youtubeId = link.dataset.trailerId;

    titleEl.textContent = title;
    external.href = href;

    if (youtubeId) {
      dialog.classList.add('preview-modal--video');
      body.replaceChildren(youtubeIframe(youtubeId, title));
    } else if (!canEmbedUrl(href)) {
      dialog.classList.add('preview-modal--page');
      body.replaceChildren(fallback(href));
    } else {
      dialog.classList.add('preview-modal--page');
      body.replaceChildren(pageIframe(href, title));
    }

    dialog.showModal();
    closeBtn.focus();
  }

  closeBtn.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', unload);
  dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    const outside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;
    if (outside) dialog.close();
  });

  document.querySelectorAll<HTMLAnchorElement>('[data-trailer], [data-preview]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      openPreview(link);
    });
  });
}
