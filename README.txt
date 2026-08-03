FINAL ALL-PAGES TOP COLOUR UPDATE
---------------------------------
The black information/announcement bar and white logo/navigation bar styling now applies to Home, About, Products, Wedding Special and Contact. WhatsApp buttons retain their original gold styling.

============================================================
SAHNEY PAGRI HOUSE — REDESIGNED STATIC WEBSITE
============================================================

This is a complete, mobile-first, multi-page website made with semantic HTML,
modern CSS and vanilla JavaScript. It does not need React, Node.js, npm, a
database, a terminal or a build process.

PROJECT PAGES
-------------
index.html      Home
about.html      About
products.html   Searchable and filterable product catalogue
wedding.html    Wedding Special
contact.html    Validated WhatsApp enquiry form

ORIGINAL PHOTO UPDATE
---------------------
The visible website photography now uses only the shop owner photo, the original wedding-kit photo, and the four original photographs supplied on 21 July 2026. Stock/internet photographs were removed from the active website.

IMPORTANT BEFORE PUBLISHING
---------------------------
The included telephone number, WhatsApp number, email address, shop address,
opening hours, map link, social links and website domain are editable
placeholders. Replace them with the shop's real details before publishing.

1. HOW TO OPEN THE WEBSITE
--------------------------
1. Keep the complete folder structure unchanged.
2. Double-click index.html.
3. It opens directly in Chrome, Edge, Firefox or another modern browser.
4. Use the navigation menu to open the other pages.

No internet connection is required for the HTML, CSS, JavaScript or local WebP
images. WhatsApp, maps and social links naturally require internet access.

2. CHANGE CONTACT INFORMATION ONCE
----------------------------------
Open:

js/site-config.js

Edit these values:
- businessName
- taglineEnglish
- taglinePunjabi
- phoneDisplay
- phoneRaw
- whatsappDisplay
- whatsappRaw
- address
- email
- openingHours
- mapsLink
- instagramLink
- facebookLink
- youtubeLink
- canonicalBase

Use digits only for phoneRaw and whatsappRaw, including country code.
Example for an Indian number: 919317681313

The website automatically reuses these settings in headers, footers, contact
sections, phone links, map links, WhatsApp links and structured data.

3. CHANGE THE WHATSAPP NUMBER
-----------------------------
Open js/site-config.js and change:

whatsappDisplay: '+91 XXXXX XXXXX'
whatsappRaw: '91XXXXXXXXXX'

Do not add spaces, +, brackets or dashes inside whatsappRaw.
Product names and form details are automatically inserted into WhatsApp
messages by js/script.js.

4. REPLACE IMAGES
-----------------
All website images are organised inside:

assets/images/

For the easiest replacement:
1. Prepare a clear JPG, PNG or preferably WebP image.
2. Crop it to a similar orientation as the existing image.
3. Give it exactly the same filename as the image being replaced.
4. Copy it into assets/images/ and approve replacement.

The CSS uses object-fit: cover, so images keep their proportions without
stretching. The HTML includes width and height attributes to reduce layout
shift. Below-the-fold images use lazy loading.

Important image names:
- hero-home.webp
- hero-about.webp
- hero-products.webp
- hero-wedding.webp
- hero-contact.webp
- social-share.webp
- category-turban.webp
- category-wedding.webp
- category-safa.webp
- category-kurta.webp
- category-kalgi.webp
- category-accessories.webp

Product image paths are stored in js/products-data.js. Main website image paths are inside the HTML pages and assets/images/. Comments in the code identify replaceable content.

Recommended image preparation:
- Hero images: approximately 1800 x 1100 pixels
- Product/category cards: approximately 1200 x 1000 pixels
- Social sharing image: 1200 x 630 pixels
- Use WebP at sensible quality for faster loading
- Never enlarge a very small image because it may become blurry
- Always use photographs you own or have permission to use

5. ADD OR EDIT PRODUCTS
-----------------------
Open:

js/products-data.js

Each product is one JavaScript object. To add a product:
1. Copy one complete object from { to }.
2. Paste it before the final closing bracket ].
3. Add a comma after the previous object.
4. Give the new product a unique id.
5. Change its name, category, occasion, colors, image, alt, summary, details,
   material and recommended fields.
6. Save the file and refresh products.html.

Example structure:

{
  id: 'unique-product-id',
  name: 'Product Name',
  category: 'Sikh Pagri Fabrics',
  occasion: ['Wedding', 'Festive Occasion'],
  colors: ['Royal Blue', 'Maroon'],
  image: 'assets/images/your-product.webp',
  alt: 'Clear description of the product image',
  summary: 'One-line catalogue description.',
  details: 'Full description shown in the product modal.',
  material: 'Fabric or accessory details.',
  recommended: 'Recommended use or occasion.'
}

Do not add fake prices. The catalogue uses enquiry buttons instead.

6. CHANGE WEBSITE COLOURS
-------------------------
Open:

css/style.css

The main colour variables are at the top inside :root. Change those variables
to update the full website consistently:

--navy
--blue
--blue-2
--gold
--gold-soft
--ivory
--cream
--white
--ink

