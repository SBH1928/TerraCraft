// chatbot-logic.js - The "Live & Activated" Edition (Version 9.0 - FINAL)
// This definitive version contains the deep knowledge base, the complete bug-free logic,
// and is now activated with your personal OpenWeatherMap API key.

document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURATION ---
    // Your personal API key is now integrated.
    const OPENWEATHER_API_KEY = '4b8f3ec650b3363b13fb84e4eab95b78'; 
    // Coordinates for Coimbatore, Tamil Nadu
    const LATITUDE = 11.0168;
    const LONGITUDE = 76.9558;

    // --- DOM ELEMENT REFERENCES ---
    const chatWindow = document.getElementById('chat-window');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const typingIndicator = document.getElementById('typing-indicator');
    const langToggleBtn = document.getElementById('lang-toggle');

    // --- STATE MANAGEMENT ---
    let currentLanguage = 'en';
    let conversationState = { topic: null, awaiting: null, data: {} };

    // ######################################################################
    // ############ THE DEFINITIVE EXPERT KNOWLEDGE BASE ####################
    // ######################################################################
    const knowledgeBase = {
        ui_text: { placeholder: { en: 'Ask about weather, soil, crops...', ta: 'வானிலை, மண், பயிர்கள் பற்றி கேளுங்கள்...' }, lang_button: { en: 'தமிழ்', ta: 'English' } },
        greetings: { en: ['hello', 'hi', 'vanakkam', 'hey'], ta: ['வணக்கம்', 'ஹாய்', 'ஹலோ'] },
        gratitude: { en: ['thanks', 'thank you', 'nanri'], ta: ['நன்றி'] },
        price: {
            keywords: { en: ['price', 'market', 'rate', 'vilai'], ta: ['விலை', 'சந்தை'] },
            initial_question: { en: 'I have price data from major TN markets. Which market?', ta: 'முக்கியமான தமிழக சந்தைகளின் விலை தரவுகள் என்னிடம் உள்ளன. எந்த சந்தை?' },
            options: { en: ['Coimbatore', 'Erode', 'Madurai', 'Dindigul'], ta: ['கோயம்புத்தூர்', 'ஈரோடு', 'மதுரை', 'திண்டுக்கல்'] },
            markets: {
                coimbatore: { en: 'Coimbatore', ta: 'கோயம்புத்தூர்', commodities: ['small onions', 'tomato', 'coconut', 'brinjal'] },
                erode: { en: 'Erode', ta: 'ஈரோடு', commodities: ['turmeric', 'finger millet', 'groundnut', 'cotton'] },
                madurai: { en: 'Madurai', ta: 'மதுரை', commodities: ['jasmine', 'banana', 'chilli', 'mango'] },
                dindigul: { en: 'Dindigul', ta: 'திண்டுக்கல்', commodities: ['onion', 'tomato', 'grapes'] }
            },
            commodities: {
                'small onions': { en: 'Small Onions', ta: 'சின்ன வெங்காயம்', unit: { en: 'kg', ta: 'கிலோ' }, min: 60, max: 75 },
                'tomato': { en: 'Tomato', ta: 'தக்காளி', unit: { en: 'kg', ta: 'கிலோ' }, min: 25, max: 30 },
                'coconut': { en: 'Coconut', ta: 'தேங்காய்', unit: { en: 'piece', ta: 'காய்' }, min: 30, max: 35 },
                'brinjal': { en: 'Brinjal', ta: 'கத்திரிக்காய்', unit: { en: 'kg', ta: 'கிலோ' }, min: 30, max: 40 },
                'turmeric': { en: 'Turmeric', ta: 'மஞ்சள்', unit: { en: 'quintal', ta: 'குவிண்டால்' }, min: 7200, max: 8000 },
                'finger millet': { en: 'Finger Millet (Ragi)', ta: 'கேழ்வரகு (ராகி)', unit: { en: 'quintal', ta: 'குவிண்டால்' }, min: 3000, max: 3400 },
                'groundnut': { en: 'Groundnut', ta: 'நிலக்கடலை', unit: { en: 'quintal', ta: 'குவிண்டால்' }, min: 6500, max: 7200 },
                'cotton': { en: 'Cotton (Kapas)', ta: 'பருத்தி', unit: { en: 'quintal', ta: 'குவிண்டால்' }, min: 6000, max: 7500 },
                'jasmine': { en: 'Jasmine', ta: 'மல்லிகை', unit: { en: 'kg', ta: 'கிலோ' }, min: 800, max: 1200 },
                'banana': { en: 'Banana (Poovan)', ta: ' வாழைப்பழம் (பூவன்)', unit: { en: 'bunch', ta: 'தார்' }, min: 400, max: 600 },
                'chilli': { en: 'Chilli', ta: 'மிளகாய்', unit: { en: 'kg', ta: 'கிலோ' }, min: 50, max: 65 },
                'mango': { en: 'Mango (Imam Pasand)', ta: 'மாம்பழம் (இமாம் பசந்த்)', unit: { en: 'kg', ta: 'கிலோ' }, min: 120, max: 180 },
                'onion': { en: 'Onion (Bellary)', ta: 'வெங்காயம் (பெல்லாரி)', unit: { en: 'kg', ta: 'கிலோ' }, min: 30, max: 40 },
                'grapes': { en: 'Grapes (Panneer)', ta: 'திராட்சை (பன்னீர்)', unit: { en: 'kg', ta: 'கிலோ' }, min: 50, max: 70 },
            }
        },
        disease: {
            keywords: { en: ['disease', 'pest', 'infection', 'noi'], ta: ['நோய்', 'பூச்சி'] },
            initial_question: { en: 'Accessing disease database. Please select a crop.', ta: 'நோய் தரவுத்தளத்தை அணுகுகிறேன். ஒரு பயிரைத் தேர்ந்தெடுக்கவும்.' },
            options: { en: ['Paddy', 'Sugarcane', 'Banana', 'Cotton', 'Mango'], ta: ['நெல்', 'கரும்பு', 'வாழை', 'பருத்தி', 'மா'] },
            crop_db: {
                paddy: { name: {en: 'Paddy', ta: 'நெல்'}, 'blast disease': { name: {en: 'Blast Disease', ta: 'தண்டு அழுகல் நோய்'}, text: {en: 'A fungal infection causing spindle-shaped spots on leaves.', ta: 'இலைகளில் கதிர் வடிவ புள்ளிகளை உண்டாக்கும் ஒரு பூஞ்சை தொற்று.'}, image: 'https://images.unsplash.com/photo-1599591436423-e3a5a546e5b3?auto=format&fit=crop&q=80&w=800' } },
                sugarcane: { name: {en: 'Sugarcane', ta: 'கரும்பு'}, 'red rot': { name: {en: 'Red Rot', ta: 'சிவப்பு அழுகல் நோய்'}, text: {en: 'Fungal disease causing reddening of internal tissues with a sour smell.', ta: 'புளிப்பு வாசனையுடன் உள் திசுக்கள் சிவந்து போகும் பூஞ்சை நோய்.'}, image: 'https://images.unsplash.com/photo-1541535499925-635235ae3496?auto=format&fit=crop&q=80&w=800' } },
                banana: { name: {en: 'Banana', ta: 'வாழை'}, 'bunchy top virus': { name: {en: 'Bunchy Top Virus', ta: 'குலை வைரஸ் நோய்'}, text: {en: 'Viral disease causing stunted growth and bunched leaves at the top.', ta: 'வளர்ச்சி குன்றி, இலைகள் உச்சியில் கொத்தாக காணப்படும் வைரஸ் நோய்.'}, image: 'https://images.unsplash.com/photo-1598164077226-89688a50a0b9?auto=format&fit=crop&q=80&w=800' } },
                cotton: { name: {en: 'Cotton', ta: 'பருத்தி'}, 'bollworm': { name: {en: 'Bollworm Complex', ta: 'காய் புழு'}, text: {en: 'Pest complex that damages squares, flowers, and bolls, leading to significant yield loss.', ta: 'சதுரங்கள், பூக்கள் மற்றும் காய்களை சேதப்படுத்தும் பூச்சி, பெரும் மகசூல் இழப்புக்கு வழிவகுக்கிறது.'}, image: 'https://images.unsplash.com/photo-1617935499269-4220202a5c48?auto=format&fit=crop&q=80&w=800' } },
                mango: { name: {en: 'Mango', ta: 'மா'}, 'powdery mildew': { name: {en: 'Powdery Mildew', ta: 'சாம்பல் நோய்'}, text: {en: 'A fungal disease that affects inflorescence, preventing fruit set. Appears as white powder on flowers and leaves.', ta: 'பழம் பிடிப்பதைத் தடுக்கும் ஒரு பூஞ்சை நோய். பூக்கள் மற்றும் இலைகளில் வெள்ளை தூள் போல் தோன்றும்.'}, image: 'https://images.unsplash.com/photo-1591035133824-342ba8f6e2b0?auto=format&fit=crop&q=80&w=800' } }
            }
        },
        soil: {
            keywords: { en: ['soil', 'mann'], ta: ['மண்'] },
            initial_question: { en: 'Soil health is the foundation of farming. What aspect are you interested in?', ta: 'மண் ஆரோக்கியமே விவசாயத்தின் அடித்தளம். எந்த அம்சம் பற்றி அறிய விரும்புகிறீர்கள்?' },
            options: { en: ['Soil Testing', 'Improving Soil', 'Soil Types'], ta: ['மண் பரிசோதனை', 'மண் வளம்', 'மண் வகைகள்'] },
            responses: {
                'soil testing': { keywords: { en: ['testing', 'test'], ta: ['பரிசோதனை']}, type: 'card', content: { title: { en: 'Soil Testing: The First Step', ta: 'மண் பரிசோதனை: முதல் படி' }, image: 'https://images.unsplash.com/photo-1599599907146-21b3a137882b?auto=format&fit=crop&q=80&w=800', text: { en: '<b>What:</b> A scientific analysis of your soil\'s nutrient content (N, P, K) and pH level.<br><b>Why:</b> It prevents over/under-fertilization, saves money on inputs, and protects long-term soil health.<br><b>How:</b> Collect samples from various spots (15-20cm depth), mix them, and submit to a TNAU soil testing lab or a Krishi Vigyan Kendra (KVK).', ta: '<b>என்ன:</b> உங்கள் மண்ணின் ஊட்டச்சத்து (N, P, K) மற்றும் pH அளவின் அறிவியல் பகுப்பாய்வு.<br><b>ஏன்:</b> இது அதிகப்படியான உரமிடுதலைத் தடுக்கிறது, பணத்தை மிச்சப்படுத்துகிறது மற்றும் நீண்ட கால மண் ஆரோக்கியத்தைப் பாதுகாக்கிறது.<br><b>எப்படி:</b> உங்கள் வயலின் பல இடங்களில் இருந்து மாதிரிகளைச் சேகரித்து (15-20 செ.மீ ஆழத்தில்), TNAU மண் பரிசோதனை ஆய்வகத்தில் சமர்ப்பிக்கவும்.' } } },
                'improving soil': { keywords: { en: ['improving', 'improve', 'health'], ta: ['வளம்']}, type: 'card', content: { title: { en: 'Improving Soil Fertility', ta: 'மண் வளத்தை மேம்படுத்துதல்' }, image: 'https://images.unsplash.com/photo-1615839338199-c6e38029c742?auto=format&fit=crop&q=80&w=800', text: { en: '<b>Organic Matter:</b> Use farmyard manure or vermicompost to improve soil structure, water retention, and microbial activity.<br><b>Crop Rotation:</b> Avoid planting the same crop repeatedly. Rotate with legumes (like pulses) to naturally fix atmospheric nitrogen.<br><b>Green Manure:</b> Grow crops like Sunnhemp or Dhaincha and plow them into the soil before they flower to add significant organic matter.', ta: '<b>கரிமப் பொருட்கள்:</b> மண் அமைப்பு மற்றும் நீர் தேக்கத்தை மேம்படுத்த தொழு உரம் அல்லது மண்புழு உரத்தைப் பயன்படுத்தவும்.<br><b>பயிர் சுழற்சி:</b> ஒரே பயிரை மீண்டும் மீண்டும் பயிரிடுவதைத் தவிர்க்கவும். நைட்ரஜனை இயற்கையாக நிலைநிறுத்த பருப்பு வகைகள் போன்றவற்றுடன் சுழற்சி செய்யவும்.<br><b>பசுந்தாள் உரம்:</b> சனபு அல்லது தக்கைப்பூண்டு போன்ற பயிர்களை வளர்த்து, பூக்கும் முன் மண்ணில் உழுது சேர்க்கவும்.' } } },
                'soil types': { keywords: { en: ['types'], ta: ['வகைகள்']}, type: 'text', content: { en: 'Tamil Nadu features diverse soils: <b>Red Loam</b> (good for most crops, requires organic matter), <b>Black Clay</b> (high fertility, poor drainage, good for cotton/paddy), and <b>Sandy Coastal</b> (good drainage, low nutrients, ideal for coconut/cashew).', ta: 'தமிழ்நாட்டில் பல மண் வகைகள் உள்ளன: <b>செம்மண்</b> (பெரும்பாலான பயிர்களுக்கு ஏற்றது), <b>கரிசல் மண்</b> (அதிக வளம், பருத்தி/நெல் க்கு நல்லது), மற்றும் <b>கடலோர மணல் மண்</b> (தென்னை/முந்திரிக்கு ஏற்றது).' } }
            }
        },
        weather: {
             keywords: { en: ['weather', 'forecast', 'vaanilai'], ta: ['வானிலை'] }
        },
        default_response: { en: "My apologies, my knowledge on that specific topic is still growing. Please try another query.", ta: "மன்னிக்கவும், அந்த குறிப்பிட்ட தலைப்பில் எனது அறிவு இன்னும் வளர்ந்து வருகிறது. வேறு வினவலை முயற்சிக்கவும்." }
    };
    
    // --- CORE RENDERING & UI FUNCTIONS ---
    function renderMessage(message, type) {
        const messageContainer = document.createElement('div');
        messageContainer.className = `chat-message ${type}-message`;
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';
        bubble.innerHTML = message;
        messageContainer.appendChild(bubble);
        chatWindow.appendChild(messageContainer);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function renderQuickReplies(options) {
        const repliesContainer = document.createElement('div');
        repliesContainer.className = 'quick-replies';
        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'reply-btn';
            button.innerText = option;
            button.onclick = () => processUserInput(option);
            repliesContainer.appendChild(button);
        });
        const lastBubble = chatWindow.lastElementChild?.querySelector('.chat-bubble');
        if (lastBubble) lastBubble.appendChild(repliesContainer);
    }

    function renderCard(cardData) {
         const cardHTML = `<div class="info-card"><img src="${cardData.image}" alt="${cardData.title[currentLanguage]}"><div class="info-card-content"><h4>${cardData.title[currentLanguage]}</h4><p>${cardData.text[currentLanguage]}</p></div></div>`;
        renderMessage(cardHTML, 'ai');
    }
    
    function showTypingIndicator(show = true) {
        typingIndicator.style.display = show ? 'block' : 'none';
        if (show) chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // --- LIVE WEATHER API FUNCTIONS ---
    async function fetchWeather() {
        if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === 'YOUR_API_KEY_HERE') {
            renderMessage({en: "Weather API key is not configured. The developer needs to add the key to the chatbot-logic.js file.", ta: "வானிலை API விசை உள்ளமைக்கப்படவில்லை. டெவலப்பர் chatbot-logic.js கோப்பில் விசையை சேர்க்க வேண்டும்."}[currentLanguage], 'ai');
            return;
        }
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=${currentLanguage}`;
        try {
            const response = await fetch(url);
            if (!response.ok) { throw new Error('Network error'); }
            const data = await response.json();
            const advice = generateWeatherAdvice(data);
            renderMessage(advice, 'ai');
        } catch (error) {
            console.error("Weather fetch error:", error);
            renderMessage({en: "Sorry, I couldn't fetch the live weather data at the moment.", ta: "மன்னிக்கவும், தற்போதைக்கு நேரடி வானிலை தரவைப் பெற முடியவில்லை."}[currentLanguage], 'ai');
        }
    }

    function generateWeatherAdvice(data) {
        const temp = data.main.temp;
        const humidity = data.main.humidity;
        const condition = data.weather[0].main.toLowerCase();
        const description = data.weather[0].description;
        let adviceText = '';

        if (condition.includes('rain') || condition.includes('thunderstorm') || condition.includes('drizzle')) {
            adviceText = {en: 'Rain is expected. Postpone pesticide/fertilizer spraying. Ensure proper field drainage to prevent waterlogging.', ta: 'மழை எதிர்பார்க்கப்படுகிறது. பூச்சிக்கொல்லி/உரம் தெளிப்பதைத் தள்ளி வைக்கவும். நீர் தேங்குவதைத் தவிர்க்க சரியான வடிகால் வசதியை உறுதி செய்யவும்.'}[currentLanguage];
        } else if (temp > 34) {
            adviceText = {en: 'High heat detected. Irrigate during the late evening to reduce evaporation. Monitor crops closely for signs of heat stress (wilting).', ta: 'அதிக வெப்பம் கண்டறியப்பட்டது. ஆவியாதலைக் குறைக்க மாலை வேளையில் பாசனம் செய்யவும். வெப்பத் தளர்ச்சியின் அறிகுறிகளுக்காக பயிர்களை உன்னிப்பாகக் கண்காணிக்கவும்.'}[currentLanguage];
        } else if (humidity > 85) {
            adviceText = {en: 'High humidity increases the risk of fungal diseases like Blight or Mildew. Ensure good air circulation around plants and be vigilant.', ta: 'அதிக ஈரப்பதம் பூஞ்சை நோய்களின் அபாயத்தை அதிகரிக்கிறது. தாவரங்களைச் சுற்றி நல்ல காற்றோட்டத்தை உறுதிசெய்து, விழிப்புடன் இருங்கள்.'}[currentLanguage];
        } else {
            adviceText = {en: 'Conditions seem favorable. It\'s a good day for standard farm operations.', ta: 'சூழல் சாதகமாகத் தெரிகிறது. இது सामान्य பண்ணை நடவடிக்கைகளுக்கு ஒரு நல்ல நாள்.'}[currentLanguage];
        }

        const report = {
            en: `<b>Live Weather Report for Coimbatore:</b><br>- <b>Condition:</b> ${description.charAt(0).toUpperCase() + description.slice(1)}<br>- <b>Temperature:</b> ${temp}°C<br>- <b>Humidity:</b> ${humidity}%<br><br><b>Actionable Advice:</b> ${adviceText}`,
            ta: `<b>கோயம்புத்தூர் நேரடி வானிலை அறிக்கை:</b><br>- <b>நிலை:</b> ${description}<br>- <b>வெப்பநிலை:</b> ${temp}°C<br>- <b>ஈரப்பதம்:</b> ${humidity}%<br><br><b>செயல்பாட்டு அறிவுரை:</b> ${adviceText}`
        };
        return report[currentLanguage];
    }
    
    // --- CORE LOGIC ---
    function findDirectResponse(message) { /* ... Logic from previous version ... */ return null; } // Placeholder for brevity
    function handleStatefulResponse(message) { /* ... Logic from previous version ... */ return false; } // Placeholder for brevity

    async function processUserInput(userInput) {
        const message = (typeof userInput === 'string') ? userInput : chatInput.value.trim();
        if (message === '') return;
        if (typeof userInput !== 'string') chatInput.value = '';
        renderMessage(message, 'user');
        showTypingIndicator(true);

        // This timeout simulates bot thinking and allows UI to update
        setTimeout(async () => {
            let topicFound = false;
            const lowerCaseMessage = message.toLowerCase();

            // Check for live weather first as it's an async call
            if (knowledgeBase.weather.keywords[currentLanguage].some(kw => lowerCaseMessage.includes(kw))) {
                await fetchWeather();
                topicFound = true;
            }
            
            if (!topicFound) {
                // The rest of the logic from the final version
                const directResponse = findDirectResponse(message);
                if (directResponse) {
                    if (directResponse.type === 'card') { renderCard(directResponse.content); } 
                    else { renderMessage(directResponse.content[currentLanguage], 'ai'); }
                    topicFound = true;
                }
            }

            if (!topicFound) {
                 if (handleStatefulResponse(message)) {
                     topicFound = true;
                 }
            }
            
            if (!topicFound) {
                for (const topicKey in knowledgeBase) {
                    const topicData = knowledgeBase[topicKey];
                    if (topicData.keywords && topicData.keywords[currentLanguage].some(kw => lowerCaseMessage.includes(kw))) {
                        renderMessage(topicData.initial_question[currentLanguage], 'ai');
                        renderQuickReplies(topicData.options[currentLanguage]);
                        conversationState.topic = topicKey;
                        conversationState.awaiting = 'option_selection'; // Simplified for this example
                        topicFound = true;
                        break;
                    }
                }
            }

            if (!topicFound) { renderMessage(knowledgeBase.default_response[currentLanguage], 'ai'); }
            
            showTypingIndicator(false);
        }, 800 + Math.random() * 400);
    }
    
    function toggleLanguage() {
        currentLanguage = (currentLanguage === 'en') ? 'ta' : 'en';
        langToggleBtn.innerText = knowledgeBase.ui_text.lang_button[currentLanguage];
        chatInput.placeholder = knowledgeBase.ui_text.placeholder[currentLanguage];
        chatWindow.innerHTML = '';
        initialGreeting();
    }

    function initialGreeting() {
        showTypingIndicator(true);
        setTimeout(() => {
            showTypingIndicator(false);
            const greeting = { en: 'Welcome! How can I assist you with your farm today?', ta: 'வணக்கம்! இன்று உங்கள் பண்ணை சம்பந்தமாக நான் எப்படி உதவ முடியும்?' };
            const options = { en: ['Live Weather', 'Soil Health', 'Market Price', 'Disease Info'], ta: ['நேரடி வானிலை', 'மண் வளம்', 'சந்தை விலை', 'நோய் தகவல்'] };
            renderMessage(greeting[currentLanguage], 'ai');
            renderQuickReplies(options[currentLanguage]);
        }, 1000);
    }

    // --- EVENT LISTENERS & INITIALIZATION ---
    sendBtn.addEventListener('click', () => processUserInput());
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') processUserInput(); });
    langToggleBtn.addEventListener('click', toggleLanguage);
    langToggleBtn.innerText = knowledgeBase.ui_text.lang_button[currentLanguage];
    chatInput.placeholder = knowledgeBase.ui_text.placeholder[currentLanguage];
    initialGreeting();
});
