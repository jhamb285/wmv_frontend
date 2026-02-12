(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/types/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Dubai Event Discovery Platform - Type Definitions
// Geographic Types
__turbopack_context__.s([
    "DUBAI_AREAS",
    ()=>DUBAI_AREAS,
    "DUBAI_CENTER",
    ()=>DUBAI_CENTER,
    "RETRO_MAP_STYLE",
    ()=>RETRO_MAP_STYLE
]);
const DUBAI_AREAS = [
    {
        name: 'Downtown Dubai',
        lat: 25.1972,
        lng: 55.2744,
        zoom: 14
    },
    {
        name: 'Dubai Marina',
        lat: 25.0805,
        lng: 55.1403,
        zoom: 14
    },
    {
        name: 'JBR',
        lat: 25.0752,
        lng: 55.1337,
        zoom: 15
    },
    {
        name: 'Business Bay',
        lat: 25.1850,
        lng: 55.2650,
        zoom: 14
    },
    {
        name: 'DIFC',
        lat: 25.2110,
        lng: 55.2820,
        zoom: 15
    },
    {
        name: 'City Walk',
        lat: 25.2048,
        lng: 55.2645,
        zoom: 15
    },
    {
        name: 'La Mer',
        lat: 25.2354,
        lng: 55.2707,
        zoom: 15
    },
    {
        name: 'Bluewaters',
        lat: 25.0764,
        lng: 55.1201,
        zoom: 16
    },
    {
        name: 'Old Dubai/Deira',
        lat: 25.2654,
        lng: 55.3007,
        zoom: 14
    },
    {
        name: 'Al Seef',
        lat: 25.2554,
        lng: 55.2934,
        zoom: 15
    },
    {
        name: 'Jumeirah',
        lat: 25.2048,
        lng: 55.2708,
        zoom: 14
    }
];
const DUBAI_CENTER = {
    lat: 25.2048,
    lng: 55.2708
};
const RETRO_MAP_STYLE = [
    // Hide ALL built-in icons globally
    {
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    // Hide ALL POIs (parks, universities, shopping, etc.)
    {
        featureType: "poi",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    // Hide transit layer entirely (removes airport/train/bus station pins)
    {
        featureType: "transit",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        elementType: "geometry",
        stylers: [
            {
                color: "#ebe3cd"
            }
        ]
    },
    {
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#523735"
            }
        ]
    },
    {
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#f5f1e6"
            }
        ]
    },
    {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#c9b2a6"
            }
        ]
    },
    {
        featureType: "administrative.land_parcel",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#dcd2be"
            }
        ]
    },
    {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#ae9e90"
            }
        ]
    },
    {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [
            {
                color: "#dfd2ae"
            }
        ]
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [
            {
                color: "#f5f1e6"
            }
        ]
    },
    {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
            {
                color: "#fdfcf8"
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
            {
                color: "#f8c967"
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#e9bc62"
            }
        ]
    },
    {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers: [
            {
                color: "#e98d58"
            }
        ]
    },
    {
        featureType: "road.highway.controlled_access",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#db8555"
            }
        ]
    },
    {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#806b63"
            }
        ]
    },
    {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#b9d3c2"
            }
        ]
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#92998d"
            }
        ]
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/maps-config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Google Maps Mobile Configuration for Dubai Event Discovery Mobile Web App
__turbopack_context__.s([
    "DUBAI_BOUNDS",
    ()=>DUBAI_BOUNDS,
    "GOOGLE_MAPS_CONFIG",
    ()=>GOOGLE_MAPS_CONFIG,
    "MAP_CONTROLS",
    ()=>MAP_CONTROLS,
    "MAP_OPTIONS",
    ()=>MAP_OPTIONS,
    "calculateDistance",
    ()=>calculateDistance,
    "createBounds",
    ()=>createBounds,
    "createCustomMarker",
    ()=>createCustomMarker,
    "createLatLng",
    ()=>createLatLng,
    "getMapOptions",
    ()=>getMapOptions,
    "handleMapBoundsChanged",
    ()=>handleMapBoundsChanged,
    "handleMapIdle",
    ()=>handleMapIdle,
    "handleMapZoomChanged",
    ()=>handleMapZoomChanged,
    "isPointInDubai",
    ()=>isPointInDubai
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/index.ts [app-client] (ecmascript)");
;
const GOOGLE_MAPS_CONFIG = {
    apiKey: ("TURBOPACK compile-time value", "AIzaSyAg69JPNj2LMOU-UP94ljNdYYKzGkn9bsE"),
    libraries: [
        'places',
        'geometry'
    ],
    language: 'en',
    region: 'AE'
};
const DUBAI_BOUNDS = {
    north: 25.4,
    south: 24.8,
    east: 55.6,
    west: 54.8
};
const getMapOptions = ()=>({
        center: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DUBAI_CENTER"],
        zoom: 12,
        styles: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RETRO_MAP_STYLE"],
        disableDefaultUI: true,
        gestureHandling: 'greedy',
        mapTypeId: 'roadmap',
        clickableIcons: false,
        maxZoom: 18,
        minZoom: 10,
        restriction: {
            latLngBounds: DUBAI_BOUNDS,
            strictBounds: false
        },
        ...typeof google !== 'undefined' && google.maps ? {
            // Custom map styling options - only when google is available
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.TOP_RIGHT
            },
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_CENTER
            },
            streetViewControlOptions: {
                position: google.maps.ControlPosition.RIGHT_CENTER
            }
        } : {}
    });
