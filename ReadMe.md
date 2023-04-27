## OVERVIEW
SACCOM BACKEND API

* LANGUAGES : Node.js
* DATABASES : Mongodb
* ORM : Mongoose
* FRAMEWORK : Express.js
* BASE_URL : http://localhost:4000

### ENDPOINTS

* REGISTRATION
    - This endpoint allows to create an account on the platform.
    - An email will be sent to the user before their account is created for verification
    
    - URL: {BASE_URL}/api/v1/register
    - METHOD: POST
    - REQUEST BODY: 
    ```
    {
        firstName: 'saviour',
        lastName: 'udoh',
        email: 'example@gmail.com',
        phone: "12345436361',
        password: "dfdasd123"
    }
    
    ```
    - RESPONSE:
    ```
        {
            message: "Account Created, Email has been sent to your mailbox",
            data:  {
                firstName: 'saviour',
                lastName: 'udoh',
                email: 'example@gmail.com',
                phone: "12345436361',
                password: "dfdasd123"
            }
        }
    ```

* RESEND EMAIL
    - if the mail has not been recieved in the users mail box, the user can hit this End point to send the mail again

    - URL: {BASE_URL}/api/v1/resendEmail
    - METHOD: POST
    - REQUEST BODY: 
    ```
    {
        email: 'example@gmail.com',
        firstName: 'saviour'
    }
    
    ```
    - RESPONSE:
    ```
        {
            message: "Email has been sent to your mailbox"
        }
    ```

* VERIFY EMAIL
    - This endpoint makes the user to be Verified.
    - it will update the user verification status so as to allow the user login.

    - URL: {BASE_URL}/api/v1/verifyEmail
    - METHOD: POST
    - REQUEST BODY: 
    ```
    {
        email: 'example@gmail.com',
        Token: Jwt Token,
    }
    
    ```
    - RESPONSE:
    ```
        {
            message: "user has been Verified"
        }
    ```

* LOGIN USER
    - this endpoints grants user Access to the site if they meet the required conditions(verified email).
    - A token will be returned for Authorization purposes.
    - A cookie will be set in the browser
    
    - URL: {BASE_URL}/api/v1/login
    - METHOD: POST
    - REQUEST BODY: 
    ```
    {
        email: 'example@gmail.com',
        password: howard212,
    }
    
    ```
    - RESPONSE:
    ```
        {
            message: "user Login successful",
            data: {accessToken}
        }
    ```

