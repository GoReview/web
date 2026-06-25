const DEFAULT_CONFIG = {
  businessName: 'Velocity - Igniting Innovation',
  businessTag: 'PCB Design, Hardware & Product Development',
  logo: 'vi2.png',
  googleReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJ58gXCVSHXjkRE3moJOtVLHY',
  contactUrl: 'https://wa.me/919274524204',
  pageUrl: '../',
  contactPageUrl: 'contact/',
  startDate: '24-6-2026',
  expiryDate: '24-6-2026',
  address: 'SF/3, Shivam Complex, nr. Rajhans cinema, New India Colony, Nikol, Ahmedabad, Gujarat-380049',
  contactNote: 'Thanks for visiting Velocity! Connect with us, share your experience, and stay updated with every option below.',
  contactLinks: [
    { label: 'Call', icon: 'call.png', url: 'tel:+919999999999' },
    { label: 'WhatsApp', icon: 'whatsapp.png', url: 'https://wa.me/919999999999' },
    { label: 'Email', icon: 'email.png', url: 'mailto:hello@velocityi2.com' },
    { label: 'Website', icon: 'website.png', url: 'https://velocityi2.com' },
    { label: 'Instagram', icon: 'instagram.png', url: 'https://instagram.com/velocityi2' },
    { label: 'LinkedIn', icon: 'linkdin.png', url: 'https://linkedin.com/company/velocityi2' },
    { label: 'YouTube', icon: 'youtube.png', url: 'https://youtube.com/velocityi2' },
    { label: 'Catalog', icon: 'catalog.png', url: 'https://velocityi2.com/catalog' },
    { label: 'Review', icon: 'review.png', url: '../' }
  ]
};

const DATE_PATTERN = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;

function parseDateString(dateString){
  if(!dateString) return null;
  const match = DATE_PATTERN.exec(dateString.trim());
  if(!match) return new Date(dateString);
  return new Date(Date.UTC(Number(match[3]), Number(match[2]) - 1, Number(match[1])));
}