const MAP_OPTIONS = {
    center: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DUBAI_CENTER"],
    zoom: 12,
    styles: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RETRO_MAP_STYLE"],
    disableDefaultUI: true,
    gestureHandling: 'greedy',
    mapTypeId: 'roadmap',
    clickableIcons: false,
    maxZoom: 18,
    minZoom: 10,
    restriction: {
        latLngBounds: DUBAI_BOUNDS,
        strictBounds: false
    }
};
const MAP_CONTROLS = {
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    rotateControl: false,
    scaleControl: true
};
const createLatLng = (lat, lng)=>{
    if (typeof google !== 'undefined' && google.maps) {
        return new google.maps.LatLng(lat, lng);
    }
    return null;
};
const createBounds = (venues)=>{
    if (typeof google !== 'undefined' && google.maps) {
        const bounds = new google.maps.LatLngBounds();
        venues.forEach((venue)=>{
            const latLng = createLatLng(venue.lat, venue.lng);
            if (latLng) bounds.extend(latLng);
        });
        return bounds;
    }
    return null;
};
const calculateDistance = (point1, point2)=>{
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (point2.lat - point1.lat) * Math.PI / 180;
    const dLon = (point2.lng - point1.lng) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
};
const isPointInDubai = (point)=>{
    return point.lat >= DUBAI_BOUNDS.south && point.lat <= DUBAI_BOUNDS.north && point.lng >= DUBAI_BOUNDS.west && point.lng <= DUBAI_BOUNDS.east;
};
const handleMapIdle = (map, callback)=>{
    const listener = map.addListener('idle', ()=>{
        callback === null || callback === void 0 ? void 0 : callback();
    });
    return listener;
};
const handleMapBoundsChanged = (map, callback)=>{
    const listener = map.addListener('bounds_changed', ()=>{
        const bounds = map.getBounds();
        if (bounds) {
            callback(bounds);
        }
    });
    return listener;
};
const handleMapZoomChanged = (map, callback)=>{
    const listener = map.addListener('zoom_changed', ()=>{
        const zoom = map.getZoom();
        if (zoom !== undefined) {
            callback(zoom);
        }
    });
    return listener;
};
const createCustomMarker = (hasStories, isSelected)=>{
    var _window_google;
    console.log('🔧 createCustomMarker called - hasStories:', hasStories, 'isSelected:', isSelected);
    console.log('🔧 window.google:', ("TURBOPACK compile-time truthy", 1) ? !!window.google : "TURBOPACK unreachable");
    console.log('🔧 google.maps:', "object" !== 'undefined' && window.google ? !!window.google.maps : 'undefined');
    if ("object" === 'undefined' || !((_window_google = window.google) === null || _window_google === void 0 ? void 0 : _window_google.maps)) {
        console.log('🔧 createCustomMarker returning null - Google Maps not ready');
        // Return null for SSR/pre-load - this might be causing issues
        return null;
    }
    if (isSelected) {
        return {
            url: "data:image/svg+xml;base64,".concat(btoa('\n        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">\n          <circle cx="16" cy="16" r="14" fill="#ff006e" stroke="#d00060" stroke-width="4"/>\n        </svg>\n      ')),
            scaledSize: new google.maps.Size(32, 32),
            anchor: new google.maps.Point(16, 16)
        };
    } else if (hasStories) {
        return {
            url: "data:image/svg+xml;base64,".concat(btoa('\n        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n          <circle cx="12" cy="12" r="10" fill="#D4AF37" stroke="#B8860B" stroke-width="2"/>\n        </svg>\n      ')),
            scaledSize: new google.maps.Size(24, 24),
            anchor: new google.maps.Point(12, 12)
        };
    } else {
        return {
            url: "data:image/svg+xml;base64,".concat(btoa('\n        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">\n          <circle cx="8" cy="8" r="6" fill="#64748b" stroke="#334155" stroke-width="2"/>\n        </svg>\n      ')),
            scaledSize: new google.maps.Size(16, 16),
            anchor: new google.maps.Point(8, 8)
        };
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/navigation/TopNav.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
'use client';
;
;
const TopNav = (param)=>{
    let { navButtons } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed top-4 left-4 right-4 z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white/60 backdrop-blur-xl rounded-full px-4 py-2 shadow-xl border border-white/60 flex items-center justify-between before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/40 before:to-white/20 before:pointer-events-none before:rounded-full after:absolute after:inset-0 after:bg-gradient-to-t after:from-transparent after:via-white/10 after:to-white/20 after:pointer-events-none after:rounded-full relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: "/logo_clean.svg",
                    alt: "WMV Logo",
                    width: 64,
                    height: 32,
                    className: "w-16 h-8 object-contain opacity-50"
                }, void 0, false, {
                    fileName: "[project]/src/components/navigation/TopNav.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                navButtons && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: navButtons
                }, void 0, false, {
                    fileName: "[project]/src/components/navigation/TopNav.tsx",
                    lineNumber: 25,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/navigation/TopNav.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/navigation/TopNav.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = TopNav;
const __TURBOPACK__default__export__ = TopNav;
var _c;
__turbopack_context__.k.register(_c, "TopNav");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/filters/HierarchicalFilterContainer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
'use client';
;
;
const HierarchicalFilterContainer = (param)=>{
    let { filters, onFiltersChange, filterOptions } = param;
    console.log('🎯 HIERARCHICAL CONTAINER - Rendering with filters:', filters);
    console.log('🎯 HIERARCHICAL CONTAINER - Filter options:', filterOptions);
    // Handle primary category selection
    const handlePrimaryClick = (type, category)=>{
        console.log('🔘 PRIMARY CLICK - Type:', type, 'Category:', category);
        const currentPrimaries = filters.selectedPrimaries[type];
        const currentExpanded = filters.expandedPrimaries[type];
        if (currentPrimaries.includes(category)) {
            // If already selected, remove it and collapse
            onFiltersChange({
                ...filters,
                selectedPrimaries: {
                    ...filters.selectedPrimaries,
                    [type]: currentPrimaries.filter((c)=>c !== category)
                },
                expandedPrimaries: {
                    ...filters.expandedPrimaries,
                    [type]: currentExpanded.filter((c)=>c !== category)
                },
                selectedSecondaries: {
                    ...filters.selectedSecondaries,
                    [type]: Object.fromEntries(Object.entries(filters.selectedSecondaries[type]).filter((param)=>{
                        let [key] = param;
                        return key !== category;
                    }))
                }
            });
        } else {
            // If not selected, add it and expand
            onFiltersChange({
                ...filters,
                selectedPrimaries: {
                    ...filters.selectedPrimaries,
                    [type]: [
                        ...currentPrimaries,
                        category
                    ]
                },
                expandedPrimaries: {
                    ...filters.expandedPrimaries,
                    [type]: [
                        ...currentExpanded,
                        category
                    ]
                }
            });
        }
    };
    // Handle secondary category selection
    const handleSecondaryClick = (type, primary, secondary)=>{
        console.log("🎯 SECONDARY CLICK - Type: ".concat(type, " 🏷️ Primary: ").concat(primary, " 🎵 Secondary: ").concat(secondary));
        console.log('🔍 FULL FILTER STATE:', JSON.stringify(filters, null, 2));
        const currentSecondaries = filters.selectedSecondaries[type][primary] || [];
        console.log('📦 Current secondaries:', currentSecondaries);
        console.log('❓ Is selected?', currentSecondaries.includes(secondary));
        const isCurrentlySelected = currentSecondaries.includes(secondary);
        const newSecondaries = isCurrentlySelected ? currentSecondaries.filter((s)=>s !== secondary) : [
            ...currentSecondaries,
            secondary
        ];
        console.log(isCurrentlySelected ? '➖ REMOVING from selection' : '➕ ADDING to selection');
        console.log('📝 New secondaries after toggle:', newSecondaries);
        // If removing the last secondary, keep the primary but remove secondaries
        // This will revert back to showing all items in that primary category
        if (newSecondaries.length === 0 && isCurrentlySelected) {
            console.log('🔄 No secondaries left - keeping primary but removing secondaries');
            onFiltersChange({
                ...filters,
                selectedSecondaries: {
                    ...filters.selectedSecondaries,
                    [type]: Object.fromEntries(Object.entries(filters.selectedSecondaries[type]).filter((param)=>{
                        let [key] = param;
                        return key !== primary;
                    }))
                }
            });
            return;
        }
        // Ensure primary is in selectedPrimaries and expandedPrimaries when working with secondaries
        const primaryIsSelected = filters.selectedPrimaries[type].includes(primary);
        const primaryIsExpanded = filters.expandedPrimaries[type].includes(primary);
        const newFilters = {
            ...filters,
            selectedPrimaries: {
                ...filters.selectedPrimaries,
                [type]: primaryIsSelected ? filters.selectedPrimaries[type] : [
                    ...filters.selectedPrimaries[type],
                    primary
                ]
            },
            expandedPrimaries: {
                ...filters.expandedPrimaries,
                [type]: primaryIsExpanded ? filters.expandedPrimaries[type] : [
                    ...filters.expandedPrimaries[type],
                    primary
                ]
            },
            selectedSecondaries: {
                ...filters.selectedSecondaries,
                [type]: {
                    ...filters.selectedSecondaries[type],
                    [primary]: newSecondaries
                }
            }
        };
        console.log('✅ NEW FILTER STATE (about to send):', JSON.stringify(newFilters, null, 2));
        console.log("🎯 NEW secondaries for ".concat(primary, ":"), newFilters.selectedSecondaries[type][primary]);
        onFiltersChange(newFilters);
    };
    // Get color for category
    const getCategoryColor = (type, category)=>{
        var _hierarchical_category;
        const hierarchical = type === 'genres' ? filterOptions.hierarchicalGenres : filterOptions.hierarchicalVibes;
        return ((_hierarchical_category = hierarchical[category]) === null || _hierarchical_category === void 0 ? void 0 : _hierarchical_category.color) || 'gray';
    };
    // Get hex color from color name
    const getHexColor = (colorName)=>{
        const colorMap = {
            purple: '#9333EA',
            blue: '#3B82F6',
            green: '#10B981',
            orange: '#F97316',
            teal: '#14B8A6',
            pink: '#EC4899',
            indigo: '#6366F1',
            gray: '#6B7280'
        };
        return colorMap[colorName] || '#6B7280';
    };
    // Render primary pill
    const renderPrimaryPill = (type, category)=>{
        const isSelected = filters.selectedPrimaries[type].includes(category);
        const isExpanded = filters.expandedPrimaries[type].includes(category);
        const colorName = getCategoryColor(type, category);
        const hexColor = getHexColor(colorName);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: ()=>handlePrimaryClick(type, category),
            className: "\n          px-3 py-1.5 text-sm font-medium rounded-full\n          backdrop-blur-lg border-2\n          transition-all duration-200 whitespace-nowrap flex-shrink-0\n          ".concat(isSelected ? 'text-white border-white/90 shadow-lg' : 'text-white/90 border-white/60 hover:border-white/80', "\n        "),
            style: {
                backgroundColor: isSelected ? hexColor : "".concat(hexColor, "CC")
            },
            children: [
                category,
                isExpanded && ' ↓'
            ]
        }, "".concat(type, "-").concat(category), true, {
            fileName: "[project]/src/components/filters/HierarchicalFilterContainer.tsx",
            lineNumber: 155,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    };
    // Render secondary pill
    const renderSecondaryPill = (type, primary, secondary)=>{
        var _filters_selectedSecondaries_type_primary;
        const isSelected = ((_filters_selectedSecondaries_type_primary = filters.selectedSecondaries[type][primary]) === null || _filters_selectedSecondaries_type_primary === void 0 ? void 0 : _filters_selectedSecondaries_type_primary.includes(secondary)) || false;
        const colorName = getCategoryColor(type, primary);
        const hexColor = getHexColor(colorName);
        // Removed verbose render logging
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: ()=>handleSecondaryClick(type, primary, secondary),
            className: "\n          px-2 py-1 text-xs font-medium rounded-full\n          backdrop-blur-lg border-2\n          transition-all duration-200 whitespace-nowrap flex-shrink-0\n          ".concat(isSelected ? 'text-white border-white shadow-lg scale-105' : 'text-white/70 border-white/30 hover:border-white/50 hover:text-white/90', "\n        "),
            style: {
                backgroundColor: isSelected ? hexColor : "".concat(hexColor, "80")
            },
            children: secondary
        }, "".concat(type, "-").concat(primary, "-").concat(secondary), false, {
            fileName: "[project]/src/components/filters/HierarchicalFilterContainer.tsx",
            lineNumber: 186,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    };
    // Get all expanded secondaries for display
    const getExpandedSecondaries = ()=>{
        const secondaries = [];
        // Add genre secondaries
        filters.expandedPrimaries.genres.forEach((primary)=>{
            var _filterOptions_hierarchicalGenres_primary;
            const subcategories = ((_filterOptions_hierarchicalGenres_primary = filterOptions.hierarchicalGenres[primary]) === null || _filterOptions_hierarchicalGenres_primary === void 0 ? void 0 : _filterOptions_hierarchicalGenres_primary.subcategories) || [];
            subcategories.forEach((secondary)=>{
                secondaries.push({
                    type: 'genres',
                    primary,
                    secondary
                });
            });
        });
        // Add vibe secondaries
        filters.expandedPrimaries.vibes.forEach((primary)=>{
            var _filterOptions_hierarchicalVibes_primary;
            const subcategories = ((_filterOptions_hierarchicalVibes_primary = filterOptions.hierarchicalVibes[primary]) === null || _filterOptions_hierarchicalVibes_primary === void 0 ? void 0 : _filterOptions_hierarchicalVibes_primary.subcategories) || [];
            subcategories.forEach((secondary)=>{
                secondaries.push({
                    type: 'vibes',
                    primary,
                    secondary
                });
            });
        });
        return secondaries;
    };
    const expandedSecondaries = getExpandedSecondaries();
    // Safety check for undefined filter options
    if (!filterOptions.hierarchicalGenres || !filterOptions.hierarchicalVibes) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed top-[92px] left-0 right-0 z-40 px-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2 overflow-x-auto scrollbar-hide pb-2",
                style: {
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                },
                children: [
                    Object.keys(filterOptions.hierarchicalGenres || {}).map((category)=>renderPrimaryPill('genres', category)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-px h-8 bg-white/30 mx-2 flex-shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/src/components/filters/HierarchicalFilterContainer.tsx",
                        lineNumber: 247,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    Object.keys(filterOptions.hierarchicalVibes || {}).map((category)=>renderPrimaryPill('vibes', category))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/filters/HierarchicalFilterContainer.tsx",
                lineNumber: 240,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: expandedSecondaries.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        height: 0
                    },
                    animate: {
                        opacity: 1,
                        height: 'auto'
                    },
                    exit: {
                        opacity: 0,
                        height: 0
                    },
                    transition: {
                        duration: 0.3,
                        ease: 'easeOut'
                    },
                    className: "overflow-hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-1.5 overflow-x-auto scrollbar-hide pb-2 pt-1",
                        style: {
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        },
                        children: expandedSecondaries.map((param)=>{
                            let { type, primary, secondary } = param;
                            return renderSecondaryPill(type, primary, secondary);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/filters/HierarchicalFilterContainer.tsx",
                        lineNumber: 265,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/filters/HierarchicalFilterContainer.tsx",
                    lineNumber: 258,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/filters/HierarchicalFilterContainer.tsx",
                lineNumber: 256,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/filters/HierarchicalFilterContainer.tsx",
        lineNumber: 238,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = HierarchicalFilterContainer;
const __TURBOPACK__default__export__ = HierarchicalFilterContainer;
var _c;
__turbopack_context__.k.register(_c, "HierarchicalFilterContainer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn() {
    for(var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++){
        inputs[_key] = arguments[_key];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
            destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-9 px-4 py-2 has-[>svg]:px-3",
            sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
            lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
            icon: "size-9"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button(param) {
    let { className, variant, size, asChild = false, ...props } = param;
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden", {
    variants: {
        variant: {
            default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
            secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
            destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge(param) {
    let { className, variant, asChild = false, ...props } = param;
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "span";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "badge",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/badge.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c = Badge;
;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardAction",
    ()=>CardAction,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
function Card(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Card;
function CardHeader(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c1 = CardHeader;
function CardTitle(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c2 = CardTitle;
function CardDescription(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c3 = CardDescription;
function CardAction(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_c4 = CardAction;
function CardContent(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_c5 = CardContent;
function CardFooter(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center px-6 [.border-t]:pt-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_c6 = CardFooter;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "CardHeader");
__turbopack_context__.k.register(_c2, "CardTitle");
__turbopack_context__.k.register(_c3, "CardDescription");
__turbopack_context__.k.register(_c4, "CardAction");
__turbopack_context__.k.register(_c5, "CardContent");
__turbopack_context__.k.register(_c6, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/separator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Separator",
    ()=>Separator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$separator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-separator/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function Separator(param) {
    let { className, orientation = "horizontal", decorative = true, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$separator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "separator",
        decorative: decorative,
        orientation: orientation,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/separator.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = Separator;
;
var _c;
__turbopack_context__.k.register(_c, "Separator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useEvents.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useEvents",
    ()=>useEvents
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
// Global cache for events data - persists across component unmounts
const eventsCache = new Map();
// Cache expiry time: 5 minutes
const CACHE_EXPIRY_MS = 5 * 60 * 1000;
function useEvents() {
    let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _s();
    const [events, setEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Create a stable reference to options to prevent re-renders
    const optionsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])('');
    const currentOptionsString = JSON.stringify({
        venue_name: options.venue_name || '',
        limit: options.limit || 10,
        genres: options.genres || [],
        vibes: options.vibes || [],
        offers: options.offers || [],
        dates: options.dates || []
    });
    const fetchEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useEvents.useCallback[fetchEvents]": async ()=>{
            try {
                setIsLoading(true);
                setError(null);
                // Check cache first
                const cacheKey = currentOptionsString;
                const cachedEntry = eventsCache.get(cacheKey);
                const now = Date.now();
                // If we have valid cached data, use it
                if (cachedEntry && now < cachedEntry.expiresAt) {
                    console.log("🚀 CACHE HIT for venue: ".concat(options.venue_name, " - Loading instantly!"));
                    setEvents(cachedEntry.data);
                    setError(null);
                    setIsLoading(false);
                    return;
                }
                // Remove expired cache entries
                if (cachedEntry && now >= cachedEntry.expiresAt) {
                    console.log("🗑️ CACHE EXPIRED for venue: ".concat(options.venue_name, " - Fetching fresh data"));
                    eventsCache.delete(cacheKey);
                }
                console.log("📡 CACHE MISS for venue: ".concat(options.venue_name, " - Fetching from API"));
                const params = new URLSearchParams();
                if (options.venue_name) params.append('venue_name', options.venue_name);
                if (options.limit) params.append('limit', options.limit.toString());
                if (options.genres && options.genres.length > 0) params.append('genres', options.genres.join(','));
                if (options.vibes && options.vibes.length > 0) params.append('vibes', options.vibes.join(','));
                if (options.offers && options.offers.length > 0) params.append('offers', options.offers.join(','));
                if (options.dates && options.dates.length > 0) params.append('dates', options.dates.join(','));
                const response = await fetch("/api/events?".concat(params), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error("HTTP error! status: ".concat(response.status));
                }
                const result = await response.json();
                if (result.success && result.data && Array.isArray(result.data)) {
                    const eventData = result.data;
                    // Store in cache
                    eventsCache.set(cacheKey, {
                        data: eventData,
                        timestamp: now,
                        expiresAt: now + CACHE_EXPIRY_MS
                    });
                    console.log("💾 CACHED events for venue: ".concat(options.venue_name, " (").concat(eventData.length, " events)"));
                    setEvents(eventData);
                    setError(null);
                } else {
                    const errorMsg = result.error || 'Invalid response format';
                    setError(errorMsg);
                }
            } catch (err) {
                const errorMsg = err instanceof Error ? err.message : 'Network error occurred';
                setError(errorMsg);
                console.error('Events API error:', err);
            } finally{
                setIsLoading(false);
            }
        }
    }["useEvents.useCallback[fetchEvents]"], [
        currentOptionsString,
        options.venue_name
    ]); // Only re-create when the stringified options actually change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useEvents.useEffect": ()=>{
            // Don't fetch if explicitly disabled
            if (options.enabled === false) {
                console.log('🚫 FETCH DISABLED - enabled=false');
                return;
            }
            // Only fetch if options have actually changed and we have meaningful options
            if (optionsRef.current !== currentOptionsString) {
                optionsRef.current = currentOptionsString;
                if (options.venue_name || options.genres && options.genres.length > 0 || options.vibes && options.vibes.length > 0 || options.offers && options.offers.length > 0) {
                    fetchEvents();
                }
            }
        }
    }["useEvents.useEffect"], [
        currentOptionsString,
        fetchEvents,
        options.enabled
    ]);
    return {
        events,
        isLoading,
        error,
        refetch: fetchEvents,
        // Cache management utilities
        clearCache: ()=>{
            eventsCache.clear();
            console.log('🗑️ Events cache cleared');
        },
        getCacheStats: ()=>({
                size: eventsCache.size,
                entries: Array.from(eventsCache.entries()).map((param)=>{
                    let [key, value] = param;
                    return {
                        key,
                        timestamp: new Date(value.timestamp).toISOString(),
                        expiresAt: new Date(value.expiresAt).toISOString(),
                        eventCount: value.data.length
                    };
                })
            })
    };
}
_s(useEvents, "0WrwPfLGzE86n3lf6v72nXgWSaw=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/venue/VenueDetailsSidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript) <export default as Instagram>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/music.js [app-client] (ecmascript) <export default as Music>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gift.js [app-client] (ecmascript) <export default as Gift>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/target.js [app-client] (ecmascript) <export default as Target>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/separator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useEvents.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
// Convert hierarchical filter state to flat filter state for API calls
function convertHierarchicalToFlat(hierarchicalState) {
    if (!hierarchicalState) {
        return {
            selectedAreas: [],
            activeVibes: [],
            activeDates: [],
            activeGenres: [],
            activeOffers: [],
            searchQuery: ''
        };
    }
    const allActiveGenres = [];
    const allActiveVibes = [];
    // Process genres
    hierarchicalState.selectedPrimaries.genres.forEach((primary)=>{
        var _hierarchicalState_selectedSecondaries_genres;
        const secondaries = ((_hierarchicalState_selectedSecondaries_genres = hierarchicalState.selectedSecondaries.genres) === null || _hierarchicalState_selectedSecondaries_genres === void 0 ? void 0 : _hierarchicalState_selectedSecondaries_genres[primary]) || [];
        if (secondaries.length > 0) {
            allActiveGenres.push(...secondaries);
        } else {
            allActiveGenres.push(primary);
        }
    });
    // Process vibes
    hierarchicalState.selectedPrimaries.vibes.forEach((primary)=>{
        var _hierarchicalState_selectedSecondaries_vibes;
        const secondaries = ((_hierarchicalState_selectedSecondaries_vibes = hierarchicalState.selectedSecondaries.vibes) === null || _hierarchicalState_selectedSecondaries_vibes === void 0 ? void 0 : _hierarchicalState_selectedSecondaries_vibes[primary]) || [];
        if (secondaries.length > 0) {
            allActiveVibes.push(...secondaries);
        } else {
            allActiveVibes.push(primary);
        }
    });
    return {
        selectedAreas: hierarchicalState.selectedAreas,
        activeVibes: allActiveVibes,
        activeDates: hierarchicalState.activeDates,
        activeGenres: allActiveGenres,
        activeOffers: hierarchicalState.activeOffers,
        searchQuery: hierarchicalState.searchQuery
    };
}
const VenueDetailsSidebar = (param)=>{
    let { venue, isOpen, onClose, stories = [], filters } = param;
    var _venue_category_split__replace, _venue_category_split_, _venue_category;
    _s();
    // Convert hierarchical filters to flat for API call
    const flatFilters = convertHierarchicalToFlat(filters);
    // Fetch real event data for this venue with applied filters
    // Only fetch when sidebar is actually open to avoid duplicate API calls
    const { events, isLoading: eventsLoading, error: eventsError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvents"])({
        venue_name: (venue === null || venue === void 0 ? void 0 : venue.name) || '',
        limit: 10,
        genres: flatFilters.activeGenres || [],
        vibes: flatFilters.activeVibes || [],
        offers: flatFilters.activeOffers || [],
        dates: flatFilters.activeDates || [],
        enabled: isOpen && !!(venue === null || venue === void 0 ? void 0 : venue.name // Only fetch when sidebar is open and has a venue
        )
    });
    // Group events by date
    const eventsByDate = events.reduce((acc, event)=>{
        const dateKey = new Date(event.event_date).toDateString();
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(event);
        return acc;
    }, {});
    const uniqueDates = Object.keys(eventsByDate).sort((a, b)=>new Date(a).getTime() - new Date(b).getTime());
    // State for selected date (default to first date)
    const [selectedDateKey, setSelectedDateKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(uniqueDates[0] || '');
    // Update selected date when events change (e.g., when filters change)
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "VenueDetailsSidebar.useEffect": ()=>{
            if (uniqueDates.length > 0 && !uniqueDates.includes(selectedDateKey)) {
                setSelectedDateKey(uniqueDates[0]);
            }
        }
    }["VenueDetailsSidebar.useEffect"], [
        uniqueDates,
        selectedDateKey
    ]);
    const selectedDateEvents = selectedDateKey ? eventsByDate[selectedDateKey] || [] : [];
    if (!venue) return null;
    // Use venue data as-is without any dummy data
    const currentStories = stories;
    const hasLiveStories = currentStories.length > 0;
    const timeRemaining = hasLiveStories ? '22h 25m left' : '';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/20 backdrop-blur-sm z-40",
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                lineNumber: 125,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-0 right-0 h-full w-full sm:w-96 bg-slate-900 border-l border-slate-700 text-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ".concat(isOpen ? 'translate-x-0' : 'translate-x-full'),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col h-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 border-b border-slate-700",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-lg font-bold text-white mb-1 leading-tight",
                                                            children: venue.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                            lineNumber: 144,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-white/70 text-sm flex items-center gap-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: venue.area
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                    lineNumber: 146,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "w-1 h-1 bg-white/40 rounded-full"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                    lineNumber: 147,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Dubai"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                    lineNumber: 148,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                            lineNumber: 145,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                    lineNumber: 143,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                lineNumber: 142,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 flex-wrap",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                variant: "secondary",
                                                                className: "bg-slate-700 text-slate-300 capitalize",
                                                                children: ((_venue_category = venue.category) === null || _venue_category === void 0 ? void 0 : (_venue_category_split_ = _venue_category.split(',')[0]) === null || _venue_category_split_ === void 0 ? void 0 : (_venue_category_split__replace = _venue_category_split_.replace(/([a-z])([A-Z])/g, '$1 $2')) === null || _venue_category_split__replace === void 0 ? void 0 : _venue_category_split__replace.trim()) || 'Venue'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                lineNumber: 155,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            hasLiveStories && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                variant: "destructive",
                                                                className: "bg-red-600 text-white animate-pulse",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "w-2 h-2 bg-red-400 rounded-full mr-1.5 animate-pulse"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                        lineNumber: 166,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    currentStories.length,
                                                                    " Live Stories"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                lineNumber: 162,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                        lineNumber: 154,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            (venue === null || venue === void 0 ? void 0 : venue.final_instagram) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: "https://instagram.com/".concat(venue.final_instagram),
                                                                target: "_blank",
                                                                rel: "noopener noreferrer",
                                                                className: "p-1.5 rounded-full bg-slate-800 hover:bg-pink-600 transition-colors duration-200",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"], {
                                                                    className: "h-4 w-4 text-pink-400 hover:text-white"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                    lineNumber: 180,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                lineNumber: 174,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            (venue === null || venue === void 0 ? void 0 : venue.phone) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: "tel:".concat(venue.phone),
                                                                className: "p-1.5 rounded-full bg-slate-800 hover:bg-green-600 transition-colors duration-200",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                                    className: "h-4 w-4 text-green-400 hover:text-white"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                    lineNumber: 188,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                lineNumber: 184,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                        lineNumber: 172,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                lineNumber: 153,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                        lineNumber: 141,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "icon",
                                        onClick: onClose,
                                        className: "bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white h-8 w-8",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                            lineNumber: 201,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                        lineNumber: 195,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                lineNumber: 140,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                            lineNumber: 139,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto px-4 pt-2 pb-6 max-h-[calc(100vh-8rem)] scrollbar-thin",
                            children: [
                                hasLiveStories && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "py-4 border-b border-slate-700",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 mb-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"], {
                                                    className: "h-5 w-5 text-yellow-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                    lineNumber: 212,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-lg font-semibold",
                                                    children: "Current Stories"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                    lineNumber: 213,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                    variant: "outline",
                                                    className: "text-xs border-slate-600",
                                                    children: currentStories.length
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                    lineNumber: 214,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                            lineNumber: 211,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        timeRemaining && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 mb-3 text-xs text-slate-400",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                    lineNumber: 221,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "⏱️ ",
                                                        timeRemaining
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                    lineNumber: 222,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                            lineNumber: 220,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        currentStories.map((story)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-slate-800 rounded-lg p-4 mb-3 border border-slate-700",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "https://instagram.com/".concat(story.username),
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        className: "block w-full h-32 bg-slate-700 rounded-md mb-3 flex items-center justify-center cursor-pointer hover:bg-slate-600 transition-all duration-200 border-2 border-transparent hover:border-pink-500/50",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-center text-slate-400 hover:text-pink-400 transition-colors",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"], {
                                                                    className: "h-8 w-8 mx-auto mb-2"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                    lineNumber: 239,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs font-medium",
                                                                    children: "📸 Instagram Story"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                    lineNumber: 240,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-pink-400 font-semibold",
                                                                    children: "👆 Click here to check out Instagram"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                    lineNumber: 241,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                            lineNumber: 238,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                        lineNumber: 232,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                                        className: "h-4 w-4 text-slate-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                        lineNumber: 248,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm",
                                                                        children: [
                                                                            "@",
                                                                            story.username
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                        lineNumber: 249,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs text-slate-400",
                                                                        children: new Date(story.timestamp).toLocaleDateString('en-US', {
                                                                            month: 'short',
                                                                            day: 'numeric',
                                                                            year: 'numeric',
                                                                            hour: 'numeric',
                                                                            minute: '2-digit',
                                                                            hour12: true
                                                                        })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                        lineNumber: 250,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                lineNumber: 247,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-slate-300",
                                                                children: story.context
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                lineNumber: 262,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            story.artists && story.artists.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs text-slate-400",
                                                                children: [
                                                                    "Mentions: ",
                                                                    story.artists.map((artist)=>"@".concat(artist)).join(' ')
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                lineNumber: 265,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                        lineNumber: 246,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                        variant: "outline",
                                                        size: "sm",
                                                        className: "w-full mt-3 border-pink-500/50 text-pink-400 hover:bg-pink-500/20 hover:border-pink-400 bg-pink-500/10",
                                                        asChild: true,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "https://instagram.com/".concat(story.username),
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "flex items-center justify-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"], {
                                                                    className: "h-4 w-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                    lineNumber: 283,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "👆 Click here to check out Instagram"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                    lineNumber: 284,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                                    className: "h-4 w-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                    lineNumber: 285,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                            lineNumber: 277,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                        lineNumber: 271,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, story.story_id, true, {
                                                fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                lineNumber: 227,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                    lineNumber: 210,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "py-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                    className: "h-5 w-5 text-yellow-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                    lineNumber: 296,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-lg font-semibold text-white",
                                                    children: "Events Calendar"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                    lineNumber: 297,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                            lineNumber: 295,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        !eventsLoading && !eventsError && uniqueDates.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-1 mb-2",
                                                    children: uniqueDates.map((dateKey)=>{
                                                        const date = new Date(dateKey);
                                                        const eventCount = eventsByDate[dateKey].length;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: selectedDateKey === dateKey ? "default" : "secondary",
                                                            size: "sm",
                                                            onClick: ()=>setSelectedDateKey(dateKey),
                                                            className: "text-xs px-3 py-1.5 h-auto ".concat(selectedDateKey === dateKey ? "bg-yellow-600 text-black hover:bg-yellow-700" : "bg-slate-700 text-slate-300 hover:bg-slate-600"),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                    className: "h-3 w-3 mr-1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                    lineNumber: 319,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                date.toLocaleDateString('en-US', {
                                                                    month: 'short',
                                                                    day: 'numeric'
                                                                }),
                                                                eventCount > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "ml-1 bg-white/20 rounded-full px-1.5 py-0.5 text-xs",
                                                                    children: eventCount
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                    lineNumber: 325,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, dateKey, true, {
                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                            lineNumber: 308,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                    lineNumber: 303,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
                                                    className: "bg-slate-700"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                    lineNumber: 333,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                            lineNumber: 302,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        eventsLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center py-8",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                    lineNumber: 339,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-slate-400 text-sm mt-2",
                                                    children: "Loading events..."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                    lineNumber: 340,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                            lineNumber: 338,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        eventsError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                            className: "border-red-500/20 bg-red-500/5",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                className: "pt-6",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 text-red-400",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                            className: "h-4 w-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                            lineNumber: 348,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm",
                                                            children: eventsError
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                            lineNumber: 349,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                    lineNumber: 347,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                lineNumber: 346,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                            lineNumber: 345,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        !eventsLoading && !eventsError && events.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                            className: "border-slate-700 bg-slate-800",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                className: "pt-6",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center text-slate-400",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                            className: "h-8 w-8 mx-auto mb-2 opacity-50"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                            lineNumber: 359,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm",
                                                            children: "No events found for this venue"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                            lineNumber: 360,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                    lineNumber: 358,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                lineNumber: 357,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                            lineNumber: 356,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        !eventsLoading && !eventsError && selectedDateEvents.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-4",
                                            children: selectedDateEvents.map((event, index)=>{
                                                var _event_event_name;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                                    className: "border-slate-600 bg-slate-800/60 backdrop-blur-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                                            className: "pb-1.5",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-start justify-between mb-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                                                className: "text-white text-base font-semibold flex-1",
                                                                                children: ((_event_event_name = event.event_name) === null || _event_event_name === void 0 ? void 0 : _event_event_name.replace(/^#\s*/, '')) || 'Unnamed Event'
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                lineNumber: 374,
                                                                                columnNumber: 29
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            event.confidence_score && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                variant: "outline",
                                                                                className: "text-xs border-green-500 text-green-400 bg-green-500/10 px-2 py-0.5 ml-3",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"], {
                                                                                        className: "h-3 w-3 mr-0.5"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                        lineNumber: 379,
                                                                                        columnNumber: 33
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    event.confidence_score,
                                                                                    "%"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                lineNumber: 378,
                                                                                columnNumber: 31
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                        lineNumber: 373,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                                                        className: "text-slate-300",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center justify-between w-full",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "flex items-center gap-1.5",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                                            className: "h-3.5 w-3.5 text-blue-400"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                            lineNumber: 387,
                                                                                            columnNumber: 33
                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-sm font-medium",
                                                                                            children: new Date(event.event_date).toLocaleDateString('en-US', {
                                                                                                weekday: 'short',
                                                                                                month: 'short',
                                                                                                day: 'numeric',
                                                                                                year: 'numeric'
                                                                                            })
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                            lineNumber: 388,
                                                                                            columnNumber: 33
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                    lineNumber: 386,
                                                                                    columnNumber: 31
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                event.event_time && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "flex items-center gap-1.5",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                                            className: "h-3.5 w-3.5 text-green-400"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                            lineNumber: 399,
                                                                                            columnNumber: 35
                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-sm font-medium",
                                                                                            children: event.event_time
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                            lineNumber: 400,
                                                                                            columnNumber: 35
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                    lineNumber: 398,
                                                                                    columnNumber: 33
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                            lineNumber: 385,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                        lineNumber: 384,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                lineNumber: 372,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                            lineNumber: 371,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                            className: "space-y-3 pt-3",
                                                            children: [
                                                                event.artist && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mb-3",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-start gap-2.5",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "p-1.5 rounded-lg bg-purple-600/20",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__["Music"], {
                                                                                    className: "h-4 w-4 text-purple-400"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                    lineNumber: 414,
                                                                                    columnNumber: 33
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                lineNumber: 413,
                                                                                columnNumber: 31
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex-1",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "text-xs font-semibold text-white mb-1.5",
                                                                                        children: "Artists"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                        lineNumber: 417,
                                                                                        columnNumber: 33
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex flex-wrap gap-1.5",
                                                                                        children: (Array.isArray(event.artist) ? event.artist : event.artist.split(',')).map((artist, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                                className: "bg-purple-600/20 text-purple-300 text-xs px-2 py-0.5 hover:bg-purple-600/30 border border-purple-500/30",
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__["Music"], {
                                                                                                        className: "w-2.5 h-2.5 mr-1"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                                        lineNumber: 424,
                                                                                                        columnNumber: 39
                                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                                    typeof artist === 'string' ? artist.trim() : artist
                                                                                                ]
                                                                                            }, idx, true, {
                                                                                                fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                                lineNumber: 420,
                                                                                                columnNumber: 37
                                                                                            }, ("TURBOPACK compile-time value", void 0)))
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                        lineNumber: 418,
                                                                                        columnNumber: 33
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                lineNumber: 416,
                                                                                columnNumber: 31
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                        lineNumber: 412,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                    lineNumber: 411,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                event.music_genre && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mb-3",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-start gap-2.5",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "p-1.5 rounded-lg bg-blue-600/20",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                                                    className: "h-4 w-4 text-blue-400"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                    lineNumber: 439,
                                                                                    columnNumber: 33
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                lineNumber: 438,
                                                                                columnNumber: 31
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex-1",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "text-xs font-semibold text-white mb-1.5",
                                                                                        children: "Genre"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                        lineNumber: 442,
                                                                                        columnNumber: 33
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex flex-wrap gap-1.5",
                                                                                        children: (Array.isArray(event.music_genre) ? event.music_genre : event.music_genre.split(',')).map((genre, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                                className: "bg-blue-600/20 text-blue-300 text-xs px-2 py-0.5 hover:bg-blue-600/30 border border-blue-500/30",
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                                                                        className: "w-2.5 h-2.5 mr-1"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                                        lineNumber: 449,
                                                                                                        columnNumber: 39
                                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                                    typeof genre === 'string' ? genre.trim() : genre
                                                                                                ]
                                                                                            }, idx, true, {
                                                                                                fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                                lineNumber: 445,
                                                                                                columnNumber: 37
                                                                                            }, ("TURBOPACK compile-time value", void 0)))
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                        lineNumber: 443,
                                                                                        columnNumber: 33
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                lineNumber: 441,
                                                                                columnNumber: 31
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                        lineNumber: 437,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                    lineNumber: 436,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                event.event_vibe && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mb-3",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-start gap-2.5",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "p-1.5 rounded-lg bg-pink-600/20",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                                                    className: "h-4 w-4 text-pink-400"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                    lineNumber: 464,
                                                                                    columnNumber: 29
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                lineNumber: 463,
                                                                                columnNumber: 27
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex-1",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "text-xs font-semibold text-white mb-1.5",
                                                                                        children: "Vibe"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                        lineNumber: 467,
                                                                                        columnNumber: 29
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex flex-wrap gap-1.5",
                                                                                        children: (Array.isArray(event.event_vibe) ? event.event_vibe.flatMap((v)=>v.split('|').map((tag)=>tag.trim())) : event.event_vibe.split('|').map((tag)=>tag.trim())).map((vibe, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                                className: "bg-pink-600/20 text-pink-300 text-xs px-2 py-0.5 hover:bg-pink-600/30 border border-pink-500/30",
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                                                                        className: "w-2.5 h-2.5 mr-1"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                                        lineNumber: 474,
                                                                                                        columnNumber: 35
                                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                                    vibe
                                                                                                ]
                                                                                            }, idx, true, {
                                                                                                fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                                lineNumber: 470,
                                                                                                columnNumber: 33
                                                                                            }, ("TURBOPACK compile-time value", void 0)))
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                        lineNumber: 468,
                                                                                        columnNumber: 29
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                lineNumber: 466,
                                                                                columnNumber: 27
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                        lineNumber: 462,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                    lineNumber: 461,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
                                                                    className: "bg-slate-600 my-3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                    lineNumber: 484,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "space-y-3",
                                                                    children: [
                                                                        event.ticket_price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-start gap-2.5",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "p-1.5 rounded-lg bg-green-600/20",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-sm font-bold text-green-400",
                                                                                        children: "AED"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                        lineNumber: 491,
                                                                                        columnNumber: 29
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                    lineNumber: 490,
                                                                                    columnNumber: 27
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex-1",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            className: "text-xs font-semibold text-white mb-1.5",
                                                                                            children: "Pricing"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                            lineNumber: 494,
                                                                                            columnNumber: 29
                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            className: "text-sm font-medium text-green-300",
                                                                                            children: event.ticket_price
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                            lineNumber: 495,
                                                                                            columnNumber: 29
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                    lineNumber: 493,
                                                                                    columnNumber: 27
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                            lineNumber: 489,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        event.special_offers && event.special_offers !== 'No special offers mentioned' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-start gap-2.5",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "p-1.5 rounded-lg bg-yellow-600/20",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__["Gift"], {
                                                                                        className: "h-4 w-4 text-yellow-400"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                        lineNumber: 503,
                                                                                        columnNumber: 29
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                    lineNumber: 502,
                                                                                    columnNumber: 27
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex-1",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            className: "text-xs font-semibold text-white mb-1.5",
                                                                                            children: "Special Offers"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                            lineNumber: 506,
                                                                                            columnNumber: 29
                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            className: "text-sm text-yellow-300 leading-relaxed",
                                                                                            children: event.special_offers
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                            lineNumber: 507,
                                                                                            columnNumber: 29
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                    lineNumber: 505,
                                                                                    columnNumber: 27
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                            lineNumber: 501,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                    lineNumber: 487,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                (event.website_social || event.instagram_id) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
                                                                            className: "bg-slate-700"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                            lineNumber: 516,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-1",
                                                                            children: event.website_social && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center gap-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                                                                        className: "h-4 w-4 text-blue-400"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                        lineNumber: 520,
                                                                                        columnNumber: 31
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                className: "text-xs text-slate-400",
                                                                                                children: "Contact"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                                lineNumber: 522,
                                                                                                columnNumber: 33
                                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                className: "text-sm text-blue-300",
                                                                                                children: event.website_social
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                                lineNumber: 523,
                                                                                                columnNumber: 33
                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                        lineNumber: 521,
                                                                                        columnNumber: 31
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                lineNumber: 519,
                                                                                columnNumber: 29
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                            lineNumber: 517,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true),
                                                                event.analysis_notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
                                                                            className: "bg-slate-700"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                            lineNumber: 535,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-start gap-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                                                                                    className: "h-4 w-4 text-orange-400 mt-0.5"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                    lineNumber: 537,
                                                                                    columnNumber: 27
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            className: "text-xs text-slate-400 mb-1",
                                                                                            children: "Analysis Notes"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                            lineNumber: 539,
                                                                                            columnNumber: 29
                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            className: "text-xs text-slate-300 leading-relaxed opacity-75",
                                                                                            children: event.analysis_notes.length > 150 ? "".concat(event.analysis_notes.substring(0, 150), "...") : event.analysis_notes
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                            lineNumber: 540,
                                                                                            columnNumber: 29
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                                    lineNumber: 538,
                                                                                    columnNumber: 27
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                            lineNumber: 536,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                            lineNumber: 408,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, "".concat(event.id, "-").concat(index), true, {
                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                    lineNumber: 370,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0));
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                            lineNumber: 368,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        venue && (venue.address || venue.phone || venue.website) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pt-6 border-t border-slate-600",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 mb-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                                            className: "h-5 w-5 text-blue-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                            lineNumber: 561,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "font-semibold text-lg text-white",
                                                            children: "Contact"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                            lineNumber: 562,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                    lineNumber: 560,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-3",
                                                    children: [
                                                        venue.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "p-2 rounded-lg bg-blue-600/20",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                                        className: "h-4 w-4 text-blue-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                        lineNumber: 568,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                    lineNumber: 567,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm text-slate-300 font-medium",
                                                                    children: venue.phone
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                    lineNumber: 570,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                            lineNumber: 566,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        venue.address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-start gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "p-2 rounded-lg bg-green-600/20",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                                        className: "h-4 w-4 text-green-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                        lineNumber: 576,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                    lineNumber: 575,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm text-slate-300 leading-relaxed",
                                                                    children: venue.address
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                    lineNumber: 578,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                            lineNumber: 574,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        venue.website && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: "outline",
                                                            className: "w-full mt-3 border-blue-500/50 text-blue-400 hover:bg-blue-500/20 hover:border-blue-400 bg-blue-500/10",
                                                            asChild: true,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: venue.website,
                                                                target: "_blank",
                                                                rel: "noopener noreferrer",
                                                                className: "flex items-center justify-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                        lineNumber: 588,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    "Visit Website"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                                lineNumber: 587,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                            lineNumber: 582,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                                    lineNumber: 564,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                            lineNumber: 559,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                                    lineNumber: 294,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                            lineNumber: 207,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                    lineNumber: 137,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/venue/VenueDetailsSidebar.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
_s(VenueDetailsSidebar, "buz3W8xE8l2fsYEehbcCy2JIwDM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvents"]
    ];
});
_c = VenueDetailsSidebar;
const __TURBOPACK__default__export__ = VenueDetailsSidebar;
var _c;
__turbopack_context__.k.register(_c, "VenueDetailsSidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/contexts/ThemeContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function ThemeProvider(param) {
    let { children } = param;
    _s();
    const [isDarkMode, setIsDarkMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Load theme preference from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                setIsDarkMode(true);
            }
        }
    }["ThemeProvider.useEffect"], []);
    // Apply theme to document and save to localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            if (isDarkMode) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        }
    }["ThemeProvider.useEffect"], [
        isDarkMode
    ]);
    const toggleTheme = ()=>{
        setIsDarkMode(!isDarkMode);
    };
    const contextValue = {
        isDarkMode,
        toggleTheme
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: contextValue,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/ThemeContext.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_s(ThemeProvider, "jZSDCHM8qUYa7sOOCe+CR2toAGQ=");
_c = ThemeProvider;
function useTheme() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
_s1(useTheme, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/venue/VenueFloatingPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/music.js [app-client] (ecmascript) <export default as Music>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript) <export default as Instagram>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/tag.js [app-client] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useEvents.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$ThemeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/ThemeContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
// Convert hierarchical filter state to flat filter state for API calls
function convertHierarchicalToFlat(hierarchicalState) {
    if (!hierarchicalState) {
        return {
            selectedAreas: [],
            activeVibes: [],
            activeDates: [],
            activeGenres: [],
            activeOffers: [],
            searchQuery: ''
        };
    }
    const allActiveGenres = [];
    const allActiveVibes = [];
    // Process genres
    hierarchicalState.selectedPrimaries.genres.forEach((primary)=>{
        var _hierarchicalState_selectedSecondaries_genres;
        const secondaries = ((_hierarchicalState_selectedSecondaries_genres = hierarchicalState.selectedSecondaries.genres) === null || _hierarchicalState_selectedSecondaries_genres === void 0 ? void 0 : _hierarchicalState_selectedSecondaries_genres[primary]) || [];
        if (secondaries.length > 0) {
            allActiveGenres.push(...secondaries);
        } else {
            allActiveGenres.push(primary);
        }
    });
    // Process vibes
    hierarchicalState.selectedPrimaries.vibes.forEach((primary)=>{
        var _hierarchicalState_selectedSecondaries_vibes;
        const secondaries = ((_hierarchicalState_selectedSecondaries_vibes = hierarchicalState.selectedSecondaries.vibes) === null || _hierarchicalState_selectedSecondaries_vibes === void 0 ? void 0 : _hierarchicalState_selectedSecondaries_vibes[primary]) || [];
        if (secondaries.length > 0) {
            allActiveVibes.push(...secondaries);
        } else {
            allActiveVibes.push(primary);
        }
    });
    return {
        selectedAreas: hierarchicalState.selectedAreas,
        activeVibes: allActiveVibes,
        activeDates: hierarchicalState.activeDates,
        activeGenres: allActiveGenres,
        activeOffers: hierarchicalState.activeOffers,
        searchQuery: hierarchicalState.searchQuery
    };
}
const VenueFloatingPanel = (param)=>{
    let { venue, isOpen, onClose, filters, stories = [], onViewDetails, onFiltersChange } = param;
    _s();
    // Get theme context
    const { isDarkMode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$ThemeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    // Convert hierarchical filters to flat for API call
    const flatFilters = convertHierarchicalToFlat(filters);
    // Fetch real event data for this venue with applied filters (now with caching!)
    // NOTE: Don't pass dates filter here - we want ALL dates to show in the date buttons
    // Only fetch when panel is actually open to avoid duplicate API calls
    const { events, isLoading: eventsLoading, error: eventsError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvents"])({
        venue_name: (venue === null || venue === void 0 ? void 0 : venue.name) || '',
        limit: 50,
        genres: flatFilters.activeGenres || [],
        vibes: flatFilters.activeVibes || [],
        offers: flatFilters.activeOffers || [],
        enabled: isOpen && !!(venue === null || venue === void 0 ? void 0 : venue.name // Only fetch when panel is open and has a venue
        )
    });
    // Group events by date
    const eventsByDate = events.reduce((acc, event)=>{
        const dateKey = new Date(event.event_date).toDateString();
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(event);
        return acc;
    }, {});
    const uniqueDates = Object.keys(eventsByDate).sort((a, b)=>new Date(a).getTime() - new Date(b).getTime());
    // State for selected date (default to first date)
    const [selectedDateKey, setSelectedDateKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(uniqueDates[0] || '');
    // Update selected date when events change
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "VenueFloatingPanel.useEffect": ()=>{
            if (uniqueDates.length > 0 && !uniqueDates.includes(selectedDateKey)) {
                setSelectedDateKey(uniqueDates[0]);
            }
        }
    }["VenueFloatingPanel.useEffect"], [
        uniqueDates,
        selectedDateKey
    ]);
    const selectedDateEvents = selectedDateKey ? eventsByDate[selectedDateKey] || [] : [];
    const hasLiveStories = stories.length > 0;
    // Get unique dates from all events for the right panel display
    const uniqueEventDates = uniqueDates.map((dateKey)=>{
        const eventsForDate = eventsByDate[dateKey] || [];
        if (eventsForDate.length > 0) {
            return {
                date: new Date(eventsForDate[0].event_date),
                dateKey: dateKey
            };
        }
        return null;
    }).filter((date)=>date !== null).sort((a, b)=>a.date.getTime() - b.date.getTime());
    // State for single selected date in right panel
    const [selectedRightPanelDates, setSelectedRightPanelDates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(uniqueEventDates.length > 0 ? [
        uniqueEventDates[0].dateKey
    ] : []);
    // Update selected right panel dates when events change
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "VenueFloatingPanel.useEffect": ()=>{
            if (uniqueEventDates.length > 0) {
                // Filter out any selected dates that no longer exist
                const validSelectedDates = selectedRightPanelDates.filter({
                    "VenueFloatingPanel.useEffect.validSelectedDates": (dateKey)=>uniqueEventDates.find({
                            "VenueFloatingPanel.useEffect.validSelectedDates": (d)=>d.dateKey === dateKey
                        }["VenueFloatingPanel.useEffect.validSelectedDates"])
                }["VenueFloatingPanel.useEffect.validSelectedDates"]);
                // If no valid dates remain, select the first available date
                if (validSelectedDates.length === 0) {
                    setSelectedRightPanelDates([
                        uniqueEventDates[0].dateKey
                    ]);
                } else if (validSelectedDates.length !== selectedRightPanelDates.length) {
                    setSelectedRightPanelDates(validSelectedDates);
                }
            }
        }
    }["VenueFloatingPanel.useEffect"], [
        uniqueEventDates,
        selectedRightPanelDates
    ]);
    // Get events for all selected dates in right panel
    const selectedRightPanelEvents = selectedRightPanelDates.flatMap((dateKey)=>eventsByDate[dateKey] || []).sort((a, b)=>new Date(a.event_date).getTime() - new Date(b.event_date).getTime());
    if (!venue) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "d1e1d09fdfc6c76b",
                children: ".hide-scrollbar.jsx-d1e1d09fdfc6c76b::-webkit-scrollbar{display:none}"
            }, void 0, false, void 0, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            exit: {
                                opacity: 0
                            },
                            transition: {
                                duration: 0.3
                            },
                            className: "fixed inset-0 z-50 backdrop-blur-lg relative\n                       before:absolute before:inset-0 before:pointer-events-none\n                       ".concat(isDarkMode ? 'bg-gray-900/40 before:bg-gradient-to-br before:from-gray-900/30 before:to-gray-800/20' : 'bg-black/30 before:bg-gradient-to-br before:from-black/20 before:to-black/10')
                        }, void 0, false, {
                            fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                            lineNumber: 177,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                y: '100%',
                                opacity: 0
                            },
                            animate: {
                                y: 0,
                                opacity: 1
                            },
                            exit: {
                                y: '100%',
                                opacity: 0
                            },
                            transition: {
                                type: 'spring',
                                damping: 25,
                                stiffness: 300,
                                duration: 0.3
                            },
                            className: "fixed bottom-4 left-2 right-2 z-60 max-w-2xl mx-auto h-[38.5vh]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-d1e1d09fdfc6c76b" + " " + "backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden h-full relative\n                           before:absolute before:inset-0 before:pointer-events-none before:rounded-2xl\n                           after:absolute after:inset-0 after:pointer-events-none after:rounded-2xl\n                           ".concat(isDarkMode ? 'bg-gray-900/60 border border-gray-700/50 before:bg-gradient-to-br before:from-gray-800/30 before:to-gray-900/10 after:bg-gradient-to-t after:from-transparent after:via-gray-800/5 after:to-gray-700/10' : 'bg-white/30 border border-white/40 before:bg-gradient-to-br before:from-white/20 before:to-white/5 after:bg-gradient-to-t after:from-transparent after:via-white/5 after:to-white/10'),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-d1e1d09fdfc6c76b" + " " + "flex h-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-d1e1d09fdfc6c76b" + " " + "flex-1 w-4/5 flex flex-col p-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-d1e1d09fdfc6c76b" + " " + "flex items-center gap-3 mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-d1e1d09fdfc6c76b" + " " + "flex items-center gap-1.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                                    className: "h-5 w-5 text-amber-600 fill-amber-600"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                    lineNumber: 221,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "jsx-d1e1d09fdfc6c76b" + " " + "text-base font-semibold ".concat(isDarkMode ? 'text-amber-400' : 'text-amber-700'),
                                                                    children: venue.rating ? venue.rating.toFixed(1) : '4.5'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                    lineNumber: 222,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "jsx-d1e1d09fdfc6c76b" + " " + "text-sm ".concat(isDarkMode ? 'text-gray-400' : 'text-gray-500'),
                                                                    children: [
                                                                        "(",
                                                                        venue.rating_count || '120',
                                                                        ")"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                    lineNumber: 225,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                            lineNumber: 220,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "jsx-d1e1d09fdfc6c76b" + " " + "text-lg font-bold leading-tight line-clamp-2 ".concat(isDarkMode ? 'text-white' : 'text-gray-900'),
                                                            children: venue.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                            lineNumber: 231,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        hasLiveStories && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                            className: "bg-red-500/90 text-white animate-pulse border-red-400/50",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "jsx-d1e1d09fdfc6c76b" + " " + "w-2 h-2 bg-red-400 rounded-full mr-1.5 animate-pulse"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                    lineNumber: 236,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                stories.length,
                                                                " Live"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                            lineNumber: 235,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                    lineNumber: 218,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-d1e1d09fdfc6c76b" + " " + "flex-1 overflow-hidden",
                                                    children: eventsLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-d1e1d09fdfc6c76b" + " " + "text-sm text-center py-2 ".concat(isDarkMode ? 'text-gray-300' : 'text-gray-600'),
                                                        children: "Loading events..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                        lineNumber: 245,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)) : selectedRightPanelEvents.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: selectedRightPanelEvents.length === 1 ? /* Single Event */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-d1e1d09fdfc6c76b" + " " + "w-full h-full",
                                                            children: selectedRightPanelEvents.map((event, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-d1e1d09fdfc6c76b" + " " + "backdrop-blur-sm rounded-lg p-3 w-full h-full relative before:absolute before:inset-0 before:pointer-events-none before:rounded-lg\n                                   ".concat(isDarkMode ? 'bg-gray-800/60 border border-gray-600/30 before:bg-gradient-to-br before:from-gray-700/10 before:to-gray-800/20' : 'bg-white/60 border border-gray-300/30 before:bg-gradient-to-br before:from-white/10 before:to-gray-100/20'),
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "jsx-d1e1d09fdfc6c76b" + " " + "flex flex-col h-full",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "jsx-d1e1d09fdfc6c76b" + " " + "flex-1",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                                                    className: "jsx-d1e1d09fdfc6c76b" + " " + "font-bold text-base mb-2 line-clamp-2 leading-tight ".concat(isDarkMode ? 'text-white' : 'text-gray-900'),
                                                                                    children: event.artist || event.event_name
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                                    lineNumber: 261,
                                                                                    columnNumber: 37
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                event.event_name && event.artist && event.event_name !== event.artist && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "jsx-d1e1d09fdfc6c76b" + " " + "text-sm mb-2 line-clamp-2 leading-tight ".concat(isDarkMode ? 'text-gray-300' : 'text-gray-700'),
                                                                                    children: event.event_name
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                                    lineNumber: 267,
                                                                                    columnNumber: 39
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                event.event_vibe && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "jsx-d1e1d09fdfc6c76b" + " " + "flex items-start gap-2 text-sm text-purple-600 mb-1",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                                                            className: "h-4 w-4 flex-shrink-0 mt-0.5"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                                            lineNumber: 273,
                                                                                            columnNumber: 41
                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "jsx-d1e1d09fdfc6c76b" + " " + "line-clamp-2 leading-tight",
                                                                                            children: event.event_vibe
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                                            lineNumber: 274,
                                                                                            columnNumber: 41
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                                    lineNumber: 272,
                                                                                    columnNumber: 39
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                event.music_genre && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "jsx-d1e1d09fdfc6c76b" + " " + "flex items-start gap-2 text-sm text-blue-600 mb-1",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__["Music"], {
                                                                                            className: "h-4 w-4 flex-shrink-0 mt-0.5"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                                            lineNumber: 281,
                                                                                            columnNumber: 41
                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "jsx-d1e1d09fdfc6c76b" + " " + "line-clamp-2 leading-tight",
                                                                                            children: event.music_genre
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                                            lineNumber: 282,
                                                                                            columnNumber: 41
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                                    lineNumber: 280,
                                                                                    columnNumber: 39
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                event.special_offers && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "jsx-d1e1d09fdfc6c76b" + " " + "flex items-start gap-2 text-sm text-green-600 mb-1",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                                                            className: "h-4 w-4 flex-shrink-0 mt-0.5"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                                            lineNumber: 289,
                                                                                            columnNumber: 41
                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "jsx-d1e1d09fdfc6c76b" + " " + "line-clamp-1 leading-tight",
                                                                                            children: event.special_offers
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                                            lineNumber: 290,
                                                                                            columnNumber: 41
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                                    lineNumber: 288,
                                                                                    columnNumber: 39
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                event.ticket_price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "jsx-d1e1d09fdfc6c76b" + " " + "flex items-start gap-2 text-sm text-orange-600 mb-1",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "jsx-d1e1d09fdfc6c76b" + " " + "font-semibold flex-shrink-0 mt-0.5",
                                                                                            children: "AED"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                                            lineNumber: 297,
                                                                                            columnNumber: 41
                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "jsx-d1e1d09fdfc6c76b" + " " + "line-clamp-1 leading-tight",
                                                                                            children: event.ticket_price
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                                            lineNumber: 298,
                                                                                            columnNumber: 41
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                                    lineNumber: 296,
                                                                                    columnNumber: 39
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                            lineNumber: 259,
                                                                            columnNumber: 35
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                        lineNumber: 258,
                                                                        columnNumber: 33
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, "".concat(event.id, "-").concat(event.event_date, "-").concat(index), false, {
                                                                    fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                    lineNumber: 253,
                                                                    columnNumber: 31
                                                                }, ("TURBOPACK compile-time value", void 0)))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                            lineNumber: 251,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0)) : /* Multiple Events - Vertical List */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-d1e1d09fdfc6c76b" + " " + "w-full h-full overflow-y-auto",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-d1e1d09fdfc6c76b" + " " + "space-y-2",
                                                                children: selectedRightPanelEvents.map((event, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "jsx-d1e1d09fdfc6c76b" + " " + "backdrop-blur-sm rounded-lg p-3 w-full relative before:absolute before:inset-0 before:pointer-events-none before:rounded-lg\n                                     ".concat(isDarkMode ? 'bg-gray-800/60 border border-gray-600/30 before:bg-gradient-to-br before:from-gray-700/10 before:to-gray-800/20' : 'bg-white/60 border border-gray-300/30 before:bg-gradient-to-br before:from-white/10 before:to-gray-100/20'),
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "jsx-d1e1d09fdfc6c76b" + " " + "flex flex-col",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                                                    className: "jsx-d1e1d09fdfc6c76b" + " " + "font-bold text-base mb-2 line-clamp-2 leading-tight ".concat(isDarkMode ? 'text-white' : 'text-gray-900'),
                                                                                    children: event.artist || event.event_name
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                                    lineNumber: 318,
                                                                                    columnNumber: 37
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                event.event_name && event.artist && event.event_name !== event.artist && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "jsx-d1e1d09fdfc6c76b" + " " + "text-sm mb-2 line-clamp-2 leading-tight ".concat(isDarkMode ? 'text-gray-300' : 'text-gray-700'),
                                                                                    children: event.event_name
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                                    lineNumber: 324,
                                                                                    columnNumber: 39
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                event.event_vibe && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "jsx-d1e1d09fdfc6c76b" + " " + "flex items-start gap-2 text-sm text-purple-600 mb-1",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                                                            className: "h-4 w-4 flex-shrink-0 mt-0.5"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                                            lineNumber: 330,
                                                                                            columnNumber: 41
                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "jsx-d1e1d09fdfc6c76b" + " " + "line-clamp-2 leading-tight",
                                                                                            children: event.event_vibe
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                                            lineNumber: 331,
                                                                                            columnNumber: 41
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                                    lineNumber: 329,
                                                                                    columnNumber: 39
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                event.music_genre && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "jsx-d1e1d09fdfc6c76b" + " " + "flex items-start gap-2 text-sm text-blue-600 mb-1",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__["Music"], {
                                                                                            className: "h-4 w-4 flex-shrink-0 mt-0.5"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                                            lineNumber: 338,
                                                                                            columnNumber: 41
                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "jsx-d1e1d09fdfc6c76b" + " " + "line-clamp-2 leading-tight",
                                                                                            children: event.music_genre
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                                            lineNumber: 339,
                                                                                            columnNumber: 41
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                                    lineNumber: 337,
                                                                                    columnNumber: 39
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                event.special_offers && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "jsx-d1e1d09fdfc6c76b" + " " + "flex items-start gap-2 text-sm text-green-600 mb-1",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                                                            className: "h-4 w-4 flex-shrink-0 mt-0.5"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                                            lineNumber: 346,
                                                                                            columnNumber: 41
                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "jsx-d1e1d09fdfc6c76b" + " " + "line-clamp-1 leading-tight",
                                                                                            children: event.special_offers
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                                            lineNumber: 347,
                                                                                            columnNumber: 41
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                                    lineNumber: 345,
                                                                                    columnNumber: 39
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                event.ticket_price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "jsx-d1e1d09fdfc6c76b" + " " + "flex items-start gap-2 text-sm text-orange-600 mb-1",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "jsx-d1e1d09fdfc6c76b" + " " + "font-semibold flex-shrink-0 mt-0.5",
                                                                                            children: "AED"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                                            lineNumber: 354,
                                                                                            columnNumber: 41
                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "jsx-d1e1d09fdfc6c76b" + " " + "line-clamp-1 leading-tight",
                                                                                            children: event.ticket_price
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                                            lineNumber: 355,
                                                                                            columnNumber: 41
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                                    lineNumber: 353,
                                                                                    columnNumber: 39
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                            lineNumber: 316,
                                                                            columnNumber: 35
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, "".concat(event.id, "-").concat(event.event_date, "-").concat(index), false, {
                                                                        fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                        lineNumber: 311,
                                                                        columnNumber: 33
                                                                    }, ("TURBOPACK compile-time value", void 0)))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                lineNumber: 309,
                                                                columnNumber: 29
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                            lineNumber: 308,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-d1e1d09fdfc6c76b" + " " + "text-sm text-center py-2 ".concat(isDarkMode ? 'text-gray-300' : 'text-gray-600'),
                                                        children: "No events found"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                        lineNumber: 366,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                    lineNumber: 243,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                            lineNumber: 215,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-d1e1d09fdfc6c76b" + " " + "w-1/5 flex flex-col p-3 border-l ".concat(isDarkMode ? 'border-gray-600/30' : 'border-white/20'),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-d1e1d09fdfc6c76b" + " " + "flex justify-center",
                                                    children: (venue === null || venue === void 0 ? void 0 : venue.final_instagram) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "https://instagram.com/".concat(venue.final_instagram),
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        title: "Instagram",
                                                        className: "jsx-d1e1d09fdfc6c76b" + " " + "p-3 rounded-full bg-gray-800/90 hover:bg-gray-900 transition-colors",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"], {
                                                            className: "w-6 h-6 text-white"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                            lineNumber: 384,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                        lineNumber: 377,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                    lineNumber: 375,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-d1e1d09fdfc6c76b" + " " + "flex-1 flex items-center justify-center",
                                                    children: uniqueEventDates.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-d1e1d09fdfc6c76b" + " " + "w-full max-w-[80px] h-24",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                scrollbarWidth: 'none',
                                                                msOverflowStyle: 'none'
                                                            },
                                                            className: "jsx-d1e1d09fdfc6c76b" + " " + "h-full overflow-y-auto flex flex-col gap-1 items-center py-1 hide-scrollbar",
                                                            children: uniqueEventDates.map((dateObj, index)=>{
                                                                const isSelected = selectedRightPanelDates.includes(dateObj.dateKey);
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>{
                                                                        // Single date selection - LOCAL FILTERING ONLY
                                                                        // Just update local state to filter which events are shown
                                                                        // Don't propagate to parent to avoid refetching and losing other dates
                                                                        setSelectedRightPanelDates([
                                                                            dateObj.dateKey
                                                                        ]);
                                                                    },
                                                                    className: "jsx-d1e1d09fdfc6c76b" + " " + "px-2 py-1 rounded-full text-xs whitespace-nowrap flex-shrink-0 transition-colors ".concat(isSelected ? 'bg-blue-600 text-white' : 'bg-gray-400/60 text-white hover:bg-gray-500/80'),
                                                                    children: dateObj.date.toLocaleDateString('en-US', {
                                                                        month: 'short',
                                                                        day: 'numeric'
                                                                    })
                                                                }, "date-".concat(index), false, {
                                                                    fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                                    lineNumber: 403,
                                                                    columnNumber: 31
                                                                }, ("TURBOPACK compile-time value", void 0));
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                            lineNumber: 394,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                        lineNumber: 392,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                    lineNumber: 390,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-d1e1d09fdfc6c76b" + " " + "flex justify-center mt-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: onViewDetails,
                                                        title: "View Details",
                                                        className: "jsx-d1e1d09fdfc6c76b" + " " + "p-3 rounded-full bg-gray-800/90 hover:bg-gray-900 transition-colors",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                            className: "w-6 h-6 text-white"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                            lineNumber: 437,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                        lineNumber: 432,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                                    lineNumber: 431,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                            lineNumber: 372,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                    lineNumber: 212,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                                lineNumber: 203,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                            lineNumber: 191,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/src/components/venue/VenueFloatingPanel.tsx",
                lineNumber: 173,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
_s(VenueFloatingPanel, "cjFIgQMqRgdpUNqJAuFaeLyvfx0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$ThemeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvents"]
    ];
});
_c = VenueFloatingPanel;
const __TURBOPACK__default__export__ = VenueFloatingPanel;
var _c;
__turbopack_context__.k.register(_c, "VenueFloatingPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useFilterOptions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFilterOptions",
    ()=>useFilterOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
function useFilterOptions() {
    _s();
    const [filterOptions, setFilterOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        areas: [],
        dates: [],
        hierarchicalGenres: {},
        hierarchicalVibes: {},
        vibes: [],
        genres: []
    });
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useFilterOptions.useEffect": ()=>{
            const fetchAllFilterOptions = {
                "useFilterOptions.useEffect.fetchAllFilterOptions": async ()=>{
                    try {
                        setIsLoading(true);
                        setError(null);
                        console.log('🔄 Fetching ALL filter options (one-time load)');
                        const response = await fetch('/api/filter-options', {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Cache-Control': 'no-cache'
                            }
                        });
                        if (!response.ok) {
                            throw new Error("HTTP error! status: ".concat(response.status));
                        }
                        const result = await response.json();
                        if (result.success && result.data) {
                            setFilterOptions(result.data);
                            setError(null);
                            console.log('✅ Loaded all filter options for client-side filtering');
                        } else {
                            const errorMsg = result.error || 'Invalid response format';
                            setError(errorMsg);
                        }
                    } catch (err) {
                        const errorMsg = err instanceof Error ? err.message : 'Network error occurred';
                        setError(errorMsg);
                        console.error('Error fetching filter options:', err);
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["useFilterOptions.useEffect.fetchAllFilterOptions"];
            fetchAllFilterOptions();
        }
    }["useFilterOptions.useEffect"], []); // Only load once on mount
    return {
        filterOptions,
        isLoading,
        error
    };
}
_s(useFilterOptions, "6paPSM7tGHR9J44JUJTylsT+b0s=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/map/MapContainer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$google$2d$maps$2f$api$2f$dist$2f$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-google-maps/api/dist/esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js [app-client] (ecmascript) <export default as SlidersHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$maps$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/maps-config.ts [app-client] (ecmascript)");
// Removed VenueClusterComponent import
// import HorizontalNav from '@/components/navigation/HorizontalNav'; // Disabled - needs update to HierarchicalFilterState
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$navigation$2f$TopNav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/navigation/TopNav.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$filters$2f$HierarchicalFilterContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/filters/HierarchicalFilterContainer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$venue$2f$VenueDetailsSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/venue/VenueDetailsSidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$venue$2f$VenueFloatingPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/venue/VenueFloatingPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFilterOptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useFilterOptions.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
const MapContainer = (param)=>{
    let { initialCenter, initialZoom = 12, venues = [], onVenueSelect, filters, isLoading = false, onFiltersChange, 'data-testid': dataTestId } = param;
    var _filters_activeDates;
    _s();
    console.log('🚨 MAP CONTAINER RENDER - Component is rendering!');
    console.log('🚨 MAP CONTAINER RENDER - Filters:', filters);
    const handleHierarchicalFiltersChange = (hierarchicalFilters)=>{
        console.log('📍 HIERARCHICAL CHANGE - Handler called with:', hierarchicalFilters);
        onFiltersChange(hierarchicalFilters);
    };
    // Use useLoadScript to load Google Maps - MUST be at the top before any conditionals
    const { isLoaded, loadError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$google$2d$maps$2f$api$2f$dist$2f$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLoadScript"])({
        googleMapsApiKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$maps$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GOOGLE_MAPS_CONFIG"].apiKey,
        libraries: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$maps$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GOOGLE_MAPS_CONFIG"].libraries,
        language: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$maps$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GOOGLE_MAPS_CONFIG"].language,
        region: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$maps$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GOOGLE_MAPS_CONFIG"].region
    });
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const markersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const mapViewportRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        center: initialCenter || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$maps$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_OPTIONS"].center,
        zoom: initialZoom,
        isInitialized: false
    });
    const [selectedVenue, setSelectedVenue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSidebarOpen, setIsSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isFloatingPanelOpen, setIsFloatingPanelOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isFilterSheetOpen, setIsFilterSheetOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mapOptions, setMapOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Get filter options (loaded once, no parameters needed)
    const { filterOptions } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFilterOptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFilterOptions"])();
    // Clear all existing markers
    const clearMarkers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MapContainer.useCallback[clearMarkers]": ()=>{
            console.log('🧹 CLEARING MARKERS - Removing', markersRef.current.length, 'existing markers');
            markersRef.current.forEach({
                "MapContainer.useCallback[clearMarkers]": (marker)=>{
                    marker.setMap(null);
                }
            }["MapContainer.useCallback[clearMarkers]"]);
            markersRef.current = [];
            console.log('✅ All markers cleared');
        }
    }["MapContainer.useCallback[clearMarkers]"], []);
    const handleVenueClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MapContainer.useCallback[handleVenueClick]": (venue)=>{
            console.log('🚀 MAP CONTAINER - handleVenueClick called with:', venue.name);
            console.log('🚀 MAP CONTAINER - Setting selectedVenue to:', venue);
            setSelectedVenue(venue);
            onVenueSelect(venue);
            console.log('🚀 MAP CONTAINER - Opening floating panel...');
            setIsFloatingPanelOpen(true);
            console.log('🚀 MAP CONTAINER - Floating panel opened - COMPLETE');
        }
    }["MapContainer.useCallback[handleVenueClick]"], [
        onVenueSelect
    ]);
    const onMapLoad = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MapContainer.useCallback[onMapLoad]": (map)=>{
            var _map_getCenter;
            console.log('🚀 === MAP LOAD START ===');
            console.log('🗺️ Map object:', map);
            console.log('🗺️ Venues received:', venues);
            console.log('🗺️ Venues count:', venues.length);
            console.log('🗺️ Venues array type:', typeof venues);
            console.log('🗺️ Venues is array:', Array.isArray(venues));
            console.log('🗺️ isLoading state:', isLoading);
            mapRef.current = map;
            // Store initial viewport and mark as initialized
            mapViewportRef.current = {
                center: ((_map_getCenter = map.getCenter()) === null || _map_getCenter === void 0 ? void 0 : _map_getCenter.toJSON()) || mapViewportRef.current.center,
                zoom: map.getZoom() || mapViewportRef.current.zoom,
                isInitialized: true
            };
            console.log('🗺️ Initial map center:', mapViewportRef.current.center);
            console.log('🗺️ Initial map zoom:', mapViewportRef.current.zoom);
            // Add viewport tracking listeners to preserve user's position
            map.addListener('center_changed', {
                "MapContainer.useCallback[onMapLoad]": ()=>{
                    var _map_getCenter;
                    const newCenter = (_map_getCenter = map.getCenter()) === null || _map_getCenter === void 0 ? void 0 : _map_getCenter.toJSON();
                    if (newCenter) {
                        mapViewportRef.current.center = newCenter;
                    }
                }
            }["MapContainer.useCallback[onMapLoad]"]);
            map.addListener('zoom_changed', {
                "MapContainer.useCallback[onMapLoad]": ()=>{
                    const newZoom = map.getZoom();
                    if (newZoom !== undefined) {
                        mapViewportRef.current.zoom = newZoom;
                    }
                }
            }["MapContainer.useCallback[onMapLoad]"]);
            try {
                // Use the React Google Maps map instance - now with viewport preservation
                const directMap = map;
                console.log('🗺️ MAP LOADED successfully with viewport tracking');
                console.log('🗺️ Viewport preserved - zoom:', mapViewportRef.current.zoom, 'center:', mapViewportRef.current.center);
                console.log("🗺️ Number of venues to render: ".concat(venues.length));
                // Global InfoWindow instance to prevent multiple windows and auto-panning issues
                let currentInfoWindow = null;
                // Create individual markers without clustering
                const validVenues = venues.filter({
                    "MapContainer.useCallback[onMapLoad].validVenues": (venue)=>venue.lat && venue.lng
                }["MapContainer.useCallback[onMapLoad].validVenues"]);
                console.log("🗺️ TOTAL VENUES: ".concat(venues.length, ", VALID VENUES: ").concat(validVenues.length));
                // Log each venue's details
                venues.forEach({
                    "MapContainer.useCallback[onMapLoad]": (venue, i)=>{
                        console.log("📍 Venue ".concat(i + 1, ":"), {
                            id: venue.venue_id,
                            name: venue.name,
                            lat: venue.lat,
                            lng: venue.lng,
                            hasCoords: !!(venue.lat && venue.lng)
                        });
                    }
                }["MapContainer.useCallback[onMapLoad]"]);
                if (validVenues.length === 0) {
                    console.error('❌ NO VALID VENUES FOUND - no markers will be created!');
                    return;
                }
                validVenues.forEach({
                    "MapContainer.useCallback[onMapLoad]": (venue, i)=>{
                        console.log("🎯 === CREATING MARKER ".concat(i + 1, " ==="));
                        console.log("🎯 Venue: ".concat(venue.name));
                        console.log("🎯 Position: lat=".concat(venue.lat, ", lng=").concat(venue.lng));
                        // Smart category-based color mapping
                        const getCategoryColor = {
                            "MapContainer.useCallback[onMapLoad].getCategoryColor": (category)=>{
                                const lowerCategory = category.toLowerCase();
                                if (lowerCategory.includes('bar') && (lowerCategory.includes('sports') || lowerCategory.includes('pub'))) {
                                    return 'orange'; // Sports bars/pubs
                                } else if (lowerCategory.includes('lounge')) {
                                    return 'purple'; // Lounges
                                } else if (lowerCategory.includes('bar')) {
                                    return 'pink'; // Bars
                                } else if (lowerCategory.includes('beach') || lowerCategory.includes('club')) {
                                    return 'blue'; // Beach clubs
                                } else if (lowerCategory.includes('restaurant') || lowerCategory.includes('cafe')) {
                                    return 'green'; // Restaurants/cafes
                                } else if (lowerCategory.includes('hotel')) {
                                    return 'yellow'; // Hotels
                                } else {
                                    return 'red'; // Default/other
                                }
                            }
                        }["MapContainer.useCallback[onMapLoad].getCategoryColor"];
                        const categoryColor = getCategoryColor(venue.category || '');
                        console.log("🎯 Venue: ".concat(venue.name, ", Category: ").concat(venue.category, ", Color: ").concat(categoryColor));
                        try {
                            var _marker_getPosition;
                            // Create CUSTOM COLORED marker based on category
                            console.log("🎨 Creating CUSTOM marker for ".concat(venue.name, " (").concat(categoryColor, ")"));
                            const marker = new google.maps.Marker({
                                position: {
                                    lat: venue.lat,
                                    lng: venue.lng
                                },
                                map: directMap,
                                title: venue.name,
                                icon: {
                                    url: "https://maps.google.com/mapfiles/ms/icons/".concat(categoryColor, "-dot.png"),
                                    scaledSize: new google.maps.Size(32, 32)
                                }
                            });
                            // Add marker to tracking array
                            markersRef.current.push(marker);
                            console.log("✅ Marker created successfully for ".concat(venue.name, ":"), (_marker_getPosition = marker.getPosition()) === null || _marker_getPosition === void 0 ? void 0 : _marker_getPosition.toJSON());
                            console.log("✅ Marker visible:", marker.getVisible());
                            console.log("✅ Marker map:", marker.getMap());
                            marker.addListener("click", {
                                "MapContainer.useCallback[onMapLoad]": (event)=>{
                                    console.log("🖱️ Marker clicked: ".concat(venue.name));
                                    // Prevent event bubbling that might cause map repositioning
                                    if (event) {
                                        var _event_stop;
                                        (_event_stop = event.stop) === null || _event_stop === void 0 ? void 0 : _event_stop.call(event);
                                    }
                                    // Close any existing InfoWindow first
                                    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                                    ;
                                    // Only trigger sidebar functionality - no InfoWindow popup
                                    handleVenueClick(venue);
                                }
                            }["MapContainer.useCallback[onMapLoad]"]);
                        } catch (markerError) {
                            console.error("❌ Error creating marker for ".concat(venue.name, ":"), markerError);
                        }
                    }
                }["MapContainer.useCallback[onMapLoad]"]);
                console.log("🎯 === MARKER CREATION COMPLETE ===");
                console.log("🗺️ Created ".concat(validVenues.length, " markers successfully"));
                // Check map bounds
                const bounds = map.getBounds();
                if (bounds) {
                    const ne = bounds.getNorthEast();
                    const sw = bounds.getSouthWest();
                    console.log("🗺️ Map bounds: NE(".concat(ne.lat(), ", ").concat(ne.lng(), ") SW(").concat(sw.lat(), ", ").concat(sw.lng(), ")"));
                    // Check if venues are within bounds
                    validVenues.forEach({
                        "MapContainer.useCallback[onMapLoad]": (venue)=>{
                            const inBounds = bounds.contains(new google.maps.LatLng(venue.lat, venue.lng));
                            console.log("📍 ".concat(venue.name, " in bounds: ").concat(inBounds));
                        }
                    }["MapContainer.useCallback[onMapLoad]"]);
                }
            } catch (error) {
                console.error('🚨 Error in onMapLoad:', error);
            }
            console.log('🚀 === MAP LOAD END ===');
        }
    }["MapContainer.useCallback[onMapLoad]"], [
        venues,
        initialZoom,
        initialCenter,
        handleVenueClick
    ]);
    // Update markers when venues change (this is the missing piece!)
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "MapContainer.useEffect": ()=>{
            console.log('🔄 VENUES EFFECT TRIGGERED - venues.length:', venues.length);
            console.log('🔄 VENUES EFFECT TRIGGERED - mapRef.current:', !!mapRef.current);
            if (!mapRef.current) {
                console.log('🔄 VENUES EFFECT - No map ref, skipping');
                return;
            }
            console.log('🔄 UPDATING MARKERS - Venues changed:', venues.length);
            console.log('🔄 UPDATING MARKERS - Venue names:', venues.map({
                "MapContainer.useEffect": (v)=>v.name
            }["MapContainer.useEffect"]));
            // Clear all existing markers first
            clearMarkers();
            // Then create new markers for current venues
            if (venues.length > 0) {
                console.log('🔄 UPDATING MARKERS - Calling onMapLoad to create new markers');
                onMapLoad(mapRef.current);
            } else {
                console.log('🔄 UPDATING MARKERS - No venues to display');
            }
        }
    }["MapContainer.useEffect"], [
        venues,
        onMapLoad,
        clearMarkers
    ]);
    const onMapUnmount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MapContainer.useCallback[onMapUnmount]": ()=>{
            mapRef.current = null;
        }
    }["MapContainer.useCallback[onMapUnmount]"], []);
    const handleSidebarClose = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MapContainer.useCallback[handleSidebarClose]": ()=>{
            setIsSidebarOpen(false);
            setSelectedVenue(null); // Clear selected venue when closing
            console.log('🚀 MAP CONTAINER - Sidebar closed, selectedVenue cleared');
            // DON'T reset map position - let it stay where user left it!
            console.log('🗺️ Preserving viewport:', mapViewportRef.current);
        }
    }["MapContainer.useCallback[handleSidebarClose]"], []);
    const handleFloatingPanelClose = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MapContainer.useCallback[handleFloatingPanelClose]": ()=>{
            setIsFloatingPanelOpen(false);
            setSelectedVenue(null); // Clear selected venue when closing
            console.log('🚀 MAP CONTAINER - Floating panel closed, selectedVenue cleared');
        }
    }["MapContainer.useCallback[handleFloatingPanelClose]"], []);
    // Initialize mapOptions and update when theme changes
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "MapContainer.useEffect": ()=>{
            const lightStyles = [
                // Retro styling with POI hiding
                {
                    elementType: "geometry",
                    stylers: [
                        {
                            color: "#ebe3cd"
                        }
                    ]
                },
                {
                    elementType: "labels.text.fill",
                    stylers: [
                        {
                            color: "#523735"
                        }
                    ]
                },
                {
                    elementType: "labels.text.stroke",
                    stylers: [
                        {
                            color: "#f5f1e6"
                        }
                    ]
                },
                {
                    featureType: "administrative",
                    elementType: "geometry.stroke",
                    stylers: [
                        {
                            color: "#c9b2a6"
                        }
                    ]
                },
                {
                    featureType: "administrative.land_parcel",
                    elementType: "geometry.stroke",
                    stylers: [
                        {
                            color: "#dcd2be"
                        }
                    ]
                },
                {
                    featureType: "administrative.land_parcel",
                    elementType: "labels.text.fill",
                    stylers: [
                        {
                            color: "#ae9e90"
                        }
                    ]
                },
                {
                    featureType: "landscape.natural",
                    elementType: "geometry",
                    stylers: [
                        {
                            color: "#dfd2ae"
                        }
                    ]
                },
                {
                    featureType: "poi",
                    elementType: "geometry",
                    stylers: [
                        {
                            color: "#dfd2ae"
                        }
                    ]
                },
                {
                    featureType: "poi",
                    elementType: "labels.text.fill",
                    stylers: [
                        {
                            color: "#93817c"
                        }
                    ]
                },
                // Hide POI business markers
                {
                    featureType: "poi.business",
                    stylers: [
                        {
                            visibility: "off"
                        }
                    ]
                },
                {
                    featureType: "poi.park",
                    elementType: "geometry.fill",
                    stylers: [
                        {
                            color: "#a5b076"
                        }
                    ]
                },
                {
                    featureType: "poi.park",
                    elementType: "labels.text.fill",
                    stylers: [
                        {
                            color: "#447530"
                        }
                    ]
                },
                {
                    featureType: "road",
                    elementType: "geometry",
                    stylers: [
                        {
                            color: "#f5f1e6"
                        }
                    ]
                },
                {
                    featureType: "road.arterial",
                    elementType: "geometry",
                    stylers: [
                        {
                            color: "#fdfcf8"
                        }
                    ]
                },
                {
                    featureType: "road.highway",
                    elementType: "geometry",
                    stylers: [
                        {
                            color: "#f8c967"
                        }
                    ]
                },
                {
                    featureType: "road.highway",
                    elementType: "geometry.stroke",
                    stylers: [
                        {
                            color: "#e9bc62"
                        }
                    ]
                },
                {
                    featureType: "road.highway.controlled_access",
                    elementType: "geometry",
                    stylers: [
                        {
                            color: "#e98d58"
                        }
                    ]
                },
                {
                    featureType: "road.highway.controlled_access",
                    elementType: "geometry.stroke",
                    stylers: [
                        {
                            color: "#db8555"
                        }
                    ]
                },
                {
                    featureType: "road.local",
                    elementType: "labels.text.fill",
                    stylers: [
                        {
                            color: "#806b63"
                        }
                    ]
                },
                {
                    featureType: "transit.line",
                    elementType: "geometry",
                    stylers: [
                        {
                            color: "#dfd2ae"
                        }
                    ]
                },
                {
                    featureType: "transit.line",
                    elementType: "labels.text.fill",
                    stylers: [
                        {
                            color: "#8f7d77"
                        }
                    ]
                },
                {
                    featureType: "transit.line",
                    elementType: "labels.text.stroke",
                    stylers: [
                        {
                            color: "#ebe3cd"
                        }
                    ]
                },
                // Hide transit icons
                {
                    featureType: "transit",
                    elementType: "labels.icon",
                    stylers: [
                        {
                            visibility: "off"
                        }
                    ]
                },
                {
                    featureType: "transit.station",
                    elementType: "geometry",
                    stylers: [
                        {
                            color: "#dfd2ae"
                        }
                    ]
                },
                {
                    featureType: "water",
                    elementType: "geometry.fill",
                    stylers: [
                        {
                            color: "#b9d3c2"
                        }
                    ]
                },
                {
                    featureType: "water",
                    elementType: "labels.text.fill",
                    stylers: [
                        {
                            color: "#92998d"
                        }
                    ]
                }
            ];
            const mapStyles = lightStyles;
            const newMapOptions = {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$maps$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_OPTIONS"],
                center: mapViewportRef.current.center,
                zoom: mapViewportRef.current.zoom,
                styles: mapStyles
            };
            setMapOptions(newMapOptions);
            console.log('🗺️ Map options updated');
        }
    }["MapContainer.useEffect"], []); // Initialize once
    // Debug API key loading
    console.log('Google Maps API Key:', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$maps$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GOOGLE_MAPS_CONFIG"].apiKey ? 'PRESENT' : 'MISSING');
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$maps$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GOOGLE_MAPS_CONFIG"].apiKey || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$maps$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GOOGLE_MAPS_CONFIG"].apiKey === 'your_google_maps_api_key') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-screen w-full flex items-center justify-center bg-background",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "retro-surface p-8 max-w-md text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold mb-2",
                        children: "Google Maps API Key Required"
                    }, void 0, false, {
                        fileName: "[project]/src/components/map/MapContainer.tsx",
                        lineNumber: 444,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground mb-4",
                        children: "Please add your Google Maps API key to the environment variables to display the map."
                    }, void 0, false, {
                        fileName: "[project]/src/components/map/MapContainer.tsx",
                        lineNumber: 445,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-muted p-3 rounded text-sm font-mono text-left",
                        children: [
                            "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/src/components/map/MapContainer.tsx",
                                lineNumber: 450,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            "Current: ",
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$maps$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GOOGLE_MAPS_CONFIG"].apiKey || 'undefined'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/map/MapContainer.tsx",
                        lineNumber: 448,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/map/MapContainer.tsx",
                lineNumber: 443,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/map/MapContainer.tsx",
            lineNumber: 442,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    // Calculate live stories count (mock for now) - removed unused variable warning
    // const liveStoriesCount = Math.floor(venues.length * 0.3); // 30% of venues have live stories
    if (loadError) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-screen w-full flex items-center justify-center bg-background",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "retro-surface p-8 max-w-md text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold mb-2 text-red-600",
                        children: "Google Maps Load Error"
                    }, void 0, false, {
                        fileName: "[project]/src/components/map/MapContainer.tsx",
                        lineNumber: 465,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground",
                        children: "Failed to load Google Maps"
                    }, void 0, false, {
                        fileName: "[project]/src/components/map/MapContainer.tsx",
                        lineNumber: 466,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/map/MapContainer.tsx",
                lineNumber: 464,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/map/MapContainer.tsx",
            lineNumber: 463,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (!isLoaded) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-screen w-full flex items-center justify-center bg-background",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "retro-surface p-8 max-w-md text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold mb-2",
                        children: "Loading Google Maps..."
                    }, void 0, false, {
                        fileName: "[project]/src/components/map/MapContainer.tsx",
                        lineNumber: 476,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mt-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/map/MapContainer.tsx",
                        lineNumber: 477,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/map/MapContainer.tsx",
                lineNumber: 475,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/map/MapContainer.tsx",
            lineNumber: 474,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative h-screen w-full",
        "data-testid": dataTestId,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$navigation$2f$TopNav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                navButtons: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                setIsFilterSheetOpen(true);
                                setIsFloatingPanelOpen(false);
                            },
                            className: "nav-circle ".concat((((_filters_activeDates = filters.activeDates) === null || _filters_activeDates === void 0 ? void 0 : _filters_activeDates.length) || 0) > 1 ? 'nav-has-filters' : ''),
                            title: "Date Filter",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                size: 18,
                                className: "nav-icon",
                                strokeWidth: 1.5
                            }, void 0, false, {
                                fileName: "[project]/src/components/map/MapContainer.tsx",
                                lineNumber: 502,
                                columnNumber: 15
                            }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/src/components/map/MapContainer.tsx",
                            lineNumber: 490,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                setIsFilterSheetOpen(true);
                                setIsFloatingPanelOpen(false);
                            },
                            className: "nav-circle ".concat(!filters.selectedAreas.includes('All Dubai') || filters.selectedAreas.length > 1 || filters.selectedPrimaries.vibes.length > 0 || filters.selectedPrimaries.genres.length > 0 ? 'nav-has-filters' : ''),
                            title: "More Filters",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__["SlidersHorizontal"], {
                                size: 18,
                                className: "nav-icon",
                                strokeWidth: 1.5
                            }, void 0, false, {
                                fileName: "[project]/src/components/map/MapContainer.tsx",
                                lineNumber: 518,
                                columnNumber: 15
                            }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/src/components/map/MapContainer.tsx",
                            lineNumber: 504,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/src/components/map/MapContainer.tsx",
                lineNumber: 487,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            (()=>{
                console.log('🎯 RENDER CHECK - About to render HierarchicalFilterContainer');
                console.log('🎯 RENDER CHECK - filterOptions:', filterOptions);
                console.log('🎯 RENDER CHECK - filters:', filters);
                console.log('🎯 RENDER CHECK - hierarchicalGenres:', filterOptions === null || filterOptions === void 0 ? void 0 : filterOptions.hierarchicalGenres);
                console.log('🎯 RENDER CHECK - hierarchicalVibes:', filterOptions === null || filterOptions === void 0 ? void 0 : filterOptions.hierarchicalVibes);
                return null;
            })(),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$filters$2f$HierarchicalFilterContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                filters: filters,
                onFiltersChange: handleHierarchicalFiltersChange,
                filterOptions: filterOptions
            }, void 0, false, {
                fileName: "[project]/src/components/map/MapContainer.tsx",
                lineNumber: 533,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            mapOptions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$google$2d$maps$2f$api$2f$dist$2f$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GoogleMap"], {
                mapContainerStyle: {
                    width: '100%',
                    height: '100%'
                },
                options: mapOptions,
                onLoad: onMapLoad,
                onUnmount: onMapUnmount,
                children: isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "retro-surface p-4 flex items-center space-x-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "animate-spin rounded-full h-5 w-5 border-b-2 border-primary"
                            }, void 0, false, {
                                fileName: "[project]/src/components/map/MapContainer.tsx",
                                lineNumber: 576,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm",
                                children: "Loading venues..."
                            }, void 0, false, {
                                fileName: "[project]/src/components/map/MapContainer.tsx",
                                lineNumber: 577,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/map/MapContainer.tsx",
                        lineNumber: 575,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/map/MapContainer.tsx",
                    lineNumber: 574,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/map/MapContainer.tsx",
                lineNumber: 541,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$venue$2f$VenueDetailsSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                venue: selectedVenue || null,
                isOpen: isSidebarOpen,
                onClose: handleSidebarClose,
                filters: filters
            }, void 0, false, {
                fileName: "[project]/src/components/map/MapContainer.tsx",
                lineNumber: 585,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$venue$2f$VenueFloatingPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                venue: selectedVenue,
                isOpen: isFloatingPanelOpen,
                onClose: handleFloatingPanelClose,
                filters: filters,
                onFiltersChange: onFiltersChange,
                onViewDetails: ()=>{
                    setIsFloatingPanelOpen(false);
                    setIsSidebarOpen(true);
                }
            }, void 0, false, {
                fileName: "[project]/src/components/map/MapContainer.tsx",
                lineNumber: 593,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/map/MapContainer.tsx",
        lineNumber: 484,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(MapContainer, "8xjMWd2AcqPA3sMgnKOGU7+4Jww=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$google$2d$maps$2f$api$2f$dist$2f$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLoadScript"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFilterOptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFilterOptions"]
    ];
});
_c = MapContainer;
const __TURBOPACK__default__export__ = MapContainer;
var _c;
__turbopack_context__.k.register(_c, "MapContainer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/onboarding/WelcomePopup.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/funnel.js [app-client] (ecmascript) <export default as Filter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$party$2d$popper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PartyPopper$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/party-popper.js [app-client] (ecmascript) <export default as PartyPopper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
'use client';
;
;
;
;
;
const venueTypes = [
    {
        color: '#9333ea',
        bgColor: 'bg-purple-500',
        icon: '🍸',
        name: 'Bars & Lounges',
        description: 'Cocktails & nightlife',
        examples: [
            'Cocktail bars',
            'Rooftop lounges'
        ]
    },
    {
        color: '#3b82f6',
        bgColor: 'bg-blue-500',
        icon: '🏖️',
        name: 'Beach & Pool',
        description: 'Pool parties & beach vibes',
        examples: [
            'Beach clubs',
            'Pool parties'
        ]
    },
    {
        color: '#10b981',
        bgColor: 'bg-green-500',
        icon: '🍽️',
        name: 'Restaurants',
        description: 'Dining experiences',
        examples: [
            'Fine dining',
            'Casual cafes'
        ]
    },
    {
        color: '#f59e0b',
        bgColor: 'bg-orange-500',
        icon: '🏈',
        name: 'Sports Bars',
        description: 'Live sports & pub vibes',
        examples: [
            'Sports viewing',
            'Pub games'
        ]
    }
];
const WelcomePopup = (param)=>{
    let { isOpen, onClose } = param;
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300",
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full max-w-sm mx-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                    className: "glassmorphism-popup border-white/20 shadow-2xl animate-popup-in bg-slate-900/80 backdrop-blur-xl",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                        className: "p-6 relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: onClose,
                                variant: "ghost",
                                size: "icon",
                                className: "absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors duration-200 border-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-4 h-4 text-white"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                    lineNumber: 80,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                src: "/logo_clean.svg",
                                                alt: "WMV Logo",
                                                width: 120,
                                                height: 60,
                                                className: "w-30 h-15 object-contain mx-auto"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                                lineNumber: 86,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "font-mono text-sm font-bold text-white mt-2 tracking-wide",
                                                children: "Where's My Vibe?"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                                lineNumber: 93,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                        lineNumber: 85,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-geist text-sm text-gray-200 leading-relaxed",
                                        children: [
                                            "Here we will help you discover all the events happening around you. Scraped from Instagram, Web and all sources to get you a curated but exhaustive list of places, to match your ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold text-purple-300",
                                                children: "VIBE"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                                lineNumber: 99,
                                                columnNumber: 195
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                        lineNumber: 98,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                lineNumber: 84,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: onClose,
                                        size: "lg",
                                        className: "w-full font-geist font-medium bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 hover:from-orange-600 hover:via-pink-600 hover:to-red-600 text-white rounded-full transition-all duration-300 shadow-lg border-0 transform hover:scale-105 active:scale-95 animate-pulse hover:animate-none",
                                        children: "Start Exploring"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                        lineNumber: 105,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-geist text-gray-400 text-xs mt-3 tracking-wide",
                                        children: "Default date to today"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                        lineNumber: 113,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                lineNumber: 104,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-3 gap-3 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                            className: "p-3 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-200",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                className: "p-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                        className: "w-5 h-5 text-purple-400 mx-auto mb-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                                        lineNumber: 123,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-geist text-white text-xs font-medium tracking-wide",
                                                        children: "Tap markers"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                                        lineNumber: 124,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                                lineNumber: 122,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                            lineNumber: 121,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                            className: "p-3 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-200",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                className: "p-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__["Filter"], {
                                                        className: "w-5 h-5 text-blue-400 mx-auto mb-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                                        lineNumber: 131,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-geist text-white text-xs font-medium tracking-wide",
                                                        children: "Use filters"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                                        lineNumber: 132,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                                lineNumber: 130,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                            lineNumber: 129,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                            className: "p-3 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-200",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                className: "p-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$party$2d$popper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PartyPopper$3e$__["PartyPopper"], {
                                                        className: "w-5 h-5 text-yellow-400 mx-auto mb-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                                        lineNumber: 139,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-geist text-white text-xs font-medium tracking-wide",
                                                        children: "Find events"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                                        lineNumber: 140,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                                lineNumber: 138,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                            lineNumber: 137,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                    lineNumber: 120,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                lineNumber: 119,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "font-geist text-base font-semibold text-white mb-4 text-center tracking-wide",
                                        children: "Venue Types"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                        lineNumber: 150,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-3",
                                        children: venueTypes.map((venue, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                                className: "p-3 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-200",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                    className: "p-0 flex items-center space-x-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center space-x-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "relative",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                                        className: "w-4 h-4 text-white",
                                                                        fill: venue.color,
                                                                        style: {
                                                                            color: venue.color
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                                                        lineNumber: 164,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                                                    lineNumber: 163,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm",
                                                                    children: venue.icon
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                                                    lineNumber: 170,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                                            lineNumber: 162,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1 min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "font-geist font-medium text-white text-xs leading-tight truncate",
                                                                    children: venue.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                                                    lineNumber: 174,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-geist text-gray-400 text-xs truncate",
                                                                    children: venue.description
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                                                    lineNumber: 177,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                                            lineNumber: 173,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                                    lineNumber: 160,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, index, false, {
                                                fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                                lineNumber: 156,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                        lineNumber: 154,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                                lineNumber: 149,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                    lineNumber: 71,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/onboarding/WelcomePopup.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = WelcomePopup;
const __TURBOPACK__default__export__ = WelcomePopup;
var _c;
__turbopack_context__.k.register(_c, "WelcomePopup");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useClientSideVenues.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useClientSideVenues",
    ()=>useClientSideVenues
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
// Convert hierarchical filter state to flat filter state for filtering logic
function convertHierarchicalToFlat(hierarchicalState) {
    const allActiveGenres = [];
    const allActiveVibes = [];
    // Process genres
    hierarchicalState.selectedPrimaries.genres.forEach((primary)=>{
        var _hierarchicalState_selectedSecondaries_genres;
        const secondaries = ((_hierarchicalState_selectedSecondaries_genres = hierarchicalState.selectedSecondaries.genres) === null || _hierarchicalState_selectedSecondaries_genres === void 0 ? void 0 : _hierarchicalState_selectedSecondaries_genres[primary]) || [];
        if (secondaries.length > 0) {
            // If there are selected secondaries, only include them
            allActiveGenres.push(...secondaries);
        } else {
            // If no secondaries selected, include the primary itself
            allActiveGenres.push(primary);
        }
    });
    // Process vibes
    hierarchicalState.selectedPrimaries.vibes.forEach((primary)=>{
        var _hierarchicalState_selectedSecondaries_vibes;
        const secondaries = ((_hierarchicalState_selectedSecondaries_vibes = hierarchicalState.selectedSecondaries.vibes) === null || _hierarchicalState_selectedSecondaries_vibes === void 0 ? void 0 : _hierarchicalState_selectedSecondaries_vibes[primary]) || [];
        if (secondaries.length > 0) {
            // If there are selected secondaries, only include them
            allActiveVibes.push(...secondaries);
        } else {
            // If no secondaries selected, include the primary itself
            allActiveVibes.push(primary);
        }
    });
    return {
        selectedAreas: hierarchicalState.selectedAreas,
        activeVibes: allActiveVibes,
        activeDates: hierarchicalState.activeDates,
        activeGenres: allActiveGenres,
        activeOffers: hierarchicalState.activeOffers,
        searchQuery: hierarchicalState.searchQuery
    };
}
function useClientSideVenues(filters) {
    _s();
    const [allVenues, setAllVenues] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Load all venues once on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useClientSideVenues.useEffect": ()=>{
            const fetchAllVenues = {
                "useClientSideVenues.useEffect.fetchAllVenues": async ()=>{
                    try {
                        setIsLoading(true);
                        setError(null);
                        const response = await fetch('/api/venues', {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Cache-Control': 'no-cache'
                            }
                        });
                        if (!response.ok) {
                            throw new Error("HTTP error! status: ".concat(response.status));
                        }
                        const result = await response.json();
                        if (result.success && result.data) {
                            setAllVenues(result.data);
                            setError(null);
                        } else {
                            const errorMsg = result.error || 'Invalid response format';
                            setError(errorMsg);
                        }
                    } catch (err) {
                        const errorMsg = err instanceof Error ? err.message : 'Network error occurred';
                        setError(errorMsg);
                        console.error('Error fetching venues:', err);
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["useClientSideVenues.useEffect.fetchAllVenues"];
            fetchAllVenues();
        }
    }["useClientSideVenues.useEffect"], []); // Only load once on mount
    // Filter venues client-side - this runs instantly
    const filteredVenues = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useClientSideVenues.useMemo[filteredVenues]": ()=>{
            if (!allVenues.length) return [];
            // Convert hierarchical state to flat state for filtering
            const flatFilters = convertHierarchicalToFlat(filters);
            console.log('🔍 CLIENT FILTER - Starting filter with:', {
                areas: flatFilters.selectedAreas,
                genres: flatFilters.activeGenres,
                vibes: flatFilters.activeVibes,
                dates: flatFilters.activeDates,
                search: flatFilters.searchQuery
            });
            return allVenues.filter({
                "useClientSideVenues.useMemo[filteredVenues]": (venue)=>{
                    var _flatFilters_selectedAreas, _flatFilters_activeGenres, _flatFilters_activeVibes;
                    // Apply area filter
                    if (((_flatFilters_selectedAreas = flatFilters.selectedAreas) === null || _flatFilters_selectedAreas === void 0 ? void 0 : _flatFilters_selectedAreas.length) > 0 && !flatFilters.selectedAreas.includes('All Dubai')) {
                        const venueArea = venue.area || venue.venue_area;
                        if (!venueArea) return false;
                        const matchesArea = flatFilters.selectedAreas.some({
                            "useClientSideVenues.useMemo[filteredVenues].matchesArea": (selectedArea)=>{
                                if (selectedArea === 'JBR') {
                                    return venueArea.toLowerCase().includes('jumeirah beach residence') || venueArea.toLowerCase().includes('jbr');
                                }
                                return venueArea.toLowerCase().includes(selectedArea.toLowerCase());
                            }
                        }["useClientSideVenues.useMemo[filteredVenues].matchesArea"]);
                        if (!matchesArea) return false;
                    }
                    // Apply genre filter using music_genre_processed primaries AND secondaries
                    if (((_flatFilters_activeGenres = flatFilters.activeGenres) === null || _flatFilters_activeGenres === void 0 ? void 0 : _flatFilters_activeGenres.length) > 0) {
                        var _venue_music_genre_processed;
                        if (!((_venue_music_genre_processed = venue.music_genre_processed) === null || _venue_music_genre_processed === void 0 ? void 0 : _venue_music_genre_processed.primaries)) {
                            console.log('🎵 FILTER - Venue excluded (no processed genres):', venue.name);
                            return false;
                        }
                        // ANY selected genre must match (OR logic)
                        const anyGenreMatches = flatFilters.activeGenres.some({
                            "useClientSideVenues.useMemo[filteredVenues].anyGenreMatches": (selectedGenre)=>{
                                // Check if it's a primary
                                if (venue.music_genre_processed.primaries.includes(selectedGenre)) {
                                    console.log('  ✅ Genre match (primary):', selectedGenre, 'in', venue.name);
                                    return true;
                                }
                                // Check if it's a secondary
                                for (const [primary, secondaries] of Object.entries(venue.music_genre_processed.secondariesByPrimary || {})){
                                    if (secondaries.includes(selectedGenre)) {
                                        console.log('  ✅ Genre match (secondary):', selectedGenre, 'under', primary, 'in', venue.name);
                                        return true;
                                    }
                                }
                                console.log('  ❌ Genre no match:', selectedGenre, 'in', venue.name);
                                return false;
                            }
                        }["useClientSideVenues.useMemo[filteredVenues].anyGenreMatches"]);
                        if (!anyGenreMatches) {
                            console.log('🎵 FILTER - Venue excluded (no matching genres):', venue.name, 'Primaries:', venue.music_genre_processed.primaries, 'Secondaries:', venue.music_genre_processed.secondariesByPrimary, 'Selected:', flatFilters.activeGenres);
                            return false;
                        }
                        console.log('🎵 FILTER - Venue included:', venue.name, 'Primaries:', venue.music_genre_processed.primaries, 'Secondaries:', venue.music_genre_processed.secondariesByPrimary);
                    }
                    // Apply vibe filter using event_vibe_processed primaries AND secondaries
                    if (((_flatFilters_activeVibes = flatFilters.activeVibes) === null || _flatFilters_activeVibes === void 0 ? void 0 : _flatFilters_activeVibes.length) > 0) {
                        var _venue_event_vibe_processed;
                        if (!((_venue_event_vibe_processed = venue.event_vibe_processed) === null || _venue_event_vibe_processed === void 0 ? void 0 : _venue_event_vibe_processed.primaries)) {
                            console.log('🎯 FILTER - Venue excluded (no processed vibes):', venue.name);
                            return false;
                        }
                        // ANY selected vibe must match (OR logic)
                        const anyVibeMatches = flatFilters.activeVibes.some({
                            "useClientSideVenues.useMemo[filteredVenues].anyVibeMatches": (selectedVibe)=>{
                                // Check if it's a primary
                                if (venue.event_vibe_processed.primaries.includes(selectedVibe)) {
                                    return true;
                                }
                                // Check if it's a secondary
                                for (const secondaries of Object.values(venue.event_vibe_processed.secondariesByPrimary || {})){
                                    if (secondaries.includes(selectedVibe)) {
                                        return true;
                                    }
                                }
                                return false;
                            }
                        }["useClientSideVenues.useMemo[filteredVenues].anyVibeMatches"]);
                        if (!anyVibeMatches) {
                            console.log('🎯 FILTER - Venue excluded (no matching vibes):', venue.name, 'Primaries:', venue.event_vibe_processed.primaries, 'Selected:', flatFilters.activeVibes);
                            return false;
                        }
                        console.log('🎯 FILTER - Venue included:', venue.name, 'Vibe Primaries:', venue.event_vibe_processed.primaries);
                    }
                    // Apply date filter (skip for venues, this is for events)
                    // if (flatFilters.activeDates?.length > 0) { ... }
                    // Apply search query
                    if (flatFilters.searchQuery && flatFilters.searchQuery.trim()) {
                        var _venue_venue_name, _venue_category, _venue_venue_category;
                        const query = flatFilters.searchQuery.toLowerCase();
                        const venueName = ((_venue_venue_name = venue.venue_name) === null || _venue_venue_name === void 0 ? void 0 : _venue_venue_name.toLowerCase()) || '';
                        const venueCategory = ((_venue_category = venue.category) === null || _venue_category === void 0 ? void 0 : _venue_category.toLowerCase()) || ((_venue_venue_category = venue.venue_category) === null || _venue_venue_category === void 0 ? void 0 : _venue_venue_category.toLowerCase()) || '';
                        if (!venueName.includes(query) && !venueCategory.includes(query)) {
                            return false;
                        }
                    }
                    return true;
                }
            }["useClientSideVenues.useMemo[filteredVenues]"]);
        }
    }["useClientSideVenues.useMemo[filteredVenues]"], [
        allVenues,
        filters
    ]);
    return {
        allVenues,
        filteredVenues,
        isLoading,
        error
    };
}
_s(useClientSideVenues, "K/iYM9pissoHVWepKkfFaQ59PLk=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$map$2f$MapContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/map/MapContainer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$onboarding$2f$WelcomePopup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/onboarding/WelcomePopup.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$ThemeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/ThemeContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useClientSideVenues$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useClientSideVenues.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function Home() {
    _s();
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        selectedPrimaries: {
            genres: [],
            vibes: []
        },
        selectedSecondaries: {
            genres: {},
            vibes: {}
        },
        expandedPrimaries: {
            genres: [],
            vibes: []
        },
        selectedAreas: [
            'All Dubai'
        ],
        activeDates: [],
        activeOffers: [],
        searchQuery: ''
    });
    // Use client-side filtering for instant performance
    const { filteredVenues, isLoading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useClientSideVenues$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClientSideVenues"])(filters);
    // Use filtered venues for display
    const venues = filteredVenues;
    const [showWelcomePopup, setShowWelcomePopup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Client-side filtering now handles venue loading automatically
    // Welcome popup logic - show on first visit this session
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            // Check if user has seen welcome popup this session
            const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcomePopup');
            if (!hasSeenWelcome) {
                // Show popup after a short delay once venues are loaded
                if (!isLoading && venues.length > 0) {
                    const timer = setTimeout({
                        "Home.useEffect.timer": ()=>{
                            setShowWelcomePopup(true);
                        }
                    }["Home.useEffect.timer"], 1000); // 1 second delay after venues load
                    return ({
                        "Home.useEffect": ()=>clearTimeout(timer)
                    })["Home.useEffect"];
                }
            }
        }
    }["Home.useEffect"], [
        isLoading,
        venues.length
    ]);
    const handleCloseWelcomePopup = ()=>{
        setShowWelcomePopup(false);
        // Mark as seen for this session
        sessionStorage.setItem('hasSeenWelcomePopup', 'true');
    };
    const handleVenueSelect = (_venue)=>{};
    const handleFiltersChange = (newFilters)=>{
        setFilters(newFilters);
    };
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "h-screen w-full flex items-center justify-center bg-background",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "retro-surface p-8 max-w-md text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold mb-2 text-red-600",
                        children: "Error Loading Venues"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 75,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 74,
            columnNumber: 7
        }, this);
    }
    // Show loading screen only for initial load (when no venues yet)
    if (isLoading && venues.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "h-screen w-full flex items-center justify-center bg-background",
            "data-testid": "loading-state",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "retro-surface p-8 max-w-md text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold mb-2",
                        children: "Loading Venues..."
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 89,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground",
                        children: "Finding Dubai venues..."
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 90,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mt-4"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 91,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 88,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 87,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$ThemeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "h-screen w-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "sr-only",
                    children: "Dubai Event Discovery - Find the Hottest Venues and Events"
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 101,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$map$2f$MapContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    venues: venues,
                    onVenueSelect: handleVenueSelect,
                    filters: filters,
                    onFiltersChange: handleFiltersChange,
                    isLoading: isLoading,
                    "data-testid": "map-container"
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 102,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$onboarding$2f$WelcomePopup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    isOpen: showWelcomePopup,
                    onClose: handleCloseWelcomePopup
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 112,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 100,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 99,
        columnNumber: 5
    }, this);
}
_s(Home, "mMxPYHmc6dMqxadAkuiiheZnkxo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useClientSideVenues$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClientSideVenues"]
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_7bb21646._.js.map