/**
 * Thin wrapper around XMLHttpRequest
 */
export class HttpRequest {
    public constructor(
        private method: string,
        private url: string,
    ) {
        this.http = new XMLHttpRequest();
    }

    private readonly http: XMLHttpRequest;
    private fetched = false;

    /**
     * Resolves with the response from the web server. You should not do anything
     * with the resulting XMLHttpRequest object other than read the following fields:
     *
     *   status
     *   satusTest
     *   responseText
     *   getResponseHeader()
     *   getAllResponseHeaders()
     *
     */
    public fetch(): Promise<XMLHttpRequest> {
        if (this.fetched) {
            throw new Error("Illegally called HttpRequest.fetch a second time");
        }
        this.fetched = true;
        return new Promise<XMLHttpRequest>((resolve, reject) => {
            this.http.open(this.method, this.url);
            this.http.onload = () => {
                resolve(this.http);
            };

            this.http.onerror = (err: ErrorEvent) => {
                reject(err);
            };
            this.http.send();
        });
    }
}
