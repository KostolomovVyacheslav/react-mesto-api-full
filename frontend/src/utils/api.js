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
         headers: {
            Authorization: `${this._headers}`
         }
      })
      .then(this._checkResponse)
   }

   getInitialCards() {
      return fetch(`${this._url}/cards`, {
         method: 'GET',
         headers: {
            Authorization: `${this._headers}`
         }
      })
      .then(this._checkResponse)
   }

   addNewCard(item) {
      return fetch(`${this._url}/cards`, {
         method: 'POST',
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

   getUserId() {
      return fetch(`https://mesto.nomoreparties.co/v1/cohort-46/users/me`, {
         method: 'GET',
         headers: {
            Authorization: 'ddb2474c-5895-4c61-a372-bb2b9d4e6bd7'
         }
      })
      .then(this._checkResponse)
      .then(result => {
         return result._id;
      })
   }

   editProfile(userData) {
      return fetch(`${this._url}/users/me`, {
         method: 'PATCH',
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
            headers: {
               Authorization: `${this._headers}`,
               'Content-Type': 'application/json'
            }
         })
         .then(this._checkResponse)
      } else {
         return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'PUT',
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
   url: 'https://mesto.nomoreparties.co/v1/cohort-46',
   headers: 'ddb2474c-5895-4c61-a372-bb2b9d4e6bd7'
})