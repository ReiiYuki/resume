# Resume GitHub Pages

A professional resume website built with JSON Resume and automatically deployed to GitHub Pages.

## 🚀 Features

- **JSON Resume Format**: Uses the standardized JSON Resume schema
- **Automatic Deployment**: GitHub Actions automatically builds and deploys your resume
- **Responsive Design**: Mobile-friendly and accessible
- **SEO Optimized**: Meta tags and structured data for better search visibility
- **Multiple Themes**: Easy to switch between different resume themes
- **Validation**: Automatic validation of resume data

## 📋 Quick Setup

### 1. Fork or Clone This Repository

```bash
git clone https://github.com/reiiyuki/resume.git
cd resume
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Customize Your Resume

Edit the `resume.json` file with your personal information. The file follows the [JSON Resume schema](https://jsonresume.org/schema/).

### 4. Test Locally

```bash
# Validate your resume data
pnpm run validate

# Serve locally with hot reload
pnpm run serve

# Build static HTML
pnpm run build
```

### 5. Deploy to GitHub Pages

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Set source to "GitHub Actions"

2. **Repository URLs** (already configured):
   - Repository: `https://github.com/reiiyuki/resume`
   - GitHub Pages URL: `https://reiiyuki.github.io/resume/`

3. **Push to Main Branch**:
   ```bash
   git add .
   git commit -m "Initial resume setup"
   git push origin main
   ```

4. **Automatic Deployment**:
   - GitHub Actions will automatically build and deploy your resume
   - Your resume will be available at `https://reiiyuki.github.io/resume/`

## 📝 Customizing Your Resume

### Basic Information

Edit the `basics` section in `resume.json`:

```json
{
  "basics": {
    "name": "Your Name",
    "label": "Your Professional Title",
    "email": "your.email@example.com",
    "phone": "+1-555-123-4567",
    "url": "https://yourwebsite.com",
    "summary": "A brief professional summary...",
    "location": {
      "city": "Your City",
      "countryCode": "US"
    },
    "profiles": [
      {
        "network": "GitHub",
        "username": "yourusername",
        "url": "https://github.com/yourusername"
      }
    ]
  }
}
```

### Work Experience

Add your work history in the `work` array:

```json
{
  "work": [
    {
      "name": "Company Name",
      "position": "Your Position",
      "url": "https://company.com",
      "startDate": "2022-01-01",
      "endDate": "2023-12-31",
      "summary": "Brief description of your role",
      "highlights": [
        "Achievement 1",
        "Achievement 2"
      ]
    }
  ]
}
```

### Skills

Organize your skills by category:

```json
{
  "skills": [
    {
      "name": "Frontend Development",
      "level": "Advanced",
      "keywords": ["React", "Vue.js", "TypeScript"]
    }
  ]
}
```

## 🎨 Themes

This setup uses the "elegant" theme by default. You can change themes by:

1. **Install a different theme**:
   ```bash
   pnpm add jsonresume-theme-THEME_NAME
   ```

2. **Update build script** in `package.json`:
   ```json
   {
     "scripts": {
       "build": "resume export index.html --theme THEME_NAME"
     }
   }
   ```

3. **Popular themes**:
   - `jsonresume-theme-elegant`
   - `jsonresume-theme-paper`
   - `jsonresume-theme-kendall`
   - `jsonresume-theme-flat`

## 🔧 Advanced Configuration

### Custom Domain

To use a custom domain:

1. Add a `CNAME` file to the repository root:
   ```
   yourdomain.com
   ```

2. Configure DNS settings with your domain provider

### Environment Variables

For sensitive information, use GitHub Secrets:

1. Go to repository Settings → Secrets and variables → Actions
2. Add secrets like `RESUME_EMAIL`, `RESUME_PHONE`
3. Reference in your workflow or build process

### Custom Styling

To customize the appearance:

1. **Modify `index.html`**: Edit the embedded CSS styles
2. **Create custom theme**: Follow the [JSON Resume theming guide](https://jsonresume.org/getting-started/)
3. **Add external CSS**: Link to external stylesheets in `index.html`

## 📱 Mobile Optimization

The resume is automatically optimized for mobile devices with:

- Responsive design
- Touch-friendly navigation
- Optimized font sizes
- Fast loading times

## 🔍 SEO Features

Built-in SEO optimizations include:

- Meta tags for social sharing
- Structured data markup
- Semantic HTML
- Fast loading performance
- Mobile-friendly design

## 🚀 Deployment Options

### GitHub Pages (Recommended)

Automatic deployment via GitHub Actions (already configured).

### Manual Deployment

```bash
# Build the resume
pnpm run build

# Deploy to gh-pages branch
pnpm run deploy
```

### Other Platforms

The generated `index.html` can be deployed to:

- Netlify
- Vercel
- AWS S3
- Any static hosting service

## 🛠 Development

### Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run serve

# Validate resume data
pnpm run validate

# Build for production
pnpm run build
```

### File Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── resume.json                 # Your resume data
├── index.html                  # Generated resume webpage
├── package.json               # Dependencies and scripts
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

## 📚 Resources

- [JSON Resume Schema](https://jsonresume.org/schema/)
- [JSON Resume Themes](https://jsonresume.org/themes/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

**Resume not updating after push:**
- Check GitHub Actions tab for build errors
- Ensure GitHub Pages is enabled in repository settings
- Verify the workflow has proper permissions

**Validation errors:**
- Run `pnpm run validate` locally
- Check JSON syntax in `resume.json`
- Refer to the [JSON Resume schema](https://jsonresume.org/schema/)

**Styling issues:**
- Clear browser cache
- Check for JavaScript console errors
- Verify all external resources are loading

### Getting Help

- [JSON Resume Community](https://github.com/jsonresume/resume-cli/issues)
- [GitHub Pages Support](https://docs.github.com/en/pages)
- [Create an issue](https://github.com/reiiyuki/resume/issues) in this repository

---

**Made with ❤️ using [JSON Resume](https://jsonresume.org/) and [GitHub Pages](https://pages.github.com/)**
