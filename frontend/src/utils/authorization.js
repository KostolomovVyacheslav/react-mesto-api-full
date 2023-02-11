class Authorization {
   constructor({url, headers, token}) {
      this.url = url;
      this._headers = headers;
      this.token = token;
   }
   
   _getResponse(res) {
      if(!res.ok) {
        return Promise.reject(`Ошибка загрузки данных: ${res.status}`);
      };
      return res.json();
      }

   register(data) {
      return fetch(`${this.url}/signup`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            "password": data.password,
            "email": data.email
         })
      })
      .then(res => this._getResponse(res));
   }

   authorize(data) {
   return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         "password": data.password,
         "email": data.email
      })
      })
      .then(res => this._getResponse(res));
   }

   getContent(token) {
      return fetch(`${this.url}/users/me`, {
         method: 'GET',
         headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
         }
         })
         .then(res => this._getResponse(res));
   }
}

export default new Authorization({
   url: 'https://api.vyacheslav-kostolomov.nomoredomainsclub.ru/',
   headers: {
      'Content-Type': 'application/json',
    },
});