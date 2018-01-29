# Fun project for geocoding application using Flask+React.

## Install Back-end Requirements
Activate your virtual environment, and then
```
$ pip install -r requirements.txt
```

## Run Back-End
Set your Google map geocoding api key in `./app/config.py`.
```
$ export FLASK_APP=main.py
$ flask run
```
The back-end will be running on http://127.0.0.1:5000/.
If you change this address, please update `SERVER_URL_PREFIX` in
client/src/config.js.

## Install Front-end Requirements
```
$ cd client/
$ npm install
```

## Run Front-end
For running dev , just
```
$ npm start
```
For an optimized production build, do
```
$ npm run build
```
And then serve from the build
```
$ npm install -g serve
$ serve -s build
```
