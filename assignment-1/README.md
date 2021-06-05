# Assignment 1

## How HTTPS works behind the scene?

So http-s adds a layer of security over http protocol. We know that http follows a request-response mechanism ie if we want to go to a website say www.abc.com we first need to get the ip of the server where this site is hosted on ( DNS finds this info ) and after that an http get request is sent to the server , once server authorises the request it sends a response back. 

But its not like the http request travels directly from our pc to the server. There are several proxies and middlewares that monitor and transmit our requests. So those proxies can tap into our requests and access our info pretty easily. That's where https comes in. 

So the same request when carried out by https ( hyper text transfer protocol secure ) becomes encrypted using the ssh key and there is also TLS ( Transport Security Layer ) that helps to prevent the data transfer being modified or altred.

<br />

## What are different http methods available and what they exactly do.

GET - is used to request data from a specified resource<br />
POST - is used to send data to a server to update a resource.<br />
PUT - is used to send data to a serve to create or update a resource.<br />
HEAD - is similar to GET but without any response.<br />
DELETE - is used to delete a specified resource.<br />

<br />

## Understand and explain the use of various http response codes.

100 - Part of request accepted , keep sending request as long as there is no error<br />
101 - server is switching protocol<br />

200 - OK , the request has succeed<br />
201 - OK , request is complete new resource created.<br />
202 - request accepted but still processing<br />
203 - the information is from a third party local service , not from authorised server.<br />
204 - headers present but no body present in response.<br />
205 - browser should reset the content.<br />
206 - response data limit exceed , server returned partial data.<br />

300 - multiple links for the resource , select the required link.<br />
301 , 302 , 303 , 307 - request page moved to a new url<br />
305 - use a proxy to access the resource<br />

401 - unauthorised request , need username and password<br />
403 - access forbidden<br />
404 - requested page cannot be found<br />
405 - method specified in request not allowed<br />
407 - must authenticate with proxy server before request can be served.<br />
408 - request took longer than expected.<br />
409 - request coudnt be completed due to a conflict<br />
410 - The requested page is no longer available .<br />
411 - content length not defined<br />
412 - the precondition is false<br />
413 - request not accepted as request entity is too long<br />
415 - unsupported type<br />
416 - request range is not satisfiable  <br />

500 - request not completed , caught exception in server<br />
501 - request not completed<br />
502 - bad gateway ,upstream server didnt responded correctly.<br />
503 - service unavailable <br />
504 - gateway timed out.<br />
505 - http version not supported.<br />
<br />
## What are the different web communication protocols and their use cases?

TCP ( Transmission control protocol ) - used to communicate over a network . it divides the data into packets which are transmitted from source and then assembled at the destination.<br />

IP ( Internet Protocol ) - its an addressing protocol used with TCP. the ip address in packets helps in routing through the network until they reach the destination.<br />

UDP ( User Datagram Protocol ) - its another communication protocol with loss tolerant and low latency linking.<br />

SMTP ( simple mail transmission protocol ) - its used to send and distribute outgoing emails.<br />

FTP ( File Transfer protocol ) - its used to transfer files from one computer to another.<br />
HTTP ( hyper text transfer protocol ) -  as discussed earlier is used to transfer hypertext from 1 machine to another.<br />

<br />

## Pros and cons of Single page and multi page applications.

### Single Page application

#### Pros :

* They are very fast , since they are only loaded once and make ajax requests for additional data.
* Development is simple as there is no need to write code to render pages or excessive routing.
* Caching is very effective as we can cache the entire data at the time of loading and then reuse it even if they are offline.

#### Cons :

* Implementing seo is difficult since we are doing ajax request for data.
* Its  slow to download  as heavy client frameworks are required to do the loading
* Requires js to be present and enabled , for eaxmpe if you dont enable js for react applications even the htm wont be loaded ( thus the seo issues to ).
* They can be less secure due to cross site scripting.

### Multi page applications

#### Pros :

* Best for users who want segmented/organised view for the data the site offers.
* Very good for proper SEO

#### Cons:

* Frontend and backend development are tightly coupled.
* Development can be complex as user needs to use frameworks for either client or server.
