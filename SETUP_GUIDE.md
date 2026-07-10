# 🍫 DUMUZI — Complete Fresh Setup Guide (Render + PostgreSQL)

Follow every step in order. Takes about 20–30 minutes total.

---

## STEP 1 — Create a New Gmail Account

1. Open → **https://accounts.google.com/signup**
2. Fill in name, username (e.g. `dumuzi.chocolates@gmail.com`), password
3. Complete phone verification
4. ✅ **Save this Gmail** — you'll use it for Cloudinary, Razorpay, and Render

---

## STEP 2 — Create PostgreSQL Database on Render

1. Go to → **https://render.com** → Log in (or sign up with new Gmail)
2. Click **"New +"** → Select **"PostgreSQL"**
3. Fill in:
   - Name: `dumuzi-db`
   - Database: `dumuzi`
   - User: `dumuzi_user`
   - Region: `Singapore` (closest to India) or `Oregon`
   - Plan: **Free** ✅
4. Click **"Create Database"**
5. After creation, scroll down to **"Connections"** section
6. Copy the **"Internal Database URL"** — it looks like:
   ```
   postgresql://dumuzi_user:PASSWORD@dpg-XXXX.singapore-postgres.render.com/dumuzi
   ```
7. ✅ This is your `DATABASE_URL`

---

## STEP 3 — Link Database to Your Backend Service on Render

