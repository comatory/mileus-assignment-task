import { ResponseDescriptor, IApiClient } from '../interfaces/apis'

const BASE_REQUEST_OPTIONS = {
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
}


export default class ApiClient implements IApiClient {
  private _fetch: Fetch

  constructor(services: {
    fetch: Fetch,
  }) {
    this._fetch = services.fetch
  }

  public async get(url: string): Promise<ResponseDescriptor> {
    return await this._request(url, {
      method: 'GET',
    })
  }

  private _request(
    url: string,
    options: RequestInit = {}
  ): Promise<ResponseDescriptor> {
    return new Promise((resolve, reject) => {
      this._fetch(url, Object.assign({}, BASE_REQUEST_OPTIONS, options))
        .then((responseData) => {
          responseData.json()
            .then((json) => {
              resolve({
                data: json || {},
                error: json.error || null,
                statusCode: responseData.status,
                responseText: responseData.statusText || null,
              })
            })
        })
        .catch((err) => {
          console.error(err)
          reject(err)
        })
    })
  }
}
