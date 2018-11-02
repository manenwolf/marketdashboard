class AandeelApi{
    static getAllAandelen(){
        return new Promise((resolve, reject) => {
            fetch("https://dieter-dashboard-server.herokuapp.com/api/stock")
            .then(response =>response.json())
            .then(result => {
                resolve(Object.assign([],result));
            })
            .catch(e => reject(e));

          
        });
      }

}



export default AandeelApi;