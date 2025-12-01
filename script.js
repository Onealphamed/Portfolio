const defaultConfig = {
  company_name: "OneAlphaMed",
  events_tab_title: "📅 Events",
  sea_section_title: "South East Asia",
  internal_section_title: "Internal Events",
  booths_tab_title: "🏢 Booths",
  engagement_tab_title: "🎯 Engagement",
};

function safeSetText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function safeSetHTML(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

async function onConfigChange(cfg) {
  const config = { ...defaultConfig, ...cfg };

  safeSetText("companyName", config.company_name);
  safeSetHTML(
    "eventsTab",
    `<span>${config.events_tab_title}</span>`
  );
  safeSetText("seaSectionTitle", config.sea_section_title);
  safeSetText(
    "internalSectionTitle",
    config.internal_section_title
  );
  safeSetHTML(
    "boothsTab",
    `<span>${config.booths_tab_title}</span>`
  );
  safeSetHTML(
    "engagementTab",
    `<span>${config.engagement_tab_title}</span>`
  );
}

function mapToCapabilities(cfg) {
  return {
    recolorables: [],
    borderables: [],
    fontEditable: undefined,
    fontSizeable: undefined,
  };
}

function mapToEditPanelValues(cfg) {
  const c = { ...defaultConfig, ...cfg };
  return new Map([
    ["company_name", c.company_name],
    ["events_tab_title", c.events_tab_title],
    ["sea_section_title", c.sea_section_title],
    ["internal_section_title", c.internal_section_title],
    ["booths_tab_title", c.booths_tab_title],
    ["engagement_tab_title", c.engagement_tab_title],
  ]);
}

if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities,
    mapToEditPanelValues,
  });
}

// Initialize with default config for standalone usage
onConfigChange(defaultConfig);

// Ensure script runs after DOM loaded
document.addEventListener('DOMContentLoaded', function () {
  const nav = document.querySelector('.nav-section');
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const focusableLinks = navLinks ? navLinks.querySelectorAll('a') : [];

  // Scroll handler to add/remove scrolled class (same behavior you mentioned)
  function updateNavBackground() {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  updateNavBackground();
  window.addEventListener('scroll', updateNavBackground);

  // Mobile toggle handler
  if (toggle && navLinks) {
    toggle.addEventListener('click', function (e) {
      const isOpen = this.classList.toggle('open');
      navLinks.classList.toggle('open', isOpen);
      // set aria-expanded on the button for screen readers
      this.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });

    // Optional: collapse after clicking a nav link (mobile)
    focusableLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          toggle.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
});
/* script.js
   Auto Cloudinary replacer for images
   - Set CLOUDINARY_CLOUD to your cloud name (example: 'dbvgtr8ao')
   - If you uploaded images into a folder in Cloudinary, set CLOUDINARY_FOLDER to 'foldername/' (include trailing slash).
   - If some images DO NOT share the same filename between your site and Cloudinary, see "Optional: data-mapping" below.
*/

(function () {
  const CLOUDINARY_CLOUD = 'dbvgtr8ao';        // <-- put your cloud name here
  const CLOUDINARY_FOLDER = '';                // <-- e.g. 'events/' or '' if you used root

  if (!CLOUDINARY_CLOUD) {
    console.warn('Cloudinary replacer: no CLOUDINARY_CLOUD set.');
    return;
  }

  // Treat these as local-looking srcs (we will replace these)
  function isLocalImageSrc(src) {
    if (!src) return false;
    src = src.trim();
    // skip data URIs and full URLs
    if (/^data:|^https?:\/\//i.test(src)) return false;
    // treat as local if it ends with a common image extension
    return /[A-Za-z0-9_\-\/]+\.(jpg|jpeg|png|webp|gif)$/i.test(src);
  }

  function buildCloudinaryUrl(filename) {
    // encode each part but keep slashes for subfolders in filename
    // Cloudinary public id is usually filename (including any subfolder segments)
    const encoded = filename.split('/').map(encodeURIComponent).join('/');
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/upload/${CLOUDINARY_FOLDER}${encoded}`;
  }

  // 1) Replace images where src is local
  document.querySelectorAll('img').forEach(img => {
    try {
      const cur = img.getAttribute('src') || '';
      if (isLocalImageSrc(cur)) {
        // Keep last path segment as filename if you prefer, but this allows src="images/foo.jpg"
        const filename = cur.split('/').pop();
        const cloudUrl = buildCloudinaryUrl(filename);
        img.setAttribute('src', cloudUrl);
        img.setAttribute('loading', 'lazy');
        // for debugging: keep original
        img.setAttribute('data-original-src', cur);
      }
    } catch (err) {
      // don't break the page for a single failure
      console.error('Cloudinary replacer error for img:', img, err);
    }
  });

  // 2) Optional: replace <img data-cloudinary="publicIdOrFilename.jpg"> directly (explicit mapping)
  // This is useful when Cloudinary public id is different from your local filename.
  document.querySelectorAll('img[data-cloudinary]').forEach(img => {
    try {
      const id = img.getAttribute('data-cloudinary').trim();
      if (id) {
        const cloudUrl = buildCloudinaryUrl(id);
        img.setAttribute('src', cloudUrl);
        img.setAttribute('loading', 'lazy');
        img.setAttribute('data-original-src', img.getAttribute('src') || '');
      }
    } catch (err) {
      console.error('Cloudinary data-cloudinary replacer error:', err);
    }
  });

})();



