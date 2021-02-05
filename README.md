# Web App From Scratch @cmda-minor-web 20-21 ⚙️

This is my repo for the Web App From Scratch course.

## Live :globe_with_meridians:
https://ofahchouch-gh.github.io/web-app-from-scratch-2021/

## Table of Contents 🗃
* [Description](#description-)
* [To Do](#to-do-)
* [Done](#Done-)
* [Installing](#installing-)
* [API](#api-)
    * [Overview Page](#overview-page)

## Description 📝
During this course I created a web app from scratch, so without any frameworks, using HTML, CSS and Javascript. The goal is to make a web app from scratch where
i can find an overview of the top 20 cryptocurrencies. The cryptocurrencies will have a detail page where more information about the specific coin is given. 

I choose this idea because i like crypto and the idea behind blockchain. The data i use comes from the [Binance Spot Api](https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md).
The Binance API is created by the Binance exchange. Everything which can be done manually on their web app related to spot trading can be done/automated with the API as well.

Examples:

- fetchTicker
- fetchCurrencies
- fetchBalance
- createOrder
- cancelOrder
- fetchOrder
- fetchOrders
- fetchOpenOrders
- fetchClosedOrders
- deposit
- withdraw

More info about the endpoints i am using [API](#api-).

## To Do :construction:
- finalize overview page of top 20 most traded crypto (8 february - 11 february, week 2 of minor)
- detail page of selected crypto (8 february - 11 february, week 2 of minor)

## Done :construction_worker:
- prototype overview page of top 20 most traded crypto (1 february - 4 february, week 1 of minor)

## Installing 🔍
To install this application enter the following into your terminal:
```
git clone https://github.com/ofahchouch-gh/ofahchouch-gh.web-app-from-scratch.github.io.git

cd ofahchouch-gh.web-app-from-scratch.github.io
```

## API 🐒
I made use of the following API functionality for this project:


**General API Information**


The base endpoint is https://api.binance.com

All endpoints return either a JSON object or array.
Data is returned in ascending order. Oldest first, newest last.
All time and timestamp related fields are in milliseconds.


**HTTP Return Codes**


HTTP 4XX return codes are used for malformed requests; the issue is on the sender's side.
HTTP 403 return code is used when the WAF Limit (Web Application Firewall) has been violated.
HTTP 429 return code is used when breaking a request rate limit.
HTTP 418 return code is used when an IP has been auto-banned for continuing to send requests after receiving 429 codes.
HTTP 5XX return codes are used for internal errors; the issue is on Binance's side.
With using /wapi/v3 , HTTP 504 return code is used when the API successfully sent the message but not get a response within the timeout period. It is important to NOT treat this as a failure operation; the execution status is UNKNOWN and could have been a success.


**General Information on Endpoints**


For GET endpoints, parameters must be sent as a query string.
For POST, PUT, and DELETE endpoints, the parameters may be sent as a query string or in the request body with content type application/x-www-form-urlencoded. You may mix parameters between both the query string and request body if you wish to do so.
Parameters may be sent in any order.
If a parameter sent in both the query string and request body, the query string parameter will be used.


**IP Limits**


Every request will contain X-MBX-USED-WEIGHT-(intervalNum)(intervalLetter) in the response headers which has the current used weight for the IP for all request rate limiters defined.
Each route has a weight which determines for the number of requests each endpoint counts for. Heavier endpoints and endpoints that do operations on multiple symbols will have a heavier weight.
When a 429 is received, it's your obligation as an API to back off and not spam the API.
Repeatedly violating rate limits and/or failing to back off after receiving 429s will result in an automated IP ban (HTTP status 418).
IP bans are tracked and scale in duration for repeat offenders, from 2 minutes to 3 days.
A Retry-After header is sent with a 418 or 429 responses and will give the number of seconds required to wait, in the case of a 429, to prevent a ban, or, in the case of a 418, until the ban is over.
The limits on the API are based on the IPs, not the API keys.

## Overview Page

