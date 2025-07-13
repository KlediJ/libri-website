const projectStructure = {
  title: "LIBRI Personal Finance Manager",
  version: "v0.1.5",
  metrics: {
    apiMethods: 286,
    ipcChannels: 124,
    dbTables: "20+",
    domainHandlers: 9
  },
  structure: [
    {
      icon: "📋",
      name: "PROJECT DOCS",
      type: "folder",
      children: [
        { name: "BUILD_INSTRUCTIONS.md", type: "file" },
        { name: "CHANGELOG.md", type: "file" },
        { name: "PROJECT_OVERVIEW.md", type: "file" },
        { name: "README.md", type: "file" },
        { name: "CLAUDE.md", type: "file", note: "(codebase instructions)" }
      ]
    },
    {
      icon: "⚙️",
      name: "CONFIGURATION",
      type: "folder",
      children: [
        { name: "package.json", type: "file", note: "(Electron + React + TypeScript)" },
        { name: "tsconfig.json", type: "file", note: "(TypeScript config)" },
        { name: "webpack.config.js", type: "file", note: "(dev build)" },
        { name: "webpack.prod.js", type: "file", note: "(production build)" },
        { name: "electron/tsconfig-electron.json", type: "file" }
      ]
    },
    {
      icon: "🖥️",
      name: "ELECTRON",
      type: "folder",
      note: "(Main Process)",
      children: [
        { name: "main.ts", type: "file", note: "(app lifecycle)" },
        { name: "preload.ts", type: "file", note: "(secure API bridge - 286 methods)" },
        {
          name: "ai/",
          type: "folder",
          children: [
            { name: "DualModelRouter.ts", type: "file", note: "(local vs cloud AI)" },
            { name: "ModelManager.ts", type: "file", note: "(AI model lifecycle)" }
          ]
        },
        {
          name: "ipc/",
          type: "folder",
          note: "(9 domain handlers - 124 channels)",
          children: [
            { name: "accountHandlers.ts", type: "file" },
            { name: "transactionHandlers.ts", type: "file" },
            { name: "categoryHandlers.ts", type: "file" },
            { name: "payeeHandlers.ts", type: "file" },
            { name: "budgetHandlers.ts", type: "file" },
            { name: "billHandlers.ts", type: "file" },
            { name: "loanHandlers.ts", type: "file" },
            { name: "interestHandlers.ts", type: "file" },
            { name: "aiHandlers.ts", type: "file" }
          ]
        }
      ]
    },
    {
      icon: "📊",
      name: "DATA LAYER",
      type: "folder",
      note: "(src/data-storage/)",
      children: [
        {
          name: "database/",
          type: "folder",
          children: [
            { name: "DatabaseConnection.ts", type: "file", note: "(SQLite singleton)" },
            { name: "DatabaseManager.ts", type: "file", note: "(repository orchestration)" },
            { name: "SchemaInitializer.ts", type: "file", note: "(20+ tables)" }
          ]
        },
        {
          name: "models/",
          type: "folder",
          note: "(TypeScript interfaces)",
          children: [
            { name: "Transaction.ts", type: "file", note: "(core financial entity)" },
            { name: "Account.ts", type: "file", note: "(enhanced account details)" },
            { name: "Category.ts", type: "file", note: "(hierarchical categories)" },
            { name: "Payee.ts", type: "file", note: "(merchant/vendor management)" },
            { name: "Budget.ts", type: "file", note: "(budget planning)" },
            { name: "RecurringBill.ts", type: "file", note: "(subscription management)" },
            { name: "LoanDetails.ts", type: "file", note: "(loan & amortization)" },
            { name: "InterestExpense.ts", type: "file", note: "(interest tracking)" },
            { name: "JournalEntry.ts", type: "file", note: "(double-entry accounting)" },
            { name: "[others...]", type: "file" }
          ]
        },
        {
          name: "repositories/",
          type: "folder",
          note: "(data access layer)",
          children: [
            { name: "BaseRepository.ts", type: "file", note: "(common CRUD)" },
            { name: "TransactionRepository.ts", type: "file", note: "(enhanced with payee joins)" },
            { name: "AccountRepository.ts", type: "file" },
            { name: "PayeeRepository.ts", type: "file" },
            { name: "[others...]", type: "file" },
            { name: "JournalEntryRepository.ts", type: "file" }
          ]
        },
        {
          name: "services/",
          type: "folder",
          children: [
            { name: "AccountingService.ts", type: "file", note: "(business logic layer)" }
          ]
        }
      ]
    },
    {
      icon: "🤖",
      name: "AI LAYER",
      type: "folder",
      note: "(src/data-processing/)",
      children: [
        {
          name: "ai/",
          type: "folder",
          children: [
            { name: "PayeeExtractor.ts", type: "file", note: "(smart payee detection)" },
            { name: "CodeLlamaProcessor.ts", type: "file", note: "(local LLM)" },
            { name: "MistralProcessor.ts", type: "file", note: "(cloud AI)" },
            { name: "MistralAIProcessor.ts", type: "file" }
          ]
        },
        {
          name: "import-export/",
          type: "folder",
          children: [
            { name: "CsvProcessor.ts", type: "file", note: "(CSV parsing + AI enhancement)" },
            { name: "ExcelProcessor.ts", type: "file", note: "(Excel processing)" },
            { name: "index.ts", type: "file" }
          ]
        }
      ]
    },
    {
      icon: "🎨",
      name: "REACT FRONTEND",
      type: "folder",
      note: "(src/presentation/)",
      children: [
        {
          name: "layouts/",
          type: "folder",
          children: [
            { name: "MainLayout.tsx", type: "file", note: "(sidebar navigation - 11 sections)" }
          ]
        },
        {
          name: "components/",
          type: "folder",
          children: [
            { name: "TransferDialog.tsx", type: "file" },
            { name: "AIPayeeExtractor.tsx", type: "file" },
            { name: "EnvironmentIndicator.tsx", type: "file" }
          ]
        },
        {
          name: "pages/",
          type: "folder",
          note: "(feature-organized)",
          children: [
            { name: "dashboard/", type: "folder", note: "(overview + charts)" },
            { name: "accounts/", type: "folder", note: "(account management)" },
            { name: "transactions/", type: "folder", note: "(transaction CRUD)" },
            { name: "payees/", type: "folder", note: "(payee management)" },
            { name: "categories/", type: "folder", note: "(category hierarchy)" },
            { name: "budget/", type: "folder", note: "(budget planning)" },
            { name: "bills/ & subscriptions/", type: "folder", note: "(recurring payments)" },
            { name: "loans/ & credit-cards/", type: "folder", note: "(debt management)" },
            { name: "ai/", type: "folder", note: "(AI assistance interface)" },
            { name: "import-export/", type: "folder", note: "(data interchange)" },
            { name: "settings/", type: "folder", note: "(app configuration)" }
          ]
        }
      ]
    },
    {
      icon: "🔧",
      name: "UTILITIES",
      type: "folder",
      children: [
        {
          name: "scripts/",
          type: "folder",
          children: [
            { name: "init-db.js", type: "file", note: "(database setup)" },
            { name: "reset-db.js", type: "file", note: "(dev reset)" },
            { name: "backfill-payees.js", type: "file", note: "(payee extraction)" },
            { name: "auto-assign-payees.js", type: "file" }
          ]
        },
        {
          name: "src/types/",
          type: "folder",
          children: [
            { name: "electron-api.d.ts", type: "file", note: "(286 type-safe API methods)" },
            { name: "[other type definitions]", type: "file" }
          ]
        }
      ]
    }
  ],
  features: [
    "✅ Cash Basis Double-Entry Accounting",
    "✅ Native AI Payee Extraction", 
    "✅ Advanced Financial Tracking (loans, bills, interest)",
    "✅ Import/Export (CSV, Excel)",
    "✅ Real-time Dashboard with Charts",
    "✅ Type-Safe IPC Communication (124 channels)",
    "✅ Material-UI Professional Interface",
    "✅ Cross-Platform Desktop (Electron)"
  ],
  techStack: "Electron + React 19 + TypeScript + SQLite + Material-UI + AI",
  featureCards: [
    {
      icon: "🤖",
      title: "AI-Powered Intelligence",
      description: "Advanced payee extraction and financial insights using native AI integration with dual model routing (local/cloud)."
    },
    {
      icon: "📊",
      title: "Double-Entry Accounting", 
      description: "Professional-grade cash basis double-entry accounting system with 20+ optimized database tables for accuracy."
    },
    {
      icon: "🔒",
      title: "Type-Safe Architecture",
      description: "Built with TypeScript, featuring 286 type-safe API methods and 124 IPC channels for bulletproof reliability."
    },
    {
      icon: "⚡",
      title: "Cross-Platform Performance",
      description: "Electron-powered desktop application with React 19, SQLite, and Material-UI for seamless user experience."
    },
    {
      icon: "📈",
      title: "Real-Time Analytics",
      description: "Live dashboard with interactive charts, budget tracking, and comprehensive financial reporting."
    },
    {
      icon: "🔄",
      title: "Smart Data Processing",
      description: "Advanced import/export capabilities with CSV/Excel support and intelligent data enhancement."
    }
  ]
};