# Gallery Images

This directory contains the images for the Gallery / About Me section.

## How to Add Your Images

1. Add your photos to this directory with the following names:
   - `image1.jpg` - Professional speaking event or similar
   - `image2.jpg` - Apple Park visit or tech-related photo
   - `image3.jpg` - Desert adventure or outdoor activity
   - `image4.jpg` - Night out with friends or social gathering
   - `image5.jpg` - Tech conference moment
   - `image6.jpg` - Travel destination
   - `image7.jpg` - Casual social gathering
   - `image8.jpg` - Work environment

2. Supported formats: `.jpg`, `.jpeg`, `.png`

3. Recommended image sizes:
   - Minimum width: 800px
   - Optimal width: 1200-1600px
   - Images will be automatically optimized by Next.js

4. The layout automatically adjusts aspect ratios:
   - **Landscape** images span 2 columns
   - **Portrait** images span 2 rows
   - **Square** images fit in a single grid cell

## Customizing the Gallery

To add more images or change the layout, edit:
- `/components/ui/gallery-section.tsx`

Update the `GALLERY_IMAGES` array with your image details.
