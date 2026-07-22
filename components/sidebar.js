import { createIcons, icons } from 'lucide';

// Editable navigation configuration. Add or change items here without touching the bundle.
const navGroups = [
  { label: 'Overview', items: [
    ['layout-dashboard', 'Dashboard', 'index.html'], ['bar-chart-3', 'Analytics', '#'],
    ['store', 'eCommerce', '#'], ['handshake', 'CRM', '#'], ['rocket', 'SaaS', '#'],
    ['chart-no-axes-combined', 'Charts', '#'],
  ]},
  { label: 'Commerce', items: [
    ['smartphone', 'Lista Smartphone', 'orders.html', '8'],
    ['package', 'Products', '#'], ['users', 'Customers', '#'], ['file-text', 'Invoices', '#'],
  ]},
  { label: 'Apps', items: [
    ['mail', 'Mail', '#'], ['message-circle', 'Chat', '#'], ['folder-open', 'Files', '#'],
    ['kanban', 'Kanban', '#'], ['calendar', 'Calendar', '#'], ['list-checks', 'Wizard', '#'],
    ['file-input', 'Forms', '#'],
  ]},
  { label: 'Finance', items: [['credit-card', 'Billing', '#']] },
];

const systemNav = { label: 'System', items: [
  ['user-cog', 'Users', '#'], ['bell', 'Notifications', '#', '3'],
  ['settings', 'Settings', '#'], ['help-circle', 'Help & Support', '#'],
]};

const docsNav = ['book-open', 'Documentation', 'docs.html'];

function pageName() { return window.location.pathname.split('/').pop() || 'index.html'; }

function item([icon, label, href, badge], active) {
  const name = href.split('/').pop();
  const selected = name === (active === 'index.html' ? 'index.html' : active);
  const color = selected ? 'bg-sidebar-accent text-sidebar-primary' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground';
  const iconColor = selected ? 'text-sidebar-primary' : 'text-sidebar-foreground/50 group-hover:text-sidebar-foreground/80';
  const badgeHtml = badge ? `<span class="sidebar-badge flex h-5 min-w-5 items-center justify-center rounded-full bg-sidebar-primary/15 px-1.5 text-[10px] font-semibold text-sidebar-primary">${badge}</span><span class="sidebar-badge-dot absolute right-2 top-1 h-2 w-2 rounded-full bg-sidebar-primary"></span>` : '';
  return `<a href="${href}" ${selected ? 'aria-current="page"' : ''} class="sidebar-nav-item group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${color}"><i data-lucide="${icon}" class="h-[18px] w-[18px] shrink-0 ${iconColor}"></i><span class="sidebar-label flex-1">${label}</span>${badgeHtml}</a>`;
}

function group({ label, items }, active) {
  return `<div><button type="button" class="sidebar-group-toggle flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/30 transition-colors hover:text-sidebar-foreground/50"><span class="sidebar-group-label flex-1 text-start">${label}</span><i data-lucide="chevron-right" class="sidebar-group-chevron size-3 transition-transform duration-200 rotate-90"></i></button><div class="nav-group-body"><div><div class="mt-1 space-y-0.5">${items.map((entry) => item(entry, active)).join('')}</div></div></div></div>`;
}

class ContexSidebar extends HTMLElement {
  connectedCallback() {
    const active = (this.getAttribute('active') || pageName()).split('/').pop() || 'index.html';
    this.innerHTML = `<div class="apex-sidebar-overlay fixed inset-0 z-40 bg-black/50 lg:hidden" data-mobile-close></div><aside class="apex-sidebar-aside h-screen border-e border-sidebar-border bg-sidebar"><div class="flex h-16 items-center gap-3 border-b border-sidebar-border px-4"><div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary"><i data-lucide="zap" class="h-4 w-4 text-sidebar-primary-foreground"></i></div><div class="sidebar-brand-text flex flex-col"><span class="text-sm font-bold tracking-tight text-sidebar-foreground">Apex</span><span class="text-[10px] font-medium uppercase tracking-widest text-sidebar-foreground/40">Dashboard</span></div><button type="button" data-mobile-close aria-label="Close sidebar" class="ms-auto flex h-7 w-7 items-center justify-center rounded-md text-sidebar-foreground/50 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground lg:hidden"><i data-lucide="x" class="h-4 w-4"></i></button></div><nav aria-label="Main navigation" class="scrollbar-fade flex-1 space-y-3 overflow-y-auto px-3 py-4">${navGroups.map((entry) => group(entry, active)).join('')}<div class="my-2 border-t border-sidebar-border"></div>${group(systemNav, active)}<div class="my-2 border-t border-sidebar-border"></div>${item(docsNav, active)}</nav><div class="border-t border-sidebar-border p-3"><div class="flex items-center gap-2"><a href="#" class="flex flex-1 items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-sidebar-accent/50"><div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sidebar-primary/80 to-sidebar-primary text-[11px] font-bold text-sidebar-primary-foreground">AS</div><div class="sidebar-user-info flex flex-1 flex-col"><span class="text-sm font-medium text-sidebar-foreground">Aigars S.</span><span class="text-[11px] text-sidebar-foreground/50">Admin</span></div></a><button type="button" aria-label="Log out" class="sidebar-logout rounded-md p-1.5 text-sidebar-foreground/40 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground/70"><i data-lucide="log-out" class="h-4 w-4"></i></button></div></div><button type="button" data-collapse-toggle aria-label="Toggle sidebar" class="apex-collapse-btn absolute -right-3 top-20 h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition-all hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><i data-lucide="chevron-left" class="apex-collapse-icon h-3.5 w-3.5 mx-auto transition-transform duration-300"></i></button></aside>`;
    createIcons({ root: this, icons });
    this.querySelector('[data-collapse-toggle]')?.addEventListener('click', () => {
      const collapsed = document.documentElement.dataset.sidebarCollapsed !== 'true';
      document.documentElement.dataset.sidebarCollapsed = String(collapsed);
      localStorage.setItem('apex-sidebar-collapsed', String(collapsed));
      this.querySelector('.apex-collapse-icon')?.classList.toggle('rotate-180', collapsed);
    });
    this.querySelectorAll('[data-mobile-close], nav a').forEach((el) => el.addEventListener('click', () => { document.documentElement.dataset.mobileOpen = 'false'; }));
    this.querySelectorAll('.sidebar-group-toggle').forEach((button) => button.addEventListener('click', () => {
      const body = button.nextElementSibling; const closed = !body.hasAttribute('hidden');
      body.toggleAttribute('hidden', closed); button.querySelector('.sidebar-group-chevron')?.classList.toggle('rotate-90', !closed);
    }));
  }
}

customElements.define('contex-sidebar', ContexSidebar);
