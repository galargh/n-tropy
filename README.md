# N. Tropy

N.Tropy is a small project demonstrating how an app might be vulnerable to a timing attack.

## vulnerable-app

The vulnerable app exposes two `POST` endpoints:
- `/password`: to set a password(accepts lowercase and uppercase letters only)
- `/secret`: to retrieve a secret if the provided password is correct

They both require `JSON` body in the following format:
```
{
    "password": ""
}
```

The example requests to the app could look like the following:
```
curl --data "{ \"password\": \"strongPassword\" }" -H "Content-Type: application/json" localhost:8888/password
curl --data "{ \"password\": \"strongPassword\" }" -H "Content-Type: application/json" localhost:8888/secret
```

The app checks password equality a character at a time with additional sleeps in between in order to better demonstrate how a timing attack works.

To run the app, run the following commands:
```
npm install
npm start
```

## time-attack

The time attack app tries to make use of vulnerable app's vulnerability. It makes subsequent requests to the other app, measures the response time and, eventually, acquires the correct password for the secret.

To run the app, run the following commands:
```
npm install
npm start
```
