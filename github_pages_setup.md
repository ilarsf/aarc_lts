# Setting Up GitHub Pages for AARC Learn to Scull

This guide will walk you through setting up GitHub Pages to publish your Learn to Scull materials as a website.

## Step 1: Initialize Git Repository

First, initialize your local directory as a Git repository:

```bash
cd "/Users/larsf/Dropbox (Personal)/AARC/GitHub/aarc_lts"
git init
git add .
git commit -m "Initial commit of Learn to Scull materials"
```

## Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top-right corner and select "New repository"
3. Name your repository (e.g., "aarc_lts")
4. Make it public (for GitHub Pages) or private if you prefer
5. Click "Create repository"
6. Follow the instructions to push your existing repository:

```bash
git remote add origin https://github.com/YOUR-USERNAME/aarc_lts.git
git branch -M main
git push -u origin main
```

## Step 3: Configure GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "GitHub Pages" section
4. Under "Source", select "main" branch
5. Click "Save"

GitHub will provide a URL where your site is published (usually https://YOUR-USERNAME.github.io/aarc_lts/).

## Step 4: Add a Jekyll Theme (Optional but Recommended)

The simplest way to make your Markdown files look good is to use a Jekyll theme:

1. Create a file named `_config.yml` in your repository root:

```yaml
title: AARC Learn to Scull Program
description: Training materials for the Austin Area Rowing Club's Learn to Scull program
remote_theme: pages-themes/cayman@v0.2.0
plugins:
- jekyll-remote-theme
```

2. Create a file named `index.md` in your repository root:

```markdown
---
layout: default
---

# AARC Learn to Scull Program

Welcome to the Austin Area Rowing Club's Learn to Scull program materials.

## Materials for Coaches

- [Coach's Manual](course_materials/coach/Coach_Manual.md)
- [Daily Coach Checklist](course_materials/coach/Daily_Coach_Checklist.md)

## Materials for Learners

- [Learner's Guide](course_materials/learner/Learner_Guide.md)
- [Q&A Companion](course_materials/learner/QA_Companion.md)

## Communication Templates

- [Email Templates](course_materials/communication/Email_Templates.md)
```

3. Commit and push these files:

```bash
git add _config.yml index.md
git commit -m "Add GitHub Pages configuration"
git push
```

## Step 5: Organize Navigation (Optional)

For better organization, you can create a `_layouts/default.html` file to customize navigation. However, this is more advanced and can be added later if needed.

## Step 6: Wait for Deployment

GitHub Pages may take a few minutes to build your site. You can check the status in the "GitHub Pages" section of your repository settings.

## Additional Options

### Custom Domain

If you want to use a custom domain (e.g., learn.austinrowing.org):

1. In repository settings, add your custom domain in the "GitHub Pages" section
2. Set up DNS records with your domain registrar
   - For a subdomain: Add a CNAME record pointing to YOUR-USERNAME.github.io
   - For an apex domain: Add A records pointing to GitHub's IP addresses

### Access Control

If you want to restrict access:

1. Keep the repository private
2. Use GitHub's private pages feature (requires GitHub Pro)
3. Or consider a different approach like password-protected Google Drive

## Maintenance

After setup, updating the website is as simple as:

1. Edit your markdown files locally
2. Commit and push changes
3. GitHub Pages will automatically rebuild your site

This maintains the connection between your source files and the published website, ensuring everything stays in sync.