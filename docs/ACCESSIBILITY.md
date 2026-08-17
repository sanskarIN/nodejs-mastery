# Accessibility

> 📘 **Complete Node.js Full Mastery eBook:** https://ramsandesh.gumroad.com

The public companion repository should remain usable with common keyboard, terminal, browser, and assistive-technology workflows.

## Documentation

- Use descriptive headings with a logical hierarchy.
- Give linked text meaningful labels rather than relying only on raw URLs when context matters.
- Add useful `alt` text to images that convey information.
- Do not encode essential meaning only through color, emoji, or visual position.
- Keep command examples copyable as plain text.
- Prefer tables only when relationships are genuinely tabular; explain important conclusions in surrounding prose.

## Terminal output

Project tests and verification scripts should communicate success/failure through text and exit codes, not color alone. ANSI color may be added for convenience only if the same meaning remains visible without it.

## Examples

Deterministic examples make learning easier for readers using screen readers, translated documentation, or step-by-step terminal workflows because outputs can be compared reliably.

## Contributions

Accessibility improvements to public docs, examples, terminal messaging, and navigation are welcome. Use the documentation feedback issue template for unclear or inaccessible material.

## Commercial edition

Accessibility behavior of individual eBook-reading applications depends on the platform and file format. The public repository focuses on accessible companion code and documentation.

**Official storefront:** https://ramsandesh.gumroad.com
