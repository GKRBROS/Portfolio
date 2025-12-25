# 🎯 Quick Start: GitHub → Vercel Deployment

## Before Pushing to GitHub

1. **Verify your .env.local won't be committed**:
   ```powershell
   git status
   ```
   ⚠️ Make sure `.env.local` is NOT in the list!

2. **Test locally one more time**:
   ```powershell
   npm run dev
   ```
   Visit: http://localhost:3000/admin/login

---

## Push to GitHub

```powershell
# Add all files
git add .

# Commit
git commit -m "Add admin dashboard for Vercel deployment"

# Push to your repo
git push origin main
```

---

## Deploy to Vercel

### 1. **Import Project**
- Go to [vercel.com](https://vercel.com)
- Click "Add New..." → "Project"
- Select your "Portfolio" repository
- Click "Import"

### 2. **Keep Default Settings**
- Framework: Next.js ✅
- Click "Deploy" (will fail without env vars, that's OK!)

### 3. **Add Environment Variables** 🔑
Go to: **Settings → Environment Variables**

Add these 4 variables:

| Name | Value | Example |
|------|-------|---------|
| `ADMIN_USERNAME` | Your username | `admin` |
| `ADMIN_PASSWORD` | Your password | `SecurePass123!` |
| `NEXTAUTH_SECRET` | Generate with command below | (32-char random string) |
| `NEXTAUTH_URL` | Your Vercel URL | `https://portfolio-gkrbros.vercel.app` |

**Generate NEXTAUTH_SECRET**:
```powershell
$bytes = [byte[]]::new(32); (New-Object Security.Cryptography.RNGCryptoServiceProvider).GetBytes($bytes); [Convert]::ToBase64String($bytes)
```

### 4. **Redeploy**
- Go to "Deployments" tab
- Click "..." on latest deployment
- Click "Redeploy"

---

## Access Your Site

### Public Portfolio
```
https://your-project-name.vercel.app
```

### Admin Login
```
https://your-project-name.vercel.app/admin/login
```

**Login with:**
- Username: (your ADMIN_USERNAME)
- Password: (your ADMIN_PASSWORD)

---

## Test Everything

✅ Visit home page
✅ Check projects page
✅ Log into admin panel
✅ View analytics
✅ Upload a test resume
✅ Edit a project

---

## Future Updates

```powershell
# Make changes → Test → Push
git add .
git commit -m "Your update"
git push

# Vercel auto-deploys in ~1 minute!
```

---

**📖 Need detailed help?** Read [VERCEL_DEPLOYMENT_GUIDE.md](VERCEL_DEPLOYMENT_GUIDE.md)

**✅ You're live!** 🎉
