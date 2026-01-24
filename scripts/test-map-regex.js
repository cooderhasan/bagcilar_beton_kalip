
const input = `<div class="mapouter"><div class="gmap_canvas"><iframe class="gmap_iframe" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=bağcılar beton kalıp&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe><a href="https://nicemail.cc/">temp mail</a></div><style>.mapouter{position:relative;text-align:right;width:600px;height:400px;}.gmap_canvas {overflow:hidden;background:none!important;width:600px;height:400px;}.gmap_iframe {width:600px!important;height:400px!important;}</style></div>`;

function extract(rawUrl) {
    if (!rawUrl) return "";
    // If it contains an iframe tag, try to extract src
    if (rawUrl.includes("<iframe")) {
        const match = rawUrl.match(/src=["'](.*?)["']/);
        return match ? match[1] : rawUrl;
    }
    return rawUrl;
}

const extracted = extract(input);
console.log("Extracted:", extracted);

// Check if it works when cleaned
const cleaned = extracted.replace(/&amp;/g, '&');
console.log("Cleaned:", cleaned);
