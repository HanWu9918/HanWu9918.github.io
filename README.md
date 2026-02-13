# 🏠 Han Wu's Personal Homepage

This repository hosts the source code for Han Wu's personal homepage and resume website, built with Jekyll and hosted on GitHub Pages.

**Live Site:** https://hanwu9918.github.io

## 📋 About

This is a modern, responsive personal homepage showcasing academic background, research projects, technical skills, and professional interests. The site is built using Jekyll with the modern-resume-theme framework.

**Based on:** This repository is based on the [modern-resume-theme](https://github.com/sproogen/modern-resume-theme) by James Grant (sproogen). The theme provides a clean, professional layout optimized for hosting resumes and portfolios on GitHub Pages.

## ✨ Features

- **Responsive Design:** Works seamlessly on desktop, tablet, and mobile devices
- **Easy Customization:** All content is configured through a single YAML file
- **GitHub Pages Integration:** Automatically builds and deploys on push
- **SEO Optimized:** Built-in SEO tags for better discoverability
- **Professional Sections:**
  - Education background
  - Research projects and publications
  - Practice projects with links
  - Technical skills and honors
  - Personal interests

## 🛠️ Technology Stack

- **Static Site Generator:** Jekyll 4.x
- **Theme:** modern-resume-theme (remote theme)
- **Hosting:** GitHub Pages
- **Styling:** Sass/SCSS
- **Dependencies:** Managed via Bundler (see Gemfile)

## 🚀 Local Development

### Prerequisites

- Ruby 2.7 or higher
- Bundler gem installed
- Git

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/HanWu9918/HanWu9918.github.io.git
   cd HanWu9918.github.io
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Run the development server:
   ```bash
   bundle exec jekyll serve
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:4000
   ```

The site will automatically rebuild when you make changes to the source files.

## 📝 Customization

### Editing Content

All content is configured in the `_config.yml` file. To customize your homepage:

1. **Personal Information:** Update name, title, location, and contact details at the top of _config.yml
2. **Social Links:** Configure your social media profiles (GitHub, Twitter, LinkedIn, etc.)
3. **Profile Image:** Replace the image path in `about_profile_image`
4. **Sections:** Modify the `content` array to add, remove, or reorder sections

### Adding New Sections

The theme uses a modular content system. Each section in _config.yml follows this structure:

```yaml
content:
  - title: Section Title
    layout: list  # or 'text'
    content:
      - layout: left  # or 'top-middle', 'right'
        title: Item Title
        sub_title: Subtitle
        caption: Date or Caption
        description: |
          Your content here
```

### Styling

Custom styles can be added in `/assets/main.scss`. The file imports the theme's default styles and allows for overrides.

## 📦 Deployment

### GitHub Pages (Automatic)

This repository is configured for automatic deployment:

1. Push changes to the main branch
2. GitHub Actions automatically builds the site
3. The site is published to https://hanwu9918.github.io

No additional configuration is needed as long as GitHub Pages is enabled in the repository settings.

### Manual Build

To build the site manually:

```bash
bundle exec jekyll build
```

The static site will be generated in the `_site` directory.

## 📂 Project Structure

```
.
├── _config.yml          # Main configuration and content file
├── _site/               # Generated site (auto-generated, not tracked)
├── assets/
│   ├── main.scss        # Custom styles
│   └── js/              # JavaScript files
├── images/              # Image assets (profile photo, etc.)
├── Gemfile              # Ruby dependencies
├── index.md             # Homepage layout
├── LICENSE              # License file
└── README.md            # This file
```

## 🔧 Troubleshooting

### Common Issues

**Bundler version mismatch:**
```bash
bundle update --bundler
```

**Dependencies out of date:**
```bash
bundle update
```

**Port already in use:**
```bash
bundle exec jekyll serve --port 4000
```

## 📄 License

This project follows the licensing terms of the base theme. See LICENSE file for details.

## 🙏 Credits

- **Theme:** [modern-resume-theme](https://github.com/sproogen/modern-resume-theme) by James Grant (@sproogen)
- **Static Site Generator:** [Jekyll](https://jekyllrb.com/)
- **Hosting:** [GitHub Pages](https://pages.github.com/)

## 📧 Contact

For questions or feedback about this site, please contact:
- **Email:** wuhan9918@gmail.com
---

*Last updated: February 2026*