Keep strong contrast between text and backgrounds for accessibility.

7. EDIT ENGLISH AND PUNJABI TEXT
--------------------------------
Most page content is directly inside the relevant HTML file:
- Home text: index.html
- Story and values: about.html
- Wedding content and package concepts: wedding.html
- Contact labels and helper text: contact.html

The global Punjabi tagline is in js/site-config.js. Other Punjabi phrases can
be searched by looking for the class name "punjabi" in the HTML files.

The CSS font stack prefers Noto Sans Gurmukhi or Raavi when available and falls
back to the device's readable system font. No font files are bundled.

8. EDIT SAMPLE TESTIMONIALS
---------------------------
The three Home page testimonials are examples, not real customer claims.
Open index.html and search for:

SAMPLE TESTIMONIAL

Replace the quotation, customer name and note only after obtaining genuine
customer permission.

9. CONTACT FORM BEHAVIOUR
-------------------------
The contact form does not send information to an unknown server. JavaScript:
- validates the required fields
- creates a formatted enquiry message
- opens WhatsApp with the entered information

The form is in contact.html. Its behaviour is in js/script.js.

10. SEO SETTINGS AFTER PUBLISHING
---------------------------------
Every page contains a unique title, description, canonical placeholder, Open
Graph metadata and Twitter card metadata.

After choosing the final domain:
1. Replace https://www.example.com/sahni-pagri-house/ in js/site-config.js.
2. Replace the example canonical and Open Graph URLs in all seven HTML files.
3. Replace the example URLs in sitemap.xml and robots.txt.
4. The owner-shop.jpg image is currently used for social sharing. Change the Open Graph image paths in the HTML and js/script.js when you have a final branded social-sharing image.
5. Submit sitemap.xml through the relevant search-engine webmaster tools.

The site injects LocalBusiness/ClothingStore structured data from the editable
settings in js/site-config.js.

11. UPLOAD TO STATIC HOSTING
----------------------------
Method A — GitHub Pages
1. Create a GitHub repository.
2. Upload the CONTENTS of the sahni-pagri-house folder so index.html is at the
   repository root.
3. Open the repository Settings, then Pages.
4. Select a branch/folder as the publishing source and save.
5. Wait for the published address, open it, and test every page.

Official guide:
https://docs.github.com/en/pages/quickstart

Method B — Cloudflare Pages direct upload
1. Sign in to Cloudflare and open Workers & Pages.
2. Create a Pages project and choose Direct Upload.
3. Upload the complete website folder or its prepared archive as instructed.
4. Confirm that index.html is at the top level of the uploaded website.
5. Open the generated address and test every page.

Official guide:
https://developers.cloudflare.com/pages/get-started/direct-upload/

Hosting interfaces and plan details can change, so follow the current official
instructions shown by the selected provider.

12. ACCESSIBILITY AND KEYBOARD USE
----------------------------------
- Press Tab to navigate interactive controls.
- Press Escape to close the product modal or mobile menu.
- A skip-to-content link appears when focused.
- Reduced-motion settings are respected.

13. FINAL TESTING CHECKLIST
---------------------------
Before publishing, confirm:
[ ] The real phone and WhatsApp numbers are entered.
[ ] The full shop address and map link are entered.
[ ] All social links belong to the business.
[ ] All placeholder photographs have been reviewed or replaced.
[ ] Product search and all filters work.
[ ] Product View Details modals open and close.
[ ] The contact form opens a correctly formatted WhatsApp message.
[ ] Navigation works on desktop and mobile.
[ ] The site is tested on a real Android/iPhone screen.
[ ] Canonical URLs, robots.txt and sitemap.xml use the final domain.

14. TEMPORARY IMAGE CREDITS
---------------------------
The redesigned project contains locally optimised/cropped WebP placeholder
images prepared from these Unsplash photographs. Replace them with original
shop photography for the strongest brand authenticity.

- Royal Photography — Groom in traditional Indian wedding attire
  https://unsplash.com/photos/PHKOJWnxzTY
- AL Kaium — Groom in traditional Indian wedding attire outdoors
  https://unsplash.com/photos/PjRdqE1WSbQ
- Royal Photography — Bride and groom in traditional Indian wedding attire
  https://unsplash.com/photos/V7VRNnh8sqQ
- Royal Photography — Traditional groom attire with sherwani and turban
  https://unsplash.com/photos/S9cIv71NRuE
- Tanya Barrow — Fabric rolls displayed in a shop
  https://unsplash.com/photos/z0_SPE0QBDc
- Brett Jordan — Fabric store shelves with colourful textiles
  https://unsplash.com/photos/hzB1IZQ1uGo
- Bernd Dittrich — Stacked fabric rolls and patterns
  https://unsplash.com/photos/rEb9iHOF638
- Pawan Sharma — Sikh portrait reference
  https://unsplash.com/photos/7rA8CUR31K8
- Hardial Aujla — Blue Sikh heritage reference
  https://unsplash.com/photos/PQRFL4tsYec

Review the current Unsplash License before commercial publication:
https://unsplash.com/license

============================================================
END OF README
============================================================
