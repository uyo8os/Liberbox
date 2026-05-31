# Liberbox

Liberbox is a desktop proxy client based on the Clash (Mihomo) core. Built with a `Next.js + Electron` architecture, it provides subscription management, connection monitoring, system proxy switching, logs, and traffic statistics.

---

# Installation

### Download a release build

Visit the [Releases page](https://github.com/uyo8os/Liberbox/releases) to download the latest installer.

### Build from source

```bash
# Clone the repository
git clone https://github.com/uyo8os/Liberbox.git
cd Liberbox

# Install dependencies
npm install

# Run in development mode
npm run electron:dev

# Build the installer
npm run electron:build
```

## Usage

1. Add subscription: Add your subscription URL on the "Subscription Management" page.
2. Select configuration: Choose an added profile in the dashboard.
3. Start service: Click the "Start" button to launch the proxy service.
4. System proxy: Enable/disable the system proxy from the system tray menu.

## FAQ

### Unable to start the Clash core

Make sure no other similar software is using the same port (default: 7890).

### Failed to set system proxy

Try running Liberbox as administrator, or set the system proxy manually.

---

## Acknowledgements

- [Mihomo](https://github.com/MetaCubeX/mihomo)
- [Next.js](https://nextjs.org)
- [Electron](https://www.electronjs.org)
- [Radix UI](https://www.radix-ui.com)
- [Tailwind CSS](https://tailwindcss.com)

## License

[MIT License](LICENSE)
