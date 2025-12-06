# LegalAI Pro

### **AI-Powered Legal Document Analyzer & Contract Generator**

LegalAI Pro is a full-stack AI platform designed to analyze legal documents, detect risks, explain clauses, generate contracts from natural language, and convert agreements into smart contracts — all powered by GPT-4, LangChain, Pinecone, and Next.js.

This repository contains the complete **end-to-end implementation starter**, using:

* **Next.js 14 / React / TypeScript / Tailwind CSS**
* **tRPC** for backend API
* **PostgreSQL + Prisma** for data
* **OpenAI GPT-4o** for analysis & generation
* **Pinecone** for embeddings & similarity search
* **AWS S3 + Textract** for storage & OCR
* **Hardhat + Solidity** for smart-contract generation

---

# 📁 Project Structure

```
legalai-pro/
├─ apps/web/                 # Next.js frontend + backend
│  ├─ app/                   # App Router pages
│  ├─ server/                # tRPC routers, context
│  ├─ lib/                   # AI, OCR, S3, Pinecone helpers
│  └─ components/            # UI components
│
├─ prisma/                   # Database schema
├─ packages/contracts/       # Hardhat + Solidity contracts
├─ docker-compose.yml        # PostgreSQL local stack
├─ .github/workflows/ci.yml  # GitHub Actions CI
└─ README.md
```

---

# ⚙️ Tech Stack

### **Frontend**

* Next.js 14 (App Router)
* React 18
* TypeScript
* Tailwind CSS
* TipTap (rich-text annotation)
* PDF.js (PDF viewer)

### **Backend / API**

* tRPC (type-safe API)
* Prisma ORM
* PostgreSQL + pgvector
* AWS S3 (file storage)
* AWS Textract + Tesseract OCR

### **AI / ML**

* OpenAI GPT-4o / GPT-4o-mini
* LangChain prompt chains
* Pinecone vector search
* Embedding model: `text-embedding-3-large`

### **Smart Contracts**

* Solidity
* Hardhat
* Ethers.js

---

# ✨ Core Features

### **1. Document Upload & OCR**

* Upload PDFs/DOCX/TXT to S3
* Auto-OCR for scanned documents via Textract or Tesseract
* Parse text into structured clauses

### **2. AI-Powered Risk Analysis**

* Clause classification
* Risk scoring (0-100)
* Plain-English explanations
* Negotiation suggestions
* Comparison against precedent clauses

### **3. Clause-by-Clause Viewer**

* Interactive PDF/HTML viewer
* Highlighted clauses with tooltips
* Severity indicators (red/yellow/green)

### **4. Natural Language Contract Generator**

* "Generate a freelance contract for a 3-month project"
* JSON-structured contract output
* DOCX/PDF export

### **5. Smart Contract Conversion**

* Natural-language → Solidity
* Security checks & gas estimation
* Deploy to testnet

### **6. Version Comparison & Tracking**

* Side-by-side diff
* Risk delta
* Revision history

---

# 🛠️ Setup Instructions

## **1. Clone the repo**

```bash
git clone https://github.com/yourname/legalai-pro.git
cd legalai-pro
```

## **2. Install dependencies**

```bash
pnpm install
```

## **3. Configure environment variables**

Copy `.env.example` → `.env` and fill:

* OpenAI key
* Pinecone key
* PostgreSQL URL
* AWS S3 credentials

## **4. Start database (PostgreSQL + pgvector)**

```bash
docker-compose up -d
```

## **5. Run database migrations**

```bash
npx prisma migrate dev
```

## **6. Start dev server**

```bash
pnpm --filter apps/web dev
```

### Your app will run at:

👉 [http://localhost:3000](http://localhost:3000)

---

# 🧪 Testing

### Run tests

```bash
pnpm test
```

### Lint

```bash
pnpm lint
```

---

# 🚀 Deployment

### Recommended setup:

* **Frontend**: Vercel
* **Serverless API Routes**: Vercel
* **Database**: Supabase / RDS PostgreSQL
* **File Storage**: AWS S3
* **Vector DB**: Pinecone

GitHub Actions workflow is included for CI.

---

# 🧩 Roadmap

* Add Clerk/NextAuth authentication
* Full Textract async job flow
* Role-based access control
* E-signature integration (DocuSign/HelloSign)
* Advanced compliance engine (GDPR, HIPAA checks)

---

# 🤝 Contributing

Pull requests are welcome! Please open issues for feature discussions.

---

# 📄 License

MIT License © 2025

---

# 💬 Support

For questions, feature requests or debugging help:

* Open an issue
* Or contact the maintainers

---

**LegalAI Pro — Empowering everyone to understand and create legal documents with
