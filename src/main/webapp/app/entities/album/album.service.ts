import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Album } from './album.model';
@Injectable()
export class AlbumService {

    private resourceUrl = 'api/albums';
    private resourceSearchUrl = 'api/_search/albums';


    constructor(private http: Http) { }

    create(album: Album): Observable<Album> {
        const copy: Album = Object.assign({}, album);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(album: Album): Observable<Album> {
        const copy: Album = Object.assign({}, album);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Album> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<Response> {
        const options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
        ;
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<Response> {
        let options = this.createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options);
    }

    private createRequestOption(req?: any): BaseRequestOptions {
        const options: BaseRequestOptions = new BaseRequestOptions();
        if (req) {
            const params: URLSearchParams = new URLSearchParams();
            params.set('page', req.page);
            params.set('size', req.size);
            if (req.sort) {
                params.paramsMap.set('sort', req.sort);
            }
            params.set('query', req.query);

            options.search = params;
        }
        return options;
    }
}
