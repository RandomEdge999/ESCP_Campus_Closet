# CampusCloset

A student-exclusive fashion marketplace for ESCP Business School. Rent and buy fashion items sustainably within your campus community.

---

## 🚀 Quick Start (No Coding Experience Needed!)

### Prerequisites
You need **Node.js** installed on your computer. If you don't have it:
1. Go to https://nodejs.org/
2. Download the **LTS** version (the big green button)
3. Install it (just click Next through the installer)

### Running the Website

#### On Windows:
1. Double-click the **`start.bat`** file
2. Wait for it to install dependencies (only needed the first time)
3. Open your browser to **http://localhost:5173**

#### On Mac/Linux:
1. Open Terminal in this folder
2. Run: `chmod +x start.sh` (only needed once to make it executable)
3. Run: `./start.sh`
4. Open your browser to **http://localhost:5173**

#### To Stop the Server:
Press `Ctrl + C` in the terminal window

---

## Features

- **Curated Collections** - Gala Season, Career Fair, Semester Essentials
- **Rent or Buy** - Flexible options for every occasion
- **Secure Locker System** - No shipping fees, pickup at campus lockers
- **Student Verification** - Exclusive access for verified ESCP students

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons

---

## For Developers

### Manual Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure

```
Campus_closet/
├── public/
│   └── favicon.svg           # Browser tab icon
├── src/
│   ├── components/
│   │   ├── AuthModal.jsx     # Student login popup
│   │   ├── LockerDashboard.jsx # Rental management
│   │   ├── Logo.jsx          # CC logo
│   │   └── ProductModal.jsx  # Product details
│   ├── data/
│   │   ├── collections.js    # Collection categories
│   │   └── items.js          # Product listings
│   ├── App.jsx               # Main app
│   ├── index.css             # Styles
│   └── main.jsx              # Entry point
├── index.html                # HTML template
├── start.bat                 # Windows start script
├── start.sh                  # Mac/Linux start script
└── package.json              # Dependencies
```

---

## Founding Team

- Antonio Santarsiere
- Ina Angebault
- Benedetta Bertin
- Benedikt Bodman
- Nayab Azhar
- Kylie Baradeau

## Campus Location

ESCP Business School  
Champerret Campus  
6 Avenue de la Porte de Champerret  
75017 Paris, France

---

---

## 🌐 Deploying to GitHub Pages

The site is set up for **automatic deployment**. Every time you push to the `main` branch, it will automatically build and deploy!

### One-Time Setup:

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/Campus_closet.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repo on GitHub
   - Click **Settings** → **Pages** (in left sidebar)
   - Under "Build and deployment", set **Source** to **GitHub Actions**
   - That's it! Wait 2-3 minutes for the first deploy

3. **Your site will be live at:**
   ```
   https://YOUR_USERNAME.github.io/Campus_closet/
   ```

### After Setup:
Just push your changes and the site updates automatically!
```bash
git add .
git commit -m "Your changes"
git push
```

---

© 2025 CampusCloset Project. Built with purpose in Paris.