function getTodayUTC(){
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

function resolveResourcePath(path, basePath = ''){
  if(!path) return '';
  if(/^(?:https?:|\/|data:)/i.test(path)) return path;
  return `${basePath}${path}`;
}

function disableReviewActions(){
  const generateBtn = document.getElementById('generateBtn');
  const copyOpenBtn = document.getElementById('copyOpenBtn');
  const reviewText = document.getElementById('reviewText');
  if(generateBtn) generateBtn.disabled = true;
  if(copyOpenBtn) copyOpenBtn.disabled = true;
  if(reviewText) reviewText.value = 'Your plan is not active. Please connect with the admin team.';
}

function renderExpiryNotice(config, pagePanel, actionUrl){
  const panel = document.getElementById('expiryPanel');
  const primaryAction = document.getElementById('expiryPrimaryAction');
  const secondaryAction = document.getElementById('expirySecondaryAction');
  const heading = document.querySelector('#expiryPanel h1');
  const message = document.querySelector('#expiryPanel p');

  if(!panel || !primaryAction || !secondaryAction || !heading || !message) return true;

  const start = parseDateString(config.startDate);
  const expiry = parseDateString(config.expiryDate);
  const today = getTodayUTC();

  if(start && today < start){
    document.body.classList.add('expired');
    if(pagePanel) pagePanel.style.display = 'none';
    panel.classList.remove('hidden');
    heading.textContent = 'Your plan has not started yet';
    message.textContent = `Your page will activate on ${start.toLocaleDateString('en-GB')}.`;
    primaryAction.textContent = 'Contact Support';
    secondaryAction.textContent = 'Renew Your Plan';
    primaryAction.href = actionUrl;
    secondaryAction.href = actionUrl;
    disableReviewActions();
    return false;
  }

  if(expiry && today > expiry){
    document.body.classList.add('expired');
    if(pagePanel) pagePanel.style.display = 'none';
    panel.classList.remove('hidden');
    heading.textContent = 'Your plan has expired';
    message.textContent = 'Renew your subscription to continue ready-to-use Google review suggestions and help your customers leave reviews faster.';
    primaryAction.textContent = 'Upgrade Now';
    secondaryAction.textContent = 'Contact Support';
    primaryAction.href = actionUrl;
    secondaryAction.href = actionUrl;
    disableReviewActions();
    return false;
  }

  document.body.classList.remove('expired');
  if(pagePanel) pagePanel.style.display = '';
  panel.classList.add('hidden');
  return true;
}

async function loadConfig(configPath){
  let loadedConfig = {...DEFAULT_CONFIG};
  try{
    const res = await fetch(configPath);
    if(res.ok){
      const c = await res.json();
      loadedConfig = {...loadedConfig, ...c};
    }
  }catch(e){
    console.warn('Could not load config', e);
  }
  return loadedConfig;
}

function setReviewPageMetadata(config, resourceBase){
  const businessName = document.getElementById('businessName');
  const businessTag = document.getElementById('businessTag');
  const brandLogo = document.getElementById('brandLogo');

  if(businessName) businessName.textContent = config.businessName;
  if(businessTag) businessTag.textContent = config.businessTag;
  if(brandLogo) brandLogo.src = resolveResourcePath(config.logo || 'logo.png', resourceBase);
}

function setContactPageMetadata(config, resourceBase){
  const businessName = document.getElementById('contactBusinessName');
  const businessTag = document.getElementById('contactBusinessTag');
  const address = document.getElementById('contactAddress');
  const contactNote = document.getElementById('contactNote');
  const contactLogo = document.getElementById('contactLogo');

  if(businessName) businessName.textContent = config.businessName;
  if(businessTag) businessTag.textContent = config.businessTag;
  if(address) address.textContent = config.address;
  if(contactNote) contactNote.textContent = config.contactNote;
  if(contactLogo) contactLogo.src = resolveResourcePath(config.logo || 'vi2.png', resourceBase);
}

function renderContactLinks(config, resourceBase){
  const grid = document.getElementById('contactGrid');
  if(!grid || !Array.isArray(config.contactLinks)) return;

  grid.innerHTML = '';
  config.contactLinks.forEach(link => {
    const a = document.createElement('a');
    a.className = 'contact-link';
    const url = link.url || '#';
    a.href = url;
    const isMailOrTel = /^mailto:|^tel:/i.test(url);
    const isExternal = /^(https?:|\/\/)/i.test(url);
    a.target = isMailOrTel || !isExternal ? '_self' : '_blank';
    if(a.target === '_blank') a.rel = 'noreferrer noopener';

    if(link.icon){
      const img = document.createElement('img');
      img.className = 'contact-link-icon';
      img.alt = link.label;
      img.src = resolveResourcePath(link.icon, `${resourceBase}../Image/`);
      a.appendChild(img);
    }

    const label = document.createElement('span');
    label.textContent = link.label;
    a.appendChild(label);
    grid.appendChild(a);
  });
}

function randomFromList(list){
  return list[Math.floor(Math.random() * list.length)];
}

let reviewsByTopic = {};
let selectedTopic = '';
let selectedLanguage = '';
let availableTopics = [];
let supportedLanguages = [];
let currentConfig = {};
let hasAvailableReviews = true;
let userFolder = ''; // Track which user folder for local review tracking

// Simple hash function to create unique ID for each review
function generateReviewId(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

function getUsedReviews(){
  const key = `usedReviews_${userFolder}`;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
}

function markReviewAsUsed(review){
  const reviewId = generateReviewId(review);
  const used = getUsedReviews();
  if(!used.includes(reviewId)){
    used.push(reviewId);
    const key = `usedReviews_${userFolder}`;
    localStorage.setItem(key, JSON.stringify(used));
  }
}

function clearUsedReviews(){
  const key = `usedReviews_${userFolder}`;
  localStorage.removeItem(key);
}

async function loadReviews(config){
  try{
    const res = await fetch('reviews.json');
    if(res.ok){
      reviewsByTopic = await res.json();
      const topics = Object.keys(reviewsByTopic);
      if(topics.length){
        // Use config values if provided, otherwise fallback to defaults
        availableTopics = config.topics || topics;
        supportedLanguages = config.languages || ['English', 'Gujarati', 'Hindi'];
        selectedTopic = config.selectedTopic || availableTopics[0];
        selectedLanguage = config.selectedLanguage || supportedLanguages[0];
        
        renderTopicButtons(availableTopics);
        renderLanguageButtons(supportedLanguages);
        return;
      }
    }
  }catch(e){
    console.warn('Could not load reviews.json', e);
  }
}

function renderTopicButtons(topics){
  const container = document.getElementById('topicButtons');
  if(!container) return;
  container.innerHTML = '';
  topics.forEach(topic => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'topic-button' + (topic === selectedTopic ? ' active' : '');
    btn.textContent = topic;
    btn.dataset.topic = topic;
    btn.addEventListener('click', () => {
      selectedTopic = topic;
      document.querySelectorAll('.topic-button').forEach(el => el.classList.toggle('active', el.dataset.topic === topic));
      generateReview();
    });
    container.appendChild(btn);
  });
}

function renderLanguageButtons(languages){
  const container = document.getElementById('languageButtons');
  if(!container) return;
  container.innerHTML = '';
  languages.forEach(language => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'language-button' + (language === selectedLanguage ? ' active' : '');
    btn.textContent = language;
    btn.dataset.language = language;
    btn.addEventListener('click', () => {
      selectedLanguage = language;
      document.querySelectorAll('.language-button').forEach(el => el.classList.toggle('active', el.dataset.language === language));
      generateReview();
    });
    container.appendChild(btn);
  });
}

