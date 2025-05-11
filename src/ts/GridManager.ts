type GridLayer = HTMLElement & { dataset: { grid: string } };
type ToggleButton = HTMLButtonElement & { dataset: { toggle: string } };

export class GridManager {
  private readonly STORAGE_KEY = 'unitgl:grid:visibility';
  private visibilityMap: Record<string, boolean> = {};

  constructor() {
    this.loadVisibility();
    this.applyVisibilityState();
    this.setupEventListeners();
  }

  private loadVisibility(): void {
    try {
      this.visibilityMap = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
    } catch {
      this.visibilityMap = {};
    }
  }

  private saveVisibility(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.visibilityMap));
  }

  private updateAllGridHeights(): void {
    const height = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );

    document.querySelectorAll<HTMLElement>('.grid_layer').forEach(layer => {
      if (layer.offsetHeight !== height) {
        layer.style.height = `${height}px`;
      }
    });
  }

  private updateStatusIndicator(id: string, isHidden: boolean): void {
    const badge = document.querySelector<HTMLSpanElement>(`[data-status="${id}"]`);
    if (badge) {
      badge.textContent = isHidden ? '✕ Off' : '✓ On';
    }
  }

  private applyVisibilityState(): void {
    document.querySelectorAll<GridLayer>('.grid_layer').forEach(layer => {
      const id = layer.dataset.grid;
      const hidden = !!this.visibilityMap[id];
      layer.classList.toggle('is-hidden', hidden);
      this.updateStatusIndicator(id, hidden);
    });
  }

  private setupToggleButtons(): void {
    document.querySelectorAll<ToggleButton>('button[data-toggle]').forEach(button => {
      const id = button.dataset.toggle;
      const layer = document.querySelector<GridLayer>(`[data-grid="${id}"]`);
      if (!layer) return;

      button.addEventListener('click', () => {
        const isNowHidden = layer.classList.toggle('is-hidden');
        this.visibilityMap[id] = isNowHidden;
        this.saveVisibility();
        this.updateStatusIndicator(id, isNowHidden);
      });
    });
  }

  private setupEventListeners(): void {
    document.addEventListener('DOMContentLoaded', () => {
      this.updateAllGridHeights();
      this.setupToggleButtons();

      window.addEventListener('resize', () => this.updateAllGridHeights());
      window.addEventListener('scroll', () => this.updateAllGridHeights());
    });
  }
}
