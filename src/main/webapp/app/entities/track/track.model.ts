import { Entry } from '../entry';
import { Artist } from '../artist';
import { Album } from '../album';
export class Track {
    constructor(
        public id?: number,
        public title?: string,
        public entry?: Entry,
        public artist?: Artist,
        public album?: Album,
    ) {
    }
}
