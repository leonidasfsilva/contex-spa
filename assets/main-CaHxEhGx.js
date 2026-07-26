import{a as e,i as t,n,o as r,r as i,s as a,t as o}from"./icons-CvCjpvea.js";import{t as s}from"./toast-CYCf26qJ.js";import{t as c}from"./tabs-CD3ADGpv.js";var l=[{label:`Overview`,items:[{icon:`layout-dashboard`,label:`Dashboard`,href:`index.html`},{icon:`bar-chart-3`,label:`Analytics`,href:`analytics.html`},{icon:`store`,label:`eCommerce`,href:`ecommerce.html`},{icon:`handshake`,label:`CRM`,href:`crm.html`},{icon:`rocket`,label:`SaaS`,href:`saas.html`},{icon:`chart-no-axes-combined`,label:`Charts`,href:`charts.html`}]},{label:`Commerce`,items:[{icon:`shopping-cart`,label:`Orders`,href:`orders.html`,badge:`12`},{icon:`list`,label:`Lista Mobile`,href:`mobile-orders.html`},{icon:`package`,label:`Products`,href:`products.html`},{icon:`users`,label:`Customers`,href:`customers.html`},{icon:`file-text`,label:`Invoices`,href:`invoices.html`}]},{label:`Apps`,items:[{icon:`mail`,label:`Mail`,href:`mail.html`},{icon:`message-circle`,label:`Chat`,href:`chat.html`},{icon:`folder-open`,label:`Files`,href:`files.html`},{icon:`kanban`,label:`Kanban`,href:`kanban.html`},{icon:`calendar`,label:`Calendar`,href:`calendar.html`},{icon:`list-checks`,label:`Wizard`,href:`wizard.html`},{icon:`file-input`,label:`Forms`,href:`forms.html`}]},{label:`Finance`,items:[{icon:`credit-card`,label:`Billing`,href:`billing.html`}]}],u={label:`System`,items:[{icon:`user-cog`,label:`Users`,href:`users.html`},{icon:`bell`,label:`Notifications`,href:`notifications.html`,badge:`3`},{icon:`settings`,label:`Settings`,href:`settings.html`},{icon:`help-circle`,label:`Help & Support`,href:`support.html`}]},d={icon:`book-open`,label:`Documentation`,href:`docs.html`},f=`apex-sidebar-collapsed`;function p(e,t){let n=e.href.split(`/`).pop(),r=n===`index.html`?t===`index.html`:t===n,i=r?`bg-sidebar-accent text-sidebar-primary`:`text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground`,a=r?`text-sidebar-primary`:`text-sidebar-foreground/50 group-hover:text-sidebar-foreground/80`,o=e.badge?`<span class="sidebar-badge flex h-5 min-w-5 items-center justify-center rounded-full bg-sidebar-primary/15 px-1.5 text-[10px] font-semibold text-sidebar-primary">${e.badge}</span>
       <span class="sidebar-badge-dot absolute right-2 top-1 h-2 w-2 rounded-full bg-sidebar-primary"></span>`:``;return`
    <a href="${e.href}" ${r?`aria-current="page"`:``} class="sidebar-nav-item group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${i}">
      <i data-lucide="${e.icon}" class="h-[18px] w-[18px] shrink-0 ${a}"></i>
      <span class="sidebar-label flex-1">${e.label}</span>
      ${o}
    </a>`}function m(e,t){return`
    <div>
      <button type="button" class="sidebar-group-toggle flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/30 transition-colors hover:text-sidebar-foreground/50">
        <span class="sidebar-group-label flex-1 text-start">${e.label}</span>
        <i data-lucide="chevron-right" class="sidebar-group-chevron size-3 transition-transform duration-200 rotate-90"></i>
      </button>
      <div class="nav-group-body">
        <div>
          <div class="mt-1 space-y-0.5">
            ${e.items.map(e=>p(e,t)).join(``)}
          </div>
        </div>
      </div>
    </div>`}var h=class extends HTMLElement{connectedCallback(){let e=(this.getAttribute(`active`)||location.pathname.split(`/`).pop()||`index.html`).split(`/`).pop()||`index.html`;this.innerHTML=`
      <div class="apex-sidebar-overlay fixed inset-0 z-40 bg-black/50 lg:hidden" data-mobile-close></div>
      <aside class="apex-sidebar-aside h-screen border-e border-sidebar-border bg-sidebar">
        <!-- Logo -->
        <div class="flex h-16 items-center gap-3 border-b border-sidebar-border px-4">
          <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary">
            <i data-lucide="zap" class="h-4 w-4 text-sidebar-primary-foreground"></i>
          </div>
          <div class="sidebar-brand-text flex flex-col">
            <span class="text-sm font-bold tracking-tight text-sidebar-foreground">Apex</span>
            <span class="text-[10px] font-medium uppercase tracking-widest text-sidebar-foreground/40">Dashboard</span>
          </div>
          <button type="button" data-mobile-close aria-label="Close sidebar"
            class="ms-auto flex h-7 w-7 items-center justify-center rounded-md text-sidebar-foreground/50 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground lg:hidden">
            <i data-lucide="x" class="h-4 w-4"></i>
          </button>
        </div>

        <!-- Nav -->
        <nav aria-label="Main navigation" class="scrollbar-fade flex-1 space-y-3 overflow-y-auto px-3 py-4">
          ${l.map(t=>m(t,e)).join(``)}
          <div class="my-2 border-t border-sidebar-border"></div>
          ${m(u,e)}
          <div class="my-2 border-t border-sidebar-border"></div>
          ${p(d,e)}
        </nav>

        <!-- User -->
        <div class="border-t border-sidebar-border p-3">
          <div class="flex items-center gap-2">
            <a href="profile.html" class="flex flex-1 items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-sidebar-accent/50">
              <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sidebar-primary/80 to-sidebar-primary text-[11px] font-bold text-sidebar-primary-foreground">AS</div>
              <div class="sidebar-user-info flex flex-1 flex-col">
                <span class="text-sm font-medium text-sidebar-foreground">Aigars S.</span>
                <span class="text-[11px] text-sidebar-foreground/50">Admin</span>
              </div>
            </a>
            <button type="button" aria-label="Log out" class="sidebar-logout rounded-md p-1.5 text-sidebar-foreground/40 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground/70">
              <i data-lucide="log-out" class="h-4 w-4"></i>
            </button>
          </div>
        </div>

        <!-- Collapse toggle (desktop) -->
        <button type="button" data-collapse-toggle aria-label="Toggle sidebar"
          class="apex-collapse-btn absolute -right-3 top-20 h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition-all hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <i data-lucide="chevron-left" class="apex-collapse-icon h-3.5 w-3.5 mx-auto transition-transform duration-300"></i>
        </button>
      </aside>`,this.wire(),o(),this.syncCollapseIcon()}wire(){this.querySelector(`[data-collapse-toggle]`)?.addEventListener(`click`,()=>{let e=document.documentElement.dataset.sidebarCollapsed!==`true`;document.documentElement.dataset.sidebarCollapsed=String(e),localStorage.setItem(f,String(e)),this.syncCollapseIcon()}),this.querySelectorAll(`[data-mobile-close]`).forEach(e=>e.addEventListener(`click`,()=>{document.documentElement.dataset.mobileOpen=`false`})),this.querySelectorAll(`nav a`).forEach(e=>e.addEventListener(`click`,()=>{document.documentElement.dataset.mobileOpen=`false`})),this.querySelectorAll(`.sidebar-group-toggle`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.nextElementSibling,n=e.querySelector(`.sidebar-group-chevron`),r=!t.hasAttribute(`hidden`);t.toggleAttribute(`hidden`,r),n?.classList.toggle(`rotate-90`,!r)})})}syncCollapseIcon(){let e=document.documentElement.dataset.sidebarCollapsed===`true`;this.querySelector(`.apex-collapse-icon`)?.classList.toggle(`rotate-180`,e)}};customElements.define(`apex-sidebar`,h);function getContexHeaderUser(){let e=window.contexAuthUser||{},t=e.name||e.nome||`Usuario`,n=e.email||``;return{name:t,email:n,initials:t.split(/\s+/).filter(Boolean).slice(0,2).map(e=>e[0]).join(``).toUpperCase()||`CX`}}var g=[{type:`order`,title:`New order #ORD-7891`,desc:`Emma Wilson · $299`,time:`2 min ago`,unread:!0},{type:`payment`,title:`Payment received`,desc:`$1,499 from Sofia Garcia`,time:`2 hours ago`,unread:!0},{type:`customer`,title:`New customer registered`,desc:`James Chen`,time:`3 hours ago`,unread:!0},{type:`system`,title:`Backup completed`,desc:`Nightly backup finished`,time:`6 hours ago`,unread:!1}],_={order:{icon:`shopping-cart`,color:`text-chart-1`,bg:`bg-chart-1/10`},payment:{icon:`credit-card`,color:`text-chart-2`,bg:`bg-chart-2/10`},customer:{icon:`users`,color:`text-chart-3`,bg:`bg-chart-3/10`},system:{icon:`settings`,color:`text-chart-4`,bg:`bg-chart-4/10`}},v=class extends HTMLElement{connectedCallback(){let e=g.filter(e=>e.unread).length,t=getContexHeaderUser();this.innerHTML=`
      <div class="sticky top-0 z-30">
        <header class="flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-xl sm:px-6">
          <!-- Left -->
          <div class="flex items-center gap-3">
            <button type="button" data-open-sidebar aria-label="Open menu"
              class="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:hidden">
              <i data-lucide="menu" class="h-5 w-5"></i>
            </button>
            <button type="button"
              class="relative hidden h-9 w-72 items-center rounded-lg border border-input bg-muted/40 ps-9 pe-4 text-start text-sm text-muted-foreground/50 transition-colors hover:bg-muted/60 sm:flex">
              <i data-lucide="search" class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60"></i>
              Search...
              <kbd class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground">⌘K</kbd>
            </button>
          </div>

          <!-- Right -->
          <div class="flex items-center gap-2">
            <a href="order-new.html" class="hidden h-8 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:inline-flex">
              <i data-lucide="plus" class="h-3.5 w-3.5"></i> New Order
            </a>

            <div class="mx-1 hidden h-6 w-px bg-border sm:block"></div>

            <button type="button" data-theme-toggle aria-label="Toggle theme"
              class="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
              <i data-lucide="moon" class="h-4 w-4 dark:hidden"></i>
              <i data-lucide="sun" class="hidden h-4 w-4 dark:block"></i>
            </button>

            <button type="button" data-open-customizer aria-label="Customize theme"
              class="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
              <i data-lucide="palette" class="h-4 w-4"></i>
            </button>

            <!-- Notifications -->
            <div class="relative" data-dropdown>
              <button type="button" data-dropdown-trigger aria-label="Notifications" aria-expanded="false"
                class="relative flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                <i data-lucide="bell" class="h-4 w-4"></i>
                ${e>0?`<span class="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive"></span>`:``}
              </button>
              <div data-dropdown-panel hidden
                class="absolute end-0 mt-2 w-80 origin-top-right rounded-xl border border-border bg-popover p-0 text-popover-foreground shadow-xl">
                <div class="flex items-center justify-between border-b border-border px-4 py-3">
                  <div class="flex items-center gap-2">
                    <p class="text-sm font-semibold">Notifications</p>
                    ${e>0?`<span class="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/15 px-1.5 text-[10px] font-semibold text-primary">${e}</span>`:``}
                  </div>
                  <button type="button" class="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground">
                    <i data-lucide="check-check" class="h-3 w-3"></i> Mark all read
                  </button>
                </div>
                <div class="max-h-80 overflow-y-auto">
                  ${g.map(e=>{let t=_[e.type];return`
                    <a href="notifications.html" class="flex w-full items-start gap-3 px-4 py-3 text-start transition-colors hover:bg-accent/50 ${e.unread?`bg-primary/5`:``}">
                      <div class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${t.bg}">
                        <i data-lucide="${t.icon}" class="h-3.5 w-3.5 ${t.color}"></i>
                      </div>
                      <div class="min-w-0 flex-1">
                        <p class="truncate text-sm ${e.unread?`font-semibold`:`font-medium text-muted-foreground`}">${e.title}</p>
                        <p class="mt-0.5 truncate text-xs text-muted-foreground">${e.desc}</p>
                        <p class="mt-1 text-[10px] text-muted-foreground/60">${e.time}</p>
                      </div>
                    </a>`}).join(``)}
                </div>
                <div class="border-t border-border">
                  <a href="notifications.html" class="flex items-center justify-center py-2.5 text-xs font-medium text-primary transition-colors hover:text-primary/80">View all</a>
                </div>
              </div>
            </div>

            <!-- User menu -->
            <div class="relative" data-dropdown>
              <button type="button" data-dropdown-trigger aria-label="User menu" aria-expanded="false"
                class="ms-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary transition-colors hover:bg-primary/20">${t.initials}</button>
              <div data-dropdown-panel hidden
                class="absolute end-0 mt-2 w-48 origin-top-right rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-xl">
                <div class="px-2 py-1.5">
                  <p class="text-sm font-medium">${t.name}</p>
                  <p class="text-xs text-muted-foreground">${t.email}</p>
                </div>
                <div class="my-1 h-px bg-border"></div>
                <a href="settings.html" class="flex items-center rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent">
                  <i data-lucide="settings" class="me-2 h-4 w-4"></i> Settings
                </a>
                <a href="notifications.html" class="flex items-center rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent">
                  <i data-lucide="bell" class="me-2 h-4 w-4"></i> Notifications
                </a>
                <div class="my-1 h-px bg-border"></div>
                <a href="#" data-header-logout class="flex items-center rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent">
                  <i data-lucide="log-out" class="me-2 h-4 w-4"></i> Log out
                </a>
              </div>
            </div>
          </div>
        </header>
      </div>`,this.wire(),o()}wire(){this.querySelector(`[data-open-sidebar]`)?.addEventListener(`click`,()=>{document.documentElement.dataset.mobileOpen=`true`}),this.querySelector(`[data-theme-toggle]`)?.addEventListener(`click`,a);let e=[...this.querySelectorAll(`[data-dropdown]`)];e.forEach(t=>{let n=t.querySelector(`[data-dropdown-trigger]`),r=t.querySelector(`[data-dropdown-panel]`);n.addEventListener(`click`,t=>{t.stopPropagation();let i=r.hasAttribute(`hidden`);e.forEach(e=>{e.querySelector(`[data-dropdown-panel]`).setAttribute(`hidden`,``),e.querySelector(`[data-dropdown-trigger]`).setAttribute(`aria-expanded`,`false`)}),i&&(r.removeAttribute(`hidden`),n.setAttribute(`aria-expanded`,`true`))}),r.addEventListener(`click`,e=>e.stopPropagation())});let t=()=>e.forEach(e=>{e.querySelector(`[data-dropdown-panel]`).setAttribute(`hidden`,``),e.querySelector(`[data-dropdown-trigger]`).setAttribute(`aria-expanded`,`false`)});document.addEventListener(`click`,t),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&t()}),this.querySelector(`[data-header-logout]`)?.addEventListener(`click`,e=>{e.preventDefault(),window.dispatchEvent(new CustomEvent(`contex:logout`))})}};customElements.define(`apex-header`,v);var y=`modulepreload`,ee=function(e){return`/apex-html/`+e},b={},x=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,new URL(`../../../src/node/plugins/importAnalysisBuild.ts`,import.meta.url)).href}r=o(t.map(t=>{if(t=ee(t,n),t=s(t),t in b)return;b[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:y,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},S;function C(){return S??=x(()=>import(`./apexcharts.esm-CE935-V-.js`).then(e=>e.default),[])}var w=[{title:`Total Revenue`,value:`$48,295`,change:12.5,changeLabel:`vs last month`,iconType:`revenue`,sparkline:[28,32,25,35,30,38,42,36,45,40,48,52]},{title:`Active Users`,value:`2,847`,change:8.2,changeLabel:`vs last month`,iconType:`users`,sparkline:[18,22,20,25,23,28,24,30,27,32,29,34]},{title:`Total Orders`,value:`1,432`,change:-3.1,changeLabel:`vs last month`,iconType:`orders`,sparkline:[22,25,28,24,20,23,18,21,19,17,20,18]},{title:`Page Views`,value:`284K`,change:24.7,changeLabel:`vs last month`,iconType:`views`,sparkline:[120,135,128,145,160,155,170,185,195,210,230,250]}],T=[{month:`Jan`,revenue:18400,orders:245,profit:6200},{month:`Feb`,revenue:22100,orders:312,profit:8100},{month:`Mar`,revenue:19800,orders:278,profit:7200},{month:`Apr`,revenue:28300,orders:389,profit:11400},{month:`May`,revenue:32100,orders:421,profit:13200},{month:`Jun`,revenue:29500,orders:385,profit:11800},{month:`Jul`,revenue:35800,orders:467,profit:15600},{month:`Aug`,revenue:38200,orders:498,profit:16800},{month:`Sep`,revenue:41500,orders:534,profit:18200},{month:`Oct`,revenue:39800,orders:512,profit:17100},{month:`Nov`,revenue:44200,orders:578,profit:19800},{month:`Dec`,revenue:48295,orders:612,profit:22100}],E=[{name:`Direct`,value:35,color:`var(--chart-1)`},{name:`Organic`,value:28,color:`var(--chart-2)`},{name:`Referral`,value:22,color:`var(--chart-3)`},{name:`Social`,value:15,color:`var(--chart-5)`}],D=[{label:`Monthly Revenue`,current:48295,target:55e3,color:`bg-chart-1`},{label:`New Customers`,current:847,target:1e3,color:`bg-chart-2`},{label:`Conversion Rate`,current:3.8,target:5,color:`bg-chart-3`}],te=[{id:`act-1`,iconType:`order`,title:`New order placed`,description:`Emma Wilson purchased Pro Dashboard License`,time:`2 min ago`},{id:`act-2`,iconType:`customer`,title:`New customer registered`,description:`James Chen created an account`,time:`15 min ago`},{id:`act-3`,iconType:`review`,title:`5-star review received`,description:`"Amazing template, exactly what I needed!"`,time:`1 hour ago`},{id:`act-4`,iconType:`payment`,title:`Payment received`,description:`$1,499 from Sofia Garcia`,time:`2 hours ago`},{id:`act-5`,iconType:`support`,title:`Support ticket resolved`,description:`Ticket #4521 marked as resolved`,time:`3 hours ago`},{id:`act-6`,iconType:`order`,title:`New order placed`,description:`Alex Thompson purchased Single License`,time:`5 hours ago`}],O=[{id:`ORD-7891`,customerName:`Emma Wilson`,customerEmail:`emma@example.com`,customerInitials:`EW`,productName:`Pro Dashboard License`,amount:299,status:`completed`},{id:`ORD-7890`,customerName:`James Chen`,customerEmail:`james@company.io`,customerInitials:`JC`,productName:`Team Plan Upgrade`,amount:599,status:`processing`},{id:`ORD-7889`,customerName:`Sofia Garcia`,customerEmail:`sofia@startup.co`,customerInitials:`SG`,productName:`Enterprise License`,amount:1499,status:`completed`},{id:`ORD-7888`,customerName:`Alex Thompson`,customerEmail:`alex@dev.com`,customerInitials:`AT`,productName:`Single License`,amount:79,status:`pending`},{id:`ORD-7887`,customerName:`Maria Santos`,customerEmail:`maria@agency.co`,customerInitials:`MS`,productName:`Pro Dashboard License`,amount:299,status:`completed`},{id:`ORD-7886`,customerName:`David Kim`,customerEmail:`david@tech.io`,customerInitials:`DK`,productName:`Team Plan Upgrade`,amount:599,status:`cancelled`},{id:`ORD-7885`,customerName:`Lisa Park`,customerEmail:`lisa@design.co`,customerInitials:`LP`,productName:`Pro Dashboard License`,amount:299,status:`completed`},{id:`ORD-7884`,customerName:`Ryan Mitchell`,customerEmail:`ryan@startup.io`,customerInitials:`RM`,productName:`Enterprise License`,amount:1499,status:`completed`}];function k(e=6){return O.slice(0,e)}function A(e){return getComputedStyle(document.documentElement).getPropertyValue(e).trim()}function j(){return{chart1:A(`--chart-1`),chart2:A(`--chart-2`),chart3:A(`--chart-3`),chart4:A(`--chart-4`),chart5:A(`--chart-5`),border:A(`--border`),muted:A(`--muted`),mutedForeground:A(`--muted-foreground`),foreground:A(`--foreground`),background:A(`--background`),popover:A(`--popover`)}}function M(){let e=j();return{chart:{fontFamily:`inherit`,foreColor:e.mutedForeground,toolbar:{show:!1},zoom:{enabled:!1},animations:{enabled:!0,speed:400}},grid:{borderColor:e.border,strokeDashArray:4,xaxis:{lines:{show:!1}}},tooltip:{theme:document.documentElement.classList.contains(`dark`)?`dark`:`light`},dataLabels:{enabled:!1},legend:{show:!1}}}function N(e,t,n){let r=e.getAttribute(t);if(!r)return n;try{return JSON.parse(r)}catch{return console.warn(`[apex] invalid JSON in ${t}; using fallback data`),n}}var P={revenue:{icon:`dollar-sign`,color:`text-chart-1`,bg:`bg-chart-1/10`,varName:`--chart-1`},users:{icon:`users`,color:`text-chart-2`,bg:`bg-chart-2/10`,varName:`--chart-2`},orders:{icon:`shopping-cart`,color:`text-chart-3`,bg:`bg-chart-3/10`,varName:`--chart-3`},views:{icon:`eye`,color:`text-chart-4`,bg:`bg-chart-4/10`,varName:`--chart-4`}},F=class extends HTMLElement{connectedCallback(){this.charts=[],this.stats=N(this,`data-stats`,w),this.innerHTML=`
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        ${this.stats.map((e,t)=>{let n=P[e.iconType],r=e.change>0;return`
          <div class="group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-md"
               style="animation: slide-in-up 0.4s ease-out backwards; animation-delay: ${t*80}ms;">
            <div class="p-5 pb-0">
              <div class="flex items-start justify-between">
                <div class="space-y-2">
                  <p class="text-xs font-medium text-muted-foreground">${e.title}</p>
                  <p class="text-2xl font-bold tracking-tight">${e.value}</p>
                  <div class="flex items-center gap-1.5">
                    <i data-lucide="${r?`trending-up`:`trending-down`}" class="h-3.5 w-3.5 ${r?`text-success`:`text-destructive`}"></i>
                    <span class="text-xs font-semibold ${r?`text-success`:`text-destructive`}">${r?`+`:``}${e.change}%</span>
                    <span class="text-xs text-muted-foreground">${e.changeLabel}</span>
                  </div>
                </div>
                <div class="flex h-10 w-10 items-center justify-center rounded-xl ${n.bg} transition-transform duration-300 group-hover:scale-110">
                  <i data-lucide="${n.icon}" class="h-5 w-5 ${n.color}"></i>
                </div>
              </div>
            </div>
            <div class="h-12 w-full" data-spark="${e.iconType}"></div>
          </div>`}).join(``)}
      </div>`,o(),this.renderSparklines(),this.unsub=e(()=>this.retheme())}disconnectedCallback(){this.charts.forEach(e=>e.destroy()),this.unsub?.()}async renderSparklines(){let e=await C();this.isConnected&&this.stats.forEach(t=>{let n=this.querySelector(`[data-spark="${t.iconType}"]`),r=A(P[t.iconType].varName),i=new e(n,{chart:{type:`area`,height:48,sparkline:{enabled:!0},animations:{enabled:!0}},series:[{name:t.title,data:t.sparkline}],stroke:{curve:`smooth`,width:1.5},colors:[r],fill:{type:`gradient`,gradient:{shadeIntensity:1,opacityFrom:.2,opacityTo:0,stops:[0,100]}},tooltip:{enabled:!1}});i.render(),i._varName=P[t.iconType].varName,this.charts.push(i)})}retheme(){this.charts.forEach(e=>e.updateOptions({colors:[A(e._varName)]},!1,!1))}};customElements.define(`apex-stats-cards`,F);var I=[`Revenue`,`Orders`,`Profit`],L=class extends HTMLElement{connectedCallback(){this.active=`Revenue`,this.data=N(this,`data-series`,T),this.innerHTML=`
      <div class="col-span-full rounded-xl border bg-card text-card-foreground shadow-sm xl:col-span-8">
        <div class="flex flex-row items-center justify-between p-6 pb-2">
          <div>
            <h3 class="text-base font-semibold">Overview</h3>
            <p class="mt-0.5 text-xs text-muted-foreground">Monthly performance for the current year</p>
          </div>
          <div class="flex items-center gap-1 rounded-lg bg-muted p-0.5" data-tabs>
            ${I.map(e=>`
              <button type="button" data-tab="${e}"
                class="rounded-md px-3 py-1.5 text-xs font-medium transition-all ${e===this.active?`bg-background text-foreground shadow-sm`:`text-muted-foreground hover:text-foreground`}">${e}</button>
            `).join(``)}
          </div>
        </div>
        <div class="p-6 pt-4">
          <div data-chart class="h-[320px] w-full"></div>
        </div>
      </div>`,this.chartEl=this.querySelector(`[data-chart]`),C().then(e=>{this.isConnected&&(this.chart=new e(this.chartEl,this.optionsFor(this.active)),this.chart.render())}),this.querySelectorAll(`[data-tab]`).forEach(e=>e.addEventListener(`click`,()=>this.setTab(e.dataset.tab))),this.unsub=e(()=>{this.chart?.updateOptions(this.optionsFor(this.active),!0,!1)})}disconnectedCallback(){this.chart?.destroy(),this.unsub?.()}setTab(e){e!==this.active&&(this.active=e,this.querySelectorAll(`[data-tab]`).forEach(t=>{t.className=`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${t.dataset.tab===e?`bg-background text-foreground shadow-sm`:`text-muted-foreground hover:text-foreground`}`}),this.chart?.updateOptions(this.optionsFor(e),!0,!0))}optionsFor(e){let t=M(),n=e.toLowerCase(),r=this.data.map(e=>e[n]),i=this.data.map(e=>e.month);if(e===`Orders`)return{...t,chart:{...t.chart,type:`bar`,height:320},series:[{name:`Orders`,data:r}],colors:[A(`--chart-3`)],plotOptions:{bar:{borderRadius:6,columnWidth:`55%`,borderRadiusApplication:`end`}},xaxis:{categories:i,axisBorder:{show:!1},axisTicks:{show:!1}},yaxis:{labels:{style:{fontSize:`12px`}}},fill:{opacity:1},tooltip:{...t.tooltip,y:{formatter:e=>`${e} orders`}}};let a=A(e===`Revenue`?`--chart-1`:`--chart-2`);return{...t,chart:{...t.chart,type:`area`,height:320},series:[{name:e,data:r}],colors:[a],stroke:{curve:`smooth`,width:2},fill:{type:`gradient`,gradient:{shadeIntensity:1,opacityFrom:.25,opacityTo:0,stops:[0,100]}},xaxis:{categories:i,axisBorder:{show:!1},axisTicks:{show:!1}},yaxis:{labels:{formatter:e=>`$${(e/1e3).toFixed(0)}k`,style:{fontSize:`12px`}}},markers:{size:0,hover:{size:5}},tooltip:{...t.tooltip,y:{formatter:e=>`$${e.toLocaleString()}`}}}}};customElements.define(`apex-revenue-chart`,L);var R=[`--chart-1`,`--chart-2`,`--chart-3`,`--chart-5`],z=class extends HTMLElement{connectedCallback(){this.traffic=N(this,`data-traffic`,E),this.goals=N(this,`data-goals`,D),this.innerHTML=`
      <div class="col-span-full flex flex-col gap-4 xl:col-span-4">
        <!-- Traffic -->
        <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div class="p-6 pb-2">
            <h3 class="text-base font-semibold">Traffic Sources</h3>
            <p class="text-xs text-muted-foreground">Where your visitors come from</p>
          </div>
          <div class="p-6 pt-0">
            <div class="flex items-center gap-4">
              <div class="relative h-36 w-36 shrink-0">
                <div data-donut class="h-full w-full"></div>
                <div class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span class="text-lg font-bold">284K</span>
                  <span class="text-[10px] text-muted-foreground">Visits</span>
                </div>
              </div>
              <div class="flex-1 space-y-3">
                ${this.traffic.map((e,t)=>`
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <span class="h-2.5 w-2.5 rounded-full" style="background-color: var(${R[t]})"></span>
                      <span class="text-xs text-muted-foreground">${e.name}</span>
                    </div>
                    <span class="text-xs font-semibold">${e.value}%</span>
                  </div>`).join(``)}
              </div>
            </div>
          </div>
        </div>

        <!-- Goals -->
        <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div class="p-6 pb-2">
            <h3 class="text-base font-semibold">Monthly Goals</h3>
            <p class="text-xs text-muted-foreground">Track progress toward targets</p>
          </div>
          <div class="space-y-5 p-6 pt-0">
            ${this.goals.map(e=>{let t=Math.round(e.current/e.target*100),n=e=>typeof e==`number`&&e>100?e.toLocaleString():e;return`
              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-medium text-foreground">${e.label}</span>
                  <span class="text-muted-foreground">${t}%</span>
                </div>
                <div class="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div class="h-full rounded-full ${e.color}" style="width: ${t}%"></div>
                </div>
                <div class="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>${n(e.current)}</span>
                  <span>Target: ${n(e.target)}</span>
                </div>
              </div>`}).join(``)}
          </div>
        </div>
      </div>`,this.renderDonut(),this.unsub=e(()=>this.retheme())}disconnectedCallback(){this.chart?.destroy(),this.unsub?.()}donutColors(){return this.traffic.map((e,t)=>A(R[t%R.length]))}async renderDonut(){let e=await C();this.isConnected&&(this.chart=new e(this.querySelector(`[data-donut]`),{chart:{type:`donut`,height:144,fontFamily:`inherit`},series:this.traffic.map(e=>e.value),labels:this.traffic.map(e=>e.name),colors:this.donutColors(),stroke:{width:0},plotOptions:{pie:{donut:{size:`62%`},expandOnClick:!1}},dataLabels:{enabled:!1},legend:{show:!1},tooltip:{theme:document.documentElement.classList.contains(`dark`)?`dark`:`light`,y:{formatter:e=>`${e}%`}}}),this.chart.render())}retheme(){this.chart?.updateOptions({colors:this.donutColors(),tooltip:{theme:document.documentElement.classList.contains(`dark`)?`dark`:`light`}},!1,!1)}};customElements.define(`apex-side-panel`,z);var B={completed:`bg-success/15 text-success`,processing:`bg-primary/15 text-primary`,pending:`bg-warning/15 text-warning`,cancelled:`bg-destructive/15 text-destructive`},V=[`from-chart-1/70 to-chart-1`,`from-chart-2/70 to-chart-2`,`from-chart-3/70 to-chart-3`,`from-chart-4/70 to-chart-4`,`from-chart-5/70 to-chart-5`],H=class extends HTMLElement{connectedCallback(){let e=N(this,`data-orders`,k(6));this.innerHTML=`
      <div class="col-span-full rounded-xl border bg-card text-card-foreground shadow-sm xl:col-span-8">
        <div class="flex flex-row items-center justify-between p-6 pb-4">
          <div>
            <h3 class="text-base font-semibold">Recent Orders</h3>
            <p class="mt-0.5 text-xs text-muted-foreground">Latest transactions from your store</p>
          </div>
          <a href="/orders" class="flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80">
            View all <i data-lucide="arrow-up-right" class="h-3.5 w-3.5"></i>
          </a>
        </div>
        <div class="p-6 pt-0">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-border">
                  <th class="pb-3 text-start text-xs font-medium text-muted-foreground">Customer</th>
                  <th class="pb-3 text-start text-xs font-medium text-muted-foreground">Order ID</th>
                  <th class="pb-3 text-start text-xs font-medium text-muted-foreground">Product</th>
                  <th class="pb-3 text-start text-xs font-medium text-muted-foreground">Status</th>
                  <th class="pb-3 text-end text-xs font-medium text-muted-foreground">Amount</th>
                  <th class="pb-3 text-end text-xs font-medium text-muted-foreground"><span class="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                ${e.map((e,t)=>`
                  <tr class="group border-b border-border/50 transition-colors last:border-0 hover:bg-muted/30">
                    <td class="py-3.5">
                      <div class="flex items-center gap-3">
                        <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${V[t%V.length]} text-[10px] font-bold text-white">${e.customerInitials}</div>
                        <div>
                          <p class="text-sm font-medium">${e.customerName}</p>
                          <p class="text-xs text-muted-foreground">${e.customerEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td class="py-3.5"><span class="font-mono text-xs text-muted-foreground">${e.id}</span></td>
                    <td class="py-3.5"><span class="text-sm">${e.productName}</span></td>
                    <td class="py-3.5">
                      <span class="inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium capitalize ${B[e.status]}">${e.status}</span>
                    </td>
                    <td class="py-3.5 text-end"><span class="text-sm font-semibold">$${e.amount.toLocaleString(`en-US`,{minimumFractionDigits:2})}</span></td>
                    <td class="py-3.5 text-end">
                      <button type="button" class="rounded-md p-1 text-muted-foreground opacity-0 transition-all hover:bg-accent group-hover:opacity-100">
                        <i data-lucide="more-horizontal" class="h-4 w-4"></i>
                      </button>
                    </td>
                  </tr>`).join(``)}
              </tbody>
            </table>
          </div>
        </div>
      </div>`,o()}};customElements.define(`apex-orders-table`,H);var ne={order:{icon:`shopping-cart`,color:`text-chart-1`,bg:`bg-chart-1/10`},customer:{icon:`user-plus`,color:`text-chart-2`,bg:`bg-chart-2/10`},review:{icon:`star`,color:`text-chart-5`,bg:`bg-chart-5/10`},payment:{icon:`credit-card`,color:`text-chart-3`,bg:`bg-chart-3/10`},support:{icon:`message-square`,color:`text-chart-4`,bg:`bg-chart-4/10`}},U=class extends HTMLElement{connectedCallback(){let e=N(this,`data-activities`,te);this.innerHTML=`
      <div class="col-span-full rounded-xl border bg-card text-card-foreground shadow-sm xl:col-span-4">
        <div class="flex flex-row items-center justify-between p-6 pb-4">
          <div>
            <h3 class="text-base font-semibold">Recent Activity</h3>
            <p class="mt-0.5 text-xs text-muted-foreground">Latest events from your store</p>
          </div>
          <a href="/notifications" class="flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80">
            View all <i data-lucide="arrow-up-right" class="h-3.5 w-3.5"></i>
          </a>
        </div>
        <div class="p-6 pt-0">
          <div class="space-y-0">
            ${e.map(e=>{let t=ne[e.iconType];return`
              <div class="group flex gap-3 rounded-lg px-2 py-3 transition-colors hover:bg-muted/30">
                <div class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${t.bg}">
                  <i data-lucide="${t.icon}" class="h-4 w-4 ${t.color}"></i>
                </div>
                <div class="flex-1 space-y-0.5">
                  <p class="text-sm font-medium leading-snug">${e.title}</p>
                  <p class="text-xs leading-snug text-muted-foreground">${e.description}</p>
                  <p class="text-[11px] text-muted-foreground/60">${e.time}</p>
                </div>
              </div>`}).join(``)}
          </div>
        </div>
      </div>`,o()}};customElements.define(`apex-activity-feed`,U);var W={currency:e=>`$${Number(e).toLocaleString()}`,compact:e=>{let t=Number(e);return Math.abs(t)>=1e3?`$${(t/1e3).toFixed(0)}k`:`$${t}`},percent:e=>`${e}%`,number:e=>Number(e).toLocaleString()},G=class extends HTMLElement{connectedCallback(){let t=this.querySelector(`script[type="application/json"]`);if(t){try{this.data=JSON.parse(t.textContent)}catch{return}this.render_(),this.unsub=e(()=>{this.chart?.destroy(),this.render_()})}}disconnectedCallback(){this.chart?.destroy(),this.unsub?.()}attr(e,t){return this.getAttribute(e)??t}colors_(){return this.attr(`data-colors`,`chart-1`).split(`,`).map(e=>A(`--${e.trim()}`))}options_(){let e=this.attr(`data-type`,`area`),t=Number(this.attr(`data-height`,`300`)),n=this.attr(`data-sparkline`,`false`)===`true`||t<=64&&(e===`area`||e===`line`),r=this.attr(`data-horizontal`,`false`)===`true`,i=this.attr(`data-stacked`,`false`)===`true`,a=this.attr(`data-curve`,`smooth`),o=this.getAttribute(`data-y-format`),s=o&&W[o],c=M(),l=this.data,u={...c,chart:{...c.chart,type:e,height:t,stacked:i},series:l.series,colors:this.colors_()};return[`donut`,`pie`,`radialBar`].includes(e)?(u.labels=l.labels||[],u.stroke={width:0},u.legend={show:!0,position:`bottom`,labels:{colors:A(`--muted-foreground`)}},e===`donut`&&(u.plotOptions={pie:{donut:{size:`62%`}}}),s&&(u.tooltip={...c.tooltip,y:{formatter:s}}),u):e===`radar`?(u.xaxis={categories:l.categories||[]},u.stroke={width:2},u.fill={opacity:.15},u.markers={size:3},u):n?(u.chart.sparkline={enabled:!0},u.tooltip={enabled:!1},u.stroke={curve:a,width:1.5},e===`area`&&(u.fill={type:`gradient`,gradient:{shadeIntensity:1,opacityFrom:.2,opacityTo:0,stops:[0,100]}}),u):(u.xaxis={categories:l.categories||[],axisBorder:{show:!1},axisTicks:{show:!1}},e===`area`?(u.stroke={curve:a,width:2},u.fill={type:`gradient`,gradient:{shadeIntensity:1,opacityFrom:.25,opacityTo:0,stops:[0,100]}}):e===`line`?(u.stroke={curve:a,width:2},u.markers={size:0,hover:{size:5}}):e===`bar`&&(u.plotOptions={bar:{horizontal:r,borderRadius:6,columnWidth:`55%`,borderRadiusApplication:`end`}},u.fill={opacity:1}),s&&(r?u.xaxis.labels={formatter:s}:u.yaxis={labels:{formatter:s}},u.tooltip={...c.tooltip,y:{formatter:s}}),u)}async render_(){this.mount_||(this.mount_=document.createElement(`div`),this.appendChild(this.mount_));let e=await C();this.isConnected&&(this.chart=new e(this.mount_,this.options_()),this.chart.render())}};customElements.define(`apex-chart`,G);var K={success:`bg-success/15 text-success`,default:`bg-primary/15 text-primary`,primary:`bg-primary/15 text-primary`,warning:`bg-warning/15 text-warning`,destructive:`bg-destructive/15 text-destructive`,secondary:`bg-secondary text-secondary-foreground`,outline:`border border-border text-foreground`},q=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),J=(e,t)=>e.replace(/\{(\w+)\}/g,(e,n)=>t[n]??``),Y=(e,t=2)=>`$`+Number(e).toLocaleString(`en-US`,{minimumFractionDigits:t,maximumFractionDigits:t}),X=e=>e===`end`?`text-end`:e===`center`?`text-center`:`text-start`;function Z(e){if(!Array.isArray(e)||e.length<2)return``;let t=Math.min(...e),n=Math.max(...e)-t||1;return`<svg width="80" height="28" viewBox="0 0 80 28" fill="none" class="overflow-visible"><polyline points="${e.map((r,i)=>`${(i/(e.length-1)*80).toFixed(1)},${(28-(r-t)/n*28).toFixed(1)}`).join(` `)}" stroke="${e[e.length-1]>=e[0]?`var(--success)`:`var(--destructive)`}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}var re=class extends HTMLElement{connectedCallback(){let e=this.querySelector(`script[type="application/json"]`);e&&(this.cfg=JSON.parse(e.textContent),this.idKey=this.cfg.idKey||`id`,this.rows=[...this.cfg.rows||[]],this.cols=this.cfg.columns||[],this.selectable=this.getAttribute(`data-selectable`)===`true`,this.rowHref=this.getAttribute(`data-row-href`),this.exportName=this.getAttribute(`data-export`),this.searchPlaceholder=this.getAttribute(`data-search`)||`Search...`,this.state={search:``,sort:{key:null,dir:`asc`},filter:this.cfg.filter?this.cfg.filter.tabs[0].value:null,page:0,pageSize:Number(this.getAttribute(`data-page-size`))||10,selected:new Set},this.searchCols=this.cols.filter(e=>e.search).map(e=>e.key),this.renderShell(),this.renderTable(),this.renderPager(),this.bind(),o())}computeRows(){let e=this.rows,{filter:t,search:n,sort:r}=this.state;if(this.cfg.filter&&t&&t!==`all`&&(e=e.filter(e=>e[this.cfg.filter.key]===t)),n){let t=n.toLowerCase();e=e.filter(e=>this.searchCols.some(n=>String(e[n]??``).toLowerCase().includes(t)))}if(r.key){let t=r.dir===`asc`?1:-1;e=[...e].sort((e,n)=>{let i=e[r.key],a=n[r.key];return typeof i==`number`&&typeof a==`number`?(i-a)*t:String(i??``).localeCompare(String(a??``))*t})}this.filtered=e;let i=this.state.page*this.state.pageSize;return e.slice(i,i+this.state.pageSize)}renderShell(){let e=this.cfg.filter?`<div class="flex items-center gap-1 rounded-lg bg-muted p-0.5" data-filtertabs>
          ${this.cfg.filter.tabs.map((e,t)=>`<button data-filter="${q(e.value)}" class="rounded-md px-3 py-1.5 text-xs font-medium transition-all ${t===0?`bg-background text-foreground shadow-sm`:`text-muted-foreground hover:text-foreground`}">${q(e.label)}</button>`).join(``)}
        </div>`:``,t=this.exportName?`<button data-csv-export class="apex-btn apex-btn-outline apex-btn-sm"><i data-lucide="download" class="size-3.5"></i> Export</button>`:``;this.innerHTML=`
      <div class="space-y-4">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex flex-1 flex-wrap items-center gap-2">
            <div class="relative w-full sm:w-64">
              <i data-lucide="search" class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60"></i>
              <input data-search-input type="search" placeholder="${q(this.searchPlaceholder)}" class="apex-input ps-9" />
            </div>
            ${e}
            <div data-bulkbar hidden class="flex items-center gap-2">
              <span class="text-sm text-muted-foreground"><span data-bulk-count>0</span> selected</span>
              <button data-bulk-delete class="apex-btn apex-btn-destructive apex-btn-sm"><i data-lucide="trash-2" class="size-3.5"></i> Delete</button>
            </div>
          </div>
          ${t}
        </div>
        <div class="rounded-md border">
          <div class="overflow-x-auto" data-table></div>
        </div>
        <div data-pager></div>
      </div>`}headCell(e){let t=X(e.align);if(e.sortable){let n=this.state.sort,r=n.key===e.key?n.dir===`asc`?`arrow-up`:`arrow-down`:`chevrons-up-down`,i=n.key===e.key?`text-foreground`:`text-muted-foreground/40`,a=e.align===`end`?`justify-end`:e.align===`center`?`justify-center`:``;return`<th class="px-4 py-3 ${t} text-xs font-medium text-muted-foreground ${e.className||``}">
        <button data-sort="${q(e.key)}" class="inline-flex items-center gap-1.5 ${a} hover:text-foreground transition-colors">
          ${q(e.label)}<i data-lucide="${r}" class="size-3.5 ${i}"></i>
        </button></th>`}return`<th class="px-4 py-3 ${t} text-xs font-medium text-muted-foreground ${e.className||``}">${q(e.label||``)}</th>`}cell(e,t){let n=X(e.align),r=(t,r=``)=>`<td class="px-4 py-3 ${n} ${e.className||``} ${r}">${t}</td>`;switch(e.type){case`mono`:return r(`<span class="font-mono text-sm font-medium">${q(t[e.key])}</span>`);case`currency`:return r(`<span class="font-semibold">${Y(t[e.key],e.fraction??2)}</span>`);case`number`:return r(`<span class="text-sm">${q(Number(t[e.key]).toLocaleString())}</span>`);case`date`:return r(`<span class="text-sm text-muted-foreground">${q(t[e.key])}</span>`);case`badge`:{let n=e.variant||(e.map?e.map[t[e.key]]:`default`)||`default`;return r(`<span class="inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium ${e.capitalize===!1?``:`capitalize`} ${K[n]||K.default}">${q(t[e.key])}</span>`)}case`sparkline`:return r(Z(t[e.key]));case`entity`:{let n=q(t[e.titleKey]),i=e.subKey?`<p class="text-xs text-muted-foreground">${q(t[e.subKey])}</p>`:``,a=``;return e.icon?a=`<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted"><i data-lucide="${q(e.icon)}" class="h-5 w-5 text-muted-foreground"></i></div>`:e.initialsKey&&(a=`<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">${q(t[e.initialsKey])}</div>`),r(`<div class="flex items-center ${a?`gap-2.5`:``}">${a}<div class="min-w-0"><p class="truncate text-sm font-medium">${n}</p>${i}</div></div>`)}case`actions`:{let n=(e.actions||[]).filter(e=>!(e.hideWhen&&t[e.hideWhen.key]===e.hideWhen.value));return e.style===`inline`?r(`<div class="flex items-center justify-end gap-1" data-no-rowclick>${n.map(e=>{let n=`apex-btn apex-btn-ghost h-8 w-8 px-0 ${e.variant===`destructive`?`text-destructive hover:text-destructive`:``}`,r=`<i data-lucide="${q(e.icon)}" class="h-4 w-4"></i><span class="sr-only">${q(e.label)}</span>`;return e.href?`<a href="${q(J(e.href,t))}" class="${n}">${r}</a>`:`<button type="button" data-act="${q(e.action)}" data-id="${q(t[this.idKey])}" class="${n}">${r}</button>`}).join(``)}</div>`):r(`<div class="relative inline-block text-start" data-no-rowclick>
            <button type="button" data-action-trigger class="apex-btn apex-btn-ghost h-8 w-8 px-0"><i data-lucide="more-horizontal" class="h-4 w-4"></i><span class="sr-only">Actions</span></button>
            <div data-action-menu hidden class="absolute end-0 z-20 mt-1 w-36 rounded-lg border border-border bg-popover p-1 shadow-xl">${n.map(e=>{let n=`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent ${e.variant===`destructive`?`text-destructive`:``}`,r=`<i data-lucide="${q(e.icon)}" class="h-4 w-4"></i>${q(e.label)}`;return e.href?`<a href="${q(J(e.href,t))}" class="${n}">${r}</a>`:`<button type="button" data-act="${q(e.action)}" data-id="${q(t[this.idKey])}" class="${n}">${r}</button>`}).join(``)}</div>
          </div>`)}default:return r(`<span class="text-sm">${q(t[e.key])}</span>`)}}renderTable(){let e=this.computeRows(),t=`<tr class="border-b border-border bg-muted/30">${this.selectable?`<th class="w-10 px-4 py-3"><input type="checkbox" data-select-all class="apex-checkbox" aria-label="Select all" /></th>`:``}${this.cols.map(e=>this.headCell(e)).join(``)}</tr>`,n;n=e.length===0?`<tr><td colspan="${this.cols.length+ +!!this.selectable}" class="px-4 py-12 text-center text-sm text-muted-foreground">${q(this.cfg.emptyMessage||`No results found.`)}</td></tr>`:e.map(e=>{let t=e[this.idKey],n=this.state.selected.has(t),r=this.selectable?`<td class="px-4 py-3" data-no-rowclick><input type="checkbox" data-select="${q(t)}" class="apex-checkbox" ${n?`checked`:``} aria-label="Select row" /></td>`:``,i=this.rowHref?`cursor-pointer`:``;return`<tr data-row-id="${q(t)}" class="border-b border-border/50 transition-colors last:border-0 hover:bg-muted/30 ${n?`bg-muted/50`:``} ${i}">${r}${this.cols.map(t=>this.cell(t,e)).join(``)}</tr>`}).join(``),this.querySelector(`[data-table]`).innerHTML=`<table class="w-full text-sm"><thead>${t}</thead><tbody>${n}</tbody></table>`,this.syncSelectAll(),o()}renderPager(){let e=this.filtered.length,{page:t,pageSize:n}=this.state,r=Math.max(1,Math.ceil(e/n)),i=e===0?0:t*n+1,a=Math.min((t+1)*n,e),o=[10,20,50],s=(e,t=e,n=!1,r=!1)=>`<button data-page="${e}" ${r?`disabled`:``} class="apex-btn ${n?`apex-btn-primary`:`apex-btn-outline`} apex-btn-sm min-w-8 ${r?`opacity-50`:``}">${t}</button>`,c=[];if(r<=7)for(let e=1;e<=r;e++)c.push(e);else{c.push(1),t+1>3&&c.push(`…`);for(let e=Math.max(2,t);e<=Math.min(r-1,t+2);e++)c.push(e);t+1<r-2&&c.push(`…`),c.push(r)}let l=c.map(e=>e===`…`?`<span class="px-1 text-sm text-muted-foreground">…</span>`:s(e-1,e,e-1===t)).join(``);this.querySelector(`[data-pager]`).innerHTML=`
      <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p class="text-sm text-muted-foreground">Showing ${i}-${a} of ${e} results</p>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <span class="text-sm text-muted-foreground">Rows</span>
            <select data-rows class="apex-input h-8 w-[70px]">
              ${o.map(e=>`<option value="${e}" ${e===n?`selected`:``}>${e}</option>`).join(``)}
            </select>
          </div>
          <div class="flex items-center gap-1">
            ${s(t-1,`Previous`,!1,t===0)}
            <span class="hidden items-center gap-1 sm:flex">${l}</span>
            ${s(t+1,`Next`,!1,t>=r-1)}
          </div>
        </div>
      </div>`}syncSelectAll(){let e=this.querySelector(`[data-select-all]`);if(!e)return;let t=this.computeRowsIds(),n=t.filter(e=>this.state.selected.has(e)).length;e.checked=t.length>0&&n===t.length,e.indeterminate=n>0&&n<t.length}computeRowsIds(){let e=this.state.page*this.state.pageSize;return this.filtered.slice(e,e+this.state.pageSize).map(e=>e[this.idKey])}updateBulkBar(){let e=this.querySelector(`[data-bulkbar]`),t=this.state.selected.size;e.toggleAttribute(`hidden`,t===0),this.querySelector(`[data-bulk-count]`).textContent=t}refresh(){this.renderTable(),this.renderPager(),this.updateBulkBar()}bind(){this.querySelector(`[data-search-input]`).addEventListener(`input`,e=>{this.state.search=e.target.value,this.state.page=0,this.refresh()}),this.addEventListener(`change`,e=>{let t=e.target.closest(`[data-rows]`);t&&(this.state.pageSize=Number(t.value)||10,this.state.page=0,this.refresh())}),this.addEventListener(`click`,e=>{let t=e.target.closest(`[data-sort]`);if(t){let e=t.dataset.sort,n=this.state.sort;n.dir=n.key===e&&n.dir===`asc`?`desc`:`asc`,n.key=e,this.refresh();return}let n=e.target.closest(`[data-filter]`);if(n){this.state.filter=n.dataset.filter,this.state.page=0,this.querySelectorAll(`[data-filtertabs] [data-filter]`).forEach(e=>{let t=e===n;e.classList.toggle(`bg-background`,t),e.classList.toggle(`text-foreground`,t),e.classList.toggle(`shadow-sm`,t),e.classList.toggle(`text-muted-foreground`,!t)}),this.refresh();return}let r=e.target.closest(`[data-page]`);if(r&&!r.disabled){this.state.page=Number(r.dataset.page),this.refresh();return}if(e.target.closest(`[data-csv-export]`)){this.exportCsv();return}if(e.target.closest(`[data-bulk-delete]`)){this.rows=this.rows.filter(e=>!this.state.selected.has(e[this.idKey])),this.state.selected.clear(),this.refresh();return}if(e.target.closest(`[data-select-all]`)){let e=this.computeRowsIds(),t=e.every(e=>this.state.selected.has(e));e.forEach(e=>t?this.state.selected.delete(e):this.state.selected.add(e)),this.refresh();return}let i=e.target.closest(`[data-select]`);if(i){let e=i.dataset.select;this.state.selected.has(e)?this.state.selected.delete(e):this.state.selected.add(e),this.refresh();return}let a=e.target.closest(`[data-action-trigger]`);if(a){let e=a.nextElementSibling,t=e.hasAttribute(`hidden`);this.querySelectorAll(`[data-action-menu]`).forEach(e=>e.setAttribute(`hidden`,``)),t&&e.removeAttribute(`hidden`);return}let o=e.target.closest(`[data-act]`);if(o){o.dataset.act===`delete`&&(this.rows=this.rows.filter(e=>String(e[this.idKey])!==o.dataset.id),this.state.selected.delete(o.dataset.id),this.refresh());return}if(this.rowHref){let t=e.target.closest(`[data-row-id]`);if(t&&!e.target.closest(`[data-no-rowclick]`)&&!e.target.closest(`a`)){let e=this.rows.find(e=>String(e[this.idKey])===t.dataset.rowId);e&&(location.href=J(this.rowHref,e))}}}),document.addEventListener(`click`,e=>{e.target.closest(`[data-no-rowclick]`)||this.querySelectorAll(`[data-action-menu]`).forEach(e=>e.setAttribute(`hidden`,``))})}exportCsv(){let e=this.cols.filter(e=>![`actions`,`sparkline`].includes(e.type)&&e.label),t=e.map(e=>`"${e.label}"`).join(`,`),n=this.filtered.map(t=>e.map(e=>{let n=t[e.key];return`"${(n==null?``:String(n)).replace(/"/g,`""`)}"`}).join(`,`)),r=new Blob([[t,...n].join(`
`)],{type:`text/csv;charset=utf-8;`}),i=document.createElement(`a`);i.href=URL.createObjectURL(r),i.download=`${this.exportName||`export`}.csv`,i.click(),URL.revokeObjectURL(i.href)}};customElements.define(`apex-data-table`,re);var Q=`apex-accent`,$=`apex-radius`,ie=`apex-dir`,ae=`0.625rem`,oe=[{key:`teal`,color:`oklch(0.55 0.175 160)`},{key:`blue`,color:`oklch(0.55 0.175 255)`},{key:`violet`,color:`oklch(0.55 0.20 300)`},{key:`rose`,color:`oklch(0.58 0.22 15)`},{key:`green`,color:`oklch(0.60 0.17 150)`},{key:`amber`,color:`oklch(0.78 0.15 80)`}],se=[{key:`0rem`,label:`None`},{key:`0.375rem`,label:`Small`},{key:`0.625rem`,label:`Medium`},{key:`1rem`,label:`Large`}],ce=class extends HTMLElement{connectedCallback(){this.open=!1,this.render(),this.addEventListener(`click`,e=>this.onClick(e)),document.addEventListener(`click`,e=>{e.target.closest(`[data-open-customizer]`)&&(this.open=!0,this.render())}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&this.open&&(this.open=!1,this.render())})}state(){return{theme:n(),accent:localStorage.getItem(Q)||`teal`,radius:localStorage.getItem($)||ae,dir:document.documentElement.dir===`rtl`?`rtl`:`ltr`}}render(){let e=this.state(),t=e=>`apex-tab flex-1 justify-center ${e?`apex-tab-active`:``}`;this.innerHTML=`
      <div data-cust-overlay class="fixed inset-0 z-[60] bg-black/50 transition-opacity ${this.open?``:`pointer-events-none opacity-0`}"></div>
      <aside class="fixed inset-y-0 end-0 z-[61] flex w-80 max-w-[85vw] flex-col border-s border-border bg-card shadow-2xl transition-transform duration-300 ${this.open?`translate-x-0`:`translate-x-full`}" role="dialog" aria-label="Theme customizer">
        <div class="flex items-center justify-between border-b border-border p-4">
          <div>
            <h2 class="text-sm font-semibold">Customize</h2>
            <p class="text-xs text-muted-foreground">Personalize the look &amp; feel</p>
          </div>
          <button type="button" data-cust-close aria-label="Close" class="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"><i data-lucide="x" class="h-4 w-4"></i></button>
        </div>

        <div class="flex-1 space-y-6 overflow-y-auto p-4">
          <div class="space-y-2">
            <p class="text-xs font-medium text-muted-foreground">Theme</p>
            <div class="flex items-center gap-1 rounded-lg bg-muted p-1">
              <button type="button" data-cust-theme="light" class="${t(e.theme===`light`)}"><i data-lucide="sun" class="h-4 w-4"></i> Light</button>
              <button type="button" data-cust-theme="dark" class="${t(e.theme===`dark`)}"><i data-lucide="moon" class="h-4 w-4"></i> Dark</button>
              <button type="button" data-cust-theme="system" class="${t(e.theme===`system`)}"><i data-lucide="settings" class="h-4 w-4"></i> Auto</button>
            </div>
          </div>

          <div class="space-y-2">
            <p class="text-xs font-medium text-muted-foreground">Accent color</p>
            <div class="flex flex-wrap gap-3">
              ${oe.map(t=>`<button type="button" data-cust-accent="${t.key}" title="${t.key}" aria-label="${t.key}" class="h-8 w-8 rounded-full ring-2 ring-offset-2 ring-offset-card transition-all ${t.key===e.accent?`ring-ring`:`ring-transparent hover:ring-border`}" style="background:${t.color}"></button>`).join(``)}
            </div>
          </div>

          <div class="space-y-2">
            <p class="text-xs font-medium text-muted-foreground">Border radius</p>
            <div class="flex items-center gap-1 rounded-lg bg-muted p-1">
              ${se.map(n=>`<button type="button" data-cust-radius="${n.key}" class="${t(e.radius===n.key)} px-2 text-xs">${n.label}</button>`).join(``)}
            </div>
          </div>

          <div class="space-y-2">
            <p class="text-xs font-medium text-muted-foreground">Direction</p>
            <div class="flex items-center gap-1 rounded-lg bg-muted p-1">
              <button type="button" data-cust-dir="ltr" class="${t(e.dir===`ltr`)}">LTR</button>
              <button type="button" data-cust-dir="rtl" class="${t(e.dir===`rtl`)}">RTL</button>
            </div>
          </div>
        </div>

        <div class="border-t border-border p-4">
          <button type="button" data-cust-reset class="apex-btn apex-btn-outline w-full"><i data-lucide="refresh-cw" class="h-4 w-4"></i> Reset to defaults</button>
        </div>
      </aside>`,o()}onClick(e){if(e.target.closest(`[data-cust-overlay]`)||e.target.closest(`[data-cust-close]`))return this.open=!1,this.render();let t=e.target.closest(`[data-cust-theme]`);if(t)return r(t.dataset.custTheme),this.render();let n=e.target.closest(`[data-cust-accent]`);if(n)return this.setAccent(n.dataset.custAccent),this.render();let i=e.target.closest(`[data-cust-radius]`);if(i)return this.setRadius(i.dataset.custRadius),this.render();let a=e.target.closest(`[data-cust-dir]`);if(a)return this.setDir(a.dataset.custDir),this.render();if(e.target.closest(`[data-cust-reset]`))return this.reset(),this.render()}setAccent(e){let n=document.documentElement;e===`teal`?(delete n.dataset.accent,localStorage.removeItem(Q)):(n.dataset.accent=e,localStorage.setItem(Q,e)),t()}setRadius(e){document.documentElement.style.setProperty(`--radius`,e),localStorage.setItem($,e)}setDir(e){document.documentElement.dir=e,localStorage.setItem(ie,e)}reset(){r(`system`),this.setAccent(`teal`),document.documentElement.style.removeProperty(`--radius`),localStorage.removeItem($),this.setDir(`ltr`)}};customElements.define(`apex-theme-customizer`,ce),i(),c(),document.querySelector(`apex-theme-customizer`)||document.body.appendChild(document.createElement(`apex-theme-customizer`)),o(),document.querySelectorAll(`[data-segment]`).forEach(e=>{let t=[...e.querySelectorAll(`[data-segment-item]`)];e.addEventListener(`click`,e=>{let n=e.target.closest(`[data-segment-item]`);n&&t.forEach(e=>{let t=e===n;e.classList.toggle(`bg-background`,t),e.classList.toggle(`text-foreground`,t),e.classList.toggle(`shadow-sm`,t),e.classList.toggle(`text-muted-foreground`,!t)})})}),document.querySelectorAll(`form[data-demo-form]`).forEach(e=>{let t=e=>e.closest(`[data-field]`)?.querySelector(`.apex-field-error`);e.addEventListener(`input`,e=>{if(e.target.matches(`input, select, textarea`)){let n=t(e.target);n&&(n.textContent=``)}}),e.addEventListener(`submit`,n=>{n.preventDefault();let r=null;if(e.querySelectorAll(`input, select, textarea`).forEach(e=>{let n=t(e);e.checkValidity()?n&&(n.textContent=``):(n&&(n.textContent=e.validationMessage),r||=e)}),r){r.focus();return}s(e.dataset.demoForm||`Saved successfully`)})}),document.querySelectorAll(`[data-dialog-open]`).forEach(e=>e.addEventListener(`click`,()=>document.getElementById(e.dataset.dialogOpen)?.showModal())),document.querySelectorAll(`dialog.apex-dialog`).forEach(e=>{e.addEventListener(`click`,t=>{(t.target.closest(`[data-dialog-close]`)||t.target===e)&&e.close()})});