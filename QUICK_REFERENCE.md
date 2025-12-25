# 🎯 Admin Dashboard - Quick Reference

## 🔗 Important URLs

| Page | URL | Description |
|------|-----|-------------|
| Admin Login | `http://localhost:3000/admin/login` | Login to admin panel |
| Admin Dashboard | `http://localhost:3000/admin/dashboard` | Main admin interface |
| Portfolio Home | `http://localhost:3000` | Public portfolio page |

## 🔑 First Time Setup

```powershell
# Run the setup script
.\setup-admin.ps1

# Or manually edit .env.local with your credentials
```

## 📊 Dashboard Tabs

### 1️⃣ Analytics
- View total portfolio visits
- See page-by-page breakdown
- Monitor traffic in real-time

### 2️⃣ Resume  
- Upload new resume PDF
- Replace current resume
- Download goes live instantly

### 3️⃣ Projects
- Add new projects
- Edit existing projects
- Delete old projects
- Upload project images

## ⌨️ Common Tasks

### Add a New Project
1. Go to Dashboard → Projects tab
2. Fill in project details
3. Click "Add Technology" for each tech in stack
4. Upload project image
5. Add links (live demo + GitHub)
6. Click "Create Project"

### Update Resume
1. Go to Dashboard → Resume tab
2. Click "Choose File"
3. Select your PDF resume
4. Click "Upload Resume"
5. Done! New resume is live

### Check Analytics
1. Go to Dashboard → Analytics tab
2. View total views
3. See breakdown by page
4. Stats update automatically

### Edit a Project
1. Go to Dashboard → Projects tab
2. Scroll to "Manage Projects"
3. Click edit icon on project
4. Make changes
5. Click "Save Changes"

### Delete a Project
1. Go to Dashboard → Projects tab
2. Click delete icon (trash)
3. Confirm deletion
4. Project removed and others renumbered

## 🔐 Security Checklist

- [x] `.env.local` created with credentials
- [x] `.env.local` is in `.gitignore`
- [x] `data/` folder is in `.gitignore`
- [x] Strong password set
- [x] NEXTAUTH_SECRET generated
- [ ] Changed default credentials (DO THIS!)

## 🚀 Deployment Checklist

For production deployment:

- [ ] Set ADMIN_USERNAME in hosting environment
- [ ] Set ADMIN_PASSWORD in hosting environment  
- [ ] Set NEXTAUTH_SECRET in hosting environment
- [ ] Set NEXTAUTH_URL to your domain
- [ ] Test login after deployment
- [ ] Verify analytics tracking works
- [ ] Test resume upload
- [ ] Test project management

## 🆘 Quick Fixes

### Can't login?
```powershell
# Restart dev server
npm run dev

# Check .env.local exists
Test-Path .env.local

# Regenerate secret if needed
.\setup-admin.ps1
```

### Projects not loading?
```powershell
# Check data file exists
Test-Path .\data\projects.json

# If missing, it will be created automatically
```

### Resume upload failing?
```powershell
# Check public folder exists
Test-Path .\public\Images

# Create if missing
New-Item -ItemType Directory -Path .\public\Images -Force
```

## 📱 Browser Compatibility

✅ Chrome/Edge (Recommended)
✅ Firefox
✅ Safari
✅ Mobile browsers

## 💡 Pro Tips

1. **Regular Backups**: Periodically backup `data/` folder
2. **Image Optimization**: Compress images before upload
3. **Test Before Deploy**: Always test locally first
4. **Monitor Analytics**: Check weekly to see traffic
5. **Keep Updated**: Run `npm update` monthly

## 📞 Getting Help

If you encounter issues:

1. Check browser console (F12)
2. Check terminal for errors
3. Read `ADMIN_README.md` for details
4. Clear cache and try again
5. Restart development server

## 🎨 Customization Ideas

Want to customize? Edit these files:

- `app/admin/dashboard/page.jsx` - Dashboard UI
- `app/admin/login/page.jsx` - Login page style
- `components/ViewTracker.jsx` - Tracking logic
- `app/api/admin/projects/route.js` - Project logic

## 📈 Analytics Explained

| Metric | What it Tracks |
|--------|----------------|
| Total Views | All page visits combined |
| Home Views | Visits to main page |
| Work Views | Visits to projects page |
| Resume Views | Visits to resume page |
| Contact Views | Visits to contact page |
| Certificates Views | Visits to certificates page |

**Note**: Each page visit counts once per session. Admin pages don't count.

## 🎯 Project Structure Tips

### Good Project Categories:
- AI|ML
- Website  
- Mobile App
- Bot
- Game
- 3D Model
- API
- Tool

### Technology Stack Examples:
- **Frontend**: React, Next.js, Vue, HTML, CSS
- **Backend**: Node.js, Python, Flask, Django
- **Database**: MongoDB, PostgreSQL, MySQL
- **AI/ML**: TensorFlow, PyTorch, Scikit-learn
- **Tools**: Git, Docker, AWS, Azure

### Image Guidelines:
- **Format**: PNG or JPG
- **Size**: 1200x800px recommended
- **File Size**: Under 1MB
- **Content**: Screenshots, mockups, or logos

## ⚡ Keyboard Shortcuts

While in admin dashboard:

- `Ctrl + R` - Refresh page
- `F5` - Reload dashboard
- `F12` - Open developer tools
- `Ctrl + Shift + Del` - Clear cache

## 🌟 Features Summary

✅ Secure authentication
✅ Real-time analytics  
✅ Resume management
✅ Project CRUD operations
✅ Image uploads
✅ Responsive design
✅ Session management
✅ Auto-save functionality
✅ Data persistence
✅ Production ready

---

**Happy managing! 🎉**

Keep this file handy for quick reference!
