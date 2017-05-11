import { Entry } from '../entry';
import { Member } from '../member';
export class Playlist {
    constructor(
        public id?: number,
        public showNumber?: string,
        public theme?: string,
        public guest?: string,
        public airDate?: any,
        public showType?: string,
        public recordUrl?: string,
        public createTime?: any,
        public updateTime?: any,
        public entry?: Entry,
        public members?: Member[],
        public entries?: Entry[],
    ) {
    }
}