function generateReview(){
  const topicData = reviewsByTopic[selectedTopic];
  let reviews = [];

  if (Array.isArray(topicData)) {
    reviews = topicData;
  } else if (topicData && typeof topicData === 'object') {
    reviews = topicData[selectedLanguage] || topicData.English || [];
  }

  const reviewText = document.getElementById('reviewText');
  const copyOpenBtn = document.getElementById('copyOpenBtn');
  if(!reviewText) return;

  // Filter out used reviews (by ID)
  const usedReviewIds = getUsedReviews();
  const availableReviews = reviews.filter(r => !usedReviewIds.includes(generateReviewId(r)));

  if (availableReviews.length) {
    reviewText.value = randomFromList(availableReviews);
    hasAvailableReviews = true;
    if(copyOpenBtn) copyOpenBtn.disabled = false;
    return;
  }

  // If all reviews are used, show multilingual message and disable button
  if (reviews.length > 0) {
    hasAvailableReviews = false;
    const noReviewsMsg = currentConfig.noReviewsMessage || {};
    reviewText.value = noReviewsMsg[selectedLanguage] || noReviewsMsg.English || 'All reviews have been used! Please connect with admin team to start fresh.';
    if(copyOpenBtn) copyOpenBtn.disabled = true;
    return;
  }

  const fallback = [
    'Highly recommended.', 'Excellent service.', 'Great experience.', 'Very satisfied.',
    'Professional and reliable.', 'Outstanding support.', 'Exceptional quality.', 'Smooth process.',
    'Friendly and helpful team.', 'Top-notch product.', 'Value for money.', 'Very polite and well-mannered staff.',
    'Must visit place.', 'Absolutely worth it.', 'Highly professional behavior.', 'Very reasonable pricing.',
    'Excellent quality work.', 'Will definitely visit again.', 'Best service in town.', 'Super fast service.',
    'Very helpful and cooperative.', 'Fully satisfied with the work.', 'Genuine and transparent dealing.', 'Highly recommended for business.',
    'Great service.', 'Pocket friendly prices.', 'Top-class customer service.', 'Hassle-free experience.',
    'Trusted and reliable place.', 'They explain everything clearly.', 'Excellent coordination and support.', 'On-time delivery and service.',
    'Superb quality and finish.', 'One-stop shop for all needs.', 'Worth every single penny.', 'Keep up the good work.'
    ];
  reviewText.value = randomFromList(fallback);
  hasAvailableReviews = true;
  if(copyOpenBtn) copyOpenBtn.disabled = false;
}

async function copyAndOpen(){
  // Do not allow copy if no reviews are available
  if(!hasAvailableReviews) return;
  
  const ta = document.getElementById('reviewText');
  if(!ta) return;
  const text = ta.value || '';
  
  // Mark this review as used before copying
  markReviewAsUsed(text);
  
  try{ await navigator.clipboard.writeText(text); }catch(e){ ta.select(); document.execCommand('copy'); }
  const config = window._velocityConfig || DEFAULT_CONFIG;
  window.open(config.googleReviewUrl, '_blank');
}

function contactAction(){
  const config = window._velocityConfig || DEFAULT_CONFIG;
  window.open(config.contactPageUrl || 'contact/', '_blank');
}

function resetReviews(){
  clearUsedReviews();
  generateReview();
  alert('All reviews have been reset! You can now use them again.');
}

async function initReviewPage(config){
  // Extract user folder name from current path (e.g., /user/velocityi2/ → velocityi2)
  userFolder = window.location.pathname.split('/').filter(p => p).slice(-2)[0] || 'default';
  
  currentConfig = config;
  if(config && config.businessName){
    document.title = config.businessName;
  }
  setReviewPageMetadata(config, '');
  const actionUrl = '../../index.html';
  const pagePanel = document.querySelector('.review-panel');
  const active = renderExpiryNotice(config, pagePanel, actionUrl);
  await loadReviews(config);
  if(active && Object.keys(reviewsByTopic).length) generateReview();

  const generateBtn = document.getElementById('generateBtn');
  const copyOpenBtn = document.getElementById('copyOpenBtn');
  const resetBtn = document.getElementById('resetBtn');
  const contactBtn = document.getElementById('contactBtn');
  if(generateBtn) generateBtn.addEventListener('click', generateReview);
  if(copyOpenBtn) copyOpenBtn.addEventListener('click', copyAndOpen);
  if(resetBtn) resetBtn.addEventListener('click', resetReviews);
  if(contactBtn) contactBtn.addEventListener('click', contactAction);
}

async function initContactPage(config){
  setContactPageMetadata(config, '../');
  if(config && config.businessName){
    document.title = config.businessName;
  }
  const actionUrl = '../../../index.html';
  const pagePanel = document.querySelector('.review-panel.contact-panel');
  renderExpiryNotice(config, pagePanel, actionUrl);
  renderContactLinks(config, '../../');
}

async function initPage(){
  const isContactPage = !!document.getElementById('contactGrid');
  const configPath = isContactPage ? '../config.json' : 'config.json';
  const config = await loadConfig(configPath);
  window._velocityConfig = config;

  if(isContactPage){
    await initContactPage(config);
  } else {
    await initReviewPage(config);
  }
}

document.addEventListener('DOMContentLoaded', initPage);
