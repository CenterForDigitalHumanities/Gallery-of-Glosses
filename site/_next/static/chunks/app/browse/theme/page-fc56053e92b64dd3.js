(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[13],{1044:function(e,t,s){Promise.resolve().then(s.bind(s,8150))},8150:function(e,t,s){"use strict";s.r(t);var n=s(7437),a=s(1572),i=s(3180),r=s(1159);let c={header:"Themes",accessorKey:"themes",expandable:!1},o=(0,r.C)([{header:"Incipit",accessorKey:"title",expandable:!1},{header:"Canonical Reference Locator",accessorKey:"canonicalReference",expandable:!1},c,{header:"Gloss Text",accessorKey:"textValue",expandable:!0}]);t.default=e=>{let{}=e,{glosses:t,loading:s}=(0,a.g)();return(0,n.jsx)("div",{children:(0,n.jsx)(i.w,{columns:o,data:t,loading:s,filterColumn:c})})}},1572:function(e,t,s){"use strict";s.d(t,{g:function(){return useGlossList}});var n=s(2265),a=s(4209);let useGlossList=()=>{let[e,t]=(0,n.useState)([]),[s,i]=(0,n.useState)(!0);async function fetchGlossAndProcessProperties(){let e=await (0,a.vi)();if(e&&e.itemListElement)for(let s of e.itemListElement){let e=s["@id"],n=await (0,a.wv)(e),i=await n.json(),r=i.map(e=>e.body),c=(0,a.zi)(r,e);t(e=>[...e,c])}i(!1)}return(0,n.useEffect)(()=>{fetchGlossAndProcessProperties()},[]),{glosses:e,loading:s}}}},function(e){e.O(0,[310,173,206,702,638,971,472,744],function(){return e(e.s=1044)}),_N_E=e.O()}]);