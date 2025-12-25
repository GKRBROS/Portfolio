# ✅ Pre-Deployment Checklist

## Before Pushing to GitHub

### Critical Security Checks

- [ ] `.env.local` is NOT showing in `git status`
- [ ] `data/` folder is NOT showing in `git status`
- [ ] `.gitignore` includes `.env*.local` and `/data`
- [ ] You have saved your admin credentials somewhere safe

### Test Your Code Locally

- [ ] `npm run dev` works without errors
- [ ] Can access: http://localhost:3000
- [ ] Can access: http://localhost:3000/admin/login
- [ ] Can log in to admin dashboard
- [ ] Analytics tab works
- [ ] Resume upload works
- [ ] Projects management works

---

## Deploying to Vercel

### Step 1: Push to GitHub

```powershell
git add .
git commit -m "Add admin dashboard"
git push origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Select "Portfolio" repository
5. Click "Import"
6. Click "Deploy" (keep defaults)

### Step 3: Add Environment Variables

**CRITICAL**: Your site won't work without these!

1. After deployment, go to **Settings → Environment Variables**
2. Add all 4 variables:

```
ADMIN_USERNAME = (your username)
ADMIN_PASSWORD = (your password)
NEXTAUTH_SECRET = (generate with PowerShell command)
NEXTAUTH_URL = https://your-project.vercel.app
```

**Generate NEXTAUTH_SECRET**:
```powershell
$bytes = [byte[]]::new(32); (New-Object Security.Cryptography.RNGCryptoServiceProvider).GetBytes($bytes); [Convert]::ToBase64String($bytes)
```

3. Select "All" environments for each variable
4. Click "Save" for each

### Step 4: Redeploy

1. Go to "Deployments" tab
2. Click "..." on latest deployment
3. Click "Redeploy"
4. Wait 1-2 minutes

---

## After Deployment

### Test Your Live Site

- [ ] Home page loads: `https://your-site.vercel.app/`
- [ ] Work page loads: `https://your-site.vercel.app/work`
- [ ] Admin login accessible: `https://your-site.vercel.app/admin/login`
- [ ] Can log in with your credentials
- [ ] Dashboard loads after login
- [ ] Analytics tracking works (visit pages, check dashboard)
- [ ] Can upload resume
- [ ] Can manage projects

### Save Your URLs

**Live Portfolio**: `https://__________________________.vercel.app`

**Admin Login**: `https://__________________________.vercel.app/admin/login`

**Vercel Dashboard**: `https://vercel.com/dashboard`

---

## Troubleshooting

### ❌ Can't log in?

1. Check environment variables in Vercel
2. Make sure NEXTAUTH_URL matches your site URL
3. Verify NEXTAUTH_SECRET is set
4. Redeploy after adding variables

### ❌ "Application error"?

1. Check build logs in Vercel
2. Verify all environment variables are set
3. Check for TypeScript/build errors
4. Redeploy

### ❌ Projects not showing?

- Initial data is in `data/projects.json`
- Add projects via admin dashboard
- Check browser console for errors

---

## ✅ You're Done!

Once all checkboxes are ✅, your portfolio is live with:

- 🌐 Public portfolio accessible worldwide
- 🔐 Secure admin dashboard
- 📊 Analytics tracking
- 📄 Resume management
- 🚀 Project management
- 🔄 Auto-deploy from GitHub

**Share your portfolio**: `https://your-site.vercel.app`

**Manage your portfolio**: `https://your-site.vercel.app/admin/login`

---

## 📚 Documentation

- [DEPLOY_QUICK_START.md](DEPLOY_QUICK_START.md) - Quick reference
- [VERCEL_DEPLOYMENT_GUIDE.md](VERCEL_DEPLOYMENT_GUIDE.md) - Detailed guide
- [ADMIN_README.md](ADMIN_README.md) - Admin features guide
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Command reference

**Need help?** Check the guides above or Vercel documentation.
