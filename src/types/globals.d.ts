export declare global {
  interface Window {
    services: Object,
  }

  type Fetch =( input: RequestInfo, init?: RequestInit) => Promise<Response>
}
