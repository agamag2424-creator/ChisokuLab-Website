# How to Add Your ChisokuLab Logo

## 📍 Exact Location

Your logo file needs to be placed here:

```
/Users/agamagrawal/Documents/Chisoku Lab website/chisokulab/public/logo.png
```

## 🎯 Step-by-Step Instructions

### Method 1: Using Finder (Mac - Easiest)

1. **Open Finder**
   - Press `Cmd + Space` and type "Finder"
   - Or click the Finder icon in your dock

2. **Navigate to the public folder**
   - Press `Cmd + Shift + G` (Go to Folder)
   - Paste this path:
     ```
     /Users/agamagrawal/Documents/Chisoku Lab website/chisokulab/public
     ```
   - Press Enter

3. **Add your logo**
   - You should see files like: `og-image.jpg`, `next.svg`, etc.
   - Copy your logo image file
   - Paste it into this folder
   - **Rename it to exactly:** `logo.png`
     - Right-click the file → Rename
     - Change the name to `logo.png`
     - Make sure the extension is `.png` (or `.jpg`, `.svg`, `.webp`)

4. **Verify**
   - You should now see `logo.png` in the folder along with other files

### Method 2: Using Terminal

1. **Open Terminal**
   - Press `Cmd + Space` and type "Terminal"

2. **Navigate to the public folder**
   ```bash
   cd "/Users/agamagrawal/Documents/Chisoku Lab website/chisokulab/public"
   ```

3. **Copy your logo file**
   - If your logo is in Downloads:
     ```bash
     cp ~/Downloads/your-logo-file.png logo.png
     ```
   - Or if you know the exact path:
     ```bash
     cp /path/to/your/logo.png logo.png
     ```

4. **Verify it's there**
   ```bash
   ls -la logo.*
   ```
   You should see `logo.png` listed

### Method 3: Using VS Code / Cursor

1. **Open the project in VS Code/Cursor**
   - File → Open Folder
   - Navigate to: `chisokulab` folder

2. **Find the public folder**
   - In the file explorer sidebar, expand `chisokulab`
   - Click on `public` folder

3. **Add the logo**
   - Right-click in the `public` folder
   - Select "New File" or "Paste"
   - Name it `logo.png`
   - Or drag and drop your logo file into the `public` folder
   - Rename it to `logo.png` if needed

## ✅ Supported File Formats

- **PNG** (recommended) - `logo.png`
- **JPG/JPEG** - `logo.jpg` or `logo.jpeg`
- **SVG** - `logo.svg`
- **WebP** - `logo.webp`

**Note:** If your file has a different extension, you can either:
- Rename it to `logo.png` (works for most formats)
- Or update the code to use your file extension

## 📏 Recommended Logo Size

- **Width:** 200px (or maintain aspect ratio)
- **Height:** 40px (or maintain aspect ratio)
- The logo will scale automatically while maintaining proportions

## 🔍 How to Verify It's Working

1. **Check the file exists:**
   ```bash
   ls -la "/Users/agamagrawal/Documents/Chisoku Lab website/chisokulab/public/logo.png"
   ```

2. **Start your dev server** (if not running):
   ```bash
   cd "/Users/agamagrawal/Documents/Chisoku Lab website/chisokulab"
   npm run dev
   ```

3. **Visit your website:**
   - Open `http://localhost:3000`
   - Check the header - you should see your logo
   - Scroll to footer - logo should appear there too

4. **If logo doesn't appear:**
   - Check browser console for errors (F12)
   - Verify the file name is exactly `logo.png`
   - Make sure the file is in the `public` folder, not `public/images` or elsewhere
   - Try hard refresh: `Cmd + Shift + R`

## 🆘 Troubleshooting

### Logo still shows as broken?
- **Check file name:** Must be exactly `logo.png` (case-sensitive)
- **Check file location:** Must be directly in `public/` folder
- **Check file format:** Ensure it's a valid image file
- **Restart dev server:** Stop (`Ctrl+C`) and restart (`npm run dev`)

### Logo appears but is too big/small?
- The logo component automatically scales
- If you need different sizing, the code will handle it
- Current sizes:
  - Header: 200x40px
  - Mobile menu: 160x32px
  - Footer: 200x40px

### Need to use a different file name?
If your logo file has a different name, you can:
1. Rename it to `logo.png` (easiest)
2. Or tell me the exact filename and I'll update the code

## 📝 Quick Reference

**Full path to logo file:**
```
/Users/agamagrawal/Documents/Chisoku Lab website/chisokulab/public/logo.png
```

**Relative path (from project root):**
```
public/logo.png
```

**URL path (in browser):**
```
/logo.png
```

---

**Once you've added the file, the logo will automatically appear on:**
- ✅ Header (all pages)
- ✅ Mobile menu
- ✅ Footer (all pages)

The code is already set up and ready - just add the file! 🚀
