import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  insertGoogleAnalyticsScript(id: string): void {
    const script1Elem = document.createElement('script');
    script1Elem.async = true;
    script1Elem.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script1Elem);

    const script2Elem = document.createElement('script');
    script2Elem.innerHTML = `window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${id}');`;
    document.head.appendChild(script2Elem);
  }
}