1. Go to your **existing Backend Web Service** on Render
2. Click **"Environment"** tab
3. Click **"Add Environment Variable"**
4. Add: `DATABASE_URL` = paste the Internal Database URL from Step 2
5. Also add all other variables (you'll fill these in Steps 4–6)

> ⚠️ Use **Internal** URL (not External) — it's faster and free within Render

---

## STEP 4 — Create a New Cloudinary Account

1. Go to → **https://cloudinary.com/users/register/free**
2. Sign up with your **new Gmail** from Step 1
3. Choose: **Free plan**
4. After login → **Dashboard** → copy:
   ```
   Cloud Name  = dxxxxxx
   API Key     = 123456789012
   API Secret  = xxxxxxxxxxxxxxxxxxxx
   ```
5. ✅ Cloudinary ready

---

## STEP 5 — Create a New Razorpay Account

1. Go to → **https://razorpay.com** → Sign Up
2. Use your **new Gmail** from Step 1
3. Business Name: `DUMUZI`
4. Business Type: `Individual`
5. After login → **Settings** (left sidebar) → **API Keys**
6. Click **"Generate Test Key"**
7. Copy:
   ```
   Key ID     = rzp_test_XXXXXXXXXXXX
   Key Secret = XXXXXXXXXXXXXXXXXXXX   ← shown ONCE, save it!
   ```
8. ✅ Razorpay ready (Test Mode)

---

## STEP 6 — Generate JWT Secret + Admin Password Hash

Run this on your **local machine** in the backend folder:

```bash
cd backend
npm install
node scripts/generateSecrets.js
```

It will ask: **"Enter your desired ADMIN PASSWORD:"**
→ Type a strong password (e.g. `Dumuzi@2024#Admin`)

You'll see:
```
JWT_SECRET=a1b2c3...  (128 characters)
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2b$12$...
```

**Copy these 3 values.**

---

## STEP 7 — Set ALL Environment Variables on Render

Go to your **Render Backend Web Service** → **Environment** tab → Add each:

| Variable | Value |
|----------|-------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | Internal PostgreSQL URL from Step 2 |
| `ADMIN_USERNAME` | `admin` |
| `ADMIN_PASSWORD_HASH` | Hash from Step 6 |
| `JWT_SECRET` | Secret from Step 6 |
| `CLOUDINARY_CLOUD_NAME` | From Step 4 |
| `CLOUDINARY_API_KEY` | From Step 4 |
| `CLOUDINARY_API_SECRET` | From Step 4 |
| `RAZORPAY_KEY_ID` | From Step 5 |
| `RAZORPAY_KEY_SECRET` | From Step 5 |

Click **"Save Changes"** → Render will auto-redeploy

---

## STEP 8 — Seed Products into the New Database

After Render redeploys successfully, run this **once** from your local machine:

```bash
cd backend

# Create a local .env for seeding (use External DB URL from Render)
# Set DATABASE_URL=postgresql://... (External URL this time)

node scripts/seedProducts.js
```

Or you can use Render's **Shell** tab on your web service:
```bash
node scripts/seedProducts.js
```

Expected output:
```
✓ DB connected
✓ Products table synced
✅ Seed complete — 27 new products inserted
```

---

## STEP 9 — Install Dependencies & Push to Render

Make sure `package.json` has the PostgreSQL packages (already added):

```json
"pg": "^8.13.3",
"pg-hstore": "^2.3.4"
```

Push your code to GitHub → Render will auto-deploy.

Or redeploy manually: Render Dashboard → your service → **"Manual Deploy"**

---

## STEP 10 — Test Everything

### Test your API is live
```
https://your-render-app.onrender.com/
```
Should show: `DUMUZI Backend API Running`

### Test Customer Register
→ `https://your-frontend.com/register`
→ Fill in name, email, password

### Test Add to Cart
→ `https://your-frontend.com/collections`
→ Click a product → "Add to Cart"
→ If not logged in → redirects to `/login` ✅
→ If logged in → adds to cart + saves to PostgreSQL ✅

### Test Admin Login
→ `https://your-frontend.com/admin/login`
→ Username: `admin`, Password: what you set in Step 6 ✅

---

## STEP 11 — Update Frontend API URL

In `frontend/src/config.ts`, make sure `VITE_API_BASE_URL` points to your Render backend:

```ts
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";
```

Set `VITE_API_BASE_URL=https://your-backend.onrender.com` in your frontend's environment (Vercel/Netlify/Render frontend environment variables).

---

## ✅ Final Checklist

- [ ] New Gmail created
- [ ] Render PostgreSQL database created (Internal URL copied)
- [ ] DATABASE_URL added to Render environment
- [ ] New Cloudinary account (Cloud Name, API Key, API Secret)
- [ ] New Razorpay account (Key ID, Key Secret)
- [ ] `node scripts/generateSecrets.js` run → JWT_SECRET + ADMIN_PASSWORD_HASH
- [ ] All 10 environment variables set on Render
- [ ] `npm install` run (pg + pg-hstore installed)
- [ ] Code pushed to GitHub → Render auto-deployed
- [ ] `node scripts/seedProducts.js` run (27 products seeded)
- [ ] API health check works ✅
- [ ] Admin login tested ✅
- [ ] Customer register/login tested ✅
- [ ] Add to cart tested ✅

---

## ⚠️ Security Reminders

| Thing | Do This |
|-------|---------|
| `.env` file | Never commit to Git — add to `.gitignore` |
| `JWT_SECRET` | 128-char random — never reuse |
| Render env vars | Set directly on Render, not in code |
| Razorpay Key Secret | Never put in frontend code |
| DATABASE_URL | Use Internal URL (not External) on Render |

---

## 🆘 Common Errors

| Error | Fix |
|-------|-----|
| `SSL SYSCALL error` | Make sure `rejectUnauthorized: false` in db.js ✅ (already set) |
| `DATABASE_URL is not defined` | Add it in Render → Environment tab |
| `relation "BlogPosts" does not exist` | First deploy creates tables automatically via `sequelize.sync()` |
| `Admin login failed` | Re-run `generateSecrets.js`, update `ADMIN_PASSWORD_HASH` on Render |
| `Products empty` | Run `node scripts/seedProducts.js` using the Render shell |
| `CORS error on frontend` | Add your frontend URL to `allowedOrigins` in `server.js` |
