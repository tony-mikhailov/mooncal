import { configure } from 'mobx';

import deviceStore from './device';

// import * as complex from '~/api/complex';

class RootStore{
    constructor(){
        this.api = {
            // complex,
        };

        this.storage    = localStorage;

        // this.complex    = new complexStore(this);
        this.device     = new deviceStore(this);
    }
}

export default new RootStore();