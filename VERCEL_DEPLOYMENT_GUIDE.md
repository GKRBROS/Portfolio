# 🚀 Deploying Your Portfolio to Vercel via GitHub

This guide will walk you through deploying your portfolio with admin dashboard to Vercel.

## 📋 Prerequisites

✅ GitHub account
✅ Vercel account (free at [vercel.com](https://vercel.com))
✅ Your portfolio code ready to push
✅ Admin credentials ready

---

## 🔥 Step-by-Step Deployment Guide

### **Step 1: Prepare Your Code for GitHub**

#### 1.1 Verify Sensitive Files Won't Be Committed

Check that your `.gitignore` file is properly configured (already done ✅):
- `.env.local` is excluded
- `data/` folder is excluded
- Your credentials won't be public

#### 1.2 Check What Will Be Committed

```powershell
# See what files will be committed
git status

# Make sure .env.local and data/ are NOT in the list
```

**IMPORTANT**: If you see `.env.local` or `data/` in the git status, **DO NOT PROCEED**. They should be ignored.

---

### **Step 2: Push to GitHub**

#### 2.1 Initialize Git (if not already done)

```powershell
# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Add admin dashboard and deployment config"
```

#### 2.2 Push to GitHub

```powershell
# Add your GitHub repository as remote
git remote add origin https://github.com/GKRBROS/Portfolio.git

# Push to GitHub
git push -u origin main
```

Or if you get an error about existing content:
```powershell
git push -u origin main --force
```

---

### **Step 3: Deploy to Vercel**

#### 3.1 Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Log In"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account

#### 3.2 Import Your Project

1. Click **"Add New..."** → **"Project"**
2. Find your **"Portfolio"** repository in the list
3. Click **"Import"**

#### 3.3 Configure Build Settings

Vercel should auto-detect Next.js. Verify these settings:

- **Framework Preset**: Next.js ✅ (auto-detected)
- **Root Directory**: ./ (default)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

**Leave all defaults** and click **"Deploy"** (we'll add environment variables in the next step).

---

### **Step 4: Add Environment Variables** 🔑

This is the **MOST IMPORTANT** step for your admin panel to work!

#### 4.1 Open Project Settings

1. After deployment, go to your project dashboard
2. Click **"Settings"** at the top
3. Click **"Environment Variables"** in the left sidebar

#### 4.2 Add Required Variables

Add these **4 environment variables** one by one:

**Variable 1: ADMIN_USERNAME**
- **Name**: `ADMIN_USERNAME`
- **Value**: `admin` (or your chosen username)
- **Environment**: Select all (Production, Preview, Development)
- Click **"Save"**

**Variable 2: ADMIN_PASSWORD**
- **Name**: `ADMIN_PASSWORD`
- **Value**: Your secure password (e.g., `MySecurePass123!`)
- **Environment**: Select all (Production, Preview, Development)
- Click **"Save"**

**Variable 3: NEXTAUTH_SECRET**
- **Name**: `NEXTAUTH_SECRET`
- **Value**: Generate one using this PowerShell command:
  ```powershell
  $bytes = [byte[]]::new(32); (New-Object Security.Cryptography.RNGCryptoServiceProvider).GetBytes($bytes); [Convert]::ToBase64String($bytes)
  ```
  Copy the output and paste it here
- **Environment**: Select all (Production, Preview, Development)
- Click **"Save"**

**Variable 4: NEXTAUTH_URL**
- **Name**: `NEXTAUTH_URL`
- **Value**: Your Vercel URL (e.g., `https://portfolio-gkrbros.vercel.app`)
  - You can find this in your project dashboard
  - Or leave it blank initially and add it after first deployment
- **Environment**: Production only
- Click **"Save"**

#### 4.3 Screenshot of What It Should Look Like

Your environment variables section should show:
```
ADMIN_USERNAME     = admin
ADMIN_PASSWORD     = •••••••••••
NEXTAUTH_SECRET    = •••••••••••••••••••
NEXTAUTH_URL       = https://your-site.vercel.app
```

---

### **Step 5: Redeploy with Environment Variables**

#### 5.1 Trigger Redeploy

After adding environment variables:

1. Go to **"Deployments"** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Click **"Redeploy"** again to confirm

OR

Just push a small change to GitHub:
```powershell
# Make a small change
git commit --allow-empty -m "Trigger redeploy with env vars"
git push
```

#### 5.2 Wait for Deployment

- Wait 1-2 minutes for deployment to complete
- Watch the build logs in real-time
- Look for "✅ Build Completed" message

---

### **Step 6: Test Your Deployment** 🎉

#### 6.1 Access Your Live Site

Your portfolio is now live at:
```
https://portfolio-gkrbros.vercel.app
```

Or your custom domain if you set one up.

#### 6.2 Test Public Pages

Visit these URLs to verify public pages work:
- `https://your-site.vercel.app/` - Home page
- `https://your-site.vercel.app/work` - Projects page
- `https://your-site.vercel.app/resume` - Resume page
- `https://your-site.vercel.app/contact` - Contact page

#### 6.3 Test Admin Login

1. Go to: `https://your-site.vercel.app/admin/login`
2. Enter your `ADMIN_USERNAME` and `ADMIN_PASSWORD`
3. Click **"Login"**
4. You should be redirected to the dashboard!

#### 6.4 Test Admin Features

Once logged in, test:

✅ **Analytics Tab**
- Should show page views (might be 0 initially)

✅ **Resume Tab**
- Upload a test PDF
- Download resume from home page to verify

✅ **Projects Tab**
- View existing projects
- Try editing a project
- Try adding a new project

---

## 🔄 Updating Your Site

### Make Changes Locally

```powershell
# 1. Make your changes
# 2. Test locally
npm run dev

# 3. Commit changes
git add .
git commit -m "Your update message"

# 4. Push to GitHub
git push

# 5. Vercel auto-deploys! (wait 1-2 minutes)
```

---

## 🌐 Custom Domain Setup (Optional)

### Add Your Own Domain

1. Go to Vercel project → **"Settings"** → **"Domains"**
2. Click **"Add"**
3. Enter your domain (e.g., `gokulkiran.com`)
4. Follow Vercel's DNS configuration instructions
5. Update `NEXTAUTH_URL` environment variable to your custom domain

---

## 🔒 Security Checklist

Before making your repo public, verify:

- [ ] `.env.local` is NOT in your GitHub repo
- [ ] `data/` folder is NOT in your GitHub repo
- [ ] Environment variables are set in Vercel dashboard
- [ ] Admin password is strong and secure
- [ ] You can successfully log in to admin panel
- [ ] Analytics tracking works
- [ ] Resume upload works
- [ ] Project management works

---

## 🐛 Troubleshooting

### ❌ "Application error" when accessing site

**Solution**: Check environment variables
1. Go to Vercel → Settings → Environment Variables
2. Verify all 4 variables are set correctly
3. Redeploy the project

### ❌ Can't log in to admin panel

**Solution**: Check credentials
1. Go to Vercel → Settings → Environment Variables
2. Verify `ADMIN_USERNAME` and `ADMIN_PASSWORD`
3. Make sure `NEXTAUTH_SECRET` is set
4. Check `NEXTAUTH_URL` matches your site URL
5. Try redeploying

### ❌ "Sign in error" message

**Solution**: Update NEXTAUTH_URL
1. Go to Vercel → Settings → Environment Variables
2. Update `NEXTAUTH_URL` to your full Vercel URL
3. Include `https://` at the start
4. Redeploy

### ❌ Resume upload not working

**Solution**: Check file size
1. Vercel has 4.5MB limit for serverless functions
2. Use smaller PDF files
3. Or upgrade Vercel plan

### ❌ Projects not showing

**Solution**: Check data folder
1. Projects are stored in `data/projects.json`
2. Initially populated with your existing projects
3. If empty, add projects via admin dashboard

---

## 📊 Monitoring Your Site

### Vercel Analytics

1. Go to your project dashboard
2. Click **"Analytics"** tab
3. See:
   - Page views
   - Load times
   - Unique visitors

### Your Admin Analytics

1. Log in to admin dashboard
2. Go to **Analytics** tab
3. See page-by-page breakdown

---

## 💡 Pro Tips

### Auto-Deploy from GitHub

✅ **Already enabled!** Every push to `main` branch auto-deploys

### Preview Deployments

- Every pull request gets a preview URL
- Test changes before merging
- Preview URL format: `portfolio-git-branch-name.vercel.app`

### Environment Variables per Branch

- Production: Used for `main` branch
- Preview: Used for pull requests
- Development: Used for `vercel dev` command

### Rollback Deployments

1. Go to **Deployments** tab
2. Find a previous successful deployment
3. Click **"..."** → **"Promote to Production"**

---

## 🎯 Quick Reference

### Important URLs

| What | URL |
|------|-----|
| Your Live Site | `https://portfolio-gkrbros.vercel.app` |
| Admin Login | `https://portfolio-gkrbros.vercel.app/admin/login` |
| Vercel Dashboard | `https://vercel.com/dashboard` |
| GitHub Repo | `https://github.com/GKRBROS/Portfolio` |

### Important Commands

```powershell
# Push updates
git add .
git commit -m "Update message"
git push

# Test locally
npm run dev

# Build locally (test before deploy)
npm run build
npm start
```

---

## 📞 Getting Help

### Check Build Logs

1. Go to Vercel → Deployments
2. Click on a deployment
3. View **"Building"** logs for errors

### Check Runtime Logs

1. Go to Vercel → Deployments
2. Click on a deployment
3. View **"Functions"** logs for runtime errors

### Vercel Support

- Docs: https://vercel.com/docs
- Discord: https://vercel.com/discord
- Twitter: @vercel

---

## 🎉 You're Live!

Your portfolio with admin dashboard is now:
- ✅ Live on the internet
- ✅ Auto-deploying from GitHub
- ✅ Secure with password protection
- ✅ Analytics tracking visitors
- ✅ Easy to update via dashboard

**Admin Panel**: `https://your-site.vercel.app/admin/login`

**Remember**: Keep your admin credentials safe and never commit `.env.local` to GitHub!

---

## 🔄 Next Steps

1. **Test everything** - Log in and test all admin features
2. **Update your resume** - Upload latest version via dashboard
3. **Add new projects** - As you build them, add via dashboard
4. **Monitor analytics** - Check weekly to see traffic
5. **Share your portfolio** - Send the link to recruiters!

**Enjoy your live portfolio! 🚀**
