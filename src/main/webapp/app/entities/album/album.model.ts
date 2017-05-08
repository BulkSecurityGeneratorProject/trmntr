import { Track } from '../track';
import { Label } from '../label';
export class Album {
    constructor(
        public id?: number,
        public title?: string,
        public track?: Track,
        public label?: Label,
    ) {
    }
}
