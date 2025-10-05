window.sriHashHelper = {
    /**
     * Fetch a resource from a URL and return its content as a byte array
     * @param {string} url - The URL to fetch
     * @returns {Promise<Uint8Array>} - The resource content as a byte array
     */
    fetchResource: async function(url) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const arrayBuffer = await response.arrayBuffer();
            return new Uint8Array(arrayBuffer);
        } catch (error) {
            throw new Error(`Failed to fetch resource: ${error.message}`);
        }
    },

    /**
     * Calculate hash using Web Crypto API
     * @param {Uint8Array} data - The data to hash
     * @param {string} algorithm - The hash algorithm (sha256, sha384, or sha512)
     * @returns {Promise<string>} - The hash encoded as base64
     */
    calculateHash: async function(data, algorithm) {
        try {
            // Normalize algorithm name for Web Crypto API (e.g., 'sha256' -> 'SHA-256')
            const algoMap = {
                'sha256': 'SHA-256',
                'sha384': 'SHA-384',
                'sha512': 'SHA-512'
            };
            
            const algoName = algoMap[algorithm.toLowerCase()];
            if (!algoName) {
                throw new Error(`Unsupported algorithm: ${algorithm}`);
            }
            
            // Calculate the hash
            const hashBuffer = await crypto.subtle.digest(algoName, data);
            
            // Convert to base64 (standard base64 with padding, as required for SRI)
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashBase64 = btoa(String.fromCharCode.apply(null, hashArray));
            
            return hashBase64;
        } catch (error) {
            throw new Error(`Failed to calculate hash: ${error.message}`);
        }
    },

    /**
     * Copy text to clipboard
     * @param {string} text - The text to copy
     * @returns {Promise<void>}
     */
    copyToClipboard: async function(text) {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                // Use modern clipboard API if available
                await navigator.clipboard.writeText(text);
            } else {
                // Fallback for older browsers or non-secure contexts
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                
                try {
                    document.execCommand('copy');
                } catch (err) {
                    throw new Error('Failed to copy to clipboard');
                } finally {
                    textArea.remove();
                }
            }
        } catch (error) {
            throw new Error(`Failed to copy to clipboard: ${error.message}`);
        }
    }
};
