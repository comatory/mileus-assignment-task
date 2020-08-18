export type ResponsePayload = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [key: string]: Object | string | number | Date | null,
}

export interface ResponseDescriptor {
  data: any,
  error: string | null,
  statusCode: number,
  responseText: string | null,
}

