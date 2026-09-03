// Mermaid 10 Initialization for MkDocs Material
document.addEventListener("DOMContentLoaded", function() {
    if (typeof mermaid !== "undefined") {
        mermaid.initialize({
            startOnLoad: false,
            theme: "default",
            securityLevel: "loose"
        });
        mermaid.run({
            querySelector: ".mermaid"
        });
    }
});

// Re-render on client-side instant navigation
if (typeof location$ !== "undefined") {
    location$.subscribe(function() {
        if (typeof mermaid !== "undefined") {
            mermaid.run({
                querySelector: ".mermaid"
            });
        }
    });
}
