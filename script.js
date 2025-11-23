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
