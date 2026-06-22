// Standalone template script. Reads local config.json (same folder).
let config = {
  businessName: 'Velocity - Igniting Innovation',
  businessTag: 'PCB Design, Hardware & Product Development',
  logo: '../../Image/logo.png',
  googleReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJ58gXCVSHXjkRE3moJOtVLHY',
  contactUrl: 'https://wa.me/919274524204'
};

async function loadConfig(){
  try{
    const res = await fetch('config.json');
    if(res.ok){
      const c = await res.json();
      config = {...config, ...c};
    }
  }catch(e){/* ignore */}

  document.getElementById('businessName').textContent = config.businessName;
  document.getElementById('businessTag').textContent = config.businessTag;
  document.getElementById('brandLogo').src = config.logo;
}

function randomFromList(list){
  return list[Math.floor(Math.random()*list.length)];
}

let reviewsByTopic = {};
let selectedTopic = 'PCB Design';
let selectedLanguage = 'English';
const supportedLanguages = ['English', 'Gujarati', 'Hindi'];

async function loadReviews(){
  try{
    const res = await fetch('reviews.json');
    if(res.ok){
      reviewsByTopic = await res.json();
      const topics = Object.keys(reviewsByTopic);
      if(topics.length){
        selectedTopic = topics[0];
        renderTopicButtons(topics);
        renderLanguageButtons(supportedLanguages);
        return;
      }
    }
  }catch(e){console.warn('Could not load reviews.json', e);}
}

function renderTopicButtons(topics){
  const container = document.getElementById('topicButtons');
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

async function generateReview(){
  const topicData = reviewsByTopic[selectedTopic];
  let reviews = [];

  if (Array.isArray(topicData)) {
    reviews = topicData;
  } else if (topicData && typeof topicData === 'object') {
    reviews = topicData[selectedLanguage] || topicData.English || [];
  }

  if (reviews.length) {
    document.getElementById('reviewText').value = randomFromList(reviews);
    return;
  }

  const fallback = [
    `Very satisfied with the PCB design quality. The board was optimized, reliable, and delivered on schedule.`,
    `Excellent service and professional support. Highly recommended.`,
    `Great communication and fast delivery — highly recommended.`
  ];
  document.getElementById('reviewText').value = randomFromList(fallback);
}

async function copyAndOpen(){
  const ta = document.getElementById('reviewText');
  const text = ta.value || '';
  try{ await navigator.clipboard.writeText(text); }catch(e){ ta.select(); document.execCommand('copy'); }
  window.open(config.googleReviewUrl, '_blank');
}

function contactAction(){ window.open('contact.html', '_blank'); }

document.addEventListener('DOMContentLoaded', async ()=>{
  await loadConfig();
  await loadReviews();
  if(Object.keys(reviewsByTopic).length) generateReview();
  document.getElementById('generateBtn').addEventListener('click', generateReview);
  document.getElementById('copyOpenBtn').addEventListener('click', copyAndOpen);
  document.getElementById('contactBtn').addEventListener('click', contactAction);
});
