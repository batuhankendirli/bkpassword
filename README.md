<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="/assets/svgs/logo/bkpassword.svg">
    <source media="(prefers-color-scheme: light)" srcset="/assets/svgs/logo/bkpassword-light.svg">
    <img alt="BKPassword Logo" src="/assets/svgs/logo/bkpassword.svg" width="300">
  </picture>
</div>

A secure, client-side password management and generation tool built with Next.js, TypeScript, and React.

## Features

- **Password Generator**: Create strong, customizable passwords

  - Random passwords with configurable complexity (uppercase, lowercase, numbers, symbols)
  - Memorable passwords using word combinations
  - PIN number generation
  - Visual strength indicator with entropy calculation
  - Password reveal animation

- **Password Manager**: Securely store and manage your credentials

  - Client-side AES-256 encryption
  - No server-side storage; all data remains on your device
  - Search functionality with accent-insensitive matching
  - Copy passwords to clipboard with one click
  - Easy editing and deletion of stored passwords

- **Security Features**:

  - Device fingerprinting for enhanced encryption
  - PBKDF2 key derivation with 10,000 iterations
  - Client-side encryption using CryptoJS
  - Password strength estimation based on entropy
  - No data transmission; everything stays on your device

- **User Experience**:
  - Responsive design for desktop and mobile
  - Dark/light theme support
  - Smooth animations with Framer Motion
  - Mobile keyboard detection for better form usability
  - Internationalization support

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with SCSS modules
- **UI Components**: Custom components with [shadcn/ui](https://ui.shadcn.com/) foundation
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Yup](https://github.com/jquense/yup) validation
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Encryption**: [CryptoJS](https://github.com/brix/crypto-js)

## Security

BKPassword takes a comprehensive approach to security:

- **Strong Encryption**: All passwords are encrypted using AES-256 before storing in localStorage
- **Secure Key Derivation**: The encryption key is derived using PBKDF2 with 10,000 iterations
- **Device Fingerprinting**: Uses a combination of hardware and browser characteristics to create a unique device fingerprint
- **Zero Data Transmission**: No data is ever sent to any server - everything stays on your device
- **No Backdoors**: Your passwords remain accessible only on the device where they were created
- **Open Source**: Security through transparency - the code is open for anyone to audit

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/batuhankendirli/bkpassword.git
cd bkpassword
```

2. Install dependencies:

```bash
npm install
# or
yarn
```

3. Create a .env file in the root directory:

```
NEXT_PUBLIC_MASTER_KEY=your_random_secret_here
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
npm run build
# or
yarn build
```

Then start the production server:

```bash
npm run start
# or
yarn start
```

## Adding New Languages

BKPassword supports internationalization. To add a new language:

1. Create a new JSON file in the locales directory with the language code (e.g., `fr.json`)
2. Copy the structure from the English (`en.json`) file and translate the contents
3. Add the language code to the `locales` array in request.ts

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Batuhan Kendirli - [GitHub](https://github.com/batuhankendirli) - [batuhankndrl@gmail.com](mailto:batuhankndrl@gmail.com)

## Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- The open-source community for all the amazing tools

---

🔒 **BKPassword** - Keep your passwords secure, accessible, and strong. Always client-side, always private.
