import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.


class MuntApi{
    static getAllMunten(){
        return new Promise((resolve, reject) => {
            fetch("https://dieter-dashboard-server.herokuapp.com/api/currency")
            .then(response =>response.json())
            .then(result => {
                if(result == []){
                    reject("no data");
                }else{
                                    resolve(Object.assign([],result));
                }
            })
            .catch(e => reject(e));

          
        });
      }

}



export default MuntApi;