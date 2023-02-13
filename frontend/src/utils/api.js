class Api {
   constructor({url, headers}) {
      this._url = url;
      this._headers = headers;
   }

   _checkResponse(res) {
      if (res.ok) {
         return res.json();
      } else {
         Promise.reject(`Ошибка загрузки данных ${res.status}`);
      }
   }

   getUserData() {
      return fetch(`${this._url}/users/me`, {
         method: 'GET',
         credentials: 'include',
         headers: {
            Authorization: `${this._headers}`
         }
      })
      .then(this._checkResponse)
   }

   getInitialCards() {
      return fetch(`${this._url}/cards`, {
         method: 'GET',
         credentials: 'include',
         headers: {
            Authorization: `${this._headers}`
         }
      })
      .then(this._checkResponse)
   }

   addNewCard(item) {
      return fetch(`${this._url}/cards`, {
         method: 'POST',
         credentials: 'include',
         headers: {
            Authorization: `${this._headers}`,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            name: item.name,
            link: item.link
         })
      })
      .then(this._checkResponse)
   }

   editProfile(userData) {
      return fetch(`${this._url}/users/me`, {
         method: 'PATCH',
         credentials: 'include',
         headers: {
            Authorization: `${this._headers}`,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            name: userData.name,
            about: userData.about
          })
      })
      .then(this._checkResponse)
   }

   changeProfileAvatar(avatarData) {
      return fetch(`${this._url}/users/me/avatar`, {
         method: 'PATCH',
         credentials: 'include',
         headers: {
            Authorization: `${this._headers}`,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            avatar: avatarData.avatarLink
         })
      })
      .then(this._checkResponse)
   }

   deleteCard(id) {
      return fetch(`${this._url}/cards/${id}`, {
         method: 'DELETE',
         credentials: 'include',
         headers: {
            Authorization: `${this._headers}`,
            'Content-Type': 'application/json'
         }
      })
      .then(this._checkResponse)
   }

   changeLikeStatus(id, isLiked) {
      if (isLiked) {
         return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
               Authorization: `${this._headers}`,
               'Content-Type': 'application/json'
            }
         })
         .then(this._checkResponse)
      } else {
         return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
               Authorization: `${this._headers}`,
               'Content-Type': 'application/json'
            }
         })
         .then(this._checkResponse)
      }
   }
}

export default new Api({
   url: 'https://api.vyacheslav-kostolomov.nomoredomainsclub.ru',
   headers: {
      'Content-Type': 'application/json',
    },
});
