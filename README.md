# On Money(Front - end) [![Build Status](https://travis-ci.org/yashka713/on_money_front.svg?branch=master)](https://travis-ci.org/yashka713/on_money_front)

### Technical task [here](https://gist.github.com/yashka713/d4dc2210b04a45ffc0850de14ff1b4ff).

### Appointment

Client part application which helps to follow of your money using simple friendly interface.

### Features

A description of the features will be added during the development process.

### Built With

* `create-react-app`

## Deployment

Deployment instructions will be here as soon as possible.

For recompiling stylees use `yarn run sass`

### Authors

* [Yaroslav Liakh](https://github.com/yashka713)

Prerequisites
-------------
Required software: 

* `nodejs`
* `npm`
* `yarn`
* [hivemind](https://github.com/DarthSim/hivemind)

Install
-------
```
git clone git@github.com:yashka713/on_money_front.git
yarn
```

Launch
------

If you are using `hivemind` for launching back-end and front-end for development, please, configure `Procfile`
and start:
```
hivemind
```
or
```
yarn start
```
for starting App without building stylesheet.

Navigate to [http://localhost:3001](http://localhost:3001) or run `curl localhost:3001/status`.

Tests
------

```apple js
yarn test:ci
```

Changelog
---------

* 0.0.1 - 05.04.2018 - Added authorization for user
