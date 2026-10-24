# 💍 నాగబాబు & కళ్యాణి — Digital Wedding Invitation Website
### కరెడ్ల వారి పెండ్లిపిలుపు | Royal Telugu Digital Wedding Invitation

A royal, traditional, responsive Digital Wedding Invitation website built with HTML5, CSS3, and JavaScript, designed to be hosted on **Netlify** or **Vercel**.

---

## ✨ Features Included

1. **Royal Welcome Gate & Door-Opening Animation**:
   - Om medallion with golden glow.
   - Traditional Telugu title: *"కరెడ్ల వారి పెండ్లిపిలుపు"*.
   - Interactive *"ఆహ్వానం తెరవండి / Open Invitation"* button that ceremoniously opens the invitation and starts the auspicious music.

2. **Auspicious Shubh Aarambh (గణేశ ప్రార్థన)**:
   - Gold engraved Om symbol with *|| శ్రీ గణేశాయ నమః ||* and *శుభం భవతు • కళ్యాణం భవతు*.

3. **Couple Spotlight**:
   - High-resolution couple photo framed with royal gold filigree corners.
   - Elegant Telugu & English typography: **నాగబాబు (Nagababu)** & **కళ్యాణి (Kalyani)**.

4. **Live Countdown Timer**:
   - Live countdown to the wedding Muhurtham: **29th October 2026, 7:30 PM IST**.
   - Displays Days, Hours, Minutes, and Seconds.

5. **Traditional Telugu Wedding Card (వివాహ ఆహ్వాన శుభపత్రిక)**:
   - Full family lineage, Sanskrit shlokas, ancestral blessings, bride and groom details, exact muhurtham and lagnam details.
   - English translation included for out-of-town guests.

6. **Event Timeline**:
   - **విందు భోజనం (Grand Feast)**: 7:00 PM Onwards.
   - **శుభ ముహూర్తం (Wedding Ceremony)**: 7:30 PM (Mrigashira Nakshatram, Vrushabha Lagnam).

7. **Family Lineage Cards**:
   - Groom's family: Parents (Sri Karedla Rambabu & Smt. Maheshwari), grandparents, elders, brothers, sister.
   - Bride's family: Parents (Sri Pashakayala Veerababu & Smt. Padma), hometown (Samarlakota, Eedavadu, Vachchavooru).

8. **Venue & Google Maps Integration**:
   - **Venue**: Sri Sridevi Bhudevi Sameta Sri Venkateshwara Swami Temple, Keshavaram.
   - Plus Code: `WVPM+WQ2, Kesavaram, Andhra Pradesh 533341`.
   - Embedded Google Maps with instant **"Get Directions / దారి చూపు"** button.

9. **Smart RSVP System**:
   - Direct 1-tap **WhatsApp RSVP** with pre-formatted message sent directly to family contacts.
   - Interactive web RSVP form with guest counter and confetti celebration.

10. **Background Music & Floating Flower Petals**:
    - Falling rose and marigold petals shower effect.
    - Traditional Shehnai / Nadaswaram wedding music player with floating toggle button and Web Audio API fallback.

---

## 🚀 How to Host on Netlify or Vercel

### Option 1: Netlify (Drag & Drop — Easiest, 1 Minute)
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the whole `Digital Wedding` folder onto the page.
3. Your website is live instantly with a free URL like `nagababu-kalyani-wedding.netlify.app`!
4. You can also connect a custom domain or rename the site subdomain in Netlify settings.

### Option 2: Vercel
1. Push your folder to a GitHub repository or use Vercel CLI:
   ```bash
   npm i -g vercel
   vercel
   ```
2. Follow the prompt to deploy.
3. Your website will be live at `https://your-project.vercel.app`!

---

## 📁 Project Directory Structure
```
d:/Digital Wedding/
│
├── index.html              # Main HTML markup
├── netlify.toml            # Netlify deployment configuration
├── vercel.json             # Vercel deployment configuration
├── README.md               # Documentation
│
├── css/
│   ├── style.css           # Core design system & component styles
│   ├── animations.css      # Keyframes, gate opening, petal fall animations
│   └── responsive.css      # Mobile, tablet, and desktop responsive styles
│
├── js/
│   ├── main.js             # Gate controller, scroll reveal, sharing
│   ├── countdown.js        # Live timer to 29-10-2026, 7:30 PM
│   ├── petals.js           # Floating rose & marigold petals shower
│   ├── music.js            # Traditional music & Web Audio API synthesis
│   └── rsvp.js             # WhatsApp & web RSVP form with confetti
│
└── Image/
    └── Image.jpeg          # Couple photo
```
