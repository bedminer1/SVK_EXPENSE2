Followed along mostly with tutorial by programonaut

Takeaways:
## How to auth
1. hooks.server.ts
	file with handle function, called every time user sends request to the site
	set up authentication and authorization here to screen through each action,
	ensuring correct permissions

	set up the individual functions as 'export const authentication/authorization = async ({event, resolve}) => {}'
	
2. What is authentication?
"is this a verified user?" 
    1) load store data from request cookie
    2) 'try' to verifying and refresh the loaded authStore to get an up-to-date version
    	this is done with event.locals.pb.authStore.isValid && await event.locals.pb.collection('users').authRefresh()
    3) clear auth store on failed refresh (log out if not valid/ verified)
    	this is done with event.locals.pb.authStore.clear()
    4) update cookie with latest store state
    	response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie())

3. What is authorization?
"is this user allowed to access this?"
1)put all the routes that are not protected into 

snap:

Dashboard
![image](https://github.com/bedminer1/SVK_AUTH_TUTORIAL/assets/124355842/7459e1f6-074c-4fee-8fe2-fbd933e2c8bf)
