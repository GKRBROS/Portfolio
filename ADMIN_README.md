# Portfolio Admin Dashboard

This portfolio website now includes a comprehensive admin dashboard for managing content and tracking analytics.

## 🔐 Admin Features

### Authentication
- Secure login with username and password
- Credentials stored in `.env.local` file
- Session-based authentication using NextAuth

### Analytics Dashboard
- Track total portfolio views
- View individual page statistics (home, work, resume, contact, certificates)
- Real-time analytics updates

### Resume Management
- Upload and replace resume PDF files
- Files stored in `/public/Images/`
- Instant deployment to live site

### Projects Management
- **Create** new projects with:
  - Title and category
  - Description
  - Technology stack (multiple technologies)
  - Project images
  - Live demo links
  - GitHub repository links
- **Edit** existing projects
- **Delete** projects
- Automatic project numbering

## 🚀 Getting Started

### 1. Configure Admin Credentials

Edit the `.env.local` file in the root directory:

```env
ADMIN_USERNAME=your_username_here
ADMIN_PASSWORD=your_secure_password_here
NEXTAUTH_SECRET=your_nextauth_secret_key_here
NEXTAUTH_URL=http://localhost:3000
```

**Important:** 
- Replace `your_username_here` and `your_secure_password_here` with your chosen credentials
- Generate a secure NEXTAUTH_SECRET by running: `openssl rand -base64 32`
- Never commit `.env.local` to git (already in .gitignore)

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Access Admin Dashboard

1. Navigate to: `http://localhost:3000/admin/login`
2. Enter your credentials from `.env.local`
3. Access the dashboard at: `http://localhost:3000/admin/dashboard`

## 📁 Project Structure

```
├── app/
│   ├── admin/
│   │   ├── login/           # Admin login page
│   │   └── dashboard/       # Admin dashboard
│   ├── api/
│   │   ├── auth/            # NextAuth configuration
│   │   ├── admin/           # Admin API routes
│   │   │   ├── projects/    # Project management
│   │   │   ├── resume/      # Resume upload
│   │   │   └── upload-image/# Image upload
│   │   └── analytics/       # View tracking
├── components/
│   ├── AuthProvider.jsx     # NextAuth session provider
│   └── ViewTracker.jsx      # Page view tracking
├── data/
│   ├── projects.json        # Projects database
│   └── analytics.json       # Analytics data
├── lib/
│   └── auth.js              # Authentication utilities
└── .env.local               # Environment variables (DO NOT COMMIT)
```

## 🔒 Security Notes

1. **Never commit `.env.local`** - It contains sensitive credentials
2. The `.gitignore` file excludes:
   - `.env*.local`
   - `/data` directory (contains user analytics)
3. Change default admin credentials immediately
4. Use strong passwords for production
5. For production deployment, set environment variables in your hosting platform

## 📊 Data Storage

### Projects
- Stored in `data/projects.json`
- Automatically synchronized with the work page
- Supports create, read, update, and delete operations

### Analytics
- Stored in `data/analytics.json`
- Tracks page views automatically
- Updates in real-time

## 🎨 Dashboard Features

### Analytics Tab
- View total portfolio views
- See breakdown by page
- Last update timestamp

### Resume Tab
- Upload new resume PDF
- Replaces existing resume
- Immediate availability on site

### Projects Tab
- Add new projects with full details
- Edit existing projects inline
- Delete projects with confirmation
- Upload project images
- Manage technology stack tags
- Add live demo and GitHub links

## 🛠️ API Endpoints

### Public Endpoints
- `GET /api/analytics` - Get analytics data
- `POST /api/analytics` - Track page view

### Protected Endpoints (Require Authentication)
- `GET /api/admin/projects` - List all projects
- `POST /api/admin/projects` - Create new project
- `PUT /api/admin/projects` - Update project
- `DELETE /api/admin/projects` - Delete project
- `POST /api/admin/resume` - Upload resume
- `POST /api/admin/upload-image` - Upload project image

## 🚀 Production Deployment

1. Set environment variables in your hosting platform:
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (your production URL)

2. Build the project:
```bash
npm run build
```

3. Start production server:
```bash
npm start
```

## 📝 Notes

- Projects are automatically numbered when created
- Deleting a project renumbers remaining projects
- Image uploads generate unique filenames with timestamps
- View tracking excludes admin pages
- Resume uploads overwrite the existing file

## 🐛 Troubleshooting

### Can't log in
- Check `.env.local` credentials
- Ensure NEXTAUTH_SECRET is set
- Clear browser cookies and try again

### Projects not showing
- Check `data/projects.json` exists
- Verify JSON format is valid
- Check browser console for errors

### Resume not uploading
- Ensure file is PDF format
- Check file size (max depends on hosting)
- Verify `/public/Images/` directory exists

## 📧 Support

For issues or questions, refer to the Next.js and NextAuth documentation:
- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth Documentation](https://next-auth.js.org/)
