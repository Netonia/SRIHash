# SRI Hash Generator

A lightweight Blazor WebAssembly application for generating Subresource Integrity (SRI) hashes. This tool helps developers secure their web applications by generating integrity hashes for external resources.

## Features

- ✅ Generate SRI hashes from URLs or pasted text content
- ✅ Support for SHA-256, SHA-384, and SHA-512 algorithms
- ✅ One-click copy to clipboard
- ✅ Usage examples with `integrity` and `crossorigin` attributes
- ✅ Fully client-side processing (no data sent to servers)
- ✅ Responsive, mobile-first design
- ✅ Accessible (WCAG AA compliant)
- ✅ Deployable to GitHub Pages

## What is SRI?

Subresource Integrity (SRI) is a security feature that enables browsers to verify that resources they fetch are delivered without unexpected manipulation. It works by allowing you to provide a cryptographic hash that a fetched resource must match.

## Usage

1. Enter a URL of a resource (e.g., `https://cdn.example.com/library.js`) or paste text content
2. Select your preferred hash algorithm (SHA-256, SHA-384, or SHA-512)
3. Click the **Hash** button to generate the SRI hash
4. Copy the result and use it in your HTML:

```html
<script src="https://cdn.example.com/library.js"
        integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
        crossorigin="anonymous"></script>
```

## Local Development

### Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Netonia/SRIHash.git
   cd SRIHash
   ```

2. Run the application:
   ```bash
   dotnet run
   ```

3. Open your browser and navigate to the URL shown in the console (typically `https://localhost:5001`)

### Building for Production

To build the application for production:

```bash
dotnet publish -c Release
```

The output will be in `bin/Release/net9.0/publish/wwwroot/`. These files can be deployed to any static web hosting service.

## Deployment to GitHub Pages

### Automatic Deployment with GitHub Actions

This repository includes a GitHub Actions workflow that automatically builds and deploys the application to GitHub Pages.

1. Go to your repository settings
2. Navigate to **Pages** under **Code and automation**
3. Under **Build and deployment**, select **GitHub Actions** as the source
4. Push to the `main` branch, and the workflow will automatically deploy your site

The GitHub Actions workflow is configured in `.github/workflows/deploy.yml`.

### Manual Deployment

1. Build the application:
   ```bash
   dotnet publish -c Release
   ```

2. The built files will be in `bin/Release/net9.0/publish/wwwroot/`

3. Copy these files to your `gh-pages` branch or configure GitHub Pages to use the GitHub Actions workflow

## Browser Compatibility

This application requires a modern browser with support for:
- WebAssembly (WASM)
- Web Crypto API
- ES6+ JavaScript

Tested on:
- Chrome 90+
- Edge 90+
- Firefox 88+
- Safari 14+

## Privacy & Security

- **All processing happens locally in your browser** - no data is sent to any server
- When fetching from URLs, the browser makes direct requests (subject to CORS policies)
- The application does not log, track, or store any user data

## CORS Limitations

When fetching resources from URLs, the resource must:
- Be publicly accessible
- Allow cross-origin requests (CORS headers)
- Not require authentication

If you encounter CORS errors, you can:
1. Download the resource manually and paste its content into the input field
2. Use a CORS proxy (not recommended for sensitive resources)
3. Contact the resource owner to enable CORS

## Technology Stack

- **Blazor WebAssembly** (.NET 9)
- **Bootstrap 5** for styling
- **Web Crypto API** for hash generation
- **GitHub Actions** for CI/CD

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Inspired by [SRIHash.org](https://www.srihash.org/)
- Built with Blazor WebAssembly
- Uses the Web Crypto API for secure hash generation

## Support

For issues, questions, or suggestions, please [open an issue](https://github.com/Netonia/SRIHash/issues) on GitHub.
