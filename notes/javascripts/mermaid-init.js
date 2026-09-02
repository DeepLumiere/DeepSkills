document.addEventListener("DOMContentLoaded", function() {
    if (typeof mermaid !== "undefined") {
        mermaid.initialize({
            startOnLoad: true,
            theme: "default",
            securityLevel: "loose"
        });
    }
});

if (typeof location$ !== "undefined") {
    location$.subscribe(function() {
        if (typeof mermaid !== "undefined") {
            mermaid.contentLoaded();
        }
    });
}
