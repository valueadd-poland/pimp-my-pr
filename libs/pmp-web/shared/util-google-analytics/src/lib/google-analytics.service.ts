import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { environment } from '@pimp-my-pr/pmp-web/shared/config';
import { Observable } from 'rxjs';
import { filter, share, tap } from 'rxjs/operators';

declare let gtag: Function;

@Injectable()
export class GoogleAnalyticsService {
  private readonly renderer: Renderer2;
  private readonly googleId: string;
  private loaded = false;
  private loadingInProgress = false;

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.googleId = environment.googleAnalyticsId;
  }

  async init(): Promise<void> {
    if (this.loaded || this.loadingInProgress) return;
    try {
      await this.insertGoogleScript();
      await this.insertLocalScript();
      this.loaded = true;
    } catch (error) {
      console.error(error);
    } finally {
      this.loadingInProgress = false;
    }
  }

  trackPageViews(): Observable<NavigationEnd> {
    return this.router.events.pipe(
      filter(() => this.loaded),
      filter((evt: RouterEvent) => evt instanceof NavigationEnd),
      tap((event: NavigationEnd) => {
        this.trackSinglePageView(event);
      }),
      share()
    );
  }

  private trackSinglePageView(event: NavigationEnd): void {
    gtag('config', this.googleId, { page_path: event.urlAfterRedirects });
  }

  private async insertGoogleScript(): Promise<void> {
    if (!this.googleId) throw new Error('googleId not set');
    await this.insertScript(`https://www.googletagmanager.com/gtag/js?id=${this.googleId}`);
  }

  private async insertLocalScript(): Promise<void> {
    await this.insertScript('/assets/scripts/google-analytics-script.js');
    gtag('config', this.googleId);
  }

  private insertScript(path: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const script = this.renderer.createElement('script') as HTMLScriptElement;
      script.type = 'text/javascript';
      script.onload = () => resolve();
      script.onerror = () => reject();
      script.src = path;
      this.renderer.appendChild(this.document.head, script);
    });
  }
}
