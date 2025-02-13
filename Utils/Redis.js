function Redis(BASE_URL) {
    return new (class {
        constructor(BASE_URL) {
            this.BASE_URL = BASE_URL;
        }
      
        set(data) {
            const opts={
                "url":`${this.BASE_URL}/set`,
                "body":data
            }
            return new Promise((resolve) => {
                $.post(opts, (err, resp, data) => {
                    let res = $.toObj(data) || data;
                    resolve(res);
                });
            });
        }
    
        find(filter) {
            const opts={
                "url":`${this.BASE_URL}/find/${filter}`,
            }
            return new Promise((resolve) => {
                $.get(opts, (err, resp, data) => {
                    let res = $.toObj(data) || data;
                    resolve(res);
                });
            });
        }
    
        del(filter){
            const opts={
                "url":`${this.BASE_URL}/delete/${filter}`,
            }
            return new Promise((resolve) => {
                $.get(opts, (err, resp, data) => {
                    let res = $.toObj(data) || data;
                    resolve(res);
                });
            });
        }
    })(BASE_URL);
}
