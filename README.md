# 🏥 Smart Health Assistant

A comprehensive health assistant web application built for a 7th-grade project. This application helps users manage their health with interactive tools and features.

## Features

### 1. **BMI Calculator**
- Calculate Body Mass Index (BMI) instantly
- Color-coded health categories (Underweight, Normal, Overweight, Obese)
- Helpful health tips based on BMI results

### 2. **Symptom-to-Specialist Guide**
- Enter symptoms and get recommendations for the right type of doctor
- Powered by a medical database with common symptoms and specialist mappings
- Helps users understand which healthcare professional to consult

### 3. **Daily Health Checklist**
- Track daily health habits (e.g., "Drank 8 glasses of water", "Exercised for 30 minutes")
- Persistent storage using browser LocalStorage
- Check off completed items
- Add and delete custom checklist items

### 4. **Medicine Reminder System**
- Set reminders for medications with name and time
- Browser alerts when it's time to take medicine
- View all active reminders
- Manage reminders (add/delete)

### 5. **First Aid Quick Search**
- Searchable database of basic first aid instructions
- Covers common emergencies: Burns, Choking, Cuts, Fainting, Nosebleeds, Sprains, etc.
- Step-by-step instructions with safety warnings

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Python (Flask)
- **Storage**: JSON files for medical database, LocalStorage for user data
- **Deployment**: Vercel

## 🚀 Deployment on Vercel

This project is configured to deploy on Vercel with zero configuration!

### Prerequisites
- A GitHub, GitLab, or Bitbucket account
- A Vercel account (free tier works perfectly)

### Deployment Steps

#### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Go to [vercel.com](https://vercel.com) and sign in**

3. **Click "Add New Project"**

4. **Import your Git repository**

5. **Vercel will automatically detect Flask:**
   - Framework Preset: Flask (auto-detected)
   - Root Directory: `./` (leave as default)
   - Build Command: (leave empty, not needed for Flask)
   - Output Directory: (leave empty)
   - Install Command: `pip install -r requirements.txt`

6. **Click "Deploy"**

7. **Wait for deployment to complete** (usually 1-2 minutes)

8. **Your app will be live!** 🎉

#### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Navigate to project directory:**
   ```bash
   cd smart-health-assistant
   ```

4. **Deploy:**
   ```bash
   vercel
   ```

5. **Follow the prompts:**
   - Link to existing project? No (first time)
   - Project name: smart-health-assistant (or your choice)
   - Directory: ./ (default)
   - Override settings? No

6. **For production deployment:**
   ```bash
   vercel --prod
   ```

### Project Structure for Vercel

```
smart-health-assistant/
│
├── app.py                 # Flask app (Vercel entrypoint)
├── vercel.json           # Vercel configuration
├── requirements.txt      # Python dependencies
├── .vercelignore        # Files to ignore during deployment
│
├── data/                 # JSON databases
│   ├── medical_db.json
│   └── first_aid_db.json
│
├── templates/            # HTML templates
│   └── index.html
│
└── public/               # Static files (served by Vercel CDN)
    ├── css/
    │   └── style.css
    └── js/
        └── script.js
```

### Important Notes for Vercel

- ✅ **Static files** are in the `public/` directory (Vercel requirement)
- ✅ Flask app is in `app.py` (recognized entrypoint)
- ✅ Templates stay in `templates/` (Flask default)
- ✅ JSON data files are included and work at runtime
- ✅ `vercel.json` configures the deployment

### Local Development

To test locally before deploying:

1. **Create virtual environment:**
   ```bash
   python -m venv .venv
   ```

2. **Activate virtual environment:**
   - Windows: `.venv\Scripts\activate`
   - Mac/Linux: `source .venv/bin/activate`

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run Flask app:**
   ```bash
   python app.py
   ```

5. **Or use Vercel CLI for local dev:**
   ```bash
   vercel dev
   ```

## How to Use

1. **BMI Calculator:**
   - Enter your height (in cm) and weight (in kg)
   - Click "Calculate BMI"
   - View your BMI category and health tips

2. **Symptom Guide:**
   - Enter symptoms (comma-separated, e.g., "toothache, headache")
   - Click "Find Specialist"
   - Get recommendations for which doctor to see

3. **Health Checklist:**
   - Type a health habit and click "Add Item"
   - Check off items as you complete them
   - Items are saved automatically (even after page refresh)

4. **Medicine Reminder:**
   - Enter medicine name and select a time
   - Click "Set Reminder"
   - You'll get a browser alert when it's time to take the medicine

5. **First Aid:**
   - Type a first aid topic (e.g., "Burn", "Choking")
   - View step-by-step instructions
   - Read safety warnings

## Notes for Students

- This is an educational project and **NOT a replacement for professional medical advice**
- Always consult with healthcare professionals for actual medical concerns
- The symptom guide provides general recommendations only
- First aid instructions are basic guides - always seek professional help for serious emergencies

## Troubleshooting Deployment

**Problem**: Deployment fails
- **Solution**: Make sure `requirements.txt` includes Flask and all dependencies

**Problem**: Static files (CSS/JS) not loading
- **Solution**: Verify files are in `public/css/` and `public/js/` directories (not `static/`)

**Problem**: API routes not working
- **Solution**: Check `vercel.json` configuration and ensure routes point to `app.py`

**Problem**: JSON data files not found
- **Solution**: Ensure `data/` directory is included in repository and not in `.vercelignore`

## Customization Ideas

- Add more symptoms to `data/medical_db.json`
- Expand first aid topics in `data/first_aid_db.json`
- Customize colors in `public/css/style.css`
- Add new features like exercise tracker or meal planner

## License

This is an educational project. Feel free to use and modify for learning purposes.

---

**Happy Coding! 🚀**
